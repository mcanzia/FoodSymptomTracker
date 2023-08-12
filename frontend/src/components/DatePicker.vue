<template>
    <div class="calendar">
        <input
            type="text"
            v-model="date"
            @focus="focus()"
            @blur="blur()"
            placeholder="Pick a date"
        >
        <Calendar :cellHeight="cellHeight" :active="active" @date-set="setDateField"/>
    </div>
</template>

<script setup>
import Calendar from './Calendar.vue';

let active = false;
let date = '';
let cellHeight = '';

function focus() {
  active = true;
  cellHeight = ($el.querySelector('input').offsetWidth) / 7;
}

function blur() {
  active = false;
}

function setDateField(selectedDate) {
    console.log(selectedDate);
    date = selectedDate;
}

</script>

<style scoped>
.container {
  width: 300px;
  height: auto;
  font-size: 20px;
  text-align: center;
  border-radius: 4px;
  padding: 20px;
}
 input[type="text"] {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    background: #4AAE9B;
    border: 2px solid #fff;
    border-radius: 4px;
    color: #fff;
    font-family: 'Google Sans';
}
input[type="text"]:focus {
    outline: none;
    border: 2px solid #fff;
}
input[type="text"]::placeholder {
    color: #e9e9e9;
    font-style: italic;
}

.calendar {
  width: 100%;
  position: relative;
}
.calendar {
  width: 100%;
  position: relative;
}

.calendar input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.calendar input:focus {
  outline: none;
  border-color: #4AAE9B;
}



</style>
