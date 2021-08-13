$(document).ready(function () {
  $('#tweet-text').on('input', function(event) {
    const maxCharCount = 140;
    const charCount = $(this).val().length;
    const counter = $(this).closest(".new-tweet").find(".counter");

    //conditionals check if count if over max, if it does it adds class of negative-count to the counter
    //to intialize error message
    //if not, checks if it has class already, and removed it so error does not show
    if (charCount > maxCharCount) {
      $(counter).addClass('negative-count');
    } else if ($(counter).hasClass('negative-count')) {
      $(counter).removeClass('negative-count');
    }

    //displays remaining character count before tweet cannot be submitted
    $(counter).val(maxCharCount - charCount);

  });
});
