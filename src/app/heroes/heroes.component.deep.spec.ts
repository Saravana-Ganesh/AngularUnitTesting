import { HeroesComponent } from "./heroes.component"
import {ComponentFixture, TestBed} from '@angular/core/testing'
import { HeroComponent } from "../hero/hero.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Directive({
    selector:'[routerLink]',
    host:{'(click)':'onClick()'}
})
export class RouterLinkDirectiveStub{
    @Input('routerLink') linkParams:any;
    navigatedTo:any = null;
    onClick(){
        this.navigatedTo = this.linkParams;
    }
}
describe('Heroes Component (Deep Integration tests)',()=>{
    let fixture:ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES = [];

    beforeEach(()=>{
        HEROES = [
            {id:1,name:'SpiderDude',strenght:8},
            {id:2,name:'Wonderful Woman',strenght:24},
            {id:3,name:'SuperDude',strenght:55}
        ];
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
        TestBed.configureTestingModule({
            declarations:[
                HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers:[
                { provide:HeroService,useValue:mockHeroService }
            ],
            //schemas:[NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);
       
       

    });
 
    it('should render each hero as a HeroComponent',()=>{
        //Mocking a method belongs to Mock object
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        //To invoke lifecycle hoooks
        fixture.detectChanges();    

        let heroComponentDebugElement = fixture.debugElement.queryAll(By.directive(HeroComponent))
        expect(heroComponentDebugElement.length).toBe(3);
        expect(heroComponentDebugElement[0].componentInstance.hero.name).toBe('SpiderDude')

        for(let i=0 ;i<heroComponentDebugElement.length;i++){
                expect(heroComponentDebugElement[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    it(`should call on heroService.deleteHero when the Hero Component's
     delete button is clicked`,()=>{
        spyOn(fixture.componentInstance,'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
        heroComponents[0].query(By.css('button')).triggerEventHandler('click',{stopPropagation:()=>{}});
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0])
     });

     it(`should call on heroService.deleteHero without clicking Hero Component's
     delete button`,()=>{
        spyOn(fixture.componentInstance,'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
         (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

         expect(fixture.componentInstance.delete).toHaveBeenCalledOnceWith(HEROES[0])

         //Directly trigger event in parent component by using fixture
        // heroComponents[0].triggerEventHandler('delete',null);
        expect(fixture.componentInstance.delete).toHaveBeenCalledOnceWith(HEROES[0])

     });

     /*
      The below it finction won't comes under deep integration testing..We just wrote
     */
    it('should add a new hero to the hero list when the add button is clicked',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name = "Mr.Ice";
        mockHeroService.addHero.and.returnValue(of({id:5,name:name,strength:4}));
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        inputElement.value = name;
        addButton.triggerEventHandler('click',null);

        fixture.detectChanges();

        const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
        expect(heroText).toContain(name);

    });
});