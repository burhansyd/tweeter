/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  renderTweets(tweetData);
});

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "James Taptellis",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@latrellgod"
      },
    "content": {
        "text": "If I see the latrell, I do the latrell!"
      },
    "created_at": 1461116232227
  }
];

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