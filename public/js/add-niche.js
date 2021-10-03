const postNiche = async (event) => {
  event.preventDefault();

  const newNicheValue = document.querySelector("#new_niche").value.trim();

  if (newNicheValue) {
    // Send a POST request to the API endpoint!
    const response = await fetch(`/api/niches`, {
      method: "POST",
      body: JSON.stringify({ newNicheValue }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

const deleteNiche = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/niches/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete niche');
    }
  }
};

document
  .querySelector('.add_niche_form')
  .addEventListener('submit', postNiche);

document
  .querySelector('.add_niche_form')
  .addEventListener('click', deleteNiche);
