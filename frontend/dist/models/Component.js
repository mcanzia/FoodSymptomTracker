export class Component {
    id;
    name;
    selectOptions;
    selected;
    typeId;
    values;
    constructor(id, name, typeId, selected, selectOptions, values) {
        this.id = id;
        this.name = name;
        this.typeId = typeId;
        this.selected = selected;
        this.selectOptions = selectOptions;
        this.values = values;
    }
}
//# sourceMappingURL=Component.js.map