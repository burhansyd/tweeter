let charsLeft = 140;

const increaseCharCount = () => {
  charsLeft += 1;
  return charsLeft;
};

const decreaseCharCount = () => {
  charsLeft -= 1;
  return charsLeft;
}

const overLimit = () => charsLeft < 0;

$(document).ready(function () {
  $('#tweet-text').on('keydown', function (event) {
    if (event.keyCode === 8) {
      if (charsLeft < 140) {
        increaseCharCount();
      }
    } else {
      decreaseCharCount();
    }

    const counter = $(this).closest(".new-tweet").find(".counter");

    if (overLimit()) {
      $(counter).addClass('negative-count');
    } else if ($(counter).hasClass('negative-count')) {
      $(counter).removeClass('negative-count');
    }

    $(counter).val(charsLeft);

  });
});
