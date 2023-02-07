import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuNavService } from '../menu-nav/menu-nav.service';

@Component({
	selector: 'app-mobile-quick-nav',
	templateUrl: './mobile-quick-nav.component.html',
	styleUrls: ['./mobile-quick-nav.component.scss']
})
export class MobileQuickNavComponent implements OnInit {

	constructor(
		private router: Router,
		public menuNavService: MenuNavService) { }

	ngOnInit(): void {
	}

	onNavigate(route: Route): void {
		if (!(route.children && route.children.length > 0)) {
			this.router.navigate([route.path]);
		}
	}
}
