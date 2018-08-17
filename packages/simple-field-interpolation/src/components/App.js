// eslint-disable-next-line no-unused-vars
import { h, Component } from 'preact';

import Input from './Input';
import Preview from './Preview';
import Error from './Error';
import interpolate from './services/interpolate';
import data from './services/data';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.field.getValue(),
      preview: {},
      error: ''
    };
  }

  componentDidMount() {
    // Callback for changes of the field value.
    this.detachValueChangeHandler = this.props.field.onValueChanged(
      this.handleValueChange
    );
  }

  componentWillUnmount() {
    this.detachValueChangeHandler();
  }

  /**
   * Handler for external field value changes (e.g. when multiple authors are
   * working on the same entry).
   */
  handleValueChange = (value = '') => {
    this.setState({ value }, () => {
      this.getPreview(value);
    });
  };

  /**
   * Handler for changes of the input value
   */
  handleChange = event => {
    const { value } = event.target;
    this.setState({ value }, () => {
      this.getPreview(value);
    });

    if (value === '') {
      this.props.field.removeValue();
    } else {
      this.props.field.setValue(value);
    }
  };

  getPreview(value) {
    try {
      const preview = interpolate(value, data);
      this.props.field.setInvalid(false);
      this.setState({ preview, error: '' });
    } catch (e) {
      const error =
        e.message || 'An error occured. Please check the input value.';
      this.props.field.setInvalid(true);
      this.setState({ preview: value, error });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render({}, { value, preview, error }) {
    return (
      <div>
        <Input onInput={this.handleChange} value={value} id="extension-input" />
        <Error>{error}</Error>
        <Preview preview={preview} />
      </div>
    );
  }
}
