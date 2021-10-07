  var buttons = document.querySelectorAll(".dropdown-content"); 
  var savebtns = document.querySelectorAll(".saveButtonDiv");  
  
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
    console.log(niche_id);

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
  
//   savebtns.forEach(function(button) {
//   button.addEventListener("click", getHashtag);
//   }); 

//   buttons.forEach(function(button) {
//     button.addEventListener("click", chooseNiche);
//   }); 
   
//     const niche_name = document.querySelector('#new_niche').value.trim();
  
//     if (niche_name) {
//       const response = await fetch(`/api/niches`, {
//         method: 'POST',
//         body: JSON.stringify({ niche_name }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.ok) {
//         document.location.replace('/addNiche');
//       } else {
//         alert('Failed to create niche');
//       }
//     }
//   };
  
const delButtonHandler = async (event) => {
event.stopPropagation(); 
event.preventDefault(); 
if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/user_hashtag/${id}`, {
    method: 'DELETE',
    });
    if (response.ok) {
        document.location.replace('/savedHashtags');
        } else {
        alert('Failed to delete niche');
        }
}

}

// var input = document.getElementById("searchInput"); 
// var searchBtn = document.getElementById("searchBtn"); 





// document
// .querySelector('.add_niche_form')
// .addEventListener('submit', newNicheHandler);

//this gets the value of search input, AKA the keyword 
// searchBtn.addEventListener("click", function(event) {
//     event.stopPropagation(); 
//     event.preventDefault(); 
//     console.log(input.value);  
// }); 


// document
// .querySelector('.savedHashtagsPage')
// .addEventListener('click', delButtonHandler);

// const saveBtnEl = document.querySelector('#save_niche');
// saveBtnEl.addEventListener('click', newNicheHandler);


buttons.forEach(function(button) {
  button.addEventListener("click", chooseNiche);
}); 

savebtns.forEach(function(button) {
button.addEventListener("click", getHashtag);
}); 

