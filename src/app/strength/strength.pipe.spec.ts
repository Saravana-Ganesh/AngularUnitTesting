import { StrengthPipe } from "./strength.pipe";

describe('Strength Pipe',()=>{
    it('should display weak if strength is 5',()=>{
        //Arrange
        let pipe = new StrengthPipe();
        //Act 
        let val = pipe.transform(5);
        //Assert
        expect(val).toEqual(5 + " (weak)");

    });

    it('should display unbelievable if strength is 20',()=>{
        //Arrange
        let pipe = new StrengthPipe();
        //Act 
        let val = pipe.transform(20);
        //Assert
        expect(val).toEqual(20 + " (unbelievable)");

    });

    it('should display string if strength is 10',()=>{
        //Arrange
        let pipe = new StrengthPipe();
        //Act 
        let val = pipe.transform(10);
        //Assert
        expect(val).toEqual(10 + " (strong)");

    });
});