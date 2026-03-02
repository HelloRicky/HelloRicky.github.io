#!/usr/bin/env bash
# compress-images.sh — Compress images via TinyPNG API
# Usage: ./scripts/compress-images.sh <image-path>
#
# Requires: TINYPNG_API_KEY environment variable
# API docs: https://tinypng.com/developers

set -euo pipefail

IMAGE_PATH="${1:-}"

if [[ -z "$IMAGE_PATH" ]]; then
  echo "Usage: $0 <image-path>"
  echo "Example: $0 images/personal-photos/IMG_4358.jpg"
  exit 1
fi

if [[ ! -f "$IMAGE_PATH" ]]; then
  echo "Error: File not found: $IMAGE_PATH"
  exit 1
fi

if [[ -z "${TINYPNG_API_KEY:-}" ]]; then
  echo "Error: TINYPNG_API_KEY environment variable is not set."
  echo "Get a free API key at https://tinypng.com/developers"
  exit 1
fi

ORIG_SIZE=$(wc -c < "$IMAGE_PATH")
echo "📷 Compressing: $IMAGE_PATH"
echo "   Original size: $(numfmt --to=iec-i --suffix=B "$ORIG_SIZE")"

# Step 1: Upload to TinyPNG (get the compressed file URL)
RESPONSE=$(curl -s --fail \
  --user "api:${TINYPNG_API_KEY}" \
  --data-binary @"$IMAGE_PATH" \
  https://api.tinify.com/shrink)

COMPRESSED_URL=$(echo "$RESPONSE" | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)

if [[ -z "$COMPRESSED_URL" ]]; then
  echo "Error: Failed to compress image. Response:"
  echo "$RESPONSE"
  exit 1
fi

# Step 2: Download compressed version back
curl -s --fail \
  --user "api:${TINYPNG_API_KEY}" \
  -o "$IMAGE_PATH" \
  "$COMPRESSED_URL"

NEW_SIZE=$(wc -c < "$IMAGE_PATH")
SAVED=$((ORIG_SIZE - NEW_SIZE))
PCT=$(awk "BEGIN { printf \"%.1f\", ($SAVED / $ORIG_SIZE) * 100 }")

echo "   Compressed size: $(numfmt --to=iec-i --suffix=B "$NEW_SIZE")"
echo "   Savings: $(numfmt --to=iec-i --suffix=B "$SAVED") (${PCT}% reduction)"
echo "Done: $IMAGE_PATH"
