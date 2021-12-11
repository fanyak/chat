export class Message {
    constructor({ id, content, sender, timeStamp, errorFlag }){
        this.id = id;
        this.content = content;
        this.sender = sender;
        this.timeStamp = timeStamp;
        this.errorFlag = errorFlag;
    }
};
