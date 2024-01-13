export class ChartShapeParams {

    name: string
    isOpen: boolean
    maxHeight: string
    maxWidth: string

    constructor(name : string, isOpen : boolean, maxHeight : string, maxWidth : string) {
        this.name = name;
        this.isOpen = isOpen;
        this.maxHeight = maxHeight;
        this.maxWidth = maxWidth;
    }


}