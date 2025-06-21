---
title: "Setting Up My Docusaurus Blog: Lessons Learned"
authors: nawam
date: 2025-06-15
description: "From AI assistance to manual debugging - my journey configuring Docusaurus with GitHub Pages"
sidebar_position: 3
tags:
  ["docusaurus", "github-pages", "webdev", "documentation", "troubleshooting"]
---

# Setting Up My Docusaurus Blog: Lessons Learned

## The Promise of AI Assistance

When I began this project, I thought: _"This will be easy - I'll just use DeepSeek R1 to generate the configs and be done in minutes."_ The initial setup looked promising:

```bash
npx create-docusaurus@latest my-blog classic --typescript
```

<!-- truncate -->

But reality had other plans...

## The Configuration Hurdles

### 1. GitHub Pages Deployment Woes

The first version of my `deploy.yml` failed with frustrating permissions errors:

```yaml
# First attempt (failed)
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
```

After consulting the [Docusaurus deployment docs](https://docusaurus.io/docs/deployment), I fixed it by adding:

```yaml {3-4}
# Working version
permissions:
  contents: write # Critical for gh-pages branch
  pages: write
```

### 2. The Mysterious 404

Even after successful builds, my site showed only the repository README. The solution? Two crucial changes:

1. **Repository naming**: Had to rename to `<username>.github.io`
2. **Config updates**:

```javascript
// docusaurus.config.js
baseUrl: '/', // Not '/my-blog/'
url: 'https://nawa094.github.io'
```

## The Debugging Process

Here's what ultimately worked:

1. **Local testing first**:

```bash
npm run build && npm run serve
```

2. **Manual inspection** of the `gh-pages` branch contents

3. **Cache busting** by adding `?v=2` to the URL during testing

## Key Takeaways

✅ **AI is helpful but not perfect** - Always verify generated configs  
✅ **Read the docs** - Docusaurus has excellent troubleshooting guides  
✅ **Test incrementally** - Small changes → commit → verify

## Final Config Snippets

### Working deploy.yml

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: write
  pages: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

### Critical Config Settings

```javascript
// docusaurus.config.js
const config = {
  url: "https://nawa094.github.io",
  baseUrl: "/",
  organizationName: "nawa094",
  projectName: "nawa094.github.io",
  trailingSlash: false,
  // ... other configs
};
```

## What's Next?

Now that the foundation is solid, I plan to:

- [ ] Add a custom domain
- [ ] Implement newsletter functionality
- [ ] Create tutorial series

**Pro Tip**: Bookmark these resources:

- [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
