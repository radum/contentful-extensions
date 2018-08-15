// eslint-disable-next-line no-unused-vars
import { h, Component } from 'preact';

import Input from './Input';
import interpolate from './services/interpolate';
import data from './services/data';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.field.getValue()
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
    this.setState({ value });
  };

  /**
   * Handler for changes of the input value
   */
  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });

    if (value === '') {
      // this.props.field.setInvalid(true);
      this.props.field.removeValue();
    } else {
      this.props.field.setValue(value);
    }
  };

  // eslint-disable-next-line class-methods-use-this
  render({}, { value }) {
    return (
      <Input
        onInput={this.handleChange}
        value={value}
        preview={interpolate(value, data)}
        id="extension-input"
      />
    );
  }
}
