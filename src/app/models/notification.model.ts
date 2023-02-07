import { SlideOptions } from "../components/side-nav/slide-options.model";

export class NotificationModel {
    SlideOptions: SlideOptions = new SlideOptions();
    type: 'success' | 'info' | 'warning' | 'danger' = 'success';
    message: string;

    constructor(init?: Partial<NotificationModel>) {
        Object.assign(this, init);
    }
}