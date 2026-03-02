# Contributing

## Image Compression

All images added to this repo should be compressed before committing to keep the site fast.

### Option A: TinyPNG API (Recommended)

Get a free API key at https://tinypng.com/developers (500 free compressions/month), then:

```bash
export TINYPNG_API_KEY=your_api_key_here
./scripts/compress-images.sh images/your-folder/your-image.jpg
```

The script will:
1. Upload the image to TinyPNG
2. Download the compressed version
3. Replace the original in-place
4. Report the savings

### Option B: Sharp (Node.js, no API key needed)

If you have Node.js installed locally, you can use `sharp` for offline compression:

```bash
npx sharp-cli --input images/your-folder/your-image.jpg \
  --output images/your-folder/your-image.jpg \
  --quality 80 --progressive
```

### Guidelines

- JPEGs: quality 80 with progressive encoding is a good baseline
- PNGs: use lossless compression (TinyPNG handles this well)
- Max image width for gallery: 1920px (resize if larger)
- Always verify the compressed image looks good before committing

### Bulk compress all images

```bash
export TINYPNG_API_KEY=your_api_key_here
find images -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read img; do
  ./scripts/compress-images.sh "$img"
done
```
