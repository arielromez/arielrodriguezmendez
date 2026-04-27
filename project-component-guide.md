# Project Page Component Usage

## Template Structure

The project page template includes a reusable hero component that combines:

- A paragraph with the project title
- A line break
- A carousel text with editable description class

## How to Create a New Project Page

1. **Copy the template**: Use `project-template.html` as your starting point
2. **Replace placeholders** with your project content:

### Placeholders to Replace:

- `[PROJECT_NAME]` - Project name in the browser title and header
- `[CAROUSEL_TEXT]` - Initial text for the header carousel
- `[PROJECT_TITLE]` - Main project title in the hero section
- `[PROJECT_DESCRIPTION]` - Initial text for the hero carousel
- `[IMAGE_FILE]` - Your project image filename
- `[ALT_TEXT]` - Alt text for accessibility
- `[IMAGE_DESCRIPTION]` - Caption for the image
- `[PROJECT_SECTION_TITLE]` - Section heading
- `[PROJECT_SECTION_CONTENT]` - Section content

### Carousel Text Configuration

To add custom carousel text for your project, update the `script.js` file:

```javascript
} else if (initialText === 'Your Initial Text') {
    textOptions = [
        'Your Initial Text',
        'Alternative Text 1',
        'Alternative Text 2',
        'Alternative Text 3'
    ];
```

## Component Features

- **Responsive design** - Works on all screen sizes
- **Automatic text carousel** - Rotates through different descriptions
- **Consistent styling** - Uses the same design system as the main site
- **Easy customization** - Simple placeholder replacement system

## Example Usage

For a project called "Brand Identity Design":

1. Replace `[PROJECT_NAME]` with "Brand Identity Design"
2. Replace `[PROJECT_DESCRIPTION]` with "Brand Identity"
3. Add this to script.js:

```javascript
} else if (initialText === 'Brand Identity') {
    textOptions = [
        'Brand Identity',
        'Logo Design',
        'Visual System',
        'Brand Guidelines'
    ];
```

The carousel will automatically rotate through these options every 1.5 seconds.
