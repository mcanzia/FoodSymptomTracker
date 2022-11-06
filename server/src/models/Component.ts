import { Option } from "./Option";

export class Component {
    
    id : string;
    name : string;
    order : number;
    selectOptions : Array<Option>;
    selected : boolean;
    typeId : number;
    values : Array<number | string>

    constructor (id: string, name: string, order: number, selectOptions: Array<Option>, selected: boolean, typeId: number, values : Array<number | string>){
        this.id = id;
        this.name = name;
        this.order = order;
        this.selectOptions = selectOptions;
        this.selected = selected;
        this.typeId = typeId;
        this.values = values;
    }
}