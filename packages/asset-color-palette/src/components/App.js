// eslint-disable-next-line no-unused-vars
import { h, Component } from 'preact';
import { isEmpty } from 'lodash';

import loadImage from '../lib/load-image';
import loadVideo from '../lib/load-video';
import getCanvasData from '../lib/get-canvas-data';
import getColorPalette from '../lib/get-color-palette';

import Color from './Color';
import Error from './Error';

const assetLoaders = {
  image: loadImage,
  video: loadVideo
};

export default class App extends Component {
  constructor(props) {
    super(props);

    const { field, parameters } = props;

    this.locale = field.locale;

    this.config = {
      assetFieldId: parameters.instance.assetFieldId,
      numberOfColors: parameters.instance.numberOfColors || 5
    };

    this.state = {
      value: field.getValue(),
      error: '',
      retries: 0
    };
  }

  componentDidMount() {
    const { field, entry } = this.props;
    const assetField = entry.fields[this.config.assetFieldId];

    if (!assetField) {
      this.setState({
        // eslint-disable-next-line max-len
        error: `The extension could not be initialized because a field with id '${
          this.config.assetFieldId
        }' does not exist.'`
      });
      return;
    }

    // Callback for changes of the field value.
    this.detachValueChangeHandler = field.onValueChanged(
      this.handleValueChange
    );

    // Callback for changes of the image field value.
    this.detachImageValueChangeHandler = assetField.onValueChanged(
      this.locale,
      this.handleImageValueChange
    );

    // Manually update the field value if it is not set on page load (e.g.
    // because the last attempt failed).
    const imageValue = assetField.getValue(this.locale);

    if (imageValue && typeof field.getValue() === 'undefined') {
      this.handleImageValueChange(imageValue);
    }

    // Callback for changes of the field value.
    this.detachValueChangeHandler = field.onValueChanged(
      this.handleValueChange
    );
  }

  componentWillUnmount() {
    this.detachValueChangeHandler();
    this.detachImageValueChangeHandler();
  }

  /**
   * Handler for external field value changes (e.g. when multiple authors are
   * working on the same entry).
   */
  handleValueChange = value => {
    this.setState({ value, error: '' });
  };

  /**
   * Handler for changes to the image field value. Get the first image frame,
   * create a new image asset, and save the reference to the field.
   */
  handleImageValueChange = imageValue => {
    if (!imageValue || !imageValue.sys.id) {
      this.resetField();
      return;
    }

    this.props.space.getAsset(imageValue.sys.id).then(asset => {
      const { url, contentType } = asset.fields.file[this.locale];

      if (!url || !contentType) {
        this.resetField();
        return;
      }

      const mediaType = contentType.split('/')[0];
      const loadAsset = assetLoaders[mediaType];

      if (!loadAsset) {
        this.resetField();
        this.setState({
          error: `The asset's file type '${contentType} is not supported.`
        });
        return;
      }

      loadAsset(url)
        .then(getCanvasData)
        .then(imageData => {
          const colorPalette = getColorPalette(
            imageData,
            this.config.numberOfColors
          );
          this.updateField(colorPalette);
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.error(e);
          const error = e.message
            ? e.message
            : 'Failed to extract colors from the asset.';
          this.setState({ error });
        });
    });
  };

  /**
   * Update field and input.
   */
  updateField = value => {
    try {
      this.props.field.setValue(value);
      this.setState({ value, error: '' });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      const error = e.message ? e.message : 'An error occured';
      this.setState({ error });
    }
  };

  /**
   * Remove value and clear input.
   */
  resetField = () => {
    try {
      this.props.field.removeValue();
      this.setState({ value: undefined });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      const error = e.message ? e.message : 'An error occured';
      this.setState({ error });
    }
  };

  // eslint-disable-next-line class-methods-use-this
  render(props, { value, error }) {
    if (isEmpty(value)) {
      return (
        <div>
          <p>No value</p>
          {error && <Error>{error}</Error>}
        </div>
      );
    }

    return (
      <div>
        <ul>
          {value.map(color => (
            <li key={color}>
              <Color color={color} />
            </li>
          ))}
        </ul>
        {error && <Error>{error}</Error>}
      </div>
    );
  }
}
