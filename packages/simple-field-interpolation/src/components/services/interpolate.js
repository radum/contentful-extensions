import { isEmpty, template, templateSettings } from 'lodash';

export const createDelimiterRegex = ({ start = '{{', end = '}}' }) =>
  new RegExp(`${start}([\\s\\S]+?)${end}`, 'g');

const interpolate = (string, values, delimiters = {}) => {
  if (!string) {
    return '';
  }
  if (isEmpty(values)) {
    return string;
  }

  if (string.indexOf('{{') === -1) {
    return '';
  }

  const delimiterRegex = createDelimiterRegex(delimiters);
  templateSettings.interpolate = delimiterRegex;
  const parsedString = template(string);

  return parsedString(values);
};

export default interpolate;
