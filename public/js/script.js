// Function to handle user authentication status
function handleAuthentication(isAuthenticated) {
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const signupButton = document.getElementById('signup-button');
    const createPostButton = document.getElementById('create-post-button');
  
    if (isAuthenticated) {
      // Hide login and signup buttons, show logout button
      loginButton.style.display = 'none';
      signupButton.style.display = 'none';
      logoutButton.style.display = 'block';
      createPostButton.style.display = 'block';
    } else {
      // Show login and signup buttons, hide logout button
      loginButton.style.display = 'block';
      signupButton.style.display = 'block';
      logoutButton.style.display = 'none';
      createPostButton.style.display = 'none';
    }
  }
  
  // Function to handle user logout
  function logoutUser() {
    // Send request to logout endpoint
    fetch('/logout', {
      method: 'POST',
      credentials: 'same-origin', // Include cookies in request
    })
      .then(response => {
        if (response.ok) {
          // Redirect user to home page after logout
          window.location.href = '/';
        } else {
          throw new Error('Failed to logout');
        }
      })
      .catch(error => console.error('Logout error:', error));
  }
  
  // Function to initialize event listeners
  function init() {
    // Check authentication status when page loads
    handleAuthentication(isAuthenticated);
  
    // Event listener for logout button
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
      logoutButton.addEventListener('click', logoutUser);
    }
  }
  
  // Call init function when page loads
  document.addEventListener('DOMContentLoaded', init);
  