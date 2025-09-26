<template>
  <div class="space-y-4 pb-4">
    <!-- Step 1: Drainage and Erosion -->
    <div v-if="currentStep === 1">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Drainage and Erosion</h2>
      </div>

      <div class="space-y-8">
        <!-- Storm Drainage List Section -->
        <div>
          <div class="mb-3">
            <p class="text-sm text-gray-600">Select storm drainage system types present</p>
          </div>
          
          <div class="modern-dynamic-item">
            <div class="scrollable-card-content">
              <div
                v-for="(option, index) in stormDrainageOptions"
                :key="option.id"
                class="scrollable-option-item"
                :class="{ 'border-b border-gray-200': index < stormDrainageOptions.length - 1 }"
              >
                <span class="option-label">{{ option.name }}</span>
                <div class="option-controls">
                  <label class="modern-checkbox">
                    <input
                      type="checkbox"
                      :id="`storm-drainage-${option.id}`"
                      v-model="option.value"
                      class="modern-checkbox-input"
                    />
                    <span class="modern-checkbox-box"></span>
                  </label>
                  <span class="modern-status-badge" :class="{ 'modern-status-badge--active': option.value }">{{ option.value ? 'Yes' : 'No' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Surface Types Multi-Select -->
        <div class="relative">
          <label class="form-label">Surface Types</label>
          <button
            @click="toggleSurfaceTypeDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showSurfaceTypeDropdown }"
          >
            <span class="text-gray-700">{{ surfaceTypeDisplayText }}</span>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showSurfaceTypeDropdown }"
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
              v-if="showSurfaceTypeDropdown"
              class="form-dropdown-menu"
            >
              <div class="py-1">
                <label
                  v-for="surfaceTypeOption in surfaceTypes"
                  :key="surfaceTypeOption.value"
                  class="form-dropdown-item flex items-center cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    :value="surfaceTypeOption.value"
                    v-model="surfaceType"
                    class="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span class="text-sm text-gray-700">{{ surfaceTypeOption.label }}</span>
                </label>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Condition Assessment -->
        <div>
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="conditionAssessment"
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
                  name="condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="conditionAssessment"
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
                  name="condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="conditionAssessment"
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
            <textarea class="form-input" placeholder="Comments" v-model="drainageComments"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Topography -->
    <div v-if="currentStep === 2">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Topography</h2>
      </div>
      
      <!-- Accordion for topography and erosion sub items -->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'topography-slope' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('topography-slope')">
          Topography Slope
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'topography-slope' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'topography-slope'">
          <!-- Topography Slope Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Slope Type</label>
              <button
                @click="toggleTopographySlopeDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showTopographySlopeDropdown }"
              >
                <span class="text-gray-700">{{ topographySlope || 'Select slope type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showTopographySlopeDropdown }"
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
                  v-if="showTopographySlopeDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="slopeOption in topographySlopeOptions"
                      :key="slopeOption.value"
                      @click="selectTopographySlope(slopeOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': topographySlope === slopeOption.value }"
                    >
                      {{ slopeOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Topography Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="topography-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="topographyCondition"
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
                  name="topography-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="topographyCondition"
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
                  name="topography-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="topographyCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Repair Status Toggle -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="topography-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="topographyRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="topography-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="topographyRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="topography-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="topographyRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="topographyAmount"
            />
          </div>

          <!-- Comments for Topography Slope -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="topographySlopeComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Landscaping Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'landscaping' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('landscaping')">
          Landscaping
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'landscaping' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'landscaping'">
          <!-- Landscaping Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Landscaping Type</label>
              <button
                @click="toggleLandscapingDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showLandscapingDropdown }"
              >
                <span class="text-gray-700">{{ landscapingType || 'Select landscaping type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showLandscapingDropdown }"
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
                  v-if="showLandscapingDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="landscapingOption in landscapingOptions"
                      :key="landscapingOption.value"
                      @click="selectLandscaping(landscapingOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': landscapingType === landscapingOption.value }"
                    >
                      {{ landscapingOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Landscaping Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="landscaping-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="landscapingCondition"
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
                  name="landscaping-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="landscapingCondition"
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
                  name="landscaping-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="landscapingCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Landscaping Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="landscaping-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="landscapingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="landscaping-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="landscapingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="landscaping-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="landscapingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="landscaping-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="landscapingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="landscaping-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="landscapingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="landscaping-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="landscapingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="landscapingAmount"
            />
          </div>

          <!-- Comments for Landscaping -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="landscapingComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Retaining Walls Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'retaining-walls' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('retaining-walls')">
          Retaining Walls
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'retaining-walls' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'retaining-walls'">
          <!-- Retaining Walls Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Retaining Walls Type</label>
              <button
                @click="toggleRetainingWallsDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showRetainingWallsDropdown }"
              >
                <span class="text-gray-700">{{ retainingWallsType || 'Select retaining walls type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showRetainingWallsDropdown }"
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
                  v-if="showRetainingWallsDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="retainingWallsOption in retainingWallsOptions"
                      :key="retainingWallsOption.value"
                      @click="selectRetainingWalls(retainingWallsOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': retainingWallsType === retainingWallsOption.value }"
                    >
                      {{ retainingWallsOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Retaining Walls Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="retaining-walls-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="retainingWallsCondition"
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
                  name="retaining-walls-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="retainingWallsCondition"
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
                  name="retaining-walls-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="retainingWallsCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Retaining Walls Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="retaining-walls-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="retainingWallsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="retaining-walls-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="retainingWallsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="retaining-walls-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="retainingWallsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="retaining-walls-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="retainingWallsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="retaining-walls-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="retainingWallsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="retaining-walls-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="retainingWallsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="retainingWallsAmount"
            />
          </div>

          <!-- Railings Radio Checkbox -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Railings</label>
            <div class="flex gap-4">
              <label class="flex items-center">
                <input 
                  type="radio" 
                  name="railings" 
                  value="yes" 
                  class="mr-2"
                  v-model="hasRailings"
                />
                <span class="text-sm">Yes</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="radio" 
                  name="railings" 
                  value="no" 
                  class="mr-2"
                  v-model="hasRailings"
                />
                <span class="text-sm">No</span>
              </label>
            </div>
          </div>

          <!-- Conditional Railings Fields -->
          <div v-if="hasRailings === 'yes'" class="space-y-4 border-t pt-4">
            <!-- Railings Type Dropdown -->
            <div class="mb-4">
              <div class="relative">
                <label class="form-label">Railings Type</label>
                <button
                  @click="toggleBridgeRailingsDropdown"
                  type="button"
                  class="form-dropdown-button"
                  :class="{ 'form-dropdown-button--active': showBridgeRailingsDropdown }"
                >
                  <span class="text-gray-700">{{ railingsType || 'Select railings type' }}</span>
                  <svg 
                    class="w-4 h-4 text-gray-400 transition-transform duration-200"
                    :class="{ 'rotate-180': showBridgeRailingsDropdown }"
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
                    v-if="showBridgeRailingsDropdown"
                    class="form-dropdown-menu"
                  >
                    <div class="py-1">
                      <button
                        v-for="railingsOption in railingsOptions"
                        :key="railingsOption.value"
                        @click="selectRailings(railingsOption.value)"
                        type="button"
                        class="form-dropdown-item"
                        :class="{ 'form-dropdown-item--selected': railingsType === railingsOption.value }"
                      >
                        {{ railingsOption.label }}
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Railings Quality Condition -->
            <div class="mb-3">
              <label class="form-label mb-3 block">Quality Condition</label>
              <div class="grid grid-cols-3 gap-2 w-full">
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="railings-quality-condition" 
                    value="good" 
                    class="sr-only peer"
                    v-model="railingsQualityCondition"
                  />
                  <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                    <div class="text-2xl mb-1">✅</div>
                    <span class="text-sm font-medium">Good</span>
                  </div>
                </label>
                
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="railings-quality-condition" 
                    value="fair" 
                    class="sr-only peer"
                    v-model="railingsQualityCondition"
                  />
                  <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                    <div class="text-2xl mb-1">⚠️</div>
                    <span class="text-sm font-medium">Fair</span>
                  </div>
                </label>
                
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="railings-quality-condition" 
                    value="poor" 
                    class="sr-only peer"
                    v-model="railingsQualityCondition"
                  />
                  <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                    <div class="text-2xl mb-1">❌</div>
                    <span class="text-sm font-medium">Poor</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Railings Repair Status -->
            <div class="mb-3">
              <label class="form-label mb-3 block">Repair Status</label>
              <div class="grid grid-cols-3 gap-2 w-full">
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="railings-repair-status" 
                    value="IR" 
                    class="sr-only peer"
                    v-model="railingsRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">IR</span>
                  </div>
                </label>
                
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="railings-repair-status" 
                    value="ST" 
                    class="sr-only peer"
                    v-model="railingsRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">ST</span>
                  </div>
                </label>
                
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="railings-repair-status" 
                    value="RR" 
                    class="sr-only peer"
                    v-model="railingsRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">RR</span>
                  </div>
                </label>
                
                <!-- Second Row -->
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="railings-repair-status" 
                    value="RM" 
                    class="sr-only peer"
                    v-model="railingsRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">RM</span>
                  </div>
                </label>
                
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="railings-repair-status" 
                    value="INV" 
                    class="sr-only peer"
                    v-model="railingsRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">INV</span>
                  </div>
                </label>
                
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="railings-repair-status" 
                    value="NA" 
                    class="sr-only peer"
                    v-model="railingsRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">NA</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Railings Amount to Repair and Replace -->
            <div class="mb-3">
              <label class="form-label">Amount to Repair and Replace</label>
              <input 
                type="text" 
                class="form-input" 
                placeholder="Value?" 
                v-model="railingsAmount"
              />
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="retainingWallsAmount"
            />
          </div>

          <!-- Comments for Retaining Walls -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="retainingWallsComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Erosion Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'erosion' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('erosion')">
          Erosion
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'erosion' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'erosion'">
          <!-- Erosion Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Erosion Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="erosion-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="erosionAssessment"
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
                  name="erosion-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="erosionAssessment"
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
                  name="erosion-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="erosionAssessment"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Erosion Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="erosion-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="erosionRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="erosion-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="erosionRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="erosion-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="erosionRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="erosion-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="erosionRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="erosion-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="erosionRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="erosion-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="erosionRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="erosionAmount"
            />
          </div>

          <!-- Comments for Erosion -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="erosionComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Screen Walls Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'screen-walls' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('screen-walls')">
          Screen Walls
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'screen-walls' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'screen-walls'">
          <!-- Screen Walls Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Screen Walls Type</label>
              <button
                @click="toggleScreenWallsDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showScreenWallsDropdown }"
              >
                <span class="text-gray-700">{{ screenWallsType || 'Select screen walls type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showScreenWallsDropdown }"
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
                  v-if="showScreenWallsDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="screenWallsOption in screenWallsOptions"
                      :key="screenWallsOption.value"
                      @click="selectScreenWalls(screenWallsOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': screenWallsType === screenWallsOption.value }"
                    >
                      {{ screenWallsOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Screen Walls Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="screen-walls-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="screenWallsCondition"
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
                  name="screen-walls-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="screenWallsCondition"
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
                  name="screen-walls-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="screenWallsCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Screen Walls Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="screen-walls-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="screenWallsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="screen-walls-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="screenWallsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="screen-walls-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="screenWallsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="screen-walls-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="screenWallsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="screen-walls-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="screenWallsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="screen-walls-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="screenWallsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="screenWallsAmount"
            />
          </div>

          <!-- Comments for Screen Walls -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="screenWallsComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Water Features Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'water-features' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('water-features')">
          Water Features
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'water-features' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'water-features'">
          <!-- Water Features Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Water Features Type</label>
              <button
                @click="toggleWaterFeaturesDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showWaterFeaturesDropdown }"
              >
                <span class="text-gray-700">{{ waterFeaturesType || 'Select water features type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showWaterFeaturesDropdown }"
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
                  v-if="showWaterFeaturesDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="waterFeaturesOption in waterFeaturesOptions"
                      :key="waterFeaturesOption.value"
                      @click="selectWaterFeatures(waterFeaturesOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': waterFeaturesType === waterFeaturesOption.value }"
                    >
                      {{ waterFeaturesOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Water Features Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="water-features-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="waterFeaturesCondition"
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
                  name="water-features-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="waterFeaturesCondition"
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
                  name="water-features-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="waterFeaturesCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Water Features Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="water-features-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="waterFeaturesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="water-features-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="waterFeaturesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="water-features-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="waterFeaturesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="water-features-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="waterFeaturesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="water-features-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="waterFeaturesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="water-features-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="waterFeaturesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="waterFeaturesAmount"
            />
          </div>

          <!-- Pump Location Section -->
          <div class="space-y-4 border-t pt-4">
            <h4 class="text-lg font-semibold text-gray-800">Pump Location</h4>
            
            <!-- Pump Location Dropdown -->
            <div class="mb-4">
              <div class="relative">
                <label class="form-label">Pump Location</label>
                <button
                  @click="togglePumpLocationDropdown"
                  type="button"
                  class="form-dropdown-button"
                  :class="{ 'form-dropdown-button--active': showPumpLocationDropdown }"
                >
                  <span class="text-gray-700">{{ pumpLocation || 'Select pump location' }}</span>
                  <svg 
                    class="w-4 h-4 text-gray-400 transition-transform duration-200"
                    :class="{ 'rotate-180': showPumpLocationDropdown }"
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
                    v-if="showPumpLocationDropdown"
                    class="form-dropdown-menu"
                  >
                    <div class="py-1">
                      <button
                        v-for="pumpLocationOption in pumpLocationOptions"
                        :key="pumpLocationOption.value"
                        @click="selectPumpLocation(pumpLocationOption.value)"
                        type="button"
                        class="form-dropdown-item"
                        :class="{ 'form-dropdown-item--selected': pumpLocation === pumpLocationOption.value }"
                      >
                        {{ pumpLocationOption.label }}
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Pump Age Input -->
            <div class="mb-3">
              <label class="form-label">Pump Age</label>
              <input 
                type="text" 
                class="form-input" 
                placeholder="Enter pump age" 
                v-model="pumpAge"
              />
            </div>

            <!-- Pump Quality Condition -->
            <div class="mb-3">
              <label class="form-label mb-3 block">Quality Condition</label>
              <div class="grid grid-cols-3 gap-2 w-full">
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="pump-quality-condition" 
                    value="good" 
                    class="sr-only peer"
                    v-model="pumpQualityCondition"
                  />
                  <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                    <div class="text-2xl mb-1">✅</div>
                    <span class="text-sm font-medium">Good</span>
                  </div>
                </label>
                
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="pump-quality-condition" 
                    value="fair" 
                    class="sr-only peer"
                    v-model="pumpQualityCondition"
                  />
                  <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                    <div class="text-2xl mb-1">⚠️</div>
                    <span class="text-sm font-medium">Fair</span>
                  </div>
                </label>
                
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="pump-quality-condition" 
                    value="poor" 
                    class="sr-only peer"
                    v-model="pumpQualityCondition"
                  />
                  <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                    <div class="text-2xl mb-1">❌</div>
                    <span class="text-sm font-medium">Poor</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Pump Repair Status -->
            <div class="mb-3">
              <label class="form-label mb-3 block">Repair Status</label>
              <div class="grid grid-cols-3 gap-2 w-full">
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="pump-repair-status" 
                    value="IR" 
                    class="sr-only peer"
                    v-model="pumpRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">IR</span>
                  </div>
                </label>
                
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="pump-repair-status" 
                    value="ST" 
                    class="sr-only peer"
                    v-model="pumpRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">ST</span>
                  </div>
                </label>
                
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="pump-repair-status" 
                    value="RR" 
                    class="sr-only peer"
                    v-model="pumpRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">RR</span>
                  </div>
                </label>
                
                <!-- Second Row -->
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="pump-repair-status" 
                    value="RM" 
                    class="sr-only peer"
                    v-model="pumpRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">RM</span>
                  </div>
                </label>
                
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="pump-repair-status" 
                    value="INV" 
                    class="sr-only peer"
                    v-model="pumpRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">INV</span>
                  </div>
                </label>
                
                <label class="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="pump-repair-status" 
                    value="NA" 
                    class="sr-only peer"
                    v-model="pumpRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">NA</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Pump Amount to Repair and Replace -->
            <div class="mb-3">
              <label class="form-label">Amount to Repair and Replace</label>
              <input 
                type="text" 
                class="form-input" 
                placeholder="Value?" 
                v-model="pumpAmount"
              />
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="waterFeaturesAmount"
            />
          </div>

          <!-- Comments for Water Features -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="waterFeaturesComments"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3: General Site Improvements -->
    <div v-if="currentStep === 3">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">General Site Improvements</h2>
      </div>

      <!-- Signage Accordion -->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'signage' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('signage')">
          Signage
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'signage' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'signage'">
          <!-- Signage Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Signage Type (select all that apply)</label>
              <button
                @click="toggleSignageDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showSignageDropdown }"
              >
                <span class="text-gray-700">
                  {{ selectedSignageTypes.length > 0 
                    ? selectedSignageTypes.map(val => signageOptions.find(opt => opt.value === val)?.label).join(', ')
                    : 'Select signage types' 
                  }}
                </span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showSignageDropdown }"
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
                  v-if="showSignageDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="signageOption in signageOptions"
                      :key="signageOption.value"
                      @click="toggleSignageSelection(signageOption.value)"
                      type="button"
                      class="form-dropdown-item flex items-center justify-between"
                      :class="{ 'form-dropdown-item--selected': isSignageSelected(signageOption.value) }"
                    >
                      <span>{{ signageOption.label }}</span>
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          :checked="isSignageSelected(signageOption.value)"
                          class="checkbox checkbox-sm"
                          readonly
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Signage Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="signage-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="signageCondition"
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
                  name="signage-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="signageCondition"
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
                  name="signage-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="signageCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Signage Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="signage-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="signageRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="signage-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="signageRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="signage-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="signageRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="signage-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="signageRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="signage-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="signageRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="signage-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="signageRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="signageAmount"
            />
          </div>

          <!-- Comments for Signage -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="signageComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Lot Lighting Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'lot-lighting' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('lot-lighting')">
          Lot Lighting
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'lot-lighting' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'lot-lighting'">
          <!-- Lot Lighting Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Lighting Type (select all that apply)</label>
              <button
                @click="toggleLotLightingDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showLotLightingDropdown }"
              >
                <span class="text-gray-700">
                  {{ selectedLotLightingTypes.length > 0 
                    ? selectedLotLightingTypes.map(val => lotLightingOptions.find(opt => opt.value === val)?.label).join(', ')
                    : 'Select lighting types' 
                  }}
                </span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showLotLightingDropdown }"
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
                  v-if="showLotLightingDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="lotLightingOption in lotLightingOptions"
                      :key="lotLightingOption.value"
                      @click="toggleLotLightingSelection(lotLightingOption.value)"
                      type="button"
                      class="form-dropdown-item flex items-center justify-between"
                      :class="{ 'form-dropdown-item--selected': isLotLightingSelected(lotLightingOption.value) }"
                    >
                      <span>{{ lotLightingOption.label }}</span>
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          :checked="isLotLightingSelected(lotLightingOption.value)"
                          class="checkbox checkbox-sm"
                          readonly
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Lot Lighting Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="lot-lighting-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="lotLightingCondition"
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
                  name="lot-lighting-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="lotLightingCondition"
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
                  name="lot-lighting-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="lotLightingCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Lot Lighting Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="lot-lighting-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="lotLightingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="lot-lighting-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="lotLightingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="lot-lighting-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="lotLightingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="lot-lighting-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="lotLightingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="lot-lighting-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="lotLightingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="lot-lighting-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="lotLightingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="lotLightingAmount"
            />
          </div>

          <!-- Comments for Lot Lighting -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="lotLightingComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Building Lighting Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'building-lighting' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('building-lighting')">
          Building Lighting
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'building-lighting' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'building-lighting'">
          <!-- Building Lighting Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Building Lighting Type</label>
              <button
                @click="toggleBuildingLightingDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showBuildingLightingDropdown }"
              >
                <span class="text-gray-700">{{ buildingLightingType || 'Select building lighting type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showBuildingLightingDropdown }"
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
                  v-if="showBuildingLightingDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="buildingLightingOption in buildingLightingOptions"
                      :key="buildingLightingOption.value"
                      @click="selectBuildingLighting(buildingLightingOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': buildingLightingType === buildingLightingOption.value }"
                    >
                      {{ buildingLightingOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Building Lighting Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="building-lighting-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="buildingLightingCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="building-lighting-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="buildingLightingCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="building-lighting-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="buildingLightingCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Building Lighting Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="building-lighting-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="buildingLightingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="building-lighting-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="buildingLightingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="building-lighting-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="buildingLightingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="building-lighting-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="buildingLightingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="building-lighting-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="buildingLightingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="building-lighting-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="buildingLightingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="buildingLightingAmount"
            />
          </div>

          <!-- Comments for Building Lighting -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="buildingLightingComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Site Fencing Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'site-fencing' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('site-fencing')">
          Site Fencing
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'site-fencing' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'site-fencing'">
          <!-- Site Fencing Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Fencing Type (select all that apply)</label>
              <button
                @click="toggleSiteFencingDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showSiteFencingDropdown }"
              >
                <span class="text-gray-700">
                  {{ selectedSiteFencingTypes.length > 0 
                    ? selectedSiteFencingTypes.map(val => siteFencingOptions.find(opt => opt.value === val)?.label).join(', ')
                    : 'Select fencing types' 
                  }}
                </span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showSiteFencingDropdown }"
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
                  v-if="showSiteFencingDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="siteFencingOption in siteFencingOptions"
                      :key="siteFencingOption.value"
                      @click="toggleSiteFencingSelection(siteFencingOption.value)"
                      type="button"
                      class="form-dropdown-item flex items-center justify-between"
                      :class="{ 'form-dropdown-item--selected': isSiteFencingSelected(siteFencingOption.value) }"
                    >
                      <span>{{ siteFencingOption.label }}</span>
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          :checked="isSiteFencingSelected(siteFencingOption.value)"
                          class="checkbox checkbox-sm"
                          readonly
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Site Fencing Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="site-fencing-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="siteFencingCondition"
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
                  name="site-fencing-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="siteFencingCondition"
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
                  name="site-fencing-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="siteFencingCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Site Fencing Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="site-fencing-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="siteFencingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="site-fencing-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="siteFencingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="site-fencing-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="siteFencingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="site-fencing-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="siteFencingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="site-fencing-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="siteFencingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="site-fencing-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="siteFencingRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="siteFencingAmount"
            />
          </div>

          <!-- Comments for Site Fencing -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="siteFencingComments"></textarea>
          </div>
        </div>
      </div>
      <!-- Bridges Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'bridges' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('bridges')">
          Bridges
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'bridges' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'bridges'">
          <!-- Bridge Types Multi-Select -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Select All Applicable Bridges</label>
              <button
                @click="toggleBridgesDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showBridgesDropdown }"
              >
                <span class="text-gray-700">
                  {{ selectedBridgeTypes.length > 0 ? `${selectedBridgeTypes.length} selected` : 'Select Bridge Types' }}
                </span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showBridgesDropdown }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <!-- Multi-Select Dropdown Menu -->
              <Transition name="dropdown">
                <div 
                  v-if="showBridgesDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      v-for="bridgeType in bridgeTypes"
                      :key="bridgeType.value"
                      @click="toggleBridgeType(bridgeType.value)"
                      class="form-dropdown-item flex items-center justify-between cursor-pointer"
                    >
                      <span>{{ bridgeType.label }}</span>
                      <span v-if="selectedBridgeTypes.includes(bridgeType.value)" class="text-blue-600">✓</span>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Bridges Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="bridges-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="bridgesCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="bridges-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="bridgesCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="bridges-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="bridgesCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Bridges Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="bridges-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="bridgesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="bridges-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="bridgesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="bridges-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="bridgesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="bridges-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="bridgesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="bridges-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="bridgesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="bridges-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="bridgesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="bridgesAmount"
            />
          </div>

          <!-- Comments for Bridges -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="bridgesComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Compactor Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'compactor' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('compactor')">
          Compactor
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'compactor' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'compactor'">
          <!-- Compactor Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Compactor Type</label>
              <button
                @click="toggleCompactorDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showCompactorDropdown }"
              >
                <span class="text-gray-700">{{ compactorType || 'Select compactor type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showCompactorDropdown }"
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
                  v-if="showCompactorDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="compactorOption in compactorOptions"
                      :key="compactorOption.value"
                      @click="selectCompactor(compactorOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': compactorType === compactorOption.value }"
                    >
                      {{ compactorOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Location Input -->
          <div class="mb-4">
            <label class="form-label">Location</label>
            <input
              type="text"
              class="form-input"
              placeholder="Enter location..."
              v-model="compactorLocation"
            />
          </div>

          <!-- Compactor Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="compactor-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="compactorCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="compactor-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="compactorCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="compactor-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="compactorCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Compactor Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="compactor-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="compactorRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="compactor-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="compactorRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="compactor-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="compactorRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="compactor-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="compactorRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="compactor-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="compactorRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="compactor-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="compactorRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="compactorAmount"
            />
          </div>

          <!-- Comments for Compactor -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="compactorComments"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 4: Other Structures -->
    <div v-if="currentStep === 4">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Other Structures</h2>
        <p class="text-sm text-gray-600 italic">Complete sections as applicable</p>
      </div>

      <!-- Carports Accordion -->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'carports' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('carports')">
          Carports
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'carports' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'carports'">
          <!-- Carports Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">General Construction</label>
              <button
                @click="toggleCarportsDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showCarportsDropdown }"
              >
                <span class="text-gray-700">{{ carportsType || 'Select General Construction' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showCarportsDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showCarportsDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="carportOption in carportOptions"
                      :key="carportOption.value"
                      @click="selectCarportsType(carportOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': carportsType === carportOption.value }"
                    >
                      {{ carportOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Carports Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="carports-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="carportsCondition"
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
                  name="carports-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="carportsCondition"
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
                  name="carports-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="carportsCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Carports Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="carports-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="carportsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="carports-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="carportsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="carports-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="carportsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="carports-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="carportsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="carports-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="carportsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="carports-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="carportsRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="carportsAmount"
            />
          </div>

          <!-- Comments for Carports -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="carportsComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Maintenance Building Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'maintenance-bldg' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('maintenance-bldg')">
          Maintenance Building
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'maintenance-bldg' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'maintenance-bldg'">
          <!-- Maintenance Building Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Construction Type</label>
              <button
                @click="toggleMaintenanceBldgDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showMaintenanceBldgDropdown }"
              >
                <span class="text-gray-700">{{ maintenanceBldgType || 'Select construction type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showMaintenanceBldgDropdown }"
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
                  v-if="showMaintenanceBldgDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="maintenanceBldgOption in maintenanceBldgOptions"
                      :key="maintenanceBldgOption.value"
                      @click="selectMaintenanceBldg(maintenanceBldgOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': maintenanceBldgType === maintenanceBldgOption.value }"
                    >
                      {{ maintenanceBldgOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Maintenance Building Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="maintenance-bldg-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="maintenanceBldgCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="maintenance-bldg-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="maintenanceBldgCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="maintenance-bldg-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="maintenanceBldgCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Maintenance Building Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="maintenance-bldg-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="maintenanceBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="maintenance-bldg-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="maintenanceBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="maintenance-bldg-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="maintenanceBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="maintenance-bldg-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="maintenanceBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="maintenance-bldg-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="maintenanceBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="maintenance-bldg-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="maintenanceBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="maintenanceBldgAmount"
            />
          </div>

          <!-- Comments for Maintenance Building -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="maintenanceBldgComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Fire Pump Building Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'fire-pump-bldg' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('fire-pump-bldg')">
          Fire Pump Building
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'fire-pump-bldg' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'fire-pump-bldg'">
          <!-- Fire Pump Building Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Construction Type</label>
              <button
                @click="toggleFirePumpBldgDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showFirePumpBldgDropdown }"
              >
                <span class="text-gray-700">{{ firePumpBldgType || 'Select construction type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showFirePumpBldgDropdown }"
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
                  v-if="showFirePumpBldgDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="firePumpBldgOption in firePumpBldgOptions"
                      :key="firePumpBldgOption.value"
                      @click="selectFirePumpBldg(firePumpBldgOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': firePumpBldgType === firePumpBldgOption.value }"
                    >
                      {{ firePumpBldgOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Fire Pump Building Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="fire-pump-bldg-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="firePumpBldgCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="fire-pump-bldg-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="firePumpBldgCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="fire-pump-bldg-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="firePumpBldgCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Fire Pump Building Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="fire-pump-bldg-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="firePumpBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="fire-pump-bldg-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="firePumpBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="fire-pump-bldg-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="firePumpBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="fire-pump-bldg-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="firePumpBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="fire-pump-bldg-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="firePumpBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="fire-pump-bldg-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="firePumpBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="firePumpBldgAmount"
            />
          </div>

          <!-- Comments for Fire Pump Building -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="firePumpBldgComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Residential Garages Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'residential-garages' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('residential-garages')">
          Residential Garages
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'residential-garages' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'residential-garages'">
          <!-- Residential Garages Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Garage Type</label>
              <button
                @click="toggleResidentialGaragesDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showResidentialGaragesDropdown }"
              >
                <span class="text-gray-700">{{ residentialGaragesType || 'Select garage type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showResidentialGaragesDropdown }"
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
                  v-if="showResidentialGaragesDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="residentialGaragesOption in residentialGaragesOptions"
                      :key="residentialGaragesOption.value"
                      @click="selectResidentialGarages(residentialGaragesOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': residentialGaragesType === residentialGaragesOption.value }"
                    >
                      {{ residentialGaragesOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Residential Garages Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="residential-garages-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="residentialGaragesCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="residential-garages-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="residentialGaragesCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="residential-garages-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="residentialGaragesCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Residential Garages Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="residential-garages-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="residentialGaragesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="residential-garages-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="residentialGaragesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="residential-garages-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="residentialGaragesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="residential-garages-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="residentialGaragesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="residential-garages-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="residentialGaragesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="residential-garages-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="residentialGaragesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="residentialGaragesAmount"
            />
          </div>

          <!-- Comments for Residential Garages -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="residentialGaragesComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Recreational Facilities Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'recreational-facilities' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('recreational-facilities')">
          Recreational Facilities
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'recreational-facilities' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'recreational-facilities'">
          <!-- Recreational Facilities Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Facility Type (select all that apply)</label>
              <button
                @click="toggleRecreationalFacilitiesDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showRecreationalFacilitiesDropdown }"
              >
                <span class="text-gray-700">
                  {{ selectedRecreationalFacilitiesTypes.length > 0 
                    ? selectedRecreationalFacilitiesTypes.map(val => recreationalFacilitiesOptions.find(opt => opt.value === val)?.label).join(', ')
                    : 'Select facility types' 
                  }}
                </span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showRecreationalFacilitiesDropdown }"
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
                  v-if="showRecreationalFacilitiesDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="recreationalFacilitiesOption in recreationalFacilitiesOptions"
                      :key="recreationalFacilitiesOption.value"
                      @click="toggleRecreationalFacilitiesSelection(recreationalFacilitiesOption.value)"
                      type="button"
                      class="form-dropdown-item flex items-center justify-between"
                      :class="{ 'form-dropdown-item--selected': isRecreationalFacilitiesSelected(recreationalFacilitiesOption.value) }"
                    >
                      <span>{{ recreationalFacilitiesOption.label }}</span>
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          :checked="isRecreationalFacilitiesSelected(recreationalFacilitiesOption.value)"
                          class="checkbox checkbox-sm"
                          readonly
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Recreational Facilities Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="recreational-facilities-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="recreationalFacilitiesCondition"
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
                  name="recreational-facilities-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="recreationalFacilitiesCondition"
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
                  name="recreational-facilities-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="recreationalFacilitiesCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Recreational Facilities Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="recreational-facilities-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="recreationalFacilitiesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="recreational-facilities-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="recreationalFacilitiesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="recreational-facilities-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="recreationalFacilitiesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="recreational-facilities-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="recreationalFacilitiesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="recreational-facilities-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="recreationalFacilitiesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="recreational-facilities-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="recreationalFacilitiesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="recreationalFacilitiesAmount"
            />
          </div>

          <!-- Comments for Recreational Facilities -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="recreationalFacilitiesComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Security Gates Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'security-gates' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('security-gates')">
          Security Gates
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'security-gates' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'security-gates'">
          <!-- Security Gates Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Security Gates Type</label>
              <button
                @click="toggleSecurityGatesDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showSecurityGatesDropdown }"
              >
                <span class="text-gray-700">{{ securityGatesType || 'Select security gates type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showSecurityGatesDropdown }"
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
                  v-if="showSecurityGatesDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="securityGatesOption in securityGatesOptions"
                      :key="securityGatesOption.value"
                      @click="selectSecurityGates(securityGatesOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': securityGatesType === securityGatesOption.value }"
                    >
                      {{ securityGatesOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Security Gates Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="security-gates-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="securityGatesCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="security-gates-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="securityGatesCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="security-gates-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="securityGatesCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Security Gates Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="security-gates-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="securityGatesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="security-gates-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="securityGatesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="security-gates-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="securityGatesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="security-gates-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="securityGatesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="security-gates-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="securityGatesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="security-gates-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="securityGatesRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="securityGatesAmount"
            />
          </div>

          <!-- Comments for Security Gates -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="securityGatesComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Dumpster Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'dumpster' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('dumpster')">
          Dumpster
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'dumpster' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'dumpster'">
          <!-- Dumpster Available Radio Select -->
          <div class="mb-4">
            <label class="form-label mb-3 block">Dumpster Available</label>
            <div class="flex gap-4">
              <label class="flex items-center">
                <input
                  type="radio"
                  name="dumpster-available"
                  value="yes"
                  class="mr-2"
                  v-model="dumpsterAvailable"
                />
                <span class="text-sm">Yes</span>
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  name="dumpster-available"
                  value="no"
                  class="mr-2"
                  v-model="dumpsterAvailable"
                />
                <span class="text-sm">N/A</span>
              </label>
            </div>
          </div>

          <!-- Dumpster Details (shown only if Yes is selected) -->
          <div v-if="dumpsterAvailable === 'yes'">
            <!-- Enclosure Dropdown -->
            <div class="mb-4">
              <div class="relative">
                <label class="form-label">Enclosure</label>
                <button
                  @click="toggleDumpsterEnclosureDropdown"
                  type="button"
                  class="form-dropdown-button"
                  :class="{ 'form-dropdown-button--active': showDumpsterEnclosureDropdown }"
                >
                  <span class="text-gray-700">{{ dumpsterEnclosureType || 'Select Enclosure' }}</span>
                  <svg
                    class="w-4 h-4 text-gray-400 transition-transform duration-200"
                    :class="{ 'rotate-180': showDumpsterEnclosureDropdown }"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <!-- Dropdown Menu -->
                <Transition name="dropdown">
                  <div
                    v-if="showDumpsterEnclosureDropdown"
                    class="form-dropdown-menu"
                  >
                    <div class="py-1">
                      <button
                        @click="selectDumpsterEnclosureType('Chain link')"
                        type="button"
                        class="form-dropdown-item"
                      >
                        Chain link
                      </button>
                      <button
                        @click="selectDumpsterEnclosureType('Wood')"
                        type="button"
                        class="form-dropdown-item"
                      >
                        Wood
                      </button>
                      <button
                        @click="selectDumpsterEnclosureType('CMU')"
                        type="button"
                        class="form-dropdown-item"
                      >
                        CMU
                      </button>
                      <button
                        @click="selectDumpsterEnclosureType('Brick')"
                        type="button"
                        class="form-dropdown-item"
                      >
                        Brick
                      </button>
                      <button
                        @click="selectDumpsterEnclosureType('Vinyl')"
                        type="button"
                        class="form-dropdown-item"
                      >
                        Vinyl
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Gates Dropdown -->
            <div class="mb-4">
              <div class="relative">
                <label class="form-label">Gates</label>
                <button
                  @click="toggleDumpsterGatesDropdown"
                  type="button"
                  class="form-dropdown-button"
                  :class="{ 'form-dropdown-button--active': showDumpsterGatesDropdown }"
                >
                  <span class="text-gray-700">{{ dumpsterGatesType || 'Select Gates' }}</span>
                  <svg
                    class="w-4 h-4 text-gray-400 transition-transform duration-200"
                    :class="{ 'rotate-180': showDumpsterGatesDropdown }"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <!-- Dropdown Menu -->
                <Transition name="dropdown">
                  <div
                    v-if="showDumpsterGatesDropdown"
                    class="form-dropdown-menu"
                  >
                    <div class="py-1">
                      <button
                        @click="selectDumpsterGatesType('Chain link')"
                        type="button"
                        class="form-dropdown-item"
                      >
                        Chain link
                      </button>
                      <button
                        @click="selectDumpsterGatesType('Wood')"
                        type="button"
                        class="form-dropdown-item"
                      >
                        Wood
                      </button>
                      <button
                        @click="selectDumpsterGatesType('Metal (solid)')"
                        type="button"
                        class="form-dropdown-item"
                      >
                        Metal (solid)
                      </button>
                      <button
                        @click="selectDumpsterGatesType('Metal (tubular)')"
                        type="button"
                        class="form-dropdown-item"
                      >
                        Metal (tubular)
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Location Input -->
            <div class="mb-4">
              <label class="form-label">Location</label>
              <input
                type="text"
                class="form-input"
                placeholder="Please specify..."
                v-model="dumpsterLocation"
              />
            </div>

          <!-- Dumpster Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="dumpster-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="dumpsterCondition"
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
                  name="dumpster-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="dumpsterCondition"
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
                  name="dumpster-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="dumpsterCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Comments for Dumpster -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="dumpsterComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Gazebo/Pavilion Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'gazebo-pavilion' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('gazebo-pavilion')">
          Gazebo/Pavilion
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'gazebo-pavilion' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'gazebo-pavilion'">
          <!-- Gazebo/Pavilion Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Construction Type</label>
              <button
                @click="toggleGazeboPavilionDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showGazeboPavilionDropdown }"
              >
                <span class="text-gray-700">{{ gazeboPavilionType || 'Select construction type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showGazeboPavilionDropdown }"
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
                  v-if="showGazeboPavilionDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="gazeboPavilionOption in gazeboPavilionOptions"
                      :key="gazeboPavilionOption.value"
                      @click="selectGazeboPavilion(gazeboPavilionOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': gazeboPavilionType === gazeboPavilionOption.value }"
                    >
                      {{ gazeboPavilionOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Gazebo/Pavilion Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="gazebo-pavilion-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="gazeboPavilionCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="gazebo-pavilion-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="gazeboPavilionCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="gazebo-pavilion-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="gazeboPavilionCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Gazebo/Pavilion Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="gazebo-pavilion-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="gazeboPavilionRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="gazebo-pavilion-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="gazeboPavilionRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="gazebo-pavilion-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="gazeboPavilionRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="gazebo-pavilion-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="gazeboPavilionRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="gazebo-pavilion-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="gazeboPavilionRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="gazebo-pavilion-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="gazeboPavilionRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="gazeboPavilionAmount"
            />
          </div>

          <!-- Comments for Gazebo/Pavilion -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="gazeboPavilionComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Greenhouse Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'greenhouse' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('greenhouse')">
          Greenhouse
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'greenhouse' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'greenhouse'">
          <!-- Greenhouse Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Construction Type</label>
              <button
                @click="toggleGreenhouseDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showGreenhouseDropdown }"
              >
                <span class="text-gray-700">{{ greenhouseType || 'Select construction type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showGreenhouseDropdown }"
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
                  v-if="showGreenhouseDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="greenhouseOption in greenhouseOptions"
                      :key="greenhouseOption.value"
                      @click="selectGreenhouse(greenhouseOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': greenhouseType === greenhouseOption.value }"
                    >
                      {{ greenhouseOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Greenhouse Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="greenhouse-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="greenhouseCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="greenhouse-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="greenhouseCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="greenhouse-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="greenhouseCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Greenhouse Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="greenhouse-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="greenhouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="greenhouse-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="greenhouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="greenhouse-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="greenhouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="greenhouse-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="greenhouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="greenhouse-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="greenhouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="greenhouse-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="greenhouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="greenhouseAmount"
            />
          </div>

          <!-- Comments for Greenhouse -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="greenhouseComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Laundry Building Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'laundry-bldg' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('laundry-bldg')">
          Laundry Building
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'laundry-bldg' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'laundry-bldg'">
          <!-- Laundry Building Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Construction Type</label>
              <button
                @click="toggleLaundryBldgDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showLaundryBldgDropdown }"
              >
                <span class="text-gray-700">{{ laundryBldgType || 'Select construction type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showLaundryBldgDropdown }"
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
                  v-if="showLaundryBldgDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="laundryBldgOption in laundryBldgOptions"
                      :key="laundryBldgOption.value"
                      @click="selectLaundryBldg(laundryBldgOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': laundryBldgType === laundryBldgOption.value }"
                    >
                      {{ laundryBldgOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Laundry Building Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="laundry-bldg-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="laundryBldgCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="laundry-bldg-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="laundryBldgCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="laundry-bldg-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="laundryBldgCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Laundry Building Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="laundry-bldg-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="laundryBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="laundry-bldg-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="laundryBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="laundry-bldg-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="laundryBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="laundry-bldg-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="laundryBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="laundry-bldg-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="laundryBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="laundry-bldg-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="laundryBldgRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="laundryBldgAmount"
            />
          </div>

          <!-- Comments for Laundry Building -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="laundryBldgComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Well Pump House Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'well-pump-house' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('well-pump-house')">
          Well Pump House
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'well-pump-house' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'well-pump-house'">
          <!-- Well Pump House Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Construction Type</label>
              <button
                @click="toggleWellPumpHouseDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showWellPumpHouseDropdown }"
              >
                <span class="text-gray-700">{{ wellPumpHouseType || 'Select construction type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showWellPumpHouseDropdown }"
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
                  v-if="showWellPumpHouseDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="wellPumpHouseOption in wellPumpHouseOptions"
                      :key="wellPumpHouseOption.value"
                      @click="selectWellPumpHouse(wellPumpHouseOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': wellPumpHouseType === wellPumpHouseOption.value }"
                    >
                      {{ wellPumpHouseOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Well Pump House Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="well-pump-house-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="wellPumpHouseCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="well-pump-house-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="wellPumpHouseCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="well-pump-house-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="wellPumpHouseCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Well Pump House Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="well-pump-house-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="wellPumpHouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="well-pump-house-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="wellPumpHouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="well-pump-house-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="wellPumpHouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="well-pump-house-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="wellPumpHouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="well-pump-house-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="wellPumpHouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="well-pump-house-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="wellPumpHouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="wellPumpHouseAmount"
            />
          </div>

          <!-- Comments for Well Pump House -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="wellPumpHouseComments"></textarea>
          </div>
        </div>
      </div>

      <!-- Sewer Pump House Accordion -->
      <div class="collapse bg-base-100 border border-base-300 mt-4" :class="{ 'collapse-open': openAccordion === 'sewer-pump-house' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('sewer-pump-house')">
          Sewer Pump House
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'sewer-pump-house' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'sewer-pump-house'">
          <!-- Sewer Pump House Type Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Construction Type</label>
              <button
                @click="toggleSewerPumpHouseDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showSewerPumpHouseDropdown }"
              >
                <span class="text-gray-700">{{ sewerPumpHouseType || 'Select construction type' }}</span>
                <svg 
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showSewerPumpHouseDropdown }"
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
                  v-if="showSewerPumpHouseDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <button
                      v-for="sewerPumpHouseOption in sewerPumpHouseOptions"
                      :key="sewerPumpHouseOption.value"
                      @click="selectSewerPumpHouse(sewerPumpHouseOption.value)"
                      type="button"
                      class="form-dropdown-item"
                      :class="{ 'form-dropdown-item--selected': sewerPumpHouseType === sewerPumpHouseOption.value }"
                    >
                      {{ sewerPumpHouseOption.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Sewer Pump House Condition Assessment -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Condition Assessment</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="sewer-pump-house-condition-assessment" 
                  value="good" 
                  class="sr-only peer"
                  v-model="sewerPumpHouseCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Good</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="sewer-pump-house-condition-assessment" 
                  value="fair" 
                  class="sr-only peer"
                  v-model="sewerPumpHouseCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="sewer-pump-house-condition-assessment" 
                  value="poor" 
                  class="sr-only peer"
                  v-model="sewerPumpHouseCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Sewer Pump House Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="sewer-pump-house-repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="sewerPumpHouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="sewer-pump-house-repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="sewerPumpHouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="sewer-pump-house-repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="sewerPumpHouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="sewer-pump-house-repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="sewerPumpHouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="sewer-pump-house-repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="sewerPumpHouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="sewer-pump-house-repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="sewerPumpHouseRepairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">NA</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input 
              type="text" 
              class="form-input" 
              placeholder="Value?" 
              v-model="sewerPumpHouseAmount"
            />
          </div>

          <!-- Comments for Sewer Pump House -->
          <div class="mb-3">
            <label class="form-label">Comments</label>
            <textarea class="form-input" placeholder="Comments" v-model="sewerPumpHouseComments"></textarea>
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
const openAccordion = ref(null)

// Step 1 - Drainage and Erosion data
const conditionAssessment = ref('')
const drainageComments = ref('')

// Surface types
const surfaceType = ref([])
const showSurfaceTypeDropdown = ref(false)
const surfaceTypes = ref([
  { value: 'concrete', label: 'Concrete' },
  { value: 'asphalt', label: 'Asphalt' },
  { value: 'gravel', label: 'Gravel' },
  { value: 'dirt', label: 'Dirt' },
  { value: 'grass', label: 'Grass' },
  { value: 'pavers', label: 'Pavers' }
])

// Storm drainage options
const stormDrainageOptions = ref([
  { id: 1, name: 'Storm Drains', value: false },
  { id: 2, name: 'Catch Basins', value: false },
  { id: 3, name: 'Manholes', value: false },
  { id: 4, name: 'Culverts', value: false },
  { id: 5, name: 'Retention Ponds', value: false },
  { id: 6, name: 'Swales', value: false }
])

// Step 2 - Topography data
const topographySlope = ref('')
const topographyCondition = ref('')
const topographyRepairStatus = ref('')
const topographyAmount = ref('')
const erosionAssessment = ref('')
const erosionRepairStatus = ref('')
const erosionAmount = ref('')
const topographySlopeComments = ref('')
const erosionComments = ref('')
const showTopographySlopeDropdown = ref(false)

// Landscaping data
const landscapingType = ref('')
const landscapingCondition = ref('')
const landscapingRepairStatus = ref('')
const landscapingAmount = ref('')
const landscapingComments = ref('')
const showLandscapingDropdown = ref(false)

// Retaining Walls data
const retainingWallsType = ref('')
const retainingWallsCondition = ref('')
const retainingWallsRepairStatus = ref('')
const retainingWallsAmount = ref('')
const hasRailings = ref('')
const railingsType = ref('')
const railingsQualityCondition = ref('')
const railingsRepairStatus = ref('')
const railingsAmount = ref('')
const retainingWallsComments = ref('')
const showRetainingWallsDropdown = ref(false)
const showBridgeRailingsDropdown = ref(false)

// Screen Walls data
const screenWallsType = ref('')
const screenWallsCondition = ref('')
const screenWallsRepairStatus = ref('')
const screenWallsAmount = ref('')
const screenWallsComments = ref('')
const showScreenWallsDropdown = ref(false)

// Water Features data
const waterFeaturesType = ref('')
const waterFeaturesCondition = ref('')
const waterFeaturesRepairStatus = ref('')
const waterFeaturesAmount = ref('')
const pumpLocation = ref('')
const pumpAge = ref('')
const pumpQualityCondition = ref('')
const pumpRepairStatus = ref('')
const pumpAmount = ref('')
const waterFeaturesComments = ref('')
const showWaterFeaturesDropdown = ref(false)
const showPumpLocationDropdown = ref(false)

const topographySlopeOptions = ref([
  { value: 'flat', label: 'Flat (0-2%)' },
  { value: 'gentle', label: 'Gentle (2-5%)' },
  { value: 'moderate', label: 'Moderate (5-10%)' },
  { value: 'steep', label: 'Steep (10%+)' }
])

const landscapingOptions = ref([
  { value: 'maintained', label: 'Well Maintained' },
  { value: 'basic', label: 'Basic Landscaping' },
  { value: 'minimal', label: 'Minimal Landscaping' },
  { value: 'overgrown', label: 'Overgrown/Neglected' }
])

const retainingWallsOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'timber', label: 'Timber' },
  { value: 'stone', label: 'Stone' },
  { value: 'cmu-block', label: 'CMU Block' },
  { value: 'concrete', label: 'Concrete' },
  { value: 'brick', label: 'Brick' },
  { value: 'railroad-ties', label: 'Railroad Ties' },
  { value: 'lumber', label: 'Lumber' },
  { value: 'other', label: 'Other' }
])

// Screen walls options data
const screenWallsOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'timber', label: 'Timber' },
  { value: 'stone', label: 'Stone' },
  { value: 'cmu-block', label: 'CMU Block' },
  { value: 'concrete', label: 'Concrete' },
  { value: 'brick', label: 'Brick' },
  { value: 'railroad-ties', label: 'Railroad Ties' },
  { value: 'lumber', label: 'Lumber' },
  { value: 'other', label: 'Other' }
])

// Water features options data
const waterFeaturesOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'decorative-fountain', label: 'Decorative Fountain' },
  { value: 'artificial-pond', label: 'Artificial Pond' },
  { value: 'creek', label: 'Creek' },
  { value: 'reg-pond', label: 'Reg. Pond' },
  { value: 'lake-ocean-shoreline', label: 'Lake / Ocean Shoreline' }
])

// Railings options data
const railingsOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'metal', label: 'Metal' },
  { value: 'wood', label: 'Wood' },
  { value: 'vinyl', label: 'Vinyl' },
  { value: 'chain-link', label: 'Chain link' }
])

// Pump location options data
const pumpLocationOptions = ref([
  { value: 'vault', label: 'Vault' },
  { value: 'water', label: 'Water' },
  { value: 'enclosure', label: 'Enclosure' }
])

// Step 3 - General Site Improvements data
const selectedSignageTypes = ref([])
const signageCondition = ref('')
const signageRepairStatus = ref('')
const signageAmount = ref('')
const signageComments = ref('')
const showSignageDropdown = ref(false)

// Lot Lighting data
const selectedLotLightingTypes = ref([])
const lotLightingCondition = ref('')
const lotLightingRepairStatus = ref('')
const lotLightingAmount = ref('')
const lotLightingComments = ref('')
const showLotLightingDropdown = ref(false)

// Building Lighting data
const buildingLightingType = ref('')
const buildingLightingCondition = ref('')
const buildingLightingRepairStatus = ref('')
const buildingLightingAmount = ref('')
const buildingLightingComments = ref('')
const showBuildingLightingDropdown = ref(false)

// Security Gates data
const securityGatesType = ref('')
const securityGatesCondition = ref('')
const securityGatesRepairStatus = ref('')
const securityGatesAmount = ref('')
const securityGatesComments = ref('')
const showSecurityGatesDropdown = ref(false)

// Compactor data
const compactorType = ref('')
const compactorCondition = ref('')
const compactorRepairStatus = ref('')
const compactorAmount = ref('')
const compactorComments = ref('')
const compactorLocation = ref('')
const showCompactorDropdown = ref(false)

// Bridges data
const selectedBridgeTypes = ref([])
const bridgesCondition = ref('')
const bridgesRepairStatus = ref('')
const bridgesAmount = ref('')
const bridgesComments = ref('')
const showBridgesDropdown = ref(false)

// Site Fencing data
const selectedSiteFencingTypes = ref([])
const siteFencingCondition = ref('')
const siteFencingRepairStatus = ref('')
const siteFencingAmount = ref('')
const siteFencingComments = ref('')
const showSiteFencingDropdown = ref(false)

const signageOptions = ref([
  { value: 'monument', label: 'Monument Sign' },
  { value: 'directional', label: 'Directional Signs' },
  { value: 'building', label: 'Building Signs' },
  { value: 'parking', label: 'Parking Signs' },
  { value: 'safety', label: 'Safety Signs' },
  { value: 'regulatory', label: 'Regulatory Signs' }
])

const lotLightingOptions = ref([
  { value: 'pole-mounted', label: 'Pole Mounted' },
  { value: 'wall-mounted', label: 'Wall Mounted' },
  { value: 'security', label: 'Security Lighting' },
  { value: 'decorative', label: 'Decorative' },
  { value: 'led', label: 'LED' },
  { value: 'fluorescent', label: 'Fluorescent' }
])

// Building lighting options data
const buildingLightingOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'surface', label: 'Surface' },
  { value: 'recessed-soffits', label: 'Recessed in Soffits' },
  { value: 'wall-mounted', label: 'Wall Mounted' },
  { value: 'pendant', label: 'Pendant' }
])

// Security gates options data
const securityGatesOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'chain-link', label: 'Chain Link' },
  { value: 'metal', label: 'Metal' },
  { value: 'vinyl', label: 'Vinyl' },
  { value: 'overhead', label: 'Overhead' },
  { value: 'sliding', label: 'Sliding' },
  { value: 'swing', label: 'Swing' }
])

// Compactor options data
const compactorOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'tenant-owned', label: 'Tenant owned' }
])

// Bridge types for multi-select
const bridgeTypes = ref([
  { value: 'concrete', label: 'Concrete' },
  { value: 'wood', label: 'Wood' },
  { value: 'steel', label: 'Steel' },
  { value: 'stone', label: 'Stone' }
])

// Carports options data
const carportOptions = ref([
  { value: 'wood', label: 'Wood Frame' },
  { value: 'metal', label: 'Metal Frame' },
  { value: 'concrete', label: 'Concrete' },
  { value: 'mixed', label: 'Mixed Construction' }
])

// Maintenance building options data
const maintenanceBldgOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'wood-frame', label: 'Wood Frame' },
  { value: 'metal-frame', label: 'Metal Frame' },
  { value: 'concrete-block', label: 'Concrete Block' },
  { value: 'brick', label: 'Brick' }
])

// Fire pump building options data
const firePumpBldgOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'concrete-block', label: 'Concrete Block' },
  { value: 'brick', label: 'Brick' },
  { value: 'metal', label: 'Metal' }
])

// Residential garages options data
const residentialGaragesOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'attached', label: 'Attached' },
  { value: 'detached', label: 'Detached' },
  { value: 'carport', label: 'Carport Style' }
])

// Gazebo/Pavilion options data
const gazeboPavilionOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'wood', label: 'Wood' },
  { value: 'metal', label: 'Metal' },
  { value: 'vinyl', label: 'Vinyl' },
  { value: 'concrete', label: 'Concrete' }
])

// Greenhouse options data
const greenhouseOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'glass', label: 'Glass' },
  { value: 'polycarbonate', label: 'Polycarbonate' },
  { value: 'plastic', label: 'Plastic' }
])

// Laundry building options data
const laundryBldgOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'wood-frame', label: 'Wood Frame' },
  { value: 'metal-frame', label: 'Metal Frame' },
  { value: 'concrete-block', label: 'Concrete Block' },
  { value: 'brick', label: 'Brick' }
])

// Well pump house options data
const wellPumpHouseOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'concrete-block', label: 'Concrete Block' },
  { value: 'brick', label: 'Brick' },
  { value: 'metal', label: 'Metal' },
  { value: 'wood', label: 'Wood' }
])

// Sewer pump house options data
const sewerPumpHouseOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'concrete-block', label: 'Concrete Block' },
  { value: 'brick', label: 'Brick' },
  { value: 'metal', label: 'Metal' },
  { value: 'underground', label: 'Underground' }
])

const siteFencingOptions = ref([
  { value: 'chain-link', label: 'Chain Link' },
  { value: 'wood', label: 'Wood' },
  { value: 'vinyl', label: 'Vinyl' },
  { value: 'iron', label: 'Wrought Iron' },
  { value: 'aluminum', label: 'Aluminum' },
  { value: 'security', label: 'Security Fence' }
])

// Step 4 - Other Structures data
const carportsType = ref('')
const carportsCondition = ref('')
const carportsRepairStatus = ref('')
const carportsAmount = ref('')
const carportsComments = ref('')
const showCarportsDropdown = ref(false)

// Maintenance Building data
const maintenanceBldgType = ref('')
const maintenanceBldgCondition = ref('')
const maintenanceBldgRepairStatus = ref('')
const maintenanceBldgAmount = ref('')
const maintenanceBldgComments = ref('')
const showMaintenanceBldgDropdown = ref(false)

// Fire Pump Building data
const firePumpBldgType = ref('')
const firePumpBldgCondition = ref('')
const firePumpBldgRepairStatus = ref('')
const firePumpBldgAmount = ref('')
const firePumpBldgComments = ref('')
const showFirePumpBldgDropdown = ref(false)

// Residential Garages data
const residentialGaragesType = ref('')
const residentialGaragesCondition = ref('')
const residentialGaragesRepairStatus = ref('')
const residentialGaragesAmount = ref('')
const residentialGaragesComments = ref('')
const showResidentialGaragesDropdown = ref(false)

// Gazebo/Pavilion data
const gazeboPavilionType = ref('')
const gazeboPavilionCondition = ref('')
const gazeboPavilionRepairStatus = ref('')
const gazeboPavilionAmount = ref('')
const gazeboPavilionComments = ref('')
const showGazeboPavilionDropdown = ref(false)

// Greenhouse data
const greenhouseType = ref('')
const greenhouseCondition = ref('')
const greenhouseRepairStatus = ref('')
const greenhouseAmount = ref('')
const greenhouseComments = ref('')
const showGreenhouseDropdown = ref(false)

// Laundry Building data
const laundryBldgType = ref('')
const laundryBldgCondition = ref('')
const laundryBldgRepairStatus = ref('')
const laundryBldgAmount = ref('')
const laundryBldgComments = ref('')
const showLaundryBldgDropdown = ref(false)

// Well Pump House data
const wellPumpHouseType = ref('')
const wellPumpHouseCondition = ref('')
const wellPumpHouseRepairStatus = ref('')
const wellPumpHouseAmount = ref('')
const wellPumpHouseComments = ref('')
const showWellPumpHouseDropdown = ref(false)

// Sewer Pump House data
const sewerPumpHouseType = ref('')
const sewerPumpHouseCondition = ref('')
const sewerPumpHouseRepairStatus = ref('')
const sewerPumpHouseAmount = ref('')
const sewerPumpHouseComments = ref('')
const showSewerPumpHouseDropdown = ref(false)

// Recreational Facilities data
const selectedRecreationalFacilitiesTypes = ref([])
const recreationalFacilitiesCondition = ref('')
const recreationalFacilitiesRepairStatus = ref('')
const recreationalFacilitiesAmount = ref('')
const recreationalFacilitiesComments = ref('')
const showRecreationalFacilitiesDropdown = ref(false)

// Dumpster data
const dumpsterType = ref('')
const dumpsterCondition = ref('')
const dumpsterRepairStatus = ref('')
const dumpsterAmount = ref('')
const dumpsterAvailable = ref('')
const dumpsterEnclosureType = ref('')
const dumpsterGatesType = ref('')
const dumpsterLocation = ref('')
const dumpsterComments = ref('')
const showDumpsterDropdown = ref(false)
const showDumpsterEnclosureDropdown = ref(false)
const showDumpsterGatesDropdown = ref(false)

const recreationalFacilitiesOptions = ref([
  { value: 'pool', label: 'Swimming Pool' },
  { value: 'tennis', label: 'Tennis Court' },
  { value: 'basketball', label: 'Basketball Court' },
  { value: 'playground', label: 'Playground' },
  { value: 'clubhouse', label: 'Clubhouse' },
  { value: 'fitness', label: 'Fitness Center' }
])

const dumpsterOptions = ref([
  { value: 'open-top', label: 'Open Top' },
  { value: 'enclosed', label: 'Enclosed' },
  { value: 'compactor', label: 'Compactor' },
  { value: 'roll-off', label: 'Roll-off' }
])

// Computed properties
const surfaceTypeDisplayText = computed(() => {
  if (surfaceType.value.length === 0) return 'Select surface types'
  if (surfaceType.value.length === 1) {
    const selected = surfaceTypes.value.find(s => s.value === surfaceType.value[0])
    return selected ? selected.label : 'Select surface types'
  }
  return `${surfaceType.value.length} types selected`
})

const canGoNext = computed(() => {
  return currentStep.value < totalSteps.value
})

const canGoPrevious = computed(() => {
  return currentStep.value > 1
})

const isComplete = computed(() => {
  return currentStep.value === totalSteps.value && 
         conditionAssessment.value !== '' &&
         topographyCondition.value !== ''
})

// Methods
const toggleSurfaceTypeDropdown = () => {
  showSurfaceTypeDropdown.value = !showSurfaceTypeDropdown.value
}

const toggleTopographySlopeDropdown = () => {
  showTopographySlopeDropdown.value = !showTopographySlopeDropdown.value
}

const selectTopographySlope = (value) => {
  topographySlope.value = value
  showTopographySlopeDropdown.value = false
}

const toggleLandscapingDropdown = () => {
  showLandscapingDropdown.value = !showLandscapingDropdown.value
}

const selectLandscaping = (value) => {
  landscapingType.value = value
  showLandscapingDropdown.value = false
}

const toggleRetainingWallsDropdown = () => {
  showRetainingWallsDropdown.value = !showRetainingWallsDropdown.value
}

const selectRetainingWalls = (value) => {
  retainingWallsType.value = value
  showRetainingWallsDropdown.value = false
}

const toggleScreenWallsDropdown = () => {
  showScreenWallsDropdown.value = !showScreenWallsDropdown.value
}

const selectScreenWalls = (value) => {
  screenWallsType.value = value
  showScreenWallsDropdown.value = false
}

const toggleWaterFeaturesDropdown = () => {
  showWaterFeaturesDropdown.value = !showWaterFeaturesDropdown.value
}

const selectWaterFeatures = (value) => {
  waterFeaturesType.value = value
  showWaterFeaturesDropdown.value = false
}

const toggleBridgeRailingsDropdown = () => {
  showBridgeRailingsDropdown.value = !showBridgeRailingsDropdown.value
}

const selectRailings = (value) => {
  railingsType.value = value
  showBridgeRailingsDropdown.value = false
}

const togglePumpLocationDropdown = () => {
  showPumpLocationDropdown.value = !showPumpLocationDropdown.value
}

const selectPumpLocation = (value) => {
  pumpLocation.value = value
  showPumpLocationDropdown.value = false
}

const toggleBuildingLightingDropdown = () => {
  showBuildingLightingDropdown.value = !showBuildingLightingDropdown.value
}

const selectBuildingLighting = (value) => {
  buildingLightingType.value = value
  showBuildingLightingDropdown.value = false
}

const toggleSecurityGatesDropdown = () => {
  showSecurityGatesDropdown.value = !showSecurityGatesDropdown.value
}

const selectSecurityGates = (value) => {
  securityGatesType.value = value
  showSecurityGatesDropdown.value = false
}

const toggleCompactorDropdown = () => {
  showCompactorDropdown.value = !showCompactorDropdown.value
}

const selectCompactor = (value) => {
  compactorType.value = value
  showCompactorDropdown.value = false
}

const toggleBridgesDropdown = () => {
  showBridgesDropdown.value = !showBridgesDropdown.value
}

const toggleBridgeType = (type) => {
  const index = selectedBridgeTypes.value.indexOf(type)
  if (index > -1) {
    selectedBridgeTypes.value.splice(index, 1)
  } else {
    selectedBridgeTypes.value.push(type)
  }
}

const toggleMaintenanceBldgDropdown = () => {
  showMaintenanceBldgDropdown.value = !showMaintenanceBldgDropdown.value
}

const selectMaintenanceBldg = (value) => {
  maintenanceBldgType.value = value
  showMaintenanceBldgDropdown.value = false
}

const toggleFirePumpBldgDropdown = () => {
  showFirePumpBldgDropdown.value = !showFirePumpBldgDropdown.value
}

const selectFirePumpBldg = (value) => {
  firePumpBldgType.value = value
  showFirePumpBldgDropdown.value = false
}

const toggleResidentialGaragesDropdown = () => {
  showResidentialGaragesDropdown.value = !showResidentialGaragesDropdown.value
}

const selectResidentialGarages = (value) => {
  residentialGaragesType.value = value
  showResidentialGaragesDropdown.value = false
}

const toggleGazeboPavilionDropdown = () => {
  showGazeboPavilionDropdown.value = !showGazeboPavilionDropdown.value
}

const selectGazeboPavilion = (value) => {
  gazeboPavilionType.value = value
  showGazeboPavilionDropdown.value = false
}

const toggleGreenhouseDropdown = () => {
  showGreenhouseDropdown.value = !showGreenhouseDropdown.value
}

const selectGreenhouse = (value) => {
  greenhouseType.value = value
  showGreenhouseDropdown.value = false
}

const toggleLaundryBldgDropdown = () => {
  showLaundryBldgDropdown.value = !showLaundryBldgDropdown.value
}

const selectLaundryBldg = (value) => {
  laundryBldgType.value = value
  showLaundryBldgDropdown.value = false
}

const toggleWellPumpHouseDropdown = () => {
  showWellPumpHouseDropdown.value = !showWellPumpHouseDropdown.value
}

const selectWellPumpHouse = (value) => {
  wellPumpHouseType.value = value
  showWellPumpHouseDropdown.value = false
}

const toggleSewerPumpHouseDropdown = () => {
  showSewerPumpHouseDropdown.value = !showSewerPumpHouseDropdown.value
}

const selectSewerPumpHouse = (value) => {
  sewerPumpHouseType.value = value
  showSewerPumpHouseDropdown.value = false
}

const toggleDumpsterEnclosureDropdown = () => {
  showDumpsterEnclosureDropdown.value = !showDumpsterEnclosureDropdown.value
}

const selectDumpsterEnclosureType = (type) => {
  dumpsterEnclosureType.value = type
  showDumpsterEnclosureDropdown.value = false
}

const toggleDumpsterGatesDropdown = () => {
  showDumpsterGatesDropdown.value = !showDumpsterGatesDropdown.value
}

const selectDumpsterGatesType = (type) => {
  dumpsterGatesType.value = type
  showDumpsterGatesDropdown.value = false
}

const toggleAccordion = (accordionName) => {
  openAccordion.value = openAccordion.value === accordionName ? null : accordionName
}

// Step 3 methods
const toggleSignageDropdown = () => {
  showSignageDropdown.value = !showSignageDropdown.value
}

const toggleSignageSelection = (value) => {
  const index = selectedSignageTypes.value.indexOf(value)
  if (index > -1) {
    selectedSignageTypes.value.splice(index, 1)
  } else {
    selectedSignageTypes.value.push(value)
  }
}

const isSignageSelected = (value) => {
  return selectedSignageTypes.value.includes(value)
}

// Lot Lighting methods
const toggleLotLightingDropdown = () => {
  showLotLightingDropdown.value = !showLotLightingDropdown.value
}

const toggleLotLightingSelection = (value) => {
  const index = selectedLotLightingTypes.value.indexOf(value)
  if (index > -1) {
    selectedLotLightingTypes.value.splice(index, 1)
  } else {
    selectedLotLightingTypes.value.push(value)
  }
}

const isLotLightingSelected = (value) => {
  return selectedLotLightingTypes.value.includes(value)
}

// Site Fencing methods
const toggleSiteFencingDropdown = () => {
  showSiteFencingDropdown.value = !showSiteFencingDropdown.value
}

const toggleSiteFencingSelection = (value) => {
  const index = selectedSiteFencingTypes.value.indexOf(value)
  if (index > -1) {
    selectedSiteFencingTypes.value.splice(index, 1)
  } else {
    selectedSiteFencingTypes.value.push(value)
  }
}

const isSiteFencingSelected = (value) => {
  return selectedSiteFencingTypes.value.includes(value)
}

// Step 4 methods
const toggleCarportsDropdown = () => {
  showCarportsDropdown.value = !showCarportsDropdown.value
}

const selectCarportsType = (value) => {
  carportsType.value = value
  showCarportsDropdown.value = false
}

// Recreational Facilities methods
const toggleRecreationalFacilitiesDropdown = () => {
  showRecreationalFacilitiesDropdown.value = !showRecreationalFacilitiesDropdown.value
}

const toggleRecreationalFacilitiesSelection = (value) => {
  const index = selectedRecreationalFacilitiesTypes.value.indexOf(value)
  if (index > -1) {
    selectedRecreationalFacilitiesTypes.value.splice(index, 1)
  } else {
    selectedRecreationalFacilitiesTypes.value.push(value)
  }
}

const isRecreationalFacilitiesSelected = (value) => {
  return selectedRecreationalFacilitiesTypes.value.includes(value)
}

// Dumpster methods
const toggleDumpsterDropdown = () => {
  showDumpsterDropdown.value = !showDumpsterDropdown.value
}

const selectDumpster = (value) => {
  dumpsterType.value = value
  showDumpsterDropdown.value = false
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