import { Metadata } from './models/metadata.model.mjs';
import { SendResponse } from './models/sendResponse.model.mjs';
import  { HistoryResponse } from './models/historyResponse.model.mjs';

const baseRequestUrl = 'https://prerelease-admin.hoteliga.com/messaging/';
export function getMedataData() {
    return fetch(`${baseRequestUrl}initconversation`)
    .then(res => res.json())
    .then(data => new Metadata(data))
    .catch((_) => new Metadata());  // catch the errror from the endpoint not working
}

export function getMessageHistory(reservationId) {
    const body = JSON.stringify({ reservationId });
    const headers = createDefaultHeaders();
    return fetch(`${baseRequestUrl}gethistory`, { method: 'POST', body, headers })
    .then(res => res.json())
    .then(data => new HistoryResponse(data))
    .catch((_) => new HistoryResponse()); // catch the errror from the endpoint not working 
}

export function sendMessage(content, reservationId, sender) {
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
