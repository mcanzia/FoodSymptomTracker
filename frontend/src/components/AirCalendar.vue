<template>
    <div ref="datepickerElement"></div>
</template>

<script setup>
import 'air-datepicker/air-datepicker.css';
import AirDatePicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import { onMounted, ref, onBeforeUnmount } from 'vue';

const props = defineProps({
    date: Date
});

const datepickerElement = ref(null);
let datepickerInstance = null;

const emits = defineEmits(['dateInput']);
function handleSelect({date}) {
    emits('dateInput', date);
}

onMounted(() => {
    datepickerInstance = new AirDatePicker(datepickerElement.value, {
        locale: localeEn,
        startDate: props.date,
        onSelect: handleSelect,
    });
});

onBeforeUnmount(() => {
    if (datepickerInstance) {
        datepickerInstance.destroy();
    }
});

</script>

<style scoped>
div {
    border-radius: 10px;
}

:deep(.air-datepicker) {
    border-radius: 10px;
    background-color: #E8DED9;
}

:deep(.air-datepicker-cell) {
    font-family: 'Lato', sans-serif;
    color: #333333;
}

:deep(.air-datepicker-cell.-current-) {
    background-color: #846F91;
    color: white;
}

:deep(.air-datepicker-body--day-name) {
    color: #846F91;
}
</style>
