
export const pipe = (...fns) => {
    return (input) => fns.reduce((acc,cur) => {
        return cur(acc);
    }, input);    
}

export function createMessageContainer(message) {
    const container = document.createElement("div");
    container.classList.add("d-flex");
    container.classList.add("message-container");
    const icon = document.createElement("img")
    icon.setAttribute('src', message.user.avatar);
    icon.classList.add('avatar');
    container.appendChild(icon);
    const info = document.createElement('div');
    const messageInfo = document.createElement('div');
    const user = document.createElement('span');
    user.classList.add("user");
    const nameNode = document.createTextNode(message.user.name);
    user.appendChild(nameNode);
    const date = document.createElement('span');
    date.classList.add("date");
    const [time] = new Date(message.content.dateSent*1000).toTimeString().split(' ')
    const [hour, minute] = time.split(":");
    const dateNode = document.createTextNode(`${hour}:${minute}`);
    date.appendChild(dateNode);
    messageInfo.appendChild(user);
    messageInfo.appendChild(date);
    info.appendChild(messageInfo);
    const body = document.createElement('div');
    body.classList.add('message-body');
    const textNode = document.createTextNode(message.content.body);
    body.appendChild(textNode);
    info.appendChild(body);
    container.appendChild(info);
    return container;
};

export function createDateDivider(dataSent) {
    const div = document.createElement('div');
    div.classList.add('date-divider');
    const [weekDay, month, day, year] = new Date(dateSent*1000).toString().split(' ')
    const date = document.createTextNode(`${month} ${day}, ${year}`);
    const dateNode = document.createTextNode(date);
    div.append(dateNode);
    return div;
}

export function isSameDay(t1, t2) {
    const d1 = new Date(t1*1000);
    const d2 = new Date(t2*1000);
    return  d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}
