/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
Format = function(editorUi, container) {
  this.editorUi = editorUi;
  this.container = container;
};

/**
 * Returns information about the current selection.
 */
Format.prototype.labelIndex = 0;

/**
 * Returns information about the current selection.
 */
Format.prototype.currentIndex = 0;

/**
 * Returns information about the current selection.
 */
Format.prototype.showCloseButton = true;

/**
 * Background color for inactive tabs.
 */
Format.prototype.inactiveTabBackgroundColor = "#f1f3f4";

/**
 * Background color for inactive tabs.
 */
Format.prototype.roundableShapes = ["label", "rectangle", "internalStorage", "corner",
  "parallelogram", "swimlane", "triangle", "trapezoid",
  "ext", "step", "tee", "process", "link",
  "rhombus", "offPageConnector", "loopLimit", "hexagon",
  "manualInput", "curlyBracket", "singleArrow", "callout",
  "doubleArrow", "flexArrow", "card", "umlLifeline"];

/**
 * Adds the label menu items to the given menu and parent.
 */
Format.prototype.init = function() {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  this.update = mxUtils.bind(this, function(sender, evt) {
    this.clearSelectionState();
    this.refresh();
  });

  graph.getSelectionModel().addListener(mxEvent.CHANGE, this.update);
  graph.addListener(mxEvent.EDITING_STARTED, this.update);
  graph.addListener(mxEvent.EDITING_STOPPED, this.update);
  graph.getModel().addListener(mxEvent.CHANGE, this.update);
  graph.addListener(mxEvent.ROOT, mxUtils.bind(this, function() {
    this.refresh();
  }));

  editor.addListener("autosaveChanged", mxUtils.bind(this, function() {
    this.refresh();
  }));

  this.refresh();
};

/**
 * Returns information about the current selection.
 */
Format.prototype.clearSelectionState = function() {
  this.selectionState = null;
};

/**
 * Returns information about the current selection.
 */
Format.prototype.getSelectionState = function() {
  if (this.selectionState == null) {
    this.selectionState = this.createSelectionState();
  }

  return this.selectionState;
};

/**
 * Returns information about the current selection.
 */
Format.prototype.createSelectionState = function() {
  var cells = this.editorUi.editor.graph.getSelectionCells();
  var result = this.initSelectionState();

  for (var i = 0; i < cells.length; i++) {
    this.updateSelectionStateForCell(result, cells[i], cells);
  }

  return result;
};

Format.prototype.getCellInfo = function(cell) {
  var cells = [cell];
  var result = this.initSelectionState();

  for (var i = 0; i < cells.length; i++) {
    this.updateSelectionStateForCell(result, cells[i], cells);
  }

  return result;
};

/**
 * Returns information about the current selection.
 */
Format.prototype.initSelectionState = function() {
  return {
    vertices: [], edges: [], x: null, y: null, width: null, height: null, style: {},
    containsImage: false, containsLabel: false, fill: true, glass: true, rounded: true,
    comic: true, autoSize: false, image: true, shadow: true, lineJumps: true
  };
};

/**
 * Returns information about the current selection.
 */
Format.prototype.updateSelectionStateForCell = function(result, cell, cells) {
  var graph = this.editorUi.editor.graph;

  if (graph.getModel().isVertex(cell)) {
    result.vertices.push(cell);
    var geo = graph.getCellGeometry(cell);

    if (geo != null) {
      if (geo.width > 0) {
        if (result.width == null) {
          result.width = geo.width;
        } else if (result.width != geo.width) {
          result.width = "";
        }
      } else {
        result.containsLabel = true;
      }

      if (geo.height > 0) {
        if (result.height == null) {
          result.height = geo.height;
        } else if (result.height != geo.height) {
          result.height = "";
        }
      } else {
        result.containsLabel = true;
      }

      if (!geo.relative || geo.offset != null) {
        var x = (geo.relative) ? geo.offset.x : geo.x;
        var y = (geo.relative) ? geo.offset.y : geo.y;

        if (result.x == null) {
          result.x = x;
        } else if (result.x != x) {
          result.x = "";
        }

        if (result.y == null) {
          result.y = y;
        } else if (result.y != y) {
          result.y = "";
        }
      }
    }
  } else if (graph.getModel().isEdge(cell)) {
    result.edges.push(cell);
  }

  var state = graph.view.getState(cell);

  if (state != null) {
    result.autoSize = result.autoSize || this.isAutoSizeState(state);
    result.glass = result.glass && this.isGlassState(state);
    result.rounded = result.rounded && this.isRoundedState(state);
    result.lineJumps = result.lineJumps && this.isLineJumpState(state);
    result.comic = result.comic && this.isComicState(state);
    result.image = result.image && this.isImageState(state);
    result.shadow = result.shadow && this.isShadowState(state);
    result.fill = result.fill && this.isFillState(state);

    var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);
    result.containsImage = result.containsImage || shape == "image";

    for (var key in state.style) {
      var value = state.style[key];

      if (value != null) {
        if (result.style[key] == null) {
          result.style[key] = value;
        } else if (result.style[key] != value) {
          result.style[key] = "";
        }
      }
    }
  }
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isFillState = function(state) {
  return state.view.graph.model.isVertex(state.cell) ||
    mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null) == "arrow" ||
    mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null) == "filledEdge" ||
    mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null) == "flexArrow";
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isGlassState = function(state) {
  var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

  return (shape == "label" || shape == "rectangle" || shape == "internalStorage" ||
    shape == "ext" || shape == "umlLifeline" || shape == "swimlane" ||
    shape == "process");
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isRoundedState = function(state) {
  return (state.shape != null) ? state.shape.isRoundable() :
    mxUtils.indexOf(this.roundableShapes, mxUtils.getValue(state.style,
      mxConstants.STYLE_SHAPE, null)) >= 0;
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isLineJumpState = function(state) {
  var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);
  var curved = mxUtils.getValue(state.style, mxConstants.STYLE_CURVED, false);

  return !curved && (shape == "connector" || shape == "filledEdge");
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isComicState = function(state) {
  var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

  return mxUtils.indexOf(["label", "rectangle", "internalStorage", "corner", "parallelogram", "note", "collate",
    "swimlane", "triangle", "trapezoid", "ext", "step", "tee", "process", "link", "rhombus",
    "offPageConnector", "loopLimit", "hexagon", "manualInput", "singleArrow", "doubleArrow",
    "flexArrow", "filledEdge", "card", "umlLifeline", "connector", "folder", "component", "sortShape",
    "cross", "umlFrame", "cube", "isoCube", "isoRectangle", "partialRectangle"], shape) >= 0;
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isAutoSizeState = function(state) {
  return mxUtils.getValue(state.style, mxConstants.STYLE_AUTOSIZE, null) == "1";
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isImageState = function(state) {
  var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

  return (shape == "label" || shape == "image");
};

/**
 * Returns information about the current selection.
 */
Format.prototype.isShadowState = function(state) {
  var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

  return (shape != "image");
};

/**
 * Adds the label menu items to the given menu and parent.
 */
Format.prototype.clear = function() {
  this.container.innerHTML = "";

  // Destroy existing panels
  if (this.panels != null) {
    for (var i = 0; i < this.panels.length; i++) {
      this.panels[i].destroy();
    }
  }

  this.panels = [];
};

/**
 * Adds the label menu items to the given menu and parent.
 */
Format.prototype.refresh = function() {
  // Performance tweak: No refresh needed if not visible
  if (this.container.style.width == "0px") {
    return;
  }

  this.clear();
  var ui = this.editorUi;
  var graph = ui.editor.graph;

  var div = document.createElement("div");
  div.style.whiteSpace = "nowrap";
  div.style.color = "rgb(112, 112, 112)";
  div.style.textAlign = "left";
  div.style.cursor = "default";

  var label = document.createElement("div");
  label.className = "geFormatSection";
  label.style.textAlign = "center";
  label.style.fontWeight = "bold";
  label.style.paddingTop = "8px";
  label.style.fontSize = "13px";
  label.style.borderWidth = "0px 0px 1px 1px";
  label.style.borderStyle = "solid";
  label.style.display = (mxClient.IS_QUIRKS) ? "inline" : "inline-block";
  label.style.height = (mxClient.IS_QUIRKS) ? "34px" : "25px";
  label.style.overflow = "hidden";
  label.style.width = "100%";
  this.container.appendChild(div);

  // Prevents text selection
  mxEvent.addListener(label, (mxClient.IS_POINTER) ? "pointerdown" : "mousedown",
    mxUtils.bind(this, function(evt) {
      evt.preventDefault();
    }));

  if (graph.isSelectionEmpty()) {
    this.panels.push(new CustomDiagramFormatPanel(this, ui, div));
    // } else if (graph.isEditing()) {
    // mxUtils.write(label, mxResources.get("text"));
    // div.appendChild(label);
    // this.panels.push(new TextFormatPanel(this, ui, div));
  } else {
    if (this.getSelectionState().style.type === "CARD") {
      var cardPanel = div.cloneNode(false);
      this.panels.push(new CustomCardFormatPanel(this, ui, cardPanel));
      this.container.appendChild(cardPanel);
    } else if (this.getSelectionState().style.type === "RECTANGLE") {
      var rectanglePanel = div.cloneNode(false);
      this.panels.push(new CustomRectangleFormatPanel(this, ui, rectanglePanel));
      this.container.appendChild(rectanglePanel);
    } else if (this.getSelectionState().style.type === "IMAGE") {
      var imagePanel = div.cloneNode(false);
      this.panels.push(new CustomFileFormatPanel(this, ui, imagePanel, "image", "image/*"));
      this.container.appendChild(imagePanel);
    } else if (this.getSelectionState().style.type === "IMAGE_SLIDE") {
      const imageSlidePanel = div.cloneNode(false);
      this.panels.push(new CustomImageSlideFormatPanel(this, ui, imageSlidePanel, "image", "image/*"));
      this.container.appendChild(imageSlidePanel);
    } else if (this.getSelectionState().style.type === "PDF") {
      var filePanel = div.cloneNode(false);
      this.panels.push(new CustomFileFormatPanel(this, ui, filePanel, "pdf", "application/pdf"));
      this.container.appendChild(filePanel);
    } else if (this.getSelectionState().style.type === "TEXT") {
      const textPanel = div.cloneNode(false);
      this.panels.push(new CustomTextFormatPanel(this, ui, textPanel));
      this.container.appendChild(textPanel);
    } else if (this.getSelectionState().style.type === "LINK"
      || this.getSelectionState().style.type === "YOUTUBE"
      || this.getSelectionState().style.type === "SPOTIFY"
      || this.getSelectionState().style.type === "VIMEO"
      || this.getSelectionState().style.type === "YOUTUBE_VERT"
    ) {
      var linkPanel = div.cloneNode(false);
      const type = this.getSelectionState().style.type;
      const isMedia = !(this.getSelectionState().style.type === "LINK");
      this.panels.push(new CustomLinkFormatPanel(this, ui, linkPanel, type, isMedia));
      this.container.appendChild(linkPanel);
    } else {
      customUtils.setCellConnectable(this, ui);
      var containsLabel = this.getSelectionState().containsLabel;
      var currentLabel = null;
      var currentPanel = null;

      var addClickHandler = mxUtils.bind(this, function(elt, panel, index) {
        var clickHandler = mxUtils.bind(this, function(evt) {
          if (currentLabel != elt) {
            if (containsLabel) {
              this.labelIndex = index;
            } else {
              this.currentIndex = index;
            }

            if (currentLabel != null) {
              currentLabel.style.backgroundColor = this.inactiveTabBackgroundColor;
              currentLabel.style.borderBottomWidth = "1px";
            }

            currentLabel = elt;
            currentLabel.style.backgroundColor = "";
            currentLabel.style.borderBottomWidth = "0px";

            if (currentPanel != panel) {
              if (currentPanel != null) {
                currentPanel.style.display = "none";
              }

              currentPanel = panel;
              currentPanel.style.display = "";
            }
          }
        });

        mxEvent.addListener(elt, "click", clickHandler);

        // Prevents text selection
        mxEvent.addListener(elt, (mxClient.IS_POINTER) ? "pointerdown" : "mousedown",
          mxUtils.bind(this, function(evt) {
            evt.preventDefault();
          }));

        if (index == ((containsLabel) ? this.labelIndex : this.currentIndex)) {
          // Invokes handler directly as a workaround for no click on DIV in KHTML.
          clickHandler();
        }
      });

      var idx = 0;

      label.style.backgroundColor = this.inactiveTabBackgroundColor;
      label.style.borderLeftWidth = "1px";
      label.style.cursor = "pointer";
      label.style.width = (containsLabel) ? "50%" : "33.3%";
      label.style.width = (containsLabel) ? "50%" : "33.3%";
      var label2 = label.cloneNode(false);
      var label3 = label2.cloneNode(false);

      // Workaround for ignored background in IE
      label2.style.backgroundColor = this.inactiveTabBackgroundColor;
      label3.style.backgroundColor = this.inactiveTabBackgroundColor;

      // Style
      if (containsLabel) {
        label2.style.borderLeftWidth = "0px";
      } else {
        label.style.borderLeftWidth = "0px";
        mxUtils.write(label, mxResources.get("style"));
        div.appendChild(label);

        var stylePanel = div.cloneNode(false);
        stylePanel.style.display = "none";
        this.panels.push(new StyleFormatPanel(this, ui, stylePanel));
        this.container.appendChild(stylePanel);

        addClickHandler(label, stylePanel, idx++);
      }

      // Text
      mxUtils.write(label2, mxResources.get("text"));
      div.appendChild(label2);

      var textPanel = div.cloneNode(false);
      textPanel.style.display = "none";
      this.panels.push(new TextFormatPanel(this, ui, textPanel));
      this.container.appendChild(textPanel);

      // Arrange
      mxUtils.write(label3, mxResources.get("arrange"));
      div.appendChild(label3);

      var arrangePanel = div.cloneNode(false);
      arrangePanel.style.display = "none";
      this.panels.push(new ArrangePanel(this, ui, arrangePanel));
      this.container.appendChild(arrangePanel);

      addClickHandler(label2, textPanel, idx++);
      addClickHandler(label3, arrangePanel, idx++);
    }
  }
};

CustomBaseFormatPanel = function(format, editorUi, container) {
  this.format = format;
  this.editorUi = editorUi;
  this.container = container;
  customUtils.setCellConnectable(format, editorUi);
};

/**
 * Base class for format panels.
 */
BaseFormatPanel = function(format, editorUi, container) {
  this.format = format;
  this.editorUi = editorUi;
  this.container = container;
  this.listeners = [];
};

/**
 *
 */
BaseFormatPanel.prototype.buttonBackgroundColor = "white";

/**
 * Adds the given color option.
 */
BaseFormatPanel.prototype.getSelectionState = function() {
  var graph = this.editorUi.editor.graph;
  var cells = graph.getSelectionCells();
  var shape = null;

  for (var i = 0; i < cells.length; i++) {
    var state = graph.view.getState(cells[i]);

    if (state != null) {
      var tmp = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);

      if (tmp != null) {
        if (shape == null) {
          shape = tmp;
        } else if (shape != tmp) {
          return null;
        }
      }

    }
  }

  return shape;
};

/**
 * Install input handler.
 */
BaseFormatPanel.prototype.installInputHandler = function(input, key, defaultValue, min, max, unit, textEditFallback, isFloat) {
  unit = (unit != null) ? unit : "";
  isFloat = (isFloat != null) ? isFloat : false;

  var ui = this.editorUi;
  var graph = ui.editor.graph;

  min = (min != null) ? min : 1;
  max = (max != null) ? max : 999;

  var selState = null;
  var updating = false;

  var update = mxUtils.bind(this, function(evt) {
    var value = (isFloat) ? parseFloat(input.value) : parseInt(input.value);

    // Special case: angle mod 360
    if (!isNaN(value) && key == mxConstants.STYLE_ROTATION) {
      // Workaround for decimal rounding errors in floats is to
      // use integer and round all numbers to two decimal point
      value = mxUtils.mod(Math.round(value * 100), 36000) / 100;
    }

    value = Math.min(max, Math.max(min, (isNaN(value)) ? defaultValue : value));

    if (graph.cellEditor.isContentEditing() && textEditFallback) {
      if (!updating) {
        updating = true;

        if (selState != null) {
          graph.cellEditor.restoreSelection(selState);
          selState = null;
        }

        textEditFallback(value);
        input.value = value + unit;

        // Restore focus and selection in input
        updating = false;
      }
    } else if (value != mxUtils.getValue(this.format.getSelectionState().style, key, defaultValue)) {
      if (graph.isEditing()) {
        graph.stopEditing(true);
      }

      graph.getModel().beginUpdate();
      try {
        graph.setCellStyles(key, value, graph.getSelectionCells());

        // Handles special case for fontSize where HTML labels are parsed and updated
        if (key == mxConstants.STYLE_FONTSIZE) {
          graph.updateLabelElements(graph.getSelectionCells(), function(elt) {
            elt.style.fontSize = value + "px";
            elt.removeAttribute("size");
          });
        }

        ui.fireEvent(new mxEventObject("styleChanged", "keys", [key],
          "values", [value], "cells", graph.getSelectionCells()));
      } finally {
        graph.getModel().endUpdate();
      }
    }

    input.value = value + unit;
    mxEvent.consume(evt);
  });

  if (textEditFallback && graph.cellEditor.isContentEditing()) {
    // KNOWN: Arrow up/down clear selection text in quirks/IE 8
    // Text size via arrow button limits to 16 in IE11. Why?
    mxEvent.addListener(input, "mousedown", function() {
      if (document.activeElement == graph.cellEditor.textarea) {
        selState = graph.cellEditor.saveSelection();
      }
    });

    mxEvent.addListener(input, "touchstart", function() {
      if (document.activeElement == graph.cellEditor.textarea) {
        selState = graph.cellEditor.saveSelection();
      }
    });
  }

  mxEvent.addListener(input, "change", update);
  mxEvent.addListener(input, "blur", update);

  return update;
};

/**
 * Adds the given option.
 */
BaseFormatPanel.prototype.createPanel = function() {
  var div = document.createElement("div");
  div.className = "geFormatSection";
  div.style.padding = "12px 0px 12px 18px";

  return div;
};

/**
 * Adds the given option.
 */
BaseFormatPanel.prototype.createTitle = function(title) {
  var div = document.createElement("div");
  div.style.padding = "0px 0px 6px 0px";
  div.style.whiteSpace = "nowrap";
  div.style.overflow = "hidden";
  div.style.width = "200px";
  div.style.fontWeight = "bold";
  mxUtils.write(div, title);

  return div;
};

/**
 *
 */
BaseFormatPanel.prototype.createStepper = function(input, update, step, height, disableFocus, defaultValue, isFloat) {
  step = (step != null) ? step : 1;
  height = (height != null) ? height : 8;

  if (mxClient.IS_QUIRKS) {
    height = height - 2;
  } else if (mxClient.IS_MT || document.documentMode >= 8) {
    height = height + 1;
  }

  var stepper = document.createElement("div");
  mxUtils.setPrefixedStyle(stepper.style, "borderRadius", "3px");
  stepper.style.border = "1px solid rgb(192, 192, 192)";
  stepper.style.position = "absolute";

  var up = document.createElement("div");
  up.style.borderBottom = "1px solid rgb(192, 192, 192)";
  up.style.position = "relative";
  up.style.height = height + "px";
  up.style.width = "10px";
  up.className = "geBtnUp";
  stepper.appendChild(up);

  var down = up.cloneNode(false);
  down.style.border = "none";
  down.style.height = height + "px";
  down.className = "geBtnDown";
  stepper.appendChild(down);

  mxEvent.addListener(down, "click", function(evt) {
    if (input.value == "") {
      input.value = defaultValue || "2";
    }

    var val = isFloat ? parseFloat(input.value) : parseInt(input.value);

    if (!isNaN(val)) {
      input.value = val - step;

      if (update != null) {
        update(evt);
      }
    }

    mxEvent.consume(evt);
  });

  mxEvent.addListener(up, "click", function(evt) {
    if (input.value == "") {
      input.value = defaultValue || "0";
    }

    var val = isFloat ? parseFloat(input.value) : parseInt(input.value);

    if (!isNaN(val)) {
      input.value = val + step;

      if (update != null) {
        update(evt);
      }
    }

    mxEvent.consume(evt);
  });

  // Disables transfer of focus to DIV but also :active CSS
  // so it's only used for fontSize where the focus should
  // stay on the selected text, but not for any other input.
  if (disableFocus) {
    var currentSelection = null;

    mxEvent.addGestureListeners(stepper,
      function(evt) {
        // Workaround for lost current selection in page because of focus in IE
        if (mxClient.IS_QUIRKS || document.documentMode == 8) {
          currentSelection = document.selection.createRange();
        }

        mxEvent.consume(evt);
      },
      null,
      function(evt) {
        // Workaround for lost current selection in page because of focus in IE
        if (currentSelection != null) {
          try {
            currentSelection.select();
          } catch (e) {
            // ignore
          }

          currentSelection = null;
          mxEvent.consume(evt);
        }
      }
    );
  }

  return stepper;
};

/**
 * Adds the given option.
 */
BaseFormatPanel.prototype.createOption = function(label, isCheckedFn, setCheckedFn, listener) {
  var div = document.createElement("div");
  div.style.padding = "6px 0px 1px 0px";
  div.style.whiteSpace = "nowrap";
  div.style.overflow = "hidden";
  div.style.width = "200px";
  div.style.height = (mxClient.IS_QUIRKS) ? "27px" : "18px";

  var cb = document.createElement("input");
  cb.setAttribute("type", "checkbox");
  cb.style.margin = "0px 6px 0px 0px";
  div.appendChild(cb);

  var span = document.createElement("span");
  mxUtils.write(span, label);
  div.appendChild(span);

  var applying = false;
  var value = isCheckedFn();

  var apply = function(newValue) {
    if (!applying) {
      applying = true;

      if (newValue) {
        cb.setAttribute("checked", "checked");
        cb.defaultChecked = true;
        cb.checked = true;
      } else {
        cb.removeAttribute("checked");
        cb.defaultChecked = false;
        cb.checked = false;
      }

      if (value != newValue) {
        value = newValue;

        // Checks if the color value needs to be updated in the model
        if (isCheckedFn() != value) {
          setCheckedFn(value);
        }
      }

      applying = false;
    }
  };

  mxEvent.addListener(div, "click", function(evt) {
    if (cb.getAttribute("disabled") != "disabled") {
      // Toggles checkbox state for click on label
      var source = mxEvent.getSource(evt);

      if (source == div || source == span) {
        cb.checked = !cb.checked;
      }

      apply(cb.checked);
    }
  });

  apply(value);

  if (listener != null) {
    listener.install(apply);
    this.listeners.push(listener);
  }

  return div;
};

/**
 * The string 'null' means use null in values.
 */
BaseFormatPanel.prototype.createCellOption = function(label, key, defaultValue, enabledValue, disabledValue, fn, action, stopEditing) {
  enabledValue = (enabledValue != null) ? ((enabledValue == "null") ? null : enabledValue) : "1";
  disabledValue = (disabledValue != null) ? ((disabledValue == "null") ? null : disabledValue) : "0";

  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  return this.createOption(label, function() {
      // Seems to be null sometimes, not sure why...
      var state = graph.view.getState(graph.getSelectionCell());

      if (state != null) {
        return mxUtils.getValue(state.style, key, defaultValue) != disabledValue;
      }

      return null;
    }, function(checked) {
      if (stopEditing) {
        graph.stopEditing();
      }

      if (action != null) {
        action.funct();
      } else {
        graph.getModel().beginUpdate();
        try {
          var value = (checked) ? enabledValue : disabledValue;
          graph.setCellStyles(key, value, graph.getSelectionCells());

          if (fn != null) {
            fn(graph.getSelectionCells(), value);
          }

          ui.fireEvent(new mxEventObject("styleChanged", "keys", [key],
            "values", [value], "cells", graph.getSelectionCells()));
        } finally {
          graph.getModel().endUpdate();
        }
      }
    },
    {
      install: function(apply) {
        this.listener = function() {
          // Seems to be null sometimes, not sure why...
          var state = graph.view.getState(graph.getSelectionCell());

          if (state != null) {
            apply(mxUtils.getValue(state.style, key, defaultValue) != disabledValue);
          }
        };

        graph.getModel().addListener(mxEvent.CHANGE, this.listener);
      },
      destroy: function() {
        graph.getModel().removeListener(this.listener);
      }
    });
};

/**
 * Adds the given color option.
 */
BaseFormatPanel.prototype.createColorOption = function(label, getColorFn, setColorFn, defaultColor, listener, callbackFn, hideCheckbox) {
  var div = document.createElement("div");
  div.style.padding = "6px 0px 1px 0px";
  div.style.whiteSpace = "nowrap";
  div.style.overflow = "hidden";
  div.style.width = "200px";
  div.style.height = (mxClient.IS_QUIRKS) ? "27px" : "18px";

  var cb = document.createElement("input");
  cb.setAttribute("type", "checkbox");
  cb.style.margin = "0px 6px 0px 0px";

  if (!hideCheckbox) {
    div.appendChild(cb);
  }

  var span = document.createElement("span");
  mxUtils.write(span, label);
  div.appendChild(span);

  var value = getColorFn();
  var applying = false;
  var btn = null;

  var apply = function(color, disableUpdate, forceUpdate) {
    if (!applying) {
      applying = true;
      color = (/(^#?[a-zA-Z0-9]*$)/.test(color)) ? color : defaultColor;
      btn.innerHTML = "<div style=\"width:" + ((mxClient.IS_QUIRKS) ? "30" : "36") +
        "px;height:12px;margin:3px;border:1px solid black;background-color:" +
        mxUtils.htmlEntities((color != null && color != mxConstants.NONE) ?
          color : defaultColor) + ";\"></div>";

      // Fine-tuning in Firefox, quirks mode and IE8 standards
      if (mxClient.IS_QUIRKS || document.documentMode == 8) {
        btn.firstChild.style.margin = "0px";
      }

      if (color != null && color != mxConstants.NONE) {
        cb.setAttribute("checked", "checked");
        cb.defaultChecked = true;
        cb.checked = true;
      } else {
        cb.removeAttribute("checked");
        cb.defaultChecked = false;
        cb.checked = false;
      }

      btn.style.display = (cb.checked || hideCheckbox) ? "" : "none";

      if (callbackFn != null) {
        callbackFn(color);
      }

      if (!disableUpdate) {
        value = color;

        // Checks if the color value needs to be updated in the model
        if (forceUpdate || hideCheckbox || getColorFn() != value) {
          setColorFn(value);
        }
      }

      applying = false;
    }
  };

  btn = mxUtils.button("", mxUtils.bind(this, function(evt) {
    this.editorUi.pickColor(value, function(color) {
      apply(color, null, true);
    });
    mxEvent.consume(evt);
  }));

  btn.style.position = "absolute";
  btn.style.marginTop = "-4px";
  btn.style.right = (mxClient.IS_QUIRKS) ? "0px" : "20px";
  btn.style.height = "22px";
  btn.className = "geColorBtn";
  btn.style.display = (cb.checked || hideCheckbox) ? "" : "none";
  div.appendChild(btn);

  mxEvent.addListener(div, "click", function(evt) {
    var source = mxEvent.getSource(evt);

    if (source == cb || source.nodeName != "INPUT") {
      // Toggles checkbox state for click on label
      if (source != cb) {
        cb.checked = !cb.checked;
      }

      // Overrides default value with current value to make it easier
      // to restore previous value if the checkbox is clicked twice
      if (!cb.checked && value != null && value != mxConstants.NONE &&
        defaultColor != mxConstants.NONE) {
        defaultColor = value;
      }

      apply((cb.checked) ? defaultColor : mxConstants.NONE);
    }
  });

  apply(value, true);

  if (listener != null) {
    listener.install(apply);
    this.listeners.push(listener);
  }

  return div;
};

/**
 *
 */
BaseFormatPanel.prototype.createCellColorOption = function(label, colorKey, defaultColor, callbackFn, setStyleFn) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  return this.createColorOption(label, function() {
      // Seems to be null sometimes, not sure why...
      var state = graph.view.getState(graph.getSelectionCell());

      if (state != null) {
        return mxUtils.getValue(state.style, colorKey, null);
      }

      return null;
    }, function(color) {
      graph.getModel().beginUpdate();
      try {
        if (setStyleFn != null) {
          setStyleFn(color);
        }

        graph.setCellStyles(colorKey, color, graph.getSelectionCells());
        ui.fireEvent(new mxEventObject("styleChanged", "keys", [colorKey],
          "values", [color], "cells", graph.getSelectionCells()));
      } finally {
        graph.getModel().endUpdate();
      }
    }, defaultColor || mxConstants.NONE,
    {
      install: function(apply) {
        this.listener = function() {
          // Seems to be null sometimes, not sure why...
          var state = graph.view.getState(graph.getSelectionCell());

          if (state != null) {
            apply(mxUtils.getValue(state.style, colorKey, null));
          }
        };

        graph.getModel().addListener(mxEvent.CHANGE, this.listener);
      },
      destroy: function() {
        graph.getModel().removeListener(this.listener);
      }
    }, callbackFn);
};

/**
 *
 */
BaseFormatPanel.prototype.addArrow = function(elt, height) {
  height = (height != null) ? height : 10;

  var arrow = document.createElement("div");
  arrow.style.display = (mxClient.IS_QUIRKS) ? "inline" : "inline-block";
  arrow.style.padding = "6px";
  arrow.style.paddingRight = "4px";

  var m = (10 - height);

  if (m == 2) {
    arrow.style.paddingTop = 6 + "px";
  } else if (m > 0) {
    arrow.style.paddingTop = (6 - m) + "px";
  } else {
    arrow.style.marginTop = "-2px";
  }

  arrow.style.height = height + "px";
  arrow.style.borderLeft = "1px solid #a0a0a0";
  arrow.innerHTML = "<img border=\"0\" src=\"" + ((mxClient.IS_SVG) ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHBJREFUeNpidHB2ZyAGsACxDRBPIKCuA6TwCBB/h2rABu4A8SYmKCcXiP/iUFgAxL9gCi8A8SwsirZCMQMTkmANEH9E4v+CmsaArvAdyNFI/FlQ92EoBIE+qCRIUz168DBgsU4OqhinQpgHMABAgAEALY4XLIsJ20oAAAAASUVORK5CYII=" :
    IMAGE_PATH + "/dropdown.png") + "\" style=\"margin-bottom:4px;\">";
  mxUtils.setOpacity(arrow, 70);

  var symbol = elt.getElementsByTagName("div")[0];

  if (symbol != null) {
    symbol.style.paddingRight = "6px";
    symbol.style.marginLeft = "4px";
    symbol.style.marginTop = "-1px";
    symbol.style.display = (mxClient.IS_QUIRKS) ? "inline" : "inline-block";
    mxUtils.setOpacity(symbol, 60);
  }

  mxUtils.setOpacity(elt, 100);
  elt.style.border = "1px solid #a0a0a0";
  elt.style.backgroundColor = this.buttonBackgroundColor;
  elt.style.backgroundImage = "none";
  elt.style.width = "auto";
  elt.className += " geColorBtn";
  mxUtils.setPrefixedStyle(elt.style, "borderRadius", "3px");

  elt.appendChild(arrow);

  return symbol;
};

/**
 *
 */
BaseFormatPanel.prototype.addUnitInput = function(container, unit, right, width, update, step, marginTop, disableFocus, isFloat) {
  marginTop = (marginTop != null) ? marginTop : 0;

  var input = document.createElement("input");
  input.style.position = "absolute";
  input.style.textAlign = "right";
  input.style.marginTop = "-2px";
  input.style.right = (right + 12) + "px";
  input.style.width = width + "px";
  container.appendChild(input);

  var stepper = this.createStepper(input, update, step, null, disableFocus, null, isFloat);
  stepper.style.marginTop = (marginTop - 2) + "px";
  stepper.style.right = right + "px";
  container.appendChild(stepper);

  return input;
};

/**
 *
 */
BaseFormatPanel.prototype.createRelativeOption = function(label, key, width, handler, init) {
  width = (width != null) ? width : 44;

  var graph = this.editorUi.editor.graph;
  var div = this.createPanel();
  div.style.paddingTop = "10px";
  div.style.paddingBottom = "10px";
  mxUtils.write(div, label);
  div.style.fontWeight = "bold";

  var update = mxUtils.bind(this, function(evt) {
    if (handler != null) {
      handler(input);
    } else {
      var value = parseInt(input.value);
      value = Math.min(100, Math.max(0, (isNaN(value)) ? 100 : value));
      var state = graph.view.getState(graph.getSelectionCell());

      if (state != null && value != mxUtils.getValue(state.style, key, 100)) {
        // Removes entry in style (assumes 100 is default for relative values)
        if (value == 100) {
          value = null;
        }

        graph.setCellStyles(key, value, graph.getSelectionCells());
        this.editorUi.fireEvent(new mxEventObject("styleChanged", "keys", [key],
          "values", [value], "cells", graph.getSelectionCells()));
      }

      input.value = ((value != null) ? value : "100") + " %";
    }

    mxEvent.consume(evt);
  });

  var input = this.addUnitInput(div, "%", 20, width, update, 10, -15, handler != null);

  if (key != null) {
    var listener = mxUtils.bind(this, function(sender, evt, force) {
      if (force || input != document.activeElement) {
        var ss = this.format.getSelectionState();
        var tmp = parseInt(mxUtils.getValue(ss.style, key, 100));
        input.value = (isNaN(tmp)) ? "" : tmp + " %";
      }
    });

    mxEvent.addListener(input, "keydown", function(e) {
      if (e.keyCode == 13) {
        graph.container.focus();
        mxEvent.consume(e);
      } else if (e.keyCode == 27) {
        listener(null, null, true);
        graph.container.focus();
        mxEvent.consume(e);
      }
    });

    graph.getModel().addListener(mxEvent.CHANGE, listener);
    this.listeners.push({
      destroy: function() {
        graph.getModel().removeListener(listener);
      }
    });
    listener();
  }

  mxEvent.addListener(input, "blur", update);
  mxEvent.addListener(input, "change", update);

  if (init != null) {
    init(input);
  }

  return div;
};

/**
 *
 */
BaseFormatPanel.prototype.addLabel = function(div, title, right, width) {
  width = (width != null) ? width : 61;

  var label = document.createElement("div");
  mxUtils.write(label, title);
  label.style.position = "absolute";
  label.style.right = right + "px";
  label.style.width = width + "px";
  label.style.marginTop = "6px";
  label.style.textAlign = "center";
  div.appendChild(label);
};

/**
 *
 */
BaseFormatPanel.prototype.addKeyHandler = function(input, listener) {
  mxEvent.addListener(input, "keydown", mxUtils.bind(this, function(e) {
    if (e.keyCode == 13) {
      this.editorUi.editor.graph.container.focus();
      mxEvent.consume(e);
    } else if (e.keyCode == 27) {
      if (listener != null) {
        listener(null, null, true);
      }

      this.editorUi.editor.graph.container.focus();
      mxEvent.consume(e);
    }
  }));
};

/**
 *
 */
BaseFormatPanel.prototype.styleButtons = function(elts) {
  for (var i = 0; i < elts.length; i++) {
    mxUtils.setPrefixedStyle(elts[i].style, "borderRadius", "3px");
    mxUtils.setOpacity(elts[i], 100);
    elts[i].style.border = "1px solid #a0a0a0";
    elts[i].style.padding = "4px";
    elts[i].style.paddingTop = "3px";
    elts[i].style.paddingRight = "1px";
    elts[i].style.margin = "1px";
    elts[i].style.width = "24px";
    elts[i].style.height = "20px";
    elts[i].className += " geColorBtn";
  }
};

/**
 * Adds the label menu items to the given menu and parent.
 */
BaseFormatPanel.prototype.destroy = function() {
  if (this.listeners != null) {
    for (var i = 0; i < this.listeners.length; i++) {
      this.listeners[i].destroy();
    }

    this.listeners = null;
  }
};

/**
 * Adds the label menu items to the given menu and parent.
 */
ArrangePanel = function(format, editorUi, container) {
  BaseFormatPanel.call(this, format, editorUi, container);
  this.init();
};

mxUtils.extend(ArrangePanel, BaseFormatPanel);

/**
 * Adds the label menu items to the given menu and parent.
 */
ArrangePanel.prototype.init = function() {
  var graph = this.editorUi.editor.graph;
  var ss = this.format.getSelectionState();

  this.container.appendChild(this.addLayerOps(this.createPanel()));
  // Special case that adds two panels
  this.addGeometry(this.container);
  this.addEdgeGeometry(this.container);

  if (!ss.containsLabel || ss.edges.length == 0) {
    this.container.appendChild(this.addAngle(this.createPanel()));
  }

  if (!ss.containsLabel && ss.edges.length == 0) {
    this.container.appendChild(this.addFlip(this.createPanel()));
  }

  if (ss.vertices.length > 1) {
    this.container.appendChild(this.addAlign(this.createPanel()));
    this.container.appendChild(this.addDistribute(this.createPanel()));
  }

  this.container.appendChild(this.addGroupOps(this.createPanel()));

  if (ss.containsLabel) {
    // Adds functions from hidden style format panel
    var span = document.createElement("div");
    span.style.width = "100%";
    span.style.marginTop = "0px";
    span.style.fontWeight = "bold";
    span.style.padding = "10px 0 0 18px";
    mxUtils.write(span, mxResources.get("style"));
    this.container.appendChild(span);

    new StyleFormatPanel(this.format, this.editorUi, this.container);
  }
};

/**
 *
 */
ArrangePanel.prototype.addLayerOps = function(div) {
  var ui = this.editorUi;

  var btn = mxUtils.button(mxResources.get("toFront"), function(evt) {
    ui.actions.get("toFront").funct();
  });

  btn.setAttribute("title", mxResources.get("toFront") + " (" + this.editorUi.actions.get("toFront").shortcut + ")");
  btn.style.width = "100px";
  btn.style.marginRight = "2px";
  div.appendChild(btn);

  var btn = mxUtils.button(mxResources.get("toBack"), function(evt) {
    ui.actions.get("toBack").funct();
  });

  btn.setAttribute("title", mxResources.get("toBack") + " (" + this.editorUi.actions.get("toBack").shortcut + ")");
  btn.style.width = "100px";
  div.appendChild(btn);

  return div;
};

/**
 *
 */
ArrangePanel.prototype.addGroupOps = function(div) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var cell = graph.getSelectionCell();
  var ss = this.format.getSelectionState();
  var count = 0;
  var btn = null;

  div.style.paddingTop = "8px";
  div.style.paddingBottom = "6px";

  if (graph.getSelectionCount() > 1) {
    btn = mxUtils.button(mxResources.get("group"), function(evt) {
      ui.actions.get("group").funct();
    });

    btn.setAttribute("title", mxResources.get("group") + " (" + this.editorUi.actions.get("group").shortcut + ")");
    btn.style.width = "202px";
    btn.style.marginBottom = "2px";
    div.appendChild(btn);
    count++;
  } else if (graph.getSelectionCount() == 1 && !graph.getModel().isEdge(cell) && !graph.isSwimlane(cell) &&
    graph.getModel().getChildCount(cell) > 0) {
    btn = mxUtils.button(mxResources.get("ungroup"), function(evt) {
      ui.actions.get("ungroup").funct();
    });

    btn.setAttribute("title", mxResources.get("ungroup") + " (" +
      this.editorUi.actions.get("ungroup").shortcut + ")");
    btn.style.width = "202px";
    btn.style.marginBottom = "2px";
    div.appendChild(btn);
    count++;
  }

  if (ss.vertices.length > 0) {
    if (count > 0) {
      mxUtils.br(div);
      count = 0;
    }

    var btn = mxUtils.button(mxResources.get("copySize"), function(evt) {
      ui.actions.get("copySize").funct();
    });

    btn.setAttribute("title", mxResources.get("copySize") + " (" +
      this.editorUi.actions.get("copySize").shortcut + ")");
    btn.style.width = "202px";
    btn.style.marginBottom = "2px";

    div.appendChild(btn);
    count++;

    if (ui.copiedSize != null) {
      var btn2 = mxUtils.button(mxResources.get("pasteSize"), function(evt) {
        ui.actions.get("pasteSize").funct();
      });

      btn2.setAttribute("title", mxResources.get("pasteSize") + " (" +
        this.editorUi.actions.get("pasteSize").shortcut + ")");

      div.appendChild(btn2);
      count++;

      btn.style.width = "100px";
      btn.style.marginBottom = "2px";
      btn2.style.width = "100px";
      btn2.style.marginBottom = "2px";
    }
  }

  if (graph.getSelectionCount() == 1 && graph.getModel().isVertex(cell) &&
    graph.getModel().isVertex(graph.getModel().getParent(cell))) {
    if (count > 0) {
      mxUtils.br(div);
    }

    btn = mxUtils.button(mxResources.get("removeFromGroup"), function(evt) {
      ui.actions.get("removeFromGroup").funct();
    });

    btn.setAttribute("title", mxResources.get("removeFromGroup"));
    btn.style.width = "202px";
    btn.style.marginBottom = "2px";
    div.appendChild(btn);
    count++;
  } else if (graph.getSelectionCount() > 0) {
    if (count > 0) {
      mxUtils.br(div);
    }

    btn = mxUtils.button(mxResources.get("clearWaypoints"), mxUtils.bind(this, function(evt) {
      this.editorUi.actions.get("clearWaypoints").funct();
    }));

    btn.setAttribute("title", mxResources.get("clearWaypoints") + " (" + this.editorUi.actions.get("clearWaypoints").shortcut + ")");
    btn.style.width = "202px";
    btn.style.marginBottom = "2px";
    div.appendChild(btn);

    count++;
  }

  // if (graph.getSelectionCount() == 1) {
  //   if (count > 0) {
  //     mxUtils.br(div);
  //   }
  //
  //   btn = mxUtils.button(mxResources.get('editData'), mxUtils.bind(this, function(evt) {
  //     this.editorUi.actions.get('editData').funct();
  //   }));
  //
  //   btn.setAttribute('title', mxResources.get('editData') + ' (' + this.editorUi.actions.get('editData').shortcut + ')');
  //   btn.style.width = '100px';
  //   btn.style.marginBottom = '2px';
  //   div.appendChild(btn);
  //   count++;
  //
  //   btn = mxUtils.button(mxResources.get('editLink'), mxUtils.bind(this, function(evt) {
  //     this.editorUi.actions.get('editLink').funct();
  //   }));
  //
  //   btn.setAttribute('title', mxResources.get('editLink'));
  //   btn.style.width = '100px';
  //   btn.style.marginLeft = '2px';
  //   btn.style.marginBottom = '2px';
  //   div.appendChild(btn);
  //   count++;
  // }

  if (count == 0) {
    div.style.display = "none";
  }

  return div;
};

/**
 *
 */
ArrangePanel.prototype.addAlign = function(div) {
  var graph = this.editorUi.editor.graph;
  div.style.paddingTop = "6px";
  div.style.paddingBottom = "12px";
  div.appendChild(this.createTitle(mxResources.get("align")));

  var stylePanel = document.createElement("div");
  stylePanel.style.position = "relative";
  stylePanel.style.paddingLeft = "0px";
  stylePanel.style.borderWidth = "0px";
  stylePanel.className = "geToolbarContainer";

  if (mxClient.IS_QUIRKS) {
    div.style.height = "60px";
  }

  var left = this.editorUi.toolbar.addButton("geSprite-alignleft", mxResources.get("left"),
    function() {
      graph.alignCells(mxConstants.ALIGN_LEFT);
    }, stylePanel);
  var center = this.editorUi.toolbar.addButton("geSprite-aligncenter", mxResources.get("center"),
    function() {
      graph.alignCells(mxConstants.ALIGN_CENTER);
    }, stylePanel);
  var right = this.editorUi.toolbar.addButton("geSprite-alignright", mxResources.get("right"),
    function() {
      graph.alignCells(mxConstants.ALIGN_RIGHT);
    }, stylePanel);

  var top = this.editorUi.toolbar.addButton("geSprite-aligntop", mxResources.get("top"),
    function() {
      graph.alignCells(mxConstants.ALIGN_TOP);
    }, stylePanel);
  var middle = this.editorUi.toolbar.addButton("geSprite-alignmiddle", mxResources.get("middle"),
    function() {
      graph.alignCells(mxConstants.ALIGN_MIDDLE);
    }, stylePanel);
  var bottom = this.editorUi.toolbar.addButton("geSprite-alignbottom", mxResources.get("bottom"),
    function() {
      graph.alignCells(mxConstants.ALIGN_BOTTOM);
    }, stylePanel);

  this.styleButtons([left, center, right, top, middle, bottom]);
  right.style.marginRight = "6px";
  div.appendChild(stylePanel);

  return div;
};

/**
 *
 */
ArrangePanel.prototype.addFlip = function(div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  div.style.paddingTop = "6px";
  div.style.paddingBottom = "10px";

  var span = document.createElement("div");
  span.style.marginTop = "2px";
  span.style.marginBottom = "8px";
  span.style.fontWeight = "bold";
  mxUtils.write(span, mxResources.get("flip"));
  div.appendChild(span);

  var btn = mxUtils.button(mxResources.get("horizontal"), function(evt) {
    graph.toggleCellStyles(mxConstants.STYLE_FLIPH, false);
  });

  btn.setAttribute("title", mxResources.get("horizontal"));
  btn.style.width = "100px";
  btn.style.marginRight = "2px";
  div.appendChild(btn);

  var btn = mxUtils.button(mxResources.get("vertical"), function(evt) {
    graph.toggleCellStyles(mxConstants.STYLE_FLIPV, false);
  });

  btn.setAttribute("title", mxResources.get("vertical"));
  btn.style.width = "100px";
  div.appendChild(btn);

  return div;
};

/**
 *
 */
ArrangePanel.prototype.addDistribute = function(div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  div.style.paddingTop = "6px";
  div.style.paddingBottom = "12px";

  div.appendChild(this.createTitle(mxResources.get("distribute")));

  var btn = mxUtils.button(mxResources.get("horizontal"), function(evt) {
    graph.distributeCells(true);
  });

  btn.setAttribute("title", mxResources.get("horizontal"));
  btn.style.width = "100px";
  btn.style.marginRight = "2px";
  div.appendChild(btn);

  var btn = mxUtils.button(mxResources.get("vertical"), function(evt) {
    graph.distributeCells(false);
  });

  btn.setAttribute("title", mxResources.get("vertical"));
  btn.style.width = "100px";
  div.appendChild(btn);

  return div;
};

/**
 *
 */
ArrangePanel.prototype.addAngle = function(div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var ss = this.format.getSelectionState();

  div.style.paddingBottom = "8px";

  var span = document.createElement("div");
  span.style.position = "absolute";
  span.style.width = "70px";
  span.style.marginTop = "0px";
  span.style.fontWeight = "bold";

  var input = null;
  var update = null;
  var btn = null;

  if (ss.edges.length == 0) {
    mxUtils.write(span, mxResources.get("angle"));
    div.appendChild(span);

    input = this.addUnitInput(div, "°", 20, 44, function() {
      update.apply(this, arguments);
    });

    mxUtils.br(div);
    div.style.paddingTop = "10px";
  } else {
    div.style.paddingTop = "8px";
  }

  if (!ss.containsLabel) {
    var label = mxResources.get("reverse");

    if (ss.vertices.length > 0 && ss.edges.length > 0) {
      label = mxResources.get("turn") + " / " + label;
    } else if (ss.vertices.length > 0) {
      label = mxResources.get("turn");
    }

    btn = mxUtils.button(label, function(evt) {
      ui.actions.get("turn").funct();
    });

    btn.setAttribute("title", label + " (" + this.editorUi.actions.get("turn").shortcut + ")");
    btn.style.width = "202px";
    div.appendChild(btn);

    if (input != null) {
      btn.style.marginTop = "8px";
    }
  }

  if (input != null) {
    var listener = mxUtils.bind(this, function(sender, evt, force) {
      if (force || document.activeElement != input) {
        ss = this.format.getSelectionState();
        var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_ROTATION, 0));
        input.value = (isNaN(tmp)) ? "" : tmp + "°";
      }
    });

    update = this.installInputHandler(input, mxConstants.STYLE_ROTATION, 0, 0, 360, "°", null, true);
    this.addKeyHandler(input, listener);

    graph.getModel().addListener(mxEvent.CHANGE, listener);
    this.listeners.push({
      destroy: function() {
        graph.getModel().removeListener(listener);
      }
    });
    listener();
  }

  return div;
};

BaseFormatPanel.prototype.getUnit = function() {
  var unit = this.editorUi.editor.graph.view.unit;

  switch (unit) {
    case mxConstants.POINTS:
      return "pt";
    case mxConstants.INCHES:
      return "\"";
    case mxConstants.MILLIMETERS:
      return "mm";
  }
};

BaseFormatPanel.prototype.inUnit = function(pixels) {
  return this.editorUi.editor.graph.view.formatUnitText(pixels);
};

BaseFormatPanel.prototype.fromUnit = function(value) {
  var unit = this.editorUi.editor.graph.view.unit;

  switch (unit) {
    case mxConstants.POINTS:
      return value;
    case mxConstants.INCHES:
      return value * mxConstants.PIXELS_PER_INCH;
    case mxConstants.MILLIMETERS:
      return value * mxConstants.PIXELS_PER_MM;
  }
};

BaseFormatPanel.prototype.isFloatUnit = function() {
  return this.editorUi.editor.graph.view.unit != mxConstants.POINTS;
};

BaseFormatPanel.prototype.getUnitStep = function() {
  var unit = this.editorUi.editor.graph.view.unit;

  switch (unit) {
    case mxConstants.POINTS:
      return 1;
    case mxConstants.INCHES:
      return 0.1;
    case mxConstants.MILLIMETERS:
      return 0.5;
  }
};

/**
 *
 */
ArrangePanel.prototype.addGeometry = function(container) {
  var panel = this;
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var rect = this.format.getSelectionState();

  var div = this.createPanel();
  div.style.paddingBottom = "8px";

  var span = document.createElement("div");
  span.style.position = "absolute";
  span.style.width = "50px";
  span.style.marginTop = "0px";
  span.style.fontWeight = "bold";
  mxUtils.write(span, mxResources.get("size"));
  div.appendChild(span);

  var widthUpdate, heightUpdate, leftUpdate, topUpdate;
  var width = this.addUnitInput(div, this.getUnit(), 84, 44, function() {
    widthUpdate.apply(this, arguments);
  }, this.getUnitStep(), null, null, this.isFloatUnit());
  var height = this.addUnitInput(div, this.getUnit(), 20, 44, function() {
    heightUpdate.apply(this, arguments);
  }, this.getUnitStep(), null, null, this.isFloatUnit());

  var autosizeBtn = document.createElement("div");
  autosizeBtn.className = "geSprite geSprite-fit";
  autosizeBtn.setAttribute("title", mxResources.get("autosize") + " (" + this.editorUi.actions.get("autosize").shortcut + ")");
  autosizeBtn.style.position = "relative";
  autosizeBtn.style.cursor = "pointer";
  autosizeBtn.style.marginTop = "-3px";
  autosizeBtn.style.border = "0px";
  autosizeBtn.style.left = "52px";
  mxUtils.setOpacity(autosizeBtn, 50);

  mxEvent.addListener(autosizeBtn, "mouseenter", function() {
    mxUtils.setOpacity(autosizeBtn, 100);
  });

  mxEvent.addListener(autosizeBtn, "mouseleave", function() {
    mxUtils.setOpacity(autosizeBtn, 50);
  });

  mxEvent.addListener(autosizeBtn, "click", function() {
    ui.actions.get("autosize").funct();
  });

  div.appendChild(autosizeBtn);
  this.addLabel(div, mxResources.get("width"), 84);
  this.addLabel(div, mxResources.get("height"), 20);
  mxUtils.br(div);

  var wrapper = document.createElement("div");
  wrapper.style.paddingTop = "8px";
  wrapper.style.paddingRight = "20px";
  wrapper.style.whiteSpace = "nowrap";
  wrapper.style.textAlign = "right";
  var opt = this.createCellOption(mxResources.get("constrainProportions"),
    mxConstants.STYLE_ASPECT, null, "fixed", "null");
  opt.style.width = "100%";
  wrapper.appendChild(opt);
  div.appendChild(wrapper);

  var constrainCheckbox = opt.getElementsByTagName("input")[0];
  this.addKeyHandler(width, listener);
  this.addKeyHandler(height, listener);

  widthUpdate = this.addGeometryHandler(width, function(geo, value) {
    if (geo.width > 0) {
      var value = Math.max(1, panel.fromUnit(value));

      if (constrainCheckbox.checked) {
        geo.height = Math.round((geo.height * value * 100) / geo.width) / 100;
      }

      geo.width = value;
    }
  });
  heightUpdate = this.addGeometryHandler(height, function(geo, value) {
    if (geo.height > 0) {
      var value = Math.max(1, panel.fromUnit(value));

      if (constrainCheckbox.checked) {
        geo.width = Math.round((geo.width * value * 100) / geo.height) / 100;
      }

      geo.height = value;
    }
  });

  container.appendChild(div);

  var div2 = this.createPanel();
  div2.style.paddingBottom = "30px";

  var span = document.createElement("div");
  span.style.position = "absolute";
  span.style.width = "70px";
  span.style.marginTop = "0px";
  span.style.fontWeight = "bold";
  mxUtils.write(span, mxResources.get("position"));
  div2.appendChild(span);

  var left = this.addUnitInput(div2, this.getUnit(), 84, 44, function() {
    leftUpdate.apply(this, arguments);
  }, this.getUnitStep(), null, null, this.isFloatUnit());
  var top = this.addUnitInput(div2, this.getUnit(), 20, 44, function() {
    topUpdate.apply(this, arguments);
  }, this.getUnitStep(), null, null, this.isFloatUnit());

  mxUtils.br(div2);
  this.addLabel(div2, mxResources.get("left"), 84);
  this.addLabel(div2, mxResources.get("top"), 20);

  var listener = mxUtils.bind(this, function(sender, evt, force) {
    rect = this.format.getSelectionState();

    if (!rect.containsLabel && rect.vertices.length == graph.getSelectionCount() &&
      rect.width != null && rect.height != null) {
      div.style.display = "";

      if (force || document.activeElement != width) {
        width.value = this.inUnit(rect.width) + ((rect.width == "") ? "" : " " + this.getUnit());
      }

      if (force || document.activeElement != height) {
        height.value = this.inUnit(rect.height) + ((rect.height == "") ? "" : " " + this.getUnit());
      }
    } else {
      div.style.display = "none";
    }

    if (rect.vertices.length == graph.getSelectionCount() &&
      rect.x != null && rect.y != null) {
      div2.style.display = "";

      if (force || document.activeElement != left) {
        left.value = this.inUnit(rect.x) + ((rect.x == "") ? "" : " " + this.getUnit());
      }

      if (force || document.activeElement != top) {
        top.value = this.inUnit(rect.y) + ((rect.y == "") ? "" : " " + this.getUnit());
      }
    } else {
      div2.style.display = "none";
    }
  });

  this.addKeyHandler(left, listener);
  this.addKeyHandler(top, listener);

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function() {
      graph.getModel().removeListener(listener);
    }
  });
  listener();

  leftUpdate = this.addGeometryHandler(left, function(geo, value) {
    value = panel.fromUnit(value);

    if (geo.relative) {
      geo.offset.x = value;
    } else {
      geo.x = value;
    }
  });
  topUpdate = this.addGeometryHandler(top, function(geo, value) {
    value = panel.fromUnit(value);

    if (geo.relative) {
      geo.offset.y = value;
    } else {
      geo.y = value;
    }
  });

  container.appendChild(div2);
};

/**
 *
 */
ArrangePanel.prototype.addGeometryHandler = function(input, fn) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var initialValue = null;
  var panel = this;

  function update(evt) {
    if (input.value != "") {
      var value = parseFloat(input.value);

      if (isNaN(value)) {
        input.value = initialValue + " " + panel.getUnit();
      } else if (value != initialValue) {
        graph.getModel().beginUpdate();
        try {
          var cells = graph.getSelectionCells();

          for (var i = 0; i < cells.length; i++) {
            if (graph.getModel().isVertex(cells[i])) {
              var geo = graph.getCellGeometry(cells[i]);

              if (geo != null) {
                geo = geo.clone();
                fn(geo, value);

                graph.getModel().setGeometry(cells[i], geo);
              }
            }
          }
        } finally {
          graph.getModel().endUpdate();
        }

        initialValue = value;
        input.value = value + " " + panel.getUnit();
      }
    }

    mxEvent.consume(evt);
  };

  mxEvent.addListener(input, "blur", update);
  mxEvent.addListener(input, "change", update);
  mxEvent.addListener(input, "focus", function() {
    initialValue = input.value;
  });

  return update;
};

ArrangePanel.prototype.addEdgeGeometryHandler = function(input, fn) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var initialValue = null;

  function update(evt) {
    if (input.value != "") {
      var value = parseFloat(input.value);

      if (isNaN(value)) {
        input.value = initialValue + " pt";
      } else if (value != initialValue) {
        graph.getModel().beginUpdate();
        try {
          var cells = graph.getSelectionCells();

          for (var i = 0; i < cells.length; i++) {
            if (graph.getModel().isEdge(cells[i])) {
              var geo = graph.getCellGeometry(cells[i]);

              if (geo != null) {
                geo = geo.clone();
                fn(geo, value);

                graph.getModel().setGeometry(cells[i], geo);
              }
            }
          }
        } finally {
          graph.getModel().endUpdate();
        }

        initialValue = value;
        input.value = value + " pt";
      }
    }

    mxEvent.consume(evt);
  };

  mxEvent.addListener(input, "blur", update);
  mxEvent.addListener(input, "change", update);
  mxEvent.addListener(input, "focus", function() {
    initialValue = input.value;
  });

  return update;
};

/**
 *
 */
ArrangePanel.prototype.addEdgeGeometry = function(container) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var rect = this.format.getSelectionState();

  var div = this.createPanel();

  var span = document.createElement("div");
  span.style.position = "absolute";
  span.style.width = "70px";
  span.style.marginTop = "0px";
  span.style.fontWeight = "bold";
  mxUtils.write(span, mxResources.get("width"));
  div.appendChild(span);

  var widthUpdate, xtUpdate, ytUpdate, xsUpdate, ysUpdate;
  var width = this.addUnitInput(div, "pt", 20, 44, function() {
    widthUpdate.apply(this, arguments);
  });

  mxUtils.br(div);
  this.addKeyHandler(width, listener);

  function widthUpdate(evt) {
    // Maximum stroke width is 999
    var value = parseInt(width.value);
    value = Math.min(999, Math.max(1, (isNaN(value)) ? 1 : value));

    if (value != mxUtils.getValue(rect.style, "width", mxCellRenderer.defaultShapes["flexArrow"].prototype.defaultWidth)) {
      graph.setCellStyles("width", value, graph.getSelectionCells());
      ui.fireEvent(new mxEventObject("styleChanged", "keys", ["width"],
        "values", [value], "cells", graph.getSelectionCells()));
    }

    width.value = value + " pt";
    mxEvent.consume(evt);
  };

  mxEvent.addListener(width, "blur", widthUpdate);
  mxEvent.addListener(width, "change", widthUpdate);

  container.appendChild(div);

  var divs = this.createPanel();
  divs.style.paddingBottom = "30px";

  var span = document.createElement("div");
  span.style.position = "absolute";
  span.style.width = "70px";
  span.style.marginTop = "0px";
  span.style.fontWeight = "bold";
  mxUtils.write(span, "Start");
  divs.appendChild(span);

  var xs = this.addUnitInput(divs, "pt", 84, 44, function() {
    xsUpdate.apply(this, arguments);
  });
  var ys = this.addUnitInput(divs, "pt", 20, 44, function() {
    ysUpdate.apply(this, arguments);
  });

  mxUtils.br(divs);
  this.addLabel(divs, mxResources.get("left"), 84);
  this.addLabel(divs, mxResources.get("top"), 20);
  container.appendChild(divs);
  this.addKeyHandler(xs, listener);
  this.addKeyHandler(ys, listener);

  var divt = this.createPanel();
  divt.style.paddingBottom = "30px";

  var span = document.createElement("div");
  span.style.position = "absolute";
  span.style.width = "70px";
  span.style.marginTop = "0px";
  span.style.fontWeight = "bold";
  mxUtils.write(span, "End");
  divt.appendChild(span);

  var xt = this.addUnitInput(divt, "pt", 84, 44, function() {
    xtUpdate.apply(this, arguments);
  });
  var yt = this.addUnitInput(divt, "pt", 20, 44, function() {
    ytUpdate.apply(this, arguments);
  });

  mxUtils.br(divt);
  this.addLabel(divt, mxResources.get("left"), 84);
  this.addLabel(divt, mxResources.get("top"), 20);
  container.appendChild(divt);
  this.addKeyHandler(xt, listener);
  this.addKeyHandler(yt, listener);

  var listener = mxUtils.bind(this, function(sender, evt, force) {
    rect = this.format.getSelectionState();
    var cell = graph.getSelectionCell();

    if (rect.style.shape == "link" || rect.style.shape == "flexArrow") {
      div.style.display = "";

      if (force || document.activeElement != width) {
        var value = mxUtils.getValue(rect.style, "width",
          mxCellRenderer.defaultShapes["flexArrow"].prototype.defaultWidth);
        width.value = value + " pt";
      }
    } else {
      div.style.display = "none";
    }

    if (graph.getSelectionCount() == 1 && graph.model.isEdge(cell)) {
      var geo = graph.model.getGeometry(cell);

      if (geo.sourcePoint != null && graph.model.getTerminal(cell, true) == null) {
        xs.value = geo.sourcePoint.x;
        ys.value = geo.sourcePoint.y;
      } else {
        divs.style.display = "none";
      }

      if (geo.targetPoint != null && graph.model.getTerminal(cell, false) == null) {
        xt.value = geo.targetPoint.x;
        yt.value = geo.targetPoint.y;
      } else {
        divt.style.display = "none";
      }
    } else {
      divs.style.display = "none";
      divt.style.display = "none";
    }
  });

  xsUpdate = this.addEdgeGeometryHandler(xs, function(geo, value) {
    geo.sourcePoint.x = value;
  });

  ysUpdate = this.addEdgeGeometryHandler(ys, function(geo, value) {
    geo.sourcePoint.y = value;
  });

  xtUpdate = this.addEdgeGeometryHandler(xt, function(geo, value) {
    geo.targetPoint.x = value;
  });

  ytUpdate = this.addEdgeGeometryHandler(yt, function(geo, value) {
    geo.targetPoint.y = value;
  });

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function() {
      graph.getModel().removeListener(listener);
    }
  });
  listener();
};

/**
 * Adds the label menu items to the given menu and parent.
 */
TextFormatPanel = function(format, editorUi, container) {
  BaseFormatPanel.call(this, format, editorUi, container);
  this.init();
};

mxUtils.extend(TextFormatPanel, BaseFormatPanel);

/**
 * Adds the label menu items to the given menu and parent.
 */
TextFormatPanel.prototype.init = function() {
  this.container.style.borderBottom = "none";
  this.addFont(this.container);
};

/**
 * Adds the label menu items to the given menu and parent.
 */
TextFormatPanel.prototype.addFont = function(container) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var ss = this.format.getSelectionState();

  var title = this.createTitle(mxResources.get("font"));
  title.style.paddingLeft = "18px";
  title.style.paddingTop = "10px";
  title.style.paddingBottom = "6px";
  container.appendChild(title);

  var stylePanel = this.createPanel();
  stylePanel.style.paddingTop = "2px";
  stylePanel.style.paddingBottom = "2px";
  stylePanel.style.position = "relative";
  stylePanel.style.marginLeft = "-2px";
  stylePanel.style.borderWidth = "0px";
  stylePanel.className = "geToolbarContainer";

  if (mxClient.IS_QUIRKS) {
    stylePanel.style.display = "block";
  }

  if (graph.cellEditor.isContentEditing()) {
    var cssPanel = stylePanel.cloneNode();

    var cssMenu = this.editorUi.toolbar.addMenu(mxResources.get("style"),
      mxResources.get("style"), true, "formatBlock", cssPanel, null, true);
    cssMenu.style.color = "rgb(112, 112, 112)";
    cssMenu.style.whiteSpace = "nowrap";
    cssMenu.style.overflow = "hidden";
    cssMenu.style.margin = "0px";
    this.addArrow(cssMenu);
    cssMenu.style.width = "192px";
    cssMenu.style.height = "15px";

    var arrow = cssMenu.getElementsByTagName("div")[0];
    arrow.style.cssFloat = "right";
    container.appendChild(cssPanel);
  }

  container.appendChild(stylePanel);

  var colorPanel = this.createPanel();
  colorPanel.style.marginTop = "8px";
  colorPanel.style.borderTop = "1px solid #c0c0c0";
  colorPanel.style.paddingTop = "6px";
  colorPanel.style.paddingBottom = "6px";

  var fontMenu = this.editorUi.toolbar.addMenu("Helvetica", mxResources.get("fontFamily"),
    true, "fontFamily", stylePanel, null, true);
  fontMenu.style.color = "rgb(112, 112, 112)";
  fontMenu.style.whiteSpace = "nowrap";
  fontMenu.style.overflow = "hidden";
  fontMenu.style.margin = "0px";

  this.addArrow(fontMenu);
  fontMenu.style.width = "192px";
  fontMenu.style.height = "15px";

  var stylePanel2 = stylePanel.cloneNode(false);
  stylePanel2.style.marginLeft = "-3px";
  var fontStyleItems = this.editorUi.toolbar.addItems(["bold", "italic", "underline"], stylePanel2, true);
  fontStyleItems[0].setAttribute("title", mxResources.get("bold") + " (" + this.editorUi.actions.get("bold").shortcut + ")");
  fontStyleItems[1].setAttribute("title", mxResources.get("italic") + " (" + this.editorUi.actions.get("italic").shortcut + ")");
  fontStyleItems[2].setAttribute("title", mxResources.get("underline") + " (" + this.editorUi.actions.get("underline").shortcut + ")");

  var verticalItem = this.editorUi.toolbar.addItems(["vertical"], stylePanel2, true)[0];

  if (mxClient.IS_QUIRKS) {
    mxUtils.br(container);
  }

  container.appendChild(stylePanel2);

  this.styleButtons(fontStyleItems);
  this.styleButtons([verticalItem]);

  var stylePanel3 = stylePanel.cloneNode(false);
  stylePanel3.style.marginLeft = "-3px";
  stylePanel3.style.paddingBottom = "0px";

  // Helper function to return a wrapper function does not pass any arguments
  var callFn = function(fn) {
    return function() {
      return fn();
    };
  };

  var left = this.editorUi.toolbar.addButton("geSprite-left", mxResources.get("left"),
    (graph.cellEditor.isContentEditing()) ?
      function(evt) {
        graph.cellEditor.alignText(mxConstants.ALIGN_LEFT, evt);
      } : callFn(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_LEFT])), stylePanel3);
  var center = this.editorUi.toolbar.addButton("geSprite-center", mxResources.get("center"),
    (graph.cellEditor.isContentEditing()) ?
      function(evt) {
        graph.cellEditor.alignText(mxConstants.ALIGN_CENTER, evt);
      } : callFn(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_CENTER])), stylePanel3);
  var right = this.editorUi.toolbar.addButton("geSprite-right", mxResources.get("right"),
    (graph.cellEditor.isContentEditing()) ?
      function(evt) {
        graph.cellEditor.alignText(mxConstants.ALIGN_RIGHT, evt);
      } : callFn(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_RIGHT])), stylePanel3);

  this.styleButtons([left, center, right]);

  // Quick hack for strikethrough
  // TODO: Add translations and toggle state
  if (graph.cellEditor.isContentEditing()) {
    var strike = this.editorUi.toolbar.addButton("geSprite-removeformat", mxResources.get("strikethrough"),
      function() {
        document.execCommand("strikeThrough", false, null);
      }, stylePanel2);
    this.styleButtons([strike]);

    strike.firstChild.style.background = "url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik0wIDBoMjR2MjRIMFYweiIvPjwvZGVmcz48Y2xpcFBhdGggaWQ9ImIiPjx1c2UgeGxpbms6aHJlZj0iI2EiIG92ZXJmbG93PSJ2aXNpYmxlIi8+PC9jbGlwUGF0aD48cGF0aCBjbGlwLXBhdGg9InVybCgjYikiIGZpbGw9IiMwMTAxMDEiIGQ9Ik03LjI0IDguNzVjLS4yNi0uNDgtLjM5LTEuMDMtLjM5LTEuNjcgMC0uNjEuMTMtMS4xNi40LTEuNjcuMjYtLjUuNjMtLjkzIDEuMTEtMS4yOS40OC0uMzUgMS4wNS0uNjMgMS43LS44My42Ni0uMTkgMS4zOS0uMjkgMi4xOC0uMjkuODEgMCAxLjU0LjExIDIuMjEuMzQuNjYuMjIgMS4yMy41NCAxLjY5Ljk0LjQ3LjQuODMuODggMS4wOCAxLjQzLjI1LjU1LjM4IDEuMTUuMzggMS44MWgtMy4wMWMwLS4zMS0uMDUtLjU5LS4xNS0uODUtLjA5LS4yNy0uMjQtLjQ5LS40NC0uNjgtLjItLjE5LS40NS0uMzMtLjc1LS40NC0uMy0uMS0uNjYtLjE2LTEuMDYtLjE2LS4zOSAwLS43NC4wNC0xLjAzLjEzLS4yOS4wOS0uNTMuMjEtLjcyLjM2LS4xOS4xNi0uMzQuMzQtLjQ0LjU1LS4xLjIxLS4xNS40My0uMTUuNjYgMCAuNDguMjUuODguNzQgMS4yMS4zOC4yNS43Ny40OCAxLjQxLjdINy4zOWMtLjA1LS4wOC0uMTEtLjE3LS4xNS0uMjV6TTIxIDEydi0ySDN2Mmg5LjYyYy4xOC4wNy40LjE0LjU1LjIuMzcuMTcuNjYuMzQuODcuNTEuMjEuMTcuMzUuMzYuNDMuNTcuMDcuMi4xMS40My4xMS42OSAwIC4yMy0uMDUuNDUtLjE0LjY2LS4wOS4yLS4yMy4zOC0uNDIuNTMtLjE5LjE1LS40Mi4yNi0uNzEuMzUtLjI5LjA4LS42My4xMy0xLjAxLjEzLS40MyAwLS44My0uMDQtMS4xOC0uMTNzLS42Ni0uMjMtLjkxLS40MmMtLjI1LS4xOS0uNDUtLjQ0LS41OS0uNzUtLjE0LS4zMS0uMjUtLjc2LS4yNS0xLjIxSDYuNGMwIC41NS4wOCAxLjEzLjI0IDEuNTguMTYuNDUuMzcuODUuNjUgMS4yMS4yOC4zNS42LjY2Ljk4LjkyLjM3LjI2Ljc4LjQ4IDEuMjIuNjUuNDQuMTcuOS4zIDEuMzguMzkuNDguMDguOTYuMTMgMS40NC4xMy44IDAgMS41My0uMDkgMi4xOC0uMjhzMS4yMS0uNDUgMS42Ny0uNzljLjQ2LS4zNC44Mi0uNzcgMS4wNy0xLjI3cy4zOC0xLjA3LjM4LTEuNzFjMC0uNi0uMS0xLjE0LS4zMS0xLjYxLS4wNS0uMTEtLjExLS4yMy0uMTctLjMzSDIxeiIvPjwvc3ZnPg==)";
    strike.firstChild.style.backgroundPosition = "2px 2px";
    strike.firstChild.style.backgroundSize = "18px 18px";

    this.styleButtons([strike]);
  }

  var top = this.editorUi.toolbar.addButton("geSprite-top", mxResources.get("top"),
    callFn(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN], [mxConstants.ALIGN_TOP])), stylePanel3);
  var middle = this.editorUi.toolbar.addButton("geSprite-middle", mxResources.get("middle"),
    callFn(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN], [mxConstants.ALIGN_MIDDLE])), stylePanel3);
  var bottom = this.editorUi.toolbar.addButton("geSprite-bottom", mxResources.get("bottom"),
    callFn(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN], [mxConstants.ALIGN_BOTTOM])), stylePanel3);

  this.styleButtons([top, middle, bottom]);

  if (mxClient.IS_QUIRKS) {
    mxUtils.br(container);
  }

  container.appendChild(stylePanel3);

  // Hack for updating UI state below based on current text selection
  // currentTable is the current selected DOM table updated below
  var sub, sup, full, tableWrapper, currentTable, tableCell, tableRow;

  if (graph.cellEditor.isContentEditing()) {
    top.style.display = "none";
    middle.style.display = "none";
    bottom.style.display = "none";
    verticalItem.style.display = "none";

    full = this.editorUi.toolbar.addButton("geSprite-justifyfull", mxResources.get("block"),
      function() {
        if (full.style.opacity == 1) {
          document.execCommand("justifyfull", false, null);
        }
      }, stylePanel3);
    full.style.marginRight = "9px";
    full.style.opacity = 1;

    this.styleButtons([full,
      sub = this.editorUi.toolbar.addButton("geSprite-subscript",
        mxResources.get("subscript") + " (" + Editor.ctrlKey + "+,)",
        function() {
          document.execCommand("subscript", false, null);
        }, stylePanel3), sup = this.editorUi.toolbar.addButton("geSprite-superscript",
        mxResources.get("superscript") + " (" + Editor.ctrlKey + "+.)",
        function() {
          document.execCommand("superscript", false, null);
        }, stylePanel3)]);
    sub.style.marginLeft = "9px";

    var tmp = stylePanel3.cloneNode(false);
    tmp.style.paddingTop = "4px";
    var btns = [this.editorUi.toolbar.addButton("geSprite-orderedlist", mxResources.get("numberedList"),
      function() {
        document.execCommand("insertorderedlist", false, null);
      }, tmp),
      this.editorUi.toolbar.addButton("geSprite-unorderedlist", mxResources.get("bulletedList"),
        function() {
          document.execCommand("insertunorderedlist", false, null);
        }, tmp),
      this.editorUi.toolbar.addButton("geSprite-outdent", mxResources.get("decreaseIndent"),
        function() {
          document.execCommand("outdent", false, null);
        }, tmp),
      this.editorUi.toolbar.addButton("geSprite-indent", mxResources.get("increaseIndent"),
        function() {
          document.execCommand("indent", false, null);
        }, tmp),
      this.editorUi.toolbar.addButton("geSprite-removeformat", mxResources.get("removeFormat"),
        function() {
          document.execCommand("removeformat", false, null);
        }, tmp),
      this.editorUi.toolbar.addButton("geSprite-code", mxResources.get("html"),
        function() {
          graph.cellEditor.toggleViewMode();
        }, tmp)];
    this.styleButtons(btns);
    btns[btns.length - 2].style.marginLeft = "9px";

    if (mxClient.IS_QUIRKS) {
      mxUtils.br(container);
      tmp.style.height = "40";
    }

    container.appendChild(tmp);
  } else {
    fontStyleItems[2].style.marginRight = "9px";
    right.style.marginRight = "9px";
  }

  // Label position
  var stylePanel4 = stylePanel.cloneNode(false);
  stylePanel4.style.marginLeft = "0px";
  stylePanel4.style.paddingTop = "8px";
  stylePanel4.style.paddingBottom = "4px";
  stylePanel4.style.fontWeight = "normal";

  mxUtils.write(stylePanel4, mxResources.get("position"));

  // Adds label position options
  var positionSelect = document.createElement("select");
  positionSelect.style.position = "absolute";
  positionSelect.style.right = "20px";
  positionSelect.style.width = "97px";
  positionSelect.style.marginTop = "-2px";

  var directions = ["topLeft", "top", "topRight", "left", "center", "right", "bottomLeft", "bottom", "bottomRight"];
  var lset = {
    "topLeft": [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_BOTTOM],
    "top": [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_TOP, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_BOTTOM],
    "topRight": [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM],
    "left": [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_MIDDLE],
    "center": [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE],
    "right": [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE],
    "bottomLeft": [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP],
    "bottom": [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_TOP],
    "bottomRight": [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP]
  };

  for (var i = 0; i < directions.length; i++) {
    var positionOption = document.createElement("option");
    positionOption.setAttribute("value", directions[i]);
    mxUtils.write(positionOption, mxResources.get(directions[i]));
    positionSelect.appendChild(positionOption);
  }

  stylePanel4.appendChild(positionSelect);

  // Writing direction
  var stylePanel5 = stylePanel.cloneNode(false);
  stylePanel5.style.marginLeft = "0px";
  stylePanel5.style.paddingTop = "4px";
  stylePanel5.style.paddingBottom = "4px";
  stylePanel5.style.fontWeight = "normal";

  mxUtils.write(stylePanel5, mxResources.get("writingDirection"));

  // Adds writing direction options
  // LATER: Handle reselect of same option in all selects (change event
  // is not fired for same option so have opened state on click) and
  // handle multiple different styles for current selection
  var dirSelect = document.createElement("select");
  dirSelect.style.position = "absolute";
  dirSelect.style.right = "20px";
  dirSelect.style.width = "97px";
  dirSelect.style.marginTop = "-2px";

  // NOTE: For automatic we use the value null since automatic
  // requires the text to be non formatted and non-wrapped
  var dirs = ["automatic", "leftToRight", "rightToLeft"];
  var dirSet = {
    "automatic": null,
    "leftToRight": mxConstants.TEXT_DIRECTION_LTR,
    "rightToLeft": mxConstants.TEXT_DIRECTION_RTL
  };

  for (var i = 0; i < dirs.length; i++) {
    var dirOption = document.createElement("option");
    dirOption.setAttribute("value", dirs[i]);
    mxUtils.write(dirOption, mxResources.get(dirs[i]));
    dirSelect.appendChild(dirOption);
  }

  stylePanel5.appendChild(dirSelect);

  if (!graph.isEditing()) {
    container.appendChild(stylePanel4);

    mxEvent.addListener(positionSelect, "change", function(evt) {
      graph.getModel().beginUpdate();
      try {
        var vals = lset[positionSelect.value];

        if (vals != null) {
          graph.setCellStyles(mxConstants.STYLE_LABEL_POSITION, vals[0], graph.getSelectionCells());
          graph.setCellStyles(mxConstants.STYLE_VERTICAL_LABEL_POSITION, vals[1], graph.getSelectionCells());
          graph.setCellStyles(mxConstants.STYLE_ALIGN, vals[2], graph.getSelectionCells());
          graph.setCellStyles(mxConstants.STYLE_VERTICAL_ALIGN, vals[3], graph.getSelectionCells());
        }
      } finally {
        graph.getModel().endUpdate();
      }

      mxEvent.consume(evt);
    });

    // LATER: Update dir in text editor while editing and update style with label
    // NOTE: The tricky part is handling and passing on the auto value
    container.appendChild(stylePanel5);

    mxEvent.addListener(dirSelect, "change", function(evt) {
      graph.setCellStyles(mxConstants.STYLE_TEXT_DIRECTION, dirSet[dirSelect.value], graph.getSelectionCells());
      mxEvent.consume(evt);
    });
  }

  // Font size
  var input = document.createElement("input");
  input.style.textAlign = "right";
  input.style.marginTop = "4px";

  if (!mxClient.IS_QUIRKS) {
    input.style.position = "absolute";
    input.style.right = "32px";
  }

  input.style.width = "46px";
  input.style.height = (mxClient.IS_QUIRKS) ? "21px" : "17px";
  stylePanel2.appendChild(input);

  // Workaround for font size 4 if no text is selected is update font size below
  // after first character was entered (as the font element is lazy created)
  var pendingFontSize = null;

  var inputUpdate = this.installInputHandler(input, mxConstants.STYLE_FONTSIZE, Menus.prototype.defaultFontSize, 1, 999, " pt",
    function(fontSize) {
      // IE does not support containsNode
      // KNOWN: Fixes font size issues but bypasses undo
      if (window.getSelection && !mxClient.IS_IE && !mxClient.IS_IE11) {
        var selection = window.getSelection();
        var container = (selection.rangeCount > 0) ? selection.getRangeAt(0).commonAncestorContainer :
          graph.cellEditor.textarea;

        function updateSize(elt, ignoreContains) {
          if (graph.cellEditor.textarea != null && elt != graph.cellEditor.textarea &&
            graph.cellEditor.textarea.contains(elt) &&
            (ignoreContains || selection.containsNode(elt, true))) {
            if (elt.nodeName == "FONT") {
              elt.removeAttribute("size");
              elt.style.fontSize = fontSize + "px";
            } else {
              var css = mxUtils.getCurrentStyle(elt);

              if (css.fontSize != fontSize + "px") {
                if (mxUtils.getCurrentStyle(elt.parentNode).fontSize != fontSize + "px") {
                  elt.style.fontSize = fontSize + "px";
                } else {
                  elt.style.fontSize = "";
                }
              }
            }
          }
        };

        // Wraps text node or mixed selection with leading text in a font element
        if (container == graph.cellEditor.textarea ||
          container.nodeType != mxConstants.NODETYPE_ELEMENT) {
          document.execCommand("fontSize", false, "1");
        }

        if (container != graph.cellEditor.textarea) {
          container = container.parentNode;
        }

        if (container != null && container.nodeType == mxConstants.NODETYPE_ELEMENT) {
          var elts = container.getElementsByTagName("*");
          updateSize(container);

          for (var i = 0; i < elts.length; i++) {
            updateSize(elts[i]);
          }
        }

        input.value = fontSize + " pt";
      } else if (window.getSelection || document.selection) {
        // Checks selection
        var par = null;

        if (document.selection) {
          par = document.selection.createRange().parentElement();
        } else {
          var selection = window.getSelection();

          if (selection.rangeCount > 0) {
            par = selection.getRangeAt(0).commonAncestorContainer;
          }
        }

        // Node.contains does not work for text nodes in IE11
        function isOrContains(container, node) {
          while (node != null) {
            if (node === container) {
              return true;
            }

            node = node.parentNode;
          }

          return false;
        };

        if (par != null && isOrContains(graph.cellEditor.textarea, par)) {
          pendingFontSize = fontSize;

          // Workaround for can't set font size in px is to change font size afterwards
          document.execCommand("fontSize", false, "4");
          var elts = graph.cellEditor.textarea.getElementsByTagName("font");

          for (var i = 0; i < elts.length; i++) {
            if (elts[i].getAttribute("size") == "4") {
              elts[i].removeAttribute("size");
              elts[i].style.fontSize = pendingFontSize + "px";

              // Overrides fontSize in input with the one just assigned as a workaround
              // for potential fontSize values of parent elements that don't match
              window.setTimeout(function() {
                input.value = pendingFontSize + " pt";
                pendingFontSize = null;
              }, 0);

              break;
            }
          }
        }
      }
    }, true);

  var stepper = this.createStepper(input, inputUpdate, 1, 10, true, Menus.prototype.defaultFontSize);
  stepper.style.display = input.style.display;
  stepper.style.marginTop = "4px";

  if (!mxClient.IS_QUIRKS) {
    stepper.style.right = "20px";
  }

  stylePanel2.appendChild(stepper);

  var arrow = fontMenu.getElementsByTagName("div")[0];
  arrow.style.cssFloat = "right";

  var bgColorApply = null;
  var currentBgColor = "#ffffff";

  var fontColorApply = null;
  var currentFontColor = "#000000";

  var bgPanel = (graph.cellEditor.isContentEditing()) ? this.createColorOption(mxResources.get("backgroundColor"), function() {
      return currentBgColor;
    }, function(color) {
      document.execCommand("backcolor", false, (color != mxConstants.NONE) ? color : "transparent");
    }, "#ffffff",
    {
      install: function(apply) {
        bgColorApply = apply;
      },
      destroy: function() {
        bgColorApply = null;
      }
    }, null, true) : this.createCellColorOption(mxResources.get("backgroundColor"), mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, "#ffffff", null, function(color) {
    graph.updateLabelElements(graph.getSelectionCells(), function(elt) {
      elt.style.backgroundColor = null;
    });
  });
  bgPanel.style.fontWeight = "bold";

  var borderPanel = this.createCellColorOption(mxResources.get("borderColor"), mxConstants.STYLE_LABEL_BORDERCOLOR, "#000000");
  borderPanel.style.fontWeight = "bold";

  var panel = (graph.cellEditor.isContentEditing()) ? this.createColorOption(mxResources.get("fontColor"), function() {
      return currentFontColor;
    }, function(color) {
      if (mxClient.IS_FF) {
        // Workaround for Firefox that adds the font element around
        // anchor elements which ignore inherited colors is to move
        // the font element inside anchor elements
        var tmp = graph.cellEditor.textarea.getElementsByTagName("font");
        var oldFonts = [];

        for (var i = 0; i < tmp.length; i++) {
          oldFonts.push(
            {
              node: tmp[i],
              color: tmp[i].getAttribute("color")
            });
        }

        document.execCommand("forecolor", false, (color != mxConstants.NONE) ?
          color : "transparent");

        // Finds the new or changed font element
        var newFonts = graph.cellEditor.textarea.getElementsByTagName("font");

        for (var i = 0; i < newFonts.length; i++) {
          if (i >= oldFonts.length || newFonts[i] != oldFonts[i].node ||
            (newFonts[i] == oldFonts[i].node &&
              newFonts[i].getAttribute("color") != oldFonts[i].color)) {
            var child = newFonts[i].firstChild;

            // Moves the font element to inside the anchor element and adopts all children
            if (child != null && child.nodeName == "A" && child.nextSibling ==
              null &&
              child.firstChild != null) {
              var parent = newFonts[i].parentNode;
              parent.insertBefore(child, newFonts[i]);
              var tmp = child.firstChild;

              while (tmp != null) {
                var next = tmp.nextSibling;
                newFonts[i].appendChild(tmp);
                tmp = next;
              }

              child.appendChild(newFonts[i]);
            }

            break;
          }
        }
      } else {
        document.execCommand("forecolor", false, (color != mxConstants.NONE) ?
          color : "transparent");
      }
    }, "#000000",
    {
      install: function(apply) {
        fontColorApply = apply;
      },
      destroy: function() {
        fontColorApply = null;
      }
    }, null, true) : this.createCellColorOption(mxResources.get("fontColor"), mxConstants.STYLE_FONTCOLOR, "#000000", function(color) {
    if (color == null || color == mxConstants.NONE) {
      bgPanel.style.display = "none";
    } else {
      bgPanel.style.display = "";
    }

    borderPanel.style.display = bgPanel.style.display;
  }, function(color) {
    if (color == null || color == mxConstants.NONE) {
      graph.setCellStyles(mxConstants.STYLE_NOLABEL, "1", graph.getSelectionCells());
    } else {
      graph.setCellStyles(mxConstants.STYLE_NOLABEL, null, graph.getSelectionCells());
    }

    graph.updateLabelElements(graph.getSelectionCells(), function(elt) {
      elt.removeAttribute("color");
      elt.style.color = null;
    });
  });
  panel.style.fontWeight = "bold";

  colorPanel.appendChild(panel);
  colorPanel.appendChild(bgPanel);

  if (!graph.cellEditor.isContentEditing()) {
    colorPanel.appendChild(borderPanel);
  }

  container.appendChild(colorPanel);

  var extraPanel = this.createPanel();
  extraPanel.style.paddingTop = "2px";
  extraPanel.style.paddingBottom = "4px";

  // LATER: Fix toggle using '' instead of 'null'
  var wwOpt = this.createCellOption(mxResources.get("wordWrap"), mxConstants.STYLE_WHITE_SPACE, null, "wrap", "null", null, null, true);
  wwOpt.style.fontWeight = "bold";

  // Word wrap in edge labels only supported via labelWidth style
  if (!ss.containsLabel && !ss.autoSize && ss.edges.length == 0) {
    extraPanel.appendChild(wwOpt);
  }

  // Delegates switch of style to formattedText action as it also convertes newlines
  var htmlOpt = this.createCellOption(mxResources.get("formattedText"), "html", "0",
    null, null, null, ui.actions.get("formattedText"));
  htmlOpt.style.fontWeight = "bold";
  extraPanel.appendChild(htmlOpt);

  var spacingPanel = this.createPanel();
  spacingPanel.style.paddingTop = "10px";
  spacingPanel.style.paddingBottom = "28px";
  spacingPanel.style.fontWeight = "normal";

  var span = document.createElement("div");
  span.style.position = "absolute";
  span.style.width = "70px";
  span.style.marginTop = "0px";
  span.style.fontWeight = "bold";
  mxUtils.write(span, mxResources.get("spacing"));
  spacingPanel.appendChild(span);

  var topUpdate, globalUpdate, leftUpdate, bottomUpdate, rightUpdate;
  var topSpacing = this.addUnitInput(spacingPanel, "pt", 91, 44, function() {
    topUpdate.apply(this, arguments);
  });
  var globalSpacing = this.addUnitInput(spacingPanel, "pt", 20, 44, function() {
    globalUpdate.apply(this, arguments);
  });

  mxUtils.br(spacingPanel);
  this.addLabel(spacingPanel, mxResources.get("top"), 91);
  this.addLabel(spacingPanel, mxResources.get("global"), 20);
  mxUtils.br(spacingPanel);
  mxUtils.br(spacingPanel);

  var leftSpacing = this.addUnitInput(spacingPanel, "pt", 162, 44, function() {
    leftUpdate.apply(this, arguments);
  });
  var bottomSpacing = this.addUnitInput(spacingPanel, "pt", 91, 44, function() {
    bottomUpdate.apply(this, arguments);
  });
  var rightSpacing = this.addUnitInput(spacingPanel, "pt", 20, 44, function() {
    rightUpdate.apply(this, arguments);
  });

  mxUtils.br(spacingPanel);
  this.addLabel(spacingPanel, mxResources.get("left"), 162);
  this.addLabel(spacingPanel, mxResources.get("bottom"), 91);
  this.addLabel(spacingPanel, mxResources.get("right"), 20);

  if (!graph.cellEditor.isContentEditing()) {
    container.appendChild(extraPanel);
    container.appendChild(this.createRelativeOption(mxResources.get("opacity"), mxConstants.STYLE_TEXT_OPACITY));
    container.appendChild(spacingPanel);
  } else {
    var selState = null;
    var lineHeightInput = null;

    container.appendChild(this.createRelativeOption(mxResources.get("lineheight"), null, null, function(input) {
      var value = (input.value == "") ? 120 : parseInt(input.value);
      value = Math.max(0, (isNaN(value)) ? 120 : value);

      if (selState != null) {
        graph.cellEditor.restoreSelection(selState);
        selState = null;
      }

      var selectedElement = graph.getSelectedElement();
      var node = selectedElement;

      while (node != null && node.nodeType != mxConstants.NODETYPE_ELEMENT) {
        node = node.parentNode;
      }

      if (node != null && node == graph.cellEditor.textarea && graph.cellEditor.textarea.firstChild != null) {
        if (graph.cellEditor.textarea.firstChild.nodeName != "P") {
          graph.cellEditor.textarea.innerHTML = "<p>" + graph.cellEditor.textarea.innerHTML + "</p>";
        }

        node = graph.cellEditor.textarea.firstChild;
      }

      if (node != null && graph.cellEditor.textarea != null && node != graph.cellEditor.textarea &&
        graph.cellEditor.textarea.contains(node)) {
        node.style.lineHeight = value + "%";
      }

      input.value = value + " %";
    }, function(input) {
      // Used in CSS handler to update current value
      lineHeightInput = input;

      // KNOWN: Arrow up/down clear selection text in quirks/IE 8
      // Text size via arrow button limits to 16 in IE11. Why?
      mxEvent.addListener(input, "mousedown", function() {
        if (document.activeElement == graph.cellEditor.textarea) {
          selState = graph.cellEditor.saveSelection();
        }
      });

      mxEvent.addListener(input, "touchstart", function() {
        if (document.activeElement == graph.cellEditor.textarea) {
          selState = graph.cellEditor.saveSelection();
        }
      });

      input.value = "120 %";
    }));

    var insertPanel = stylePanel.cloneNode(false);
    insertPanel.style.paddingLeft = "0px";
    var insertBtns = this.editorUi.toolbar.addItems(["link", "image"], insertPanel, true);

    var btns = [
      this.editorUi.toolbar.addButton("geSprite-horizontalrule", mxResources.get("insertHorizontalRule"),
        function() {
          document.execCommand("inserthorizontalrule", false);
        }, insertPanel),
      this.editorUi.toolbar.addMenuFunctionInContainer(insertPanel, "geSprite-table", mxResources.get("table"), false, mxUtils.bind(this, function(menu) {
        this.editorUi.menus.addInsertTableItem(menu);
      }))];
    this.styleButtons(insertBtns);
    this.styleButtons(btns);

    var wrapper2 = this.createPanel();
    wrapper2.style.paddingTop = "10px";
    wrapper2.style.paddingBottom = "10px";
    wrapper2.appendChild(this.createTitle(mxResources.get("insert")));
    wrapper2.appendChild(insertPanel);
    container.appendChild(wrapper2);

    if (mxClient.IS_QUIRKS) {
      wrapper2.style.height = "70";
    }

    var tablePanel = stylePanel.cloneNode(false);
    tablePanel.style.paddingLeft = "0px";

    var btns = [
      this.editorUi.toolbar.addButton("geSprite-insertcolumnbefore", mxResources.get("insertColumnBefore"),
        mxUtils.bind(this, function() {
          try {
            if (currentTable != null) {
              graph.insertColumn(currentTable, (tableCell != null) ? tableCell.cellIndex : 0);
            }
          } catch (e) {
            this.editorUi.handleError(e);
          }
        }), tablePanel),
      this.editorUi.toolbar.addButton("geSprite-insertcolumnafter", mxResources.get("insertColumnAfter"),
        mxUtils.bind(this, function() {
          try {
            if (currentTable != null) {
              graph.insertColumn(currentTable, (tableCell != null) ? tableCell.cellIndex + 1 : -1);
            }
          } catch (e) {
            this.editorUi.handleError(e);
          }
        }), tablePanel),
      this.editorUi.toolbar.addButton("geSprite-deletecolumn", mxResources.get("deleteColumn"),
        mxUtils.bind(this, function() {
          try {
            if (currentTable != null && tableCell != null) {
              graph.deleteColumn(currentTable, tableCell.cellIndex);
            }
          } catch (e) {
            this.editorUi.handleError(e);
          }
        }), tablePanel),
      this.editorUi.toolbar.addButton("geSprite-insertrowbefore", mxResources.get("insertRowBefore"),
        mxUtils.bind(this, function() {
          try {
            if (currentTable != null && tableRow != null) {
              graph.insertRow(currentTable, tableRow.sectionRowIndex);
            }
          } catch (e) {
            this.editorUi.handleError(e);
          }
        }), tablePanel),
      this.editorUi.toolbar.addButton("geSprite-insertrowafter", mxResources.get("insertRowAfter"),
        mxUtils.bind(this, function() {
          try {
            if (currentTable != null && tableRow != null) {
              graph.insertRow(currentTable, tableRow.sectionRowIndex + 1);
            }
          } catch (e) {
            this.editorUi.handleError(e);
          }
        }), tablePanel),
      this.editorUi.toolbar.addButton("geSprite-deleterow", mxResources.get("deleteRow"),
        mxUtils.bind(this, function() {
          try {
            if (currentTable != null && tableRow != null) {
              graph.deleteRow(currentTable, tableRow.sectionRowIndex);
            }
          } catch (e) {
            this.editorUi.handleError(e);
          }
        }), tablePanel)];
    this.styleButtons(btns);
    btns[2].style.marginRight = "9px";

    var wrapper3 = this.createPanel();
    wrapper3.style.paddingTop = "10px";
    wrapper3.style.paddingBottom = "10px";
    wrapper3.appendChild(this.createTitle(mxResources.get("table")));
    wrapper3.appendChild(tablePanel);

    if (mxClient.IS_QUIRKS) {
      mxUtils.br(container);
      wrapper3.style.height = "70";
    }

    var tablePanel2 = stylePanel.cloneNode(false);
    tablePanel2.style.paddingLeft = "0px";

    var btns = [
      this.editorUi.toolbar.addButton("geSprite-strokecolor", mxResources.get("borderColor"),
        mxUtils.bind(this, function(evt) {
          if (currentTable != null) {
            // Converts rgb(r,g,b) values
            var color = currentTable.style.borderColor.replace(
              /\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
              function($0, $1, $2, $3) {
                return "#" + ("0" + Number($1).toString(16)).substr(-2) + ("0" + Number($2).toString(16)).substr(-2) + ("0" + Number($3).toString(16)).substr(-2);
              });
            this.editorUi.pickColor(color, function(newColor) {
              var targetElt = (tableCell != null && (evt == null || !mxEvent.isShiftDown(evt))) ? tableCell : currentTable;

              graph.processElements(targetElt, function(elt) {
                elt.style.border = null;
              });

              if (newColor == null || newColor == mxConstants.NONE) {
                targetElt.removeAttribute("border");
                targetElt.style.border = "";
                targetElt.style.borderCollapse = "";
              } else {
                targetElt.setAttribute("border", "1");
                targetElt.style.border = "1px solid " + newColor;
                targetElt.style.borderCollapse = "collapse";
              }
            });
          }
        }), tablePanel2),
      this.editorUi.toolbar.addButton("geSprite-fillcolor", mxResources.get("backgroundColor"),
        mxUtils.bind(this, function(evt) {
          // Converts rgb(r,g,b) values
          if (currentTable != null) {
            var color = currentTable.style.backgroundColor.replace(
              /\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
              function($0, $1, $2, $3) {
                return "#" + ("0" + Number($1).toString(16)).substr(-2) + ("0" + Number($2).toString(16)).substr(-2) + ("0" + Number($3).toString(16)).substr(-2);
              });
            this.editorUi.pickColor(color, function(newColor) {
              var targetElt = (tableCell != null && (evt == null || !mxEvent.isShiftDown(evt))) ? tableCell : currentTable;

              graph.processElements(targetElt, function(elt) {
                elt.style.backgroundColor = null;
              });

              if (newColor == null || newColor == mxConstants.NONE) {
                targetElt.style.backgroundColor = "";
              } else {
                targetElt.style.backgroundColor = newColor;
              }
            });
          }
        }), tablePanel2),
      this.editorUi.toolbar.addButton("geSprite-fit", mxResources.get("spacing"),
        function() {
          if (currentTable != null) {
            var value = currentTable.getAttribute("cellPadding") || 0;

            var dlg = new FilenameDialog(ui, value, mxResources.get("apply"), mxUtils.bind(this, function(newValue) {
              if (newValue != null && newValue.length > 0) {
                currentTable.setAttribute("cellPadding", newValue);
              } else {
                currentTable.removeAttribute("cellPadding");
              }
            }), mxResources.get("spacing"));
            ui.showDialog(dlg.container, 300, 80, true, true);
            dlg.init();
          }
        }, tablePanel2),
      this.editorUi.toolbar.addButton("geSprite-left", mxResources.get("left"),
        function() {
          if (currentTable != null) {
            currentTable.setAttribute("align", "left");
          }
        }, tablePanel2),
      this.editorUi.toolbar.addButton("geSprite-center", mxResources.get("center"),
        function() {
          if (currentTable != null) {
            currentTable.setAttribute("align", "center");
          }
        }, tablePanel2),
      this.editorUi.toolbar.addButton("geSprite-right", mxResources.get("right"),
        function() {
          if (currentTable != null) {
            currentTable.setAttribute("align", "right");
          }
        }, tablePanel2)];
    this.styleButtons(btns);
    btns[2].style.marginRight = "9px";

    if (mxClient.IS_QUIRKS) {
      mxUtils.br(wrapper3);
      mxUtils.br(wrapper3);
    }

    wrapper3.appendChild(tablePanel2);
    container.appendChild(wrapper3);

    tableWrapper = wrapper3;
  }

  function setSelected(elt, selected) {
    if (mxClient.IS_IE && (mxClient.IS_QUIRKS || document.documentMode < 10)) {
      elt.style.filter = (selected) ? "progid:DXImageTransform.Microsoft.Gradient(" +
        "StartColorStr='#c5ecff', EndColorStr='#87d4fb', GradientType=0)" : "";
    } else {
      elt.style.backgroundImage = (selected) ? "linear-gradient(#c5ecff 0px,#87d4fb 100%)" : "";
    }
  };

  var listener = mxUtils.bind(this, function(sender, evt, force) {
    ss = this.format.getSelectionState();
    var fontStyle = mxUtils.getValue(ss.style, mxConstants.STYLE_FONTSTYLE, 0);
    setSelected(fontStyleItems[0], (fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD);
    setSelected(fontStyleItems[1], (fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC);
    setSelected(fontStyleItems[2], (fontStyle & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE);
    fontMenu.firstChild.nodeValue = mxUtils.getValue(ss.style, mxConstants.STYLE_FONTFAMILY, Menus.prototype.defaultFont);

    setSelected(verticalItem, mxUtils.getValue(ss.style, mxConstants.STYLE_HORIZONTAL, "1") == "0");

    if (force || document.activeElement != input) {
      var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_FONTSIZE, Menus.prototype.defaultFontSize));
      input.value = (isNaN(tmp)) ? "" : tmp + " pt";
    }

    var align = mxUtils.getValue(ss.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER);
    setSelected(left, align == mxConstants.ALIGN_LEFT);
    setSelected(center, align == mxConstants.ALIGN_CENTER);
    setSelected(right, align == mxConstants.ALIGN_RIGHT);

    var valign = mxUtils.getValue(ss.style, mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE);
    setSelected(top, valign == mxConstants.ALIGN_TOP);
    setSelected(middle, valign == mxConstants.ALIGN_MIDDLE);
    setSelected(bottom, valign == mxConstants.ALIGN_BOTTOM);

    var pos = mxUtils.getValue(ss.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER);
    var vpos = mxUtils.getValue(ss.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE);

    if (pos == mxConstants.ALIGN_LEFT && vpos == mxConstants.ALIGN_TOP) {
      positionSelect.value = "topLeft";
    } else if (pos == mxConstants.ALIGN_CENTER && vpos == mxConstants.ALIGN_TOP) {
      positionSelect.value = "top";
    } else if (pos == mxConstants.ALIGN_RIGHT && vpos == mxConstants.ALIGN_TOP) {
      positionSelect.value = "topRight";
    } else if (pos == mxConstants.ALIGN_LEFT && vpos == mxConstants.ALIGN_BOTTOM) {
      positionSelect.value = "bottomLeft";
    } else if (pos == mxConstants.ALIGN_CENTER && vpos == mxConstants.ALIGN_BOTTOM) {
      positionSelect.value = "bottom";
    } else if (pos == mxConstants.ALIGN_RIGHT && vpos == mxConstants.ALIGN_BOTTOM) {
      positionSelect.value = "bottomRight";
    } else if (pos == mxConstants.ALIGN_LEFT) {
      positionSelect.value = "left";
    } else if (pos == mxConstants.ALIGN_RIGHT) {
      positionSelect.value = "right";
    } else {
      positionSelect.value = "center";
    }

    var dir = mxUtils.getValue(ss.style, mxConstants.STYLE_TEXT_DIRECTION, mxConstants.DEFAULT_TEXT_DIRECTION);

    if (dir == mxConstants.TEXT_DIRECTION_RTL) {
      dirSelect.value = "rightToLeft";
    } else if (dir == mxConstants.TEXT_DIRECTION_LTR) {
      dirSelect.value = "leftToRight";
    } else if (dir == mxConstants.TEXT_DIRECTION_AUTO) {
      dirSelect.value = "automatic";
    }

    if (force || document.activeElement != globalSpacing) {
      var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING, 2));
      globalSpacing.value = (isNaN(tmp)) ? "" : tmp + " pt";
    }

    if (force || document.activeElement != topSpacing) {
      var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING_TOP, 0));
      topSpacing.value = (isNaN(tmp)) ? "" : tmp + " pt";
    }

    if (force || document.activeElement != rightSpacing) {
      var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING_RIGHT, 0));
      rightSpacing.value = (isNaN(tmp)) ? "" : tmp + " pt";
    }

    if (force || document.activeElement != bottomSpacing) {
      var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING_BOTTOM, 0));
      bottomSpacing.value = (isNaN(tmp)) ? "" : tmp + " pt";
    }

    if (force || document.activeElement != leftSpacing) {
      var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING_LEFT, 0));
      leftSpacing.value = (isNaN(tmp)) ? "" : tmp + " pt";
    }
  });

  globalUpdate = this.installInputHandler(globalSpacing, mxConstants.STYLE_SPACING, 2, -999, 999, " pt");
  topUpdate = this.installInputHandler(topSpacing, mxConstants.STYLE_SPACING_TOP, 0, -999, 999, " pt");
  rightUpdate = this.installInputHandler(rightSpacing, mxConstants.STYLE_SPACING_RIGHT, 0, -999, 999, " pt");
  bottomUpdate = this.installInputHandler(bottomSpacing, mxConstants.STYLE_SPACING_BOTTOM, 0, -999, 999, " pt");
  leftUpdate = this.installInputHandler(leftSpacing, mxConstants.STYLE_SPACING_LEFT, 0, -999, 999, " pt");

  this.addKeyHandler(input, listener);
  this.addKeyHandler(globalSpacing, listener);
  this.addKeyHandler(topSpacing, listener);
  this.addKeyHandler(rightSpacing, listener);
  this.addKeyHandler(bottomSpacing, listener);
  this.addKeyHandler(leftSpacing, listener);

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function() {
      graph.getModel().removeListener(listener);
    }
  });
  listener();

  if (graph.cellEditor.isContentEditing()) {
    var updating = false;

    var updateCssHandler = function() {
      if (!updating) {
        updating = true;

        window.setTimeout(function() {
          var selectedElement = graph.getSelectedElement();
          var node = selectedElement;

          while (node != null && node.nodeType != mxConstants.NODETYPE_ELEMENT) {
            node = node.parentNode;
          }

          if (node != null) {
            // Workaround for commonAncestor on range in IE11 returning parent of common ancestor
            if (node == graph.cellEditor.textarea && graph.cellEditor.textarea.children.length == 1 &&
              graph.cellEditor.textarea.firstChild.nodeType == mxConstants.NODETYPE_ELEMENT) {
              node = graph.cellEditor.textarea.firstChild;
            }

            function getRelativeLineHeight(fontSize, css, elt) {
              if (elt.style != null && css != null) {
                var lineHeight = css.lineHeight;

                if (elt.style.lineHeight != null && elt.style.lineHeight.substring(elt.style.lineHeight.length - 1) == "%") {
                  return parseInt(elt.style.lineHeight) / 100;
                } else {
                  return (lineHeight.substring(lineHeight.length - 2) == "px") ?
                    parseFloat(lineHeight) / fontSize : parseInt(lineHeight);
                }
              } else {
                return "";
              }
            };

            function getAbsoluteFontSize(css) {
              var fontSize = (css != null) ? css.fontSize : null;

              if (fontSize != null && fontSize.substring(fontSize.length - 2) == "px") {
                return parseFloat(fontSize);
              } else {
                return mxConstants.DEFAULT_FONTSIZE;
              }
            };

            var css = mxUtils.getCurrentStyle(node);
            var fontSize = getAbsoluteFontSize(css);
            var lineHeight = getRelativeLineHeight(fontSize, css, node);

            // Finds common font size
            var elts = node.getElementsByTagName("*");

            // IE does not support containsNode
            if (elts.length > 0 && window.getSelection && !mxClient.IS_IE && !mxClient.IS_IE11) {
              var selection = window.getSelection();

              for (var i = 0; i < elts.length; i++) {
                if (selection.containsNode(elts[i], true)) {
                  temp = mxUtils.getCurrentStyle(elts[i]);
                  fontSize = Math.max(getAbsoluteFontSize(temp), fontSize);
                  var lh = getRelativeLineHeight(fontSize, temp, elts[i]);

                  if (lh != lineHeight || isNaN(lh)) {
                    lineHeight = "";
                  }
                }
              }
            }

            function hasParentOrOnlyChild(name) {
              if (graph.getParentByName(node, name, graph.cellEditor.textarea) != null) {
                return true;
              } else {
                var child = node;

                while (child != null && child.childNodes.length == 1) {
                  child = child.childNodes[0];

                  if (child.nodeName == name) {
                    return true;
                  }
                }
              }

              return false;
            };

            function isEqualOrPrefixed(str, value) {
              if (str != null && value != null) {
                if (str == value) {
                  return true;
                } else if (str.length > value.length + 1) {
                  return str.substring(str.length - value.length - 1, str.length) == "-" + value;
                }
              }

              return false;
            };

            if (css != null) {
              setSelected(fontStyleItems[0], css.fontWeight == "bold" ||
                css.fontWeight > 400 || hasParentOrOnlyChild("B") ||
                hasParentOrOnlyChild("STRONG"));
              setSelected(fontStyleItems[1], css.fontStyle == "italic" ||
                hasParentOrOnlyChild("I") || hasParentOrOnlyChild("EM"));
              setSelected(fontStyleItems[2], hasParentOrOnlyChild("U"));
              setSelected(sup, hasParentOrOnlyChild("SUP"));
              setSelected(sub, hasParentOrOnlyChild("SUB"));

              if (!graph.cellEditor.isTableSelected()) {
                var align = graph.cellEditor.align || mxUtils.getValue(ss.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER);

                if (isEqualOrPrefixed(css.textAlign, "justify")) {
                  setSelected(full, isEqualOrPrefixed(css.textAlign, "justify"));
                  setSelected(left, false);
                  setSelected(center, false);
                  setSelected(right, false);
                } else {
                  setSelected(full, false);
                  setSelected(left, align == mxConstants.ALIGN_LEFT);
                  setSelected(center, align == mxConstants.ALIGN_CENTER);
                  setSelected(right, align == mxConstants.ALIGN_RIGHT);
                }
              } else {
                setSelected(full, isEqualOrPrefixed(css.textAlign, "justify"));
                setSelected(left, isEqualOrPrefixed(css.textAlign, "left"));
                setSelected(center, isEqualOrPrefixed(css.textAlign, "center"));
                setSelected(right, isEqualOrPrefixed(css.textAlign, "right"));
              }

              currentTable = graph.getParentByName(node, "TABLE", graph.cellEditor.textarea);
              tableRow = (currentTable == null) ? null : graph.getParentByName(node, "TR", currentTable);
              tableCell = (currentTable == null) ? null : graph.getParentByNames(node, ["TD", "TH"], currentTable);
              tableWrapper.style.display = (currentTable != null) ? "" : "none";

              if (document.activeElement != input) {
                if (node.nodeName == "FONT" && node.getAttribute("size") == "4" &&
                  pendingFontSize != null) {
                  node.removeAttribute("size");
                  node.style.fontSize = pendingFontSize + " pt";
                  pendingFontSize = null;
                } else {
                  input.value = (isNaN(fontSize)) ? "" : fontSize + " pt";
                }

                var lh = parseFloat(lineHeight);

                if (!isNaN(lh)) {
                  lineHeightInput.value = Math.round(lh * 100) + " %";
                } else {
                  lineHeightInput.value = "100 %";
                }
              }

              // Converts rgb(r,g,b) values
              var color = css.color.replace(
                /\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
                function($0, $1, $2, $3) {
                  return "#" + ("0" + Number($1).toString(16)).substr(-2) + ("0" + Number($2).toString(16)).substr(-2) + ("0" + Number($3).toString(16)).substr(-2);
                });
              var color2 = css.backgroundColor.replace(
                /\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
                function($0, $1, $2, $3) {
                  return "#" + ("0" + Number($1).toString(16)).substr(-2) + ("0" + Number($2).toString(16)).substr(-2) + ("0" + Number($3).toString(16)).substr(-2);
                });

              // Updates the color picker for the current font
              if (fontColorApply != null) {
                if (color.charAt(0) == "#") {
                  currentFontColor = color;
                } else {
                  currentFontColor = "#000000";
                }

                fontColorApply(currentFontColor, true);
              }

              if (bgColorApply != null) {
                if (color2.charAt(0) == "#") {
                  currentBgColor = color2;
                } else {
                  currentBgColor = null;
                }

                bgColorApply(currentBgColor, true);
              }

              // Workaround for firstChild is null or not an object
              // in the log which seems to be IE8- only / 29.01.15
              if (fontMenu.firstChild != null) {
                // Strips leading and trailing quotes
                var ff = css.fontFamily;

                if (ff.charAt(0) == "'") {
                  ff = ff.substring(1);
                }

                if (ff.charAt(ff.length - 1) == "'") {
                  ff = ff.substring(0, ff.length - 1);
                }

                if (ff.charAt(0) == "\"") {
                  ff = ff.substring(1);
                }

                if (ff.charAt(ff.length - 1) == "\"") {
                  ff = ff.substring(0, ff.length - 1);
                }

                fontMenu.firstChild.nodeValue = ff;
              }
            }
          }

          updating = false;
        }, 0);
      }
    };

    if (mxClient.IS_FF || mxClient.IS_EDGE || mxClient.IS_IE || mxClient.IS_IE11) {
      mxEvent.addListener(graph.cellEditor.textarea, "DOMSubtreeModified", updateCssHandler);
    }

    mxEvent.addListener(graph.cellEditor.textarea, "input", updateCssHandler);
    mxEvent.addListener(graph.cellEditor.textarea, "touchend", updateCssHandler);
    mxEvent.addListener(graph.cellEditor.textarea, "mouseup", updateCssHandler);
    mxEvent.addListener(graph.cellEditor.textarea, "keyup", updateCssHandler);
    this.listeners.push({
      destroy: function() {
        // No need to remove listener since textarea is destroyed after edit
      }
    });
    updateCssHandler();
  }

  return container;
};

CustomFileFormatPanel = function(format, editorUi, container, fileType = "", fileTypeAccept = "*") {
  CustomBaseFormatPanel.call(this, format, editorUi, container);
  this.fileType = fileType;
  this.fileTypeAccept = fileTypeAccept;
  this.init();
};

CustomFileFormatPanel.prototype.init = function() {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  const fileType = this.fileType;
  const fileTypeAccept = this.fileTypeAccept;
  var ss = this.format.getSelectionState();
  const _self = this;

  const fileSelected = ss.style.fileSelected ? ss.style.fileSelected : "";
  const fileContainer = document.createElement("div");
  fileContainer.innerHTML = `
  <div class="format-image-wrapper">
    <div class="format-image-header">${_.capitalize(fileType)} Editor</div>  
    <hr/>
    <div class="format-image-subheader">Select a ${_.capitalize(fileType)} file</div>
    <div class="row no-gutters format-image-content-wrapper" id="format-image-content-wrapper">
       
    </div>
  </div>
  `;
  filesListing[fileType] && filesListing[fileType].forEach(function(file) {
    const divImage = document.createElement("div");
    divImage.className = "col-4 format-image-content";
    divImage.innerHTML = `
          <div style="background-image: url(${fileType === "image" ? file.url : `/content/images/editor/icons/${fileType}.PNG`})" class="format-file-selector ${fileSelected && fileSelected === file.fileName ? "active" : ""}"
          data-url="${file.url}"
          data-name="${file.fileName}"
          >
                <!--<img class="image-format-img" src="${file.url}"/>-->
                <span class="file-close format-close" data-name="${file.fileName}">x</span>
          </div>
    `;
    $(fileContainer.querySelector("#format-image-content-wrapper")).append(divImage);
  });
  const divImportImage = document.createElement("div");
  divImportImage.className = "col-4 format-image-content";
  divImportImage.innerHTML = `
          <div id="upload-file">
                <img src="/content/images/editor/icons/import.png"/>
          </div>
    `;
  $(fileContainer.querySelector("#format-image-content-wrapper")).append(divImportImage);

  $(fileContainer.querySelectorAll(".format-close")).click(function(e) {
    console.log(e.target.dataset);
    const fileName = e.target.dataset && e.target.dataset.name ? e.target.dataset.name : "";
    if (fileName) {
      requestDeleteImage(fileName, function(data) {
        const userid = "hannd";
        requestFilesWithType(userid, fileType, function() {
          _self.format.refresh();
        });
        swal("", "delete file success", "success");
      });
    }
  });

  $(fileContainer.querySelectorAll(".format-file-selector")).click(function(e) {
    const fileName = e.target.dataset && e.target.dataset.name ? e.target.dataset.name : "";
    const url = e.target.dataset && e.target.dataset.url ? e.target.dataset.url : "";
    const currentWith = graph.getSelectionCell() && graph.getSelectionCell().getGeometry() && graph.getSelectionCell().getGeometry().width ? graph.getSelectionCell().getGeometry().width : 0;
    if (fileName && url) {
      if (fileType === "image") {
        var img = new Image();
        var selectionState = graph.cellEditor.saveSelection();
        img.onload = function() {
          // fn(name, url, img.width, img.height);
          const newValue = url;
          let w = img.width;
          let h = img.height;
          if (currentWith) {
            w = currentWith;
            h = (img.height / img.width) * currentWith;
          }
          const ratio = h / w;
          if (graph.cellEditor.isContentEditing()) {
            graph.cellEditor.restoreSelection(selectionState);
            graph.insertImage(newValue, w, h);
          } else {
            var cells = graph.getSelectionCells();

            if (newValue != null && (newValue.length > 0 || cells.length > 0)) {
              var select = null;

              graph.getModel().beginUpdate();
              try {
                graph.setCellStyles(mxConstants.STYLE_IMAGE, (newValue.length > 0) ? newValue : null, cells);
                graph.setCellStyles("fileSelected", (fileName.length > 0) ? fileName : null, cells);

                // Sets shape only if not already shape with image (label or image)
                var state = graph.view.getState(cells[0]);
                var style = (state != null) ? state.style : graph.getCellStyle(cells[0]);

                if (graph.getSelectionCount() == 1) {
                  if (w != null && h != null) {
                    var cell = cells[0];
                    var geo = graph.getModel().getGeometry(cell);

                    if (geo != null) {
                      geo = geo.clone();
                      geo.width = w;
                      geo.height = h;
                      graph.getModel().setGeometry(cell, geo);
                    }
                  }
                }
              } finally {
                graph.getModel().endUpdate();
              }

              if (select != null) {
                graph.setSelectionCells(select);
                graph.scrollCellToVisible(select[0]);
              }
            }
          }
        };
        img.onerror = function() {
          fn(null);
          mxUtils.alert(mxResources.get("fileNotFound"));
        };

        img.src = url;
      } else {
        var select = null;
        var cells = graph.getSelectionCells();
        graph.getModel().beginUpdate();
        try {
          graph.setCellStyles("fileUrl", (url.length > 0) ? url : null, cells);
          graph.setCellStyles("fileSelected", (fileName.length > 0) ? fileName : null, cells);
        } finally {
          graph.getModel().endUpdate();
        }

        if (select != null) {
          graph.setSelectionCells(select);
          graph.scrollCellToVisible(select[0]);
        }
      }
    }
  });


  $(fileContainer.querySelector("#upload-file")).click(function() {
    $("#myModal").html(fileUpload(fileType, fileType.toUpperCase(), fileTypeAccept));
    $("#fileButton").change(function(e) {
      // let imagesFile = e.target.files[i];
    });
    $("#uploadFile").click(function(e) {
      const formData = new FormData();
      formData.append("file", $("#fileInput")[0].files[0]);
      const userid = "hannd";
      requestUploadFile(userid, formData, function(data) {
        requestFilesWithType(userid, fileType, function() {
          // $('.format-image-wrapper').empty();
          _self.format.refresh();
        });
        swal("", `Upload file ${fileType.toUpperCase()} success`, "success");
        $("#myModal").modal("hide");
      });
      // let imagesFile = e.target.files[i];
    });
    $("#myModal").modal("show");
  });

  this.container.appendChild(fileContainer);
};

CustomFileFormatPanel.prototype.destroy = function() {
};

CustomImageSlideFormatPanel = function(format, editorUi, container, fileType = "", fileTypeAccept = "*") {
  CustomBaseFormatPanel.call(this, format, editorUi, container);
  this.fileType = fileType;
  this.fileTypeAccept = fileTypeAccept;
  this.fileSelected = null;
  this.addedImage = [];
  this.init();
};

CustomImageSlideFormatPanel.prototype.init = function() {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  this.graph = graph;
  const fileType = this.fileType;
  const fileTypeAccept = this.fileTypeAccept;
  var ss = this.format.getSelectionState();
  const _self = this;
  let imageSlide = ss.style.imageSlide ? decodeURIComponent(ss.style.imageSlide) : "";
  imageSlide = imageSlide ? imageSlide.split(",") : [];
  this.addedImage = imageSlide.map(v => {
    return decodeURIComponent(v);
  });

  const imageSlideContainer = document.createElement("div");
  imageSlideContainer.innerHTML = `
  <div class="format-image-wrapper format-image-slide-wrapper">
    <div class="format-image-header">Image Slide Editor</div>  
    <hr/>
    <div class="format-image-subheader">Select a list file</div>
    <div class="row no-gutters format-image-content-wrapper" id="format-image-content-wrapper">
       
    </div>
    <div class="format-image-addBtn">
        <button class="btn btn-common btn-add-image" id="btn-add-image">Add</button>
    </div>
    <div class="format-image-subheader">Added image</div>
    <div class="row no-gutters format-image-preview-wrapper" id="format-image-added-wrapper">
    </div>
  </div>
  `;
  filesListing[fileType] && filesListing[fileType].forEach(function(file) {
    const divImage = document.createElement("div");
    divImage.className = "col-4 format-image-content";
    divImage.innerHTML = `
          <div style="background-image: url(${fileType === "image" ? file.url : `/content/images/editor/icons/${fileType}.PNG`})" class="format-file-selector"
          data-url="${file.url}"
          data-name="${file.fileName}"
          >
                <!--<img class="image-format-img" src="${file.url}"/>-->
                <span class="file-close format-close" data-name="${file.fileName}">x</span>
          </div>
    `;
    $(imageSlideContainer.querySelector("#format-image-content-wrapper")).append(divImage);
  });
  const divImportImage = document.createElement("div");
  divImportImage.className = "col-4 format-image-content";
  divImportImage.innerHTML = `
          <div id="upload-file">
                <img src="/content/images/editor/icons/import.png"/>
          </div>
    `;
  $(imageSlideContainer.querySelector("#format-image-content-wrapper")).append(divImportImage);


  this.initAddedImage(imageSlideContainer);

  $(imageSlideContainer.querySelector("#btn-add-image")).click(function(e) {
    if (_self.fileSelected) {
      _self.addedImage.push(_self.fileSelected.url);
      const formated = _self.addedImage.map(v => {
        return encodeURIComponent(v);
      });
      customUtils.setCellStyles(_self.graph, { imageSlide: formated.join(",") });
      _self.initAddedImage(imageSlideContainer);
    }
  });

  $(imageSlideContainer.querySelectorAll(".format-close")).click(function(e) {
    const fileName = e.target.dataset && e.target.dataset.name ? e.target.dataset.name : "";
    if (fileName) {
      requestDeleteImage(fileName, function(data) {
        const userid = "hannd";
        requestFilesWithType(userid, fileType, function() {
          _self.init();
        });
        swal("", "delete file success", "success");
      });
    }
  });

  $(imageSlideContainer.querySelectorAll(".format-file-selector")).click(function(e) {
    const fileName = e.target.dataset && e.target.dataset.name ? e.target.dataset.name : "";
    const url = e.target.dataset && e.target.dataset.url ? e.target.dataset.url : "";
    if (fileName && url) {
      const img = new Image();
      $(imageSlideContainer.querySelectorAll(".format-file-selector")).removeClass("active");
      img.onload = function() {
        if (_self.fileSelected && _self.fileSelected.name === fileName) {
          $(e.target).removeClass("active");
          _self.fileSelected = null;
        } else {
          $(e.target).addClass("active");
          _self.fileSelected = {
            name: fileName,
            url
          };
        }
      };
      img.onerror = function() {
      };

      img.src = url;
    }
  });


  $(imageSlideContainer.querySelector("#upload-file")).click(function() {
    $("#myModal").html(fileUpload(fileType, fileType.toUpperCase(), fileTypeAccept));
    $("#fileButton").change(function(e) {
      // let imagesFile = e.target.files[i];
    });
    $("#uploadFile").click(function(e) {
      const formData = new FormData();
      formData.append("file", $("#fileInput")[0].files[0]);
      const userid = "hannd";
      requestUploadFile(userid, formData, function(data) {
        requestFilesWithType(userid, fileType, function() {
          // $('.format-image-wrapper').empty();
          _self.format.refresh();
        });
        swal("", `Upload file ${fileType.toUpperCase()} success`, "success");
        $("#myModal").modal("hide");
      });
      // let imagesFile = e.target.files[i];
    });
    $("#myModal").modal("show");
  });

  this.container.appendChild(imageSlideContainer);
};

CustomImageSlideFormatPanel.prototype.initAddedImage = function(imageSlideContainer) {
  const wrapper = $(imageSlideContainer.querySelector("#format-image-added-wrapper"));
  wrapper.empty();
  const _self = this;

  this.addedImage.map((image, idx) => {
    const previewImg = document.createElement("div");
    previewImg.className = "col-12 d-flex align-items-center pb-1 mb-1";
    previewImg.innerHTML = `
        <img class="format-image-preview-img" src="${image}"/>
         <div class="format-image-preview-remove" data-idx="${idx}">Remove</div>
      `;
    wrapper.append(previewImg);
  });
  $(imageSlideContainer.querySelectorAll(".format-image-preview-remove")).click(function(e) {
    const targetIdx = e.target.dataset.idx;
    _self.addedImage = _self.addedImage.filter((v, idx) => idx.toString() !== targetIdx);
    const formated = _self.addedImage.map(v => {
      return encodeURIComponent(v);
    });
    customUtils.setCellStyles(_self.graph, { imageSlide: formated.join(",") });
    _self.initAddedImage(imageSlideContainer);
  });

  if (this.addedImage.length === 0) {
    const noFile = document.createElement("div");
    noFile.className = "col-12 d-flex align-items-center pb-1 mb-1";
    noFile.innerHTML = `No file added`;
    wrapper.append(noFile);
  }
  wrapper.scrollTop(wrapper.height);

};

CustomImageSlideFormatPanel.prototype.destroy = function() {
};

CustomTextFormatPanel = function(format, editorUi, container, hideHeader = false) {
  CustomBaseFormatPanel.call(this, format, editorUi, container);
  this.init(hideHeader);
};

CustomTextFormatPanel.prototype.init = function(hideHeader = false) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var ss = this.format.getSelectionState();
  const _self = this;

  const fontFamily = ss.style.fontFamily ? ss.style.fontFamily : "-1";
  const fontSize = ss.style.fontSize ? ss.style.fontSize : "12";
  // bold italic underline
  const fontStyle = ss.style.fontSize ? ss.style.fontStyle : "";
  const fontColor = ss.style.fontColor ? ss.style.fontColor : "#ffffff";
  const textContainer = document.createElement("div");
  textContainer.innerHTML = `
  <div class="format-image-wrapper ${hideHeader ? "extend-wrapper" : ""}">
    <div style="display: ${hideHeader ? "none" : "block"}">
      <div class="format-image-header">Text Editor</div>
      <hr/>
      <div class="format-image-subheader">Select a font and adjust its properties</div>
    </div>  
    <div class="format-link-wrapper row no-gutters">
        <div class="select-wrapper">
          <div class="select-box">
            <select class="form-control" id="select-font-family">
            </select>
          </div>
        </div>
        <div class="select-wrapper">
          <div class="input-box">
            <div class="font-size-wrapper">
                <div class="">Font size</div> 
                <input type="text" maxlength="2" class="" value="${fontSize}" id="input-font-size"/>
            </div>
            </div>
        </div>
        <div class="color-wrapper g-margin-left-10">
            <div class="">Font color</div> 
            <div class="format-color-preview" id="format-color-picker">
                <div style="background-color: ${fontColor ? fontColor : "#ffffff"}"></div>
            </div>
        </div>
    </div>
  </div>
  `;

  //handle font family
  const selectFontFamily = $(textContainer.querySelector("#select-font-family"));
  selectFontFamily.empty();
  selectFontFamily.append($("<option></option>").attr("value", "Helvetica").text("Select font"));
  CONSTANT.DEFAULT_FONTS.map(v => {
    const option = $("<option></option>");
    option.attr("value", v).text(v);
    if (v === fontFamily) {
      option.attr("selected", true);
    }
    selectFontFamily.append(option);
  });
  selectFontFamily.change(function(e) {
    customUtils.setCellStyles(graph, { fontFamily: e.target.value !== "-1" ? e.target.value : null });
  });

  //handle font family
  $(textContainer.querySelector("#input-font-size")).change(function(e) {
    if (e.target.value && (!new RegExp(CONSTANT.PATTERN_NUMBER).test(e.target.value))) {
      _self.format.refresh();
      return false;
    }
    customUtils.setCellStyles(graph, { fontSize: e.target.value ? e.target.value : "12" });
  });

  let i = 0;
  $(textContainer.querySelector("#format-color-picker")).click(function(e) {
    const pickr = new Pickr({
      el: "#format-color-picker",
      useAsButton: true,
      default: fontColor ? fontColor : "#ffffff",

      components: {
        preview: true,
        opacity: true,
        hue: true,

        interaction: {
          hex: true,
          rgba: true,
          hsla: false,
          hsva: false,
          cmyk: false,
          input: true,
          clear: false,
          save: true
        }
      }
    });
    pickr.on("save", instance => {
      const pickedColor = instance.toHEXA().toString();
      customUtils.setCellStyles(graph, { fontColor: pickedColor });
      pickr.hide();
    });
    if (i == 0) {
      i++;
      const elt = document.getElementById("format-color-picker");
      elt.click();
    }

    // _self.format.refresh();
  });

  $(textContainer.querySelector("#format-link-open-in-modal")).change(function(e) {
    var select = null;
    var cells = graph.getSelectionCells();
    graph.getModel().beginUpdate();
    try {
      graph.setCellStyles("linkOpenInModal", e.target.checked ? "1" : "0", cells);
    } finally {
      graph.getModel().endUpdate();
    }

    if (select != null) {
      graph.setSelectionCells(select);
      graph.scrollCellToVisible(select[0]);
    }
    _self.format.refresh();
  });
  $(textContainer.querySelector("#format-link-url")).change(function(e) {
    var select = null;
    var cells = graph.getSelectionCells();
    graph.getModel().beginUpdate();
    try {
      graph.setCellStyles("linkUrl", e.target.value ? e.target.value : null, cells);
    } finally {
      graph.getModel().endUpdate();
    }

    if (select != null) {
      graph.setSelectionCells(select);
      graph.scrollCellToVisible(select[0]);
    }
    _self.format.refresh();
  });
  this.container.appendChild(textContainer);
};

CustomTextFormatPanel.prototype.destroy = function() {
};

CustomLinkFormatPanel = function(format, editorUi, container, type, isMedia) {
  CustomBaseFormatPanel.call(this, format, editorUi, container);
  this.type = type;
  this.isMedia = isMedia;
  this.init();
};

CustomLinkFormatPanel.prototype.init = function() {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var ss = this.format.getSelectionState();
  const _self = this;

  const linkUrl = ss.style.linkUrl ? ss.style.linkUrl : "";
  const linkOpenInModal = ss.style.linkOpenInModal ? ss.style.linkOpenInModal : "0";
  const linkContainer = document.createElement("div");
  const label = _.startCase(this.type ? _.toLower(this.type.replace("_", " ")) : "");
  linkContainer.innerHTML = `
  <div class="format-image-wrapper">
    <div class="format-image-header">${label} Editor</div>  
    <hr/>
    <div class="format-image-subheader">Input a valid ${label} URL</div>
    </div>
    <div class="format-link-wrapper row no-gutters">
        <div class="md-form  w-100">
          <input type="text" class="form-control" id="format-link-url" value="${linkUrl}" placeholder="Url">
          <!--<label for="format-link-url" class="${linkUrl.length > 0 ? "hidden" : ""}">Url</label>-->
        </div>
        <div class="form-check w-100 d-flex">
            <div class="custom-select-box mr-2" id="input-link-open-in-modal">
                <span class="${linkOpenInModal == "1" ? "checkmark" : ""}"/>
            </div>
            <label class="form-check-label" for="format-link-open-in-modal">Open link in Popup Modal</label>
        </div>
    </div>
  </div>
  `;
  $(linkContainer.querySelector("#input-link-open-in-modal")).click(function(e) {
    customUtils.setCellStyles(graph, { linkOpenInModal: linkOpenInModal == "1" ? "0" : "1" });
  });
  $(linkContainer.querySelector("#format-link-url")).change(function(e) {
    var select = null;
    var cells = graph.getSelectionCells();
    graph.getModel().beginUpdate();
    try {
      graph.setCellStyles("linkUrl", e.target.value ? e.target.value : null, cells);
    } finally {
      graph.getModel().endUpdate();
    }

    if (select != null) {
      graph.setSelectionCells(select);
      graph.scrollCellToVisible(select[0]);
    }
    _self.format.refresh();
  });
  this.container.appendChild(linkContainer);
  // const expandDiv = document.createElement('div');
  // expandDiv.innerHTML = `
  //   <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
  //       Link with href
  //     </a>
  //   <div class="collapse" id="collapseExample">
  //       Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
  //     </div>
  //   </div>
  // `
  // this.container.appendChild(expandDiv);
  if (!this.isMedia) {
    new CustomTextFormatPanel(this.format, this.editorUi, this.container, true);
  }
  // this.container.appendChild();
};

CustomLinkFormatPanel.prototype.destroy = function() {
};

CustomCardFormatPanel = function(format, editorUi, container) {
  CustomBaseFormatPanel.call(this, format, editorUi, container);
  this.init();
};

CustomCardFormatPanel.prototype.init = function() {
  const ui = this.editorUi;
  const editor = ui.editor;
  const graph = editor.graph;
  const ss = this.format.getSelectionState();
  const _self = this;

  // const allCells = graph.getAllCells(0, 0, 1000000, 1000000);
  // const selectionCells = graph.getSelectionCells();
  // allCells.map(cell => {
  //   let visible = false;
  //   if (selectionCells.find(v => v.id === cell.id)) {
  //     visible = true;
  //   }
  //   graph.getModel().setVisible(cell, visible);
  // });

  const fillColor = ss.style.fillColor ? ss.style.fillColor : "#ffffff";
  const height = ss.height ? ss.height : 0;
  const cardContainer = document.createElement("div");
  cardContainer.innerHTML = `
  <div class="format-image-wrapper">
    <div">
      <div class="format-image-header">Card Editor</div>
      <hr/>
    </div>  
    <div class="format-link-wrapper row no-gutters">
        <div class="color-wrapper g-margin-left-10 g-margin-bottom-10">
            <div class="">Background Color</div> 
            <div class="format-color-preview" id="format-color-picker">
                <div style="background-color: ${fillColor ? fillColor : "#ffffff"}"></div>
            </div>
        </div>
        <div class="select-wrapper g-margin-top-10">
          <div class="input-box">
            <div class="font-size-wrapper">
                <div class="">Height</div> 
                <input type="text" maxlength="4" class="" value="${height}" id="input-height"/>
                <div class="input-unit">%</div>
            </div>
            </div>
        </div>
    </div>
  </div>
  `;

  //handle change height
  $(cardContainer.querySelector("#input-height")).change(function(e) {
    if (e.target.value && (!new RegExp(CONSTANT.PATTERN_NUMBER).test(e.target.value))) {
      _self.format.refresh();
      return false;
    }
    customUtils.updateCellHeight(graph, parseInt(e.target.value), false);
  });

  // const cells = graph.getSelectionCells();
  // var preferred = graph.getPreferredSizeForCell(cells[0]);
  // var current = cells[0].getGeometry();
  // current.width = 200;
  // current.height = preferred.height > height ? 500 : height;

  let i = 0;
  $(cardContainer.querySelector("#format-color-picker")).click(function(e) {
    const pickr = new Pickr({
      el: "#format-color-picker",
      useAsButton: true,
      default: fillColor ? fillColor : "#ffffff",

      components: {
        preview: true,
        opacity: true,
        hue: true,

        interaction: {
          hex: true,
          rgba: true,
          hsla: false,
          hsva: false,
          cmyk: false,
          input: true,
          clear: false,
          save: true
        }
      }
    });
    pickr.on("save", instance => {
      const pickedColor = instance.toHEXA().toString();
      customUtils.setCellStyles(graph, { fillColor: pickedColor });
      pickr.hide();
    });
    if (i == 0) {
      i++;
      const elt = document.getElementById("format-color-picker");
      elt.click();
    }

    // _self.format.refresh();
  });
  this.container.appendChild(cardContainer);
};

CustomCardFormatPanel.prototype.destroy = function() {
  // const graph = this.editorUi.editor.graph;
  // const allCells = graph.getAllCells(0, 0, 1000000, 1000000);

  // allCells.map(cell => {
  //   graph.getModel().beginUpdate();
  //   cell.setVisible(true)
  //   graph.getModel().endUpdate();
  // });

};

CustomRectangleFormatPanel = function(format, editorUi, container) {
  CustomBaseFormatPanel.call(this, format, editorUi, container);
  this.init();
};

CustomRectangleFormatPanel.prototype.init = function() {
  const ui = this.editorUi;
  const editor = ui.editor;
  const graph = editor.graph;
  const ss = this.format.getSelectionState();
  const _self = this;

  const fillColor = ss.style.fillColor ? ss.style.fillColor : "#ffffff";
  const opacity = ss.style.opacity ? ss.style.opacity : "100";
  const rounded = ss.style.rounded ? ss.style.rounded : 0;
  // border type
  let borderType = ss.style.borderType ? ss.style.borderType : "";
  let strokeColor = ss.style.strokeColor ? ss.style.strokeColor : "none";
  console.log(ss.style.strokeColor);
  console.log(strokeColor);
  const dashed = ss.style.dashed ? ss.style.dashed : "";
  const dashPattern = ss.style.dashPattern ? ss.style.dashPattern : "";
  if (strokeColor === "none") {
    borderType = "none";
  } else if (!dashed) {
    borderType = "solid";
  } else if (!dashPattern) {
    borderType = "dash";
  } else if (dashPattern) {
    borderType = "dotted";
  }

  const height = ss.height ? ss.height : 0;
  const width = ss.width ? ss.width : 0;
  const cardContainer = document.createElement("div");
  cardContainer.innerHTML = `
  <div class="format-image-wrapper">
    <div">
      <div class="format-image-header">Rectangle Editor</div>
      <hr/>
    </div>  
    <div class="format-link-wrapper row no-gutters">
        <div class="color-wrapper g-margin-left-10 g-margin-bottom-10">
            <div class="">Background Color</div> 
            <div class="format-color-preview" id="format-color-picker">
                <div style="background-color: ${fillColor ? fillColor : "#ffffff"}"></div>
            </div>
        </div>
        <div class="select-wrapper g-margin-top-10">
          <div class="input-box">
            <div class="font-size-wrapper">
                <div class="input-title">Height</div> 
                <input type="text" maxlength="4" class="" value="${height}" id="input-height"/>
                <div class="input-unit">px</div>
            </div>
          </div>
          <div class="input-box">
            <div class="font-size-wrapper">
                <div class="input-title">Width</div> 
                <input type="text" maxlength="4" class="" value="${width}" id="input-width"/>
                <div class="input-unit">px</div>
            </div>
          </div>
          <div class="input-box">
            <div class="font-size-wrapper">
                <div class="input-title">Opacity</div> 
                <input type="text" maxlength="2" class="" value="${opacity}" id="input-opacity"/>
                <div class="input-unit">%</div>
            </div>
          </div>
          <div class="input-box">
            <div class="font-size-wrapper">
                <div class="input-title">Rounded</div>
                <div class="custom-select-box" id="input-rounded">
                    <span class="${rounded ? "checkmark" : ""}"/>
                </div>
            </div>
          </div>
          <div class="input-box">
            <div class="">Border</div>
            <div class="input-custom-select-wrapper">
                <div class="select-box">
                    <div class="input-select-value" id="input-select-value">${borderType ? _.startCase(borderType) : "Select"}</div>
                </div>
                <div class="input-select-content" id="input-select-content" style="display: none">
                    <div class="input-select-item ${borderType === "none" ? "active" : ""}" data-type="none">No border</div>
                    <div class="input-select-item ${borderType === "solid" ? "active" : ""}" data-type="solid">Solid</div>
                    <div class="input-select-item ${borderType === "dash" ? "active" : ""}" data-type="dash">Dash</div>
                    <div class="input-select-item ${borderType === "dotted" ? "active" : ""}" data-type="dotted">Dotted</div>
                </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  `;

  //handle change height
  $(cardContainer.querySelector("#input-height")).change(function(e) {
    if (e.target.value && (!new RegExp(CONSTANT.PATTERN_NUMBER).test(e.target.value))) {
      _self.format.refresh();
      return false;
    }
    customUtils.updateCellHeight(graph, parseInt(e.target.value), false);
  });

  //handle change width
  $(cardContainer.querySelector("#input-width")).change(function(e) {
    if (e.target.value && (!new RegExp(CONSTANT.PATTERN_NUMBER).test(e.target.value))) {
      _self.format.refresh();
      return false;
    }
    customUtils.updateCellWith(graph, parseInt(e.target.value), false);
  });

  //handle change opacity
  $(cardContainer.querySelector("#input-opacity")).change(function(e) {
    if (e.target.value && (!new RegExp(CONSTANT.PATTERN_NUMBER).test(e.target.value))) {
      _self.format.refresh();
      return false;
    }
    customUtils.setCellStyles(graph, { opacity: e.target.value });
  });

  //handle change rounded
  $(cardContainer.querySelector("#input-rounded")).click(function(e) {
    customUtils.setCellStyles(graph, { rounded: rounded ? 0 : 1 });
  });

  //handle change border
  $(cardContainer.querySelector("#input-select-value")).click(function() {
    $(cardContainer.querySelector("#input-select-content")).toggle();
  });
  window.addEventListener("click", this.clickHandle, false);
  $(cardContainer.querySelectorAll(".input-select-item")).click(function(e) {
    $(cardContainer.querySelector("#input-select-content")).hide();
    const type = e.target.dataset.type;
    let borderValue = {
      borderType: type
    };
    if (type === "none") {
      borderValue["dashed"] = null;
      borderValue["dashPattern"] = null;
      borderValue["strokeColor"] = "none";
    } else if (type === "solid") {
      borderValue["dashed"] = null;
      borderValue["dashPattern"] = null;
      borderValue["strokeColor"] = strokeColor !== "none" ? strokeColor : "#000000";
    } else if (type === "dash") {
      borderValue["dashed"] = 1;
      borderValue["dashPattern"] = null;
      borderValue["strokeColor"] = strokeColor !== "none" ? strokeColor : "#000000";
    } else if (type === "dotted") {
      borderValue["dashed"] = 1;
      borderValue["dashPattern"] = "1 4";
      borderValue["strokeColor"] = strokeColor !== "none" ? strokeColor : "#000000";
    }
    customUtils.setCellStyles(graph, borderValue);
    _self.format.refresh();
  });


  let i = 0;
  $(cardContainer.querySelector("#format-color-picker")).click(function(e) {
    const pickr = new Pickr({
      el: "#format-color-picker",
      useAsButton: true,
      default: fillColor ? fillColor : "#ffffff",

      components: {
        preview: true,
        opacity: true,
        hue: true,

        interaction: {
          hex: true,
          rgba: true,
          hsla: false,
          hsva: false,
          cmyk: false,
          input: true,
          clear: false,
          save: true
        }
      }
    });
    pickr.on("save", instance => {
      const pickedColor = instance.toHEXA().toString();
      customUtils.setCellStyles(graph, { fillColor: pickedColor });
      pickr.hide();
    });
    if (i == 0) {
      i++;
      const elt = document.getElementById("format-color-picker");
      elt.click();
    }

    // _self.format.refresh();
  });
  this.container.appendChild(cardContainer);
};

CustomRectangleFormatPanel.prototype.clickHandle = function(e) {
  const inputValue = document.getElementById("input-select-value");
  const inputContent = document.getElementById("input-select-content");
  if (
    (inputValue && !inputValue.contains(e.target))
    && (inputContent && !inputContent.contains(e.target) && inputContent.style.display !== "none")) {
    $("#input-select-content").hide();
  }
};
CustomRectangleFormatPanel.prototype.destroy = function() {
  window.removeEventListener("click", this.clickHandle, false);
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel = function(format, editorUi, container) {
  BaseFormatPanel.call(this, format, editorUi, container);
  this.init();
};

mxUtils.extend(StyleFormatPanel, BaseFormatPanel);

/**
 *
 */
StyleFormatPanel.prototype.defaultStrokeColor = "black";

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.init = function() {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var ss = this.format.getSelectionState();

  if (!ss.containsLabel) {
    if (ss.containsImage && ss.vertices.length == 1 && ss.style.shape == "image" &&
      ss.style.image != null && ss.style.image.substring(0, 19) == "data:image/svg+xml;") {
      this.container.appendChild(this.addSvgStyles(this.createPanel()));
    }

    if (!ss.containsImage || ss.style.shape == "image") {
      this.container.appendChild(this.addFill(this.createPanel()));
    }

    this.container.appendChild(this.addStroke(this.createPanel()));
    this.container.appendChild(this.addLineJumps(this.createPanel()));
    var opacityPanel = this.createRelativeOption(mxResources.get("opacity"), mxConstants.STYLE_OPACITY, 41);
    opacityPanel.style.paddingTop = "8px";
    opacityPanel.style.paddingBottom = "8px";
    this.container.appendChild(opacityPanel);
    this.container.appendChild(this.addEffects(this.createPanel()));
  }

  var opsPanel = this.addEditOps(this.createPanel());

  if (opsPanel.firstChild != null) {
    mxUtils.br(opsPanel);
  }

  this.container.appendChild(this.addStyleOps(opsPanel));

  this.container.appendChild(this.addModalOps());
};

/**
 * Use browser for parsing CSS.
 */
StyleFormatPanel.prototype.getCssRules = function(css) {
  var doc = document.implementation.createHTMLDocument("");
  var styleElement = document.createElement("style");

  mxUtils.setTextContent(styleElement, css);
  doc.body.appendChild(styleElement);

  return styleElement.sheet.cssRules;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addSvgStyles = function(container) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var ss = this.format.getSelectionState();
  container.style.paddingTop = "6px";
  container.style.paddingBottom = "6px";
  container.style.fontWeight = "bold";
  container.style.display = "none";

  try {
    var exp = ss.style.editableCssRules;

    if (exp != null) {
      var regex = new RegExp(exp);

      var data = ss.style.image.substring(ss.style.image.indexOf(",") + 1);
      var xml = (window.atob) ? atob(data) : Base64.decode(data, true);
      var svg = mxUtils.parseXml(xml);

      if (svg != null) {
        var styles = svg.getElementsByTagName("style");

        for (var i = 0; i < styles.length; i++) {
          var rules = this.getCssRules(mxUtils.getTextContent(styles[i]));

          for (var j = 0; j < rules.length; j++) {
            this.addSvgRule(container, rules[j], svg, styles[i], rules, j, regex);
          }
        }
      }
    }
  } catch (e) {
    // ignore
  }

  return container;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addSvgRule = function(container, rule, svg, styleElem, rules, ruleIndex, regex) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;

  if (regex.test(rule.selectorText)) {
    function rgb2hex(rgb) {
      rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

      return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : "";
    };

    var addStyleRule = mxUtils.bind(this, function(rule, key, label) {
      if (rule.style[key] != "") {
        var option = this.createColorOption(label + " " + rule.selectorText, function() {
            return rgb2hex(rule.style[key]);
          }, function(color) {
            rules[ruleIndex].style[key] = color;
            var cssTxt = "";

            for (var i = 0; i < rules.length; i++) {
              cssTxt += rules[i].cssText + " ";
            }

            styleElem.textContent = cssTxt;
            var xml = mxUtils.getXml(svg.documentElement);

            graph.setCellStyles(mxConstants.STYLE_IMAGE, "data:image/svg+xml," +
              ((window.btoa) ? btoa(xml) : Base64.encode(xml, true)),
              graph.getSelectionCells());
          }, "#ffffff",
          {
            install: function(apply) {
              // ignore
            },
            destroy: function() {
              // ignore
            }
          });

        container.appendChild(option);

        // Shows container if rules are added
        container.style.display = "";
      }
    });

    addStyleRule(rule, "fill", mxResources.get("fill"));
    addStyleRule(rule, "stroke", mxResources.get("line"));
  }
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addEditOps = function(div) {
  var ss = this.format.getSelectionState();
  var btn = null;

  if (this.editorUi.editor.graph.getSelectionCount() == 1) {
    btn = mxUtils.button(mxResources.get("editStyle"), mxUtils.bind(this, function(evt) {
      this.editorUi.actions.get("editStyle").funct();
    }));

    btn.setAttribute("title", mxResources.get("editStyle") + " (" + this.editorUi.actions.get("editStyle").shortcut + ")");
    btn.style.width = "202px";
    btn.style.marginBottom = "2px";

    div.appendChild(btn);
  }

  if (ss.image) {
    var btn2 = mxUtils.button(mxResources.get("editImage"), mxUtils.bind(this, function(evt) {
      this.editorUi.actions.get("image").funct();
    }));

    btn2.setAttribute("title", mxResources.get("editImage"));
    btn2.style.marginBottom = "2px";

    if (btn == null) {
      btn2.style.width = "202px";
    } else {
      btn.style.width = "100px";
      btn2.style.width = "100px";
      btn2.style.marginLeft = "2px";
    }

    div.appendChild(btn2);
  }

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addFill = function(container) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var ss = this.format.getSelectionState();
  container.style.paddingTop = "6px";
  container.style.paddingBottom = "6px";

  // Adds gradient direction option
  var gradientSelect = document.createElement("select");
  gradientSelect.style.position = "absolute";
  gradientSelect.style.marginTop = "-2px";
  gradientSelect.style.right = (mxClient.IS_QUIRKS) ? "52px" : "72px";
  gradientSelect.style.width = "70px";

  // Stops events from bubbling to color option event handler
  mxEvent.addListener(gradientSelect, "click", function(evt) {
    mxEvent.consume(evt);
  });

  var gradientPanel = this.createCellColorOption(mxResources.get("gradient"), mxConstants.STYLE_GRADIENTCOLOR, "#ffffff", function(color) {
    if (color == null || color == mxConstants.NONE) {
      gradientSelect.style.display = "none";
    } else {
      gradientSelect.style.display = "";
    }
  });

  var fillKey = (ss.style.shape == "image") ? mxConstants.STYLE_IMAGE_BACKGROUND : mxConstants.STYLE_FILLCOLOR;
  var label = (ss.style.shape == "image") ? mxResources.get("background") : mxResources.get("fill");

  var fillPanel = this.createCellColorOption(label, fillKey, "#ffffff");
  fillPanel.style.fontWeight = "bold";

  var tmpColor = mxUtils.getValue(ss.style, fillKey, null);
  gradientPanel.style.display = (tmpColor != null && tmpColor != mxConstants.NONE &&
    ss.fill && ss.style.shape != "image") ? "" : "none";

  var directions = [mxConstants.DIRECTION_NORTH, mxConstants.DIRECTION_EAST,
    mxConstants.DIRECTION_SOUTH, mxConstants.DIRECTION_WEST];

  for (var i = 0; i < directions.length; i++) {
    var gradientOption = document.createElement("option");
    gradientOption.setAttribute("value", directions[i]);
    mxUtils.write(gradientOption, mxResources.get(directions[i]));
    gradientSelect.appendChild(gradientOption);
  }

  gradientPanel.appendChild(gradientSelect);

  var listener = mxUtils.bind(this, function() {
    ss = this.format.getSelectionState();
    var value = mxUtils.getValue(ss.style, mxConstants.STYLE_GRADIENT_DIRECTION, mxConstants.DIRECTION_SOUTH);

    // Handles empty string which is not allowed as a value
    if (value == "") {
      value = mxConstants.DIRECTION_SOUTH;
    }

    gradientSelect.value = value;
    container.style.display = (ss.fill) ? "" : "none";

    var fillColor = mxUtils.getValue(ss.style, mxConstants.STYLE_FILLCOLOR, null);

    if (!ss.fill || ss.containsImage || fillColor == null || fillColor == mxConstants.NONE || ss.style.shape == "filledEdge") {
      gradientPanel.style.display = "none";
    } else {
      gradientPanel.style.display = "";
    }
  });

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function() {
      graph.getModel().removeListener(listener);
    }
  });
  listener();

  mxEvent.addListener(gradientSelect, "change", function(evt) {
    graph.setCellStyles(mxConstants.STYLE_GRADIENT_DIRECTION, gradientSelect.value, graph.getSelectionCells());
    mxEvent.consume(evt);
  });

  container.appendChild(fillPanel);
  // container.appendChild(gradientPanel);

  // Adds custom colors
  var custom = this.getCustomColors();

  for (var i = 0; i < custom.length; i++) {
    container.appendChild(this.createCellColorOption(custom[i].title, custom[i].key, custom[i].defaultValue));
  }

  return container;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.getCustomColors = function() {
  var ss = this.format.getSelectionState();
  var result = [];

  if (ss.style.shape == "swimlane") {
    result.push({ title: mxResources.get("laneColor"), key: "swimlaneFillColor", defaultValue: "#ffffff" });
  }

  return result;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addStroke = function(container) {
  var ui = this.editorUi;
  var graph = ui.editor.graph;
  var ss = this.format.getSelectionState();

  container.style.paddingTop = "4px";
  container.style.paddingBottom = "4px";
  container.style.whiteSpace = "normal";

  var colorPanel = document.createElement("div");
  colorPanel.style.fontWeight = "bold";

  // Adds gradient direction option
  var styleSelect = document.createElement("select");
  styleSelect.style.position = "absolute";
  styleSelect.style.marginTop = "-2px";
  styleSelect.style.right = "72px";
  styleSelect.style.width = "80px";

  var styles = ["sharp", "rounded", "curved"];

  for (var i = 0; i < styles.length; i++) {
    var styleOption = document.createElement("option");
    styleOption.setAttribute("value", styles[i]);
    mxUtils.write(styleOption, mxResources.get(styles[i]));
    styleSelect.appendChild(styleOption);
  }

  mxEvent.addListener(styleSelect, "change", function(evt) {
    graph.getModel().beginUpdate();
    try {
      var keys = [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED];
      // Default for rounded is 1
      var values = ["0", null];

      if (styleSelect.value == "rounded") {
        values = ["1", null];
      } else if (styleSelect.value == "curved") {
        values = [null, "1"];
      }

      for (var i = 0; i < keys.length; i++) {
        graph.setCellStyles(keys[i], values[i], graph.getSelectionCells());
      }

      ui.fireEvent(new mxEventObject("styleChanged", "keys", keys,
        "values", values, "cells", graph.getSelectionCells()));
    } finally {
      graph.getModel().endUpdate();
    }

    mxEvent.consume(evt);
  });

  // Stops events from bubbling to color option event handler
  mxEvent.addListener(styleSelect, "click", function(evt) {
    mxEvent.consume(evt);
  });

  var strokeKey = (ss.style.shape == "image") ? mxConstants.STYLE_IMAGE_BORDER : mxConstants.STYLE_STROKECOLOR;
  var label = (ss.style.shape == "image") ? mxResources.get("border") : mxResources.get("line");

  var lineColor = this.createCellColorOption(label, strokeKey, "#000000");
  lineColor.appendChild(styleSelect);
  colorPanel.appendChild(lineColor);

  // Used if only edges selected
  var stylePanel = colorPanel.cloneNode(false);
  stylePanel.style.fontWeight = "normal";
  stylePanel.style.whiteSpace = "nowrap";
  stylePanel.style.position = "relative";
  stylePanel.style.paddingLeft = "16px";
  stylePanel.style.marginBottom = "2px";
  stylePanel.style.marginTop = "2px";
  stylePanel.className = "geToolbarContainer";

  var addItem = mxUtils.bind(this, function(menu, width, cssName, keys, values) {
    var item = this.editorUi.menus.styleChange(menu, "", keys, values, "geIcon", null);

    var pat = document.createElement("div");
    pat.style.width = width + "px";
    pat.style.height = "1px";
    pat.style.borderBottom = "1px " + cssName + " " + this.defaultStrokeColor;
    pat.style.paddingTop = "6px";

    item.firstChild.firstChild.style.padding = "0px 4px 0px 4px";
    item.firstChild.firstChild.style.width = width + "px";
    item.firstChild.firstChild.appendChild(pat);

    return item;
  });

  var pattern = this.editorUi.toolbar.addMenuFunctionInContainer(stylePanel, "geSprite-orthogonal", mxResources.get("pattern"), false, mxUtils.bind(this, function(menu) {
    addItem(menu, 75, "solid", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], [null, null]).setAttribute("title", mxResources.get("solid"));
    addItem(menu, 75, "dashed", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", null]).setAttribute("title", mxResources.get("dashed"));
    addItem(menu, 75, "dotted", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", "1 1"]).setAttribute("title", mxResources.get("dotted") + " (1)");
    addItem(menu, 75, "dotted", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", "1 2"]).setAttribute("title", mxResources.get("dotted") + " (2)");
    addItem(menu, 75, "dotted", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", "1 4"]).setAttribute("title", mxResources.get("dotted") + " (3)");
  }));

  // Used for mixed selection (vertices and edges)
  var altStylePanel = stylePanel.cloneNode(false);

  var edgeShape = this.editorUi.toolbar.addMenuFunctionInContainer(altStylePanel, "geSprite-connection", mxResources.get("connection"), false, mxUtils.bind(this, function(menu) {
    this.editorUi.menus.styleChange(menu, "", [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, "width"], [null, null, null, null], "geIcon geSprite geSprite-connection", null, true).setAttribute("title", mxResources.get("line"));
    this.editorUi.menus.styleChange(menu, "", [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, "width"], ["link", null, null, null], "geIcon geSprite geSprite-linkedge", null, true).setAttribute("title", mxResources.get("link"));
    this.editorUi.menus.styleChange(menu, "", [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, "width"], ["flexArrow", null, null, null], "geIcon geSprite geSprite-arrow", null, true).setAttribute("title", mxResources.get("arrow"));
    this.editorUi.menus.styleChange(menu, "", [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, "width"], ["arrow", null, null, null], "geIcon geSprite geSprite-simplearrow", null, true).setAttribute("title", mxResources.get("simpleArrow"));
  }));

  var altPattern = this.editorUi.toolbar.addMenuFunctionInContainer(altStylePanel, "geSprite-orthogonal", mxResources.get("pattern"), false, mxUtils.bind(this, function(menu) {
    addItem(menu, 33, "solid", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], [null, null]).setAttribute("title", mxResources.get("solid"));
    addItem(menu, 33, "dashed", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", null]).setAttribute("title", mxResources.get("dashed"));
    addItem(menu, 33, "dotted", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", "1 1"]).setAttribute("title", mxResources.get("dotted") + " (1)");
    addItem(menu, 33, "dotted", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", "1 2"]).setAttribute("title", mxResources.get("dotted") + " (2)");
    addItem(menu, 33, "dotted", [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ["1", "1 4"]).setAttribute("title", mxResources.get("dotted") + " (3)");
  }));

  var stylePanel2 = stylePanel.cloneNode(false);

  // Stroke width
  var input = document.createElement("input");
  input.style.textAlign = "right";
  input.style.marginTop = "2px";
  input.style.width = "41px";
  input.setAttribute("title", mxResources.get("linewidth"));

  stylePanel.appendChild(input);

  var altInput = input.cloneNode(true);
  altStylePanel.appendChild(altInput);

  function update(evt) {
    // Maximum stroke width is 999
    var value = parseInt(input.value);
    value = Math.min(999, Math.max(1, (isNaN(value)) ? 1 : value));

    if (value != mxUtils.getValue(ss.style, mxConstants.STYLE_STROKEWIDTH, 1)) {
      graph.setCellStyles(mxConstants.STYLE_STROKEWIDTH, value, graph.getSelectionCells());
      ui.fireEvent(new mxEventObject("styleChanged", "keys", [mxConstants.STYLE_STROKEWIDTH],
        "values", [value], "cells", graph.getSelectionCells()));
    }

    input.value = value + " pt";
    mxEvent.consume(evt);
  };

  function altUpdate(evt) {
    // Maximum stroke width is 999
    var value = parseInt(altInput.value);
    value = Math.min(999, Math.max(1, (isNaN(value)) ? 1 : value));

    if (value != mxUtils.getValue(ss.style, mxConstants.STYLE_STROKEWIDTH, 1)) {
      graph.setCellStyles(mxConstants.STYLE_STROKEWIDTH, value, graph.getSelectionCells());
      ui.fireEvent(new mxEventObject("styleChanged", "keys", [mxConstants.STYLE_STROKEWIDTH],
        "values", [value], "cells", graph.getSelectionCells()));
    }

    altInput.value = value + " pt";
    mxEvent.consume(evt);
  };

  var stepper = this.createStepper(input, update, 1, 9);
  stepper.style.display = input.style.display;
  stepper.style.marginTop = "2px";
  stylePanel.appendChild(stepper);

  var altStepper = this.createStepper(altInput, altUpdate, 1, 9);
  altStepper.style.display = altInput.style.display;
  altStepper.style.marginTop = "2px";
  altStylePanel.appendChild(altStepper);

  if (!mxClient.IS_QUIRKS) {
    input.style.position = "absolute";
    input.style.right = "32px";
    input.style.height = "15px";
    stepper.style.right = "20px";

    altInput.style.position = "absolute";
    altInput.style.right = "32px";
    altInput.style.height = "15px";
    altStepper.style.right = "20px";
  } else {
    input.style.height = "17px";
    altInput.style.height = "17px";
  }

  mxEvent.addListener(input, "blur", update);
  mxEvent.addListener(input, "change", update);

  mxEvent.addListener(altInput, "blur", altUpdate);
  mxEvent.addListener(altInput, "change", altUpdate);

  if (mxClient.IS_QUIRKS) {
    mxUtils.br(stylePanel2);
    mxUtils.br(stylePanel2);
  }

  var edgeStyle = this.editorUi.toolbar.addMenuFunctionInContainer(stylePanel2, "geSprite-orthogonal", mxResources.get("waypoints"), false, mxUtils.bind(this, function(menu) {
    if (ss.style.shape != "arrow") {
      this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], [null, null, null], "geIcon geSprite geSprite-straight", null, true).setAttribute("title", mxResources.get("straight"));
      this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["orthogonalEdgeStyle", null, null], "geIcon geSprite geSprite-orthogonal", null, true).setAttribute("title", mxResources.get("orthogonal"));
      this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["elbowEdgeStyle", null, null, null], "geIcon geSprite geSprite-horizontalelbow", null, true).setAttribute("title", mxResources.get("simple"));
      this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["elbowEdgeStyle", "vertical", null, null], "geIcon geSprite geSprite-verticalelbow", null, true).setAttribute("title", mxResources.get("simple"));
      this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["isometricEdgeStyle", null, null, null], "geIcon geSprite geSprite-horizontalisometric", null, true).setAttribute("title", mxResources.get("isometric"));
      this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["isometricEdgeStyle", "vertical", null, null], "geIcon geSprite geSprite-verticalisometric", null, true).setAttribute("title", mxResources.get("isometric"));

      if (ss.style.shape == "connector") {
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["orthogonalEdgeStyle", "1", null], "geIcon geSprite geSprite-curved", null, true).setAttribute("title", mxResources.get("curved"));
      }

      this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ["entityRelationEdgeStyle", null, null], "geIcon geSprite geSprite-entity", null, true).setAttribute("title", mxResources.get("entityRelation"));
    }
  }));

  var lineStart = this.editorUi.toolbar.addMenuFunctionInContainer(stylePanel2, "geSprite-startclassic", mxResources.get("linestart"), false, mxUtils.bind(this, function(menu) {
    if (ss.style.shape == "connector" || ss.style.shape == "flexArrow" || ss.style.shape == "filledEdge") {
      var item = this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.NONE, 0], "geIcon", null, false);
      item.setAttribute("title", mxResources.get("none"));
      item.firstChild.firstChild.innerHTML = "<font style=\"font-size:10px;\">" + mxUtils.htmlEntities(mxResources.get("none")) + "</font>";

      if (ss.style.shape == "connector" || ss.style.shape == "filledEdge") {
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_CLASSIC, 1], "geIcon geSprite geSprite-startclassic", null, false).setAttribute("title", mxResources.get("classic"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_CLASSIC_THIN, 1], "geIcon geSprite geSprite-startclassicthin", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_OPEN, 0], "geIcon geSprite geSprite-startopen", null, false).setAttribute("title", mxResources.get("openArrow"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_OPEN_THIN, 0], "geIcon geSprite geSprite-startopenthin", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["openAsync", 0], "geIcon geSprite geSprite-startopenasync", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_BLOCK, 1], "geIcon geSprite geSprite-startblock", null, false).setAttribute("title", mxResources.get("block"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_BLOCK_THIN, 1], "geIcon geSprite geSprite-startblockthin", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["async", 1], "geIcon geSprite geSprite-startasync", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_OVAL, 1], "geIcon geSprite geSprite-startoval", null, false).setAttribute("title", mxResources.get("oval"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_DIAMOND, 1], "geIcon geSprite geSprite-startdiamond", null, false).setAttribute("title", mxResources.get("diamond"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_DIAMOND_THIN, 1], "geIcon geSprite geSprite-startthindiamond", null, false).setAttribute("title", mxResources.get("diamondThin"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_CLASSIC, 0], "geIcon geSprite geSprite-startclassictrans", null, false).setAttribute("title", mxResources.get("classic"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_CLASSIC_THIN, 0], "geIcon geSprite geSprite-startclassicthintrans", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_BLOCK, 0], "geIcon geSprite geSprite-startblocktrans", null, false).setAttribute("title", mxResources.get("block"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_BLOCK_THIN, 0], "geIcon geSprite geSprite-startblockthintrans", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["async", 0], "geIcon geSprite geSprite-startasynctrans", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_OVAL, 0], "geIcon geSprite geSprite-startovaltrans", null, false).setAttribute("title", mxResources.get("oval"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_DIAMOND, 0], "geIcon geSprite geSprite-startdiamondtrans", null, false).setAttribute("title", mxResources.get("diamond"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], [mxConstants.ARROW_DIAMOND_THIN, 0], "geIcon geSprite geSprite-startthindiamondtrans", null, false).setAttribute("title", mxResources.get("diamondThin"));

        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["dash", 0], "geIcon geSprite geSprite-startdash", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["cross", 0], "geIcon geSprite geSprite-startcross", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["circlePlus", 0], "geIcon geSprite geSprite-startcircleplus", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["circle", 1], "geIcon geSprite geSprite-startcircle", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["ERone", 0], "geIcon geSprite geSprite-starterone", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["ERmandOne", 0], "geIcon geSprite geSprite-starteronetoone", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["ERmany", 0], "geIcon geSprite geSprite-startermany", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["ERoneToMany", 0], "geIcon geSprite geSprite-starteronetomany", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["ERzeroToOne", 1], "geIcon geSprite geSprite-starteroneopt", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW, "startFill"], ["ERzeroToMany", 1], "geIcon geSprite geSprite-startermanyopt", null, false);
      } else {
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_STARTARROW], [mxConstants.ARROW_BLOCK], "geIcon geSprite geSprite-startblocktrans", null, false).setAttribute("title", mxResources.get("block"));
      }
    }
  }));

  var lineEnd = this.editorUi.toolbar.addMenuFunctionInContainer(stylePanel2, "geSprite-endclassic", mxResources.get("lineend"), false, mxUtils.bind(this, function(menu) {
    if (ss.style.shape == "connector" || ss.style.shape == "flexArrow" || ss.style.shape == "filledEdge") {
      var item = this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.NONE, 0], "geIcon", null, false);
      item.setAttribute("title", mxResources.get("none"));
      item.firstChild.firstChild.innerHTML = "<font style=\"font-size:10px;\">" + mxUtils.htmlEntities(mxResources.get("none")) + "</font>";

      if (ss.style.shape == "connector" || ss.style.shape == "filledEdge") {
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_CLASSIC, 1], "geIcon geSprite geSprite-endclassic", null, false).setAttribute("title", mxResources.get("classic"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_CLASSIC_THIN, 1], "geIcon geSprite geSprite-endclassicthin", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_OPEN, 0], "geIcon geSprite geSprite-endopen", null, false).setAttribute("title", mxResources.get("openArrow"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_OPEN_THIN, 0], "geIcon geSprite geSprite-endopenthin", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["openAsync", 0], "geIcon geSprite geSprite-endopenasync", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_BLOCK, 1], "geIcon geSprite geSprite-endblock", null, false).setAttribute("title", mxResources.get("block"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_BLOCK_THIN, 1], "geIcon geSprite geSprite-endblockthin", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["async", 1], "geIcon geSprite geSprite-endasync", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_OVAL, 1], "geIcon geSprite geSprite-endoval", null, false).setAttribute("title", mxResources.get("oval"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_DIAMOND, 1], "geIcon geSprite geSprite-enddiamond", null, false).setAttribute("title", mxResources.get("diamond"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_DIAMOND_THIN, 1], "geIcon geSprite geSprite-endthindiamond", null, false).setAttribute("title", mxResources.get("diamondThin"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_CLASSIC, 0], "geIcon geSprite geSprite-endclassictrans", null, false).setAttribute("title", mxResources.get("classic"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_CLASSIC_THIN, 0], "geIcon geSprite geSprite-endclassicthintrans", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_BLOCK, 0], "geIcon geSprite geSprite-endblocktrans", null, false).setAttribute("title", mxResources.get("block"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_BLOCK_THIN, 0], "geIcon geSprite geSprite-endblockthintrans", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["async", 0], "geIcon geSprite geSprite-endasynctrans", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_OVAL, 0], "geIcon geSprite geSprite-endovaltrans", null, false).setAttribute("title", mxResources.get("oval"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_DIAMOND, 0], "geIcon geSprite geSprite-enddiamondtrans", null, false).setAttribute("title", mxResources.get("diamond"));
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], [mxConstants.ARROW_DIAMOND_THIN, 0], "geIcon geSprite geSprite-endthindiamondtrans", null, false).setAttribute("title", mxResources.get("diamondThin"));

        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["dash", 0], "geIcon geSprite geSprite-enddash", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["cross", 0], "geIcon geSprite geSprite-endcross", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["circlePlus", 0], "geIcon geSprite geSprite-endcircleplus", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["circle", 1], "geIcon geSprite geSprite-endcircle", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["ERone", 0], "geIcon geSprite geSprite-enderone", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["ERmandOne", 0], "geIcon geSprite geSprite-enderonetoone", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["ERmany", 0], "geIcon geSprite geSprite-endermany", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["ERoneToMany", 0], "geIcon geSprite geSprite-enderonetomany", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["ERzeroToOne", 1], "geIcon geSprite geSprite-enderoneopt", null, false);
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW, "endFill"], ["ERzeroToMany", 1], "geIcon geSprite geSprite-endermanyopt", null, false);
      } else {
        this.editorUi.menus.edgeStyleChange(menu, "", [mxConstants.STYLE_ENDARROW], [mxConstants.ARROW_BLOCK], "geIcon geSprite geSprite-endblocktrans", null, false).setAttribute("title", mxResources.get("block"));
      }
    }
  }));

  this.addArrow(edgeShape, 8);
  this.addArrow(edgeStyle);
  this.addArrow(lineStart);
  this.addArrow(lineEnd);

  var symbol = this.addArrow(pattern, 9);
  symbol.className = "geIcon";
  symbol.style.width = "84px";

  var altSymbol = this.addArrow(altPattern, 9);
  altSymbol.className = "geIcon";
  altSymbol.style.width = "22px";

  var solid = document.createElement("div");
  solid.style.width = "85px";
  solid.style.height = "1px";
  solid.style.borderBottom = "1px solid " + this.defaultStrokeColor;
  solid.style.marginBottom = "9px";
  symbol.appendChild(solid);

  var altSolid = document.createElement("div");
  altSolid.style.width = "23px";
  altSolid.style.height = "1px";
  altSolid.style.borderBottom = "1px solid " + this.defaultStrokeColor;
  altSolid.style.marginBottom = "9px";
  altSymbol.appendChild(altSolid);

  pattern.style.height = "15px";
  altPattern.style.height = "15px";
  edgeShape.style.height = "15px";
  edgeStyle.style.height = "17px";
  lineStart.style.marginLeft = "3px";
  lineStart.style.height = "17px";
  lineEnd.style.marginLeft = "3px";
  lineEnd.style.height = "17px";

  container.appendChild(colorPanel);
  container.appendChild(altStylePanel);
  container.appendChild(stylePanel);

  var arrowPanel = stylePanel.cloneNode(false);
  arrowPanel.style.paddingBottom = "6px";
  arrowPanel.style.paddingTop = "4px";
  arrowPanel.style.fontWeight = "normal";

  var span = document.createElement("div");
  span.style.position = "absolute";
  span.style.marginLeft = "3px";
  span.style.marginBottom = "12px";
  span.style.marginTop = "2px";
  span.style.fontWeight = "normal";
  span.style.width = "76px";

  mxUtils.write(span, mxResources.get("lineend"));
  arrowPanel.appendChild(span);

  var endSpacingUpdate, endSizeUpdate;
  var endSpacing = this.addUnitInput(arrowPanel, "pt", 74, 33, function() {
    endSpacingUpdate.apply(this, arguments);
  });
  var endSize = this.addUnitInput(arrowPanel, "pt", 20, 33, function() {
    endSizeUpdate.apply(this, arguments);
  });

  mxUtils.br(arrowPanel);

  var spacer = document.createElement("div");
  spacer.style.height = "8px";
  arrowPanel.appendChild(spacer);

  span = span.cloneNode(false);
  mxUtils.write(span, mxResources.get("linestart"));
  arrowPanel.appendChild(span);

  var startSpacingUpdate, startSizeUpdate;
  var startSpacing = this.addUnitInput(arrowPanel, "pt", 74, 33, function() {
    startSpacingUpdate.apply(this, arguments);
  });
  var startSize = this.addUnitInput(arrowPanel, "pt", 20, 33, function() {
    startSizeUpdate.apply(this, arguments);
  });

  mxUtils.br(arrowPanel);
  this.addLabel(arrowPanel, mxResources.get("spacing"), 74, 50);
  this.addLabel(arrowPanel, mxResources.get("size"), 20, 50);
  mxUtils.br(arrowPanel);

  var perimeterPanel = colorPanel.cloneNode(false);
  perimeterPanel.style.fontWeight = "normal";
  perimeterPanel.style.position = "relative";
  perimeterPanel.style.paddingLeft = "16px";
  perimeterPanel.style.marginBottom = "2px";
  perimeterPanel.style.marginTop = "6px";
  perimeterPanel.style.borderWidth = "0px";
  perimeterPanel.style.paddingBottom = "18px";

  var span = document.createElement("div");
  span.style.position = "absolute";
  span.style.marginLeft = "3px";
  span.style.marginBottom = "12px";
  span.style.marginTop = "1px";
  span.style.fontWeight = "normal";
  span.style.width = "120px";
  mxUtils.write(span, mxResources.get("perimeter"));
  perimeterPanel.appendChild(span);

  var perimeterUpdate;
  var perimeterSpacing = this.addUnitInput(perimeterPanel, "pt", 20, 41, function() {
    perimeterUpdate.apply(this, arguments);
  });

  if (ss.edges.length == graph.getSelectionCount()) {
    container.appendChild(stylePanel2);

    if (mxClient.IS_QUIRKS) {
      mxUtils.br(container);
      mxUtils.br(container);
    }

    container.appendChild(arrowPanel);
  } else if (ss.vertices.length == graph.getSelectionCount()) {
    if (mxClient.IS_QUIRKS) {
      mxUtils.br(container);
    }

    container.appendChild(perimeterPanel);
  }

  var listener = mxUtils.bind(this, function(sender, evt, force) {
    ss = this.format.getSelectionState();
    var color = mxUtils.getValue(ss.style, strokeKey, null);

    if (force || document.activeElement != input) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_STROKEWIDTH, 1));
      input.value = (isNaN(tmp)) ? "" : tmp + " pt";
    }

    if (force || document.activeElement != altInput) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_STROKEWIDTH, 1));
      altInput.value = (isNaN(tmp)) ? "" : tmp + " pt";
    }

    styleSelect.style.visibility = (ss.style.shape == "connector" || ss.style.shape == "filledEdge") ? "" : "hidden";

    if (mxUtils.getValue(ss.style, mxConstants.STYLE_CURVED, null) == "1") {
      styleSelect.value = "curved";
    } else if (mxUtils.getValue(ss.style, mxConstants.STYLE_ROUNDED, null) == "1") {
      styleSelect.value = "rounded";
    }

    if (mxUtils.getValue(ss.style, mxConstants.STYLE_DASHED, null) == "1") {
      if (mxUtils.getValue(ss.style, mxConstants.STYLE_DASH_PATTERN, null) == null) {
        solid.style.borderBottom = "1px dashed " + this.defaultStrokeColor;
      } else {
        solid.style.borderBottom = "1px dotted " + this.defaultStrokeColor;
      }
    } else {
      solid.style.borderBottom = "1px solid " + this.defaultStrokeColor;
    }

    altSolid.style.borderBottom = solid.style.borderBottom;

    // Updates toolbar icon for edge style
    var edgeStyleDiv = edgeStyle.getElementsByTagName("div")[0];
    var es = mxUtils.getValue(ss.style, mxConstants.STYLE_EDGE, null);

    if (mxUtils.getValue(ss.style, mxConstants.STYLE_NOEDGESTYLE, null) == "1") {
      es = null;
    }

    if (es == "orthogonalEdgeStyle" && mxUtils.getValue(ss.style, mxConstants.STYLE_CURVED, null) == "1") {
      edgeStyleDiv.className = "geSprite geSprite-curved";
    } else if (es == "straight" || es == "none" || es == null) {
      edgeStyleDiv.className = "geSprite geSprite-straight";
    } else if (es == "entityRelationEdgeStyle") {
      edgeStyleDiv.className = "geSprite geSprite-entity";
    } else if (es == "elbowEdgeStyle") {
      edgeStyleDiv.className = "geSprite " + ((mxUtils.getValue(ss.style,
        mxConstants.STYLE_ELBOW, null) == "vertical") ?
        "geSprite-verticalelbow" : "geSprite-horizontalelbow");
    } else if (es == "isometricEdgeStyle") {
      edgeStyleDiv.className = "geSprite " + ((mxUtils.getValue(ss.style,
        mxConstants.STYLE_ELBOW, null) == "vertical") ?
        "geSprite-verticalisometric" : "geSprite-horizontalisometric");
    } else {
      edgeStyleDiv.className = "geSprite geSprite-orthogonal";
    }

    // Updates icon for edge shape
    var edgeShapeDiv = edgeShape.getElementsByTagName("div")[0];

    if (ss.style.shape == "link") {
      edgeShapeDiv.className = "geSprite geSprite-linkedge";
    } else if (ss.style.shape == "flexArrow") {
      edgeShapeDiv.className = "geSprite geSprite-arrow";
    } else if (ss.style.shape == "arrow") {
      edgeShapeDiv.className = "geSprite geSprite-simplearrow";
    } else {
      edgeShapeDiv.className = "geSprite geSprite-connection";
    }

    if (ss.edges.length == graph.getSelectionCount()) {
      altStylePanel.style.display = "";
      stylePanel.style.display = "none";
    } else {
      altStylePanel.style.display = "none";
      stylePanel.style.display = "";
    }

    function updateArrow(marker, fill, elt, prefix) {
      var markerDiv = elt.getElementsByTagName("div")[0];

      markerDiv.className = ui.getCssClassForMarker(prefix, ss.style.shape, marker, fill);

      if (markerDiv.className == "geSprite geSprite-noarrow") {
        markerDiv.innerHTML = mxUtils.htmlEntities(mxResources.get("none"));
        markerDiv.style.backgroundImage = "none";
        markerDiv.style.verticalAlign = "top";
        markerDiv.style.marginTop = "5px";
        markerDiv.style.fontSize = "10px";
        markerDiv.style.filter = "none";
        markerDiv.style.color = this.defaultStrokeColor;
        markerDiv.nextSibling.style.marginTop = "0px";
      }

      return markerDiv;
    };

    var sourceDiv = updateArrow(mxUtils.getValue(ss.style, mxConstants.STYLE_STARTARROW, null),
      mxUtils.getValue(ss.style, "startFill", "1"), lineStart, "start");
    var targetDiv = updateArrow(mxUtils.getValue(ss.style, mxConstants.STYLE_ENDARROW, null),
      mxUtils.getValue(ss.style, "endFill", "1"), lineEnd, "end");

    // Special cases for markers
    if (ss.style.shape == "arrow") {
      sourceDiv.className = "geSprite geSprite-noarrow";
      targetDiv.className = "geSprite geSprite-endblocktrans";
    } else if (ss.style.shape == "link") {
      sourceDiv.className = "geSprite geSprite-noarrow";
      targetDiv.className = "geSprite geSprite-noarrow";
    }

    mxUtils.setOpacity(edgeStyle, (ss.style.shape == "arrow") ? 30 : 100);

    if (ss.style.shape != "connector" && ss.style.shape != "flexArrow" && ss.style.shape != "filledEdge") {
      mxUtils.setOpacity(lineStart, 30);
      mxUtils.setOpacity(lineEnd, 30);
    } else {
      mxUtils.setOpacity(lineStart, 100);
      mxUtils.setOpacity(lineEnd, 100);
    }

    if (force || document.activeElement != startSize) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_MARKERSIZE));
      startSize.value = (isNaN(tmp)) ? "" : tmp + " pt";
    }

    if (force || document.activeElement != startSpacing) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_SOURCE_PERIMETER_SPACING, 0));
      startSpacing.value = (isNaN(tmp)) ? "" : tmp + " pt";
    }

    if (force || document.activeElement != endSize) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE));
      endSize.value = (isNaN(tmp)) ? "" : tmp + " pt";
    }

    if (force || document.activeElement != startSpacing) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_TARGET_PERIMETER_SPACING, 0));
      endSpacing.value = (isNaN(tmp)) ? "" : tmp + " pt";
    }

    if (force || document.activeElement != perimeterSpacing) {
      var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_PERIMETER_SPACING, 0));
      perimeterSpacing.value = (isNaN(tmp)) ? "" : tmp + " pt";
    }
  });

  startSizeUpdate = this.installInputHandler(startSize, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_MARKERSIZE, 0, 999, " pt");
  startSpacingUpdate = this.installInputHandler(startSpacing, mxConstants.STYLE_SOURCE_PERIMETER_SPACING, 0, -999, 999, " pt");
  endSizeUpdate = this.installInputHandler(endSize, mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE, 0, 999, " pt");
  endSpacingUpdate = this.installInputHandler(endSpacing, mxConstants.STYLE_TARGET_PERIMETER_SPACING, 0, -999, 999, " pt");
  perimeterUpdate = this.installInputHandler(perimeterSpacing, mxConstants.STYLE_PERIMETER_SPACING, 0, 0, 999, " pt");

  this.addKeyHandler(input, listener);
  this.addKeyHandler(startSize, listener);
  this.addKeyHandler(startSpacing, listener);
  this.addKeyHandler(endSize, listener);
  this.addKeyHandler(endSpacing, listener);
  this.addKeyHandler(perimeterSpacing, listener);

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function() {
      graph.getModel().removeListener(listener);
    }
  });
  listener();

  return container;
};

/**
 * Adds UI for configuring line jumps.
 */
StyleFormatPanel.prototype.addLineJumps = function(container) {
  var ss = this.format.getSelectionState();

  if (Graph.lineJumpsEnabled && ss.edges.length > 0 &&
    ss.vertices.length == 0 && ss.lineJumps) {
    container.style.padding = "8px 0px 24px 18px";

    var ui = this.editorUi;
    var editor = ui.editor;
    var graph = editor.graph;

    var span = document.createElement("div");
    span.style.position = "absolute";
    span.style.fontWeight = "bold";
    span.style.width = "80px";

    mxUtils.write(span, mxResources.get("lineJumps"));
    container.appendChild(span);

    var styleSelect = document.createElement("select");
    styleSelect.style.position = "absolute";
    styleSelect.style.marginTop = "-2px";
    styleSelect.style.right = "76px";
    styleSelect.style.width = "62px";

    var styles = ["none", "arc", "gap", "sharp"];

    for (var i = 0; i < styles.length; i++) {
      var styleOption = document.createElement("option");
      styleOption.setAttribute("value", styles[i]);
      mxUtils.write(styleOption, mxResources.get(styles[i]));
      styleSelect.appendChild(styleOption);
    }

    mxEvent.addListener(styleSelect, "change", function(evt) {
      graph.getModel().beginUpdate();
      try {
        graph.setCellStyles("jumpStyle", styleSelect.value, graph.getSelectionCells());
        ui.fireEvent(new mxEventObject("styleChanged", "keys", ["jumpStyle"],
          "values", [styleSelect.value], "cells", graph.getSelectionCells()));
      } finally {
        graph.getModel().endUpdate();
      }

      mxEvent.consume(evt);
    });

    // Stops events from bubbling to color option event handler
    mxEvent.addListener(styleSelect, "click", function(evt) {
      mxEvent.consume(evt);
    });

    container.appendChild(styleSelect);

    var jumpSizeUpdate;

    var jumpSize = this.addUnitInput(container, "pt", 22, 33, function() {
      jumpSizeUpdate.apply(this, arguments);
    });

    jumpSizeUpdate = this.installInputHandler(jumpSize, "jumpSize",
      Graph.defaultJumpSize, 0, 999, " pt");

    var listener = mxUtils.bind(this, function(sender, evt, force) {
      ss = this.format.getSelectionState();
      styleSelect.value = mxUtils.getValue(ss.style, "jumpStyle", "none");

      if (force || document.activeElement != jumpSize) {
        var tmp = parseInt(mxUtils.getValue(ss.style, "jumpSize", Graph.defaultJumpSize));
        jumpSize.value = (isNaN(tmp)) ? "" : tmp + " pt";
      }
    });

    this.addKeyHandler(jumpSize, listener);

    graph.getModel().addListener(mxEvent.CHANGE, listener);
    this.listeners.push({
      destroy: function() {
        graph.getModel().removeListener(listener);
      }
    });
    listener();
  } else {
    container.style.display = "none";
  }

  return container;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addEffects = function(div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var ss = this.format.getSelectionState();

  div.style.paddingTop = "0px";
  div.style.paddingBottom = "2px";

  var table = document.createElement("table");

  if (mxClient.IS_QUIRKS) {
    table.style.fontSize = "1em";
  }

  table.style.width = "100%";
  table.style.fontWeight = "bold";
  table.style.paddingRight = "20px";
  var tbody = document.createElement("tbody");
  var row = document.createElement("tr");
  row.style.padding = "0px";
  var left = document.createElement("td");
  left.style.padding = "0px";
  left.style.width = "50%";
  left.setAttribute("valign", "top");

  var right = left.cloneNode(true);
  right.style.paddingLeft = "8px";
  row.appendChild(left);
  row.appendChild(right);
  tbody.appendChild(row);
  table.appendChild(tbody);
  div.appendChild(table);

  var current = left;
  var count = 0;

  var addOption = mxUtils.bind(this, function(label, key, defaultValue) {
    var opt = this.createCellOption(label, key, defaultValue);
    opt.style.width = "100%";
    current.appendChild(opt);
    current = (current == left) ? right : left;
    count++;
  });

  var listener = mxUtils.bind(this, function(sender, evt, force) {
    ss = this.format.getSelectionState();

    left.innerHTML = "";
    right.innerHTML = "";
    current = left;

    if (ss.rounded) {
      addOption(mxResources.get("rounded"), mxConstants.STYLE_ROUNDED, 0);
    }

    if (ss.style.shape == "swimlane") {
      addOption(mxResources.get("divider"), "swimlaneLine", 1);
    }

    if (!ss.containsImage) {
      addOption(mxResources.get("shadow"), mxConstants.STYLE_SHADOW, 0);
    }

    if (ss.glass) {
      addOption(mxResources.get("glass"), mxConstants.STYLE_GLASS, 0);
    }

    if (ss.comic) {
      addOption(mxResources.get("comic"), "comic", 0);
    }

    if (count == 0) {
      div.style.display = "none";
    }
  });

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function() {
      graph.getModel().removeListener(listener);
    }
  });
  listener();

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addStyleOps = function(div) {
  div.style.paddingTop = "10px";
  div.style.paddingBottom = "10px";

  var btn = mxUtils.button(mxResources.get("setAsDefaultStyle"), mxUtils.bind(this, function(evt) {
    this.editorUi.actions.get("setAsDefaultStyle").funct();
  }));

  btn.setAttribute("title", mxResources.get("setAsDefaultStyle") + " (" + this.editorUi.actions.get("setAsDefaultStyle").shortcut + ")");
  btn.style.width = "202px";
  div.appendChild(btn);

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addModalOps = function() {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var ss = this.format.getSelectionState();
  const modalOption = document.createElement("div");
  modalOption.innerHTML =
    `
      <div class="geFormatSection modal-option-wrapper">
        <div class="row no-gutters">
          <div class="col-12 modal-option-title">Modal Option</div>
          <div class="col-12 form-group d-flex align-items-center">
              <input type="checkbox" class="g-margin-right-5" id="modal-popup-check">
              <div class="font-weight-bold">Enable Modal Popup</div>
          </div>
          <div class="col-12" id="modal-type-wrapper" style="display: none;">
            <div class="form-group d-flex align-items-center g-margin-top-5 justify-content-end">
              <div class="font-weight-bold">Modal</div>
              <select id="modal-type" class="modal-option-type">
              </select>
            </div>
            <div class="form-group d-flex align-items-center g-margin-top-5 justify-content-end">
              <div class="font-weight-bold">Type</div>
              <select id="modal-type-detail" class="modal-option-type">
              </select>
            </div>
            <div class="form-group  g-margin-top-5 " style="display:none;" id="modal-site-url-wrapper">
              <div class="d-flex align-items-center justify-content-end">
                <div class="font-weight-bold">Url</div>
                <input id="modal-site-url" class="modal-option-type"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  var listener = mxUtils.bind(this, function() {
    ss = this.format.getSelectionState();
    var modalPopupVal = mxUtils.getValue(ss.style, "modalPopup", false);
    modalOption.querySelector("#modal-popup-check").checked = modalPopupVal;

    if (modalPopupVal) {
      $(modalOption.querySelector("#modal-type-wrapper")).show();
    } else {
      $(modalOption.querySelector("#modal-type-wrapper")).hide();
    }

    // modal type
    const modalTypeSelect = $(modalOption.querySelector("#modal-type"));
    modalTypeSelect.empty();
    modalFormListing.forEach(function(modalType) {
      modalTypeSelect.append($("<option></option>").attr("value", modalType.group_key).text(modalType.group_name));
    });
    var modalTypeVal = mxUtils.getValue(ss.style, "modalType", modalFormListing[0] ? modalFormListing[0].group_key : "");
    modalTypeSelect.val(modalTypeVal);

    // modal type detail
    const modalTypeDetailSelect = $(modalOption.querySelector("#modal-type-detail"));
    modalTypeDetailSelect.empty();
    const selectedModalType = modalFormListing.find(function(modalType) {
      return modalType.group_key === modalTypeVal;
    });
    if (selectedModalType) {
      selectedModalType.types.forEach(function(modalTypeDetail) {
        modalTypeDetailSelect.append($("<option></option>").attr("value", modalTypeDetail.key).text(modalTypeDetail.name));
      });

      $(modalOption.querySelector("#modal-site-url-wrapper")).show();

      var modalTypeDetailVal = mxUtils.getValue(ss.style, "modalTypeDetail", selectedModalType.types ? selectedModalType.types[0].key : "");
      modalTypeDetailSelect.val(modalTypeDetailVal);

      const selectedModalTypeDetail = selectedModalType.types.find(function(modalTypeDetail) {
        return modalTypeDetail.key === modalTypeDetailVal;
      });


      // site url
      if (selectedModalTypeDetail) {
        if (selectedModalTypeDetail.hasExtendUrl) {
          $(modalOption.querySelector("#modal-site-url-wrapper")).show();
        } else {
          $(modalOption.querySelector("#modal-site-url-wrapper")).hide();
        }
        const modalSiteUrlVal = ss.style["modalSiteUrl"] ? decodeURIComponent(ss.style["modalSiteUrl"]) : "";
        $(modalOption.querySelector("#modal-site-url")).val(modalSiteUrlVal);
      }
    }
  });

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function() {
      graph.getModel().removeListener(listener);
    }
  });
  listener();

  // -------------------------MODAL ACTION-------------------------------------
  const modalPopupCheck = $(modalOption.querySelector("#modal-popup-check"));
  modalPopupCheck.change(function(e) {
    const value = modalPopupCheck.is(":checked") ? "1" : "0";
    graph.setCellStyles("modalPopup", value, graph.getSelectionCells());
    if (modalPopupCheck.is(":checked")) {
      graph.setCellStyles("modalType", modalFormListing[0] && modalFormListing[0].group_key ?
        modalFormListing[0] && modalFormListing[0].group_key : "", graph.getSelectionCells());
      graph.setCellStyles("modalTypeDetail", modalFormListing[0] && modalFormListing[0].types && modalFormListing[0].types[0] ?
        modalFormListing[0].types[0].key : "", graph.getSelectionCells());
      graph.setCellStyles("modalSiteUrl", "", graph.getSelectionCells());
    }
  });

  const modalTypeSelect = $(modalOption.querySelector("#modal-type"));
  const modalTypeDetailSelect = $(modalOption.querySelector("#modal-type-detail"));
  const modalSiteUrlInput = $(modalOption.querySelector("#modal-site-url"));
  modalTypeSelect.change(function(e) {
    const value = modalTypeSelect.val();
    let detailValue = "";
    let siteUrlValue = "";
    const selectedModalType = modalFormListing.find(function(modalType) {
      return modalType.group_key === value;
    });
    if (selectedModalType) {
      detailValue = selectedModalType.types && selectedModalType.types[0] ? selectedModalType.types[0].key : "";
    }
    graph.setCellStyles("modalType", value, graph.getSelectionCells());
    graph.setCellStyles("modalTypeDetail", detailValue, graph.getSelectionCells());
    graph.setCellStyles("modalSiteUrl", "", graph.getSelectionCells());
  });


  modalTypeDetailSelect.change(function(e) {
    graph.setCellStyles("modalTypeDetail", e.target.value, graph.getSelectionCells());
    graph.setCellStyles("modalSiteUrl", "", graph.getSelectionCells());
  });

  modalSiteUrlInput.change(function(e) {
    graph.setCellStyles("modalSiteUrl", e.target.value ? encodeURIComponent(e.target.value) : "", graph.getSelectionCells());
  });

  return modalOption;
};

CustomDiagramFormatPanel = function(format, editorUi, container) {
  this.format = format;
  this.editorUi = editorUi;
  this.container = container;
  this.init();
};

CustomDiagramFormatPanel.prototype.init = function() {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var ss = this.format.getSelectionState();
  const _self = this;

  const diagramContainer = document.createElement("div");
  diagramContainer.innerHTML = `
  <div class="format-image-wrapper format-diagram-wrapper">
    <div class="row no-gutters tab-header-wrapper nav" role="tablist">
        <div class="nav-item nav-link col-6 tab-header-content active" id="inspector-tab" data-toggle="tab" href="#inspector" role="tab" aria-controls="inspector" aria-selected="true">Inspector</div>
        <div class="nav-item nav-link col-6 tab-header-content" id="layer-tab"  data-toggle="tab" href="#layer" role="tab" aria-controls="layer" aria-selected="false">Layer</div>
    </div>  
    <div class="format-link-wrapper row no-gutters">
        <div class="tab-content w-100">
              <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="inspector-tab" id="inspector">
                    <div class="format-image-header g-margin-top-20 g-font-weight-400">Inspector Editor</div>
                </div>
                <div class="tab-pane fade" role="tabpanel" aria-labelledby="layer-tab" id="layer">
                    <div class="format-image-header g-margin-top-20 g-font-weight-400">Layer Editor</div>
                    <div class="g-margin-top-20" id="format-layer-content"></div>
                </div>  
        </div>
    </div>
  </div>
  `;
  // console.log(graph.pageFormat);
  if (graph.isEnabled()) {
    const cells = graph.getAllCells(0, 0, 1000000, 1000000);
    const content = document.createElement("div");
    cells.forEach(function(cell) {
      const cellInfo = _self.format.getCellInfo(cell);
      if (cellInfo.style.type === "CARD") {
        const cellContent = document.createElement("div");
        cellContent.innerHTML = `
        <div class="row no-gutters layer-card-wrapper">
            <div class="col-9 layer-card-id">Card ${cell.id}</div>
            <div class="col-3 layer-card-close" data-id="${cell.id}">Delete</div>
        </div>
      `;
        content.appendChild(cellContent);
      }
    });

    $(content.querySelectorAll(".layer-card-close")).click(function(e) {
      const deleteCell = cells.find(v => v.id === this.dataset.id);
      customUtils.deleteCellWidthId(graph, deleteCell);
    });

    const formatLayerContent = $(diagramContainer.querySelector("#format-layer-content"));
    formatLayerContent.empty();
    formatLayerContent.append(content);
  }

  this.container.appendChild(diagramContainer);
};

CustomDiagramFormatPanel.prototype.destroy = function() {
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel = function(format, editorUi, container) {
  BaseFormatPanel.call(this, format, editorUi, container);
  this.init();
};

mxUtils.extend(DiagramFormatPanel, BaseFormatPanel);

/**
 * Switch to disable page view.
 */
DiagramFormatPanel.showPageView = true;

/**
 * Specifies if the background image option should be shown. Default is true.
 */
DiagramFormatPanel.prototype.showBackgroundImageOption = true;

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.init = function() {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;
  var rect = new mxRectangle(graph.x, graph.y, graph.width, graph.height);
  // console.log(graph.pageFormat);

  // this.container.appendChild(this.addView(this.createPanel()));

  if (graph.isEnabled()) {
    console.log(graph.getAllCells(0, 0, 1000000, 1000000));
    const cells = graph.getAllCells(0, 0, 1000000, 1000000);
    const content = document.createElement("div");

    cells.forEach(function(cell) {
      const cellContent = document.createElement("div");
      cellContent.innerHTML = `<div>${cell.id}</div>`;
      content.appendChild(cellContent);
    });
    // this.container.appendChild(content);
    this.container.appendChild(this.addOptions(this.createPanel()));
    this.container.appendChild(this.addPaperSize(this.createPanel()));
    this.container.appendChild(this.addStyleOps(this.createPanel()));
  }


  // this.container.appendChild(this.addPaperSize(this.createPanel()));
  // this.container.appendChild(this.addStyleOps(this.createPanel()));
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addView = function(div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  div.appendChild(this.createTitle(mxResources.get("view")));

  // Grid
  this.addGridOption(div);

  // Page View
  if (DiagramFormatPanel.showPageView) {
    div.appendChild(this.createOption(mxResources.get("pageView"), function() {
        return graph.pageVisible;
      }, function(checked) {
        ui.actions.get("pageView").funct();
      },
      {
        install: function(apply) {
          this.listener = function() {
            apply(graph.pageVisible);
          };

          ui.addListener("pageViewChanged", this.listener);
        },
        destroy: function() {
          ui.removeListener(this.listener);
        }
      }));
  }

  if (graph.isEnabled()) {
    // Background
    var bg = this.createColorOption(mxResources.get("background"), function() {
        return graph.background;
      }, function(color) {
        var change = new ChangePageSetup(ui, color);
        change.ignoreImage = true;

        graph.model.execute(change);
      }, "#ffffff",
      {
        install: function(apply) {
          this.listener = function() {
            apply(graph.background);
          };

          ui.addListener("backgroundColorChanged", this.listener);
        },
        destroy: function() {
          ui.removeListener(this.listener);
        }
      });

    if (this.showBackgroundImageOption) {
      var btn = mxUtils.button(mxResources.get("image"), function(evt) {
        ui.showBackgroundImageDialog();
        mxEvent.consume(evt);
      });

      btn.style.position = "absolute";
      btn.className = "geColorBtn";
      btn.style.marginTop = "-4px";
      btn.style.paddingBottom = (document.documentMode == 11 || mxClient.IS_MT) ? "0px" : "2px";
      btn.style.height = "22px";
      btn.style.right = (mxClient.IS_QUIRKS) ? "52px" : "72px";
      btn.style.width = "56px";

      bg.appendChild(btn);
    }

    div.appendChild(bg);
  }

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addOptions = function(div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  div.appendChild(this.createTitle(mxResources.get("options")));

  if (graph.isEnabled()) {
    // Connection arrows
    div.appendChild(this.createOption(mxResources.get("connectionArrows"), function() {
        return graph.connectionArrowsEnabled;
      }, function(checked) {
        ui.actions.get("connectionArrows").funct();
      },
      {
        install: function(apply) {
          this.listener = function() {
            apply(graph.connectionArrowsEnabled);
          };

          ui.addListener("connectionArrowsChanged", this.listener);
        },
        destroy: function() {
          ui.removeListener(this.listener);
        }
      }));

    // Connection points
    div.appendChild(this.createOption(mxResources.get("connectionPoints"), function() {
        return graph.connectionHandler.isEnabled();
      }, function(checked) {
        ui.actions.get("connectionPoints").funct();
      },
      {
        install: function(apply) {
          this.listener = function() {
            apply(graph.connectionHandler.isEnabled());
          };

          ui.addListener("connectionPointsChanged", this.listener);
        },
        destroy: function() {
          ui.removeListener(this.listener);
        }
      }));

    // Guides
    div.appendChild(this.createOption(mxResources.get("guides"), function() {
        return graph.graphHandler.guidesEnabled;
      }, function(checked) {
        ui.actions.get("guides").funct();
      },
      {
        install: function(apply) {
          this.listener = function() {
            apply(graph.graphHandler.guidesEnabled);
          };

          ui.addListener("guidesEnabledChanged", this.listener);
        },
        destroy: function() {
          ui.removeListener(this.listener);
        }
      }));
  }

  return div;
};

/**
 *
 */
DiagramFormatPanel.prototype.addGridOption = function(container) {
  var fPanel = this;
  var ui = this.editorUi;
  var graph = ui.editor.graph;

  var input = document.createElement("input");
  input.style.position = "absolute";
  input.style.textAlign = "right";
  input.style.width = "38px";
  input.value = this.inUnit(graph.getGridSize()) + " " + this.getUnit();

  var stepper = this.createStepper(input, update, this.getUnitStep(), null, null, null, this.isFloatUnit());
  input.style.display = (graph.isGridEnabled()) ? "" : "none";
  stepper.style.display = input.style.display;

  mxEvent.addListener(input, "keydown", function(e) {
    if (e.keyCode == 13) {
      graph.container.focus();
      mxEvent.consume(e);
    } else if (e.keyCode == 27) {
      input.value = graph.getGridSize();
      graph.container.focus();
      mxEvent.consume(e);
    }
  });

  function update(evt) {
    var value = fPanel.isFloatUnit() ? parseFloat(input.value) : parseInt(input.value);
    value = fPanel.fromUnit(Math.max(fPanel.inUnit(1), (isNaN(value)) ? fPanel.inUnit(10) : value));

    if (value != graph.getGridSize()) {
      graph.setGridSize(value);
    }

    input.value = fPanel.inUnit(value) + " " + fPanel.getUnit();
    mxEvent.consume(evt);
  };

  mxEvent.addListener(input, "blur", update);
  mxEvent.addListener(input, "change", update);

  var unitChangeListener = function(sender, evt) {
    input.value = fPanel.inUnit(graph.getGridSize()) + " " + fPanel.getUnit();
    fPanel.format.refresh();
  };

  graph.view.addListener("unitChanged", unitChangeListener);
  this.listeners.push({
    destroy: function() {
      graph.view.removeListener(unitChangeListener);
    }
  });

  if (mxClient.IS_SVG) {
    input.style.marginTop = "-2px";
    input.style.right = "84px";
    stepper.style.marginTop = "-16px";
    stepper.style.right = "72px";

    var panel = this.createColorOption(mxResources.get("grid"), function() {
        var color = graph.view.gridColor;

        return (graph.isGridEnabled()) ? color : null;
      }, function(color) {
        var enabled = graph.isGridEnabled();

        if (color == mxConstants.NONE) {
          graph.setGridEnabled(false);
        } else {
          graph.setGridEnabled(true);
          ui.setGridColor(color);
        }

        input.style.display = (graph.isGridEnabled()) ? "" : "none";
        stepper.style.display = input.style.display;

        if (enabled != graph.isGridEnabled()) {
          ui.fireEvent(new mxEventObject("gridEnabledChanged"));
        }
      }, "#e0e0e0",
      {
        install: function(apply) {
          this.listener = function() {
            apply((graph.isGridEnabled()) ? graph.view.gridColor : null);
          };

          ui.addListener("gridColorChanged", this.listener);
          ui.addListener("gridEnabledChanged", this.listener);
        },
        destroy: function() {
          ui.removeListener(this.listener);
        }
      });

    panel.appendChild(input);
    panel.appendChild(stepper);
    container.appendChild(panel);
  } else {
    input.style.marginTop = "2px";
    input.style.right = "32px";
    stepper.style.marginTop = "2px";
    stepper.style.right = "20px";

    container.appendChild(input);
    container.appendChild(stepper);

    container.appendChild(this.createOption(mxResources.get("grid"), function() {
        return graph.isGridEnabled();
      }, function(checked) {
        graph.setGridEnabled(checked);

        if (graph.isGridEnabled()) {
          graph.view.gridColor = "#e0e0e0";
        }

        ui.fireEvent(new mxEventObject("gridEnabledChanged"));
      },
      {
        install: function(apply) {
          this.listener = function() {
            input.style.display = (graph.isGridEnabled()) ? "" : "none";
            stepper.style.display = input.style.display;

            apply(graph.isGridEnabled());
          };

          ui.addListener("gridEnabledChanged", this.listener);
        },
        destroy: function() {
          ui.removeListener(this.listener);
        }
      }));
  }
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addDocumentProperties = function(div) {
  // Hook for subclassers
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  div.appendChild(this.createTitle(mxResources.get("options")));

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addPaperSize = function(div) {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  div.appendChild(this.createTitle(mxResources.get("paperSize")));

  var accessor = PageSetupDialog.addPageFormatPanel(div, "formatpanel", graph.pageFormat, function(pageFormat) {
    if (graph.pageFormat == null || graph.pageFormat.width != pageFormat.width ||
      graph.pageFormat.height != pageFormat.height) {
      var change = new ChangePageSetup(ui, null, null, pageFormat);
      change.ignoreColor = true;
      change.ignoreImage = true;

      graph.model.execute(change);
    }
  });

  this.addKeyHandler(accessor.widthInput, function() {
    accessor.set(graph.pageFormat);
  });
  this.addKeyHandler(accessor.heightInput, function() {
    accessor.set(graph.pageFormat);
  });

  var listener = function() {
    accessor.set(graph.pageFormat);
  };

  ui.addListener("pageFormatChanged", listener);
  this.listeners.push({
    destroy: function() {
      ui.removeListener(listener);
    }
  });

  graph.getModel().addListener(mxEvent.CHANGE, listener);
  this.listeners.push({
    destroy: function() {
      graph.getModel().removeListener(listener);
    }
  });

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addStyleOps = function(div) {
  var btn = mxUtils.button(mxResources.get("editData"), mxUtils.bind(this, function(evt) {
    this.editorUi.actions.get("editData").funct();
  }));

  btn.setAttribute("title", mxResources.get("editData") + " (" + this.editorUi.actions.get("editData").shortcut + ")");
  btn.style.width = "202px";
  btn.style.marginBottom = "2px";
  div.appendChild(btn);

  mxUtils.br(div);

  btn = mxUtils.button(mxResources.get("clearDefaultStyle"), mxUtils.bind(this, function(evt) {
    this.editorUi.actions.get("clearDefaultStyle").funct();
  }));

  btn.setAttribute("title", mxResources.get("clearDefaultStyle") + " (" + this.editorUi.actions.get("clearDefaultStyle").shortcut + ")");
  btn.style.width = "202px";
  div.appendChild(btn);

  return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.destroy = function() {
  BaseFormatPanel.prototype.destroy.apply(this, arguments);

  if (this.gridEnabledListener) {
    this.editorUi.removeListener(this.gridEnabledListener);
    this.gridEnabledListener = null;
  }
};
