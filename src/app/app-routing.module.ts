import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlyLoggedUsersGuard } from './resources/auth-guards/only-logged-users.guard';
import { CarteiraFormComponent } from './views/carteira/carteira-form/carteira-form.component';
import { CarteiraComponent } from './views/carteira/carteira.component';
import { CriterioFormComponent } from './views/criterio/criterio-form/criterio-form.component';
import { CriterioComponent } from './views/criterio/criterio.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

import { LayoutComponent } from './views/layout/layout.component';
import { LoginComponent } from './views/login/login.component';
import { PeriodoFormComponent } from './views/periodo/periodo-form/periodo-form.component';
import { PeriodoComponent } from './views/periodo/periodo.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    //{ path: "recover-password", component: ChangePassComponent },
    //{ path: "change-password", component: ChangePassComponent, canActivate: [OnlyLoggedUsersGuard] },

	{ 
		path:'', 
        component: LayoutComponent,
	    canActivate: [OnlyLoggedUsersGuard],
		children: [
		{
			path: 'dashboard',
			component: DashboardComponent,
			data: { showOnMenu: true, icon: 'fas fa-hand-holding-usd', title: 'Lançamentos' } //fas fa-list-alt
		},
		{
			path: 'carteira',
			component: CarteiraComponent,
			data: { showOnMenu: true, icon: 'fas fa-wallet', title: 'Carteiras' },
		},
		{
			path: 'carteira/new',
			component: CarteiraFormComponent,
			data: { showOnMenu: false, title: 'Nova carteira' },
		},
		{
			path: 'carteira/:id',
			component: CarteiraFormComponent,
			data: { showOnMenu: false, title: 'Carteira :id' },
		},
		{
			path: 'periodo',
			component: PeriodoComponent,
			data: { showOnMenu: true, icon: 'fas fa-calendar-day', title: 'Períodos' }
		},
		{
			path: 'periodo/new',
			component: PeriodoFormComponent,
			data: { showOnMenu: false, title: 'Novo períodos' }
		},
		{
			path: 'periodo/:id',
			component: PeriodoFormComponent,
			data: { showOnMenu: false, title: 'Períodos :id' }
		},
		{
			path: 'criterio',
			component: CriterioComponent,
			data: { showOnMenu: true, icon: 'fas fa-funnel-dollar', title: 'Critérios' } //fas fa-layer-group
		},
		{
			path: 'criterio/new',
			component: CriterioFormComponent,
			data: { showOnMenu: false, title: 'Novo critério' }
		},
		{
			path: 'criterio/:id',
			component: CriterioFormComponent,
			data: { showOnMenu: false, title: 'Critério :id' }
		}
	  ]
    },

	{ path:'**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
