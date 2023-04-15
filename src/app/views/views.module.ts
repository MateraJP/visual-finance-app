import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from '../app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MenuMessageComponent } from './layout/menu-message/menu-message.component';
import { MenuMobileComponent } from './layout/menu-mobile/menu-mobile.component';
import { NotificationBoardComponent } from './layout/notification-board/notification-board.component';
import { MenuProfileComponent } from './layout/menu-profile/menu-profile.component';
import { MenuNavComponent } from './layout/menu-nav/menu-nav.component';
import { CarteiraComponent } from './carteira/carteira.component';
import { CriterioComponent } from './criterio/criterio.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { CarteiraFormComponent } from './carteira/carteira-form/carteira-form.component';
import { PeriodoFormComponent } from './periodo/periodo-form/periodo-form.component';
import { CriterioFormComponent } from './criterio/criterio-form/criterio-form.component';
import { MobileQuickNavComponent } from './layout/mobile-quick-nav/mobile-quick-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LancamentoComponent } from './dashboard/lancamento/lancamento.component';
import { DialogModule } from '../components/dialog/dialog.module';
import { SelectModule } from '../components/select/select.module';



@NgModule({ 
	imports: [
        CommonModule,
		BrowserModule,
        FormsModule,
		ReactiveFormsModule,
		ComponentsModule,
        AppRoutingModule,
		DialogModule,
		SelectModule
	  ],
	declarations: [
		LoginComponent, 
		RegisterComponent,
		LayoutComponent,
		DashboardComponent,
		MenuProfileComponent,
		MenuMessageComponent,
		MenuMobileComponent,
		MenuNavComponent, 
		NotificationBoardComponent,
		CarteiraComponent,
		CarteiraFormComponent, 
		CriterioComponent,
		CriterioFormComponent,
		PeriodoComponent,
		PeriodoFormComponent, 
		MobileQuickNavComponent,
		LancamentoComponent
	],
	exports: [
		LoginComponent,
		RegisterComponent,
		LayoutComponent,
		DashboardComponent,
		MenuProfileComponent,
		MenuMessageComponent,
		MenuMobileComponent,
		MenuNavComponent,
		NotificationBoardComponent,
		CarteiraComponent,
		CarteiraFormComponent,
		CriterioComponent,
		CriterioFormComponent,
		PeriodoComponent,
		PeriodoFormComponent
	],
	providers: [
		
	]
})
export class ViewsModule { }
