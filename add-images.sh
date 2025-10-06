#!/bin/bash

# This script adds cover image frontmatter to all markdown articles
# Usage: ./add-images.sh

cd "$(dirname "$0")/md-articles"

for file in *.md; do
    slug="${file%.md}"
    
    # Check if image exists (try both jpg and png)
    if [ -f "../public/images/${slug}.jpg" ]; then
        image_path="/images/${slug}.jpg"
    elif [ -f "../public/images/${slug}.png" ]; then
        image_path="/images/${slug}.png"
    else
        echo "No image found for $slug, skipping..."
        continue
    fi
    
    # Check if frontmatter already exists
    if head -n 1 "$file" | grep -q "^---$"; then
        echo "$file already has frontmatter, skipping..."
        continue
    fi
    
    # Add frontmatter at the beginning of the file
    temp_file=$(mktemp)
    {
        echo "---"
        echo "cover: $image_path"
        echo "---"
        echo ""
        cat "$file"
    } > "$temp_file"
    
    mv "$temp_file" "$file"
    echo "✅ Added image frontmatter to $file"
done

echo ""
echo "Done! Don't forget to rebuild: npm run build"
