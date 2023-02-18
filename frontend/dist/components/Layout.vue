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
              <b-card v-for="(component) in availableComponents" :key="component.id">
                    <span class="change-icon">
                      <b-icon icon="plus-circle" class="bi right" variant="success"></b-icon>
                      <b-icon icon="plus-circle-fill" class="bi right" variant="success" @click="toggleSelected(component, true)"></b-icon>
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
                      <b-card v-for="(component) in selectedComponents" :key="component.id">
                          <span class="change-icon">
                            <b-icon icon="dash-circle" class="bi right" variant="danger"></b-icon>
                            <b-icon icon="dash-circle-fill" class="bi right" variant="danger" @click="toggleSelected(component, false)"></b-icon>
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
import { useUserStore } from '../stores/userStore';
import { storeToRefs } from 'pinia';
import { auth, db } from '../firebase';
export default {
  setup() {
    const dateLogStore = useDateLogStore();
    const componentStore = useComponentStore();
    const userStore = useUserStore();

    const { availableComponents, selectedComponents } = storeToRefs(componentStore);

    return {
      dateLogStore,
      componentStore,
      userStore,
      availableComponents,
      selectedComponents
    }
  },
  async created() {
    this.userAccessToken = await this.userStore.getAccessToken();
    await this.componentStore.initializeComponentLists(this.userAccessToken);
    await this.dateLogStore.initializeDateLogs(this.userAccessToken, this.currentDateString, this.componentStore.selectedComponents);
  },
  components: {
  },
  data() {
    return {
      auth,
      db,
      userAccessToken: null,
      componentTypes: [
        {label: 'Slider', typeId: 1},
        {label: 'Single Select', typeId: 2},
        {label: 'Multi Select', typeId: 3},
      ],
      newComponent: {
        name: "",
        id: -1,
        typeId: -1,
        selectOptions: [],
        selected: false
      }
    }
  },
  computed: {
    currentDateString() {
        return new Date().toLocaleDateString();
    }
  },
  methods: {
    async addNewComponent() {
        try {
            this.newComponent.selectOptions.map((option) => { option.value = option.text});
            await this.componentStore.addComponents(this.userAccessToken, new Array(this.newComponent));
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
        selectOptions: []
      }
    },
    async toggleSelected(component, isSelected) {
      await this.componentStore.toggleSelectedField(this.userAccessToken, component, isSelected);
      if (isSelected) {
        await this.dateLogStore.addDateLogComponent(this.userAccessToken, component);
      } else {
        await this.dateLogStore.removeDateLogComponent(this.userAccessToken, component);
      }
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