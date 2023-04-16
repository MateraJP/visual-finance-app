import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Carteira } from '../../../models/carteira.model';
import { SituacaoCarteira, SituacaoCarteiraEnum } from '../../../models/enums/situacao-carteira.enum';
import { TipoCarteira } from '../../../models/enums/tipo-carteira.enum';
import { CarteiraResource } from '../../../resources/carteira.resource';
import { NotificationService } from '../../../services/notification.service';

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

  	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private resource: CarteiraResource,
		private notificationService: NotificationService

	) { 

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
		})
  	}

	private onLoad(): void {
		this.resource.get(this.recordId).subscribe({
			next: (model: Carteira) => {
				this.record = model;
				this.title = this.record.nome;
				this.form.patchValue(this.record);
				console.log(this.form.getRawValue());
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
