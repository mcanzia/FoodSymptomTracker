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

<script>
export default ({
    setup() {
        
    },
    data() {
        return {
            activeDate: '202301',
            activeDay: '',
            active: false,
            date: '',
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            months: {
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
            },
            calendarDays: [],
            cellHeight: '',
            swipeLeft: false,
            swipeRight: false
        }
    },
    props: ['cellHeight', 'active'],

    computed: {
        monthYearFormatted() {
        // Returns the current month name followed by the current year
        return this.months[this.activeDate.substring(4, 6)] + ' ' + this.activeDate.substring(0, 4);
        },
        cellHeightUnit() {
        return this.cellHeight + 'px';
        }
    },
    methods: {
        trimThreeChar(item) {
            return item.substring(0, 3);
        },
        getCurrentDate() {
            // Returns today's date with format YYYY/MM/DD
            return new Date().toJSON().slice(0,10).replace(/-/g,'/');
        },
        getCurrentDay() {
            // Returns current day within range 1-31
            return new Date().getDate();
        },
        getCurrentMonth() {
            // Returns the current month as a 2 digits number
            return ( "0" + (new Date().getMonth() + 1)).slice(-2);
        },
        getPreviousMonth(month) {
            if (parseInt(month) == 1)
                return '12';
            else 
                return ( "0" + (parseInt(month) - 1)).slice(-2);
        },
        getNextMonth(month) {
            if (parseInt(month) == 12)
                return '01';
            else 
                return ( "0" + (parseInt(month) + 1)).slice(-2);
        },
        getCurrentYear() {
        // Returns the current year as a 4 digits number
            return new Date().getFullYear();
        },
        getNumberOfDaysInMonth(year, month) {
            return new Date(year, month, 0).getDate();
        },
        getNumberOfDaysInPreviousMonth(year, month) {
            if (month == '01') 
                return new Date(year - 1, this.getPreviousMonth(month), 0).getDate();
            else
                return new Date(year, this.getPreviousMonth(month), 0).getDate();
        },
        getNumberOfDaysInNextMonth() {
            if (this.getNextMonth() == '12')
                return new Date(this.getCurrentYear() + 1, this.getNextMonth(), 0).getDate();
            else
                return new Date(this.getCurrentYear(), this.getNextMonth(), 0).getDate();
        },
        getFirstDayOfMonth(year, month) {
            if (new Date(year, parseInt(month) - 1, 1).getDay() - 1 == -1)
                return 6
            else 
                return new Date(year, parseInt(month) - 1, 1).getDay() - 1;
        },
        getLastDayOfMonth(year, month) {
            return new Date(year, parseInt(month) + 1, 0).getDay();
        },
        populateCalendar(year, month) {
            this.calendarDays = [];
            const firstDayOfMonth = this.getFirstDayOfMonth(year, month);
            const numberOfRows = Math.ceil(this.getNumberOfDaysInMonth(year, month) / 7);
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
                    row.push({ day: this.getNumberOfDaysInPreviousMonth(year, month) - decrement, month: this.getPreviousMonth(month), year: parseInt(year) - 1});
                    else 
                    row.push({ day: this.getNumberOfDaysInPreviousMonth(year, month) - decrement, month: this.getPreviousMonth(month), year: parseInt(year)});
                    decrement++;
                }
                row.reverse();
                }
                // Fills the rest of the rows
                for (let y = row.length; y < 7  && y < this.getNumberOfDaysInMonth(year, month); y++) {
                // While current month days are not excedeed
                if (dayNumber <= this.getNumberOfDaysInMonth(year, month)) {
                    row.push({day: dayNumber, month: month, year: year});
                    dayNumber++;
                } else {
                    // Fills space left 
                    for (let j = row.length; j < 7; j++) {
                    if (parseInt(month) == 12) 
                        row.push({day: increment, month: this.getNextMonth(month), year: parseInt(year) + 1});
                    else
                        row.push({day: increment, month: this.getNextMonth(month), year: year});
                    increment++;
                    let t = row;
                    }
                } 
                }
                this.calendarDays.push(row);
            }
        },
            setPreviousMonth() {
                let activeYear = this.activeDate.substring(0, 4);
                let activeMonth = this.activeDate.substring(4, 6);
                if (parseInt(activeMonth) == 1) {
                    activeYear = parseInt(activeYear) - 1;
                    activeMonth = '12';
                } else {
                    activeMonth = ('0' + (parseInt(activeMonth) - 1)).slice(-2);
                }
                this.activeDate = activeYear + activeMonth;
                this.populateCalendar(activeYear, activeMonth);
                this.animeSwipeRight()
            },
            setNextMonth() {
                let activeYear = this.activeDate.substring(0, 4);
                let activeMonth = this.activeDate.substring(4, 6);
                if (parseInt(activeMonth) == 12) {
                    activeYear = parseInt(activeYear) + 1;
                    activeMonth = '01';
                } else {
                    activeMonth = ('0' + (parseInt(activeMonth) + 1)).slice(-2);
                }
                this.activeDate = activeYear + activeMonth;
                this.populateCalendar(activeYear, activeMonth);
                this.animeSwipeLeft()
            },
            selectDay(cell) {
                if (cell.month == this.getPreviousMonth(this.activeDate.substring(4, 6))) {
                    this.setPreviousMonth();
                } else if (cell.month == this.getNextMonth(this.activeDate.substring(4, 6))) {
                    this.setNextMonth();
                }
                this.activeDay = cell.month + ("0" + cell.day).slice(-2) + cell.year;
                this.date = cell.month + '/' + ("0" + cell.day).slice(-2) + '/' + cell.year;
                this.setDateEvent();
            },
            isSelected(cell) {
                if (cell.month + ("0" + cell.day).slice(-2) + cell.year == this.activeDay)
                    return true;
            },
            isDisabled(cell) {
                if (parseInt(cell.month) !== parseInt(this.activeDate.substring(4, 6)))
                    return true;
            },
            animeSwipeLeft() {
                this.swipeLeft = true;
                setTimeout(() => {
                    this.swipeLeft = false;
                }, 300)
            },
            animeSwipeRight() {
                this.swipeRight = true;
                setTimeout(() => {
                    this.swipeRight = false;
                    }, 300)
            },
            setDateEvent() {
                this.$emit('date-set', this.date);
            },
            closeCalendar() {
                this.$emit('close-calendar');
            }
        },
    mounted() {
        this.populateCalendar(this.getCurrentYear(), this.getCurrentMonth());
        this.activeDate = this.getCurrentYear() + this.getCurrentMonth();
    }
})
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
