# Pattern page content model

Each `.mdoc` file represents one complete digital learning experience design pattern. This document describes the page-level publishing model; [PATTERN_FORMAT.md](./PATTERN_FORMAT.md) provides exact authoring syntax.

## 1. Canonical source

The `.mdoc` file is the single source of truth for:

- page metadata;
- pattern guidance;
- source citations;
- relationships to other patterns;
- category ordering and icon selection.

Website cards, tabs, checklist controls, resources, related links, contributor names, and update dates are derived from the document and repository history. Do not duplicate them as separate website data.

## 2. Domain and route mapping

| Directory | Frontmatter `category` | Website route segment |
| --- | --- | --- |
| `activities/` | `activity` | `activities` |
| `flows/` | `flow` | `flows` |
| `nudges/` | `nudge` | `nudges` |
| `concepts/` | `concept` | `concepts` |
| `gamifications/` | `gamification` | `gamifications` |
| `interfaces/` | `interface` | `interfaces` |

The filename without `.mdoc` is the stable slug. A file at `activities/watch-a-video.mdoc` is published at `/patterns/activities/watch-a-video`.

## 3. Frontmatter model

The current implementation accepts single-line scalar frontmatter values.

| Field | Required | Values and behaviour |
| --- | --- | --- |
| `title` | yes | Non-empty public pattern title. |
| `category` | yes | One of the six category values above; must match the directory. |
| `status` | expected | `planned`, `draft`, `review`, or `stable`; defaults to `draft` if omitted. |
| `summary` | no | Concise page and metadata description. Must be a single line. |
| `order` | no | Non-negative integer controlling order inside the category. |
| `icon` | no | Supported icon name; category icon is used when omitted. |

Example:

```yaml
---
title: Watch a Video
category: activity
status: draft
summary: Guidance for designing and delivering effective learning videos.
order: 1
icon: video
---
```

Patterns are sorted by category definition, then by `order`, then alphabetically by title. Unordered patterns follow ordered patterns.

## 4. Body model

A body may contain:

1. ordinary Markdown outside semantic wrappers;
2. one or more semantic `pattern-list` wrappers;
3. footnote definitions for sources;
4. reference-style link definitions for related patterns.

Ordinary Markdown remaining outside wrappers is rendered after the layer sections. This is suitable for introductions, context, cautions, or other prose that does not belong to a structured list.

## 5. Semantic section model

A structured section has:

- a `role` describing how the items are used;
- a `layer` describing which part of the learning experience they address;
- one level-one section title;
- one or more level-two item titles;
- Markdown descriptions following each item title.

```mdoc
{% pattern-list role="checklist" layer="content" %}
# Content design

## State one clear learning purpose

Explain what the learner should gain from the material.
{% /pattern-list %}
```

### Roles

| Role | Semantic meaning | Current website behaviour |
| --- | --- | --- |
| `checklist` | Guidance the reader may assess or select. | One card with section title, selected count, checkbox per item, two-line preview, and expandable details. |
| `list` | Informational items without selection state. | One complete card per item; the item title and full description are shown. |

Checklist state is reader-controlled UI state. The source document never stores whether an item is selected.

### Layers

| Layer | Meaning | Current website placement |
| --- | --- | --- |
| `content` | Learning material and pedagogical content. | Content tab. |
| `interactions` | Controls, feedback, learner behaviour, and interaction design. | Interactions tab. |
| `system` | Platform, delivery, analytics, permissions, and technical behaviour. | System tab. |
| `relations` | Links to other patterns. | Related sidebar card; not a tab. |

Only layers present in the document are shown. More than one section may use the same layer and will appear in source order inside the same tab.

For `role="list"`, each item is the visible unit, so the wrapper's level-one title is semantic grouping metadata rather than a separate displayed card heading. For `role="checklist"`, the level-one title is displayed in the checklist card header.

## 6. Item boundaries

Inside a wrapper:

- the first level-one heading is the section title;
- every level-two heading begins a new item;
- all following Markdown belongs to that item until the next level-two heading or closing tag;
- descriptions may contain paragraphs, links, emphasis, quotations, lists, footnote references, and lower-level headings;
- descriptions must not contain level-two headings because they start new items;
- wrappers must not be nested.

## 7. Resources model

Sources are ordinary Markdown footnotes whose definitions use one Markdown link:

```mdoc
A factual statement appears here.[^source-id]

[^source-id]: [Short source title](https://example.org "Full description")
```

The publishing application:

1. collects definitions from the whole document in definition order;
2. assigns sequential numbers;
3. removes the definitions from the visible document body;
4. turns inline footnote references into links to the Resources card;
5. uses the link text as the resource title;
6. uses the URL as the external link;
7. uses the optional quoted title as the fuller description and tooltip.

A source definition should be written on one line. Do not create a separate Sources heading or checklist in the semantic format.

## 8. Relations model

Related patterns use a `relations` wrapper plus reference-style links:

```mdoc
{% pattern-list role="list" layer="relations" %}
# Related patterns

## Read an Article

Use [Read an Article][read-an-article] when the material is primarily textual.
{% /pattern-list %}

[read-an-article]: ./read-an-article
```

The publishing application extracts relation items into the Related card. A relation item must contain a reference-style link so the parser can associate it with a link definition.

Reference identifiers should normally match the target slug. The current supported shorthand `./slug` resolves within the current category. Cross-category relation syntax requires a coordinated contract and renderer update.

The same definition may be reused elsewhere as `[custom label][read-an-article]`.

## 9. Contributor model

Contributors and the updated date are not frontmatter. During the build, the web application runs Git history queries for each source path and derives:

- unique author names in history order;
- the latest author date for the file.

Use a consistent Git identity and preserve meaningful authorship when moving content.

## 10. Migration fidelity

Content migrated from Notion must preserve the original:

- title;
- section names;
- item wording;
- capitalisation;
- sequence.

Structural migration means wrapping and re-expressing the same content in the semantic model. Spelling fixes, rewriting, normalisation, expansion, and new recommendations are separate editorial changes.

## 11. Legacy compatibility

Untouched outline drafts may still use this historical placeholder structure:

```md
## Learning content design

- [ ] Check list item

## Interactions design

- [ ] Check list item

## System design

- [ ] Check list item

## Related

- [ ] Check list item

## Sources

- [ ] Check list item
```

The website keeps Markdown task-list lines readable for migration compatibility, but they are not interactive semantic checklists and authored checked state is ignored. Do not create new documents in this format.

When a legacy draft receives substantive work, migrate it to `pattern-list`, footnotes, and relation definitions, and remove sections that are not relevant.

## 12. Complete example

```mdoc
---
title: Example Pattern
category: activity
status: draft
summary: A concise description of the example pattern.
order: 20
icon: target
---

This introductory paragraph is ordinary Markdown and will appear after the structured layer sections.

{% pattern-list role="checklist" layer="content" %}
# Content design

## Make the purpose explicit

State why the activity matters and cite evidence where appropriate.[^example]
{% /pattern-list %}

{% pattern-list role="list" layer="system" %}
# System design

## Record meaningful completion data

Store only the data needed to support learner progress and evaluation.
{% /pattern-list %}

{% pattern-list role="list" layer="relations" %}
# Related patterns

## Read an Article

Combine with [Read an Article][read-an-article] when learners need supporting text.
{% /pattern-list %}

[read-an-article]: ./read-an-article

[^example]: [Example source](https://example.org "Full source description")
```

## 13. Validation expectations

Before publication, a document must satisfy the current contract:

- required frontmatter parses successfully;
- category matches the directory;
- order is a non-negative integer when present;
- icon is supported when present;
- wrappers use supported roles and layers;
- each wrapper has a level-one title;
- item boundaries are unambiguous;
- footnote and relation definitions use the documented one-line forms;
- source Markdown remains understandable independently of the official website.

The web application currently does not guarantee full YAML support or validate that every related slug exists. Do not rely on undocumented behaviour.