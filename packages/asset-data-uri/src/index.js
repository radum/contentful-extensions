import loadImage from './lib/load-image';
import loadVideo from './lib/load-video';
import getDataUri from './lib/get-data-uri';

const assetLoaders = {
  image: loadImage,
  video: loadVideo
};

// When UI Extensions SDK is loaded the callback will be executed.
window.contentfulExtension.init(initExtension);

function initExtension(extension) {
  // "extension" is providing an interface documented here:
  // https://github.com/contentful/ui-extensions-sdk/blob/master/docs/ui-extensions-sdk-frontend.md

  // Automatically adjust UI Extension size in the Web App.
  extension.window.updateHeight();
  extension.window.startAutoResizer();

  // Handle DOM "onbeforeunload" event.
  window.addEventListener('onbeforeunload', unloadHandler);

  const inputEl = document.getElementById('extension-input');
  const errorEl = document.getElementById('extension-error');

  // TODO: Figure out, why `parameters` is undefined.
  const { field, entry, space, parameters } = extension;
  const { locale } = field;
  // const { imageFieldId, maxWidth, maxHeight } = parameters.instance;
  const imageFieldId = 'desktop';
  const maxWidth = '15';
  const maxHeight = '15';

  const imageField = entry.fields[imageFieldId];

  if (!imageField) {
    clearField();
    showError(
      `The extension could not be initialized because a field with id '${imageFieldId}' does not exist.'` // eslint-disable-line max-len
    );
    return;
  }

  // Callback for changes of the field value.
  const detachValueChangeHandler = field.onValueChanged(valueChangeHandler);

  // Callback for changes of the image field value.
  const detachImageValueChangeHandler = imageField.onValueChanged(
    locale,
    imageChangeHandler
  );

  // Manually update the data URI if it is missing on page load (e.g. because
  // the last attempt failed).
  const imageValue = imageField.getValue(locale);
  if (imageValue && !field.getValue()) {
    imageChangeHandler(imageValue);
  }

  // Handler for external field value changes (e.g. when multiple authors are
  // working on the same entry).
  function valueChangeHandler(value) {
    inputEl.value = value || '';
  }

  // Handler for changes to the image field value. Get the preview data URI and
  // save it to the field.
  async function imageChangeHandler(value) {
    if (!value || !value.sys.id) {
      clearField();
      return;
    }

    const imageAsset = await space.getAsset(value.sys.id);
    const { url, contentType } = imageAsset.fields.file[locale];

    if (!url || !contentType) {
      clearField();
      return;
    }

    const mediaType = contentType.split('/')[0];
    const loadAsset = assetLoaders[mediaType];

    if (!loadAsset) {
      clearField();
      showError(`The asset's file type '${contentType} is not supported.`);
      return;
    }

    const assetUrl =
      mediaType === 'image' ? constructPreviewImageUrl(url) : url;

    loadAsset(assetUrl)
      .then(getDataUri)
      .then(dataUri => {
        clearError();
        updateField(dataUri);
      })
      .catch(error => {
        showError(error);
      });
  }

  // Adds the size query params to the image URL.
  function constructPreviewImageUrl(imageUrl) {
    const FALLBACK_WIDTH = '12';
    const query = [
      {
        key: 'w',
        value: !maxWidth && !maxHeight ? FALLBACK_WIDTH : maxWidth
      },
      {
        key: 'h',
        value: maxHeight
      },
      {
        key: 'fit',
        value: maxWidth && maxHeight && 'fill'
      }
    ];
    const queryString = query
      .filter(({ value }) => !!value)
      .map(({ key, value }) => `${key}=${value}`)
      .join('&');
    return `${imageUrl}?${queryString}`;
  }

  function updateField(value) {
    try {
      field.setValue(value);
      inputEl.value = value;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      const error = e.message ? e.message : 'An error occured';
      showError(error);
    }
  }

  function clearField() {
    try {
      field.removeValue();
      inputEl.value = '';
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      const error = e.message ? e.message : 'An error occured';
      showError(error);
    }
  }

  // Display an error message below the field.
  function showError(error) {
    if (!error || typeof error !== 'undefined') {
      // eslint-disable-next-line no-console
      console.error('Image Data URI extension: Error must be a string.');
      return;
    }
    errorEl.innerHTML = error;
  }

  // Remove the error message below the field.
  function clearError() {
    errorEl.innerHTML = '';
  }

  // Event handler for window unload.
  function unloadHandler() {
    window.removeEventListener('onbeforeunload', unloadHandler);
    detachValueChangeHandler();
    detachImageValueChangeHandler();
  }
}
