import { Injectable } from '@angular/core';
import { ColorPallet } from '../models/color-pallet.model';
import { UserPreferencesModel } from '../models/user-preferences.model';
import { PreferenceStorage } from '../resources/preference.storage';

@Injectable({
    providedIn: 'root'
})
export class UserPreferencesService {
    get Colors(): ColorPallet[] {
        return this.colors;
    }

    constructor(private storage: PreferenceStorage) {
        const userPreferences = this.storage.get<UserPreferencesModel>('colors');
        if (userPreferences)
            this.changeColor(userPreferences);
     }

    changeColor(userPreferences: UserPreferencesModel): void {
        this.storage.save('colors', userPreferences);
        document.documentElement.style.setProperty('--primary', `var(${userPreferences.colorPrimary})`);
        document.documentElement.style.setProperty('--primary-text', `var(${userPreferences.colorPrimaryText})`);
        document.documentElement.style.setProperty('--primary-item', `var(${userPreferences.colorPrimaryItem})`);
        document.documentElement.style.setProperty('--primary-highlight', `var(${userPreferences.colorPrimaryHighlight})`);

        if (userPreferences.colorDarken) {
            document.documentElement.style.setProperty('--secundary', `#4c4c4c`);
            document.documentElement.style.setProperty('--secundary-highlight', `var(--color-grey-dark-2)`);
            document.documentElement.style.setProperty('--secundary-text', `#fafafa`);
            document.documentElement.style.setProperty('--primary-item', `var(${userPreferences.colorPrimaryItemDarken})`);
        } else {
            document.documentElement.style.setProperty('--secundary', `#fafafa`);
            document.documentElement.style.setProperty('--secundary-highlight', `var(--color-grey-light-3)`);
            document.documentElement.style.setProperty('--secundary-text', `#2b2b2b`);
        }
    }

    resetColor(): void {
        this.storage.save('colors', this.defaultColor);
        document.documentElement.style.setProperty('--primary', 'var(--default-primary)');
        document.documentElement.style.setProperty('--primary-text', 'var(--default-primary-text)');
        document.documentElement.style.setProperty('--primary-item', 'var(--default-primary-item)');
        document.documentElement.style.setProperty('--primary-highlight', 'var(--default-primary-highlight)');

        if (this.defaultColor.colorDarken) {
            document.documentElement.style.setProperty('--secundary', `#4c4c4c`);
            document.documentElement.style.setProperty('--secundary-highlight', `var(--color-grey-dark-2)`);
            document.documentElement.style.setProperty('--secundary-text', `#fafafa`);
        } else {
            document.documentElement.style.setProperty('--secundary', `#fafafa`);
            document.documentElement.style.setProperty('--secundary-highlight', `var(--color-grey-light-3)`);
            document.documentElement.style.setProperty('--secundary-text', `#2b2b2b`);
        }
    }


    colors: ColorPallet[] = [
        {
            code: '--color-default-grey',
            name: 'grey',
            color: '#b6bbc1',
            text: '--color-grey-dark-2',
            item: '--color-grey-light-3',
            highlight: '--color-grey-dark-1',
            darken: {
                code: '',
                name: '',
                color: '',
                text: '',
                item: '--color-grey-unlight-3',
                highlight: ''
            }
        },
        {
            code: '--color-default-blue',
            name: 'blue',
            color: '#007bff',
            text: '--color-grey-dark-2',
            item: '--color-grey-light-3',
            highlight: '--color-blue-dark-2',
            darken: {
                code: '',
                name: '',
                color: '',
                text: '',
                item: '--color-grey-unlight-3',
                highlight: ''
            }
        },
        {
            code: '--color-default-green', 
            name: 'green', 
            color: '#1bbc9d', 
            text: '--color-grey-dark-2',
            item: '--color-grey-light-3',
            highlight: '--color-green-dark-1',
            darken: {
                code: '',
                name: '',
                color: '',
                text: '',
                item: '--color-grey-unlight-3',
                highlight: ''
            }
        },
        {
            code: '--color-default-yellow', 
            name: 'yellow', 
            color: '#ffca05', 
            text: '--color-grey-dark-2',
            item: '--color-grey-light-3',
            highlight: '--color-yellow-dark-2',
            darken: {
                code: '',
                name: '',
                color: '',
                text: '',
                item: '--color-grey-unlight-3',
                highlight: ''
            }
        },
        {
            code: '--color-default-orange',
            name: 'orange',
            color: '#f37920',
            text: '--color-grey-dark-2',
            item: '--color-grey-light-3',
            highlight: '--color-orange-dark-2',
            darken: {
                code: '',
                name: '',
                color: '',
                text: '',
                item: '--color-grey-unlight-3',
                highlight: ''
            }
        },
        {
            code: '--color-default-red',
            name: 'red',
            color: '#ff7373',
            text: '--color-grey-dark-2',
            item: '--color-grey-light-3',
            highlight: '--color-red-dark-1',
            darken: {
                code: '',
                name: '',
                color: '',
                text: '',
                item: '--color-grey-unlight-3',
                highlight: ''
            }
        },
        {
            code: '--color-default-purple',
            name: 'purple',
            color: '#b455a5',
            text: '--color-grey-dark-2',
            item: '--color-grey-light-3',
            highlight: '--color-purple-dark-1',
            darken: {
                code: '',
                name: '',
                color: '',
                text: '',
                item: '--color-grey-unlight-3',
                highlight: ''
            }
        },
    ]

    defaultColor: UserPreferencesModel = new UserPreferencesModel({
        colorPrimary: '--default-primary',
        colorPrimaryText: '--default-primary-text',
        colorPrimaryHighlight: '--default-primary-highlight',
        colorPrimaryItem: '--default-primary-item',
        colorDarken: false
    });
}
