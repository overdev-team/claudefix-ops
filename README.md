# CLAUDEFIX public operations

Public, credential-free health checks for [CLAUDEFIX](https://claudefix.store).

- `sitemap-health.yml` checks that Googlebot receives a valid 200 XML sitemap three times, every 30 minutes.
- `ph-launch-check.yml` checks the Product Hunt launch on 2026-09-29, with manual dispatch available.

The website source and Cloudflare deployment credentials remain in the private `overdev-team/claudefix` repository. This repository contains no deployment secrets or private source.
