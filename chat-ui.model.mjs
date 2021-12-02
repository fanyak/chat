const uiElements = {
    sendButton: '.send-button',
    messageInput: 'input.message-input',
    messageForm: 'form[name = "message-form"]',
    chatBoxMessages: '.chat-box .messages',
};
export default function (obj) {  
   return Object.keys(uiElements)
    .reduce((acc, cur) => {
        acc[cur]= document.querySelector(uiElements[cur]);
        return acc;
    }, obj);
};
