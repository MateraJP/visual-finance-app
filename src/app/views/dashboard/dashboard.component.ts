import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DialogService } from '../../components/dialog/services/dialog.service';
import { DialogComponentConfig } from '../../components/dialog/models/dialog-component-config';
import { DialogConfig } from '../../components/dialog/models/dialog-config';
import { Cartesiano, Direction } from '../../components/touch-track/touch-track.directive';
import { Carteira } from '../../models/carteira.model';
import { SituacaoCarteira } from '../../models/enums/situacao-carteira.enum';
import { TipoCarteira } from '../../models/enums/tipo-carteira.enum';
import { Lancamento } from '../../models/lancamento.model';
import { CarteiraResource } from '../../resources/carteira.resource';
import { LancamentoComponent } from './lancamento/lancamento.component';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	providers: [
		{
		  provide: LOCALE_ID,
		  useValue: "en-US"
		},
        {
            provide:  DEFAULT_CURRENCY_CODE,
            useValue: 'BRL'
        },
	]
})
export class DashboardComponent implements OnInit {
	// TabConfiguration
	tabIndex = 0;
	tabs = [];
	transform: string = '';
	private pageSize = 20;

	// TouchConfiguration
	swapAction = new Subject<Direction>()
	moviment = new Subject<Cartesiano>()
	finish = new Subject<undefined>()

	constructor(private resource: CarteiraResource,
		private dialogService: DialogService) { }

	ngOnInit(): void {
		this.resource.getAll().subscribe({
			next: (res: Carteira[]) => {
				this.tabs = res;

				this.tabs.forEach(tab => {
					tab.pageIndex = 1;
					tab.loading = true;
					this.resource.lancamentos(tab.id, this.pageSize, tab.pageIndex).subscribe({
						next: (res: Lancamento[]) => {
							if (res.length < this.pageSize)
								tab.fullyLoaded = true;
							tab.lancamentos = res;
							tab.loading = false;
						}
					})
				})
			}
		})

		this.swapAction.subscribe({
			next: (direction) => {
				console.log('Swap ' + direction);
				if (direction == Direction.Left && this.tabIndex > 0) {
					this.tabIndex--;
				} else if (direction == Direction.Right && this.tabIndex < (this.tabs.length)){
					this.tabIndex++;
				}

				//TODO: Set transform: translateX(...px);
				this.transform = `translateX(-${window.innerWidth * this.tabIndex}px)`;
			}
		})

		this.moviment.subscribe({
			next: (move: Cartesiano) => {
				this.transform = `translateX(-${(window.innerWidth * this.tabIndex) - (move.x)}px)`;
				// console.log('Move ', touch.x, touch.y);
				// TODO: gentle move object on screen;
			}
		})

		this.finish.subscribe({
			next: () => {
				this.transform = `translateX(-${window.innerWidth * this.tabIndex}px)`;
			}
		})
	}

	onNew(e: MouseEvent, ): void {
		e.preventDefault();
		this.openModalComponent(this.tabs[this.tabIndex]);
	}

	cardSelect(e: MouseEvent, index: number): void {
		e.preventDefault();
		this.openModalComponent(this.tabs[this.tabIndex], this.tabs[this.tabIndex].lancamentos[index]);
	}

    openModalComponent(carteira: Carteira, lancamento: Lancamento = undefined): void {
		this.dialogService.showDialog(new DialogComponentConfig ({
			titulo: 'Lançamento',
			data: {
				model: lancamento,
				carteira: carteira
			},
			component: LancamentoComponent	
		}));
    } 

	onScroll(e: any, index:number): void {
		if ((e.target.clientHeight + e.target.scrollTop) >= e.target.scrollHeight) {

			if (this.tabs[index].loading || this.tabs[index].fullyLoaded) {
				return;
			} 

			this.tabs[index].pageIndex++;
			this.tabs[index].loading = true;
			setTimeout(() => {
				this.resource.lancamentos(this.tabs[index].id, this.pageSize, this.tabs[index].pageIndex).subscribe({
					next: (res: Lancamento[]) => {
						if (res.length < this.pageSize)
							this.tabs[index].fullyLoaded = true;
							
						this.tabs[index].lancamentos = this.tabs[index].lancamentos.concat(res);
							this.tabs[index].loading = false;
					}
				})
			}, 500);
		}
	}
}

