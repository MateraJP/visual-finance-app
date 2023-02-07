import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColorPallet } from '../../../models/color-pallet.model';
import { UserPreferencesModel } from '../../../models/user-preferences.model';
import { SecurityStorage } from '../../../resources/security.storage';
import { AuthService } from '../../../services/auth.service';
import { UserPreferencesService } from '../../../services/user-preferences.service';
import { MenuProfileService } from './menu-profile.service';

@Component({
    selector: 'app-menu-profile',
    templateUrl: './menu-profile.component.html',
    styleUrls: ['./menu-profile.component.scss']
})
export class MenuProfileComponent implements OnInit, AfterViewInit {
    @ViewChild('file') input: ElementRef;
	@ViewChild('profilePic') picture: ElementRef<HTMLImageElement>;
    fileToUpload: File = undefined;
    profile = {
        id: '0',
        username: 'john.doe',
        email: '',
        isEmailValid: '',
        name: 'John Doe',
        profilePicture: '/assets/placeholders/250x250.png',
		profilePic: undefined,
		profilePicLoading: false,
		sessionStart: new Date(),
		sessionValid: new Date()
    }

    colors: any[] = [];

    constructor(
        public menuProfileService: MenuProfileService,
        private userPreferences: UserPreferencesService,
		private authService: AuthService,
		private securityStorage: SecurityStorage
    ) { 
        
        this.colors = this.userPreferences.Colors;
    }

	ngOnInit(): void {
		let user = this.securityStorage.getUserInfo()
		this.profile.name = user?.name ?? user?.username;
		this.profile.id = user?.id; 
		this.profile.email = user?.email; 
		this.profile.isEmailValid = user?.isEmailValid; 
		this.profile.username = user?.username;
		this.profile.sessionStart = this.securityStorage.getUserToken().created;
		this.profile.sessionValid = this.securityStorage.getUserToken().valid_until;
	}

	ngAfterViewInit(): void {
		let user = this.securityStorage.getUserInfo()
		if (user && user?.profilePic) {
			this.picture.nativeElement.style.backgroundImage = `url('${user.profilePic}')`;
		} else {
			this.picture.nativeElement.style.backgroundImage = `url('/assets/placeholders/250x250.png')`
		}
	}

    changeColor(item: ColorPallet, darken: boolean = false): void {
        this.userPreferences.changeColor(new UserPreferencesModel({
            colorPrimary: item.code,
            colorPrimaryText: item.text,
            colorPrimaryItem: item.item,
            colorPrimaryHighlight: item.highlight,
            colorDarken: darken,
            colorPrimaryItemDarken: item.darken.item
        }));
    } 

    resetColor(): void {
        this.userPreferences.resetColor();
    }

    onClose(): void {
        this.menuProfileService.SlideOptions.ShowSubject.next(false);
    }

	onLogoff(): void {
		this.authService.logout();
	}

	onPictureEdit(): void {
        this.input.nativeElement.click();
	}

	handleFileInput(files: FileList) {
		if (files.item(0)) {
			this.fileToUpload = files.item(0);
			this.uploadFileToActivity();
		}
    }

    uploadFileToActivity() {
		this.profile.profilePicLoading = true;

         this.authService.saveUserImg(this.fileToUpload).subscribe({
		 	next: (res: any) => {
				if (res && res.profilePic) {
					this.picture.nativeElement.style.backgroundImage = `url('${res.profilePic}')`;
				}

				this.securityStorage.saveUserInfo(res);
		 	}, 
		 	error: (err: any) => {
		 		console.error(err);
	 		},
			complete: () => {
				this.profile.profilePicLoading = false;
			}
		});
    }

}

