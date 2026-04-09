#!/usr/bin/env bash
# Push the parent repo (TheKingHippopotamus) to GitHub.
# Portfolio-Platform/ is gitignored here — push it from inside that folder separately.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -d .git ]]; then
  git init
  git add .
  git commit -m "first commit" || true
  git branch -M main
fi

if git remote get-url origin &>/dev/null; then
  echo "Remote origin already set: $(git remote get-url origin)"
else
  git remote add origin git@github.com:TheKingHippopotamus/TheKing.Hippopotamus.git
fi

git push -u origin main
