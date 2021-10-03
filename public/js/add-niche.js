const postNiche = async (event) => {
  event.preventDefault();
  
  const newNicheValue = document.querySelector("#new_niche").value.trim();

  if (newNicheValue) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/niches/new`, {
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
  alert(newNiche.value);
};

const deleteNiche = () => {
  alert("this works too");
};

const saveNicheBtn = document.querySelector("#save_niche");
const deleteNicheBtn = document.querySelector("#delete_niche");
const newNiche = document.querySelector("#new_niche");

saveNicheBtn.addEventListener("click", postNiche);
deleteNicheBtn.addEventListener("click", deleteNiche);
