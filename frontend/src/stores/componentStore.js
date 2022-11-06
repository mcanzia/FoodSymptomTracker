import { defineStore } from 'pinia'

export const useComponentStore = defineStore('componentStore', {
    state: () => ({
        availableComponents: [],
        selectedComponents: [],
        selectedComponentMap: new Map()
      }),
    actions: {

    }
})