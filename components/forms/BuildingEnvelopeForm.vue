<template>
  <div class="space-y-4 pb-4">
    <!-- Step 1: Exterior Walls -->
    <div v-if="currentStep === 1">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Exterior Walls</h2>
        <p class="text-base text-gray-600">Assess exterior wall materials and conditions</p>
      </div>

      <div class="space-y-8">
        <!-- Wall Material Types -->
        <div class="relative">
          <label class="form-label">Wall Materials (select all that apply)</label>
          <button
            @click="toggleWallMaterialDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showWallMaterialDropdown }"
          >
            <span class="text-gray-700">
              {{ selectedWallMaterials.length > 0 
                ? selectedWallMaterials.map(val => wallMaterialOptions.find(opt => opt.value === val)?.label).join(', ')
                : 'Select wall materials' 
              }}
            </span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showWallMaterialDropdown }"
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
              v-if="showWallMaterialDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <button
                  v-for="wallMaterialOption in wallMaterialOptions"
                  :key="wallMaterialOption.value"
                  @click="toggleWallMaterialSelection(wallMaterialOption.value)"
                  type="button"
                  class="form-dropdown-item flex items-center justify-between"
                  :class="{ 'form-dropdown-item--selected': isWallMaterialSelected(wallMaterialOption.value) }"
                >
                  <span>{{ wallMaterialOption.label }}</span>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      :checked="isWallMaterialSelected(wallMaterialOption.value)"
                      class="checkbox checkbox-sm"
                      readonly
                    />
                  </div>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Wall Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">Overall Wall Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="wall-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="wallConditionAssessment"
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
                  name="wall-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="wallConditionAssessment"
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
                  name="wall-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="wallConditionAssessment"
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
            <textarea class="form-input min-h-[100px] resize-none" placeholder="Describe wall condition, damages, maintenance needs..." v-model="wallComments"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Roofing System -->
    <div v-if="currentStep === 2">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Roofing System</h2>
        <p class="text-base text-gray-600">Assess roof materials, condition, and drainage</p>
      </div>

      <div class="space-y-8">
        <!-- Roof Type Dropdown -->
        <div class="relative">
          <label class="form-label">Primary Roof Type</label>
          <button
            @click="toggleRoofTypeDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showRoofTypeDropdown }"
          >
            <span class="text-gray-700">{{ roofType || 'Select roof type' }}</span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showRoofTypeDropdown }"
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
              v-if="showRoofTypeDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <button
                  v-for="roofOption in roofTypeOptions"
                  :key="roofOption.value"
                  @click="selectRoofType(roofOption.value)"
                  type="button"
                  class="form-dropdown-item"
                  :class="{ 'form-dropdown-item--selected': roofType === roofOption.value }"
                >
                  {{ roofOption.label }}
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Roof Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">Roof Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="roof-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="roofConditionAssessment"
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
                  name="roof-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="roofConditionAssessment"
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
                  name="roof-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="roofConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Roof Age -->
        <div>
          <label class="form-label">Estimated Roof Age (years)</label>
          <input
            v-model="roofAge"
            type="number"
            min="0"
            max="100"
            class="form-input"
            placeholder="Enter roof age"
          />
        </div>

        <!-- Comments -->
        <div>
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input min-h-[100px] resize-none" placeholder="Describe roof condition, leaks, maintenance needs..." v-model="roofComments"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3: Windows and Doors -->
    <div v-if="currentStep === 3">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Windows and Doors</h2>
        <p class="text-base text-gray-600">Assess windows, doors, and entry systems</p>
      </div>

      <div class="space-y-8">
        <!-- Window Types -->
        <div class="relative">
          <label class="form-label">Window Types (select all that apply)</label>
          <button
            @click="toggleWindowTypeDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showWindowTypeDropdown }"
          >
            <span class="text-gray-700">
              {{ selectedWindowTypes.length > 0 
                ? selectedWindowTypes.map(val => windowTypeOptions.find(opt => opt.value === val)?.label).join(', ')
                : 'Select window types' 
              }}
            </span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showWindowTypeDropdown }"
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
              v-if="showWindowTypeDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <button
                  v-for="windowTypeOption in windowTypeOptions"
                  :key="windowTypeOption.value"
                  @click="toggleWindowTypeSelection(windowTypeOption.value)"
                  type="button"
                  class="form-dropdown-item flex items-center justify-between"
                  :class="{ 'form-dropdown-item--selected': isWindowTypeSelected(windowTypeOption.value) }"
                >
                  <span>{{ windowTypeOption.label }}</span>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      :checked="isWindowTypeSelected(windowTypeOption.value)"
                      class="checkbox checkbox-sm"
                      readonly
                    />
                  </div>
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Window Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">Window Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="window-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="windowConditionAssessment"
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
                  name="window-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="windowConditionAssessment"
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
                  name="window-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="windowConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Door Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">Door Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="door-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="doorConditionAssessment"
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
                  name="door-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="doorConditionAssessment"
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
                  name="door-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="doorConditionAssessment"
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
            <textarea class="form-input min-h-[100px] resize-none" placeholder="Describe window and door conditions, security features, accessibility..." v-model="windowDoorComments"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 4: Structural Elements -->
    <div v-if="currentStep === 4">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Structural Elements</h2>
        <p class="text-base text-gray-600">Assess foundation, framing, and structural integrity</p>
      </div>

      <div class="space-y-8">
        <!-- Foundation Type -->
        <div class="relative">
          <label class="form-label">Foundation Type</label>
          <button
            @click="toggleFoundationTypeDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showFoundationTypeDropdown }"
          >
            <span class="text-gray-700">{{ foundationType || 'Select foundation type' }}</span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showFoundationTypeDropdown }"
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
              v-if="showFoundationTypeDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <button
                  v-for="foundationOption in foundationTypeOptions"
                  :key="foundationOption.value"
                  @click="selectFoundationType(foundationOption.value)"
                  type="button"
                  class="form-dropdown-item"
                  :class="{ 'form-dropdown-item--selected': foundationType === foundationOption.value }"
                >
                  {{ foundationOption.label }}
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Structural Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">Structural Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="structural-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="structuralConditionAssessment"
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
                  name="structural-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="structuralConditionAssessment"
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
                  name="structural-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="structuralConditionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Structural Issues Checklist -->
        <div>
          <div class="mb-3">
            <h3 class="text-lg font-bold text-gray-900 mb-2">Structural Issues</h3>
            <p class="text-sm text-gray-600">Check any observed structural issues</p>
          </div>
          
          <div class="modern-dynamic-item">
            <div class="scrollable-card-content">
              <div
                v-for="(issue, index) in structuralIssues"
                :key="issue.id"
                class="scrollable-option-item"
                :class="{ 'border-b border-gray-200': index < structuralIssues.length - 1 }"
              >
                <span class="option-label">{{ issue.name }}</span>
                <div class="option-controls">
                  <label class="modern-checkbox">
                    <input
                      type="checkbox"
                      :id="`structural-issue-${issue.id}`"
                      v-model="issue.value"
                      class="modern-checkbox-input"
                    />
                    <span class="modern-checkbox-box"></span>
                  </label>
                  <span class="modern-status-badge" :class="{ 'modern-status-badge--active': issue.value }">{{ issue.value ? 'Yes' : 'No' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comments -->
        <div>
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input min-h-[100px] resize-none" placeholder="Describe structural condition, foundation issues, framing concerns..." v-model="structuralComments"></textarea>
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

// Step 1 - Exterior Walls data
const selectedWallMaterials = ref([])
const wallConditionAssessment = ref('')
const wallComments = ref('')
const showWallMaterialDropdown = ref(false)

// Step 2 - Roofing System data
const roofType = ref('')
const roofConditionAssessment = ref('')
const roofAge = ref('')
const roofComments = ref('')
const showRoofTypeDropdown = ref(false)

// Step 3 - Windows and Doors data
const selectedWindowTypes = ref([])
const windowConditionAssessment = ref('')
const doorConditionAssessment = ref('')
const windowDoorComments = ref('')
const showWindowTypeDropdown = ref(false)

// Step 4 - Structural Elements data
const foundationType = ref('')
const structuralConditionAssessment = ref('')
const structuralComments = ref('')
const showFoundationTypeDropdown = ref(false)

// Options data
const wallMaterialOptions = ref([
  { value: 'brick', label: 'Brick' },
  { value: 'concrete-block', label: 'Concrete Block' },
  { value: 'stucco', label: 'Stucco' },
  { value: 'vinyl-siding', label: 'Vinyl Siding' },
  { value: 'wood-siding', label: 'Wood Siding' },
  { value: 'metal-siding', label: 'Metal Siding' },
  { value: 'stone', label: 'Stone' },
  { value: 'eifs', label: 'EIFS' }
])

const roofTypeOptions = ref([
  { value: 'asphalt-shingle', label: 'Asphalt Shingle' },
  { value: 'metal', label: 'Metal' },
  { value: 'tile', label: 'Tile' },
  { value: 'flat-membrane', label: 'Flat Membrane' },
  { value: 'built-up', label: 'Built-up' },
  { value: 'modified-bitumen', label: 'Modified Bitumen' },
  { value: 'slate', label: 'Slate' },
  { value: 'wood-shake', label: 'Wood Shake' }
])

const windowTypeOptions = ref([
  { value: 'single-hung', label: 'Single Hung' },
  { value: 'double-hung', label: 'Double Hung' },
  { value: 'casement', label: 'Casement' },
  { value: 'sliding', label: 'Sliding' },
  { value: 'fixed', label: 'Fixed' },
  { value: 'storefront', label: 'Storefront' },
  { value: 'curtain-wall', label: 'Curtain Wall' }
])

const foundationTypeOptions = ref([
  { value: 'concrete-slab', label: 'Concrete Slab' },
  { value: 'crawl-space', label: 'Crawl Space' },
  { value: 'basement', label: 'Basement' },
  { value: 'pier-beam', label: 'Pier and Beam' },
  { value: 'stem-wall', label: 'Stem Wall' }
])

// Structural issues checklist
const structuralIssues = ref([
  { id: 1, name: 'Foundation Cracks', value: false },
  { id: 2, name: 'Settlement Issues', value: false },
  { id: 3, name: 'Wall Cracks', value: false },
  { id: 4, name: 'Sagging Floors', value: false },
  { id: 5, name: 'Roof Sagging', value: false },
  { id: 6, name: 'Water Damage', value: false }
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
         wallConditionAssessment.value !== '' &&
         roofConditionAssessment.value !== '' &&
         windowConditionAssessment.value !== '' &&
         doorConditionAssessment.value !== '' &&
         structuralConditionAssessment.value !== ''
})

// Methods
const toggleWallMaterialDropdown = () => {
  showWallMaterialDropdown.value = !showWallMaterialDropdown.value
}

const toggleWallMaterialSelection = (value) => {
  const index = selectedWallMaterials.value.indexOf(value)
  if (index > -1) {
    selectedWallMaterials.value.splice(index, 1)
  } else {
    selectedWallMaterials.value.push(value)
  }
}

const isWallMaterialSelected = (value) => {
  return selectedWallMaterials.value.includes(value)
}

const toggleRoofTypeDropdown = () => {
  showRoofTypeDropdown.value = !showRoofTypeDropdown.value
}

const selectRoofType = (value) => {
  roofType.value = value
  showRoofTypeDropdown.value = false
}

const toggleWindowTypeDropdown = () => {
  showWindowTypeDropdown.value = !showWindowTypeDropdown.value
}

const toggleWindowTypeSelection = (value) => {
  const index = selectedWindowTypes.value.indexOf(value)
  if (index > -1) {
    selectedWindowTypes.value.splice(index, 1)
  } else {
    selectedWindowTypes.value.push(value)
  }
}

const isWindowTypeSelected = (value) => {
  return selectedWindowTypes.value.includes(value)
}

const toggleFoundationTypeDropdown = () => {
  showFoundationTypeDropdown.value = !showFoundationTypeDropdown.value
}

const selectFoundationType = (value) => {
  foundationType.value = value
  showFoundationTypeDropdown.value = false
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
