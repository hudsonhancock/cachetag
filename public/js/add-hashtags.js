// const newNicheHandler = async (event) => {
//     event.preventDefault();
//     event.stopPropagation();
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
  });
  
  var buttons = document.querySelectorAll(".dropdown-content"); 
  var savebtns = document.querySelectorAll(".saveButtonDiv");  
  
  var niche;
  var hashtag;
  
  var getHashtag = (event) => {
  
      hashtag = event.target.dataset.hashtag;
      console.log("This is the hashtag: " + event.target.dataset.hashtag);
  }; 
  
  
  
  var chooseNiche = (event) => {
    event.stopPropagation(); 
    niche = event.target.textContent;
    console.log("This is the niche name: " + niche + "\nThis is the hashtag: " + hashtag);
  
    
  }; 
  
  buttons.forEach(function(button) {
    button.addEventListener("click", chooseNiche);
  }); 
  
  savebtns.forEach(function(button) {
  button.addEventListener("click", getHashtag);
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

document
.querySelector('.savedHashtagsPage')
.addEventListener('click', delButtonHandler);

// const saveBtnEl = document.querySelector('#save_niche');
// saveBtnEl.addEventListener('click', newNicheHandler);
