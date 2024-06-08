<script>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    components: {
        VueDatePicker,
    },
    data() {
        return {
            date: [new Date(), new Date()],
            startDateString: this.formatDate(new Date()),
            endDateString: this.formatDate(new Date()),
        }
    },
    watch: {
        startDateString(value) {
            if (!this.date) {
                this.date = [null, null]
            }
            this.date[0] = value ? this.parseDate(value) : null
        },
        endDateString(value) {
            if (!this.date) {
                this.date = [null, null]
            }
            this.date[1] = value ? this.parseDate(value) : null
        },
        date(newDates) {
            if (newDates && newDates.length === 2) {
                this.startDateString = this.formatDate(newDates[0])
                this.endDateString = this.formatDate(newDates[1])
            }
        },
    },

    methods: {
        handleDateChange(newDates) {
            this.date = newDates
        },
        setLastDay() {
            const today = new Date()
            const lastDayStart = new Date(today)
            lastDayStart.setDate(today.getDate() - 1)
            const lastDayEnd = new Date(today)
            this.date = [lastDayStart, lastDayEnd]
        },
        setLastWeek() {
            const today = new Date()
            const lastWeekStart = new Date(today)
            lastWeekStart.setDate(today.getDate() - 7)
            const lastWeekEnd = new Date(today)
            this.date = [lastWeekStart, lastWeekEnd]
        },
        setLastMonth() {
            const today = new Date()
            const lastMonthStart = new Date(today)
            lastMonthStart.setDate(today.getDate() - 30)
            const lastMonthEnd = new Date(today)
            this.date = [lastMonthStart, lastMonthEnd]
        },
        setLastYear() {
            const today = new Date()
            const lastYearStart = new Date(today)
            lastYearStart.setDate(today.getDate() - 365)
            const lastYearEnd = new Date(today)
            this.date = [lastYearStart, lastYearEnd]
        },
        formatDate(date) {
            if (!date) return ''
            const d = new Date(date)
            let day = '' + d.getDate()
            let month = '' + (d.getMonth() + 1)
            const year = d.getFullYear()

            if (month.length < 2) month = '0' + month
            if (day.length < 2) day = '0' + day

            return [year, month, day].join('-')
        },
        parseDate(dateString) {
            if (!dateString) return null
            const [year, month, day] = dateString.split('-')
            return new Date(year, month - 1, day)
        },
    },
}
</script>

<template>
    <div
        class="d-flex justify-content-md-between flex-column flex-md-row justify-content-start align-items-md-center filter-container">
        <div class="btn-group">
            <button class="btn range-button">Hammasi</button>
            <button class="btn range-button" @click="setLastMonth">
                <span class="d-none d-md-block">30 kunlik</span>
                <span class="d-md-none d-inline">30 k</span>
            </button>
            <button class="btn range-button" @click="setLastWeek">
                <span class="d-none d-md-block">7 kunlik</span>
                <span class="d-md-none d-inline">7 k</span>
            </button>
            <button class="btn range-button" @click="setLastDay">
                <span class="d-none d-md-block">24 soatlik</span>
                <span class="d-md-none d-inline">24 s</span>
            </button>
        </div>
        <div class="d-flex mt-3 mt-md-0">
            <div class="theme d-none d-md-block">
                <VueDatePicker
                    v-model="date"
                    :auto-apply="false"
                    range
                    :clearable="false"
                    :multi-calendars="{ solo: true }"
                    :enable-time-picker="false"
                    ref="dp"
                    month-name-format="long"
                    @update:model-value="handleDateChange"
                >
                    <template #dp-input="{ value, onClear }">
                        <button class="select-date-btn" type="button" v-if="!value">
                            <span>
                              <img class="mb-1" src="@/assets/images/calendar.svg" alt=""/>
                              <span class="ms-1">Sanani tanlang</span>
                            </span>
                        </button>
                        <button class="select-date-btn" v-else @click="onClear">
                            <span class="d-flex align-items-center">
                                <span>{{ value }}</span>
                                <span class="mx-1"></span>
                                <img width="15" src="@/assets/images/close-icon.svg" alt=""/>
                            </span>
                        </button>
                    </template>
                    <template #clear-icon></template>
                    <template #action-row="{ selectDate, closePicker }">
                        <div class="d-flex justify-content-between w-100">
                            <div class="d-flex align-items-center justify-content-center">
                                <input
                                    id="date-input-start"
                                    class="date-input"
                                    v-mask-date
                                    placeholder="YYYY-OO-KK"
                                    v-model="startDateString"
                                /> -
                                <input
                                    id="date-input-end"
                                    class="date-input"
                                    v-mask-date
                                    placeholder="YYYY-OO-KK"
                                    v-model="endDateString"
                                />
                            </div>
                        </div>
                        <div class="action-buttons d-flex align-items-center">
                            <button class="cancel" type="button" @click="closePicker">Bekor qilish</button>
                            <button class="accept" type="button" @click="selectDate">Bajarish</button>
                        </div>
                    </template>
                </VueDatePicker>
            </div>
            <div class="theme d-block d-md-none">
                <VueDatePicker
                    v-model="date"
                    range
                    :clearable="false"
                    :enable-time-picker="false"
                    ref="dp"
                    month-name-format="long"
                    @update:model-value="handleDateChange"
                >
                    <template #dp-input="{ value, onClear }">
                        <button class="select-date-btn" type="button" v-if="!value">
                            <span>
                                <img class="mb-1" src="@/assets/images/calendar.svg" alt=""/>
                                <span class="ms-1">Sanani tanlang</span>
                            </span>
                        </button>
                        <button class="select-date-btn" v-else @click="onClear">
                            <span class="d-flex align-items-center">
                                <span>{{ value }}</span>
                                <span class="mx-1"></span>
                                <img width="15" src="@/assets/images/close-icon.svg" alt=""/>
                            </span>
                        </button>
                    </template>
                    <template #top-extra="{ value }">
                        <div class="d-flex align-items-center justify-content-center">
                            <input
                                id="date-input-start"
                                class="date-input"
                                v-mask-date
                                placeholder="YYYY-OO-KK"
                                v-model="startDateString"
                            /> -
                            <input
                                id="date-input-end"
                                class="date-input"
                                v-mask-date
                                placeholder="YYYY-OO-KK"
                                v-model="endDateString"
                            />
                        </div>
                        <div class="d-flex justify-content-between w-100 mt-2">
                            <button class="set-range" type="button" @click="setLastWeek">Last Week</button>
                            <button class="set-range" type="button" @click="setLastMonth">Last Month</button>
                            <button class="set-range" type="button" @click="setLastYear">Last Year</button>
                        </div>
                    </template>
                    <template #clear-icon></template>
                    <template #action-row="{ selectDate, closePicker }">
                        <div class="d-flex justify-content-between w-100">
                            <div class="action-buttons d-flex align-items-center mx-auto">
                                <button class="cancel" type="button" @click="closePicker">Bekor qilish</button>
                                <button class="accept" type="button" @click="selectDate">Bajarish</button>
                            </div>
                        </div>
                    </template>
                </VueDatePicker>
            </div>
            <div class="action-buttons ms-3">
                <button class="filter-button action-button">
                    <img class="mb-1" src="@/assets/images/filter-lines.svg" alt="asd"/>
                    <span class="ms-1">Filtrlash</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

.filter-container {
    padding: 0 16px;
    margin: 24px 0;
}

.set-range {
    color: #7F56D9;
    font-weight: 600;
}

.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}

.btn-group {
    height: 40px;
    display: flex;
}

.filter-button {
    height: 40px;
    width: 115px;
}

.date-select-button {
    height: 40px;
    width: 149px;
}

.dp__arrow_top {
    display: none;
}


.range-button, .action-button {
    background: #f8f9fa;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
}

.range-button {
    padding: 10px 16px;
    flex: none !important;
}

.action-button {
    margin-right: 12px;
}

.action-button:last-child {
    margin-right: 0;
}

.range-button:hover, .action-button:hover {
    background: #e2e6ea;
}

.calendar-icon, .filter-icon {
    margin-right: 5px;
}

.calendar-icon:before {
    content: "📅";
}

.filter-icon:before {
    content: "🔍";
}

button {
    border: none;
    outline: none !important;
    background: transparent;
    cursor: pointer;
}

.action-buttons button {
    padding: 8px 16px;
    font-weight: 600;
    border-radius: 8px;
    transition: 200ms box-shadow;
}

.action-buttons button.cancel {
    width: 120px;
    margin-right: 8px;
    border: 1px solid #d0d5dd;
    color: #000;
}

.action-buttons button.accept {
    border: 1px solid #7f56d9;
    color: #fff;
    background-color: #7f56d9;
}

.action-buttons button:hover {
    box-shadow: 0 0 4px #7f56d9;
}

.date-input {
    text-align: center;
    max-width: 130px;
    overflow: hidden;
    font-size: 16px;
    line-height: 24px;
    padding: 5px 7px 5px 7px;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid #D0D5DD;
}

.date-input:focus {
    border-color: #7f56d9;
    outline: none;
}

.date-input:first-child {
    margin-right: 6px;
}

.date-input:last-child {
    margin-left: 6px;
}

button.select-date-btn {
    max-width: 160px;
    max-height: 40px;
    border: 1px solid #d0d5dd;
    padding: 8px 16px;
    color: #667085;
    display: flex;
    align-items: center;
    border-radius: 8px;
    font-size: 14px;
}

.dp__action_cancel {
    margin-right: 10px;
    height: 40px;
    padding: 10px 22px 10px 22px;
    gap: 8px;
    border-radius: 8px;
}

.dp__action_select {
    margin-right: 15px;
    height: 40px;
    padding: 10px 22px 10px 22px;
    gap: 8px;
    border-radius: 8px;
}

.dp__action_button {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
}

:root {
    /*General*/
    --dp-font-family: "Inter", blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
    --dp-border-radius: 6px; /*Configurable border-radius*/
    --dp-cell-border-radius: 50%; /*Specific border radius for the calendar cell*/
    --dp-common-transition: all 0.1s ease-in; /*Generic transition applied on buttons and calendar cells*/

    /*Sizing*/
    --dp-button-height: 35px; /*Size for buttons in overlays*/
    --dp-month-year-row-height: 35px; /*Height of the month-year select row*/
    --dp-month-year-row-button-size: 35px; /*Specific height for the next/previous buttons*/
    --dp-button-icon-height: 20px; /*Icon sizing in buttons*/
    --dp-cell-size: 40px; /*Width and height of calendar cell*/
    --dp-cell-padding: 7px; /*Padding in the cell*/
    --dp-common-padding: 12px; /*Common padding used*/
    --dp-input-icon-padding: 35px; /*Padding on the left side of the input if icon is present*/
    --dp-input-padding: 6px 30px 6px 12px; /*Padding in the input*/
    --dp-menu-min-width: 260px; /*Adjust the min width of the menu*/
    --dp-action-buttons-padding: 2px 5px; /*Adjust padding for the action buttons in action row*/
    --dp-row-margin: 5px 0; /*Adjust the spacing between rows in the calendar*/
    --dp-calendar-header-cell-padding: 0.5rem; /*Adjust padding in calendar header cells*/
    --dp-two-calendars-spacing: 10px; /*Space between multiple calendars*/
    --dp-overlay-col-padding: 3px; /*Padding in the overlay column*/
    --dp-time-inc-dec-button-size: 32px; /*Sizing for arrow buttons in the time picker*/
    --dp-menu-padding: 16px 8px; /*Menu padding*/

    /*Font sizes*/
    --dp-font-size: 14px; /*Default font-size*/
    --dp-preview-font-size: 0.8rem; /*Font size of the date preview in the action row*/
    --dp-time-font-size: 0.8rem; /*Font size in the time picker*/

    /*Transitions*/
    --dp-animation-duration: 0.1s; /*Transition duration*/
    --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1); /*Timing on menu appear animation*/
    --dp-transition-timing: solid; /*Timing on slide animations*/
}

.dp__cell--selected,
.dp__cell--range-start,
.dp__cell--range-end {
    border-radius: 50% !important;
}

.dp__today {
    background-color: #F2F4F7;
    color: #344054;
    border: 0;
}

.dp__range_start {
    border-end-end-radius: 0;
    border-start-end-radius: 0;
    background-color: #f3f3f3;
    position: relative;
    z-index: 0;
}

.dp__range_start::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: #7F56D9;
    border-radius: 50%;
    z-index: -1;
}

.dp__range_start > span {
    position: relative;
    z-index: 1;
}

.dp__range_end {
    border-end-start-radius: 0;
    border-start-start-radius: 0;
    background-color: #f3f3f3;
    position: relative;
    z-index: 0;
}

.dp__range_end::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: #7F56D9;
    border-radius: 50%;
    z-index: -1;
}

.dp__range_end > span {
    position: relative;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
}

.dp__month_year_select {
    width: 30%;
}

.dp__month_year_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.dp__btn.dp__month_year_select {
    display: inline-block;
    margin: 0;
}

.dp__btn.dp__month_year_select:first-child {
    margin-right: 5px;
}

.dp__btn.dp__month_year_select:last-child {
    margin-left: 5px;
}

.dp__calendar_header {
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;

}
</style>
