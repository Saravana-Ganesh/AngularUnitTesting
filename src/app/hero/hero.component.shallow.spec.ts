import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component"

describe('HeroComponent (Shallow tests)',()=>{
    let fixture:ComponentFixture<HeroComponent>;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas:[NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have the Correct Hero',()=>{
        fixture.componentInstance.hero = {id:1,name:'SuperDude',strength:3};
       // fixture.detectChanges();
        expect(fixture.componentInstance.hero.name).toBe('SuperDude');
    });

    it('should render the hero name in anchor tag',()=>{
        fixture.componentInstance.hero = {id:1,name:'SuperDude',strength:3};
        fixture.detectChanges();
        //debugElement Approach
        let debugElementAnchorTag = fixture.debugElement.query(By.css('a'));
        expect(debugElementAnchorTag.nativeElement.textContent).toContain('SuperDude');
        //nativeElementApproach
        //expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    });
})