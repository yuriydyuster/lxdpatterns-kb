# Pattern document format

Pattern documents use ordinary Markdown for prose, links, quotations, and footnote references. Semantic Markdoc wrappers describe the role and learning-design layer of structured items without prescribing visual presentation.

## File and slug

Store one pattern per `.mdoc` file inside its domain directory. The filename without `.mdoc` is the public slug.

```text
activities/watch-a-video.mdoc
→ /patterns/activities/watch-a-video
```

Use lowercase kebab-case filenames. Published slugs should not change without an explicit redirect and migration plan.

## Frontmatter

The current parser supports single-line scalar values only.

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

### Fields

| Field | Required | Allowed values or format |
| --- | --- | --- |
| `title` | yes | Non-empty string. |
| `category` | yes | `activity`, `flow`, `nudge`, `concept`, `gamification`, or `interface`. |
| `status` | expected | `planned`, `draft`, `review`, or `stable`. Defaults to `draft`. |
| `summary` | no | One concise line used on the page and in metadata. |
| `order` | no | Non-negative integer. |
| `icon` | no | Supported icon name. Category icon is the fallback. |

Supported icon names:

```text
target
route
magnet
lightbulb
trophy
panels
video
file-text
headphones
list-checks
chart-no-axes-combined
```

Do not use multiline YAML, arrays, nested objects, folded blocks, or arbitrary icon names. The directory and `category` must match.

## Semantic list wrapper

Wrap every structured list or checklist in `pattern-list`:

```mdoc
{% pattern-list role="checklist" layer="content" %}
# Content design

## First checklist item

The item description is normal Markdown.

## Second checklist item

The description may contain links, emphasis, lower-level headings, lists, and source footnotes.[^example]
{% /pattern-list %}
```

Required attributes:

- `role`: `list` or `checklist`;
- `layer`: `content`, `interactions`, `system`, or `relations`.

Unknown or missing values fail publication.

## Section and item structure

Inside a wrapper:

1. the first level-one heading is the section title;
2. every level-two heading begins a new item;
3. Markdown after an item title belongs to that item until the next level-two heading or closing tag.

Rules:

- use one meaningful level-one title per wrapper;
- include at least one meaningful item;
- do not put a level-two heading inside an item description;
- do not nest `pattern-list` wrappers;
- more than one wrapper may use the same layer;
- preserve source order;
- omit irrelevant layers instead of creating empty sections.

## Roles

### `role="checklist"`

Use for criteria or guidance a reader may select while reviewing their design.

```mdoc
{% pattern-list role="checklist" layer="interactions" %}
# Interactions design

## Keyboard navigation is available

Describe the expected keyboard behaviour and applicable scope.
{% /pattern-list %}
```

The website renders one checklist card with:

- the section title;
- `X out of Z` selected count;
- one UI checkbox per item;
- the item title;
- a two-line collapsed description;
- expandable full details;
- separators between items.

Checkbox state belongs entirely to the reader interface. Do not author `- [x]`, `checked`, `selected`, or any equivalent source state.

### `role="list"`

Use for informational items that should not be selected.

```mdoc
{% pattern-list role="list" layer="system" %}
# System design

## Completion data is recorded

Describe the required system behaviour and why it matters.
{% /pattern-list %}
```

The website renders every item as a separate complete card. The wrapper title groups the items semantically but is not currently displayed as an additional card heading.

## Layers

### `layer="content"`

Learning material, pedagogy, explanations, media, examples, accessibility of content, and alignment with intended outcomes.

### `layer="interactions"`

Learner controls, navigation within an activity, feedback, input, disclosure, and interaction behaviour.

### `layer="system"`

Delivery infrastructure, permissions, tracking, analytics, performance, platform behaviour, integrations, and technical safeguards.

### `layer="relations"`

Links to other patterns. Relations do not appear as a main content tab; they populate the Related card.

The website creates tabs for the available `content`, `interactions`, and `system` layers in that order. A tab is shown whenever at least one section exists for that layer.

## Prose outside wrappers

Ordinary Markdown outside `pattern-list` wrappers remains part of the page and is rendered after the layer tabs.

Use it for content such as:

- a longer introduction;
- context that applies to the entire pattern;
- cautions or interpretation notes;
- prose that is not a list of items.

Footnote definitions and link definitions are extracted and do not appear as visible prose.

## References and Resources card

Use Markdown footnotes to cite sources anywhere in the document:

```mdoc
A sourced statement appears here.[^example]

[^example]: [Source short title](https://example.org "Full source description shown as a tooltip")
```

Current syntax requirements:

- define each source on one line;
- use a unique footnote identifier;
- use one Markdown link as the definition value;
- use the link text as the concise resource title;
- use a stable URL;
- use the optional quoted title for a fuller description.

The website collects definitions in document order, assigns numbers, removes definitions from the visible body, and builds the Resources card. Inline footnote markers become links to the corresponding resource.

Do not create a separate semantic Sources section.

Always use the repository-local [Footnote Source Audit skill](../.skills/footnote-source-audit/SKILL.md) to check or normalise source links. It may edit footnote definition lines and inline marker identifiers only; it must report any source-to-claim mismatch and source-link correction in chat and must never silently change instructional prose.

## Related patterns

Use a `relations` wrapper and reference-style links:

```mdoc
{% pattern-list role="list" layer="relations" %}
# Related patterns

## Read an Article

Use [Read an Article][read-an-article] when the learning material is primarily textual.

## Listen to Audio

Use [Listen to Audio][listen-to-audio] when learners should focus on spoken content.
{% /pattern-list %}

[read-an-article]: ./read-an-article
[listen-to-audio]: ./listen-to-audio
```

Rules:

- use `role="list"` for relations;
- use one item per related pattern;
- include a reference-style link in the item description;
- normally use the target slug as the reference identifier;
- define each identifier after the content;
- use `./slug` for a pattern in the same category.

The same definition may be reused elsewhere in the document as `[label][pattern_slug]`.

The current renderer only resolves `./slug` as a category-relative pattern route. Coordinate a schema and renderer change before introducing a cross-category shorthand.

## Complete pattern skeleton

```mdoc
---
title: Pattern title
category: activity
status: draft
summary: Replace this line with a concise description of the pattern.
order: 1
icon: target
---

{% pattern-list role="checklist" layer="content" %}
# Content design

## First content criterion

Replace with reviewed guidance.[^source]
{% /pattern-list %}

{% pattern-list role="checklist" layer="interactions" %}
# Interactions design

## First interaction criterion

Replace with reviewed guidance.
{% /pattern-list %}

{% pattern-list role="list" layer="system" %}
# System design

## First system consideration

Replace with reviewed guidance.
{% /pattern-list %}

{% pattern-list role="list" layer="relations" %}
# Related patterns

## Related pattern title

Explain the relationship to [Related pattern title][related-pattern].
{% /pattern-list %}

[related-pattern]: ./replace-with-slug

[^source]: [Source short title](https://example.org "Full source description")
```

Remove any section, relation, or source placeholder that is not genuinely needed before publication.

## Legacy task-list syntax

Historical outline drafts may still contain:

```md
## Learning content design

- [ ] Check list item
```

This syntax remains readable during migration but does not define the current semantic checklist model. New or substantively updated documents must use `pattern-list`. Authored checked state is ignored.

## Review checklist

Before opening a pull request:

- confirm the filename and category directory;
- confirm frontmatter uses single-line values;
- confirm category and directory agree;
- set a meaningful status;
- set `order` according to the category sequence when known;
- use a supported icon or omit it intentionally;
- validate wrapper roles, layers, titles, and closing tags;
- ensure item descriptions do not contain level-two headings;
- verify every footnote and reference definition;
- remove unused placeholders;
- preserve original migrated wording unless the pull request explicitly includes editorial changes.

[^example]: [Example source](https://example.org "Full source description shown as a tooltip")
