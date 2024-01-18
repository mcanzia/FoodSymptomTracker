"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
class Component {
    id;
    name;
    selectOptions;
    selected;
    typeId;
    values;
    constructor(id, name, selectOptions, selected, typeId, values) {
        this.id = id;
        this.name = name;
        this.selectOptions = selectOptions;
        this.selected = selected;
        this.typeId = typeId;
        this.values = values;
    }
    toObject() {
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
exports.Component = Component;
