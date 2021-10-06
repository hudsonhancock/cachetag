// const newNicheHandler = async (event) => {
//     event.preventDefault();
//     event.stopPropagation();
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
  });
  
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

    // + Fetch POST request to /api/hashtags/ with hashtag text to create Hashtag and returns the hashtag_id
    if (niche) {
        const response = await fetch(`/api/hashtags`, {
          method: 'POST',
          body: JSON.stringify({ hashtag, niche_id }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.body);
        if (response.ok) {
          document.location.replace('/addHashtag');
          console.log("Hashtag Created: " + JSON.parse(response.body));
        } else {
          alert('Failed to create niche');
          console.log(response.statusText);
        }
      }

      // + Fetch POST request to /api/user_hastag/ with hashtag_id and niche_id to create HashtagNiche and returns the hashtag_id 

      


  }; 
  
  savebtns.forEach(function(button) {
  button.addEventListener("click", getHashtag);
  }); 

  buttons.forEach(function(button) {
    button.addEventListener("click", chooseNiche);
  }); 
   
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
};

// document
// .querySelector('.add_niche_form')
// .addEventListener('submit', newNicheHandler);

// document
// .querySelector('.savedHashtagsPage')
// .addEventListener('click', delButtonHandler);

// const saveBtnEl = document.querySelector('#save_niche');
// saveBtnEl.addEventListener('click', newNicheHandler);
