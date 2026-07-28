# Pattern document format

Pattern documents use ordinary Markdown for headings, prose, links, and footnotes. Semantic Markdoc tags describe the role and learning-design layer of a list without prescribing its visual presentation.

## Frontmatter

```yaml
---
title: Watch a Video
category: activity
status: draft
order: 1
icon: video
---
```

`order` controls the pattern position inside its category and follows the original Notion outline. `icon` uses the same named icon registry as category icons in the web application.

## Semantic list wrapper

Wrap each structured list in `pattern-list`:

```mdoc
{% pattern-list role="checklist" layer="content" %}
# Content design

## First checklist item

The item description is normal Markdown.

## Second checklist item

The item description may contain links, emphasis, and source footnotes.[^example]
{% /pattern-list %}
```

Supported attributes:

- `role`: `list` or `checklist`
- `layer`: `content`, `interactions`, `system`, or `relations`

Inside the wrapper, one level-one heading is the list title. Every level-two heading is an item title. Markdown after an item heading and before the next item heading is the item description.

Do not author checkbox state. A checklist item is selected only by the reader in the web interface.

## References and resources

Use Markdown footnotes to cite sources anywhere in the document:

```mdoc
A sourced statement appears here.[^example]

[^example]: [Source short title](https://example.org "Full source description shown as a tooltip")
```

The web application builds the Resources card from all footnote definitions in the document.

## Related patterns

Use a `relations` list and reference-style relative links:

```mdoc
{% pattern-list role="list" layer="relations" %}
# Related patterns

## Read an Article

Use [Read an Article][read-an-article] when the learning material is primarily textual.
{% /pattern-list %}

[read-an-article]: ./read-an-article
```

Reference identifiers should normally match the target pattern slug. The same reference may be used elsewhere in the document as `[label][pattern_slug]`.

[^example]: [Example source](https://example.org "Full source description shown as a tooltip")
