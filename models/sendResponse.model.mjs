export class SendResponse {
    // @TODO remove the default after adding the working endpoints
    constructor({ records, totalRecordsCount, totalFilteredRecordsCount, newId, isSuccess, message } = hardcoded) {
       this.records = records;
       this.totalRecordsCount = totalRecordsCount;
       this.totalFilteredRecordsCount = totalFilteredRecordsCount;
       this.newId = newId;
       this.isSuccess = isSuccess;
       this.message = message;
    }
}

//////// @TODO remove hardcoded
const hardcoded = {
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

