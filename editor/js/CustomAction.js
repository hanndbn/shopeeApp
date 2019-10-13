/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */

/**
 * Constructs the actions object for the given UI.
 */
function CustomActions(editorUi) {
  this.editorUi = editorUi;
  this.actions = new Object();
  this.init();
};

/**
 * Adds the default actions.
 */
CustomActions.prototype.init = function() {
  var ui = this.editorUi;
  var editor = ui.editor;
  var graph = editor.graph;

  $('#load-btn').click(function() {
    $('#myModal').html(loadAppModal());
    $('#saveApp').click(function() {
      let appName = $('#appName').val();
      if (appName === '') {
        $('#responseError').html('app name must not empty');
      } else {
        ui.loadData(appName);
      }
    });
    $('#appName').keyup(function(e) {
      if (e.target.value === '') {
        $('#responseError').html('app name must not empty');
        $('#saveApp').prop('disabled', true);
      } else {
        $('#responseError').empty();
        $('#saveApp').prop('disabled', false);
      }
    });
    $('#myModal').modal('show');
  });

  $('#save-btn').click(function() {
    if (!editor.appId) {
      $('#myModal').html(saveAppModal());
      $('#appName').val(editor.getOrCreateFilename());
      $('#saveApp').click(function() {
        let appName = $('#appName').val();
        if (appName === '') {
          $('#responseError').html('app name must not empty');
        } else {
          ui.save(appName);
        }
      });
      $('#appName').keyup(function(e) {
        if (e.target.value === '') {
          $('#responseError').html('app name must not empty');
          $('#saveApp').prop('disabled', true);
        } else {
          $('#responseError').empty();
          $('#saveApp').prop('disabled', false);
        }
      });
      $('#myModal').modal('show');
    } else {
      ui.save(editor.getFilename());
    }
  });

  $('#add-container-btn').click(function() {
    const elt = document.getElementById('add-container-icon');
    elt.dataset.added = 'false';
    elt.click();
  });

  $('#clone-container-btn').click(function() {
    const elt = document.getElementById('clone-container-icon');
    elt.dataset.added = 'false';
    elt.click();
  });

  $('#add-text-btn').click(function() {
    const elt = document.getElementById('add-text-icon');
    elt.dataset.added = 'false';
    elt.click();
  });

  $('#add-image-btn').click(function() {
    const elt = document.getElementById('add-image-icon');
    elt.dataset.added = 'false';
    elt.click();
  });

  $('#add-link-btn').click(function() {
    const elt = document.getElementById('add-link-icon');
    elt.dataset.added = 'false';
    elt.click();
  });

  $('#add-home-btn').click(function() {
    const elt = document.getElementById('add-home-icon');
    elt.dataset.added = 'false';
    elt.click();
  });

  $('#zoom-in-btn').click(function() {
    graph.zoomIn();
  });
  $('#zoom-out-btn').click(function() {
    graph.zoomOut();
  });


};
