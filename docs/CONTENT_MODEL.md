# Pattern page content model

Each `.mdoc` file represents one complete learning experience design pattern. A checklist subsection is part of that page and must not be split into a separate document.

## Page metadata

Until executable schemas are introduced, pattern pages use this minimal frontmatter:

```yaml
---
title: Watch a video
category: activity
status: draft
summary: Guidance for designing video-based learning experiences.
---
```

Supported primary categories are:

- `activity`
- `flow`
- `concept`

Initial status values are:

- `planned` — listed in the documentation outline but not yet developed
- `draft` — contains initial content that still requires editorial and evidence review
- `review` — ready for structured review
- `stable` — reviewed and suitable for publication

## Activity page anatomy

An activity page may contain any combination of the following checklist subsections:

```md
## Learning content design

- [ ] Checklist item

## Interaction and interface design

- [ ] Checklist item

## System design

- [ ] Checklist item
```

These sections are optional. Omit a section when it is not relevant or no meaningful guidance exists yet. Do not add an empty checklist merely to satisfy a template.

The checklist headings describe the design perspective:

- **Learning content design** — pedagogical purpose, structure, language, media, accessibility, and alignment with intended learning outcomes.
- **Interaction and interface design** — controls, navigation, feedback, readability, input methods, progress visibility, and user experience.
- **System design** — persistence, permissions, delivery infrastructure, analytics, compatibility, performance, and platform behaviour.

Flows and concepts may use other semantic sections when these three perspectives do not fit the subject.

## Related

`Related` is a page-level section for links to other patterns in this knowledge base.

```md
## Related

- [Pattern title](../path/to/pattern.mdoc)
```

Only add meaningful relationships. An empty `Related` section may be omitted from early drafts.

## Sources

`Sources` is a page-level section for research, standards, official documentation, and migration provenance.

```md
## Sources

- Author. *Title*. Publisher, year. URL
```

Sources should support claims made on the page. A source entry must not be invented. During migration, the original Notion page may be recorded here as provenance, but it is not a substitute for evidence supporting the guidance.

## Authoring rules

- Use one file per pattern.
- Use standard Markdown wherever possible.
- Keep checklist items actionable and independently reviewable.
- Avoid presentation-specific terminology and implementation details.
- Omit unsupported or irrelevant sections rather than filling them with placeholders.
- Keep `Related` and `Sources` at page level, after the main content.
- Treat the current Notion material as draft input requiring later evidence and editorial review.
