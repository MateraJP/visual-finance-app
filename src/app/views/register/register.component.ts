import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	form!: FormGroup;
   loading = false;
   submitted = false;

  constructor(
   private route: Router,
	//private formBuilder: FormBuilder,
	private authService: AuthService) { } 

  ngOnInit(): void {
	this.form = new FormBuilder().group({
		username: ['', Validators.required],
		email: ['', Validators.required],
		pass: ['', Validators.required]
	});
  }
 
//     // convenience getter for easy access to form fields
	get f() { return this.form.controls; } 

  onSubmit(): void {
	this.submitted = true;

	// reset alerts on submit
	//this.alertService.clear();

	// stop here if form is invalid
	if (this.form.invalid) {
		return;
	}

	this.loading = true;
		this.authService.register(this.form.value.username, this.form.value.email, this.form.value.pass).subscribe({
			  next: () => {
				  //this.alertService.success('Registration successful', { keepAfterRouteChange: true });
				  //this.router.navigate(['../login'], { relativeTo: this.route });
			  },
			  error: error => {
				  //this.alertService.error(error);
				  this.loading = false;
			   }
		  });
	}

	gotoLogin(): void {
	   this.route.navigate(['login']);
	}
}
