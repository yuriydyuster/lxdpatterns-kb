# LXD Patterns Knowledge Base

An open, collaborative knowledge base of **digital learning experience design patterns**.

This repository is the canonical source for the authored pattern documents, assets, templates, and public authoring contract used by the LXD Patterns website. The private web application consumes this repository at build time; it is not a second source of content.

## Content domains

Every pattern belongs to one of six domains. The directory and the frontmatter `category` value must agree.

| Directory | Frontmatter category | Purpose |
| --- | --- | --- |
| `activities/` | `activity` | Individual learner actions and activity types. |
| `flows/` | `flow` | Sequences, formats, and structures combining activities. |
| `nudges/` | `nudge` | Prompts that support discovery, entry, return, and continuation. |
| `concepts/` | `concept` | Theories, models, principles, and analytical frameworks. |
| `gamifications/` | `gamification` | Progression, feedback, recognition, and motivational mechanics. |
| `interfaces/` | `interface` | Navigation and visible interface structures. |

Supporting directories:

```text
assets/       Licensed images and other reusable content assets
templates/    Starting points for new pattern documents
docs/         Content-model, format, and editorial documentation
```

## Pattern document model

Each `.mdoc` file represents one pattern and contains:

1. single-line YAML-style frontmatter;
2. ordinary Markdown prose where no special semantic role is required;
3. semantic `{% pattern-list %}` wrappers for structured lists and checklists;
4. Markdown footnotes for sources;
5. reference-style links for related patterns.

A structured section uses one level-one heading as the section title and level-two headings as item titles:

```mdoc
{% pattern-list role="checklist" layer="content" %}
# Content design

## First checklist item

The item description is ordinary Markdown and may cite a source.[^source]
{% /pattern-list %}

[^source]: [Short source title](https://example.org "Full source description")
```

Supported roles are `list` and `checklist`. Supported layers are `content`, `interactions`, `system`, and `relations`.

The website derives presentation and metadata from this semantic source:

- `content`, `interactions`, and `system` sections become layer tabs;
- `role="checklist"` creates reader-selectable checklist controls, but selected state is never authored in the document;
- `role="list"` renders every item as a complete informational block;
- footnote definitions become the Resources card;
- `relations` sections and reference-style links become the Related card;
- contributors and the updated date come from this repository's Git history;
- `order` controls position inside a category and `icon` selects a supported pattern icon.

See [docs/CONTENT_MODEL.md](./docs/CONTENT_MODEL.md) for the complete publishing model and [docs/PATTERN_FORMAT.md](./docs/PATTERN_FORMAT.md) for exact authoring syntax.

## Migration state

Most outline-only drafts still use the original five-section placeholder structure and Markdown task-list syntax. The renderer keeps this legacy syntax readable during migration, but **new patterns and substantively updated patterns must use the semantic `pattern-list` structure**. Do not author checked task-list state.

## Repository boundary

This repository contains only public content and its documentation. It intentionally does **not** contain Next.js, React, Tailwind CSS, shadcn/ui components, deployment secrets, or private application infrastructure. Semantic markup must describe what content means, not how a particular renderer should style it.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the repository boundary and the KB-to-web lifecycle.

## Contributing

Contributions are welcome through GitHub pull requests. Before editing, read:

- [AGENTS.md](./AGENTS.md) — mandatory rules for human contributors and AI agents;
- [docs/CONTENT_MODEL.md](./docs/CONTENT_MODEL.md) — page anatomy and derived website behaviour;
- [docs/PATTERN_FORMAT.md](./docs/PATTERN_FORMAT.md) — exact frontmatter, list, source, and relation syntax;
- the matching file under [`templates/`](./templates/) when creating a pattern.

Preserve original Notion titles, wording, capitalisation, and item text during structural migration. Editorial correction is a separate reviewed change. Do not fabricate references, relationships, evidence, or quotations.

## Contributor attribution

The website derives page contributors and last-updated metadata from Git history. Use a consistent Git author name and email, preserve authorship when moving content, and avoid history rewrites made only to change attribution.

## Licence

Except where otherwise noted, original content in this repository is licensed under the **Creative Commons Attribution 4.0 International Licence (CC BY 4.0)**. Third-party quotations, images, trademarks, and referenced materials remain subject to their respective rights and licences.

See [LICENSE](./LICENSE) for attribution guidance.