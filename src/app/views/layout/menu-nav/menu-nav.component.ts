import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuNavService } from './menu-nav.service';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit {
    constructor(
		private router: Router,
        public menuNavService: MenuNavService
    ) { }

    ngOnInit(): void {
    }
 
    onClose(): void {   
        this.menuNavService.SlideOptions.ShowSubject.next(false); 
    }

	onNavigate(route: Route): void {
		if (!(route.children && route.children.length > 0))
			this.router.navigate([route.path]);
	}
}
