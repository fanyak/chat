import { User } from './user.model.mjs';
import { Message } from './message.model.mjs';
import { default as buildUiElements } from './chat-ui.model.mjs';
import { pipe, createMessageContainer } from './utils.mjs'

const currentUser = new User();

let messagesRequest = fetch('https://fanyak.github.io/chat/data.json');

window.addEventListener("load", setUp);

function setUp() {
    const uiElements = pipe(buildUiElements, createScrollObserver)({});
    const addMessagesAndTriggers = pipe(addMessages, createTriggers);   
    messagesRequest
    .then((res) => res.json())
    .then( (messages) => addMessagesAndTriggers({messages, uiElements}) );    
}

function createNewMessage(body) { 
    return new Message(body, currentUser);
}

function createTriggers({messages, uiElements}) {
    uiElements.sendButton.addEventListener('click', inputMessage.bind({ messages }) );
}

function addMessages({messages, uiElements}) {  
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
    return {messages, uiElements};
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

function createScrollObserver({uiElements}) {   
    const { chatBoxMessages } = uiElements; 
    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: false };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                // console.log(mutation)
                // console.log('A child node has been added or removed.');
                const scrollHeight = chatBoxMessages.scrollHeight;
                chatBoxMessages.scrollTo(0, scrollHeight);
            }
            // else if (mutation.type === 'attributes') {
            //     console.log('The ' + mutation.attributeName + ' attribute was modified.');
            // }
        }
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(chatBoxMessages, config);
     // stop observing
    // observer.disconnect();
    return uiElements;
}
