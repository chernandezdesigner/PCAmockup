<template>
  <div class="space-y-4 pb-4">
    <!-- Step 1: Common Areas -->
    <div v-if="currentStep === 1">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Common Areas</h2>
        <p class="text-base text-gray-600">Assess lobbies, hallways, and shared spaces</p>
      </div>

      <div class="space-y-8">
        <!-- Common Area Types -->
        <div class="relative">
          <label class="form-label">Common Area Types (select all that apply)</label>
          <button
            @click="toggleCommonAreaDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showCommonAreaDropdown }"
          >
            <span class="text-gray-700">
              {{ selectedCommonAreas.length > 0 
                ? selectedCommonAreas.map(val => commonAreaOptions.find(opt => opt.value === val)?.label).join(', ')
                : 'Select common areas' 
              }}
            </span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showCommonAreaDropdown }"
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
              v-if="showCommonAreaDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <button
                  v-for="commonAreaOption in commonAreaOptions"
                  :key="commonAreaOption.value"
                  @click="toggleCommonAreaSelection(commonAreaOption.value)"
                  type="button"
                  class="form-dropdown-item flex items-center justify-between"
                  :class="{ 'form-dropdown-item--selected': isCommonAreaSelected(commonAreaOption.value) }"
                >
                  <span>{{ commonAreaOption.label }}</span>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      :checked="isCommonAreaSelected(commonAreaOption.value)"
                      class="checkbox checkbox-sm"
                      readonly
                    />
                  </div>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Common Area Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">Common Area Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="common-area-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="commonAreaConditionAssessment"
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
                  name="common-area-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="commonAreaConditionAssessment"
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
                  name="common-area-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="commonAreaConditionAssessment"
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
            <textarea class="form-input min-h-[100px] resize-none" placeholder="Describe common area condition, cleanliness, accessibility..." v-model="commonAreaComments"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Flooring and Finishes -->
    <div v-if="currentStep === 2">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Flooring and Finishes</h2>
        <p class="text-base text-gray-600">Assess floor materials, wall finishes, and ceilings</p>
      </div>

      <div class="space-y-8">
        <!-- Flooring Types -->
        <div class="relative">
          <label class="form-label">Primary Flooring Types (select all that apply)</label>
          <button
            @click="toggleFlooringTypeDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showFlooringTypeDropdown }"
          >
            <span class="text-gray-700">
              {{ selectedFlooringTypes.length > 0 
                ? selectedFlooringTypes.map(val => flooringTypeOptions.find(opt => opt.value === val)?.label).join(', ')
                : 'Select flooring types' 
              }}
            </span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showFlooringTypeDropdown }"
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
              v-if="showFlooringTypeDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <button
                  v-for="flooringTypeOption in flooringTypeOptions"
                  :key="flooringTypeOption.value"
                  @click="toggleFlooringTypeSelection(flooringTypeOption.value)"
                  type="button"
                  class="form-dropdown-item flex items-center justify-between"
                  :class="{ 'form-dropdown-item--selected': isFlooringTypeSelected(flooringTypeOption.value) }"
                >
                  <span>{{ flooringTypeOption.label }}</span>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      :checked="isFlooringTypeSelected(flooringTypeOption.value)"
                      class="checkbox checkbox-sm"
                      readonly
                    />
                  </div>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Wall Finish Type -->
        <div class="relative">
          <label class="form-label">Primary Wall Finish</label>
          <button
            @click="toggleWallFinishDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showWallFinishDropdown }"
          >
            <span class="text-gray-700">{{ wallFinishType || 'Select wall finish' }}</span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showWallFinishDropdown }"
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
              v-if="showWallFinishDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <button
                  v-for="wallFinishOption in wallFinishOptions"
                  :key="wallFinishOption.value"
                  @click="selectWallFinish(wallFinishOption.value)"
                  type="button"
                  class="form-dropdown-item"
                  :class="{ 'form-dropdown-item--selected': wallFinishType === wallFinishOption.value }"
                >
                  {{ wallFinishOption.label }}
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Flooring Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">Flooring Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="flooring-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="flooringConditionAssessment"
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
                  name="flooring-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="flooringConditionAssessment"
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
                  name="flooring-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="flooringConditionAssessment"
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
            <textarea class="form-input min-h-[100px] resize-none" placeholder="Describe flooring and finish condition, wear patterns, damage..." v-model="flooringComments"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3: Lighting and Fixtures -->
    <div v-if="currentStep === 3">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Lighting and Fixtures</h2>
        <p class="text-base text-gray-600">Assess interior lighting and fixture conditions</p>
      </div>

      <div class="space-y-8">
        <!-- Lighting Types -->
        <div class="relative">
          <label class="form-label">Lighting Types (select all that apply)</label>
          <button
            @click="toggleLightingTypeDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showLightingTypeDropdown }"
          >
            <span class="text-gray-700">
              {{ selectedLightingTypes.length > 0 
                ? selectedLightingTypes.map(val => lightingTypeOptions.find(opt => opt.value === val)?.label).join(', ')
                : 'Select lighting types' 
              }}
            </span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showLightingTypeDropdown }"
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
              v-if="showLightingTypeDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <button
                  v-for="lightingTypeOption in lightingTypeOptions"
                  :key="lightingTypeOption.value"
                  @click="toggleLightingTypeSelection(lightingTypeOption.value)"
                  type="button"
                  class="form-dropdown-item flex items-center justify-between"
                  :class="{ 'form-dropdown-item--selected': isLightingTypeSelected(lightingTypeOption.value) }"
                >
                  <span>{{ lightingTypeOption.label }}</span>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      :checked="isLightingTypeSelected(lightingTypeOption.value)"
                      class="checkbox checkbox-sm"
                      readonly
                    />
                  </div>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Lighting Level Assessment -->
        <div class="relative">
          <label class="form-label">Overall Lighting Level</label>
          <button
            @click="toggleLightingLevelDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showLightingLevelDropdown }"
          >
            <span class="text-gray-700">{{ lightingLevel || 'Select lighting level' }}</span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showLightingLevelDropdown }"
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
              v-if="showLightingLevelDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <button
                  v-for="levelOption in lightingLevelOptions"
                  :key="levelOption.value"
                  @click="selectLightingLevel(levelOption.value)"
                  type="button"
                  class="form-dropdown-item"
                  :class="{ 'form-dropdown-item--selected': lightingLevel === levelOption.value }"
                >
                  {{ levelOption.label }}
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Lighting Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">Lighting Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="lighting-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="lightingConditionAssessment"
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
                  name="lighting-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="lightingConditionAssessment"
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
                  name="lighting-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="lightingConditionAssessment"
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
            <textarea class="form-input min-h-[100px] resize-none" placeholder="Describe lighting condition, burned out bulbs, fixture issues..." v-model="lightingComments"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 4: Unit Conditions -->
    <div v-if="currentStep === 4">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Unit Conditions</h2>
        <p class="text-base text-gray-600">Assess individual unit conditions and amenities</p>
      </div>

      <div class="space-y-8">
        <!-- Unit Amenities Checklist -->
        <div>
          <div class="mb-3">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Unit Amenities</h3>
            <p class="text-sm text-gray-600">Check available unit amenities</p>
          </div>
          
          <div class="modern-dynamic-item">
            <div class="scrollable-card-content">
              <div
                v-for="(amenity, index) in unitAmenities"
                :key="amenity.id"
                class="scrollable-option-item"
                :class="{ 'border-b border-gray-200': index < unitAmenities.length - 1 }"
              >
                <span class="option-label">{{ amenity.name }}</span>
                <div class="option-controls">
                  <label class="modern-checkbox">
                    <input
                      type="checkbox"
                      :id="`unit-amenity-${amenity.id}`"
                      v-model="amenity.value"
                      class="modern-checkbox-input"
                    />
                    <span class="modern-checkbox-box"></span>
                  </label>
                  <span class="modern-status-badge" :class="{ 'modern-status-badge--active': amenity.value }">{{ amenity.value ? 'Yes' : 'No' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Unit Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">Overall Unit Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="unit-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="unitConditionAssessment"
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
                  name="unit-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="unitConditionAssessment"
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
                  name="unit-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="unitConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Average Unit Size -->
        <div>
          <label class="form-label">Average Unit Size (sq ft)</label>
          <input
            v-model="averageUnitSize"
            type="number"
            min="0"
            class="form-input"
            placeholder="Enter average square footage"
          />
        </div>

        <!-- Comments -->
        <div>
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input min-h-[100px] resize-none" placeholder="Describe unit conditions, variations between units, tenant improvements..." v-model="unitComments"></textarea>
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

// Step 1 - Common Areas data
const selectedCommonAreas = ref([])
const commonAreaConditionAssessment = ref('')
const commonAreaComments = ref('')
const showCommonAreaDropdown = ref(false)

// Step 2 - Flooring and Finishes data
const selectedFlooringTypes = ref([])
const wallFinishType = ref('')
const flooringConditionAssessment = ref('')
const flooringComments = ref('')
const showFlooringTypeDropdown = ref(false)
const showWallFinishDropdown = ref(false)

// Step 3 - Lighting and Fixtures data
const selectedLightingTypes = ref([])
const lightingLevel = ref('')
const lightingConditionAssessment = ref('')
const lightingComments = ref('')
const showLightingTypeDropdown = ref(false)
const showLightingLevelDropdown = ref(false)

// Step 4 - Unit Conditions data
const unitConditionAssessment = ref('')
const averageUnitSize = ref('')
const unitComments = ref('')

// Options data
const commonAreaOptions = ref([
  { value: 'lobby', label: 'Lobby' },
  { value: 'hallways', label: 'Hallways' },
  { value: 'elevators', label: 'Elevators' },
  { value: 'stairwells', label: 'Stairwells' },
  { value: 'mailroom', label: 'Mail Room' },
  { value: 'management-office', label: 'Management Office' },
  { value: 'storage-areas', label: 'Storage Areas' },
  { value: 'restrooms', label: 'Public Restrooms' }
])

const flooringTypeOptions = ref([
  { value: 'carpet', label: 'Carpet' },
  { value: 'hardwood', label: 'Hardwood' },
  { value: 'laminate', label: 'Laminate' },
  { value: 'vinyl', label: 'Vinyl/LVT' },
  { value: 'tile', label: 'Tile' },
  { value: 'concrete', label: 'Polished Concrete' },
  { value: 'linoleum', label: 'Linoleum' }
])

const wallFinishOptions = ref([
  { value: 'paint', label: 'Paint' },
  { value: 'wallpaper', label: 'Wallpaper' },
  { value: 'wood-paneling', label: 'Wood Paneling' },
  { value: 'tile', label: 'Tile' },
  { value: 'brick', label: 'Exposed Brick' },
  { value: 'drywall', label: 'Drywall' }
])

const lightingTypeOptions = ref([
  { value: 'fluorescent', label: 'Fluorescent' },
  { value: 'led', label: 'LED' },
  { value: 'incandescent', label: 'Incandescent' },
  { value: 'halogen', label: 'Halogen' },
  { value: 'track-lighting', label: 'Track Lighting' },
  { value: 'recessed', label: 'Recessed' },
  { value: 'pendant', label: 'Pendant' }
])

const lightingLevelOptions = ref([
  { value: 'excellent', label: 'Excellent' },
  { value: 'adequate', label: 'Adequate' },
  { value: 'insufficient', label: 'Insufficient' }
])

// Unit amenities checklist
const unitAmenities = ref([
  { id: 1, name: 'Air Conditioning', value: false },
  { id: 2, name: 'Balcony/Patio', value: false },
  { id: 3, name: 'In-Unit Laundry', value: false },
  { id: 4, name: 'Dishwasher', value: false },
  { id: 5, name: 'Garbage Disposal', value: false },
  { id: 6, name: 'Walk-in Closets', value: false },
  { id: 7, name: 'Ceiling Fans', value: false },
  { id: 8, name: 'Fireplace', value: false }
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
         commonAreaConditionAssessment.value !== '' &&
         flooringConditionAssessment.value !== '' &&
         lightingConditionAssessment.value !== '' &&
         unitConditionAssessment.value !== ''
})

// Methods
const toggleCommonAreaDropdown = () => {
  showCommonAreaDropdown.value = !showCommonAreaDropdown.value
}

const toggleCommonAreaSelection = (value) => {
  const index = selectedCommonAreas.value.indexOf(value)
  if (index > -1) {
    selectedCommonAreas.value.splice(index, 1)
  } else {
    selectedCommonAreas.value.push(value)
  }
}

const isCommonAreaSelected = (value) => {
  return selectedCommonAreas.value.includes(value)
}

const toggleFlooringTypeDropdown = () => {
  showFlooringTypeDropdown.value = !showFlooringTypeDropdown.value
}

const toggleFlooringTypeSelection = (value) => {
  const index = selectedFlooringTypes.value.indexOf(value)
  if (index > -1) {
    selectedFlooringTypes.value.splice(index, 1)
  } else {
    selectedFlooringTypes.value.push(value)
  }
}

const isFlooringTypeSelected = (value) => {
  return selectedFlooringTypes.value.includes(value)
}

const toggleWallFinishDropdown = () => {
  showWallFinishDropdown.value = !showWallFinishDropdown.value
}

const selectWallFinish = (value) => {
  wallFinishType.value = value
  showWallFinishDropdown.value = false
}

const toggleLightingTypeDropdown = () => {
  showLightingTypeDropdown.value = !showLightingTypeDropdown.value
}

const toggleLightingTypeSelection = (value) => {
  const index = selectedLightingTypes.value.indexOf(value)
  if (index > -1) {
    selectedLightingTypes.value.splice(index, 1)
  } else {
    selectedLightingTypes.value.push(value)
  }
}

const isLightingTypeSelected = (value) => {
  return selectedLightingTypes.value.includes(value)
}

const toggleLightingLevelDropdown = () => {
  showLightingLevelDropdown.value = !showLightingLevelDropdown.value
}

const selectLightingLevel = (value) => {
  lightingLevel.value = value
  showLightingLevelDropdown.value = false
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
