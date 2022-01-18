import { MessageService } from "./message.service";

describe('MessageService',()=>{
    let messageService:MessageService;
    it('should have no messages to start',()=>{
        messageService = new MessageService();        
        expect(messageService.messages.length).toBe(0);
    })

    it('should add a message when add is called',()=>{
        //Arrange
        messageService = new MessageService(); 
        messageService.add('first message');

        //Assert
        expect(messageService.messages.length).toBe(1);
    })

    it('should remove all messages when clear is called',()=>{
        //Arrange
        messageService = new MessageService();
        messageService.add('message 1');
        //Act
        messageService.clear();
        //Assert
        expect(messageService.messages.length).toBe(0);
    })
}
);