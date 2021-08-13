const overLimit = () => charsLeft < 0;

$(document).ready(function () {
  $('#tweet-text').on('input', function(event) {
    const maxCharCount = 140;
    const charCount = $(this).val().length;
    const counter = $(this).closest(".new-tweet").find(".counter");

    if (charCount > maxCharCount) {
      $(counter).addClass('negative-count');
    } else if ($(counter).hasClass('negative-count')) {
      $(counter).removeClass('negative-count');
    }

    $(counter).val(maxCharCount - charCount);

  });
});
