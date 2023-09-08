"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockComponents = void 0;
class MockComponents {
    static createOptionArray() {
        return [
            {
                text: 'Option 1',
                value: 'Option 1'
            },
            {
                text: 'Option 2',
                value: 'Option 2'
            },
            {
                text: 'Option 3',
                value: 'Option 3'
            }
        ];
    }
    static createComponent() {
        return {
            id: '1',
            name: 'Test Component Single',
            selectOptions: MockComponents.createOptionArray(),
            selected: false,
            typeId: 2,
            values: ['Option 1']
        };
    }
    static createComponentArray() {
        return [
            {
                id: '1',
                name: 'Test Component Slider',
                selectOptions: [],
                selected: false,
                typeId: 1,
                values: [5]
            },
            {
                id: '2',
                name: 'Test Component Single',
                selectOptions: MockComponents.createOptionArray(),
                selected: false,
                typeId: 2,
                values: ['Option 1']
            },
            {
                id: '3',
                name: 'Test Component Multi',
                selectOptions: MockComponents.createOptionArray(),
                selected: false,
                typeId: 3,
                values: ['Option 1', 'Option 2']
            }
        ];
    }
    static createComponentArrayTwo() {
        return [
            {
                id: '4',
                name: 'Test Component Slider 2',
                selectOptions: [],
                selected: false,
                typeId: 1,
                values: [5]
            },
            {
                id: '5',
                name: 'Test Component Single 2',
                selectOptions: MockComponents.createOptionArray(),
                selected: false,
                typeId: 2,
                values: ['Option 1']
            },
            {
                id: '6',
                name: 'Test Component Multi 2',
                selectOptions: MockComponents.createOptionArray(),
                selected: false,
                typeId: 3,
                values: ['Option 1', 'Option 2']
            }
        ];
    }
}
exports.MockComponents = MockComponents;
