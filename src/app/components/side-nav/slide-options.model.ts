import { Subject } from 'rxjs';

export class SlideOptions {
    /** 
     * initial state for the object to be slided 
     * 'show' means the object will begin at screem and will be hidden on start
     * 'hide' means the object will be offscreen until it start 
     * default value: 'hide' */
    initialState: 'show' | 'hide' = 'hide';

    /**
     * indicate the direction for the object to slide on hide or slide from on show
     * default value: 'right' */
    direction: 'up' | 'down' | 'left' | 'right' = 'right';

    /**
     * TODO::
     * cover the screen on a shaded surface with call 'hide' when clicked at
     */
    // scapeArea: boolean = false;

    /**
     * (in miliseconds) 
     * set a timer to undo the operation (set object to initialState)
     */
    timer: number = undefined;
    
    /**
     * (in miliseconds) 
     * set a timer to automatically begin the operation (set object to oposite of initialState)
     */
    delay: number = undefined;

    /**
     * object will start at 0 and easy go to the indicated opecity while beeing slided to place
     */
    opecity: number = 1;

    /**
     * trasition time in seconds
     */
    actionTime: number = 0.5;

    private showSubject = new Subject<boolean>();
    /**
     * slide to view and hide object
     */
    get ShowSubject(): Subject<boolean> {
        return this.showSubject;
    } 
}