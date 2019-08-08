# think-ueditor

`think-ueditor` Server-side configuration for ThinkJS3.

## Installation

Using npm:

```sh
npm install think-ueditor
```

In thinkjs3:

```js
const ThinkUeditor = require('think-ueditor');
const Base = require('./base.js');

module.exports = class extends Base {
  uploadAction() {
    const ueditor = new ThinkUeditor(this.ctx);
    this.json(ueditor.init());
  }
}


```

Modify your ueditor.config.js file
```js
window.UEDITOR_CONFIG = {

  ...

  , serverUrl: URL + "../../../ueditor/upload"
  ...

```

