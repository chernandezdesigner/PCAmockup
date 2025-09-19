<template>
  <div class="grid grid-cols-2 gap-4">
    <!-- Date Selector -->
    <div class="relative">
      <label class="form-label">{{ dateLabel }}</label>
      <button
        @click="openDateDrawer"
        type="button"
        class="form-dropdown-button"
      >
        <span class="text-gray-700">{{ formatDisplayDate(selectedDate) || 'Select Date' }}</span>
        <svg
          class="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
    </div>

    <!-- Time Selector -->
    <div class="relative">
      <label class="form-label">{{ timeLabel }}</label>
      <button
        @click="openTimeDrawer"
        type="button"
        class="form-dropdown-button"
      >
        <span class="text-gray-700">{{ formatDisplayTime(selectedTime) || 'Select Time' }}</span>
        <svg
          class="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Date Picker Drawer -->
  <Transition name="drawer">
    <div
      v-if="showDateDrawer"
      class="absolute inset-0 z-50 flex items-end justify-center"
      @click="closeDateDrawer"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <!-- Drawer Content -->
      <div
        class="relative w-full bg-white rounded-t-2xl shadow-2xl"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-semibold text-gray-900">Select Date</h3>
          <button
            @click="closeDateDrawer"
            class="p-2 text-gray-400"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Custom Date Picker -->
        <div class="p-6">
          <div class="date-picker-grid">
            <!-- Month/Year Header -->
            <div class="flex items-center justify-between mb-6">
              <button
                @click="previousMonth"
                class="date-nav-button"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h4 class="text-lg font-semibold text-gray-900">{{ currentMonthYear }}</h4>
              <button
                @click="nextMonth"
                class="date-nav-button"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- Day Labels -->
            <div class="grid grid-cols-7 gap-1 mb-2">
              <div v-for="day in dayLabels" :key="day" class="text-center text-sm font-medium text-gray-500 py-2">
                {{ day }}
              </div>
            </div>

            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-1">
              <button
                v-for="date in calendarDates"
                :key="date.key"
                @click="selectDate(date)"
                :disabled="!date.inCurrentMonth"
                class="date-cell"
                :class="{
                  'date-cell--today': date.isToday,
                  'date-cell--selected': date.isSelected,
                  'date-cell--other-month': !date.inCurrentMonth
                }"
              >
                {{ date.day }}
              </button>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 p-4 border-t">
          <button
            @click="closeDateDrawer"
            class="form-drawer-button form-drawer-button--secondary"
          >
            Cancel
          </button>
          <button
            @click="confirmDate"
            class="form-drawer-button form-drawer-button--primary"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Time Picker Drawer -->
  <Transition name="drawer">
    <div
      v-if="showTimeDrawer"
      class="absolute inset-0 z-50 flex items-end justify-center"
      @click="closeTimeDrawer"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <!-- Drawer Content -->
      <div
        class="relative w-full bg-white rounded-t-2xl shadow-2xl"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-semibold text-gray-900">Select Time</h3>
          <button
            @click="closeTimeDrawer"
            class="p-2 text-gray-400"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Custom Time Picker -->
        <div class="p-6">
          <div class="time-picker-container">
            <div class="flex items-center justify-center space-x-4">
              <!-- Hour Selector -->
              <div class="time-column">
                <label class="time-label">Hour</label>
                <div class="time-scroll-area">
                  <button
                    v-for="hour in hours"
                    :key="hour"
                    @click="selectedHour = hour"
                    class="time-option"
                    :class="{ 'time-option--selected': selectedHour === hour }"
                  >
                    {{ hour.toString().padStart(2, '0') }}
                  </button>
                </div>
              </div>

              <div class="text-2xl font-bold text-gray-400">:</div>

              <!-- Minute Selector -->
              <div class="time-column">
                <label class="time-label">Minute</label>
                <div class="time-scroll-area">
                  <button
                    v-for="minute in minutes"
                    :key="minute"
                    @click="selectedMinute = minute"
                    class="time-option"
                    :class="{ 'time-option--selected': selectedMinute === minute }"
                  >
                    {{ minute.toString().padStart(2, '0') }}
                  </button>
                </div>
              </div>

              <!-- AM/PM Selector -->
              <div class="time-column">
                <label class="time-label">Period</label>
                <div class="time-scroll-area">
                  <button
                    @click="selectedPeriod = 'AM'"
                    class="time-option"
                    :class="{ 'time-option--selected': selectedPeriod === 'AM' }"
                  >
                    AM
                  </button>
                  <button
                    @click="selectedPeriod = 'PM'"
                    class="time-option"
                    :class="{ 'time-option--selected': selectedPeriod === 'PM' }"
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>

            <!-- Time Display -->
            <div class="mt-6 text-center">
              <div class="text-2xl font-bold text-gray-900">
                {{ formatSelectedTime() }}
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 p-4 border-t">
          <button
            @click="closeTimeDrawer"
            class="form-drawer-button form-drawer-button--secondary"
          >
            Cancel
          </button>
          <button
            @click="confirmTime"
            class="form-drawer-button form-drawer-button--primary"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  dateValue: string
  timeValue: string
  dateLabel?: string
  timeLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  dateLabel: 'Date',
  timeLabel: 'Time'
})

const emit = defineEmits<{
  'update:dateValue': [value: string]
  'update:timeValue': [value: string]
}>()

// Date picker state
const selectedDate = ref(props.dateValue)
const selectedTime = ref(props.timeValue)
const showDateDrawer = ref(false)
const showTimeDrawer = ref(false)
const currentDate = ref(new Date())
const selectedDateObj = ref(new Date())
const dayLabels = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])

// Time picker state
const selectedHour = ref(new Date().getHours() % 12 || 12)
const selectedMinute = ref(0)
const selectedPeriod = ref(new Date().getHours() >= 12 ? 'PM' : 'AM')
const hours = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
const minutes = ref([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55])

// Computed properties
const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const calendarDates = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const dates = []
  const today = new Date()

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    dates.push({
      day: date.getDate(),
      date: date,
      key: date.toISOString(),
      inCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: selectedDateObj.value && date.toDateString() === selectedDateObj.value.toDateString()
    })
  }

  return dates
})

// Date picker methods
const openDateDrawer = () => {
  showDateDrawer.value = true
}

const closeDateDrawer = () => {
  showDateDrawer.value = false
}

const openTimeDrawer = () => {
  showTimeDrawer.value = true
}

const closeTimeDrawer = () => {
  showTimeDrawer.value = false
}

const previousMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

const nextMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

const selectDate = (dateObj: any) => {
  if (dateObj.inCurrentMonth) {
    selectedDateObj.value = dateObj.date
    selectedDate.value = dateObj.date.toISOString().split('T')[0]
  }
}

const confirmDate = () => {
  emit('update:dateValue', selectedDate.value)
  showDateDrawer.value = false
}

const confirmTime = () => {
  const hour24 = selectedPeriod.value === 'PM' && selectedHour.value !== 12
    ? selectedHour.value + 12
    : selectedPeriod.value === 'AM' && selectedHour.value === 12
    ? 0
    : selectedHour.value

  const timeString = `${hour24.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')}`
  selectedTime.value = timeString
  emit('update:timeValue', timeString)
  showTimeDrawer.value = false
}

// Format display methods
const formatDisplayDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

const formatDisplayTime = (timeString: string) => {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours)
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${period}`
}

const formatSelectedTime = () => {
  return `${selectedHour.value.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')} ${selectedPeriod.value}`
}

// Watch for prop changes
watch(() => props.dateValue, (newValue) => {
  selectedDate.value = newValue
})

watch(() => props.timeValue, (newValue) => {
  selectedTime.value = newValue
})
</script>

<style scoped>
/* Include all the existing styles from the original app.vue */
.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  letter-spacing: 0.025em;
}

.form-dropdown-button {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #1f2937;
  background-color: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: all 0.2s ease-in-out;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-height: 52px;
}

.form-dropdown-button:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #fefefe;
}

.form-dropdown-button:hover:not(:focus) {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

.form-drawer-button {
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-drawer-button--primary {
  background-color: #3b82f6;
  color: white;
  border: 2px solid #3b82f6;
}

.form-drawer-button--primary:hover {
  background-color: #2563eb;
  border-color: #2563eb;
  transform: translateY(-1px);
}

.form-drawer-button--secondary {
  color: #4b5563;
  background-color: #ffffff;
  border: 2px solid #e5e7eb;
}

.form-drawer-button--secondary:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
  color: #374151;
}

/* Custom Date Picker */
.date-picker-grid {
  @apply select-none;
}

.date-nav-button {
  @apply w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors;
}

.date-cell {
  @apply w-10 h-10 flex items-center justify-center text-sm font-medium rounded-full transition-all duration-200;
  @apply text-gray-700 hover:bg-gray-100;
}

.date-cell--today {
  @apply bg-blue-100 text-blue-700 font-bold;
}

.date-cell--selected {
  @apply bg-blue-600 text-white font-bold;
}

.date-cell--other-month {
  @apply text-gray-400 cursor-not-allowed;
}

.date-cell:disabled {
  @apply cursor-not-allowed;
}

/* Custom Time Picker */
.time-picker-container {
  @apply select-none;
}

.time-column {
  @apply flex flex-col items-center;
}

.time-label {
  @apply text-sm font-medium text-gray-700 mb-3;
}

.time-scroll-area {
  @apply h-32 overflow-y-auto flex flex-col items-center space-y-2 px-2;
  scrollbar-width: none;
}

.time-scroll-area::-webkit-scrollbar {
  display: none;
}

.time-option {
  @apply w-12 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200;
  @apply text-gray-700 hover:bg-gray-100;
}

.time-option--selected {
  @apply bg-blue-600 text-white font-bold;
}

/* Drawer transition */
.drawer-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.drawer-leave-active {
  transition: all 0.3s ease-in;
}

.drawer-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.drawer-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Mobile-optimized touch targets */
@media (max-width: 768px) {
  .form-dropdown-button {
    min-height: 48px;
  }
}
</style>