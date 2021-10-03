const saveNicheBtn = document.querySelector("#save_niche");
const deleteNicheBtn = document.querySelector("#delete_niche");
const newNiche = document.querySelector("#new_niche");

const postNiche = () => {
  alert("this works");
  alert(newNiche.value);
};

const deleteNiche = () => {
  alert("this works too");
};

saveNicheBtn.addEventListener("click", postNiche);
deleteNicheBtn.addEventListener("click", deleteNiche);

// fetch("", {
//     method: "post",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify({
//       name: myName,
//       password: myPassword,
//     }),
//   }).then((response) => {});
