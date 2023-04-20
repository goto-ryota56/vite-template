import $ from "jquery";
import gsap from "gsap";

$(".hello").on("click", function () {
  gsap.to(".world", 0.3, { opacity: 0 });
});
