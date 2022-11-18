// eslint-disable-next-line no-undef
const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;

socket.on('message', message => {
    console.log(message);
    // eslint-disable-next-line no-undef
    const html = Mustache.render(messageTemplate, { message, });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', url => {
    console.log(url);
    // eslint-disable-next-line no-undef
    const html = Mustache.render(locationMessageTemplate, { url, });
    $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', event => {
    event.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled');

    const message = event.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        if (error) {
            return console.log(error);
        }

        console.log('Message delivered');
    });
});

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    $sendLocationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude, } = position.coords;
        socket.emit('sendLocation', { latitude, longitude, }, () => {
            $sendLocationButton.removeAttribute('disabled');
            console.log('Location shared!');
        });
    });
});
