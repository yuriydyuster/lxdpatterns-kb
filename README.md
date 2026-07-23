# LXD Patterns Knowledge Base

An open, collaborative knowledge base of **digital learning experience design patterns**.

This repository is the canonical source for reusable guidance, checklists, examples, and evidence about designing digital learning experiences. Its content is intended for learning experience designers, instructional designers, educators, product teams, researchers, and other contributors interested in improving digital learning.

## Content areas

The knowledge base is organised into three main areas:

- **Activities** — individual learning activities such as watching a video, taking a quiz, reading an article, participating in a discussion, or completing a simulation.
- **Flows** — sequences and structures that organise multiple activities, including synchronous and asynchronous learning flows and models such as BOPPPS or CARD.
- **Concepts** — theories, principles, and analytical tools such as constructive alignment, Bloom’s taxonomy, cognitive load, retrieval practice, and feedback.

## Repository role

This repository contains only the public knowledge base:

- Markdown-based `.mdoc` source documents
- images and other content assets
- authoring templates
- contribution and editorial guidance
- documentation of the semantic markup vocabulary

It intentionally does **not** contain the website application, React components, deployment configuration, or other product infrastructure. The official website is maintained in a separate private repository and is one possible renderer of this content.

## Authoring model

Documents use ordinary Markdown wherever possible and a small set of semantic Markdoc tags for content with a specific role, such as checklists, examples, evidence, pitfalls, references, and related patterns.

Semantic markup describes **what a block means**, not how it should look. Content must not depend on React, shadcn/ui, Tailwind CSS, or any specific website implementation.

The planned top-level structure is:

```text
activities/
flows/
concepts/
assets/
templates/
docs/
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for repository boundaries and the content-rendering contract.

## Contributing

Contributions are welcome through GitHub pull requests. You may:

- propose a new pattern
- improve an existing explanation or checklist
- add examples or evidence
- correct errors and broken references
- improve accessibility, clarity, or inclusiveness
- translate or localise content when localisation support is introduced

Before contributing, read [AGENTS.md](./AGENTS.md). Additional templates and editorial guidance will be added as the content model is implemented.

Every contribution should be based on original writing or material that you have permission to contribute. Cite reliable sources for factual, research-based, or historical claims.

## Contributor attribution

The website derives page contributors and last-updated metadata from this repository’s Git history. Use a consistent Git author name and email. A `.mailmap` may later be used to merge aliases belonging to the same contributor.

## License

Except where otherwise noted, the original content in this repository is licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**.

You may share and adapt the material for any purpose, including commercial use, provided that you give appropriate credit, link to the license, and indicate whether changes were made.

See [LICENSE](./LICENSE) for the repository license notice and attribution guidance.

Third-party quotations, images, trademarks, and referenced materials remain subject to their respective rights and licenses.