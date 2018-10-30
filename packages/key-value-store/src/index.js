// eslint-disable-next-line no-unused-vars
import { h, render } from 'preact';

import App from './components/App';

// // When UI Extensions SDK is loaded the callback will be executed.
// window.contentfulExtension.init(initExtension);

// This is the main entry point for extensions.
//
// When UI Extensions SDK is loaded the callback will be executed.
// The extension API reference explains in detail what you can do with
// the 'api' object.
const cfExt = window.contentfulExtension || window.contentfulWidget;
cfExt.init(initExtension);

function initExtension(extension) {
  // "extension" is providing an interface documented here:
  // https://github.com/contentful/ui-extensions-sdk/blob/master/docs/ui-extensions-sdk-frontend.md

  // Automatically adjust UI Extension size in the Web App.
  extension.window.updateHeight();
  extension.window.startAutoResizer();

  render(<App {...extension} />, document.getElementById('root'));
}

// // DEV ONLY
// const extension = {
//   contentType: '',
//   field: {
//     getValue: () => {
//       return {
//         items: [
//           { keyID: '0i2u4hfa', keyLabel: 'Item 1', keyValue: 'Value 1' },
//           { keyID: 'fo2pjfib', keyLabel: 'Item 2', keyValue: 'Value 2' },
//           { keyID: 'fopji44c', keyLabel: 'Item 3', keyValue: 'Value 3' },
//         ],
//       };
//     },
//     setValue: () => console.log('extension:setValue'),
//     onValueChanged: () => console.log('extension:onValueChanged'),
//     removeValue: () => console.log('extension:removeValue'),
//   },
//   entry: '',
//   space: '',
//   locales: '',
//   user: '',
//   window: '',
//   dialogs: '',
//   parameters: {
//     instance: {
//       helpText: 'Lorem ipsum dolorem alsdmas; jdas;ldk as;ldk a;ldk a;ldka; dka',
//     },
//   },
// };
// render(<App {...extension} />, document.getElementById('root'));
