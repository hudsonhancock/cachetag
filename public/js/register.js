const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name_signup').value.trim();
    const email = document.querySelector('#email_signup').value.trim();
    const password = document.querySelector('#password_signup').value.trim();
  
    if (name && email && password) {
      let username = name + "8492";
      console.log(JSON.stringify({ username, name, email, password }));
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);