<template>
  <div class="space-y-4 pb-4">
    <!-- Step 1: HVAC Systems -->
    <div v-if="currentStep === 1">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">HVAC Systems</h2>
        <p class="text-base text-gray-600">Assess heating, ventilation, and air conditioning systems</p>
      </div>

      <div class="space-y-8">
        <!-- HVAC System Types -->
        <div class="relative">
          <label class="form-label">HVAC System Types (select all that apply)</label>
          <button
            @click="toggleHvacTypeDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showHvacTypeDropdown }"
          >
            <span class="text-gray-700">
              {{ selectedHvacTypes.length > 0 
                ? selectedHvacTypes.map(val => hvacTypeOptions.find(opt => opt.value === val)?.label).join(', ')
                : 'Select HVAC types' 
              }}
            </span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showHvacTypeDropdown }"
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
              v-if="showHvacTypeDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <button
                  v-for="hvacTypeOption in hvacTypeOptions"
                  :key="hvacTypeOption.value"
                  @click="toggleHvacTypeSelection(hvacTypeOption.value)"
                  type="button"
                  class="form-dropdown-item flex items-center justify-between"
                  :class="{ 'form-dropdown-item--selected': isHvacTypeSelected(hvacTypeOption.value) }"
                >
                  <span>{{ hvacTypeOption.label }}</span>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      :checked="isHvacTypeSelected(hvacTypeOption.value)"
                      class="checkbox checkbox-sm"
                      readonly
                    />
                  </div>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- HVAC Age -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="form-label">Heating System Age (years)</label>
            <input
              v-model="heatingAge"
              type="number"
              min="0"
              max="50"
              class="form-input"
              placeholder="Enter age"
            />
          </div>
          <div>
            <label class="form-label">Cooling System Age (years)</label>
            <input
              v-model="coolingAge"
              type="number"
              min="0"
              max="50"
              class="form-input"
              placeholder="Enter age"
            />
          </div>
        </div>

        <!-- HVAC Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">HVAC System Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="hvac-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="hvacConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <!-- Fair Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="hvac-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="hvacConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <!-- Poor Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="hvac-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="hvacConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Comments -->
        <div>
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input min-h-[100px] resize-none" placeholder="Describe HVAC system condition, maintenance needs, efficiency..." v-model="hvacComments"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Plumbing Systems -->
    <div v-if="currentStep === 2">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Plumbing Systems</h2>
        <p class="text-base text-gray-600">Assess water supply, drainage, and fixtures</p>
      </div>

      <div class="space-y-8">
        <!-- Plumbing Material Types -->
        <div class="relative">
          <label class="form-label">Primary Plumbing Materials (select all that apply)</label>
          <button
            @click="togglePlumbingMaterialDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showPlumbingMaterialDropdown }"
          >
            <span class="text-gray-700">
              {{ selectedPlumbingMaterials.length > 0 
                ? selectedPlumbingMaterials.map(val => plumbingMaterialOptions.find(opt => opt.value === val)?.label).join(', ')
                : 'Select plumbing materials' 
              }}
            </span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showPlumbingMaterialDropdown }"
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
              v-if="showPlumbingMaterialDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <button
                  v-for="plumbingMaterialOption in plumbingMaterialOptions"
                  :key="plumbingMaterialOption.value"
                  @click="togglePlumbingMaterialSelection(plumbingMaterialOption.value)"
                  type="button"
                  class="form-dropdown-item flex items-center justify-between"
                  :class="{ 'form-dropdown-item--selected': isPlumbingMaterialSelected(plumbingMaterialOption.value) }"
                >
                  <span>{{ plumbingMaterialOption.label }}</span>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      :checked="isPlumbingMaterialSelected(plumbingMaterialOption.value)"
                      class="checkbox checkbox-sm"
                      readonly
                    />
                  </div>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Water Pressure -->
        <div class="relative">
          <label class="form-label">Water Pressure</label>
          <button
            @click="toggleWaterPressureDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showWaterPressureDropdown }"
          >
            <span class="text-gray-700">{{ waterPressure || 'Select water pressure' }}</span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showWaterPressureDropdown }"
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
              v-if="showWaterPressureDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <button
                  v-for="pressureOption in waterPressureOptions"
                  :key="pressureOption.value"
                  @click="selectWaterPressure(pressureOption.value)"
                  type="button"
                  class="form-dropdown-item"
                  :class="{ 'form-dropdown-item--selected': waterPressure === pressureOption.value }"
                >
                  {{ pressureOption.label }}
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Plumbing Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">Plumbing System Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="plumbing-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="plumbingConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <!-- Fair Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="plumbing-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="plumbingConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <!-- Poor Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="plumbing-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="plumbingConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Comments -->
        <div>
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input min-h-[100px] resize-none" placeholder="Describe plumbing condition, leaks, water pressure issues..." v-model="plumbingComments"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3: Electrical Systems -->
    <div v-if="currentStep === 3">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Electrical Systems</h2>
        <p class="text-base text-gray-600">Assess electrical panels, wiring, and safety systems</p>
      </div>

      <div class="space-y-8">
        <!-- Electrical Panel Type -->
        <div class="relative">
          <label class="form-label">Main Electrical Panel Type</label>
          <button
            @click="toggleElectricalPanelDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showElectricalPanelDropdown }"
          >
            <span class="text-gray-700">{{ electricalPanelType || 'Select panel type' }}</span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showElectricalPanelDropdown }"
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
              v-if="showElectricalPanelDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <button
                  v-for="panelOption in electricalPanelOptions"
                  :key="panelOption.value"
                  @click="selectElectricalPanel(panelOption.value)"
                  type="button"
                  class="form-dropdown-item"
                  :class="{ 'form-dropdown-item--selected': electricalPanelType === panelOption.value }"
                >
                  {{ panelOption.label }}
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Electrical Service Capacity -->
        <div>
          <label class="form-label">Service Capacity (Amps)</label>
          <input
            v-model="electricalServiceCapacity"
            type="number"
            min="0"
            class="form-input"
            placeholder="e.g., 200, 400, 800"
          />
        </div>

        <!-- Safety Systems Checklist -->
        <div>
          <div class="mb-3">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Safety Systems</h3>
            <p class="text-sm text-gray-600">Check installed safety systems</p>
          </div>
          
          <div class="modern-dynamic-item">
            <div class="scrollable-card-content">
              <div
                v-for="(system, index) in safetySystems"
                :key="system.id"
                class="scrollable-option-item"
                :class="{ 'border-b border-gray-200': index < safetySystems.length - 1 }"
              >
                <span class="option-label">{{ system.name }}</span>
                <div class="option-controls">
                  <label class="modern-checkbox">
                    <input
                      type="checkbox"
                      :id="`safety-system-${system.id}`"
                      v-model="system.value"
                      class="modern-checkbox-input"
                    />
                    <span class="modern-checkbox-box"></span>
                  </label>
                  <span class="modern-status-badge" :class="{ 'modern-status-badge--active': system.value }">{{ system.value ? 'Yes' : 'No' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Electrical Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">Electrical System Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="electrical-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="electricalConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <!-- Fair Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="electrical-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="electricalConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <!-- Poor Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="electrical-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="electricalConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Comments -->
        <div>
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input min-h-[100px] resize-none" placeholder="Describe electrical system condition, code compliance, safety concerns..." v-model="electricalComments"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 4: Fire Safety Systems -->
    <div v-if="currentStep === 4">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Fire Safety Systems</h2>
        <p class="text-base text-gray-600">Assess fire detection, suppression, and safety systems</p>
      </div>

      <div class="space-y-8">
        <!-- Fire Safety Systems Checklist -->
        <div>
          <div class="mb-3">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Fire Safety Equipment</h3>
            <p class="text-sm text-gray-600">Check installed fire safety systems</p>
          </div>
          
          <div class="modern-dynamic-item">
            <div class="scrollable-card-content">
              <div
                v-for="(system, index) in fireSafetySystems"
                :key="system.id"
                class="scrollable-option-item"
                :class="{ 'border-b border-gray-200': index < fireSafetySystems.length - 1 }"
              >
                <span class="option-label">{{ system.name }}</span>
                <div class="option-controls">
                  <label class="modern-checkbox">
                    <input
                      type="checkbox"
                      :id="`fire-safety-${system.id}`"
                      v-model="system.value"
                      class="modern-checkbox-input"
                    />
                    <span class="modern-checkbox-box"></span>
                  </label>
                  <span class="modern-status-badge" :class="{ 'modern-status-badge--active': system.value }">{{ system.value ? 'Yes' : 'No' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Fire Safety Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">Fire Safety System Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="fire-safety-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="fireSafetyConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <!-- Fair Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="fire-safety-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="fireSafetyConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <!-- Poor Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="fire-safety-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="fireSafetyConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Comments -->
        <div>
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input min-h-[100px] resize-none" placeholder="Describe fire safety system condition, compliance, testing dates..." v-model="fireSafetyComments"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, readonly } from 'vue'

// Define emits
const emit = defineEmits(['form-complete', 'next-step', 'previous-step', 'step-change'])

// Form state
const currentStep = ref(1)
const totalSteps = ref(4)

// Step 1 - HVAC Systems data
const selectedHvacTypes = ref([])
const heatingAge = ref('')
const coolingAge = ref('')
const hvacConditionAssessment = ref('')
const hvacComments = ref('')
const showHvacTypeDropdown = ref(false)

// Step 2 - Plumbing Systems data
const selectedPlumbingMaterials = ref([])
const waterPressure = ref('')
const plumbingConditionAssessment = ref('')
const plumbingComments = ref('')
const showPlumbingMaterialDropdown = ref(false)
const showWaterPressureDropdown = ref(false)

// Step 3 - Electrical Systems data
const electricalPanelType = ref('')
const electricalServiceCapacity = ref('')
const electricalConditionAssessment = ref('')
const electricalComments = ref('')
const showElectricalPanelDropdown = ref(false)

// Step 4 - Fire Safety Systems data
const fireSafetyConditionAssessment = ref('')
const fireSafetyComments = ref('')

// Options data
const hvacTypeOptions = ref([
  { value: 'central-air', label: 'Central Air/Heat' },
  { value: 'split-system', label: 'Split System' },
  { value: 'package-unit', label: 'Package Unit' },
  { value: 'boiler', label: 'Boiler' },
  { value: 'heat-pump', label: 'Heat Pump' },
  { value: 'geothermal', label: 'Geothermal' },
  { value: 'radiant', label: 'Radiant Heat' }
])

const plumbingMaterialOptions = ref([
  { value: 'copper', label: 'Copper' },
  { value: 'pvc', label: 'PVC' },
  { value: 'pex', label: 'PEX' },
  { value: 'galvanized-steel', label: 'Galvanized Steel' },
  { value: 'cast-iron', label: 'Cast Iron' },
  { value: 'abs', label: 'ABS' }
])

const waterPressureOptions = ref([
  { value: 'low', label: 'Low (< 30 PSI)' },
  { value: 'normal', label: 'Normal (30-80 PSI)' },
  { value: 'high', label: 'High (> 80 PSI)' }
])

const electricalPanelOptions = ref([
  { value: 'circuit-breaker', label: 'Circuit Breaker' },
  { value: 'fuse-box', label: 'Fuse Box' },
  { value: 'sub-panel', label: 'Sub Panel' },
  { value: 'main-disconnect', label: 'Main Disconnect' }
])

// Safety systems checklist
const safetySystems = ref([
  { id: 1, name: 'Smoke Detectors', value: false },
  { id: 2, name: 'Carbon Monoxide Detectors', value: false },
  { id: 3, name: 'GFCI Outlets', value: false },
  { id: 4, name: 'Arc Fault Breakers', value: false },
  { id: 5, name: 'Emergency Lighting', value: false },
  { id: 6, name: 'Exit Signs', value: false }
])

// Fire safety systems checklist
const fireSafetySystems = ref([
  { id: 1, name: 'Fire Alarm System', value: false },
  { id: 2, name: 'Sprinkler System', value: false },
  { id: 3, name: 'Fire Extinguishers', value: false },
  { id: 4, name: 'Emergency Exits', value: false },
  { id: 5, name: 'Fire Doors', value: false },
  { id: 6, name: 'Knox Box', value: false }
])

// Computed properties
const canGoNext = computed(() => {
  return currentStep.value < totalSteps.value
})

const canGoPrevious = computed(() => {
  return currentStep.value > 1
})

const isComplete = computed(() => {
  return currentStep.value === totalSteps.value && 
         hvacConditionAssessment.value !== '' &&
         plumbingConditionAssessment.value !== '' &&
         electricalConditionAssessment.value !== '' &&
         fireSafetyConditionAssessment.value !== ''
})

// Methods
const toggleHvacTypeDropdown = () => {
  showHvacTypeDropdown.value = !showHvacTypeDropdown.value
}

const toggleHvacTypeSelection = (value) => {
  const index = selectedHvacTypes.value.indexOf(value)
  if (index > -1) {
    selectedHvacTypes.value.splice(index, 1)
  } else {
    selectedHvacTypes.value.push(value)
  }
}

const isHvacTypeSelected = (value) => {
  return selectedHvacTypes.value.includes(value)
}

const togglePlumbingMaterialDropdown = () => {
  showPlumbingMaterialDropdown.value = !showPlumbingMaterialDropdown.value
}

const togglePlumbingMaterialSelection = (value) => {
  const index = selectedPlumbingMaterials.value.indexOf(value)
  if (index > -1) {
    selectedPlumbingMaterials.value.splice(index, 1)
  } else {
    selectedPlumbingMaterials.value.push(value)
  }
}

const isPlumbingMaterialSelected = (value) => {
  return selectedPlumbingMaterials.value.includes(value)
}

const toggleWaterPressureDropdown = () => {
  showWaterPressureDropdown.value = !showWaterPressureDropdown.value
}

const selectWaterPressure = (value) => {
  waterPressure.value = value
  showWaterPressureDropdown.value = false
}

const toggleElectricalPanelDropdown = () => {
  showElectricalPanelDropdown.value = !showElectricalPanelDropdown.value
}

const selectElectricalPanel = (value) => {
  electricalPanelType.value = value
  showElectricalPanelDropdown.value = false
}

const goToNextStep = () => {
  if (canGoNext.value) {
    currentStep.value++
    emit('step-change')
    
    if (isComplete.value) {
      emit('form-complete')
    }
  }
}

const goToPreviousStep = () => {
  if (canGoPrevious.value) {
    currentStep.value--
    emit('step-change')
  }
}

// Expose methods and properties for parent component
defineExpose({
  currentStep: readonly(currentStep),
  totalSteps: readonly(totalSteps),
  goToNextStep,
  goToPreviousStep,
  canGoNext: readonly(canGoNext),
  canGoPrevious: readonly(canGoPrevious),
  isComplete: readonly(isComplete)
})
</script>
