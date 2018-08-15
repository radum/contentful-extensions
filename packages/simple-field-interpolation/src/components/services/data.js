export default {
  products: {
    '4g-test': {
      contentType: 'product',
      productName: '4G - test',
      usp: '4g test device',
      productPageUrl: 'air-emv-terminal',
      productId: '4g-test',
      hasPromo: false,
      originalPrice: '$12',
      discountedPrice: null,
      currencySymbol: '$'
    },
    'air-test': {
      contentType: 'product',
      productName: 'Air - test',
      usp: 'Air sumup device',
      productPageUrl: 'air-emv-terminal',
      productId: 'air-test',
      hasPromo: true,
      promoCode: 'xdsf',
      originalPrice: '$39',
      discountedPrice: '$29',
      expirationDate: '08/23/2018',
      currencySymbol: '$'
    }
  },
  fees: {
    creditCardFee: '',
    debitCardFee: '',
    universalFee: '2.65%',
    monthlyCost: '$0'
  }
};
