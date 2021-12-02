import { User } from './user.model.mjs';
import { Message } from './message.model.mjs';
import { default as buildUiElements } from './chat-ui.model.mjs';

const currentUser = new User();
let uiElements = {};

let messagesRequest = fetch('./data.json') ;

window.addEventListener("load", setUp);

function setUp() {
    buildUiElements(uiElements);
    createScrollObserver();
    messagesRequest.then((res) => res.json())
    .then(addMessages)
    .then(createTriggers);    
}

function createNewMessage(body) { 
    return new Message(body, currentUser);
}

function createTriggers(messages) {
    uiElements.sendButton.addEventListener('click', inputMessage.bind({ messages }) );
}

function addMessages(messages) {  
     const temp = document.createElement('div');         
     messages.forEach((message) => {
         const messageContainer = createMessageContainer(message);
         temp.appendChild(messageContainer);                    
     });
     window.requestAnimationFrame(() => {
         const existingMessages = uiElements.chatBoxMessages.firstChild;
         const _ = existingMessages && uiElements.chatBoxMessages.removeChild(existingMessages);                
         uiElements.chatBoxMessages.appendChild(temp.cloneNode(true)); 
     });
     return messages;
 }


function inputMessage(evt) {
    evt.preventDefault();                
    const formData = new FormData(uiElements.messageForm);
    const msg = formData.get("message").trim();
    if(!msg.length) {
        return;
    }
    // @ TODO sanitize message
    uiElements.messageInput.value = '';
    this.messages = this.messages.concat(createNewMessage(msg));
    addMessages(this.messages);    
}

function createMessageContainer(message) {
    const container = document.createElement("div");
    container.classList.add("d-flex");
    const icon = document.createElement("img")
    icon.setAttribute('src', message.user.avatar);
    icon.classList.add('avatar');
    container.appendChild(icon);
    const info = document.createElement('div');
    const messageInfo = document.createElement('div');
    const name = document.createElement('span');
    const nameNode = document.createTextNode(message.user.name);
    name.appendChild(nameNode);
    const date = document.createElement('span');
    const dateNode = document.createTextNode(message.content.dateSent);
    date.appendChild(dateNode);
    messageInfo.appendChild(name);
    messageInfo.appendChild(date);
    info.appendChild(messageInfo);
    const body = document.createElement('div');
    const textNode = document.createTextNode(message.content.body);
    body.appendChild(textNode);
    info.appendChild(body);
    container.appendChild(info);
    return container;
}



function createScrollObserver() {    
    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: false };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                // console.log(mutation)
                // console.log('A child node has been added or removed.');
                const scrollHeight = uiElements.chatBoxMessages.scrollHeight;
                uiElements.chatBoxMessages.scrollTo(0, scrollHeight);
            }
            // else if (mutation.type === 'attributes') {
            //     console.log('The ' + mutation.attributeName + ' attribute was modified.');
            // }
        }
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(uiElements.chatBoxMessages, config);
     // stop observing
    // observer.disconnect();
}
