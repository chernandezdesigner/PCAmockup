<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <PhoneMockup>
      <div class="flex flex-col w-full h-full">
        <HeaderBar />
        <Breadcrumbs />
        <div class="flex-1 mt-8 px-4 space-y-4">
          <input 
            v-model="projectName"
            type="text" 
            class="form-input" 
            placeholder="Project Name" 
          />
          <input 
            v-model="projectNumber"
            type="text" 
            class="form-input" 
            placeholder="Project #" 
          />
          <input 
            v-model="address"
            type="text" 
            class="form-input" 
            placeholder="Street Address"
          />
          
          <Transition
            name="slide-fade"
            mode="out-in"
          >
            <div 
              v-if="address"
              class="space-y-4"
            >
            <input 
              v-model="city"
              type="text" 
              class="form-input" 
              placeholder="City"
            />
            
            <div class="grid grid-cols-2 gap-4">
              <!-- Mobile-friendly State Selector -->
              <div class="relative">
                <button
                  @click="toggleStateDropdown"
                  type="button"
                  class="form-dropdown-button"
                  :class="{ 'form-dropdown-button--active': showStateDropdown }"
                >
                  <span class="text-gray-700">{{ state || 'Select State' }}</span>
                  <svg 
                    class="w-4 h-4 text-gray-400 transition-transform duration-200"
                    :class="{ 'rotate-180': showStateDropdown }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <!-- Dropdown Menu -->
                <Transition name="dropdown">
                  <div 
                    v-if="showStateDropdown"
                    class="form-dropdown-menu"
                  >
                    <div class="py-1">
                      <button
                        v-for="stateOption in states"
                        :key="stateOption.value"
                        @click="selectState(stateOption.value)"
                        type="button"
                        class="form-dropdown-item"
                        :class="{ 'form-dropdown-item--selected': state === stateOption.value }"
                      >
                        {{ stateOption.label }}
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
              <input 
                v-model="zipCode"
                type="text" 
                class="form-input" 
                placeholder="ZIP Code"
              />
            </div>
            </div>
          </Transition>

          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
              <input type="text" class="form-input" placeholder="weather" />
            </div>
            <div class="col-span-1">
              <input type="text" class="form-input" placeholder="temperature" />
            </div>
          </div>

          <!-- Date and Time Selectors -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Date Selector -->
            <div class="relative">
              <button
                @click="openDateDrawer"
                type="button"
                class="form-dropdown-button"
              >
                <span class="text-gray-700">{{ selectedDate || 'Select Date' }}</span>
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
              <button
                @click="openTimeDrawer"
                type="button"
                class="form-dropdown-button"
              >
                <span class="text-gray-700">{{ selectedTime || 'Select Time' }}</span>
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

          <input type="text" class="form-input" placeholder="Inspector Name" />
          <input type="text" class="form-input" placeholder="Inspector Number" />
          <input type="text" class="form-input" placeholder="Access Issues?" />
          <!-- Property Type Selector -->
          <div class="relative">
            <button
              @click="togglePropertyTypeDropdown"
              type="button"
              class="form-dropdown-button"
              :class="{ 'form-dropdown-button--active': showPropertyTypeDropdown }"
            >
              <span class="text-gray-700">{{ propertyType || 'Surrounding Properties' }}</span>
              <svg 
                class="w-4 h-4 text-gray-400 transition-transform duration-200"
                :class="{ 'rotate-180': showPropertyTypeDropdown }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Dropdown Menu -->
            <Transition name="dropdown">
              <div 
                v-if="showPropertyTypeDropdown"
                class="form-dropdown-menu"
              >
                <div class="py-1">
                  <button
                    v-for="propertyOption in propertyTypes"
                    :key="propertyOption.value"
                    @click="selectPropertyType(propertyOption.value)"
                    type="button"
                    class="form-dropdown-item"
                    :class="{ 'form-dropdown-item--selected': propertyType === propertyOption.value }"
                  >
                    {{ propertyOption.label }}
                  </button>
                </div>
              </div>
            </Transition>
          </div>

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
            
            <!-- Date Picker -->
            <div class="p-4">
              <input
                v-model="selectedDate"
                type="date"
                class="form-drawer-input"
              />
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
            
            <!-- Time Picker -->
            <div class="p-4">
              <input
                v-model="selectedTime"
                type="time"
                class="form-drawer-input"
              />
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
    </PhoneMockup>
  </div>
</template>

<script setup lang="ts">
import { ref, Transition, onMounted, onUnmounted } from 'vue';
import PhoneMockup from '../components/PhoneMockup.vue';
import HeaderBar from '../components/HeaderBar.vue';
import Breadcrumbs from '../components/Breadcrumbs.vue';

// Reactive data
const projectName = ref('');
const projectNumber = ref('');
const address = ref('');
const city = ref('');
const state = ref('');
const zipCode = ref('');
const showStateDropdown = ref(false);
const propertyType = ref('');
const showPropertyTypeDropdown = ref(false);
const selectedDate = ref('');
const showDateDrawer = ref(false);
const selectedTime = ref('');
const showTimeDrawer = ref(false);

// States data
const states = ref([
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
]);

// Property types data
const propertyTypes = ref([
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'vacant-land', label: 'Vacant Land' },
  { value: 'wooded-land', label: 'Wooded Land' },
  { value: 'water-feature', label: 'River / Creek / Pond / Ocean' }
]);

// Methods
const toggleStateDropdown = () => {
  showStateDropdown.value = !showStateDropdown.value;
};

const selectState = (stateValue: string) => {
  state.value = stateValue;
  showStateDropdown.value = false;
};

const togglePropertyTypeDropdown = () => {
  showPropertyTypeDropdown.value = !showPropertyTypeDropdown.value;
};

const selectPropertyType = (propertyValue: string) => {
  propertyType.value = propertyValue;
  showPropertyTypeDropdown.value = false;
};

const openDateDrawer = () => {
  showDateDrawer.value = true;
};

const closeDateDrawer = () => {
  showDateDrawer.value = false;
};

const confirmDate = () => {
  showDateDrawer.value = false;
};

const openTimeDrawer = () => {
  showTimeDrawer.value = true;
};

const closeTimeDrawer = () => {
  showTimeDrawer.value = false;
};

const confirmTime = () => {
  showTimeDrawer.value = false;
};

// Close dropdown when clicking outside
const closeDropdownOnOutsideClick = (event: Event) => {
  if (!(event.target as Element).closest('.relative')) {
    showStateDropdown.value = false;
    showPropertyTypeDropdown.value = false;
  }
};

// Add event listener for outside clicks
onMounted(() => {
  document.addEventListener('click', closeDropdownOnOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdownOnOutsideClick);
});
</script>

<style scoped>
/* Form Input Styles */
.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* Dropdown Button Styles */
.form-dropdown-button {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-dropdown-button:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.form-dropdown-button--active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* Dropdown Menu Styles */
.form-dropdown-menu {
  position: absolute;
  z-index: 50;
  width: 100%;
  margin-top: 0.25rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-height: 15rem;
  overflow-y: auto;
}

.form-dropdown-item {
  width: 100%;
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-size: 0.875rem;
  color: #374151;
  transition: colors 0.15s ease;
}

.form-dropdown-item:focus {
  background-color: #f3f4f6;
  outline: none;
}

.form-dropdown-item--selected {
  background-color: #eff6ff;
  color: #1d4ed8;
}

/* Drawer Input Styles */
.form-drawer-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1.125rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}

.form-drawer-input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* Drawer Button Styles */
.form-drawer-button {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
}

.form-drawer-button--primary {
  background-color: #3b82f6;
  color: white;
}

.form-drawer-button--secondary {
  color: #4b5563;
  border: 1px solid #d1d5db;
}

/* Animation Transitions */
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Dropdown transition */
.dropdown-enter-active {
  transition: all 0.2s ease-out;
}

.dropdown-leave-active {
  transition: all 0.15s ease-in;
}

.dropdown-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.dropdown-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Drawer transition */
.drawer-enter-active {
  transition: all 0.3s ease-out;
}

.drawer-leave-active {
  transition: all 0.3s ease-in;
}

.drawer-enter-from {
  transform: translateY(100%);
}

.drawer-leave-to {
  transform: translateY(100%);
}
</style>