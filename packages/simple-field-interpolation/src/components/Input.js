// eslint-disable-next-line no-unused-vars
import { h } from 'preact';

export default function Input({ id, ...props }) {
  return <input type="text" class="cf-form-input" id={id} {...props} />;
}
