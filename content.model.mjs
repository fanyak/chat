export class Content {
    constructor(body) {
        this.body = body;
        // const dt = new Date();
        // this.dateSent = `${dt.getFullYear()}/${dt.getMonth()+1}/${dt.getDate()}`; 
        // const hour = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours(); 
        // const minutes = dt.getMinutes() < 10 ?  `0${dt.getMinutes()}` : dt.getMinutes();
        this.dateSent = Math.floor(Date.now()/1000); 
    }
}
