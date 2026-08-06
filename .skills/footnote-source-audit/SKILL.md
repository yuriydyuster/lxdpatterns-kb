---
name: footnote-source-audit
description: Audit, validate, and normalize external-source footnotes in `.mdoc` pattern documents. Use whenever checking source links, resource cards, citation descriptions, APA-style source metadata, duplicate footnotes, or whether a source supports the text that cites it. This skill changes footnote definitions and inline marker identifiers only, never instructional prose.
---

# Footnote Source Audit

Use this workflow for source footnotes only. Keep the document’s instructional wording, headings, examples, and structure intact.

## Scope guard

- Edit only footnote definition lines and inline footnote marker identifiers: `[^source-id]: ...` and `[^source-id]`.
- Do not alter instructional prose, headings, lists, quotations, examples, or the order of content.
- Rename or reassign an inline footnote marker when needed to resolve duplicate or undefined definitions, or to connect a claim to its verified source. Preserve all surrounding instructional text and punctuation.
- If the source does not support its cited claim, report the mismatch and any source-link correction in chat. Never rewrite the claim to fit the source.

## Audit

1. Read the repository instructions and the target `.mdoc` file.
2. Run the structural audit:

   ```sh
   node .skills/footnote-source-audit/scripts/audit_footnotes.mjs path/to/pattern.mdoc
   ```

3. Check every definition and every in-text use:
   - each identifier is defined once, used at least once, and has a one-line Markdown-link definition;
   - no two definitions represent the same canonical resource URL;
   - the URL is stable, reachable, and points to a respectful primary, standards, official, or reputable scholarly/professional source;
   - the quoted description has author–date metadata in APA 7 style and one complete sentence explaining why the source supports the linked context;
   - the source actually supports the adjacent claim, not merely the topic.
4. Read the linked source before correcting author, date, title, publication, or relevance. Use the source’s stated publication or update date; do not infer a date from a retrieval timestamp, HTTP `Date` header, or copyright footer. Use `n.d.` only after confirming that the source supplies no publication or revision date.

## Normalize definitions

Use this one-line form:

```mdoc
[^source-id]: [Short source title](https://example.org "Author, A. A., & Author, B. B. (2024). Source title. Publication, 12(3), 45–67. This study supports the recommendation because it ….")
```

For an undated webpage, use `(n.d.)` only after the date check above. Keep the link text concise; place complete metadata and exactly one relevance sentence in the quoted description.

Allowed source-link fixes include correcting an author, year, title, URL, publication detail, description, duplicate definition, or inline marker identifier. Preserve the instructional text and an existing source when it already fits the cited claim.

## Mismatches and duplicate resources

Report these in chat with the document location, the cited claim, what the source actually supports, and the safe next action:

- a source only loosely relates to the claim or contradicts it;
- one definition is reused for unrelated claims;
- two source identifiers use the same resource URL and require marker consolidation;
- no suitable source can be verified.

Do not treat this report as authority to revise the instructional wording. Footnote definitions and marker identifiers may be corrected; any other document change requires explicit approval.

## Finish

1. Rerun the audit script and `git diff --check`.
2. Inspect the diff and confirm that every changed document line is a footnote definition or an inline footnote marker.
3. State briefly what was normalized. State every unresolved mismatch or out-of-scope marker change in chat.
