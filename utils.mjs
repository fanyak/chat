
export const pipe = (...fns) => {
    return (input) => fns.reduce((acc,cur) => {
        return cur(acc);
    }, input);    
}

export function createMessageContainer(message) {
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
};
