# Architecture

## Overview

`lxdpatterns-kb` is the public, canonical content repository for LXD Patterns. It stores authored knowledge about digital learning experience design independently from any website framework, component library, or deployment platform.

The repository is consumed by the private `lxdpatterns-web` application during its build process. The content repository defines the authoring contract; the web repository implements one renderer of that contract.

## Repository boundaries

This repository contains:

- `.mdoc` source documents
- content assets
- authoring templates
- contribution guidance
- editorial documentation
- the public semantic markup specification

This repository must not contain:

- Next.js or React application code
- shadcn/ui components
- Tailwind CSS configuration
- website routing or deployment logic
- application secrets or private infrastructure
- presentation-specific markup

## Content domains

Documents are organised into three primary domains:

```text
activities/   Individual learning activities and learner actions
flows/        Sequences, formats, and structures combining activities
concepts/     Theories, models, principles, and analytical frameworks
```

Supporting directories may include:

```text
assets/       Images and other licensed content assets
templates/    Authoring templates for new documents
docs/         Editorial and markup documentation
```

## Source format

`.mdoc` files are the single source of truth. Documents use:

1. YAML frontmatter for structured page metadata.
2. Standard Markdown for prose, headings, lists, links, tables, and quotations.
3. A small set of semantic Markdoc tags for blocks with a defined content role.

Example semantic roles include:

- `checklist`
- `example`
- `evidence`
- `pitfall`
- `references`
- `related-patterns`

Semantic markup describes meaning rather than visual presentation. The public content model must never expose React component names, Tailwind classes, shadcn/ui primitives, layout coordinates, colours, or other renderer-specific details.

## Content contract

The content schema is a public interface between authors and renderers. Each supported frontmatter field and semantic tag should have:

- a documented purpose
- defined required and optional attributes
- rules for allowed child content
- validation behaviour
- a stable semantic meaning

Schema changes must be backwards-compatible where practical. Breaking changes require:

1. an explicit rationale;
2. coordinated renderer support;
3. a migration plan for existing documents;
4. updated public authoring documentation.

## Rendering lifecycle

The official website follows this lifecycle:

```text
Public content repository
        ↓
Checkout during web build
        ↓
Validate frontmatter and Markdoc structure
        ↓
Parse `.mdoc` into a semantic document tree
        ↓
Map semantic nodes to project-specific React components
        ↓
Generate static pages, search data, and metadata
```

The web application may use shadcn/ui internally, but the content contract remains independent of that implementation.

## Contributor metadata

Page contributors and last-updated information are derived from this repository’s Git history during the website build.

The renderer should:

- inspect file history with rename tracking where practical;
- normalise contributor identities using `.mailmap` when introduced;
- distinguish meaningful content authorship from automated or formatting-only changes where possible;
- preserve links from rendered pages to their canonical source files.

Git history is therefore part of the publishing data model and should be preserved responsibly.

## Validation

The consuming web application is responsible for executable validation, while this repository contains the public rules and fixtures required to understand that validation.

Validation should cover:

- required and typed frontmatter
- supported document categories
- valid semantic tags and attributes
- allowed nesting and child content
- unique stable slugs
- internal links and related-pattern references
- source and asset metadata
- accessible alternative text where applicable

A content change must fail publication when it violates the current public contract.

## Repository integration

The repositories remain independent rather than using a Git submodule or publishing content as an npm package.

For local development, the web application may read a sibling checkout:

```text
workspace/
├── lxdpatterns-kb/
└── lxdpatterns-web/
```

In CI, the web pipeline checks out both repositories, including sufficient knowledge-base Git history to generate contributor metadata. A merge to the content repository should trigger validation and a rebuild of the official website.

## Licensing boundary

Original content in this repository is licensed under CC BY 4.0 unless an exception is clearly identified. Third-party quotations, images, trademarks, and referenced materials retain their respective rights.

The private website implementation is not covered by this repository’s license. Reuse of the public content does not grant access to or rights in the official web application.