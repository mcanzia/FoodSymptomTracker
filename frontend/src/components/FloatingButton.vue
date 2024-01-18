<template>
    <div>
        <button :class="editMode ? 'floating-button floating-button-save' : 'floating-button floating-button-edit' " @click="saveOrEdit()" @mouseover="showTooltip = true" @mouseleave="showTooltip = false" aria-label="Toggle Edit Mode">
            <ion-icon :name="editMode ? 'pizza' : 'pencil'"></ion-icon>
            <span v-if="showTooltip" class="tooltip" v-text="(editMode ? 'Save ' : 'Edit ') + saveType"></span>
        </button>
        <button v-if="editMode" class="floating-button floating-button-cancel" @click="closeEditMode()" @mouseover="showCancelTooltip = true" @mouseleave="showCancelTooltip = false" aria-label="Close Edit Mode">
            <ion-icon name="close" class="close-icon"></ion-icon>
            <span v-if="showCancelTooltip" class="tooltip">Close</span>
        </button>
    </div>
</template>

<script setup>
  const props = defineProps({
      saveType: String,
      editMode: Boolean
  })

  const emits = defineEmits(['saveOrEdit', 'closeEditMode']);

  const saveOrEdit = () => {
    emits('saveOrEdit');
  }

  const closeEditMode = () => {
    emits('closeEditMode');
  }

  let showTooltip = false;
  let showCancelTooltip = false;
</script>

<style scoped>
.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  color: #ffffff;
  font-size: 24px;
  line-height: 60px;
  text-align: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease;
}

.floating-button-edit {
  background-color: #2c3e50;
}

.floating-button-edit:hover {
  background-color: #34495e;
}

.floating-button-save {
  background-color: #4AAE9B;
}

.floating-button-save:hover {
  background-color: #42A38D;
}

.floating-button-cancel {
  background-color: #990000;
  right: 90px;
}

.floating-button-cancel:hover {
  background-color: #990000;
}

.close-icon {
  padding-top: 13px;
  font-size: 30px;
}

/* Tooltip styles */
.tooltip {
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 0px 10px 0px 10px;
  border-radius: 10px;
  font-size: 12px;
  white-space: nowrap;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 5px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

button:hover .tooltip {
  opacity: 1;
}

.floating-button-cancel .tooltip {
  right: 50%;
  left: auto;
  transform: translateX(50%);
}

</style>


