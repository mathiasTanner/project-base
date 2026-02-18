🤖 LLM Context — Main Branch (Next.js + Strapi Skeleton)

This repository branch is a reusable full-stack starter skeleton designed for cloning into new projects.

It provides infrastructure and wiring only — not business logic.

Stack

Monorepo using:

pnpm workspaces

turborepo-style structure

TypeScript everywhere

Apps:

apps/web → Next.js frontend (App Router)

apps/cms → Strapi v5 CMS backend

PostgreSQL database

Purpose

This branch establishes:

frontend framework

CMS backend

database

containerization

CI/CD image builds

frontend ↔ CMS connectivity

environment config pattern

No payments system is included in this branch.

Frontend (apps/web)

Next.js App Router.

Contains:

server route handlers

Tailwind

basic UI

test buttons for backend connectivity

Frontend talks to CMS only over HTTP using env-configured URL.

No SDK coupling.

Env variable:

NEXT_PUBLIC_CMS_URL

CMS (apps/cms)

Strapi v5 with PostgreSQL.

Used as a reusable CMS base.

No content models required for skeleton validation.

Includes a test endpoint:

/api/health


Returns JSON:

{ ok, service, time }


Used to verify integration.

Database

PostgreSQL via Docker.

Local dev uses container DB but runs Strapi outside Docker.

Docker

Each app has Dockerfile.

Multi-stage builds with pnpm via corepack.

Docker is used for:

CI builds

DB container

production deploy

Not required for frontend/backend dev loop.

CI Pipeline

GitHub Actions builds and pushes:

web image

cms image

to GitHub Container Registry.

Lowercase registry naming enforced.

Dev Model

Run separately:

DB → docker compose up db
CMS → pnpm dev
Web → pnpm dev

Design Principles

Reusable skeleton only.
No domain logic.
CMS always present.
Payments not included.

This branch is the baseline template.