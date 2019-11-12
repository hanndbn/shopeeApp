$(document).ready(function() {
  const vertexHandlerUnion = mxVertexHandler.prototype.union;
  mxVertexHandler.prototype.union = function(bounds, dx, dy, index, gridEnabled, scale, tr) {
    const result = vertexHandlerUnion.apply(this, arguments);
    if (this.state.cell && this.state.cell.style && this.state.cell.style.indexOf('type=CARD') > -1) {
      result.width = CONSTANT.MAX_WIDTH_CARD;
    }
    return result;
  };
});
