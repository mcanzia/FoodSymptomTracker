<template>
    <b-container>
      <br />
        <b-row class="text-center">
            <b-col>
              <h3>Layout</h3>
            </b-col>
        </b-row>
        <br />
        <b-row class="text-center">
            <b-col>
              <h5>Available Components:</h5>
            </b-col>
            <b-col>
              <h5>Selected Components:</h5>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6">
              <b-button block variant="primary" @click="$bvModal.show('new-component-modal')">Add Component</b-button>
              <b-card v-for="(component, index) in componentStore.availableComponents" :key="component.id">
                    <span class="change-icon">
                      <b-icon icon="plus-circle" class="bi right" variant="success"></b-icon>
                      <b-icon icon="plus-circle-fill" class="bi right" variant="success" @click="moveToSelected(index)"></b-icon>
                    </span>
                    <b-form v-if="component.typeId == 1">
                      <label for="component-range">{{component.name}}</label>
                      <b-form-input id="component-range" type="range" min="0" max="10" step="0.10" disabled class="text-center"></b-form-input>
                    </b-form>
                    <b-form v-if="component.typeId == 2">
                      <label for="component-radio">{{component.name}}</label>
                      <b-form-radio-group id="component-radio" :options="component.selectOptions" text-field="text" value-field="value" disabled class="text-center"></b-form-radio-group>
                    </b-form>
                    <b-form v-if="component.typeId == 3">
                      <label for="component-checkbox">{{component.name}}</label>
                      <b-form-checkbox-group id="component-checkbox" :options="component.selectOptions" text-field="text" value-field="value" disabled class="text-center"></b-form-checkbox-group>
                    </b-form>
              </b-card>
              <br />
            </b-col>
            <b-col cols="6">
              <draggable v-model="selectedComponents">
                 <transition-group>
                      <b-card v-for="(component, index) in selectedComponents" :key="component.id">
                          <span class="change-icon">
                            <b-icon icon="dash-circle" class="bi right" variant="danger"></b-icon>
                            <b-icon icon="dash-circle-fill" class="bi right" variant="danger" @click="moveToAvailable(index)"></b-icon>
                          </span>
                          <b-form v-if="component.typeId == 1">
                            <label for="component-range">{{component.name}}</label>
                            <b-form-input id="component-range" type="range" min="0" max="10" step="0.10" disabled class="text-center"></b-form-input>
                          </b-form>
                          <b-form v-if="component.typeId == 2">
                            <label for="component-radio">{{component.name}}</label>
                            <b-form-radio-group id="component-radio" :options="component.selectOptions" text-field="text" value-field="value" disabled class="text-center"></b-form-radio-group>
                          </b-form>
                          <b-form v-if="component.typeId == 3">
                            <label for="component-checkbox">{{component.name}}</label>
                            <b-form-checkbox-group id="component-checkbox" :options="component.selectOptions" text-field="text" value-field="value" disabled class="text-center"></b-form-checkbox-group>
                          </b-form>
                      </b-card>
                  </transition-group>
                </draggable>
                <br />
            </b-col>
        </b-row>
        <b-modal 
            id="new-component-modal" 
            title="Build a Component:"
            @ok="addNewComponent()"
            @cancel="clearNewComponentForm()">
            <b-form>
              <label for="new-component-name">Name:</label>
              <b-form-input id="new-component-name" v-model="newComponent.name" required placeholder="Enter a name"></b-form-input>
              <br />
              <label for="new-component-type">Type:</label>
              <b-form-select id="new-component-type" v-model="newComponent.typeId" :options="componentTypes" value-field="typeId" text-field="label" required></b-form-select>
              <br />
              <b-form-group v-if="newComponent.typeId === 2 || newComponent.typeId === 3" label="Options:" label-for="new-component-options">
                <div v-for="selectOption in newComponent.selectOptions" :key="selectOption.value">
                  <b-form-input id="new-component-options" v-model="selectOption.text"></b-form-input>
                </div>
                <br />
                <b-button variant="link" @click="newComponent.selectOptions.push({text: '', value: ''})" v-if="newComponent.selectOptions.length < 5">Add new option</b-button>
              </b-form-group>
            </b-form>
        </b-modal>
    </b-container>
</template>

<script>
import { useDateLogStore } from '../stores/dateLogStore';
import { useComponentStore } from '../stores/componentStore';
import { auth, db } from '../firebase';
import draggable from 'vuedraggable';
export default {
  setup() {
    const dateLogStore = useDateLogStore();
    const componentStore = useComponentStore();

    return {
      dateLogStore,
      componentStore,
    }
  },
  created() {
    this.initializeComponentLists();
    this.getAllDateLogs();
  },
  components: {
    draggable,
  },
  data() {
    return {
      auth,
      db,
      componentTypes: [
        {label: 'Slider', typeId: 1},
        {label: 'Single Select', typeId: 2},
        {label: 'Multi Select', typeId: 3},
      ],
      newComponent: {
        name: "",
        id: -1,
        typeId: -1,
        order: 0,
        selectOptions: [],
        selected: false
      },
      dateLogs: []
    }
  },
  computed: {
    selectedComponents: {
        get() {
            return this.componentStore.selectedComponents
        },
        set(value) {
            this.componentStore.selectedComponents = value;
            this.updateOrder();
        }
    }
  },
  methods: {
    async initializeComponentLists() {
      try {
        await db.collection('users')
                .doc(this.auth.currentUser.uid)
                .collection('components')
                .get()
                .then(snapshot => {
                    if (snapshot.empty) {
                        return;
                    }
                    this.componentStore.availableComponents = snapshot.docs.filter(selection => !isSelected(selection)).map(selection => setComponentData(selection));
                    this.componentStore.selectedComponents = snapshot.docs.filter(selection => isSelected(selection)).map(selection => setComponentData(selection));
                    this.componentStore.selectedComponents.sort((a,b) => a.order - b.order);
                    
                    function isSelected(component) {
                      return component.data().selected;
                    }

                    function setComponentData(component) {
                      let componentData = 
                      {
                        name: component.data().name,
                        id: component.id,
                        typeId: component.data().typeId,
                        order: component.data().order,
                        selectOptions: component.data().selectOptions,
                        selected: component.data().selected
                      }
                      return componentData;
                    }
                })
      } catch (error) {
        console.log(error)
      }
    },
    
    async addNewComponent() {
        try {
            this.newComponent.selectOptions.map((option) => { option.value = option.text});
            await db.collection('users')
                .doc(this.auth.currentUser.uid)
                .collection('components')
                .add({
                    name: this.newComponent.name,
                    typeId: this.newComponent.typeId,
                    order: this.newComponent.order,
                    selectOptions: this.newComponent.selectOptions,
                    selected: false
                })
                .then(createdComponent => {
                    this.newComponent.id = createdComponent.id;
                    this.componentStore.availableComponents.push(this.newComponent);
                })
        } catch (error) {
            console.log(error)
        }
        this.clearNewComponentForm();
    },
    clearNewComponentForm() {
      this.newComponent = 
      {
        name: "",
        id: -1,
        typeId: -1,
        order: 0,
        selectOptions: []
      }
    },
    moveToSelected(index) {
      const latestOrder = this.componentStore.selectedComponents.length + 1;
      this.componentStore.availableComponents[index].selected = true;
      this.componentStore.availableComponents[index].order = latestOrder;
      this.componentStore.selectedComponents.push(this.componentStore.availableComponents[index]);
      this.toggleSelectedField(this.componentStore.availableComponents[index], true, latestOrder);
      this.componentStore.availableComponents.splice(index, 1);
    },
    moveToAvailable(index) {
      this.componentStore.selectedComponents[index].selected = false;
      this.componentStore.selectedComponents[index].order = 0;
      this.componentStore.availableComponents.push(this.componentStore.selectedComponents[index]);
      this.toggleSelectedField(this.componentStore.selectedComponents[index], false, 0);
      this.componentStore.selectedComponents.splice(index, 1);
    },
    async toggleSelectedField(component, selectedValue, order) {
        try {
            await db.collection('users')
                .doc(this.auth.currentUser.uid)
                .collection('components')
                .doc(component.id)
                .update({
                    selected: selectedValue,
                    order: order
                })
                .then(() => {
                    if (selectedValue) {
                      this.addComponentDateLogs(component);
                    } else {
                      this.removeComponentDateLogs(component);
                    }
                    this.updateOrder();
                })
        } catch (error) {
            console.log(error);
        }
    },
    async addComponentDateLogs(component) {
      try {
      var batch = db.batch();

      this.dateLogs.map(dateLog => {
                const dateLogDoc = db.collection('users').doc(this.auth.currentUser.uid)
                                     .collection('dateLogs').doc(dateLog.id);

                const componentToAdd = {
                    id: component.id,
                    name: component.name,
                    typeId: component.typeId,
                    order: component.order,
                    selectOptions: component.selectOptions
                }
                switch (component.typeId) {
                    case 1:
                        componentToAdd.value = 5;
                        break;
                    case 2:
                        componentToAdd.value = "";
                        break;
                    case 3:
                        componentToAdd.values = [];
                        break;
                }
                dateLog.components.push(componentToAdd)
                batch.update(dateLogDoc, {components: dateLog.components});
      });

      await batch.commit();
      }catch (error) {
        console.log(error);
      }
    },
    async removeComponentDateLogs(component) {
      var batch = db.batch();

      this.dateLogs.map(dateLog => {
                const dateLogDoc = db.collection('users').doc(this.auth.currentUser.uid)
                                     .collection('dateLogs').doc(dateLog.id);
                dateLog.components = dateLog.components.filter(dateLogComponent => 
                                        dateLogComponent.id != component.id);
                batch.update(dateLogDoc, {components: dateLog.components});
      });

      await batch.commit();

    },
    async getAllDateLogs() {
      await db.collection('users')
            .doc(this.auth.currentUser.uid)
            .collection('dateLogs')
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    this.dateLogs = [];
                }
                this.dateLogs = snapshot.docs.map(doc => {
                  return {
                    id: doc.id,
                    components: doc.data().components
                  }
                });
            });
    },
    async updateOrder() {
      var batch = db.batch();
      try {
        this.componentStore.selectedComponents.map((component, index) => {
          // Update in store
          component.order = index + 1;

          // Update in db
          const componentDoc = db.collection('users').doc(this.auth.currentUser.uid)
            .collection('components').doc(component.id);
          
          batch.update(componentDoc, component);
          });

        await batch.commit();
      } catch (error) {
        console.log(error);
      }
    },
    test() {
      console.log("This Works...");
    }
  }
}
</script>

<style scoped>
  .change-icon > .bi + .bi,
  .change-icon:hover > .bi {
    display: none;
  }
  .change-icon:hover > .bi + .bi {
    display: inherit;
  }
  .right {
    float: right;
  }
</style>