#!/usr/bin/env bash
set -euo pipefail
DEST="public/fonts/mazzard"
mkdir -p "$DEST"
cp -f ~/Downloads/font/MazzardH-*.woff2 "$DEST/" 2>/dev/null || true
cp -f ~/Downloads/MazzardH-SemiBold.woff2 "$DEST/" 2>/dev/null || true
ls -la "$DEST"
echo "Done. Commit public/fonts/mazzard/*.woff2 and redeploy."
