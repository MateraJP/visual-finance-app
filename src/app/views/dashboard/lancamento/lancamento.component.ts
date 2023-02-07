import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Carteira } from '../../../models/carteira.model';
import { SituacaoCarteira, SituacaoCarteiraEnum } from '../../../models/enums/situacao-carteira.enum';
import { TipoCarteira } from '../../../models/enums/tipo-carteira.enum';
import { Lancamento } from '../../../models/lancamento.model';
import { CarteiraResource } from '../../../resources/carteira.resource';
import { LancamentoResource } from '../../../resources/lancamento.resource';
import { NotificationService } from '../../../services/notification.service';
import { ModalBaseComponent } from '../../layout/modal-board/modal-base.component';
import { Modal } from '../../layout/modal-board/modal.service';

@Component({
	selector: 'app-lancamento',
	templateUrl: './lancamento.component.html',
	styleUrls: ['./lancamento.component.scss']
})
export class LancamentoComponent extends ModalBaseComponent implements OnInit {
	isInsert: boolean = true;
	form!: FormGroup;
	loading = false;
	submitted = false;

	situacaoCarteira = SituacaoCarteira;
	tipoCarteira = TipoCarteira;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private resource: LancamentoResource,
		private notificationService: NotificationService

	) {
		super();
	}

	ngOnInit(): void {
		if (this.data && this.data.model && this.data.model.id) {
			this.isInsert = false;
			this.form = new FormBuilder().group({
				id: [this.data.id],
				carteiraId: [this.data.carteira.id],
				dataPrevisao: [this.data.dataPrevisao, Validators.required],
				dataEfetivado: [this.data.dataEfetivado],
				valorPrevisao: [this.data.valorPrevisao, Validators.required],
				valorEfetivado: [this.data.valorEfetivado],
			});
		} else {
			console.log('aqui');
			this.form = new FormBuilder().group({
				id: [0],
				carteiraId: [this.data.carteira.id],
				dataPrevisao: [new Date(), Validators.required],
				dataEfetivado: [undefined],
				valorPrevisao: [0, Validators.required],
				valorEfetivado: [undefined],
			});
			console.log('aqui2 ', this.form.get('dataPrevisao').value);
		}
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
					this.goBack();
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
					this.goBack();
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
		this.onClose();
	}
}