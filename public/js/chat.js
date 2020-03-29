const socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
        });
    $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Disable button when msg is sent
    $messageFormButton.setAttribute('disabled','disabled');

    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message, (error) => {

        // Enable button again
        $messageFormButton.removeAttribute('disabled');

        $messageFormInput.value = '';
        $messageFormInput.focus();
        if(error){
            return console.log(error);
        }

        console.log('Message Delivered!')
    });
})

socket.emit('join', { username, room }, (error) => {
    if(error){
        alert(error);
        location.href = '/';
    }
})