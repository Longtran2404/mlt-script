# MCP Google Drive & Sheets Integration Guide

Complete guide to integrate MCP Google packages with popular IDEs and AI tools.

## 🚀 Quick Start

### 1. Install Packages
```bash
npm install -g mcp-google-drive@latest
npm install -g mcp-google-sheets-server@latest
```

### 2. Setup Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Drive API and Google Sheets API
4. Create a Service Account and download JSON key
5. Set environment variable:

```bash
export GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
```

## 🔧 IDE Integration

### Cursor Integration

Add to your Cursor MCP configuration:

```json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["mcp-google-drive@latest"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_KEY": "${GOOGLE_SERVICE_ACCOUNT_KEY}"
      }
    },
    "google-sheets": {
      "command": "npx", 
      "args": ["mcp-google-sheets-server@latest"],
      "env": {
        "GOOGLE_SERVICE_ACCOUNT_KEY": "${GOOGLE_SERVICE_ACCOUNT_KEY}"
      }
    }
  }
}
```

### VS Code Integration  

Install the MCP extension and use the provided `vscode-mcp-config.json`.

### Claude Code Integration

Copy `claude-code-mcp.json` to your Claude Code MCP settings directory.

## 📋 Available Tools

### Google Drive (15 Tools)
- `search_files` - Advanced file search
- `get_file` - Get file metadata and content
- `list_files` - List files with filtering
- `create_file` - Create new files
- `update_file` - Update file content
- `delete_file` - Delete or trash files
- `copy_file` - Copy files
- `move_file` - Move files between folders
- `create_folder` - Create folders
- `share_file` - Share files with permissions
- `get_file_permissions` - View permissions
- `get_drive_info` - Get drive information
- `list_shared_drives` - List shared drives
- `get_file_revisions` - View revision history
- `get_file_content` - Get file content in various formats

### Google Sheets (35+ Tools)
- Data operations: get, update, create spreadsheets
- Formatting: colors, fonts, borders, alignment
- Charts: create, update, delete various chart types
- Sheet management: create, duplicate, rename, hide sheets  
- Cell operations: merge, protect, validate data
- Row/Column operations: insert, delete
- Formulas and calculations
- Batch operations for performance
- Search and sharing functionality

## 🎯 Usage Examples

### Search Files
```javascript
// Search for spreadsheets containing "budget"
await searchFiles({
  query: "name contains 'budget' and mimeType='application/vnd.google-apps.spreadsheet'",
  maxResults: 10
})
```

### Create Spreadsheet and Add Data
```javascript
// Create new spreadsheet
const sheet = await sheets_create({
  title: "Project Budget 2025"
})

// Add data
await sheets_update_data({
  spreadsheetId: sheet.spreadsheetId,
  range: "A1:C3",
  values: [
    ["Item", "Cost", "Category"],
    ["Software License", 500, "Technology"],
    ["Office Supplies", 200, "Operations"]
  ]
})
```

### Create Chart
```javascript
await sheets_create_chart({
  spreadsheetId: sheet.spreadsheetId,
  chartType: "COLUMN",
  dataRange: "A1:C3", 
  title: "Budget Breakdown"
})
```

## 🔒 Security Best Practices

1. **Environment Variables**: Always use environment variables for credentials
2. **Least Privilege**: Grant minimal required permissions to service account
3. **Credential Rotation**: Regularly rotate service account keys
4. **Audit Logging**: Monitor API usage and access patterns

## 🚨 Troubleshooting

### Authentication Issues
- Verify service account key format
- Check API permissions in Google Cloud Console
- Ensure APIs are enabled

### Performance Tips  
- Use caching for frequently accessed data
- Batch operations when possible
- Set appropriate maxResults limits

### Common Errors
- `TypeError: Cannot read properties of undefined`: Authentication not ready
- `403 Forbidden`: Check API permissions
- `429 Rate Limit`: Implement retry logic (built-in)

## 📞 Support

- GitHub Issues: Report bugs and feature requests
- Documentation: Comprehensive API documentation available
- Examples: Check test files for usage examples

## 🔄 Updates

- **v1.4.6+**: Enhanced error handling, retry logic, caching
- **v2.1.4+**: 40+ Google Sheets tools, performance optimizations
- Regular updates with new features and improvements

---

🎉 **Ready for Production**: These MCP servers are optimized for commercial use with enterprise-grade features like caching, retry logic, and comprehensive error handling.