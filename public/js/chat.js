const socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');

socket.on('message', (message) => {
    console.log(message);
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Disable button when msg is sent
    $messageFormButton.setAttribute('disabled','disabled');

    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message, (error) => {

        // Enable button again
        $messageFormButton.removeAttribute('disabled');

        $messageFormInput.valueup = '';
        $messageFormInput.focus();
        if(error){
            return console.log(error);
        }

        console.log('Message Delivered!')
    });
})