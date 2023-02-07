import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuMessageService } from '../menu-message/menu-message.service';
import { MenuNavService } from '../menu-nav/menu-nav.service';
import { MenuProfileService } from '../menu-profile/menu-profile.service';
import { MenuMobileService } from './menu-mobile.service';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss']
})
export class MenuMobileComponent implements OnInit {
    constructor(
		private router: Router,
        private menumessageService: MenuMessageService,
        public menuProfileService: MenuProfileService,
        public menuMobileService: MenuMobileService,
		public menuNavService: MenuNavService
    ) { }

    ngOnInit(): void {
    }

    onNotificacao(): void {
        this.menumessageService.SlideOptions.ShowSubject.next(true);
    }

    onProfile(): void {
        this.menuProfileService.SlideOptions.ShowSubject.next(true);
    }

	onNavigate(route: Route): void {
		if (!(route.children && route.children.length > 0)){
			this.router.navigate([route.path]);
			this.onClose();
		}
	}

    onClose(): void {   
        this.menuMobileService.SlideOptions.ShowSubject.next(false);
    }
}
