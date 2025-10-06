# How to Add Hero Images to Articles

## Method 1: Add images to the public folder

1. Place your image in `/public/images/` folder
2. Add frontmatter to your article at the very top:

```markdown
---
cover: /images/your-image.jpg
---

# Article Title

*Date*
```

## Method 2: Use external URLs

Add frontmatter with external URL:

```markdown
---
cover: https://example.com/image.jpg
---

# Article Title

*Date*
```

## Example Article with Hero Image:

```markdown
---
cover: /images/ai-freelancer-hero.jpg
---

# AI for Freelancers & Solopreneurs: Managing Workloads Efficiently

*Apr 18, 2025*

*Time-Saving Strategies Using Your Existing Tech Stack*

**Introduction: The Freelancer's Daily Circus**
If you're reading this...
```

## Recommended Image Sizes:
- Width: 1200-1600px
- Height: 600-800px
- Format: JPG or PNG
- File size: Keep under 500KB for fast loading

## Current Improvements Made:
✅ Email removed from footer
✅ Article cards on main page show only titles
✅ No duplicate titles in articles
✅ Beautiful hero section with gradient background
✅ Improved typography with gold accents
✅ Better spacing and readability
✅ Italic subtitles with gold left border
✅ Bold section headers stand out
✅ Centered, max-width content for better readability
