// eslint-disable-next-line no-unused-vars
import { h } from 'preact';

export default function Preview({ preview }) {
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
      <a
        class="docs"
        href="https://sumupteam.atlassian.net/wiki/spaces/DEV/pages/549257252/Website+variables"
        target="_blank"
        rel="noopener noreferrer"
      >
        Click here to see documentation and available variables
      </a>
    </div>
  );
}
