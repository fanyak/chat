import { Translations  } from "./translations.model.mjs";
export class Metadata {
    // @ TODO remove hardcoded default value
    constructor( { records, totalRecordsCount, totalFilteredRecordsCount, newId, isSuccess, message } = hardcoded ) {
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
const hardcoded = {
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
