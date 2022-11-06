"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
class Component {
    constructor(id, name, order, selectOptions, selected, typeId, values) {
        this.id = id;
        this.name = name;
        this.order = order;
        this.selectOptions = selectOptions;
        this.selected = selected;
        this.typeId = typeId;
        this.values = values;
    }
}
exports.Component = Component;
