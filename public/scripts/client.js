$(document).ready(function() {
const data = []



const $tweet = $(`<article class="tweet">Hello world</article>`);
const renderTweets = function(tweets) {

  for(let tweet of tweets){
    const tweetCaller = createTweetElement(tweet)
   $("#tweets-container").prepend(tweetCaller)
  }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) {

  let $tweet = `
  <article class="tweet-component">
          <div class="image-username-refkey">
            <div class="image-username">
              <img src="${tweet.user.avatars}" />
              <span>${tweet.user.name}</span>
            </div>
            <div>${tweet.user.handle}</div>
          </div>
          <div class="tweet-content" >
            <span>${escape1(tweet.content.text)}</span>
          </div>
          <div class="time-reactions">  
            <div><small>${timeago.format(tweet.created_at)}</small></div>
            <div class="icons">
            
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </div>
        </article>
  `



  return $tweet;
}

const displayError = err_msg => {
  $("form")
    
    .append(err_msg)
    .show()
    .slideDown("slow");
};
renderTweets(data);


  $("form").on("submit", function(e) {
    e.preventDefault();
    $('.error').remove()
   $(this)
     .find("p")
      .hide()
      .slideDown("slow");
    // if content is more than 14 characters
    if (
      $(this)
        .find("textarea")
        .val().length > defaultCharsLeft
    ) {
      const error_msg = "<div class='error' style='color:red'>You cannot exceed more than 140 characters</div>";
      return displayError(error_msg)

    }
    // if content is empty
    if (
      $(this)
        .find("textarea")
        .val().length < 1
    ) {
      const error_msg = "<div class='error' style='color:red'>You cannot post an empty tweet.</div>";
      return displayError(error_msg)
    }
    $.ajax({
      method: "POST",
      url: "/tweets",
      type: "application/json",
      data: $(this).serialize(),
      success: function() {
        $("textarea").val("");
        $.get("http://localhost:8080/tweets", data => {
          const newTweet = [data.slice(-1).pop()];
          renderTweets(newTweet);
          console.log(newTweet)
        });
      }
    });
  });

  // hide form
  $(".new-tweet").hide();

  
  // loading the tweets
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "json",
      success: function(data) {
        renderTweets(data);
      }
    });
  };

  loadTweets();
});

const escape1 = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};