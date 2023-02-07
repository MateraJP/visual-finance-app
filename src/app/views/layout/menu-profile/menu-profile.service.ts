import { Injectable } from '@angular/core';
import { SlideOptions } from '../../../components/side-nav/slide-options.model';

@Injectable({
    providedIn: 'root'
})
export class MenuProfileService {
    private slideOptions = new SlideOptions();
    get SlideOptions(): SlideOptions {
        return this.slideOptions;
    }

    constructor() { }
}
