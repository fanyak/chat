const uiElements = {
    sendButton: '.send-button',
    paperclipButton: '.paperclip-button',
    messageInput: 'textarea.message-input',
    messageForm: 'form[name = "message-form"]',
    chatBoxMessages: '.chat-box .messages',
};
export function buildUiElements (obj) {  
   return Object.keys(uiElements)
    .reduce((acc, cur) => {
        acc[cur]= document.querySelector(uiElements[cur]);
        return acc;
    }, obj);
};

export function createTranslations (translations)  {
    return (uiElements) => {
        // set the placeholder accordin the translations in metadata
        uiElements.messageInput.placeholder = translations.typeMessage;
        return uiElements;
    }
}
