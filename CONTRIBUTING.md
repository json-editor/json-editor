Contributing
===============
This document briefly lists the guidelines for contributing to JSON Editor.

Reporting Bugs
----------------
When creating an issue in GitHub, try to include when feasible:
*  A brief description of the issue
*  An example JSON schema that causes the issue
*  Steps to reproduce

If you can reproduce the issue on the demo page (https://json-editor.github.io/json-editor/), it's helpful to attach the "Direct Link" url (top right of page).  Note: the direct link might not work for very large schemas or JSON values.

if your setup is more complex (i.e. setting values using JavaScript interface), you can create a test setup at sites like  https://jsfiddle.net or https://codepen.io/.


Contributing Code
--------------------------
One of the major goals of JSON Editor is to be easy to modify and hack.

If you fix a bug or add a cool feature, please submit a pull request!


### Code Style

*  Use 2 spaces for indentation
*  Use comments whenever the code's meaning is not obvious
*  When in doubt, try to match the style in existing source files

### Grunt

The easiest way to hack on JSON Editor is to run `grunt watch`, which 
re-builds `dist/jsoneditor.js` every time a source file changes.

To do a full grunt build which includes jshint and minification, run `grunt`.

### Submitting Pull Requests
Try to limit pull requests to a single narrow feature or bug fix.

__Do not submit `dist/` files!__ 

The following is done when a pull request is accepted.  There is no need to do any of these steps yourself.

1.  Merge pull request into master
2.  Increment version number in `src/intro.js` and `bower.json`.  Set date in `src/intro.js`.
3.  Build `dist/` files with grunt
4.  Commit and push to github
5.  Add a git tag and release for this version with a short changelog

Sometimes, multiple pull requests will be merged before doing steps 2-5.


Contributing Use-cases
--------------------------

Example workflow based on https://github.com/json-editor/json-editor/issues/180#issuecomment-433689965

- One or more reported issues lead to a wiki page, that discusses the design process for a new major release that covers the issues or improvements.
- The documentation is created before the implementation actually happens.
- After the design process is aggreed on assignment to specific workpackages are documented in the wiki, ...
- New developers that want contribute to the new release can work through the Wiki document and know where some contributions are missing or contribute directly to wiki because they identified already some design problems, that may be an obstacle for applications of the library in the future
- After a major release is finalized the documentation for the release is ready.

