# AGENTS.md

Instructions for human contributors and AI agents working in this repository.

## Repository purpose

`lxdpatterns-kb` is the public, canonical source of the LXD Patterns knowledge base. It contains authored learning-design content and related editorial documentation. It does not contain the website application or rendering implementation.

## Core rules

1. **Keep the repository content-only.** Do not add Next.js, React, Tailwind CSS, shadcn/ui, deployment code, application configuration, or runtime dependencies.
2. **Use `.mdoc` as the source format.** Write ordinary Markdown wherever possible and use only documented semantic Markdoc tags where a block has a special content role.
3. **Describe meaning, not presentation.** Prefer tags such as `checklist`, `example`, `evidence`, `pitfall`, and `references`. Never introduce presentation-specific markup such as `blue-card`, `two-column-grid`, `shadcn-accordion`, or React component names.
4. **Preserve renderer independence.** A document should remain understandable and reusable outside the official website.
5. **Do not fabricate evidence.** Research claims, definitions, historical statements, and statistics must be supported by reliable sources. Never invent references, authors, publications, URLs, or quotations.
6. **Respect copyright.** Contribute original writing, openly licensed material compatible with CC BY 4.0, or short quotations used with proper attribution and a lawful basis.
7. **Keep changes reviewable.** Avoid unrelated rewrites, bulk formatting, or structural migrations in the same contribution as a substantive content change.

## Content areas

Store documents according to their primary role:

- `activities/` — individual learner actions or learning activity types
- `flows/` — sequences, formats, and facilitation structures combining activities
- `concepts/` — theories, principles, models, and analytical frameworks

When a topic could fit more than one area, choose the category that best describes how a practitioner would use the page and connect it to related pages through semantic references.

## Document conventions

Until category-specific templates and schemas are introduced, every document should have:

- a clear, unique title
- a concise summary
- one primary category
- a stable, readable slug derived from the filename
- enough context for a practitioner to understand when and why the pattern matters
- explicit references for claims that depend on external evidence

Use sentence case for headings. Prefer short paragraphs, concrete examples, and actionable checklist items. Avoid unexplained jargon and avoid presenting contested guidance as universal fact.

## Semantic markup

Only use semantic tags documented in this repository. If a required content role is missing:

1. describe the authoring need in an issue or pull request;
2. propose the semantic meaning and allowed content;
3. avoid specifying visual appearance or a JavaScript implementation;
4. coordinate the schema change with the web renderer before using the new tag broadly.

The content schema is a public contract. Breaking changes require an explicit migration plan.

## Sources and references

Prefer primary research, recognised standards, official documentation, and reputable scholarly or professional sources. Record enough metadata to identify a source reliably. Link to a stable canonical location where possible.

Distinguish clearly between:

- evidence-supported findings
- practitioner recommendations
- illustrative examples
- project-specific editorial judgement

## Assets

Place reusable repository assets under `assets/`. Use descriptive filenames and include source, author, license, and required attribution near the asset or in accompanying metadata. Do not commit assets with uncertain reuse rights.

## Git and contributor attribution

The official website derives contributor information from Git history. Therefore:

- preserve authorship when moving or splitting documents;
- avoid squashing multiple people’s authored material into an untraceable replacement where practical;
- use a consistent Git author identity;
- do not rewrite published history merely to alter attribution;
- use `.mailmap` for legitimate identity consolidation when it is introduced.

## Validation expectations

Before finalising a change, check that:

- frontmatter is valid and follows the current schema;
- Markdoc tags are recognised and correctly nested;
- internal links resolve;
- external references are reachable and accurately described;
- images have meaningful alternative text where applicable;
- the document remains understandable as source Markdown;
- no application-specific syntax has entered the content model.

## Relationship to `lxdpatterns-web`

The private `lxdpatterns-web` repository consumes and renders this content. Changes here must not depend on unpublished implementation details in that repository. When a content schema change requires renderer work, document the dependency explicitly and keep the public authoring contract clear.

## License

By contributing original content to this repository, contributors agree that their contribution is made available under the repository’s CC BY 4.0 license unless a clearly identified exception applies.