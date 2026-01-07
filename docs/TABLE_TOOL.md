# Markdown Table Designer Tool

## Overview
This tool allows users to convert Markdown table syntax into beautifully styled, zebra-striped tables and export them as high-quality PNG images. It is designed to be responsive, working seamlessly on both desktop and mobile devices.

## Features
- **Markdown Parsing**: Supports standard GitHub Flavored Markdown (GFM) tables.
- **Customizable Styling**:
  - **Presets**: 4 built-in color schemes (Classic Blue, Elegant Dark, Nature Green, Minimal Gray).
  - **Custom Colors**: Fine-tune header, text, and row colors (zebra striping).
  - **Typography**: Adjustable font size (12px - 24px).
  - **Scaling**: Zoom in/out (50% - 150%) for better visibility or higher resolution export.
- **Persistence**: Automatically saves your markdown content and style settings to local storage, so you never lose your work.
- **Export**: One-click export to PNG image with loading indicators.
- **Dark Mode**: Fully supports system or manual dark mode toggle.
- **Responsive**: 
  - Desktop: Side-by-side editor and preview.
  - Mobile: Stacked layout with collapsible settings panel.

## Usage Guide

### 1. Accessing the Tool
Navigate to the `/table-tool` route or click "Table Tool" in the navigation bar.

### 2. Creating a Table
Enter standard Markdown table syntax in the left (or top) editor pane:
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Row 1    | Data 1   |
| Row 2    | Data 2   |
```

### 3. Customizing
- **Presets**: Click a preset in the settings panel to quickly apply a style.
- **Colors**: Use the color pickers to adjust specific elements.
- **Size**: Use the sliders to adjust font size and overall scale.
- **Reset**: Use the "Reset to Defaults" button to clear settings and content.

### 4. Exporting
Click the "Export PNG" button in the toolbar. The image will be generated and downloaded automatically.

## Deployment & CI/CD
- **Vercel**: The project is configured for Vercel deployment (`vercel.json`).
- **GitHub Actions**: A CI workflow (`.github/workflows/ci.yml`) automatically runs linting and build checks on every push and pull request to ensure code quality.
