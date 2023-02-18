import { Option } from "./Option";
export class Component {

    id : string;
    name : string;
    selectOptions : Array<Option>;
    selected : boolean;
    typeId : number;
    values? : Array<string> | string | number
    
    constructor(id : string, name : string, typeId : number, selected : boolean, selectOptions : Array<Option>, values? : Array<string> | string | number) {
        this.id = id;
        this.name = name;
        this.typeId = typeId;
        this.selected = selected;
        this.selectOptions = selectOptions;
        this.values = values;
    }
}