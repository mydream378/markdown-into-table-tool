# 🚀 GitHub Repository Setup Guide

Follow these steps to set up your academic webpage on GitHub Pages:

## 📋 Prerequisites
- GitHub account
- This project code ready to push

## 🔧 Step-by-Step Setup

### 1. Create a New GitHub Repository
1. Go to [GitHub.com](https://github.com) and log in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `academic-webpage` or `yourname.github.io` for personal site)
5. Make it **Public** (required for GitHub Pages)
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

### 2. Configure GitHub Pages
1. Go to your repository Settings
2. Scroll down to "Pages" section
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"
4. Save the changes

### 3. Update Project Configuration
Before pushing, update these files with your repository name:

**package.json**:
```json
"homepage": "https://yourusername.github.io/your-repo-name"
```

**vite.config.ts**:
```typescript
base: '/your-repo-name/'
```

### 4. Connect Local Repository to GitHub
In your project directory, run:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Academic webpage setup"

# Add remote repository (replace with your repository URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to main branch
git push -u origin main
```

### 5. Automatic Deployment
Once you push to the main branch:
1. GitHub Actions will automatically trigger
2. Build process will start (takes ~2-3 minutes)
3. Your site will be deployed to GitHub Pages
4. Visit your site at: `https://yourusername.github.io/your-repo-name`

## 🔍 Verification Steps

### Check Deployment Status
1. Go to your repository on GitHub
2. Click on "Actions" tab
3. Look for the latest workflow run
4. Green checkmark = Success ✅
5. Red X = Check logs for errors ❌

### Test Your Website
1. Visit your GitHub Pages URL
2. Check all sections load properly
3. Test navigation between pages
4. Verify responsive design on mobile

## 🛠️ Troubleshooting

### Common Issues

**Build Failed?**
- Check the Actions tab for error messages
- Ensure all dependencies are installed locally
- Run `npm run build` locally to catch errors

**404 Page Not Found?**
- Verify the `base` path in `vite.config.ts` matches your repository name
- Check that GitHub Pages is enabled in repository settings

**Styling Issues?**
- Ensure Tailwind CSS is properly configured
- Check browser console for CSS loading errors

**TypeScript Errors?**
- Run `npm run check` locally
- Fix any type errors before pushing

### Getting Help
1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review the Actions logs in your repository
3. Create an issue in your repository with error details

## 🎉 Success!

Once deployed, your academic webpage will be:
- ✅ Live on GitHub Pages
- ✅ Accessible worldwide
- ✅ Automatically updated when you push changes
- ✅ Professional and responsive

## 🔄 Updating Your Site

To make changes:
1. Edit your content in `src/data/` files
2. Test locally with `npm run dev`
3. Build locally with `npm run build`
4. Commit and push changes
5. GitHub Actions will automatically redeploy

## 📱 Next Steps

1. **Customize Content**: Update JSON files with your real information
2. **Add Images**: Replace placeholder images with your photos
3. **Add PDFs**: Upload your CV and papers to appropriate folders
4. **Customize Styling**: Modify Tailwind classes to match your preferences
5. **Add Analytics**: Consider adding Google Analytics for visitor tracking

---

**Need Help?** Feel free to reach out or create an issue in your repository! 🎓