import { Message } from './models/message.model.mjs';
import { buildUiElements, createTranslations } from './chat-ui.model.mjs';
import { pipe, createMessageContainer, createDateDivider, isSameDay } from './utils.mjs';
import { getMedataData, sendMessage, getMessageHistory } from './chat.service.mjs';


window.addEventListener("load", setUp);
// active user is the the property
const sender = 1;

async function setUp() {
    const metadata = await getMedataData();
    const uiElements = pipe(buildUiElements, createTranslations(metadata.translations), createScrollObserver)({});
    const addMessagesAndTriggers = pipe(addMessages, createTriggers);   
    getMessageHistory(metadata.reservationId)
    .then((messageHistory) => addMessagesAndTriggers({ messageHistory, uiElements, metadata }) )
    .catch(console.error);
}

function createNewMessage(content) { 
    const timeStamp = new Date();
    return new Message({ content, timeStamp, sender });
}

function createNewErrorMessage(content) { 
    const message = createNewMessage(content);
    const errorFlag = true;
    return new Message({ ...message, errorFlag });
}

function createTriggers({messageHistory, uiElements, metadata}) {
    const callback = inputMessage.bind({ messageHistory, uiElements, metadata});
    uiElements.sendButton.addEventListener('click', callback );
    uiElements.messageInput.addEventListener('keydown', (evt) =>  {
        if(evt.keyCode === 13 && !evt.ctrlKey) {
            callback(evt);
        }
        if(evt.keyCode === 13 && evt.ctrlKey) {
            uiElements.messageInput.value += '\n';
        }
    });
    //@ TODO add callback when clicking the paperclip button
    uiElements.paperclipButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        console.log(evt);
    });
}

function addMessages({messageHistory, uiElements, metadata}) {  
    const temp = document.createElement('div'); 
    const { records } = messageHistory;
    let currentDivider;       
    records.forEach((message) => {
        const dateSent = message.timeStamp;
         if(!currentDivider || !isSameDay(currentDivider, dateSent)) {
             const dateNode = moment(new Date(dateSent).toISOString()).format(metadata.dateFormat);
             temp.appendChild(createDateDivider(dateNode));
             currentDivider = dateSent;
         }
         const messageContainer = createMessageContainer(message, metadata);
         temp.appendChild(messageContainer);                    
    });
    window.requestAnimationFrame(() => {
        const existingMessages = uiElements.chatBoxMessages.firstChild;
        const _ = existingMessages && uiElements.chatBoxMessages.removeChild(existingMessages);                
        uiElements.chatBoxMessages.appendChild(temp.cloneNode(true)); 
    });
    return {messageHistory, uiElements, metadata};
}

function inputMessage(evt) {
    evt.preventDefault();                
    const formData = new FormData(this.uiElements.messageForm);
    // @ TODO sanitize message
    const msg = formData.get("message").trim();
    if(!msg.length) {
        return;
    }
    // cleare message input field
    this.uiElements.messageInput.value = '';

    // send message
    sendMessage(msg, this.metadata.reservationId, sender).then( ({ records }) => {
        if (records.success) {
            this.messageHistory.records = this.messageHistory.records.concat(createNewMessage(msg));
        } else {
            this.messageHistory.records = this.messageHistory.records.concat(createNewErrorMessage(this.metadata.translations.errorOccured));
        }
        addMessages(this);
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
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(chatBoxMessages, config);

    //@TODO - determine the time when we stop observing
    // observer.disconnect();

    return uiElements;
}
