
export const pipe = (...fns) => {
    return (input) => fns.reduce((acc,cur) => {
        return cur(acc);
    }, input);    
}

export function createMessageContainer(message, metadata) {
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
    const [time] = new Date(message.timeStamp).toTimeString().split(' ')
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
};

export function createDateDivider(dateNode, dateSent, dateFormat) {
    const div = document.createElement('div');
    div.classList.add('date-divider');
    // const [weekDay, month, day, year] = new Date(dateSent).toString().split(' ')
    const text = document.createTextNode(dateNode);
    div.append(text);
    return div;
}

export function isSameDay(t1, t2) {
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
