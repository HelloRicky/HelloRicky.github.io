# Contributing

## Image Compression

**All images must be optimized with Sharp before committing.** This keeps the site fast.

### Sharp (Primary Method)

```bash
npx sharp-cli --input images/your-folder/your-image.jpg \
  --output images/your-folder/your-image.jpg \
  --quality 80 --progressive
```

### Bulk Compress All Images

```bash
find images -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -exec sh -c '
  npx sharp-cli --input "$1" --output "$1" --quality 80 --progressive
' _ {} \;
```

### Guidelines

- **JPEGs:** quality 80 with progressive encoding
- **PNGs:** use lossless compression
- **Max width:** 1920px (resize if larger)
- **Always verify** the compressed image looks good before committing

### Alternative: TinyPNG API

If you prefer cloud compression, get a free API key at https://tinypng.com/developers (500/month):

```bash
export TINYPNG_API_KEY=your_api_key_here
./scripts/compress-images.sh images/your-folder/your-image.jpg
```
