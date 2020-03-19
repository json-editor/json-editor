# Upgrading

## From 1.x to 2.x

### Option `description`

In order to display HTML in descriptions, include "purify" ahead of "jsoneditor". With CDN eg:

```
<script src="https://cdn.jsdelivr.net/npm/dompurify@latest/dist/purify.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@json-editor/json-editor@latest/dist/jsoneditor.min.js"></script>
```

### Format `select`

With usage of *selectize*  plugin, same applies for other plugins

```
  "format": "select"
```

needs to be changed to 

```
  "format": "selectize"
```

and

```
  "options": {
    "selectize_options": {
      ...
    } 
  }
```

to

```
  "options": {
    "selectize": {
      ...
    } 
  }
```
