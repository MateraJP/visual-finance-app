import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Observer, Subject } from 'rxjs';
import { Carteira } from '../../../models/carteira.model';
import { SituacaoCarteira, SituacaoCarteiraEnum } from '../../../models/enums/situacao-carteira.enum';
import { TipoCarteira } from '../../../models/enums/tipo-carteira.enum';
import { CarteiraResource } from '../../../resources/carteira.resource';
import { NotificationService } from '../../../services/notification.service';
import { ActionBtnModel } from '../../../components/action-btn/action-btn.model';

@Component({
  selector: 'app-carteira-form',
  templateUrl: './carteira-form.component.html',
  styleUrls: ['./carteira-form.component.scss']
})
export class CarteiraFormComponent implements OnInit {
	recordId: string = '';
	isInsert: boolean = true;
	title: string = 'Nova Carteira';
	record: Carteira = new Carteira();
	form!: FormGroup;
	loading = false;
	submitted = false;

	situacaoCarteira = SituacaoCarteira;
	tipoCarteira = TipoCarteira;

	btnVoltar: ActionBtnModel;
	btnExcluir: ActionBtnModel;
	btnNovo: ActionBtnModel;
	btnSalvar: ActionBtnModel;

	changeSubject = new Subject<any>();
	showData: boolean = false;

  	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private resource: CarteiraResource,
		private notificationService: NotificationService

	) { 

		this.changeSubject.subscribe({
			next: (res) => {
				this.showData = (res.key == 'CartaoCredito');
			}
		})
	} 

  	ngOnInit(): void {
		this.form = new FormBuilder().group({
			id: [0],
			nome: ['', Validators.required],
			tipoCarteira: ['', Validators.required],
			situacao: [SituacaoCarteiraEnum.EmElaboracao],
			cor: ['#555555'], 
			data: [new Date()]
		});

		this.route.params.subscribe({
			next: (params: Params) => {
				if (params['id'] && params['id'].length > 0) {
					this.recordId = params['id'];
					this.isInsert = false;  
					this.onLoad(); 
				}
			}
		});

		this.btnVoltar = new ActionBtnModel({
			size: 'default',
			type: 'secondary',
			rightIcon: 'fas fa-chevron-left',
			label: 'Voltar',
			callback: this.goBack.bind(this)
		});

		this.btnExcluir = new ActionBtnModel({
			size: 'default',
			type: 'danger',
			rightIcon: 'fas fa-trash',
			label: 'Excluír',
			observable: new Observable((observer: Observer<any>) => {
				this.resource.remove(this.recordId).subscribe({
					next: (res: boolean) => {
						//todo navegar
						this.goBack();
						observer.next(res);
					},
					error: (err: any) => {
						//todo mensagem erro
						observer.error(err);
						observer.complete();
					},
					complete: () => {
						observer.complete();
					}
				})
			})
		});
	
		this.btnNovo = new ActionBtnModel({
			size: 'default',
			type: 'primary',
			rightIcon: 'fas fa-plus',
			label: 'Novo',
			callback: () => {this.router.navigate(['carteira', 'new']);}
		});

		this.btnSalvar = new ActionBtnModel({
			size: 'default',
			type: 'success',
			rightIcon: 'fas fa-save',
			label: 'Salvar',
			observable: new Observable((observer: Observer<any>) => {
				if (this.isInsert) {
					this.resource.add(this.form.getRawValue()).subscribe({
						next: (res) => {
							this.notificationService.show('success', 'Registro salvo');
							this.goBack();
						},
						error: (err) => {
							this.notificationService.show('danger', `Falha ao salvar registro`);
							console.error(err);
							observer.complete();
						},
						complete: () => {
							observer.complete();
						}
					}); 
				} else {
					this.resource.edit(this.form.getRawValue()).subscribe({
						next: (res) => {
							this.notificationService.show('success', 'Registro salvo');
							this.goBack();
						},
						error: (err) => {
							this.notificationService.show('danger', `Falha ao salvar registro`);
							console.error(err);
							observer.complete();
						},
						complete: () => {
							observer.complete();
						}
					});
				}
			})
		});
  	}

	private onLoad(): void {
		this.resource.get(this.recordId).subscribe({
			next: (model: Carteira) => {
				this.record = model;
				this.title = this.record.nome;
				this.showData = (this.record.tipoCarteira == 'CartaoCredito')
				this.form.patchValue(this.record);
			},
			error: (err) => {
				console.error(err);
			} 
		})
	}

	// convenience getter for easy access to form fields
	get f() { return this.form.controls; }

	onSubmit(): void {
		this.submitted = true;
		// reset alerts on submit
		//this.alertService.clear();

		if (this.form.invalid) {
			return;
		}

		this.loading = true;
		if (this.isInsert) {
			this.resource.add(this.form.getRawValue()).subscribe({
				next: (res) => {
					this.loading = false;
					this.notificationService.show('success', 'Registro salvo');
					this.router.navigate(['carteira', res.id])
				},
				error: (err) => {
					this.loading = false;
					this.notificationService.show('danger', `Falha ao salvar registro`);
					console.error(err);
				}
			}); 
		} else {
			this.resource.edit(this.form.getRawValue()).subscribe({
				next: (res) => {
					this.loading = false;
					this.notificationService.show('success', 'Registro salvo');
					this.router.navigate(['carteira'])
				},
				error: (err) => {
					this.loading = false;
					this.notificationService.show('danger', `Falha ao salvar registro`);
					console.error(err);
				}
			});
		}
	}
	
	goBack(): void {
		this.form.reset();
		this.router.navigate(['carteira']);
	}
}
