import $ from "jquery";

$(".hello").on("click", function () {
  $(".world").fadeToggle();
});
