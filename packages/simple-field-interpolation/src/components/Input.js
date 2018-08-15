// eslint-disable-next-line no-unused-vars
import { h } from 'preact';

export default function Input({ preview, id, ...props }) {
  let interpolateClass = 'interpolate-preview';
  interpolateClass += preview.message && ' error';
  const interpolatePreview = preview.message ? preview.message : preview;
  return (
    <div>
      <input type="text" class="cf-form-input" id={id} {...props} />
      {interpolatePreview !== '' && (
        <div>
          <span class="interpolate">
            Preview:
            <span class={interpolateClass}> {interpolatePreview} </span>
          </span>
        </div>
      )}
      <a
        class="docs"
        href="https://www.sumup.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Click here to see documentation and available variables
      </a>
    </div>
  );
}
