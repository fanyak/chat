(function () {
    'use strict';

    class Message {
        constructor({ id, content, sender, timeStamp, errorFlag }){
            this.id = id;
            this.content = content;
            this.sender = sender;
            this.timeStamp = timeStamp;
            this.errorFlag = errorFlag;
        }
    }

    const uiElements = {
        sendButton: '.send-button',
        paperclipButton: '.paperclip-button',
        messageInput: 'textarea.message-input',
        messageForm: 'form[name = "message-form"]',
        chatBoxMessages: '.chat-box .messages',
    };
    function buildUiElements (obj) {  
       return Object.keys(uiElements)
        .reduce((acc, cur) => {
            acc[cur]= document.querySelector(uiElements[cur]);
            return acc;
        }, obj);
    }
    function createTranslations (translations)  {
        return (uiElements) => {
            // set the placeholder accordin the translations in metadata
            uiElements.messageInput.placeholder = translations.typeMessage;
            return uiElements;
        }
    }

    const pipe = (...fns) => {
        return (input) => fns.reduce((acc,cur) => {
            return cur(acc);
        }, input);    
    };

    function createMessageContainer(message, metadata) {
        const container = document.createElement("div");
        container.classList.add("message-container");
        if(message.sender == 1) {
            container.classList.add("current-user");  
            const icon = document.createElement("div");
            const initials = createInitials(metadata.propertyName);
            const iconText = document.createTextNode(initials.toUpperCase());
            icon.appendChild(iconText);
            icon.classList.add('avatar');
            container.appendChild(icon);
        }   
        const info = document.createElement('div');
        const messageInfo = document.createElement('div');
        const user = document.createElement('span');
        user.classList.add("user");
        const nameNode = document.createTextNode(metadata.propertyName);
        user.appendChild(nameNode);
        const date = document.createElement('span');
        date.classList.add("date");
        const [time] = new Date(message.timeStamp).toTimeString().split(' ');
        const [hour, minute, seconds] = time.split(":");
        const dateNode = document.createTextNode(`${hour}:${minute}`);
        date.appendChild(dateNode);
        messageInfo.appendChild(user);
        messageInfo.appendChild(date);
        info.appendChild(messageInfo);
        const body = document.createElement('div');
        body.classList.add('message-body');
        const textNode = document.createTextNode(message.content);    
        body.appendChild(textNode);
        if (message.errorFlag) {
            body.classList.add('has-error');
        }
        info.appendChild(body);
        container.appendChild(info);
        return container;
    }
    function createDateDivider(dateNode, dateSent, dateFormat) {
        const div = document.createElement('div');
        div.classList.add('date-divider');
        // const [weekDay, month, day, year] = new Date(dateSent).toString().split(' ')
        const text = document.createTextNode(dateNode);
        div.append(text);
        return div;
    }

    function isSameDay(t1, t2) {
        const d1 = new Date(t1);
        const d2 = new Date(t2);
        return  d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
    }

    function createInitials(propertyName) {
        return propertyName.split(' ')
        .map((str, index, array) =>  {
            if(array.length > 1) {
               return str.substring(0, 1);
            }
            return str.substring(0, 2);
        }).join();
    }

    class Translations {
        constructor({ type_message, send, error_occured }) {
            this.typeMessage = type_message;
            this.send = send;
            this.errorOccured = error_occured;
        }
    }

    class Metadata {
        // @ TODO remove hardcoded default value
        constructor( { records, totalRecordsCount, totalFilteredRecordsCount, newId, isSuccess, message } = hardcoded$2 ) {
            const { dateFormat, propertyName, reservationId, translations } = records;  
            this.dateFormat = dateFormat;
            this.propertyName = propertyName;
            this.reservationId = reservationId;
            this.translations = new Translations(translations);
            this.totalRecordsCount = totalRecordsCount;
            this.totalFilteredRecordsCount = totalFilteredRecordsCount;
            this.newId = newId;
            this.isSuccess = isSuccess;
            this.message = message;
        }
    }

    ///////// @ TODO REMOVE HARDADED VALUE
    const hardcoded$2 = {
        "records": {
            "dateFormat": "yyyy-MM-dd",
            "propertyName": "fitur",
            "reservationId": 123456,
            "translations": {
                "type_message": "Type your message here",
                "send": "Send",
                "error_occured": "An error occurred. Please try again later"
            }
        },
        "totalRecordsCount": 1,
        "totalFilteredRecordsCount": 1,
        "newId": 0,
        "isSuccess": true,
        "message": ""
    };

    class SendResponse {
        // @TODO remove the default after adding the working endpoints
        constructor({ records, totalRecordsCount, totalFilteredRecordsCount, newId, isSuccess, message } = hardcoded$1) {
           this.records = records;
           this.totalRecordsCount = totalRecordsCount;
           this.totalFilteredRecordsCount = totalFilteredRecordsCount;
           this.newId = newId;
           this.isSuccess = isSuccess;
           this.message = message;
        }
    }

    //////// @TODO remove hardcoded
    const hardcoded$1 = {
        "records": {
            "messageId": "84505",
            "success": true
        },
        "totalRecordsCount": 1,
        "totalFilteredRecordsCount": 1,
        "newId": 0,
        "isSuccess": true,
        "message": ""
    };

    class HistoryResponse {
        constructor({ records, totalRecordsCount, totalFilteredRecordsCount, newId, isSuccess, message } = hardcoded) {
            this.records = records.map((record) => new Message(record));
            this.totalRecordsCount = totalRecordsCount;
            this.totalFilteredRecordsCount = totalFilteredRecordsCount;
            this.newId = newId;
            this.isSuccess = isSuccess;
            this.message = message;
         }
    }


    ////////// @TODO remove hardcoded
    const hardcoded = {
        "records": [
            {
                "id": "123",
                "content": "Hello there!",
                "sender": 1,
                "timeStamp": "12/10/2021 10:59:00 AM"
            },
            {
                "id": "1234",
                "content": "How are you today?",
                "sender": 2,
                "timeStamp": "12/10/2021 10:59:00 AM"
            },
            {
                "id": "84505",
                "content": "Good day to you!",
                "sender": 1,
                "timeStamp": "12/11/2021 8:10:00 AM"
            }
        ],
        "totalRecordsCount": 1,
        "totalFilteredRecordsCount": 1,
        "newId": 0,
        "isSuccess": true,
        "message": ""
    };

    const baseRequestUrl = 'https://prerelease-admin.hoteliga.com/messaging/';
    function getMedataData() {
        return fetch(`${baseRequestUrl}initconversation`)
        .then(res => res.json())
        .then(data => new Metadata(data))
        .catch((_) => new Metadata());  // catch the errror from the endpoint not working
    }

    function getMessageHistory(reservationId) {
        const body = JSON.stringify({ reservationId });
        const headers = createDefaultHeaders();
        return fetch(`${baseRequestUrl}gethistory`, { method: 'POST', body, headers })
        .then(res => res.json())
        .then(data => new HistoryResponse(data))
        .catch((_) => new HistoryResponse()); // catch the errror from the endpoint not working 
    }

    function sendMessage(content, reservationId, sender) {
        const body = JSON.stringify({ content, reservationId, sender });
        const headers = createDefaultHeaders();
        return fetch (`${baseRequestUrl}send`, { method: 'POST', body, headers })
        .then(res => res.json())
        .then(data => new SendResponse(data))
        .catch((_) => new SendResponse()); // catch the errror from the endpoint not working   
    }


    function createDefaultHeaders() {
        const reqheaders = new Headers();
        reqheaders.append("Content-Type", "application/json");
        return reqheaders;
    }

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
            existingMessages && uiElements.chatBoxMessages.removeChild(existingMessages);                
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
        });
          
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

}());
