// eslint-disable-next-line no-undef
const socket = io();

socket.on('message', message => {
    console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', event => {
    event.preventDefault();
    const message = event.target.elements.message.value;
    socket.emit('sendMessage', message);
});

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude, } = position.coords;
        socket.emit('sendLocation', { latitude, longitude, });
    });
});
