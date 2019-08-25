var isAdvancedUpload = (function() {
  var div = document.createElement("div");
  return (
    ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
    "FormData" in window &&
    "FileReader" in window
  );
})();

var $form = $(".box");

if (isAdvancedUpload) {
  $form.addClass("has-advanced-upload");

  var droppedFiles = false;

  $form
    .on("drag dragstart dragend dragover dragenter dragleave drop", function(
      e
    ) {
      e.preventDefault();
      e.stopPropagation();
    })
    .on("dragover dragenter", function() {
      $form.addClass("is-dragover");
    })
    .on("dragleave dragend drop", function() {
      $form.removeClass("is-dragover");
    })
    .on("drop", function(e) {
      dropHandler(event);
      //droppedFiles = e.originalEvent.dataTransfer.files;
    });
}
$(document).ready(function() {
  var pullfiles = function() {
    // love the query selector
    var fileInput = document.querySelector("#file");
    var file = fileInput.files[0];
    processFile(file);
  };

  // set the input element onchange to call pullfiles
  document.querySelector("#file").onchange = pullfiles;
});
