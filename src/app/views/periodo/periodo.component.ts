import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Periodo } from '../../models/periodo.model';
import { PeriodoResource } from '../../resources/periodo.resource';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss']
})
export class PeriodoComponent implements OnInit {
	public list: Periodo[] = [];
	constructor(
	  private router: Router,
	  private resource: PeriodoResource) { }
  
	ngOnInit(): void {
	  this.resource.getAll().subscribe({
		  next: (carteiras: Periodo[]) => {
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
	  this.router.navigate([`periodo/${id}`])
	}
  
	onNew(): void {
	  this.router.navigate([`periodo/new`])
	}
  }
  