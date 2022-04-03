let prevLengthOfTextarea = 0;
let defaultCharsLeft = 140;


// check scroll by user
const toggleBackTpTopBtn = () => {
  if ($(window).scrollTop() > 0) {
    $(".back-to-top")
      .show()
      .fadeIn("slow");
  } else {
    $(".back-to-top")
      .hide()
      .fadeOut("slow");
  }
};
const toggleTweetForm = () => {
  var $section = $("section.new-tweet");
  if ($section.is(":visible")) {
    $section.slideUp("fast");
  } else {
    $section.slideDown("fast");
    $section.find("textarea").focus();
  }
};

$(document).ready(function() {
  $("form")
    .find("textarea")
    .keyup(function() {
      const charInTextarea = $(this).val().length;
      const charsLeft = defaultCharsLeft - charInTextarea;
      if (charsLeft < 0) {
        ["-", charsLeft].join("");
        $(this)
          .next()
          .find("output")
          .text(charsLeft)
          .css("color", "red");
      } if (charsLeft > 0) {
        ["-", charsLeft].join("");
        $(this)
          .next()
          .find("output")
          .text(charsLeft)
          .css("color", "black");
      }
      $(this)
        .next()
        .find("output")
        .text(charsLeft);
    });

  // hide back to top button at initial render
  $(".back-to-top").hide();
  // call toggleBackTpTopBtn on page scroll
  $(window).scroll(toggleBackTpTopBtn);
  // clicking on back to top
  $(".back-to-top").on("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    toggleBackTpTopBtn();
  });

  // click to toggle form
  $(".form-toggle").on("click", toggleTweetForm);
});
