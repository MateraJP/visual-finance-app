import { Injectable } from '@angular/core';
import { NavigationEnd, Route, Router, Routes } from '@angular/router';

import { SlideOptions } from '../../../components/side-nav/slide-options.model';

@Injectable({
    providedIn: 'root'
})
export class MenuNavService {
	private menuRoutes : Route[] = [];
    private slideOptions = new SlideOptions();
    get SlideOptions(): SlideOptions {
        return this.slideOptions;
    }

    constructor(private router: Router) 
	{ 
		// TODO: Concatenar urls e deixar pronto para o link no menu
		// Monta dois níveis para o menu
		this.router.config.filter(route => route.children && route.children.length > 0)
		 	.forEach(route => this.ListRoutes(route)
			.forEach(r => {this.menuRoutes.push(r);})
		);

		this.router.events.subscribe({
			next: (e: NavigationEnd) => {
				if (e instanceof(NavigationEnd)){

					this.menuRoutes.forEach(route => {
						route.data.selected = e.urlAfterRedirects.includes(route.path)
					});
				}
			}
		})
	}

	public getList(): Route[] {    
		return this.menuRoutes;
	} 

	private ListRoutes(route: Route, path?: string): Route[] {
		let response: Route[] = [];
		if(route.data && (route.data.showOnMenu || (route.data.title && route.data.title.length > 0 && route.children && route.children.length > 0 ))) {
			let thispath = (path ? path + '/' + route.path : (route.path))
			let routeClean = Object.create(route);
			routeClean.thispath = thispath;
			if (routeClean.children && routeClean.children.length > 0)
				routeClean.children = routeClean.children.filter(child => child.data && (child.data.showOnMenu || (child.data.title && child.data.title.length > 0 && child.children && child.children.length > 0 )));
			//TODO: set child path
			response.push(routeClean)
		}
		else if (route.children) {
			route.children
				.forEach(child => this.ListRoutes(child, path)
				.forEach(routeClean => response.push(routeClean))
			)
		}
			
		return response
	}
}
