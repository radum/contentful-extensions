// eslint-disable-next-line no-unused-vars
import { h } from 'preact';

export default function KeyValueStore({ items, label, ...props }) {
  return (
    <div>
      <div class="c-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="c-table c-table__header">
          <colgroup>
            <col name="item" width="112"/>
            <col name="value" width="112"/>
            <col name="actions" width="112"/>
          </colgroup>
          <thead>
            <tr>
              <th colspan="1" rowspan="1" class="is-leaf">
                <div class="cell">Item</div>
              </th>
              <th colspan="1" rowspan="1" class="is-leaf">
                <div class="cell">Value</div>
              </th>
              <th colspan="1" rowspan="1" class="is-leaf is-right">
                <div class="cell">Actions</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map(item => (
                <tr>
                  <td rowspan="1" colspan="1"><div class="cell">{ item.keyLabel }</div></td>
                  <td rowspan="1" colspan="1"><div class="cell">{ item.keyValue }</div></td>
                  <td rowspan="1" colspan="1" class="is-right">
                    <div class="cell">
                      <button className="c-button c-button--danger is-trash-svg is-circle" type="button" onClick={() => this.props.onRemove(item.keyID)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486.4 486.4">
                          <path style="fill: white;" d="M446 70H344.8V53.5c0-29.5-24-53.5-53.5-53.5h-96.2c-29.5 0-53.5 24-53.5 53.5V70H40.4c-7.5 0-13.5 6-13.5 13.5S32.9 97 40.4 97h24.4v317.2c0 39.8 32.4 72.2 72.2 72.2h212.4c39.8 0 72.2-32.4 72.2-72.2V97H446c7.5 0 13.5-6 13.5-13.5S453.5 70 446 70zM168.6 53.5c0-14.6 11.9-26.5 26.5-26.5h96.2c14.6 0 26.5 11.9 26.5 26.5V70H168.6V53.5zm226 360.7c0 24.9-20.3 45.2-45.2 45.2H137c-24.9 0-45.2-20.3-45.2-45.2V97h302.9v317.2h-.1z"/>
                          <path style="fill: white;" d="M243.2 411c7.5 0 13.5-6 13.5-13.5V158.9c0-7.5-6-13.5-13.5-13.5s-13.5 6-13.5 13.5v238.5c0 7.5 6 13.6 13.5 13.6zM155.1 396.1c7.5 0 13.5-6 13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5 6-13.5 13.5v208.9c0 7.5 6.1 13.5 13.5 13.5zM331.3 396.1c7.5 0 13.5-6 13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5 6-13.5 13.5v208.9c0 7.5 6 13.5 13.5 13.5z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div class="c-footer">
        <input
          className="cf-form-input"
          type="text"
          autocomplete="off"
          placeholder="Item"
          ref={c => this.inputItem = c}
        />
        <input
          className="cf-form-input"
          type="text"
          autocomplete="off"
          placeholder="Value"
          ref={c => this.inputVaue = c}
        />
        <button className="cf-btn-primary" type="button"
        onClick={() => {
            this.props.onAddItem({ keyLabel: this.inputItem.value, keyValue: this.inputVaue.value });
            this.inputItem.value = '';
            this.inputVaue.value = '';
        }}>
          Add
        </button>
      </div>
      <div className="c-description">
        <p>{label}</p>
      </div>
    </div>
  );
}
