var customUtils = {
  setCellStyles: function(graph, attrs) {
    if (!graph || !attrs) return;
    const select = null;
    const cells = graph.getSelectionCells();
    graph.getModel().beginUpdate();
    try {
      Object.keys(attrs).map(key => {
        graph.setCellStyles(key, attrs[key] ? attrs[key] : null, cells);
      });
    } finally {
      graph.getModel().endUpdate();
    }

    if (select != null) {
      graph.setSelectionCells(select);
      graph.scrollCellToVisible(select[0]);
    }
  }
};
