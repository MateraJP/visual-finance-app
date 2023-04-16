export class Color {
    //id: string;

	/** Label */
    label: string;
	/** Red */
    r: number = 0;
	/** Green */
    g: number = 0;
	/** Blue */
    b: number = 0;
	/** Opacity */
	a?: number = 1;

	constructor(init: Partial<Color>) {
		Object.assign(this, init);
	}

	get rgba(): string {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a}`;
	}

	get hex(): string {
        return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}${(this.a * 255).toString(16).padStart(2, '0')}`;
	}

    get lighter(): string {
        let r = this.r + 25;
        if (r > 255) r = 255;
        let g = this.g + 25;
        if (g > 255) g = 255;
        let b = this.b + 25;
        if (b > 255) b = 255;
        return `rgba(${r}, ${g}, ${b}, ${this.a})`;
    }

    get darker(): string {
        let r = this.r - 25;
        if (r < 0) r = 0;
        let g = this.g - 25;
        if (g < 0) g = 0;
        let b = this.b - 25;
        if (b < 0) b = 0;
        return `rgba(${r}, ${g}, ${b}, ${this.a})`;
    }

	static fromRgb(r: number, g: number, b: number): Color {
		return new Color({ r, g, b });
	}

	static fromRgbA(r: number, g: number, b: number, a: number): Color {
		return new Color({ r, g, b, a });
	}

	static fromHex(hex: string): Color {
		return new Color({ 
			r: parseInt(hex.substring(1, 3), 16), 
			g: parseInt(hex.substring(3, 5), 16), 
			b: parseInt(hex.substring(5, 7), 16),
			a: (hex.length > 7) ? (parseInt(hex.substring(7, 9), 16) / 255) : 1 });
	}
}