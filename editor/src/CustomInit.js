var modalFormListing = [];
var filesListing = {};
var editorUiGlobal = {};
$(document).ready(function() {

  var editorUiInit = EditorUi.prototype.init;

  EditorUi.prototype.init = function() {
    editorUiInit.apply(this, arguments);
  };

  // Adds required resources (disables loading of fallback properties, this can only
  // be used if we know that all keys are defined in the language specific file)
  mxResources.loadDefaultBundle = false;
  var bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ||
    mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);

  // Fixes possible asynchronous requests
  mxUtils.getAll([bundle, STYLE_PATH + '/default.xml'], function(xhr) {
    // Adds bundle text to resources
    mxResources.parse(xhr[0].getText());

    // Configures the default graph theme
    var themes = new Object();
    themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();

    // Main
    editorUiGlobal = new EditorUi(new Editor(urlParams['chrome'] == '0', themes));
    initData();
  }, function() {
    document.body.innerHTML = '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
  });

  // requestModalListing();
  requestFilesWithType('hannd', 'image');
  requestFilesWithType('hannd', 'pdf');
  // const urlParams = customUtils.getUrlParams();
});

function initData() {
  // load app
  const { app = '', cardId = '', packId = '' } = urlParams;
  if (app) {
    const requestData = {
      appName: app,
      cardId: cardId,
      packId: packId
    };
    const callbackSuccess = () => {
      $('#load-btn').hide();
      editorUiGlobal.editor.setCardId(cardId);
      editorUiGlobal.editor.setPackId(packId);
    };
    const callbackFail = () => {
      window.history.replaceState({}, document.title, '/' + 'editor/  ');
    };
    requestLoadDataApp(requestData, editorUiGlobal, false, callbackSuccess, callbackFail);
  }
}
