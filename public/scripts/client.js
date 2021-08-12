/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  createTweet(tweetData);
});

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweet = function (tweet) {

  const date = new Date(Date.now());
  const time = new Date(tweet.created_at);
  const diffTime = Math.abs(time - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
          <output>${time}</output>
          <div>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`)

  $('.container').append($tweet)
}