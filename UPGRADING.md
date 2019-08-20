# Upgrading

## From 1.x to 2.x

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
