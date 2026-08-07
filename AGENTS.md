# AGENTS.md

Instructions for human contributors and AI agents working in this repository.

## Repository purpose

`lxdpatterns-kb` is the public, canonical source of the LXD Patterns knowledge base. It owns authored `.mdoc` documents, public assets, templates, editorial guidance, and the semantic authoring contract. It does not own the website application or rendering implementation.

## Core rules

1. **Keep the repository content-only.** Do not add Next.js, React, Tailwind CSS, shadcn/ui, deployment secrets, application configuration, or runtime dependencies.
2. **Use `.mdoc` as the source format.** Use ordinary Markdown for prose and documented semantic Markdoc tags only where content has a defined role.
3. **Describe meaning, not presentation.** Never introduce tags or fields such as `blue-card`, `two-column-grid`, `accordion`, React component names, CSS classes, or layout coordinates.
4. **Treat the content schema as a public contract.** Coordinate syntax changes with `lxdpatterns-web`, provide migration guidance, and update public documentation in the same change.
5. **Preserve migration fidelity.** When converting a Notion-derived draft, preserve its title, headings, wording, capitalisation, and checklist text. Do not combine structural migration with unsolicited editorial rewriting.
6. **Do not fabricate content.** Never invent sources, quotations, evidence, statistics, relationships, authors, publications, or URLs.
7. **Respect copyright and licensing.** Contribute original writing, compatible openly licensed material, or appropriately limited quotations with attribution.
8. **Keep changes reviewable.** Avoid unrelated rewrites, bulk formatting, or broad migrations in the same pull request as a focused content change.

## Content domains

The directory and frontmatter `category` must match:

| Directory | Category |
| --- | --- |
| `activities/` | `activity` |
| `flows/` | `flow` |
| `nudges/` | `nudge` |
| `concepts/` | `concept` |
| `gamifications/` | `gamification` |
| `interfaces/` | `interface` |

Choose the domain that best represents how a practitioner will use the pattern. Related patterns do not change the primary domain.

## Required document anatomy

Every new or substantively updated pattern must contain:

- frontmatter with `title`, `category`, and explicit `status`;
- a stable slug derived from the `.mdoc` filename;
- a concise `summary` when the pattern is developed enough to describe;
- `order` when its category sequence is known;
- a valid `icon` when a pattern-specific icon is required;
- one or more semantic `pattern-list` sections when the page contains structured guidance;
- footnote definitions for external sources used in the text;
- a `relations` section only when genuine related-pattern links are known.

The current frontmatter parser accepts single-line scalar values only. Do not use multiline YAML, arrays, objects, folded blocks, or nested YAML structures.

Supported status values are:

- `planned` — outline exists but substantive authoring has not started;
- `draft` — content is incomplete or contains placeholders;
- `review` — content is ready for editorial or subject-matter review;
- `stable` — reviewed content suitable for normal publication.

Supported icon names are currently:

`target`, `route`, `magnet`, `lightbulb`, `trophy`, `panels`, `video`, `file-text`, `headphones`, `list-checks`, and `chart-no-axes-combined`.

If `icon` is omitted, the website uses the category icon. New icon names require a coordinated public-contract and renderer change.

## Semantic `pattern-list` sections

Use this structure:

```mdoc
{% pattern-list role="checklist" layer="content" %}
# Section title

## Item title

Item description in ordinary Markdown.
{% /pattern-list %}
```

Supported `role` values:

- `checklist` — guidance the reader may select in the UI;
- `list` — informational items rendered independently, without selectable state.

Supported `layer` values:

- `content` — learning content and pedagogical material;
- `interactions` — learner controls, behaviours, feedback, and interaction design;
- `system` — platform, delivery, analytics, permissions, and technical behaviour;
- `relations` — links to other patterns.

Structural rules:

- a wrapper must contain exactly one meaningful level-one heading for its section title;
- every level-two heading begins a new item;
- all Markdown until the next level-two heading belongs to that item description;
- item descriptions must not contain another level-two heading;
- wrappers must not be nested;
- more than one wrapper may use the same layer;
- omit layers that are not relevant rather than adding empty placeholders;
- never use Markdown checked state to define UI state.

`content`, `interactions`, and `system` sections become website tabs. `relations` sections are removed from the main flow and populate the Related card.

## Sources and resources

Cite sources with Markdown footnotes. Definitions must be one line and use a Markdown link:

```mdoc
A supported statement appears here.[^retrieval]

[^retrieval]: [Short source title](https://example.org "Full source description for the tooltip")
```

The website extracts all definitions in document order and builds the Resources card. The optional quoted link title is used as the fuller source description. Use stable canonical URLs and enough metadata to identify the source.

Prefer primary research, recognised standards, official documentation, and reputable scholarly or professional sources. Distinguish evidence-supported findings from practitioner recommendations, examples, and project-specific editorial judgement.

Always use [`.skills/footnote-source-audit/SKILL.md`](./.skills/footnote-source-audit/SKILL.md) before checking or normalising source links in an `.mdoc` document. It validates definitions and their in-text uses, and limits edits to footnote definition lines and inline marker identifiers. Report any source-to-claim mismatch and source-link correction in chat; never silently revise instructional prose to make a citation fit.

## Related patterns

Use a `relations` list and reference-style links:

```mdoc
{% pattern-list role="list" layer="relations" %}
# Related patterns

## Read an Article

Use [Read an Article][read-an-article] when the material is primarily textual.
{% /pattern-list %}

[read-an-article]: ./read-an-article
```

Reference identifiers should normally match the target slug. The current publishing contract resolves `./slug` against the current category. Coordinate renderer support before adding cross-category relation syntax.

A relation item must include a reference-style link in its description; otherwise it will not appear in the Related card.

## Legacy draft compatibility

Many untouched outline drafts still contain five Markdown sections and `- [ ] Check list item` placeholders. The website renders this syntax for migration compatibility, but it is not the current authoring model.

When developing one of these pages:

1. preserve the original item titles and wording;
2. move structured guidance into `pattern-list` wrappers;
3. replace placeholder task-list lines with level-two item headings and descriptions;
4. convert Sources to footnotes;
5. convert Related to a `relations` wrapper and reference definitions;
6. remove irrelevant empty sections.

Do not create new legacy-format documents.

## Assets

Place reusable assets under `assets/`. Use descriptive filenames and record source, author, licence, and required attribution near the asset or in accompanying metadata. Do not commit assets with uncertain reuse rights. Add meaningful alternative text wherever an image is used.

## Git and contributor attribution

The website derives contributor names and last-updated dates from this repository's Git history. Therefore:

- use a consistent Git author identity;
- preserve authorship when moving or splitting documents where practical;
- avoid rewriting published history merely to alter attribution;
- keep automated formatting changes separate from substantive authorship where possible.

## Validation checklist

Before finalising a change, verify that:

- the directory and `category` match;
- frontmatter uses supported single-line values;
- `order` is a non-negative integer and reflects the intended category sequence;
- `icon` is supported or intentionally omitted;
- every `pattern-list` has a valid `role`, `layer`, level-one title, and at least one meaningful item;
- wrappers are closed and not nested;
- internal relation definitions are present and use the documented form;
- source footnotes are defined, accurate, and reachable;
- source-link checks and normalisation used `.skills/footnote-source-audit`;
- migrated wording has not been silently changed;
- no renderer-specific syntax has entered the content model;
- the document remains understandable as source Markdown.

Use the templates under `templates/` and consult [docs/CONTENT_MODEL.md](./docs/CONTENT_MODEL.md) and [docs/PATTERN_FORMAT.md](./docs/PATTERN_FORMAT.md).

## Relationship to `lxdpatterns-web`

The private `lxdpatterns-web` repository checks out this repository during development and builds. It validates metadata, parses semantic sections, derives resources, relations, contributor metadata, ordering, and static routes, then renders the result.

Changes here must not depend on unpublished implementation details. When authoring needs require a contract change, document the semantic requirement publicly and coordinate the renderer change before broad adoption.

## Licence

By contributing original content, contributors agree that their contribution is made available under the repository's CC BY 4.0 licence unless a clearly identified exception applies.
