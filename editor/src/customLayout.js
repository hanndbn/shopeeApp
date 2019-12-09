const customLayout = {
  customSelect: (data, callback) => {
    const { type = "", option } = data;
    const layout = document.createElement("div");
    layout.innerHTML = `
    <div class="input-custom-select-wrapper position-relative">
                <div class="select-box">
                    <div class="input-select-value" id="input-select-value">${type ? _.startCase(type) : "Select"}</div>
                </div>
                <div class="input-select-content" id="input-select-content" style="display: none">
        ${option.map(v => `<div class="input-select-item ${type === v.key ? "active" : ""}" data-type="${v.key}">${v.label}</div>`).join("")}
                </div>
      </div>`;
    $(layout.querySelector("#input-select-value")).click(() => {
      $(layout.querySelector("#input-select-content")).toggle();
    });
    $(layout.querySelectorAll(".input-select-item")).click((e) => {
      $(layout.querySelector("#input-select-content")).hide();
      const type = e.target.dataset.type;
      if (callback && _.isFunction(callback)) {
        callback(type);
      }
    });
    const clickHandle = e => {
      const inputValue = document.getElementById("input-select-value");
      const inputContent = document.getElementById("input-select-content");
      if (
        (inputValue && !inputValue.contains(e.target))
        && (inputContent && !inputContent.contains(e.target) && inputContent.style.display !== "none")) {
        $("#input-select-content").hide();
      }
    };
    window.addEventListener("click", clickHandle, false);
    return {
      layout,
      clickHandle
    };
  },
  customImageSelect: data => {
    const { type, imageUrl, fileSelected, graph, _self } = data;
    const modal = $("#myModal");
    const layoutImageSelect = document.createElement("div");
    layoutImageSelect.className = "flex-fill";
    if (type === "url") {
      layoutImageSelect.innerHTML = `
      <div class="font-size-wrapper mt-2 flex-fill">
            <input type="text" class="flex-fill ml-0 mr-2 image-url-input" readonly="true" placeholder="Image url" value="${imageUrl}" id="input-image-url"/>
            <button class="btn btn-add-image g-font-size-12" id="change-image-url">Change</button>
      </div>
    `;
      const changeImageUrlFunction = () => {
        const displayData = {
          imageUrl,
          callback: (imageUrl) => {
            const updateData = {
              shape: "image",
              imageAspect: 0,
              image: imageUrl,
              imageUrl: encodeURIComponent(imageUrl)
            };
            customUtils.setCellStyles(graph, updateData, false);
          }
        };
        modal.empty();
        modal.append(changeImageUrl(displayData));
        modal.modal("show");
      };
      //handle save change image url
      $(layoutImageSelect.querySelector("#input-image-url")).click(changeImageUrlFunction);
      $(layoutImageSelect.querySelector("#change-image-url")).click(changeImageUrlFunction);
    } else if (type === "library") {
      const file = fileSelected[0] ? fileSelected[0] : null;
      const url = file ? file.url : "/content/images/editor/img/defaultPicture.jpg";
      layoutImageSelect.innerHTML = `
      <div class="font-size-wrapper mt-2 flex-fill">
            <div class="w-100 text-center mb-2">
                <img src="${url}" class="image-preview"/>
            </div>
            <div class="w-100 text-center">
                <button class="btn btn-add-image g-font-size-12" id="change-image-url">Change</button>     
            </div>
      </div>
    `;
      $(layoutImageSelect.querySelector("#change-image-url")).click(function() {
        const displayData = {
          fileType: "image",
          fileTypeAccept: "image/*",
          isSelectMulti: false,
          fileSelected,
          callback: (files) => {
            const file = files[0] ? files[0] : null;
            if (file) {
              const updateData = {
                shape: "image",
                imageAspect: 0,
                image: file.url,
                fileSelected: encodeURIComponent(JSON.stringify([{
                  name: file.name,
                  url: file.url
                }]))
              };
              customUtils.setCellStyles(graph, updateData, false);
            }
          }
        };
        modal.empty();
        modal.append(selectionFileModal(displayData));
        modal.modal("show");
      });
    }

    return { layoutImageSelect };
  }
};
