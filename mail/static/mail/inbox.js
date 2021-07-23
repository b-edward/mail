document.addEventListener('DOMContentLoaded', function() {

  // By default, load the inbox
  //load_mailbox('inbox');
  
  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));  
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // User clicks submit to send email 
  document.querySelector('#send_email').addEventListener('click', send_email);

  // Go to sent mailbox
  //load_mailbox('sent')



  



});

function send_email(event) {
  event.preventDefault()



  // Sends a POST request to the API, and parses the submissin to JSON
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: document.querySelector('#compose-recipients').value,
      subject: document.querySelector('#compose-subject').value,
      body: document.querySelector('#compose-body').value
      })
    })
    .then(response => response.json())
    .then(result =>{    
      // Loads the sent mailbox
      load_mailbox('sent')
      console.log(result);
    })
    .catch(error => console.log(error));

    return false;
}



function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}



function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}