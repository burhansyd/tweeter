/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("form").submit(submit);
  loadTweets(renderTweets);
});

//escape ensures no cross-site scripting by re-encoding, is called on line 28 for user input on tweet-text
const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//createTweet takes in an object containing tweet info and converts
//it into tweet html article that can be prepended to the main container
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

//renderTweets takes in a parameter of tweets, an array containing multiple tweet objects 
const renderTweets = function(tweets) {
  //iterates through tweets array with individual tweet objects
  for (let tweetObj of tweets) {
    //calls createTweet to convert Tweet object to html tweet in iteration
    const appendableTweet = createTweet(tweetObj);
    //prepends html tweet into tweet-feed class, a section in main container
    $('.tweet-feed').prepend(appendableTweet);
  }
}

//renderLatestTweets performs same functionality as renderTweet,
//but when iterating, only calls createTweet on the last tweet objext in array
const renderLatestTweet = function(tweets) {
  tweets.forEach((tweetObj, index) => {
    //conditional checks to see if tweet object is last one in array tweets
    if (index === (tweets.length - 1)) {
      const appendableTweet = createTweet(tweetObj);
      $('.tweet-feed').prepend(appendableTweet);
    }
  });
}

//loadTweets acceptss a render paramter, which would either be renderTweets or renderLatestTweets functions
//depending on is document ready jquery or sumbit jquery, the one of the two functions will be put in as a parameter
//makes an ajax get request to server to recieve tweets array
const loadTweets = function(render) {
  $('#error-message').hide();

  $.ajax({
    url: "/tweets",
    method: "GET",
  }).then(function(response) {
    //tweets array as a response will be passed into one of the render functions
    render(response);
  }) 
};

const retErrorMessage = function(message) {
  $('#error-message').text(message);
  $('#error-message').slideDown("slow");
}

//submit is a callback function that is called in line 8 when the user makes a form submit reuqest (jquery)
const submit = function(event) {
  //short circuit conditional check for empty/null text input
  //if so, prevents default action of jquery, returns error message with a unique message
  if ($('#tweet-text').val() === "" || $('#tweet-text').val() === null) {
    event.preventDefault();
    return retErrorMessage("You have nothing to say?!")
  }
  
  //same function as conditional on line 71-74, but checks for negative character count
  if (Number($('.counter').val()) < 0) {
    event.preventDefault();
    return retErrorMessage("Relax Stephen King. It's a Tweet, not a novel!");
  }
  
  event.preventDefault();

  //serialize the input in the form from user into query string
  const formData = $('form').serialize();

  //serialized form data is sent to /tweets with an ajax post request
  $.post("/tweets", formData).then(() => {

    //text area and char count are both reset
    $('#tweet-text').val('');
    $('.counter').val(140);

    //loadTweets is called with renderLatestTweet parameter in order to only prepend the tweet that was submitted 
    loadTweets(renderLatestTweet)

  });
};