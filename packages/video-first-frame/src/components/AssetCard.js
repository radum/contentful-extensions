// eslint-disable-next-line no-unused-vars
import { h } from 'preact';

export default ({ src, caption }) => (
  <figure class="asset-card">
    {src && (
      <div class="cf-thumbnail">
        <img src={src} class="thumbnail" />
      </div>
    )}
    {caption && <figcaption class="asset-card__title">{caption}</figcaption>}
  </figure>
);
