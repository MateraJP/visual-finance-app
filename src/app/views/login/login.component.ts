import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	form!: FormGroup;
	loading = false;
	submitted = false;

	constructor(
		private route: Router,
		private authService: AuthService,
		private notificationService: NotificationService) { }

	ngOnInit(): void {
		this.form = new FormBuilder().group({
			username: ['', Validators.required],
			pass: ['', Validators.required] 
		});
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
		this.authService.login(this.form.value.username, this.form.value.pass).subscribe({
			next: () => {
				//this.alertService.success('Registration successful', { keepAfterRouteChange: true });
				//this.router.navigate(['../login'], { relativeTo: this.route });
				this.loading = false;
			},
			error: (error: HttpErrorResponse) => {
				this.notificationService.show('danger', error.message);
				this.loading = false;
			}
		});
	}

	gotoRegister(): void {
		this.form.reset();
		this.route.navigate(['register']);
	}

	gotoRecoverPass(): void {
		this.form.reset();
		this.route.navigate(['recover-password']);
	}
}
