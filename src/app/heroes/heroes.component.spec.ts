import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe('Heroes Component',()=>{
    let component:HeroesComponent;
    let HEROES;
    let mockHeroService;
    beforeEach(()=>{
        HEROES = [
            {id:1,name:'SpiderDude',strenght:8},
            {id:2,name:'Wonderful Woman',strenght:24},
            {id:3,name:'SuperDude',strenght:55}
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
        component = new HeroesComponent(mockHeroService);
    });

    describe('delete in test call',()=>{
        it('should remove indicated hero from the heroes list',()=>{
            //Tell the mock specific value sholuld be returned when this particular method called 
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            //Action
            component.delete(HEROES[2]);
            //Assert
            expect(component.heroes.length).toBe(2); 
        });

        it('should call deleteHero method',()=>{
            //Arrange
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
             //Action
             component.delete(HEROES[2]);
             //Assert
             expect(mockHeroService.deleteHero).toHaveBeenCalled(); 
        })
    }) 
})