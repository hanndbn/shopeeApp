$(document).ready(function() {
  const vertexHandlerUnion = mxVertexHandler.prototype.union;
  mxVertexHandler.prototype.union = function(bounds, dx, dy, index, gridEnabled, scale, tr) {
    const result = vertexHandlerUnion.apply(this, arguments);
    if (this.state.style && this.state.style.type === 'CARD') {
      result.width = CONSTANT.MAX_WIDTH_CARD;
    }
    return result;
  };

  const mxConnectionHandlerInsertEdge = mxConnectionHandler.prototype.insertEdge;
  mxConnectionHandler.prototype.insertEdge = function(parent, id, value, source, target, style) {
    // value = "Test";
    // return false;
    if ((source.style.indexOf('type=CARD') > -1 && target.style.indexOf('type=CARD') > -1)
      || ((source.style.indexOf('type=RECTANGLE') > -1 && target.style.indexOf('type=CARD') > -1))
      || ((source.style.indexOf('type=IMAGE') > -1 && target.style.indexOf('type=CARD') > -1))
      || ((source.style.indexOf('type=IMAGE') > -1 && target.style.indexOf('type=IMAGE') > -1))
      || ((source.style.indexOf('type=RECTANGLE') > -1 && target.style.indexOf('type=IMAGE') > -1))
    ) {
      return mxConnectionHandlerInsertEdge.apply(this, arguments);
    }
    return null;
  };

  mxGraphModel.prototype.createId = function() {
    const id = uuidv1();
    return this.prefix + id + this.postfix;
  };

  const cellAdded = mxGraphModel.prototype.cellAdded;
  mxGraphModel.prototype.cellAdded = function(cell) {
    if (cell !== null && editorUiGlobal.editor && editorUiGlobal.editor.graph) {
      const editor = editorUiGlobal.editor;
      const graph = editor.graph;
      if (graph.getCellStyle(cell).type === 'CARD') {
        const cells = graph.getModel().cells ? graph.getModel().cells : [];
        let isExistFirstCard = false;
        Object.keys(cells).map((k) => {
          const v = cells[k];
          const cellStyle = graph.getCellStyle(v);
          if (cellStyle.type === 'CARD' && cellStyle.isFirstCard === 1) {
            isExistFirstCard = true;
          }
        });
        if (!isExistFirstCard) {
          customUtils.setCellStyles(graph, { isFirstCard: '1', strokeColor: '#FF0000' }, cell);
        } else {
          customUtils.setCellStyles(graph, { isFirstCard: null, strokeColor: null }, cell);
        }
      }
    }
    return cellAdded.apply(this, arguments);
  };

  const removeCells = mxGraph.prototype.removeCells;
  mxGraph.prototype.removeCells = function(cells) {
    if (cells !== null && editorUiGlobal.editor && editorUiGlobal.editor.graph) {
      const editor = editorUiGlobal.editor;
      const graph = editor.graph;
      const firstCard = cells.find(v => graph.getCellStyle(v).type === 'CARD' && graph.getCellStyle(v).isFirstCard === 1);
      if (firstCard) {
        const allCells = graph.getModel().cells ? graph.getModel().cells : [];
        const id = Object.keys(allCells).find((k) => {
          const cell = allCells[k];
          return graph.getCellStyle(cell).type === 'CARD' && !cells.find(v => v.id === cell.id);
        });
        if (id) {
          const cell = allCells[id];
          customUtils.setCellStyles(graph, { isFirstCard: '1', strokeColor: '#FF0000' }, cell);
        }
      }
    }
    return removeCells.apply(this, arguments);
  };
});
