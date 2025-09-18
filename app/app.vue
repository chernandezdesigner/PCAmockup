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
            class="w-full p-2 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none" 
            placeholder="Project Name" 
          />
          <input 
            v-model="projectNumber"
            type="text" 
            class="w-full p-2 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none" 
            placeholder="Project #" 
          />
          <input 
            v-model="address"
            type="text" 
            class="w-full p-2 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none" 
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
              class="w-full p-2 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none" 
              placeholder="City"
            />
            
            <div class="grid grid-cols-2 gap-4">
              <!-- Mobile-friendly State Selector -->
              <div class="relative">
                <button
                  @click="toggleStateDropdown"
                  type="button"
                  class="w-full p-2 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-left flex items-center justify-between"
                  :class="{ 'border-blue-500 ring-2 ring-blue-200': showStateDropdown }"
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
                    class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
                  >
                    <div class="py-1">
                      <button
                        v-for="stateOption in states"
                        :key="stateOption.value"
                        @click="selectState(stateOption.value)"
                        type="button"
                        class="w-full px-3 py-2 text-left text-sm text-gray-700 focus:bg-gray-100 focus:outline-none transition-colors duration-150"
                        :class="{ 'bg-blue-50 text-blue-700': state === stateOption.value }"
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
                class="w-full p-2 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none" 
                placeholder="ZIP Code"
              />
            </div>
            </div>
          </Transition>

          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
              <input type="text" class="w-full p-2 border border-gray-300 rounded-md  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none" placeholder="weather" />
            </div>
            <div class="col-span-1">
              <input type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none" placeholder="temperature" />
            </div>
          </div>

          <!-- Date and Time Selectors -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Date Selector -->
            <div class="relative">
              <button
                @click="openDateDrawer"
                type="button"
                class="w-full p-2 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-left flex items-center justify-between"
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
                class="w-full p-2 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-left flex items-center justify-between"
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

          <input type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none" placeholder="Inspector Name" />
          <input type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none" placeholder="Inspector Number" />
          <input type="text" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none" placeholder="Access Issues?" />
          <!-- Property Type Selector -->
          <div class="relative">
            <button
              @click="togglePropertyTypeDropdown"
              type="button"
              class="w-full p-2 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-left flex items-center justify-between"
              :class="{ 'border-blue-500 ring-2 ring-blue-200': showPropertyTypeDropdown }"
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
                class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
              >
                <div class="py-1">
                  <button
                    v-for="propertyOption in propertyTypes"
                    :key="propertyOption.value"
                    @click="selectPropertyType(propertyOption.value)"
                    type="button"
                    class="w-full px-3 py-2 text-left text-sm text-gray-700 focus:bg-gray-100 focus:outline-none transition-colors duration-150"
                    :class="{ 'bg-blue-50 text-blue-700': propertyType === propertyOption.value }"
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
                class="w-full p-3 text-lg border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            </div>
            
            <!-- Actions -->
            <div class="flex gap-3 p-4 border-t">
              <button 
                @click="closeDateDrawer"
                class="flex-1 px-4 py-3 text-gray-600 border border-gray-300 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button 
                @click="confirmDate"
                class="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium"
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
                class="w-full p-3 text-lg border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            </div>
            
            <!-- Actions -->
            <div class="flex gap-3 p-4 border-t">
              <button 
                @click="closeTimeDrawer"
                class="flex-1 px-4 py-3 text-gray-600 border border-gray-300 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button 
                @click="confirmTime"
                class="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium"
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

const selectState = (stateValue) => {
  state.value = stateValue;
  showStateDropdown.value = false;
};

const togglePropertyTypeDropdown = () => {
  showPropertyTypeDropdown.value = !showPropertyTypeDropdown.value;
};

const selectPropertyType = (propertyValue) => {
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
const closeDropdownOnOutsideClick = (event) => {
  if (!event.target.closest('.relative')) {
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