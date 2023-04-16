import { Color } from "./color";

export class ColorPallet {
	static blacks: Color[] = [
        new Color({ label:'Black', r:34, g:34, b:34 }),
        new Color({ label:'10% lighter black', r:68, g:68, b:68 }),
        new Color({ label:'20% lighter black', r:102, g:102, b:102 }),
        new Color({ label:'40% lighter black', r:136, g:136, b:136 }),
        new Color({ label:'60% lighter black', r:170, g:170, b:170 }),
        new Color({ label:'80% lighter black', r:204, g:204, b:204 })
    ];

    static blues: Color[] = [
        new Color({ label:'Blue', r:41, g:46, b:107 }),
        new Color({ label:'10% lighter blue', r:27, g:71, b:139 }),
        new Color({ label:'20% lighter blue', r:13, g:96, b:171 }),
        new Color({ label:'40% lighter blue', r:0, g:122, b:204 }),
        new Color({ label:'60% lighter blue', r:63, g:155, b:216 }),
        new Color({ label:'80% lighter blue', r:127, g:188, b:229 })
    ];

    static turquoises: Color[] = [
        new Color({ label:'Turquoise', r:0, g:156, b:204 }),
        new Color({ label:'10% lighter turquoise', r:67, g:180, b:213 }),
        new Color({ label:'20% lighter turquoise', r:134, g:205, b:222 }),
        new Color({ label:'40% lighter turquoise', r:201, g:231, b:231 }),
        new Color({ label:'60% lighter turquoise', r:214, g:237, b:237 }),
        new Color({ label:'80% lighter turquoise', r:228, g:243, b:243 })
    ];

    static teals: Color[] = 
    [
        new Color({ label:'Teal', r:0, g:100, b:58 }),
        new Color({ label:'10% lighter teal', r:32, g:119, b:82 }),
        new Color({ label:'20% lighter teal', r:86, g:152, b:125 }),
        new Color({ label:'40% lighter teal', r:124, g:175, b:154 }),
        new Color({ label:'60% lighter teal', r:156, g:195, b:178 }),
        new Color({ label:'80% lighter teal', r:191, g:216, b:205 })
    ];

    static greens: Color[] =
    [
        new Color({ label:'Green', r:51, g:153, b:71 }),
        new Color({ label:'10% lighter green', r:96, g:175, b:73 }),
        new Color({ label:'20% lighter green', r:141, g:197, b:75 }),
        new Color({ label:'40% lighter green', r:168, g:206, b:75 }),
        new Color({ label:'60% lighter green', r:195, g:216, b:76 }),
        new Color({ label:'80% lighter green', r:215, g:229, b:135 })
    ];

    static yellows: Color[] =
    [
        new Color({ label:'Yellow', r:251, g:188, b:61 }),
        new Color({ label:'10% lighter yellow', r:251, g:209, b:68 }),
        new Color({ label:'20% lighter yellow', r:251, g:231, b:75 }),
        new Color({ label:'40% lighter yellow', r:251, g:253, b:82 }),
        new Color({ label:'60% lighter yellow', r:252, g:253, b:125 }),
        new Color({ label:'80% lighter yellow', r:252, g:254, b:168 })
    ];

    static oranges: Color[] =
    [
        new Color({ label:'Orange', r:219, g:85, b:44 }),
        new Color({ label:'10% lighter orange', r:232, g:112, b:37 }),
        new Color({ label:'20% lighter orange', r:245, g:139, b:31 }),
        new Color({ label:'40% lighter orange', r:247, g:162, b:75 }),
        new Color({ label:'60% lighter orange', r:249, g:185, b:120 }),
        new Color({ label:'80% lighter orange', r:251, g:208, b:165 })
    ];

    static reds: Color[] = [
        new Color({ label:'Red', r:127, g:23, b:37 }),
        new Color({ label:'10% lighter red', r:178, g:11, b:30 }),
        new Color({ label:'20% lighter red', r:230, g:0, b:23 }),
        new Color({ label:'40% lighter red', r:235, g:51, b:69 }),
        new Color({ label:'60% lighter red', r:240, g:102, b:115 }),
        new Color({ label:'80% lighter red', r:245, g:153, b:162 })
    ];

    static pinks: Color[] =
    [
        new Color({ label:'Pink', r:236, g:0, b:140 }),
        new Color({ label:'10% lighter pink', r:239, g:51, b:163 }),
        new Color({ label:'20% lighter pink', r:242, g:102, b:186 }),
        new Color({ label:'40% lighter pink', r:245, g:153, b:209 }),
        new Color({ label:'60% lighter pink', r:249, g:204, b:232 }),
        new Color({ label:'80% lighter pink', r:251, g:221, b:239 })
    ];

    static purples: Color[] = 
    [
        new Color({ label:'Purple', r:92, g:25, b:123 }),
        new Color({ label:'10% lighter purple', r:113, g:51, b:141 }),
        new Color({ label:'20% lighter purple', r:146, g:96, b:161 }),
        new Color({ label:'40% lighter purple', r:174, g:136, b:185 }),
        new Color({ label:'60% lighter purple', r:199, g:171, b:208 }),
        new Color({ label:'80% lighter purple', r:224, g:202, b:231 })
    ];

    static indigos: Color[] = 
    [
        new Color({ label:'Indigo', r:81, g:57, b:159 }),
        new Color({ label:'10% lighter indigo', r:105, g:81, b:170 }),
        new Color({ label:'20% lighter indigo', r:136, g:116, b:194 }),
        new Color({ label:'40% lighter indigo', r:170, g:156, b:223 }),
        new Color({ label:'60% lighter indigo', r:192, g:182, b:233 }),
        new Color({ label:'80% lighter indigo', r:218, g:212, b:247 })
    ];
    
    static colors: Color[][] = [
        ColorPallet.blacks,
        ColorPallet.blues,
        ColorPallet.turquoises,
        ColorPallet.teals,
        ColorPallet.greens,
        ColorPallet.yellows,
        ColorPallet.oranges,
        ColorPallet.reds,
        ColorPallet.pinks,
        ColorPallet.purples,
        ColorPallet.indigos
    ];
    
    static black: Color = ColorPallet.blacks[0];
    static blue: Color = ColorPallet.blues[0];
    static turquoise: Color = ColorPallet.turquoises[0];
    static teal: Color = ColorPallet.teals[0];
    static green: Color = ColorPallet.greens[0];
    static yellow: Color = ColorPallet.yellows[0];
    static orange: Color = ColorPallet.oranges[0];
    static red: Color = ColorPallet.reds[0];
    static pink: Color = ColorPallet.pinks[0];
    static purple: Color = ColorPallet.purples[0];
    static indigo: Color = ColorPallet.indigos[0];

    static main: Color[] =[
        ColorPallet.black,
        ColorPallet.blue,
        ColorPallet.turquoise,
        ColorPallet.teal,
        ColorPallet.green,
        ColorPallet.orange,
        ColorPallet.red,
        ColorPallet.pink,
        ColorPallet.purple,
        ColorPallet.indigo
    ]

    static randonPrimary(): Color {
        let rdn = Math.floor((Math.random() * 9 + 1)); //Min 1 Max 9

        if (rdn > 9 || rdn < 0) {
            debugger;
        }

        let response = ColorPallet.main[rdn];

        if (!response) {
            debugger
        }

        return response;
    }

    static randonFromRange(index: number): Color {
        let rdn = Math.floor((Math.random() * 9 + 1)); //Min 1 Max 9

        if (rdn > 9 || rdn < 0) {
            debugger;
        }

        let response = ColorPallet.colors[rdn][index];

        if (!response) {
            debugger
        }

        return response;
    }
    
    static randon(): Color {
        let rdn = Math.floor((Math.random() * 9 + 1)); //Min 1 Max 9
        let rdn2 = Math.floor((Math.random() * 9 + 1)); //Min 0 Max 9

        if (rdn > 9 || rdn < 0) {
            debugger;
        }
        

        if (rdn2 > 9 || rdn2 < 0) {
            debugger;
        }
        let response = ColorPallet.colors[rdn][rdn2];

        if (!response) {
            debugger
        }
        return response;
    }



}

