import {tweetsData} from `/data.js`    
    // 1. When a tweet is retweeted, it's 'isRetweeted' property
    //    should be set to true.and incremented
    // 2. When a tweet is unretweeted, it's 'isRetweeted' property
    //    should be set to false and its 'retweets' count
    //    should be decremented.
    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    } else {
        targetTweetObj.retweets++ 
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted // flipping the boolean value everytime icon is clicked
    render() // calling render function with updated data in tweetsdata array of objects
}

//function to handle what replies icon does when clicked
function handleRepliesClick(uuidOfReply) {
document.getElementById(`replies-${uuidOfReply}`).classList.toggle('hidden') // toggling , that is adds and removes the class to the element
//getting control of div element by uuidOfReply Parameter and accessing its classlist which is hidden and then toggling it
}

//function to handle what tweet button does when clicked
function handleTweetButton() {
    const tweetInput = document.getElementById('tweet-input') // textarea imput element
    // unshift adds element to start of the array
    if (tweetInput.value) {
        
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value, // user input
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4() // calling uuid4 function
        })
        tweetInput.value = ""
        render()
    }
}

//Create a function to render the feeds
function render() {
    // feed div element
document.getElementById('feed').innerHTML = getFeedhtml() // gets feedHtml array of strings and renders it out in the Page
}

render() // calling render function by default to display already existing tweets

// getfeedhtml()
// function to getfeed on the page
// 1. Use a "for of" to iterate over the data and 
//    create HTML string for each tweet using the 
//    boilerplate below. Replace UPPERCASE text
//    with data from the tweets. 
// 2. Store this HTML in a let called "feedHtml".
// 3. Inside each span that has a class of "tweet-detail",
//    add an <i> tag.
//  4. Give each <i> tag the classes it needs to render the
//       correct icons next to the numbers.
//       The classes you will need are:
//        fa-regular, 
//        fa-solid, 
//        fa-comment-dots, 
//        fa-heart, 
//        fa-retweet
// 5. Adding Conditional  CSS classes using if Statement
function getFeedhtml() {
    //initializing everytime function is called
    let feedHtml = ''
// replacing for of with for each method
   tweetsData.forEach(tweet => {

    let isLikedCssClass , isRetweetedCssClass = '' // intializing variables inside loop for each element inside tweetsdata = [{tweet},{tweet},{tweet}]
    //if conditon to add css class only to objects inisde array with isliked and isretweeted boolean values is true
    if (tweet.isLiked) {
        isLikedCssClass = 'liked' // refer css
     } else if (tweet.isRetweeted) {
        isRetweetedCssClass = 'retweeted' // refer css
     }

     //if condition to check the replies of each tweet in araay and add it to html doc to display
     let repliesHtml = ''
     if (tweet.replies.length > 0) {
        //forEach loop for reply array inside  tweet object
        tweet.replies.forEach(function(reply){
            repliesHtml += `<div class="tweet-reply">
            <div class="tweet-inner">
                <img src="${reply.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${reply.handle}</p>
                        <p class="tweet-text">${reply.tweetText}</p>
                    </div>
                </div>
        </div>`
        })
     }

     feedHtml += `<div class="tweet">
     <div class="tweet-inner">
         <img src="${tweet.profilePic}" class="profile-pic">
         <div>
             <p class="handle">${tweet.handle}</p>
             <p class="tweet-text">${tweet.tweetText}</p>
             <div class="tweet-details">
                 <span class="tweet-detail">
                 <i class="fa-regular fa-comment-dots" data-replies-icon = "${tweet.uuid}"></i> 
                 ${tweet.replies.length}
                 </span>
                 <span class="tweet-detail">
                 <i class="fa-solid fa-heart ${isLikedCssClass}" data-likes-icon = "${tweet.uuid}"></i>
                 ${tweet.likes}
                 </span>
                 <span class="tweet-detail">
                 <i class="fa-solid fa-retweet ${isRetweetedCssClass}" data-retweets-icon = "${tweet.uuid}"></i>
                 ${tweet.retweets}
                 </span>
             </div>   
         </div>            
     </div>
     <div class="hidden" id="replies-${tweet.uuid}"> 
        ${repliesHtml}
    </div> 
     </div>`
      //Adding Data attributes to each of icon element  and data as uuid - unique id for each tweet
     // adding a new div to display replies and giving it a unique id using uuid as parameter
    });
return feedHtml // returns feedHtml array of strings
}


 