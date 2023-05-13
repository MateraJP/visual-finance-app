import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carteira } from '../../models/carteira.model';
import { SituacaoCarteira } from '../../models/enums/situacao-carteira.enum';
import { TipoCarteira } from '../../models/enums/tipo-carteira.enum';
import { CarteiraResource } from '../../resources/carteira.resource';

@Component({
	selector: 'app-carteira',
	templateUrl: './carteira.component.html',
	styleUrls: ['./carteira.component.scss']
})
export class CarteiraComponent implements OnInit {
	public list: Carteira[] = [];

	situacaoCarteira = SituacaoCarteira;
	tipoCarteira = TipoCarteira;

	constructor(
		private router: Router,
		private resource: CarteiraResource) { }

	ngOnInit(): void {
		this.resource.getAll().subscribe({
			next: (carteiras: Carteira[]) => {
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

	onEdit(item: any): void {
		this.router.navigate([`carteira/${item.id}`])
	}

	onNew(): void {
		this.router.navigate([`carteira/new`])
	}

	remover(e: MouseEvent, index: number): void {
		e.stopPropagation();
		this.resource.remove(this.list[index].id).subscribe({
			next: () => {
				this.list.splice(index, 1);
			}
		});
	}

	ativar(e: MouseEvent, index: number): void {
		e.stopPropagation();
		this.resource.ativar(this.list[index].id).subscribe({
			next: (res: Carteira) => {
				this.list[index] = res;
			}
		});
	}
}
