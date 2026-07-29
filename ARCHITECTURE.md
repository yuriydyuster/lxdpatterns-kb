# Architecture

## Overview

`lxdpatterns-kb` is the public, canonical content repository for LXD Patterns. It stores authored digital learning experience design patterns independently from any website framework, component library, or deployment platform.

The private `lxdpatterns-web` application checks out a specific revision of this repository during development and production builds. This repository defines the public authoring contract; the web repository implements one renderer of that contract.

## Repository boundaries

This repository owns:

- `.mdoc` pattern documents;
- content-domain directories and ordering;
- public content assets and attribution information;
- authoring templates;
- editorial and contribution guidance;
- the public semantic markup specification;
- Git history used for contributor attribution.

It must not contain:

- Next.js or React application code;
- Tailwind CSS or shadcn/ui components;
- website route or layout implementation;
- deployment credentials or private infrastructure;
- presentation-specific markup.

## Content domains

The publishing application requires six domain directories:

```text
activities/       Individual learning activities and learner actions
flows/            Sequences, formats, and structures combining activities
nudges/           Engagement, access, notification, and continuation prompts
concepts/         Theories, models, principles, and analytical frameworks
gamifications/    Progression, feedback, recognition, and motivational mechanics
interfaces/       Interface and navigation patterns
```

Each directory maps to one frontmatter category:

```text
activities       → activity
flows            → flow
nudges           → nudge
concepts         → concept
gamifications    → gamification
interfaces       → interface
```

A build fails when a document's category does not match its directory.

Supporting directories are:

```text
assets/           Licensed images and other reusable assets
templates/        Starting points for each pattern domain
docs/             Content-model and authoring documentation
```

## Source format

`.mdoc` files are the single source of truth. A document has three logical parts:

1. **Frontmatter** — page metadata such as title, category, status, summary, order, and icon.
2. **Semantic sections** — `{% pattern-list %}` wrappers that identify structured guidance by role and layer.
3. **Ordinary Markdown** — prose outside wrappers, inline links, quotations, tables, source footnotes, and link definitions.

The current frontmatter implementation accepts single-line scalar values. The public contract must not assume general-purpose YAML features until the consuming implementation explicitly supports them.

## Semantic section model

A `pattern-list` wrapper carries two attributes:

- `role`: `list` or `checklist`;
- `layer`: `content`, `interactions`, `system`, or `relations`.

Its body contains:

- one level-one heading as the section title;
- level-two headings as item titles;
- the Markdown between item headings as each item description.

The semantic meaning is stable even when presentation changes:

- `checklist` means reader-selectable guidance; selected state belongs to the UI, never the document;
- `list` means informational items without selectable state;
- `content`, `interactions`, and `system` identify design layers;
- `relations` identifies links to other patterns.

Wrappers cannot be nested. More than one wrapper may use the same layer. Empty or irrelevant layers should be omitted.

## Derived publishing data

Several parts of the website are derived rather than authored as separate fields.

### Resources

Markdown footnote definitions are extracted from the whole document in definition order:

```mdoc
[^source]: [Short title](https://example.org "Full description")
```

The short title, URL, and optional description populate the Resources card. Inline `[^source]` references become numbered links to that card.

### Related patterns

A `relations` section uses reference-style links and definitions:

```mdoc
[related-pattern]: ./related-pattern
```

Relation items populate the Related card and are not shown as a normal content tab. The current contract resolves `./slug` within the current category.

### Contributors and updated date

Contributor names and the latest content update date are derived from this repository's Git history for each source file. Git history is therefore part of the publishing data model.

### Ordering and icons

`order` controls the sequence of patterns inside a category. Patterns without an order follow ordered patterns and are sorted by title. `icon` selects a supported public icon name; when omitted, the category icon is used.

## Rendering lifecycle

The official website currently follows this lifecycle:

```text
Checkout a configured lxdpatterns-kb revision
        ↓
Confirm all six domain directories exist
        ↓
Discover .mdoc files
        ↓
Parse and validate frontmatter
        ↓
Confirm directory/category agreement and icon validity
        ↓
Extract pattern-list sections, footnotes, and link definitions
        ↓
Derive resources, relations, ordering, and Git metadata
        ↓
Render item descriptions and remaining Markdown with Markdoc
        ↓
Generate /patterns/[category]/[slug] static routes
        ↓
Deploy the static application
```

The website presents available `content`, `interactions`, and `system` layers as tabs. Checklist sections are interactive client-side islands; the rest of the page remains server-rendered or statically generated.

## Content fidelity and migration

The initial Notion outline was migrated into `.mdoc` files before the semantic section model was implemented. Many untouched drafts therefore retain five placeholder Markdown sections and task-list lines.

This legacy syntax remains readable during migration, but it is not the target authoring model. When a pattern is developed or structurally migrated:

1. preserve original titles, headings, wording, capitalisation, and item text;
2. convert structured sections to `pattern-list` wrappers;
3. use level-two headings for item titles;
4. convert Sources into footnotes;
5. convert Related into a `relations` section and reference definitions;
6. remove irrelevant empty placeholders.

Editorial normalisation must be reviewed separately from structural migration.

## Public content contract

Every supported field and semantic construct must have:

- a documented purpose;
- defined required and optional values;
- rules for allowed child content;
- known validation behaviour;
- stable semantic meaning;
- a migration path when changed.

Breaking changes require:

1. an explicit rationale;
2. coordinated renderer support;
3. a migration plan for existing documents;
4. updated `AGENTS.md`, templates, and documentation;
5. validation against representative legacy and semantic documents.

See [docs/CONTENT_MODEL.md](./docs/CONTENT_MODEL.md) and [docs/PATTERN_FORMAT.md](./docs/PATTERN_FORMAT.md).

## Validation responsibility

This repository documents the rules and provides real content fixtures. The consuming web application performs executable validation during content sync and static generation.

Current validation covers:

- presence of all six domain directories;
- presence of `.mdoc` patterns;
- required and typed frontmatter values;
- supported category and status values;
- directory/category agreement;
- non-negative numeric order values;
- supported icon names;
- valid `pattern-list` roles, layers, and section titles;
- Markdoc validation for rendered Markdown.

Internal relation existence, complete YAML semantics, deep asset validation, and comprehensive rename-aware contributor analysis are not yet guaranteed by the current implementation. Documentation must not claim those checks exist until they are implemented.

## Repository integration

The repositories remain independent rather than using a Git submodule or publishing content as an npm package.

For local development, the web application can read a sibling checkout:

```text
workspace/
├── lxdpatterns-kb/
└── lxdpatterns-web/
```

In normal builds, the web application's content sync script clones this repository into `.content/lxdpatterns-kb`. The selected URL, branch or tag, and Git depth are configurable. Sufficient Git history should be retained for contributor metadata.

A content-only merge must trigger a new web build through the deployment integration; it does not modify the private web repository.

## Licensing boundary

Original content in this repository is licensed under CC BY 4.0 unless an exception is clearly identified. Third-party quotations, images, trademarks, and referenced materials retain their respective rights.

The private website implementation is licensed separately. Reuse of the public content does not grant access to or rights in the application source.