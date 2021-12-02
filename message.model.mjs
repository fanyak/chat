import { Content } from './content.model.mjs';

export class Message {
    constructor(body, user) {
       this.user = user;  
       this.content = new Content(body);    
    }
}
