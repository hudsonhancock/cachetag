var buttons = document.querySelectorAll(".dropdown-content"); 
var savebtns = document.querySelectorAll(".saveButtonDiv");  
var delbtns = document.querySelectorAll(".delete_hashtag");
var searchBtn = document.querySelector("#searchBtn");
  
let niche;
let hashtag;
let hashtagId;

var getHashtag = (event) => {
  hashtag = event.target.dataset.hashtag;
  hashtagId = event.target.dataset.hashtag_id;
  console.log("This is the hashtag: " + event.target.dataset.hashtag + "\n This is the hashtag_id: " + hashtagId);
}; 
  
  
// + Niche Selection Handler - This is what sends the POST requests to the three routes needed to add hashtag to a user's selected niche
var chooseNiche = async (event) => {
  // + This is the code that sets the selected niche to 'niche'
  event.stopPropagation(); 
  niche = event.target.textContent;
  niche_id = event.target.id;
  // console.log("This is the niche name: " + niche + "\nThis is the hashtag: " + hashtag + ":" + hashtagId + "\n " + niche_id)
  //console.log(niche_id);

  // + Fetch POST request to /api/hashtags/ endpoint with hashtag text to create Hashtag and returns the new hashtag object that was created and data about the niche that the user chose.
  if (niche) {
    const response = await fetch(`/api/hashtags`, {
      method: 'POST',
      body: JSON.stringify({ hashtag, niche_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      return response.json();
    })
    .then(jsonData => {
      // + We send the hashtag_id and the niche_id to the /api/user_hashtag endpoint
      console.log("NEW HASHTAG:")
      console.log(jsonData.newHashtag);
      console.log("NICHE DATA FROM SERVER:")
      console.log(jsonData.nicheData);

      let hashtag_id = jsonData.newHashtag.hashtag_id;
      let niche_id = jsonData.nicheData.niche_id;
      let collection_id = jsonData.nicheData.collection_id;

      const response = fetch(`/api/user_hashtag`, {
        method: 'POST',
        body: JSON.stringify({ niche_id, hashtag_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        console.log("RESPONSE FROM /API/USER_HASHTAG:")
        console.log(jsonData);

        // + Here we send a post to /api/collectiontags/ endpoint with the hashtag_id and collection_id 
        const response = fetch(`/api/collectiontags`, {
          method: 'POST',
          body: JSON.stringify({ collection_id, hashtag_id }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          console.log(jsonData);
        })
      })
    })
        
    if (response.ok) {
      document.location.replace('/addHashtag');
      console.log("Hashtag Created: " + JSON.parse(response.json()));
    } else {
        alert('Failed to create niche');
        console.log(response.statusText);
      }
  }
// + Fetch POST request to /api/user_hastag/ with hashtag_id and niche_id to create HashtagNiche and returns the hashtag_id 
}; 
    
const delButtonHandler = async (event) => {
  event.stopPropagation(); 
  event.preventDefault(); 

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const nicheID = event.target.getAttribute("data-nicheID");
    console.log(nicheID);
    const response = await fetch(`/api/user_hashtag/${id}`, {
    method: 'DELETE',
    });

    const collResponse = await fetch(`/api/collectiontags/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
        document.location.replace(`/hashtags/${nicheID}`);
    } else {
      alert('Failed to delete hashtag');
    };
  };
};

var searchHashTag = async (event) => {
  event.stopPropagation();
  event.preventDefault();
  let searchText = document.querySelector("#searchInput");
  /* const searchHash = await fetch(`/addHashtag/${searchText.value}`, {
    method: "GET"
  }); */
  document.location.replace(`/addHashtag/${searchText.value}`);
}; 

buttons.forEach(function(button) {
  button.addEventListener("click", chooseNiche);
}); 

savebtns.forEach(function(button) {
button.addEventListener("click", getHashtag);
}); 

delbtns.forEach(function(button){
  button.addEventListener("click", delButtonHandler);
})

searchBtn.addEventListener("click", searchHashTag);