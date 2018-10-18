// eslint-disable-next-line no-unused-vars
import { h, Component } from 'preact';
import { isEmpty, reject, includes, concat, mapValues } from 'lodash';

import ProductSelector from './ProductSelector';
import Error from './Error';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: props.field.getValue(),
      products: [],
      error: ''
    };
  }

  componentDidMount() {
    // Callback for changes of the field value.
    this.detachValueChangeHandler = this.props.field.onValueChanged(
      this.handleValueChange
    );

    this.updateProducts();
  }

  componentWillUnmount() {
    this.detachValueChangeHandler();
  }

  updateProducts = () => {
    this.fetchProducts()
      .then(products => {
        if (products.length > 0) {
          return this.setState({ products });
        }
        return this.setState({ error: 'No matching products entries found' });
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);
        const error = e.message ? e.message : 'Failed to fetch products.';
        this.setState({ error });
      });
  };

  fetchProducts = async () => {
    const { locale } = this.props.field;
    const products = await this.props.space.getEntries({
      content_type: 'product',
      include: 2
    });

    const productsWithImages = await Promise.all(
      products.items.map(async ({ fields }) => {
        const { fields: imgFields } = await this.props.space.getAsset(
          fields.image['en-US'].sys.id
        );
        const productWithImage = Object.assign({}, fields, {
          image: imgFields.file
        });

        return mapValues(productWithImage, (value, key) => {
          if (!value) {
            return undefined;
          }

          const localisedValue = value[locale] || value['en-US'];

          if (key === 'image') {
            return `${localisedValue.url}?w=80&h=80`;
          }

          return localisedValue;
        });
      })
    );

    return productsWithImages;
  };

  /**
   * Handler for external field value changes (e.g. when multiple authors are
   * working on the same entry).
   */
  handleValueChange = values => {
    this.setState({ values, error: '' });
  };

  /**
   * Handler for changes of the input value
   */
  handleClick = event => {
    const { value } = event.target;
    const fieldType = this.props.field.type;
    const defaultValue = fieldType === 'Array' ? [] : '';
    const currentValue = this.state.values || defaultValue;
    let newValue = value;

    if (fieldType === 'Array') {
      newValue = includes(currentValue, value)
        ? reject(currentValue, v => v === value)
        : concat(currentValue, value);
    }

    this.setState({ values: newValue });

    if (isEmpty(newValue)) {
      this.props.field.removeValue();
    } else {
      this.props.field.setValue(newValue);
    }
  };

  // eslint-disable-next-line class-methods-use-this
  render(props, { values, products, error }) {
    const fieldType = props.field.type === 'Array' ? 'checkbox' : 'radio';
    return (
      <div>
        {products.length ? (
          <ul>
            {products.map(
              ({ productId, name, image, price, promotionPrice }) => (
                <ProductSelector
                  key={productId}
                  id={productId}
                  onClick={this.handleClick}
                  checked={includes(values, productId)}
                  value={productId}
                  name={`products-${this.props.field.locale}`}
                  label={name}
                  src={image}
                  price={price}
                  type={fieldType}
                  promotionPrice={promotionPrice}
                />
              )
            )}
          </ul>
        ) : null}
        {error && <Error>{error}</Error>}
      </div>
    );
  }
}
