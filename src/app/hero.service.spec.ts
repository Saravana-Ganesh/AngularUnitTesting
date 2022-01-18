import { inject,TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service";
import { MessageService } from './message.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { inherits } from "util";

describe('HeroService',()=>{
    let mockMessageService = jasmine.createSpyObj(['add']);
    let httpTestingController: HttpTestingController;
    let heroService;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule
            ],
            providers:[
                HeroService,
                {provide:MessageService,useValue:mockMessageService}
            ]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        heroService = TestBed.inject(HeroService);
    });
    /*
     Instead of  TestBed.inject() method we can also write like the below lines
    describe('getHero',()=>{
        it('should call with the correct url',inject([HttpTestingController,HeroService],
            (httpTestingController:HttpTestingController,heroService:HeroService)=>{
                heroService.getHero(4);
                
            }))
    }) */
    describe('getHero',()=>{
        it('should call with the correct url',()=>{
            //Call getHero method
            heroService.getHero(4).subscribe();
            //heroService.getHero(3).subscribe();
            //test that url was correct
            const req = httpTestingController.expectOne('api/heroes/4');
            
            req.flush({id:1,name:'SpiderDude',strenght:8});

           // httpTestingController.verify();
        })
    })
})