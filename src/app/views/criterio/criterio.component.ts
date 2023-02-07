import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carteira } from '../../models/carteira.model';
import { Criterio } from '../../models/criterio.model';
import { CarteiraResource } from '../../resources/carteira.resource';
import { CriterioResource } from '../../resources/criterio.resource';

@Component({
  selector: 'app-criterio',
  templateUrl: './criterio.component.html',
  styleUrls: ['./criterio.component.scss']
})
export class CriterioComponent implements OnInit {
	public list: Criterio[] = [];
	constructor(
	  private router: Router,
	  private resource: CriterioResource) { }
  
	ngOnInit(): void {
	  this.resource.getAll().subscribe({
		  next: (carteiras: Criterio[]) => {
			  this.list = carteiras
		  },
		  error: (err) => {
			  console.error(err);
		  } 
	  })
	}
  
	onScroll(evt): void {          
	  const el = evt.currentTarget;
	  clearTimeout(el._scrolling); // Cancel pending class removal
	  el.classList.add("is-scrolling"); // Add class 
	  el._scrolling = setTimeout(() => { // remove the scrolling class after 2500ms
		el.classList.remove("is-scrolling");
	  }, 2500);
	};
  
	onEdit(id: number): void {
	  this.router.navigate([`criterio/${id}`])
	}
  
	onNew(): void {
	  this.router.navigate([`criterio/new`])
	}
  }
  