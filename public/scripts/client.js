/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  submitTweet();
  loadTweets();
});

const createTweet = function(tweet) {

  const $tweet = $(`<article class="tweet">
        <header>
          <div>
            <img src="${tweet.user.avatars}">
            <span id="name">${tweet.user.name}</span>
          </div>
          <span>${tweet.user.handle}</span>
        </header>
        <p><b>${tweet.content.text}</b></p>
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
    $('.container').append(appendableTweet);
  }
}

const submitTweet = function() {
  console.log("works");
  $("form").submit(function(event) {
    event.preventDefault();
    const formData = $('form').serialize();
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: formData,
      dataType: "JSON",
      success: function (data) {
        
      }
    });
    console.log(event);
  });
};

const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "JSON",
  }).then(function(response) {
    renderTweets(response);
  })
};