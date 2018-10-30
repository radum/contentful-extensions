// eslint-disable-next-line no-unused-vars
import { h, Component } from 'preact';
import { remove } from 'lodash';
import nanoid from 'nanoid';

import KeyValueStore from './KeyValueStore';

export default class App extends Component {
  constructor(props) {
    super(props);

    let contentfulData = props.field.getValue();

    if (contentfulData === undefined || contentfulData === null || contentfulData === '' || Object.keys(contentfulData).length === 0) {
      contentfulData = { items: [] };
    }

    this.state = {
      items: contentfulData.items,
    };
  }

  componentDidMount() {
    // Callback for changes of the field value.
    this.detachValueChangeHandler = this.props.field.onValueChanged(this.handleValueChange);
  }

  componentWillUnmount() {
    this.detachValueChangeHandler();
  }

  /**
   * Handler for external field value changes (e.g. when multiple authors are
   * working on the same entry).
   */
  handleValueChange = (items = []) => {
    if (Object.keys(items).length === 0) {
      this.setState({ items: [] });
    } else {
      this.setState(items);
    }
  };

  handleAddItem = (obj) => {
    const { items } = this.state;

    items.push({
      keyID: nanoid(8),
      keyLabel: obj.keyLabel,
      keyValue: obj.keyValue,
    });

    this.setState({ items });

    if (items.length < 1) {
      this.props.field.removeValue();
    } else {
      this.props.field.setValue({
        items,
      });
    }
  };

  handleRemove = (keyID) => {
    const { items } = this.state;

    remove(items, (n) => {
      return n.keyID === keyID;
    });

    this.setState({ items });

    if (items.length < 1) {
      this.props.field.removeValue();
    } else {
      this.props.field.setValue({
        items,
      });
    }
  };

  // eslint-disable-next-line class-methods-use-this
  render({ parameters }, { items }) {
    const { helpText } = parameters.instance;
    return (
      <KeyValueStore
        onAddItem={this.handleAddItem}
        onRemove={this.handleRemove}
        items={items}
        label={helpText}
      />
    );
  }
}
