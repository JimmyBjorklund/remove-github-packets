# GitHub Package Cleanup Tool

A TypeScript application that automatically manages GitHub container packages by removing old and untagged versions to help maintain clean package repositories.

## Overview

This project scans through GitHub organization packages and removes:
- Untagged package versions
- Package versions older than 30 days (while preserving version-tagged releases)
- Packages with specific naming patterns (currently configured for "netmore" prefixed packages)

## Features

- 🧹 **Automated cleanup** of GitHub container packages
- 🏷️ **Version preservation** - keeps packages with semantic version tags (v1.0.0, etc.)
- ⏰ **Age-based filtering** - removes packages older than 30 days
- 🔒 **Safety checks** - prevents deletion of all versions, maintains tagged releases
- 📋 **Interactive confirmation** - requires user confirmation before proceeding
- 🔍 **Detailed logging** - shows what's being deleted and why

## Prerequisites

- Node.js (v14 or higher)
- GitHub Personal Access Token with package read/delete permissions
- TypeScript knowledge for customization

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd remove-github-packets
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the application**
   ```bash
   cp config-template.json config.json
   ```

4. **Edit the configuration** (see Configuration section below)

## Configuration

Copy `config-template.json` to `config.json` and update the settings:

```bash
cp config-template.json config.json
```

### Configuration Options

| Setting | Type | Description |
|---------|------|-------------|
| `token` | string | **Required**: GitHub Personal Access Token with package read/delete permissions |
| `ORG` | string | **Required**: GitHub organization or username (e.g., "myorg" for https://github.com/myorg) |
| `prefix` | string | **Required**: Prefix of the name of the repo set this to empty string if not needed |
| `removeUntagged` | boolean | Remove all untagged package versions (default: true) |
| `removeOlderItems` | boolean | Remove package versions older than 30 days (default: true) |
| `keepVersions` | boolean | Preserve packages with version tags starting with "v" (default: true) |

### Example Configuration

```json
{
   "token": "ghp_your_github_token_here",
   "ORG": "your-org-name",
   "prefix": "akme-",
   "removeUntagged": true,
   "keepVersions": true,
   "removeOlderItems": true
}
```

## Usage

### Running the Application

```bash
npm start
```

### Development Mode

For development with auto-restart on file changes:

```bash
npm run watch
```

### Workflow

1. The application loads configuration from `config.json`
2. Displays current settings and asks for confirmation
3. Scans all packages in the specified GitHub organization
4. For each package matching the criteria:
   - Removes untagged versions (if enabled)
   - Removes versions older than 30 days (if enabled and version tags exist)
   - Preserves semantic version tags (if `keepVersions` is true)

## GitHub Token Setup

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with these permissions:
   - `read:packages` - Read package metadata
   - `delete:packages` - Delete package versions
   - `repo` - Access to repository (if packages are linked to repos)

## Safety Features

- **Confirmation required**: Interactive prompt before starting deletion
- **Version preservation**: Never deletes all versions of a package
- **Semantic version protection**: Preserves packages tagged with version numbers (v1.0.0, etc.)
- **Logging**: Detailed output showing what's being deleted

## Project Structure

```
remove-github-packets/
├── app/
│   ├── index.ts              # Main application entry point
│   ├── github-service.ts     # GitHub API service wrapper
│   └── model/
│       ├── packet.ts         # Package data interfaces
│       ├── version.ts        # Package version interfaces
│       └── types.ts          # Shared type definitions
├── config-template.json      # Configuration template
├── config.json              # Your configuration (create from template)
├── package.json             # Node.js dependencies and scripts
└── README.md               # This documentation
```

## Error Handling

The application includes error handling for:
- Missing configuration file
- Invalid GitHub tokens
- Network connectivity issues
- API rate limiting
- Permission errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License - see package.json for details

## Author

jimmy@precisiontech.se

## Warning

⚠️ **Use with caution**: This tool permanently deletes package versions. Always test with non-critical packages first and ensure you have backups of important packages.

