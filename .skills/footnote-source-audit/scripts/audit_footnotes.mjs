import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const [inputPath] = process.argv.slice(2);

if (!inputPath) {
  console.error('Usage: node audit_footnotes.mjs path/to/pattern.mdoc');
  process.exit(2);
}

const file = resolve(inputPath);
const text = readFileSync(file, 'utf8');
const lines = text.split('\n');
const definitions = [];
const issues = [];

const addIssue = (severity, code, line, detail) => {
  issues.push({ severity, code, line, detail });
};

for (const [offset, line] of lines.entries()) {
  if (!line.startsWith('[^')) continue;

  const lineNumber = offset + 1;
  const match = line.match(/^\[\^([^\]\s]+)\]: \[([^\]]+)\]\((\S+) "([^"]+)"\)$/);

  if (!match) {
    addIssue('error', 'malformed-definition', lineNumber, 'Use one Markdown link with a quoted description on one line.');
    continue;
  }

  const [, id, title, url, description] = match;
  definitions.push({ id, line: lineNumber, title, url, description });

  if (!/\((?:[12]\d{3}|n\.d\.)\)/.test(description)) {
    addIssue('error', 'missing-author-date', lineNumber, 'Add an APA-style publication year or n.d. to the quoted description.');
  }

  const afterDate = description.replace(/^.*?\((?:[12]\d{3}|n\.d\.)\)\.\s*/, '');
  if (!/\.\s+(?:This|The|A|An|These|It|They|Students)\b/.test(afterDate)) {
    addIssue('warning', 'review-relevance-sentence', lineNumber, 'Confirm that the quoted description ends with one complete sentence explaining the source’s relevance.');
  }
}

const ids = new Map();
const urls = new Map();

for (const definition of definitions) {
  const previousId = ids.get(definition.id);
  if (previousId) {
    addIssue('error', 'duplicate-id', definition.line, `Also defined on line ${previousId.line}.`);
  } else {
    ids.set(definition.id, definition);
  }

  const previousUrl = urls.get(definition.url);
  if (previousUrl) {
    addIssue('error', 'duplicate-url', definition.line, `Also used by ${previousUrl.id} on line ${previousUrl.line}.`);
  } else {
    urls.set(definition.url, definition);
  }
}

const body = lines.filter((line) => !line.startsWith('[^')).join('\n');
const references = [...body.matchAll(/\[\^([^\]\s]+)\]/g)].map((match) => match[1]);
const referencesById = new Map();

for (const id of references) {
  referencesById.set(id, (referencesById.get(id) ?? 0) + 1);
  if (!ids.has(id)) {
    addIssue('error', 'undefined-reference', null, `Inline footnote [^${id}] has no definition.`);
  }
}

for (const definition of definitions) {
  if (!referencesById.has(definition.id)) {
    addIssue('error', 'unused-definition', definition.line, `[^${definition.id}] is never cited in the document.`);
  }
}

const summary = {
  file,
  definitions: definitions.length,
  inlineReferences: references.length,
  errors: issues.filter(({ severity }) => severity === 'error').length,
  warnings: issues.filter(({ severity }) => severity === 'warning').length,
  issues,
};

console.log(JSON.stringify(summary, null, 2));

if (summary.errors > 0) process.exitCode = 1;
