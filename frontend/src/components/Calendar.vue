<template>
    <div class="calendar-layout" v-if="active" @mousedown.prevent>
            <button class="close-button" @click="closeCalendar">
                <ion-icon name="close"></ion-icon>
            </button>
            <div class="calendar-header">
                <div class="row">
                    <ion-icon name="caret-back" @click="setPreviousMonth()"></ion-icon>
                    <div class="calendar-title">{{ monthYearFormatted }}</div>
                    <ion-icon name="caret-forward" @click="setNextMonth()"></ion-icon>
                </div>
                <div class="calendar-days">
                    <div class="day" v-for="day in days" :key="day">
                        {{ trimThreeChar(day) }}
                    </div>
                </div>
            </div>
            <div class="calendar-body">
                <div 
                    class="calendar-row"
                    :class="{ 'swipe-left': swipeLeft, 'swipe-right': swipeRight }"
                    v-for="(row, index) in calendarDays"
                    :key="index"
                >
                    <div 
                        class="calendar-day"
                        :class="{disabled: isDisabled(cell), selected: isSelected(cell)}"
                        :style="{height: cellHeightUnit}"
                        v-for="(cell, index) in row"
                        :key="index"
                        @click="selectDay(cell)"
                        >
                        {{ cell.day }}
                    </div>
                </div>
            </div>
    </div>
</template>

<script setup>
import { onBeforeMount, computed } from 'vue';
const props = defineProps({
    cellHeight: Number,
    active: Boolean
});

let activeDate = '202301';
let activeDay = '';
let active = false;
let date = '';
let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
};
let calendarDays = [];
let cellHeight = '';
let swipeLeft = false;
let swipeRight = false;

onBeforeMount(async() => {
    populateCalendar(getCurrentYear(), getCurrentMonth());
    activeDate = getCurrentYear() + getCurrentMonth();
});

const emits = defineEmits(['date-set', 'close-calendar']);
function setDateEvent() {
    emits('date-set', date);
}

function closeCalendar() {
    emits('close-calendar');
}

let monthYearFormatted = computed(() => {
    return months[activeDate.substring(4, 6)] + ' ' + activeDate.substring(0, 4);
});

let cellHeightUnit = computed(() => {
    return cellHeight + 'px';
});

function trimThreeChar(item) {
    return item.substring(0, 3);
}

function getCurrentDate() {
    // Returns today's date with format YYYY/MM/DD
    return new Date().toJSON().slice(0,10).replace(/-/g,'/');
}

function getCurrentDay() {
    // Returns current day within range 1-31
    return new Date().getDate();
}

function getCurrentMonth() {
    // Returns the current month as a 2 digits number
    return ( "0" + (new Date().getMonth() + 1)).slice(-2);
}
        
function getPreviousMonth(month) {
    if (parseInt(month) == 1)
        return '12';
    else 
        return ( "0" + (parseInt(month) - 1)).slice(-2);
}
        
function getNextMonth(month) {
    if (parseInt(month) == 12)
        return '01';
    else 
        return ( "0" + (parseInt(month) + 1)).slice(-2);
}

function getCurrentYear() {
// Returns the current year as a 4 digits number
    return new Date().getFullYear();
}
        
function getNumberOfDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
        
function getNumberOfDaysInPreviousMonth(year, month) {
    if (month == '01') 
        return new Date(year - 1, getPreviousMonth(month), 0).getDate();
    else
        return new Date(year, getPreviousMonth(month), 0).getDate();
}
        
function getNumberOfDaysInNextMonth() {
    if (getNextMonth() == '12')
        return new Date(getCurrentYear() + 1, getNextMonth(), 0).getDate();
    else
        return new Date(getCurrentYear(), getNextMonth(), 0).getDate();
}
        
function getFirstDayOfMonth(year, month) {
    if (new Date(year, parseInt(month) - 1, 1).getDay() - 1 == -1)
        return 6
    else 
        return new Date(year, parseInt(month) - 1, 1).getDay() - 1;
}
        
function getLastDayOfMonth(year, month) {
    return new Date(year, parseInt(month) + 1, 0).getDay();
}
        
function populateCalendar(year, month) {
    calendarDays = [];
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const numberOfRows = Math.ceil(getNumberOfDaysInMonth(year, month) / 7);
    let dayNumber = 1;
    // Number of rows to display
    let increment = 1;
    for (let x = 0; x <= numberOfRows; x++) {
        let decrement = 0;
        let row = [];
        let endOfMonth = false;
        // Fills the first row with previous month ending days
        if (x == 0) {
        for (let i = 0; i < firstDayOfMonth; i++) {
            if (parseInt(month) == 1)
            row.push({ day: getNumberOfDaysInPreviousMonth(year, month) - decrement, month: getPreviousMonth(month), year: parseInt(year) - 1});
            else 
            row.push({ day: getNumberOfDaysInPreviousMonth(year, month) - decrement, month: getPreviousMonth(month), year: parseInt(year)});
            decrement++;
        }
        row.reverse();
        }
        // Fills the rest of the rows
        for (let y = row.length; y < 7  && y < getNumberOfDaysInMonth(year, month); y++) {
            // While current month days are not excedeed
            if (dayNumber <= getNumberOfDaysInMonth(year, month)) {
                row.push({day: dayNumber, month: month, year: year});
                dayNumber++;
            } else {
                // Fills space left 
                for (let j = row.length; j < 7; j++) {
                if (parseInt(month) == 12) 
                    row.push({day: increment, month: getNextMonth(month), year: parseInt(year) + 1});
                else
                    row.push({day: increment, month: getNextMonth(month), year: year});
                increment++;
                let t = row;
                }
            } 
        }
        calendarDays.push(row);
    }
}
           
function setPreviousMonth() {
    let activeYear = activeDate.substring(0, 4);
    let activeMonth = activeDate.substring(4, 6);
    if (parseInt(activeMonth) == 1) {
        activeYear = parseInt(activeYear) - 1;
        activeMonth = '12';
    } else {
        activeMonth = ('0' + (parseInt(activeMonth) - 1)).slice(-2);
    }
    activeDate = activeYear + activeMonth;
    populateCalendar(activeYear, activeMonth);
    animeSwipeRight()
}
            
function setNextMonth() {
    let activeYear = activeDate.substring(0, 4);
    let activeMonth = activeDate.substring(4, 6);
    if (parseInt(activeMonth) == 12) {
        activeYear = parseInt(activeYear) + 1;
        activeMonth = '01';
    } else {
        activeMonth = ('0' + (parseInt(activeMonth) + 1)).slice(-2);
    }
    activeDate = activeYear + activeMonth;
    populateCalendar(activeYear, activeMonth);
    animeSwipeLeft()
}
            
function selectDay(cell) {
    if (cell.month == getPreviousMonth(activeDate.substring(4, 6))) {
        setPreviousMonth();
    } else if (cell.month == getNextMonth(activeDate.substring(4, 6))) {
        setNextMonth();
    }
    activeDay = cell.month + ("0" + cell.day).slice(-2) + cell.year;
    date = cell.month + '/' + ("0" + cell.day).slice(-2) + '/' + cell.year;
    setDateEvent();
}
            
function isSelected(cell) {
    if (cell.month + ("0" + cell.day).slice(-2) + cell.year == activeDay)
        return true;
}

function isDisabled(cell) {
    if (parseInt(cell.month) !== parseInt(activeDate.substring(4, 6)))
        return true;
}
            
function animeSwipeLeft() {
    swipeLeft = true;
    setTimeout(() => {
        swipeLeft = false;
    }, 300)
}
            
function animeSwipeRight() {
    swipeRight = true;
    setTimeout(() => {
        swipeRight = false;
        }, 300)
}        

</script>

<style scoped>
.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    background-color: transparent;
    border: none;
    cursor: pointer;
}
.calendar-layout {
  /* position: absolute; */
  top: 100%;
  left: 0;
  /* width: 100%; */
  width: 50vw;
  height: 30vw;
  background-color: #fff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  animation: appear .2s ease-in-out;
  z-index: 1;
  display: flex;
  flex-direction: column;
}
  .calendar-header {
    width: 100%;
    background-color: #4AAE9B;
    /* height: 60px; */
    height: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    box-sizing: border-box;
    padding: 0 4px;
  }
  .calendar-header .row {
    width: 100%;
    /* height: 40px; */
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .calendar-header .calendar-title {
    font-size: 20px;
  }
  .calendar-header ion-icon {
    font-size: 20px;
    cursor: pointer;
  }
  .calendar-header .calendar-days {
    display: flex;
    flex-direction: row;
    width: 100%;
    font-size: 16px;
    justify-content: center;
  }
  .calendar-header .day {
    width: calc(100% / 7);
    justify-content: center;
    align-items: center;
    padding: 0px 0px 4px 0px;
    display: flex;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
  }
  .calendar-body {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    overflow: hidden;
    height: 75%;
  }
  .calendar-body .calendar-row {
    display: flex;
    flex-direction: row;
    transition: all .150s ease;
    height: calc(100% / 6);
  }
  .calendar-body .calendar-row .calendar-day {
    width: calc(100% / 7);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #f9f9f9;
    font-size: 16px;
    color: #606060;
    position: relative;
    cursor: pointer;
    transition: all .3s ease;
  }
  .calendar-body .calendar-row .calendar-day.disabled {
    background-color: #f3f3f3 !important;
  }
  .calendar-body .calendar-row .calendar-day.selected {
    color: #4AAE9B;
  }
  .calendar-body .calendar-row .calendar-day.selected:after {
    width: 100%;
  }
  .calendar-body .calendar-row .calendar-day:after {
    content: "";
    height: 3px;
    width: 0px;
    background: #4AAE9B;
    position: absolute;
    bottom: 0;
    transition: all .3s ease;
  }
  .calendar-body .calendar-row .calendar-day:hover {
    color: #4AAE9B;
  }
  .calendar-body .calendar-row .calendar-day:hover:after {
    width: 100%;
  }
  .calendar-body .calendar-row.swipe-left {
    opacity: 0;
    transform: translateX(10px);
  }
  .calendar-body .calendar-row.swipe-right {
    opacity: 0;
    transform: translateX(-10px);
  }

ion-icon {
    cursor: pointer;
}

@keyframes appear {
  from {
    transform: translateY(-10px);
    opacity: 0;
  } to {
    transform: translateY(5px);
    opacity: 1;
  }
}
</style>
