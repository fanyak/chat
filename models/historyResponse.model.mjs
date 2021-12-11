import { Message } from "./message.model.mjs";

export class HistoryResponse {
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
