$(document).ready(function() {
  const vertexHandlerUnion = mxVertexHandler.prototype.union;
  mxVertexHandler.prototype.union = function(bounds, dx, dy, index, gridEnabled, scale, tr) {
    const result = vertexHandlerUnion.apply(this, arguments);
    if (this.state.style && this.state.style.type === "CARD") {
      result.width = CONSTANT.MAX_WIDTH_CARD;
    }
    return result;
  };

  const mxConnectionHandlerInsertEdge = mxConnectionHandler.prototype.insertEdge;
  mxConnectionHandler.prototype.insertEdge = function(parent, id, value, source, target, style) {
    // value = "Test";
    // return false;
    if ((source.style.indexOf("type=CARD") > -1 && target.style.indexOf("type=CARD") > -1)
      || ((source.style.indexOf("type=BUTTON") > -1 && target.style.indexOf("type=CARD") > -1))) {
      return mxConnectionHandlerInsertEdge.apply(this, arguments);
    }
    return null;
  };

});
