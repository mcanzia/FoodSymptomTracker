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
}
exports.Component = Component;
