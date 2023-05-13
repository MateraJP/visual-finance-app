import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MenuMessageService } from './menu-message/menu-message.service';
import { MenuMobileService } from './menu-mobile/menu-mobile.service';
import { MenuNavService } from './menu-nav/menu-nav.service';
import { MenuProfileService } from './menu-profile/menu-profile.service';
import { Observable, Observer, Subject, observable, of } from 'rxjs';
import { SlideOptions } from '../../components/side-nav/slide-options.model';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'] 
})
export class LayoutComponent implements OnInit {
    brandImage = environment.images.brand; 
    title = environment.texts.title;
    toggle = '';
	teste: Observable<any>;

    slideOptionsMobile = new SlideOptions();
    constructor(
        public menuMessageService: MenuMessageService, 
        public menuProfileService: MenuProfileService,
        public menuMobileService: MenuMobileService,
        public menuNavService: MenuNavService
    ) { }

    ngOnInit(): void { 

        this.menuMessageService.SlideOptions.ShowSubject.subscribe({
            next:(action: boolean) => {
                if (this.toggle == 'message' && !action)
                    this.toggle = '';
            }
        })

        this.menuProfileService.SlideOptions.ShowSubject.subscribe({
            next:(action: boolean) => {
                if (this.toggle == 'profile' && !action)
                    this.toggle = '';
            }
        })

        this.menuMobileService.SlideOptions.ShowSubject.subscribe({
            next:(action: boolean) => {
                if (this.toggle == 'mobile' && !action)
                    this.toggle = '';
            }
        }) 

		this.menuNavService.SlideOptions.delay = 100;
		this.menuNavService.SlideOptions.direction = 'left';
        this.menuNavService.SlideOptions.ShowSubject.subscribe({
            next:(action: boolean) => {
                if (this.toggle == 'nav' && !action)
                    this.toggle = '';
            }
        }) 

		this.teste = new Observable((observer: Observer<any>) => {
			observer.next(console.log('observe me!'));
			observer.complete();
		})
    }

	testeCallback() {
		console.log('call me!');
	}

    toggleMenu(path: string) {
        if (this.toggle == path)
            this.toggle = '';
        else 
            this.toggle = path;
        this.sliderMenu(this.toggle);
    }

    scrollMe(e: any) {
        window.dispatchEvent(new Event('customScrollBy', { bubbles: true }));
    }

    private sliderMenu(menu: string) {
        switch(menu) {
            case 'message':
                this.menuMessageService.SlideOptions.ShowSubject.next(true);
                this.menuProfileService.SlideOptions.ShowSubject.next(false);
                this.menuMobileService.SlideOptions.ShowSubject.next(false);
                break;
            case 'profile':
                this.menuMessageService.SlideOptions.ShowSubject.next(false);
                this.menuProfileService.SlideOptions.ShowSubject.next(true);
                this.menuMobileService.SlideOptions.ShowSubject.next(false);
                break;
            case 'mobile':
                this.menuMessageService.SlideOptions.ShowSubject.next(false);
                this.menuProfileService.SlideOptions.ShowSubject.next(false);
                this.menuMobileService.SlideOptions.ShowSubject.next(true);
                break;
            default:
                this.menuMessageService.SlideOptions.ShowSubject.next(false);
                this.menuProfileService.SlideOptions.ShowSubject.next(false);
                this.menuMobileService.SlideOptions.ShowSubject.next(false);
                break;
        }
    }
}
