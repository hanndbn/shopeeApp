const customLayout = {
  customSelect: (data, callback) => {
    const { type = '', option } = data;
    const layout = document.createElement('div');
    layout.innerHTML = `
    <div class="input-custom-select-wrapper position-relative">
                <div class="select-box">
                    <div class="input-select-value" id="input-select-value">${type ? _.startCase(type) : 'Select'}</div>
                </div>
                <div class="input-select-content" id="input-select-content" style="display: none">
        ${option.map(v => `<div class="input-select-item ${type === v.key ? 'active' : ''}" data-type="${v.key}">${v.label}</div>`).join('')}
                </div>
      </div>`;
    $(layout.querySelector('#input-select-value')).click(() => {
      $(layout.querySelector('#input-select-content')).toggle();
    });
    $(layout.querySelectorAll('.input-select-item')).click((e) => {
      $(layout.querySelector('#input-select-content')).hide();
      const type = e.target.dataset.type;
      if (callback && _.isFunction(callback)) {
        callback(type);
      }
    });
    const clickHandle = e => {
      const inputValue = document.getElementById('input-select-value');
      const inputContent = document.getElementById('input-select-content');
      if (
        (inputValue && !inputValue.contains(e.target))
        && (inputContent && !inputContent.contains(e.target) && inputContent.style.display !== 'none')) {
        $('#input-select-content').hide();
      }
    };
    window.addEventListener('click', clickHandle, false);
    return {
      layout,
      clickHandle
    };
  }
};
