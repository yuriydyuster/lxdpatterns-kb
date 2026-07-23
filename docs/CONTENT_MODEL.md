# Pattern page content model

Each `.mdoc` file represents one complete digital learning experience design pattern.

## Migration fidelity

Content migrated from Notion must preserve the original title, section names, wording, capitalization, and checklist text. Do not rewrite, correct, normalize, or expand migrated content unless an editor explicitly requests it.

## Page metadata

Draft pages use minimal frontmatter:

```yaml
---
title: Pattern title
category: activity
status: draft
---
```

Supported categories are:

- `activity`
- `flow`
- `nudge`
- `concept`
- `gamification`
- `interface`

## Empty draft anatomy

Every empty draft created from the initial Notion outline contains these five sections:

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

The dummy checklist items are placeholders only. When real content is written, replace them and remove sections that are not relevant to the pattern.

## Populated drafts

Existing Notion content is copied without editorial changes. Its original subsection names may differ between pages, for example `Content design`, `Interactions design`, `Interface design`, or `Interface Design`. These differences must be preserved until an explicit editorial change is approved.

## Authoring rules

- Use one file per pattern.
- Use standard Markdown wherever possible.
- Keep source wording unchanged during migration.
- Keep `Related` and `Sources` at page level when they are present.
- Do not invent sources, relationships, explanations, or recommendations.
