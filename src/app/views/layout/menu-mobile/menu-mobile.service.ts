import { Injectable } from '@angular/core';
import { SlideOptions } from '../../../components/side-nav/slide-options.model';

@Injectable({
    providedIn: 'root'
})
export class MenuMobileService {
    private slideOptions = new SlideOptions();
    get SlideOptions(): SlideOptions {
        return this.slideOptions;
    }

    constructor() { }
}
