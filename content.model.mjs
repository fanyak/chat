export class Content {
    constructor(body) {
        this.body = body;
        const dt = new Date();
        this.dateSent = `${dt.getFullYear()}/${dt.getMonth()+1}/${dt.getDate()}`;  
    }
}
