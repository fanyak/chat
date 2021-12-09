import { User } from './user.model.mjs';
import { Message } from './message.model.mjs';
import { Metadata } from './metadata.model';
import { default as buildUiElements } from './chat-ui.model.mjs';
import { pipe, createMessageContainer, createDateDivider, isSameDay} from './utils.mjs';
import { getMedataData, sendMessage } from './chat.service.mjs';

const currentUser = new User();

let messagesRequest = fetch('https://fanyak.github.io/chat/data.json');


window.addEventListener("load", setUp);

async function setUp() {
    const { dateFormat, propertyName, reservationId } = await getMedataData();
    const metadata = new Metadata(dateFormat, propertyName, reservationId);
    const uiElements = pipe(buildUiElements, createScrollObserver)({});
    const addMessagesAndTriggers = pipe(addMessages, createTriggers);   
    messagesRequest
    .then((res) => res.json())
    .then((messages) => addMessagesAndTriggers({messages, uiElements, metadata}) )
    .catch(console.log);
}

function createNewMessage(body) { 
    return new Message(body, currentUser);
}

function createTriggers({messages, uiElements, metadata}) {
    const callback = inputMessage.bind({ messages, uiElements, metadata});
    uiElements.sendButton.addEventListener('click', callback );
    uiElements.messageInput.addEventListener('keydown', (evt) =>  {
        if(evt.keyCode === 13 && !evt.ctrlKey) {
            callback(evt);
        }
        if(evt.keyCode === 13 && evt.ctrlKey) {
            uiElements.messageInput.value += '\n';
        }
    });
}

function addMessages({messages, uiElements, metadata}) {  
    const temp = document.createElement('div'); 
    let currentDivider;       
    messages.forEach((message) => {
        const dateSent = message.content.dateSent;
         if(!currentDivider || !isSameDay(currentDivider, dateSent)) {
             temp.appendChild(createDateDivider(dateSent));
             currentDivider = dateSent;
         }
         const messageContainer = createMessageContainer(message, currentUser);
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
    const formData = new FormData(this.uiElements.messageForm);
    const msg = formData.get("message").trim();
    if(!msg.length) {
        return;
    }
    // @ TODO sanitize message
    this.uiElements.messageInput.value = '';
    sendMessage(msg, this.reservationId).then(({success}) => {
        if(success) {
            this.messages = this.messages.concat(createNewMessage(msg));
            addMessages(this);  
        }
    })
      
}

function createScrollObserver(uiElements) {   
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
