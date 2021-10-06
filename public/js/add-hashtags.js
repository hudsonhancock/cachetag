// const newNicheHandler = async (event) => {
//     event.preventDefault();
//     event.stopPropagation();
  
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
  
// const delButtonHandler = async (event) => {
// event.stopPropagation(); 
// event.preventDefault(); 
// if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/user_hashtag/${id}`, {
//     method: 'DELETE',
//     });

//     if (response.ok) {
//     document.location.replace('/savedHashtags');
//     } else {
//     alert('Failed to delete niche');
//     }
// }
// };

// document
// .querySelector('.add_niche_form')
// .addEventListener('submit', newNicheHandler);

document
.querySelector('#delete_hashtag')
.addEventListener('click', alert("You deleted me!")); 
// delButtonHandler);

// const saveBtnEl = document.querySelector('#save_niche');
// saveBtnEl.addEventListener('click', newNicheHandler);
