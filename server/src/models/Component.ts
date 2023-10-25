import { Option } from "./Option";

export class Component {
    
    id : string;
    name : string;
    selectOptions : Array<Option>;
    selected : boolean;
    typeId : number;
    values : Array<number | string>

    constructor (id: string, name: string, selectOptions: Array<Option>, selected: boolean, typeId: number, values : Array<number | string>){
        this.id = id;
        this.name = name;
        this.selectOptions = selectOptions;
        this.selected = selected;
        this.typeId = typeId;
        this.values = values;
    }

    toObject?() {
        return {
            id: this.id,
            name: this.name,
            selectOptions: this.selectOptions.map(option => option.toObject ? option.toObject() : option),
            selected: this.selected,
            typeId: this.typeId,
            values: [...this.values]
        };
    }
    
}