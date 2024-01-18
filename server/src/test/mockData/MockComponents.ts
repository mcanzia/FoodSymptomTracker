import { Component } from "../../models/Component";
import { Option } from "../../models/Option";

export class MockComponents {

    static createOptionArray() : Array<Option> {
      return [
        {
          text : 'Option 1',
          value : 'Option 1'
        },
        {
          text : 'Option 2',
          value : 'Option 2'
        },
        {
          text : 'Option 3',
          value : 'Option 3'
        }
      ]
    }

    static createComponent() : Component {
        return {
          id : '1',
          name : 'Test Component Single',
          selectOptions : MockComponents.createOptionArray(),
          selected : false,
          typeId : 2,
          values : ['Option 1']
        }
    }

    static createComponentArray() : Array<Component> {
        return [
          {
            id : '1',
            name : 'Test Component Slider',
            selectOptions : [],
            selected : false,
            typeId : 1,
            values : [5]
          },
          {
            id : '2',
            name : 'Test Component Single',
            selectOptions : MockComponents.createOptionArray(),
            selected : false,
            typeId : 2,
            values : ['Option 1']
          },
          {
            id : '3',
            name : 'Test Component Multi',
            selectOptions : MockComponents.createOptionArray(),
            selected : false,
            typeId : 3,
            values : ['Option 1', 'Option 2']
          }
        ]
    }

    static createComponentArrayTwo() : Array<Component> {
      return [
        {
          id : '4',
          name : 'Test Component Slider 2',
          selectOptions : [],
          selected : false,
          typeId : 1,
          values : [5]
        },
        {
          id : '5',
          name : 'Test Component Single 2',
          selectOptions : MockComponents.createOptionArray(),
          selected : false,
          typeId : 2,
          values : ['Option 1']
        },
        {
          id : '6',
          name : 'Test Component Multi 2',
          selectOptions : MockComponents.createOptionArray(),
          selected : false,
          typeId : 3,
          values : ['Option 1', 'Option 2']
        }
      ]
  }
}

