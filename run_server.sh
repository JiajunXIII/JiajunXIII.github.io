#!/usr/bin/env bash
set -euo pipefail

bundle _2.2.19_ exec jekyll serve \
  --livereload \
  --force_polling \
  --host 0.0.0.0 \
  --port 4000
