var customUtils = {
  setCellStyles: function(graph, attrs, cell = null) {
    if (!graph || !attrs) return;
    const select = null;
    const cells = cell ? [cell] : graph.getSelectionCells();
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
  },
  updateCellWith: function(graph, width, isConstrain = false) {
    graph.getModel().beginUpdate();
    try {
      const cells = graph.getSelectionCells();

      for (let i = 0; i < cells.length; i++) {
        if (graph.getModel().isVertex(cells[i])) {
          let geo = graph.getCellGeometry(cells[i]);

          if (geo != null) {
            geo = geo.clone();

            //set value
            if (geo.width > 0) {
              if (isConstrain) {
                geo.height = Math.round((geo.height * width * 100) / geo.width) / 100;
              }

              geo.width = width;
            }

            graph.getModel().setGeometry(cells[i], geo);
          }
        }
      }
    } finally {
      graph.getModel().endUpdate();
    }
  },
  updateCellHeight: function(graph, height, isConstrain = false) {
    graph.getModel().beginUpdate();
    try {
      const cells = graph.getSelectionCells();

      for (let i = 0; i < cells.length; i++) {
        if (graph.getModel().isVertex(cells[i])) {
          let geo = graph.getCellGeometry(cells[i]);

          if (geo != null) {
            geo = geo.clone();

            //set value
            if (geo.height > 0) {
              if (isConstrain) {
                geo.width = Math.round((geo.width * height * 100) / geo.height) / 100;
              }

              geo.height = height;
            }

            graph.getModel().setGeometry(cells[i], geo);
          }
        }
      }
    } finally {
      graph.getModel().endUpdate();
    }
  },
  deleteSelectionCell: function(graph) {
    graph.escape();
    const cells = graph.getDeletableCells(graph.getSelectionCells());

    if (cells != null && cells.length > 0) {
      const parents = (graph.selectParentAfterDelete) ? graph.model.getParents(cells) : null;
      graph.removeCells(cells, includeEdges);

      // Selects parents for easier editing of groups
      if (parents != null) {
        var select = [];

        for (var i = 0; i < parents.length; i++) {
          if (graph.model.contains(parents[i]) &&
            (graph.model.isVertex(parents[i]) ||
              graph.model.isEdge(parents[i]))) {
            select.push(parents[i]);
          }
        }

        graph.setSelectionCells(select);
      }
    }
  },
  deleteCellWidthId: function(graph, cell) {
    graph.escape();
    const cells = graph.getDeletableCells([cell]);

    if (cells != null && cells.length > 0) {
      const parents = (graph.selectParentAfterDelete) ? graph.model.getParents(cells) : null;
      graph.removeCells(cells, true);

      // Selects parents for easier editing of groups
      if (parents != null) {
        var select = [];

        for (let i = 0; i < parents.length; i++) {
          if (graph.model.contains(parents[i]) &&
            (graph.model.isVertex(parents[i]) ||
              graph.model.isEdge(parents[i]))) {
            select.push(parents[i]);
          }
        }

        graph.setSelectionCells(select);
      }
    }
  },
  setCellConnectable: function(format, editorUi) {
    const editor = editorUi.editor;
    const graph = editor.graph;
    const ss = format.getSelectionState();
    const isConnectable = ss.style.isConnectable ? ss.style.isConnectable === 1 : false;
    graph.getModel().beginUpdate();
    try {
      const cells = graph.getSelectionCells();
      cells.map(cell => {
        cell.setConnectable(isConnectable);
      });
    } finally {
      graph.getModel().endUpdate();
    }
  }
};
