export class Option {
    
    text : string;
    value : string;

    constructor (text: string, value: string){
        this.text = text;
        this.value = value;
    }

    toObject?() {
        return {
            text: this.text,
            value: this.value
        };
    }
    
}