/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("form").submit(submit);
  loadTweets();
});

const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweet = function(tweet) {

  const $tweet = $(`<article class="tweet">
        <header>
          <div>
            <img src="${tweet.user.avatars}">
            <span id="name">${tweet.user.name}</span>
          </div>
          <span>${tweet.user.handle}</span>
        </header>
        <p><b>${escape(tweet.content.text)}</b></p>
        <footer>
          <output>${timeago.format(tweet.created_at)}</output>
          <div>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`)
  
  return $tweet;
};

const renderTweets = function(tweets) {
  for (let tweetObj of tweets) {
    const appendableTweet = createTweet(tweetObj);
    $('.tweet-feed').prepend(appendableTweet);
  }
}

const submit = function(event) {
  if ($('#tweet-text').val() === "" || $('#tweet-text').val() === null) {
    event.preventDefault();
    alert("You can't say nothing!");
    loadTweets();
  }
  if (Number($('.counter').val()) < 0) {
    event.preventDefault();
    alert("Relax Stephen King. It's a tweet, not a novel!");
    loadTweets();
  }
  event.preventDefault();
  const formData = $('form').serialize();
  $('.tweet-feed').empty();
  $.post("/tweets", formData).then((data) => {
    loadTweets();
  });
};

const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: "GET",
  }).then(function(response) {
    renderTweets(response);
  })
};