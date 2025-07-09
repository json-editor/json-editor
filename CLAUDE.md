# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JSON Editor is a web component that generates HTML forms from JSON Schema. It supports JSON Schema versions 3 and 4 and integrates with popular CSS frameworks (Bootstrap, Spectre, Tailwind) and icon libraries.

## Key Commands

### Build Commands
- `npm run build` - Build both production and non-minified versions
- `npm run build.prod` - Build minified production version
- `npm run build.nonmin` - Build non-minified version for development
- `npm run build.dev` - Build development version
- `npm run watch` - Watch for changes and rebuild non-minified version

### Development
- `npm run debug` - Start webpack dev server with development config
- `npm run debug.nonmin` - Start webpack dev server with non-minified config

### Testing
- `npm run test` - Run unit tests with Karma in Chrome
- `npm run test-headless` - Run unit tests headlessly with ChromeHeadless
- `npm run docker-test` - Run full codeceptjs integration tests in Docker
- `npm run cp:test` - Run codeceptjs tests locally (excluding optional tests)
- `npm run cp:fulltest` - Run all codeceptjs tests locally

### Linting
- `npm run eslint` - Run ESLint on source files
- `npm run eslint.fix` - Run ESLint with auto-fix

### Utility
- `npm run clean` - Clean generated CSS.js files
- `npm run serve-test` - Start HTTP server on port 9001 for testing

## Architecture

### Core Structure
- **src/core.js** - Main JSONEditor class and core functionality
- **src/editor.js** - Base editor class that all specific editors inherit from
- **src/defaults.js** - Default configurations, options, and language mappings

### Key Directories
- **src/editors/** - Individual editor implementations (string, number, object, array, etc.)
- **src/themes/** - CSS framework integrations (Bootstrap, Spectre, Tailwind, etc.)
- **src/iconlibs/** - Icon library integrations (FontAwesome, Material Icons, etc.)
- **src/templates/** - Template engine integrations (Handlebars, Mustache, etc.)
- **src/validators/** - Custom validation logic
- **dist/** - Built distribution files
- **tests/** - Unit tests (Jasmine) and integration tests (CodeceptJS)

### Editor System
Each data type has its own editor class in `src/editors/` that extends the base editor:
- String editors support various formats (email, url, textarea, etc.)
- Array editors handle different display formats (table, tabs, checkboxes)
- Object editors support layouts (grid, categories, normal)
- Specialized editors for buttons, info displays, uploads, etc.

### Theme System
Themes in `src/themes/` provide CSS framework integration:
- Each theme extends the base theme class
- Themes define HTML structure and CSS classes
- Icon libraries are separate from themes

### Schema Resolution
- **src/resolvers.js** - Logic to determine which editor to use for a schema
- **src/schemaloader.js** - Handles loading external schema references

## Development Notes

### Testing
- Unit tests use Jasmine framework with Karma runner
- Integration tests use CodeceptJS with Puppeteer
- Test pages are in `tests/pages/` for manual testing
- Use `npm run test-headless` for CI/CD

### Building
- Uses Webpack for bundling
- CSS files are converted to JS modules during build
- Supports both minified and non-minified builds
- Source maps are generated for development

### Schema Support
- Fully supports JSON Schema draft 3 and 4
- Supports $ref resolution including external URLs
- Custom keywords: `propertyOrder`, `defaultProperties`, `watch`, `enumSource`
- Conditional validation with if-then-else

### Extensibility
- Custom editors can be added by extending base editor classes
- Custom themes and icon libraries can be registered
- Custom validators can be added to validation pipeline
- Template engines can be swapped for different templating needs