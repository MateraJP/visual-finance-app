class Color {
    code: string;
    name: string;
    color: string;
    text: string;
    item: string;
    highlight: string;

    constructor(init?: Partial<ColorPallet>) {
        Object.assign(this, init);
    }
}

export class ColorPallet extends Color {
    darken: Color
    constructor(init?: Partial<ColorPallet>) {
        super(init);
        Object.assign(this, init);
    }
}