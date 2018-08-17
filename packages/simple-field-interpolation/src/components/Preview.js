// eslint-disable-next-line no-unused-vars
import { h } from 'preact';

export default function Preview({ preview, docsUrl }) {
  return (
    <div>
      {preview !== '' && (
        <div>
          <span class="interpolate">
            Preview:
            <span class="interpolate-preview"> {preview} </span>
          </span>
        </div>
      )}
      <a class="docs" href={docsUrl} target="_blank" rel="noopener noreferrer">
        Click here to see documentation and available variables
      </a>
    </div>
  );
}
