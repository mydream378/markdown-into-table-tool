# Academic Webpage

A modern, responsive academic webpage built with React, TypeScript, and Tailwind CSS. Perfect for showcasing research, publications, and educational content.

## 🎯 Features

- **Professional Design**: Clean, academic-focused layout with responsive design
- **Multi-section Layout**: Home, Projects, Publications, and Tutorials sections
- **GitHub Pages Ready**: Automated deployment workflow included
- **TypeScript Support**: Full type safety throughout the application
- **Modern Stack**: React 18, TypeScript 5, Tailwind CSS 3, Vite
- **Performance Optimized**: Fast loading with code splitting and optimization

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/academic-webpage.git
   cd academic-webpage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx
│   ├── HeroSection.tsx
│   └── AboutSection.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Projects.tsx
│   ├── Publications.tsx
│   └── Tutorials.tsx
├── data/               # JSON data files
│   ├── profile.json
│   ├── projects.json
│   ├── publications.json
│   └── tutorials.json
├── types/              # TypeScript interfaces
│   └── index.ts
└── App.tsx             # Main application component
```

## 📝 Customization

### Update Personal Information
Edit the files in `src/data/` to add your content:

1. **Profile Information** (`src/data/profile.json`)
   - Name, title, bio, contact information
   - Research interests and education

2. **Projects** (`src/data/projects.json`)
   - Research projects with descriptions and status
   - Collaborators, funding, and methodology

3. **Publications** (`src/data/publications.json`)
   - Academic papers with proper citations
   - DOI links and abstracts

4. **Tutorials** (`src/data/tutorials.json`)
   - Educational content and step-by-step guides
   - Code examples and prerequisites

### Styling
The project uses Tailwind CSS for styling. Customize colors, fonts, and layouts in the component files.

## 🌐 Deployment to GitHub Pages

### 1. Update Repository Settings
1. Go to your repository settings on GitHub
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"

### 2. Update Configuration
Update the `homepage` field in `package.json`:
```json
"homepage": "https://yourusername.github.io/your-repo-name"
```

Update the `base` field in `vite.config.ts`:
```typescript
base: '/your-repo-name/'
```

### 3. Deploy
Push your changes to the main branch. The GitHub Actions workflow will automatically build and deploy your site.

### Manual Deployment (Optional)
```bash
npm run deploy
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run check` - Run TypeScript type checking
- `npm run deploy` - Deploy to GitHub Pages
- `npm run pubs:update -- <path-to-scholar.bib>` - Convert Google Scholar BibTeX to `src/data/publications.json`
 - `npm run pubs:enrich-pubmed` - Add PubMed links and filter to items with PubMed pages

### Update Publications from Google Scholar (bash-friendly)

1. Export BibTeX from your Google Scholar profile (select publications → Export → BibTeX)
2. Save the file as `scholar.bib` in the project root
3. Run:
   ```bash
   npm run pubs:update -- scholar.bib
   ```
5. Add PubMed links and filter to PubMed-indexed items
   ```bash
   npm run pubs:enrich-pubmed
   ```
4. Verify locally:
   ```bash
   npm run build && npm run preview
   ```

## 🔧 Development Tips

### Adding New Sections
1. Create a new component in `src/components/`
2. Add a new page in `src/pages/`
3. Update the routing in `src/App.tsx`
4. Add navigation link in `src/components/Navigation.tsx`

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow the existing color scheme (blue primary, gray secondary)
- Maintain consistent spacing and typography
- Ensure responsive design for mobile devices

### Performance Optimization
- Images are automatically optimized during build
- Code splitting is enabled by default
- Consider lazy loading for heavy components

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help, please:

1. Check the documentation above
2. Search existing issues
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Deployed on [GitHub Pages](https://pages.github.com/)
