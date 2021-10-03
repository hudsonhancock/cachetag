var logoutEl = document.getElementsByClassName("logout");

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
console.log("logout called");
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

//document.querySelector('.logout').addEventListener('click', logout);
for (let i = 0; i < logoutEl.length; i++) {
  logoutEl[i].addEventListener("click", logout);
};