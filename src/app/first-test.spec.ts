describe('My first Test',()=>{
    let sut;
    beforeEach(()=>{
        sut = {};        
    })

    it('Should be true if true',()=>{
        //Arrange || Initial State
        sut.a = false;
        //Act     || Change the State
        sut.a = true;
        //assert  || Check whether the changed state is correct
        expect(sut.a).toBe(true);

    })

});
 