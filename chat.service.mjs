export function getMedataData() {
    return fetch('/endpoints/metadata.json')
    .then((res) => res.json())
    .catch(console.error);
}

export function sendMessage(content, reservationId) {
    return fetch ('/SendMessageRequest', { method: 'POST', 'body': { content, reservationId } })
    .then((_) => fetch('/endpoints/sendMessageResponse.json') )
    .then((res) => res.json())
    .catch(console.error());    
}
