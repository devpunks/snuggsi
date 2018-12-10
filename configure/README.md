# Configure

Scripts used for configuring server nodes

## `nginx`

nginx setup. Derived from [`whatwg/misc-server`](https://github.com/whatwg/misc-server)

## `vscode`

1. CTRL+SHIFT+P, search for "preferences open settings (JSON)"
2. Open the "Workspace settings" tab
3. Add the property "files.assiciations" if not present or extend it with the value "*.es": "javascript"

Should looks like

```javascript
    "files.associations": {
        "*.es": "javascript"
    }
```

or if your workspace settings is empty then, put the following

```javascript
{
    // Configure file associations to languages (e.g. `"*.extension": "html"`). These have precedence over the default associations of the languages installed.
    "files.associations": {
        "*.es": "javascript"
    }
}
```

The result of the steps above are in the file `.vscode/settings.json`.
