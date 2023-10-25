export class ChartTitle {

    display: boolean
    text: string | null

    constructor(display : boolean, text : string) {
        this.display = display;
        this.text = text;
    }

    toObject?() {
        return {
            display: this.display,
            text: this.text
        };
    }
    
}