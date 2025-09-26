<template>
  <div class="space-y-4 pb-4">
    <!-- Step 1: Drainage and Erosion -->
    <div v-if="currentStep === 1">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Drainage and Erosion</h2>
      </div>

      <div class="space-y-8">
        <!-- Drainage and erosion Section -->

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

        <!-- Surface to select options *make a select all applicable button*-->
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

        <!-- good fair poor Section -->
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
            <textarea class="form-input" placeholder="Comments"></textarea>
          </div>
        </div>

      </div>

    </div>

    <!-- Step 2: Topography -->
    <div v-if="currentStep === 2">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Topography</h2>
      </div>
      <!-- accordion for topography and erosion sub items-->
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
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="repairStatus"
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
            />
          </div>

        </div>
      </div>

      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'landscaping' }">
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
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="repairStatus"
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
            />
          </div>

        </div>
      </div>

      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'retaining-walls' }">
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
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="repair-status"
                  value="NA"
                  class="sr-only peer"
                  v-model="repairStatus"
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
                <!-- Good Button -->
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
                
                <!-- Fair Button -->
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
                
                <!-- Poor Button -->
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
                <!-- First Row -->
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

        </div>
      </div>

      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'screen-walls' }">
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
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="repairStatus"
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
            />
          </div>

        </div>
      </div>

      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'water-features' }">
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
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="repairStatus"
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
                <!-- Good Button -->
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
                
                <!-- Fair Button -->
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
                
                <!-- Poor Button -->
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
                <!-- First Row -->
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

        </div>
      </div>


      <div class="mb-3 mt-3">
        <label class="form-label">Comments</label>
        <textarea class="form-input" placeholder="Comments"></textarea>
      </div>


    </div>

    <!-- Step 3: General Site Improvements -->
    <div v-if="currentStep === 3">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">General Site Improvements</h2>
      </div>

      <!-- accordion for general site improvements sub items-->
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
              <!-- First Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="IR" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">IR</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="ST" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">ST</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="RR" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RR</span>
                </div>
              </label>
              
              <!-- Second Row -->
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="RM" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">RM</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="INV" 
                  class="sr-only peer"
                  v-model="repairStatus"
                />
                <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                  <span class="text-sm font-medium">INV</span>
                </div>
              </label>
              
              <label class="relative cursor-pointer">
                <input 
                  type="radio" 
                  name="repair-status" 
                  value="NA" 
                  class="sr-only peer"
                  v-model="repairStatus"
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
            />
          </div>

        </div>
      </div>

      <!-- Lot Lighting Accordion -->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'lot-lighting' }">
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
              <label class="form-label">Lot Lighting Type</label>
              <button
                @click="toggleLotLightingDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showLotLightingDropdown }"
              >
                <span class="text-gray-700">{{ lotLightingType || 'Select Type' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showLotLightingDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showLotLightingDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectLotLightingType('N/A')"
                      class="form-dropdown-item"
                    >
                      N/A
                    </div>
                    <div
                      @click="selectLotLightingType('Metal Pole')"
                      class="form-dropdown-item"
                    >
                      Metal Pole
                    </div>
                    <div
                      @click="selectLotLightingType('Wood Pole')"
                      class="form-dropdown-item"
                    >
                      Wood Pole
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Lot Lighting Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="lot-lighting-quality-condition"
                  value="good"
                  class="sr-only peer"
                  v-model="lotLightingQualityCondition"
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
                  name="lot-lighting-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="lotLightingQualityCondition"
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
                  name="lot-lighting-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="lotLightingQualityCondition"
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

          <!-- Lot Lighting Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input
              type="text"
              class="form-input"
              placeholder="Value?"
              v-model="lotLightingAmount"
            />
          </div>
        </div>
      </div>

      <!-- Building Lighting Accordion -->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'building-lighting' }">
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
                <span class="text-gray-700">{{ buildingLightingType || 'Select Type' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showBuildingLightingDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showBuildingLightingDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectBuildingLightingType('N/A')"
                      class="form-dropdown-item"
                    >
                      N/A
                    </div>
                    <div
                      @click="selectBuildingLightingType('Surface')"
                      class="form-dropdown-item"
                    >
                      Surface
                    </div>
                    <div
                      @click="selectBuildingLightingType('Recessed in Soffits')"
                      class="form-dropdown-item"
                    >
                      Recessed in Soffits
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Building Lighting Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="building-lighting-quality-condition"
                  value="good"
                  class="sr-only peer"
                  v-model="buildingLightingQualityCondition"
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
                  name="building-lighting-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="buildingLightingQualityCondition"
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
                  name="building-lighting-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="buildingLightingQualityCondition"
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

          <!-- Building Lighting Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input
              type="text"
              class="form-input"
              placeholder="Value?"
              v-model="buildingLightingAmount"
            />
          </div>
        </div>
      </div>

      <!-- Site Fencing Accordion -->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'site-fencing' }">
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
              <label class="form-label">Site Fencing Type</label>
              <button
                @click="toggleSiteFencingDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showSiteFencingDropdown }"
              >
                <span class="text-gray-700">{{ siteFencingType || 'Select Type' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showSiteFencingDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showSiteFencingDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectSiteFencingType('N/A')"
                      class="form-dropdown-item"
                    >
                      N/A
                    </div>
                    <div
                      @click="selectSiteFencingType('Chain Link')"
                      class="form-dropdown-item"
                    >
                      Chain Link
                    </div>
                    <div
                      @click="selectSiteFencingType('Wood')"
                      class="form-dropdown-item"
                    >
                      Wood
                    </div>
                    <div
                      @click="selectSiteFencingType('CMU')"
                      class="form-dropdown-item"
                    >
                      CMU
                    </div>
                    <div
                      @click="selectSiteFencingType('Brick')"
                      class="form-dropdown-item"
                    >
                      Brick
                    </div>
                    <div
                      @click="selectSiteFencingType('Vinyl')"
                      class="form-dropdown-item"
                    >
                      Vinyl
                    </div>
                    <div
                      @click="selectSiteFencingType('Other')"
                      class="form-dropdown-item"
                    >
                      Other
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Site Fencing Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="site-fencing-quality-condition"
                  value="good"
                  class="sr-only peer"
                  v-model="siteFencingQualityCondition"
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
                  name="site-fencing-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="siteFencingQualityCondition"
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
                  name="site-fencing-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="siteFencingQualityCondition"
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

          <!-- Site Fencing Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input
              type="text"
              class="form-input"
              placeholder="Value?"
              v-model="siteFencingAmount"
            />
          </div>
        </div>
      </div>

      <!-- Security Gates Accordion -->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'security-gates' }">
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
                <span class="text-gray-700">{{ securityGatesType || 'Select Type' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showSecurityGatesDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showSecurityGatesDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectSecurityGatesType('N/A')"
                      class="form-dropdown-item"
                    >
                      N/A
                    </div>
                    <div
                      @click="selectSecurityGatesType('Chain Link')"
                      class="form-dropdown-item"
                    >
                      Chain Link
                    </div>
                    <div
                      @click="selectSecurityGatesType('Metal')"
                      class="form-dropdown-item"
                    >
                      Metal
                    </div>
                    <div
                      @click="selectSecurityGatesType('Vinyl')"
                      class="form-dropdown-item"
                    >
                      Vinyl
                    </div>
                    <div
                      @click="selectSecurityGatesType('Overhead')"
                      class="form-dropdown-item"
                    >
                      Overhead
                    </div>
                    <div
                      @click="selectSecurityGatesType('Sliding')"
                      class="form-dropdown-item"
                    >
                      Sliding
                    </div>
                    <div
                      @click="selectSecurityGatesType('Swing')"
                      class="form-dropdown-item"
                    >
                      Swing
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Security Gates Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-2 w-full">
              <!-- Good Button -->
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="security-gates-quality-condition"
                  value="good"
                  class="sr-only peer"
                  v-model="securityGatesQualityCondition"
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
                  name="security-gates-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="securityGatesQualityCondition"
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
                  name="security-gates-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="securityGatesQualityCondition"
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

          <!-- Security Gates Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input
              type="text"
              class="form-input"
              placeholder="Value?"
              v-model="securityGatesAmount"
            />
          </div>
        </div>
      </div>

      <!--Dumpster Accordion-->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'dumpster' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('dumpster')">
          Dumpster
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'dumpster' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'dumpster'">
          <!-- N/A Radio Select -->
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
                      <div
                        @click="selectDumpsterEnclosureType('Chain link')"
                        class="form-dropdown-item"
                      >
                        Chain link
                      </div>
                      <div
                        @click="selectDumpsterEnclosureType('Wood')"
                        class="form-dropdown-item"
                      >
                        Wood
                      </div>
                      <div
                        @click="selectDumpsterEnclosureType('CMU')"
                        class="form-dropdown-item"
                      >
                        CMU
                      </div>
                      <div
                        @click="selectDumpsterEnclosureType('Brick')"
                        class="form-dropdown-item"
                      >
                        Brick
                      </div>
                      <div
                        @click="selectDumpsterEnclosureType('Vinyl')"
                        class="form-dropdown-item"
                      >
                        Vinyl
                      </div>
                      <div
                        @click="selectDumpsterEnclosureType('Other')"
                        class="form-dropdown-item"
                      >
                        Other
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Other Text Field (shown only if Other is selected) -->
            <div v-if="dumpsterEnclosureType === 'Other'" class="mb-4">
              <label class="form-label">Specify Other Enclosure</label>
              <input
                type="text"
                class="form-input"
                placeholder="Please specify..."
                v-model="dumpsterEnclosureOther"
              />
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
                      <div
                        @click="selectDumpsterGatesType('Chain link')"
                        class="form-dropdown-item"
                      >
                        Chain link
                      </div>
                      <div
                        @click="selectDumpsterGatesType('Wood')"
                        class="form-dropdown-item"
                      >
                        Wood
                      </div>
                      <div
                        @click="selectDumpsterGatesType('Metal (solid)')"
                        class="form-dropdown-item"
                      >
                        Metal (solid)
                      </div>
                      <div
                        @click="selectDumpsterGatesType('Metal (tubular)')"
                        class="form-dropdown-item"
                      >
                        Metal (tubular)
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label">Location</label>
              <input
                type="text"
                class="form-input"
                placeholder="Please specify..."
                v-model="dumpsterLocation"
              />
            </div>

            <!-- Dumpster Quality Condition -->
            <div class="mb-3">
              <label class="form-label mb-3 block">Quality Condition</label>
              <div class="grid grid-cols-3 gap-2 w-full">
                <!-- Good Button -->
                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    name="dumpster-quality-condition"
                    value="good"
                    class="sr-only peer"
                    v-model="dumpsterQualityCondition"
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
                    name="dumpster-quality-condition"
                    value="fair"
                    class="sr-only peer"
                    v-model="dumpsterQualityCondition"
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
                    name="dumpster-quality-condition"
                    value="poor"
                    class="sr-only peer"
                    v-model="dumpsterQualityCondition"
                  />
                  <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                    <div class="text-2xl mb-1">❌</div>
                    <span class="text-sm font-medium">Poor</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Dumpster Repair Status -->
            <div class="mb-3">
              <label class="form-label mb-3 block">Repair Status</label>
              <div class="grid grid-cols-3 gap-2 w-full">
                <!-- First Row -->
                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    name="dumpster-repair-status"
                    value="IR"
                    class="sr-only peer"
                    v-model="dumpsterRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">IR</span>
                  </div>
                </label>

                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    name="dumpster-repair-status"
                    value="ST"
                    class="sr-only peer"
                    v-model="dumpsterRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">ST</span>
                  </div>
                </label>

                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    name="dumpster-repair-status"
                    value="RR"
                    class="sr-only peer"
                    v-model="dumpsterRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">RR</span>
                  </div>
                </label>

                <!-- Second Row -->
                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    name="dumpster-repair-status"
                    value="RM"
                    class="sr-only peer"
                    v-model="dumpsterRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">RM</span>
                  </div>
                </label>

                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    name="dumpster-repair-status"
                    value="INV"
                    class="sr-only peer"
                    v-model="dumpsterRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">INV</span>
                  </div>
                </label>

                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    name="dumpster-repair-status"
                    value="NA"
                    class="sr-only peer"
                    v-model="dumpsterRepairStatus"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">NA</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Dumpster Amount to Repair and Replace -->
            <div class="mb-3">
              <label class="form-label">Amount to Repair and Replace</label>
              <input
                type="text"
                class="form-input"
                placeholder="Value?"
                v-model="dumpsterAmount"
              />
            </div>
          </div>
        </div>
      </div>

      <!--Recreational Facilities Accordion-->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'recreational-facilities' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('recreational-facilities')">
          Recreational Facilities
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'recreational-facilities' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'recreational-facilities'">
          <!-- Recreational Facilities Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Recreational Facilities</label>
              <button
                @click="toggleRecreationalFacilitiesDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showRecreationalFacilitiesDropdown }"
              >
                <span class="text-gray-700">{{ recreationalFacilitiesType || 'Select Recreational Facilities' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showRecreationalFacilitiesDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showRecreationalFacilitiesDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectRecreationalFacilitiesType('N/A')"
                      class="form-dropdown-item"
                    >
                      N/A
                    </div>
                    <div
                      @click="selectRecreationalFacilitiesType('BBQ Area')"
                      class="form-dropdown-item"
                    >
                      BBQ Area
                    </div>
                    <div
                      @click="selectRecreationalFacilitiesType('Playground')"
                      class="form-dropdown-item"
                    >
                      Playground
                    </div>
                    <div
                      @click="selectRecreationalFacilitiesType('Basketball Court')"
                      class="form-dropdown-item"
                    >
                      Basketball Court
                    </div>
                    <div
                      @click="selectRecreationalFacilitiesType('Tennis Court')"
                      class="form-dropdown-item"
                    >
                      Tennis Court
                    </div>
                    <div
                      @click="selectRecreationalFacilitiesType('Volleyball Court')"
                      class="form-dropdown-item"
                    >
                      Volleyball Court
                    </div>
                    <div
                      @click="selectRecreationalFacilitiesType('Golf Course')"
                      class="form-dropdown-item"
                    >
                      Golf Course
                    </div>
                    <div
                      @click="selectRecreationalFacilitiesType('Leisure Area')"
                      class="form-dropdown-item"
                    >
                      Leisure Area
                    </div>
                    <div
                      @click="selectRecreationalFacilitiesType('Other')"
                      class="form-dropdown-item"
                    >
                      Other
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Other Text Field (shown only if Other is selected) -->
          <div v-if="recreationalFacilitiesType === 'Other'" class="mb-4">
            <label class="form-label">Specify Other Recreational Facilities</label>
            <input
              type="text"
              class="form-input"
              placeholder="Please specify..."
              v-model="recreationalFacilitiesOther"
            />
          </div>

          <!-- Recreational Facilities Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-3 w-full">
              <!-- Excellent Button -->
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="recreational-facilities-quality-condition"
                  value="excellent"
                  class="sr-only peer"
                  v-model="recreationalFacilitiesQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Excellent</span>
                </div>
              </label>

              <!-- Fair Button -->
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="recreational-facilities-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="recreationalFacilitiesQualityCondition"
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
                  name="recreational-facilities-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="recreationalFacilitiesQualityCondition"
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

          <!-- Recreational Facilities Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input
              type="text"
              class="form-input"
              placeholder="Value?"
              v-model="recreationalFacilitiesAmount"
            />
          </div>
        </div>
      </div>

      <!--Compactor Accordion-->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'compactor' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('compactor')">
          Compactor
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'compactor' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'compactor'">
          <!-- Compactor Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Compactor</label>
              <button
                @click="toggleCompactorDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showCompactorDropdown }"
              >
                <span class="text-gray-700">{{ compactorType || 'Select Compactor' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showCompactorDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showCompactorDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectCompactorType('N/A')"
                      class="form-dropdown-item"
                    >
                      N/A
                    </div>
                    <div
                      @click="selectCompactorType('Tenant owned')"
                      class="form-dropdown-item"
                    >
                      Tenant owned
                    </div>
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

          <!-- Compactor Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-3 w-full">
              <!-- Excellent Button -->
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="compactor-quality-condition"
                  value="excellent"
                  class="sr-only peer"
                  v-model="compactorQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Excellent</span>
                </div>
              </label>

              <!-- Fair Button -->
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="compactor-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="compactorQualityCondition"
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
                  name="compactor-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="compactorQualityCondition"
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

          <!-- Compactor Amount to Repair and Replace -->
          <div class="mb-3">
            <label class="form-label">Amount to Repair and Replace</label>
            <input
              type="text"
              class="form-input"
              placeholder="Value?"
              v-model="compactorAmount"
            />
          </div>
        </div>
      </div>

      <!--Bridges Accordion-->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'bridges' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('bridges')">
          Bridges
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'bridges' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'bridges'" :style="{ 'min-height': openAccordion === 'bridges' ? '400px' : 'auto' }">
          <!-- Bridges Multi-Select Dropdown -->
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
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Multi-Select Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showBridgesDropdown"
                  class="form-dropdown-menu"
                  style="z-index: 9999;"
                >
                  <div class="py-1">
                    <div
                      @click="toggleBridgeType('Concrete')"
                      class="form-dropdown-item flex items-center justify-between"
                    >
                      <span>Concrete</span>
                      <span v-if="selectedBridgeTypes.includes('Concrete')" class="text-blue-600">✓</span>
                    </div>
                    <div
                      @click="toggleBridgeType('Wood')"
                      class="form-dropdown-item flex items-center justify-between"
                    >
                      <span>Wood</span>
                      <span v-if="selectedBridgeTypes.includes('Wood')" class="text-blue-600">✓</span>
                    </div>
                    <div
                      @click="toggleBridgeType('Granite')"
                      class="form-dropdown-item flex items-center justify-between"
                    >
                      <span>Granite</span>
                      <span v-if="selectedBridgeTypes.includes('Granite')" class="text-blue-600">✓</span>
                    </div>
                    <div
                      @click="toggleBridgeType('Steel')"
                      class="form-dropdown-item flex items-center justify-between"
                    >
                      <span>Steel</span>
                      <span v-if="selectedBridgeTypes.includes('Steel')" class="text-blue-600">✓</span>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Individual Bridge Type Sections -->
          <div v-for="bridgeType in selectedBridgeTypes" :key="bridgeType" class="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 class="font-semibold mb-3 text-gray-800">{{ bridgeType }} Bridge</h4>

            <!-- Quality Condition for this bridge type -->
            <div class="mb-3">
              <label class="form-label mb-3 block">Quality Condition</label>
              <div class="grid grid-cols-3 gap-3 w-full">
                <!-- Excellent Button -->
                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    :name="`${bridgeType.toLowerCase()}-bridge-quality-condition`"
                    value="excellent"
                    class="sr-only peer"
                    v-model="bridgeQualityConditions[bridgeType]"
                  />
                  <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                    <div class="text-2xl mb-1">✅</div>
                    <span class="text-sm font-medium">Excellent</span>
                  </div>
                </label>

                <!-- Fair Button -->
                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    :name="`${bridgeType.toLowerCase()}-bridge-quality-condition`"
                    value="fair"
                    class="sr-only peer"
                    v-model="bridgeQualityConditions[bridgeType]"
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
                    :name="`${bridgeType.toLowerCase()}-bridge-quality-condition`"
                    value="poor"
                    class="sr-only peer"
                    v-model="bridgeQualityConditions[bridgeType]"
                  />
                  <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                    <div class="text-2xl mb-1">❌</div>
                    <span class="text-sm font-medium">Poor</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Repair Status for this bridge type -->
            <div class="mb-3">
              <label class="form-label mb-3 block">Repair Status</label>
              <div class="grid grid-cols-3 gap-2 w-full">
                <!-- First Row -->
                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    :name="`${bridgeType.toLowerCase()}-bridge-repair-status`"
                    value="IR"
                    class="sr-only peer"
                    v-model="bridgeRepairStatuses[bridgeType]"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">IR</span>
                  </div>
                </label>

                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    :name="`${bridgeType.toLowerCase()}-bridge-repair-status`"
                    value="ST"
                    class="sr-only peer"
                    v-model="bridgeRepairStatuses[bridgeType]"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">ST</span>
                  </div>
                </label>

                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    :name="`${bridgeType.toLowerCase()}-bridge-repair-status`"
                    value="RR"
                    class="sr-only peer"
                    v-model="bridgeRepairStatuses[bridgeType]"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">RR</span>
                  </div>
                </label>

                <!-- Second Row -->
                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    :name="`${bridgeType.toLowerCase()}-bridge-repair-status`"
                    value="INV"
                    class="sr-only peer"
                    v-model="bridgeRepairStatuses[bridgeType]"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">INV</span>
                  </div>
                </label>

                <label class="relative cursor-pointer">
                  <input
                    type="radio"
                    :name="`${bridgeType.toLowerCase()}-bridge-repair-status`"
                    value="NA"
                    class="sr-only peer"
                    v-model="bridgeRepairStatuses[bridgeType]"
                  />
                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                    <span class="text-sm font-medium">NA</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Amount to Repair and Replace for this bridge type -->
            <div class="mb-3">
              <label class="form-label">Amount to Repair and Replace</label>
              <input
                type="text"
                class="form-input"
                placeholder="Value?"
                v-model="bridgeAmounts[bridgeType]"
              />
            </div>
          </div>

          <!-- Railings Section -->
          <div class="mt-8 p-4 border-t border-gray-300">
            <h3 class="font-semibold mb-4 text-gray-800">Railings</h3>

            <!-- Railings Yes/No Radio -->
            <div class="mb-4">
              <label class="form-label mb-3 block">Railings Present</label>
              <div class="flex gap-4">
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="railings-present"
                    value="yes"
                    class="mr-2"
                    v-model="bridgeRailingsPresent"
                  />
                  <span class="text-sm">Yes</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="railings-present"
                    value="no"
                    class="mr-2"
                    v-model="bridgeRailingsPresent"
                  />
                  <span class="text-sm">No</span>
                </label>
              </div>
            </div>

            <!-- Railings Details (shown only if Yes is selected) -->
            <div v-if="bridgeRailingsPresent === 'yes'">
              <!-- Railings Multi-Select Dropdown -->
              <div class="mb-4">
                <div class="relative">
                  <label class="form-label">Select All Applicable Railings</label>
                  <button
                    @click="toggleBridgeRailingsDropdown"
                    type="button"
                    class="form-dropdown-button"
                    :class="{ 'form-dropdown-button--active': showBridgeRailingsDropdown }"
                  >
                    <span class="text-gray-700">
                      {{ selectedBridgeRailingTypes.length > 0 ? `${selectedBridgeRailingTypes.length} selected` : 'Select Railing Types' }}
                    </span>
                    <svg
                      class="w-4 h-4 text-gray-400 transition-transform duration-200"
                      :class="{ 'rotate-180': showBridgeRailingsDropdown }"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  <!-- Multi-Select Dropdown Menu -->
                  <Transition name="dropdown">
                    <div
                      v-if="showBridgeRailingsDropdown"
                      class="form-dropdown-menu"
                      style="z-index: 9999;"
                    >
                      <div class="py-1">
                        <div
                          @click="toggleBridgeRailingType('Metal')"
                          class="form-dropdown-item flex items-center justify-between"
                        >
                          <span>Metal</span>
                          <span v-if="selectedBridgeRailingTypes.includes('Metal')" class="text-blue-600">✓</span>
                        </div>
                        <div
                          @click="toggleBridgeRailingType('Wood')"
                          class="form-dropdown-item flex items-center justify-between"
                        >
                          <span>Wood</span>
                          <span v-if="selectedBridgeRailingTypes.includes('Wood')" class="text-blue-600">✓</span>
                        </div>
                        <div
                          @click="toggleBridgeRailingType('Vinyl')"
                          class="form-dropdown-item flex items-center justify-between"
                        >
                          <span>Vinyl</span>
                          <span v-if="selectedBridgeRailingTypes.includes('Vinyl')" class="text-blue-600">✓</span>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>

              <!-- Individual Railing Type Sections -->
              <div v-for="railingType in selectedBridgeRailingTypes" :key="railingType" class="mb-6 p-4 border border-gray-200 rounded-lg bg-blue-50">
                <h4 class="font-semibold mb-3 text-gray-800">{{ railingType }} Railing</h4>

                <!-- Quality Condition for this railing type -->
                <div class="mb-3">
                  <label class="form-label mb-3 block">Quality Condition</label>
                  <div class="grid grid-cols-3 gap-3 w-full">
                    <!-- Excellent Button -->
                    <label class="relative cursor-pointer">
                      <input
                        type="radio"
                        :name="`${railingType.toLowerCase()}-railing-quality-condition`"
                        value="excellent"
                        class="sr-only peer"
                        v-model="bridgeRailingQualityConditions[railingType]"
                      />
                      <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                        <div class="text-2xl mb-1">✅</div>
                        <span class="text-sm font-medium">Excellent</span>
                      </div>
                    </label>

                    <!-- Fair Button -->
                    <label class="relative cursor-pointer">
                      <input
                        type="radio"
                        :name="`${railingType.toLowerCase()}-railing-quality-condition`"
                        value="fair"
                        class="sr-only peer"
                        v-model="bridgeRailingQualityConditions[railingType]"
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
                        :name="`${railingType.toLowerCase()}-railing-quality-condition`"
                        value="poor"
                        class="sr-only peer"
                        v-model="bridgeRailingQualityConditions[railingType]"
                      />
                      <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                        <div class="text-2xl mb-1">❌</div>
                        <span class="text-sm font-medium">Poor</span>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Repair Status for this railing type -->
                <div class="mb-3">
                  <label class="form-label mb-3 block">Repair Status</label>
                  <div class="grid grid-cols-3 gap-2 w-full">
                    <!-- First Row -->
                    <label class="relative cursor-pointer">
                      <input
                        type="radio"
                        :name="`${railingType.toLowerCase()}-railing-repair-status`"
                        value="IR"
                        class="sr-only peer"
                        v-model="bridgeRailingRepairStatuses[railingType]"
                      />
                      <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                        <span class="text-sm font-medium">IR</span>
                      </div>
                    </label>

                    <label class="relative cursor-pointer">
                      <input
                        type="radio"
                        :name="`${railingType.toLowerCase()}-railing-repair-status`"
                        value="ST"
                        class="sr-only peer"
                        v-model="bridgeRailingRepairStatuses[railingType]"
                      />
                      <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                        <span class="text-sm font-medium">ST</span>
                      </div>
                    </label>

                    <label class="relative cursor-pointer">
                      <input
                        type="radio"
                        :name="`${railingType.toLowerCase()}-railing-repair-status`"
                        value="RR"
                        class="sr-only peer"
                        v-model="bridgeRailingRepairStatuses[railingType]"
                      />
                      <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                        <span class="text-sm font-medium">RR</span>
                      </div>
                    </label>

                    <!-- Second Row -->
                    <label class="relative cursor-pointer">
                      <input
                        type="radio"
                        :name="`${railingType.toLowerCase()}-railing-repair-status`"
                        value="INV"
                        class="sr-only peer"
                        v-model="bridgeRailingRepairStatuses[railingType]"
                      />
                      <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                        <span class="text-sm font-medium">INV</span>
                      </div>
                    </label>

                    <label class="relative cursor-pointer">
                      <input
                        type="radio"
                        :name="`${railingType.toLowerCase()}-railing-repair-status`"
                        value="NA"
                        class="sr-only peer"
                        v-model="bridgeRailingRepairStatuses[railingType]"
                      />
                      <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                        <span class="text-sm font-medium">NA</span>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Amount to Repair and Replace for this railing type -->
                <div class="mb-3">
                  <label class="form-label">Amount to Repair and Replace</label>
                  <input
                    type="text"
                    class="form-input"
                    placeholder="Value?"
                    v-model="bridgeRailingAmounts[railingType]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-3 mt-3">
        <label class="form-label">Comments</label>
        <textarea class="form-input" placeholder="Comments"></textarea>
      </div>

    </div>

    <!-- Step 4: Other Structures -->
    <div v-if="currentStep === 4">
      <!--Other Structures step-->

      <!-- Other Structures Header -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Other Structures</h2>
        <p class="text-sm text-gray-600 italic">Complete sections as applicable</p>
      </div>

      <!--Carports Accordion-->
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
                    <div
                      @click="selectCarportsType('CMU')"
                      class="form-dropdown-item"
                    >
                      CMU
                    </div>
                    <div
                      @click="selectCarportsType('Tilt-up')"
                      class="form-dropdown-item"
                    >
                      Tilt-up
                    </div>
                    <div
                      @click="selectCarportsType('Light-gauge Steel')"
                      class="form-dropdown-item"
                    >
                      Light-gauge Steel
                    </div>
                    <div
                      @click="selectCarportsType('Wood')"
                      class="form-dropdown-item"
                    >
                      Wood
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Roof Type -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Roof Type</label>
              <button
                @click="toggleCarportsRoofDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showCarportsRoofDropdown }"
              >
                <span class="text-gray-700">{{ carportsRoofType || 'Select Roof Type' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showCarportsRoofDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showCarportsRoofDropdown"
                  class="form-dropdown-menu"
                >
                  <!-- Search Input -->
                  <div class="p-2 border-b border-gray-200">
                    <input
                      type="text"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search roof types..."
                      v-model="carportsRoofFilter"
                      @click.stop
                    />
                  </div>
                  <!-- Options -->
                  <div class="py-1 max-h-48 overflow-y-auto">
                    <div
                      v-for="option in filteredCarportsRoofOptions"
                      :key="option.value"
                      @click="selectCarportsRoofType(option)"
                      class="form-dropdown-item"
                    >
                      {{ option.label }}
                    </div>
                    <div v-if="filteredCarportsRoofOptions.length === 0" class="px-3 py-2 text-sm text-gray-500">
                      No roof types found
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-3 w-full">
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="carports-quality-condition"
                  value="excellent"
                  class="sr-only peer"
                  v-model="carportsQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Excellent</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="carports-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="carportsQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="carports-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="carportsQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
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
        </div>
      </div>

      <!--Maintenance Bldg Accordion-->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'maintenance-bldg' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('maintenance-bldg')">
          Maintenance Bldg.
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'maintenance-bldg' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'maintenance-bldg'">
          <!-- Maintenance Bldg Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">General Construction</label>
              <button
                @click="toggleMaintenanceBldgDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showMaintenanceBldgDropdown }"
              >
                <span class="text-gray-700">{{ maintenanceBldgType || 'Select General Construction' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showMaintenanceBldgDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showMaintenanceBldgDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectMaintenanceBldgType('CMU')"
                      class="form-dropdown-item"
                    >
                      CMU
                    </div>
                    <div
                      @click="selectMaintenanceBldgType('Tilt-up')"
                      class="form-dropdown-item"
                    >
                      Tilt-up
                    </div>
                    <div
                      @click="selectMaintenanceBldgType('Light-gauge Steel')"
                      class="form-dropdown-item"
                    >
                      Light-gauge Steel
                    </div>
                    <div
                      @click="selectMaintenanceBldgType('Wood')"
                      class="form-dropdown-item"
                    >
                      Wood
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Roof Type -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Roof Type</label>
              <button
                @click="toggleMaintenanceBldgRoofDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showMaintenanceBldgRoofDropdown }"
              >
                <span class="text-gray-700">{{ maintenanceBldgRoofType || 'Select Roof Type' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showMaintenanceBldgRoofDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showMaintenanceBldgRoofDropdown"
                  class="form-dropdown-menu"
                >
                  <!-- Search Input -->
                  <div class="p-2 border-b border-gray-200">
                    <input
                      type="text"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search roof types..."
                      v-model="maintenanceBldgRoofFilter"
                      @click.stop
                    />
                  </div>
                  <!-- Options -->
                  <div class="py-1 max-h-48 overflow-y-auto">
                    <div
                      v-for="option in filteredMaintenanceBldgRoofOptions"
                      :key="option.value"
                      @click="selectMaintenanceBldgRoofType(option)"
                      class="form-dropdown-item"
                    >
                      {{ option.label }}
                    </div>
                    <div v-if="filteredMaintenanceBldgRoofOptions.length === 0" class="px-3 py-2 text-sm text-gray-500">
                      No roof types found
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-3 w-full">
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="maintenance-bldg-quality-condition"
                  value="excellent"
                  class="sr-only peer"
                  v-model="maintenanceBldgQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Excellent</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="maintenance-bldg-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="maintenanceBldgQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="maintenance-bldg-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="maintenanceBldgQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
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
        </div>
      </div>

      <!--Fire Pump Bldg Accordion-->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'fire-pump-bldg' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('fire-pump-bldg')">
          Fire Pump Bldg.
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'fire-pump-bldg' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'fire-pump-bldg'">
          <!-- Fire Pump Bldg Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">General Construction</label>
              <button
                @click="toggleFirePumpBldgDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showFirePumpBldgDropdown }"
              >
                <span class="text-gray-700">{{ firePumpBldgType || 'Select General Construction' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showFirePumpBldgDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showFirePumpBldgDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectFirePumpBldgType('CMU')"
                      class="form-dropdown-item"
                    >
                      CMU
                    </div>
                    <div
                      @click="selectFirePumpBldgType('Tilt-up')"
                      class="form-dropdown-item"
                    >
                      Tilt-up
                    </div>
                    <div
                      @click="selectFirePumpBldgType('Light-gauge Steel')"
                      class="form-dropdown-item"
                    >
                      Light-gauge Steel
                    </div>
                    <div
                      @click="selectFirePumpBldgType('Wood')"
                      class="form-dropdown-item"
                    >
                      Wood
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Roof Type -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Roof Type</label>
              <button
                @click="toggleFirePumpBldgRoofDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showFirePumpBldgRoofDropdown }"
              >
                <span class="text-gray-700">{{ firePumpBldgRoofType || 'Select Roof Type' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showFirePumpBldgRoofDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showFirePumpBldgRoofDropdown"
                  class="form-dropdown-menu"
                >
                  <!-- Search Input -->
                  <div class="p-2 border-b border-gray-200">
                    <input
                      type="text"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search roof types..."
                      v-model="firePumpBldgRoofFilter"
                      @click.stop
                    />
                  </div>
                  <!-- Options -->
                  <div class="py-1 max-h-48 overflow-y-auto">
                    <div
                      v-for="option in filteredFirePumpBldgRoofOptions"
                      :key="option.value"
                      @click="selectFirePumpBldgRoofType(option)"
                      class="form-dropdown-item"
                    >
                      {{ option.label }}
                    </div>
                    <div v-if="filteredFirePumpBldgRoofOptions.length === 0" class="px-3 py-2 text-sm text-gray-500">
                      No roof types found
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-3 w-full">
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="fire-pump-bldg-quality-condition"
                  value="excellent"
                  class="sr-only peer"
                  v-model="firePumpBldgQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Excellent</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="fire-pump-bldg-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="firePumpBldgQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="fire-pump-bldg-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="firePumpBldgQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
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
        </div>
      </div>

      <!--Residential Garages Accordion-->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'residential-garages' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('residential-garages')">
          Residential Garages
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'residential-garages' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'residential-garages'">
          <!-- Residential Garages Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">General Construction</label>
              <button
                @click="toggleResidentialGaragesDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showResidentialGaragesDropdown }"
              >
                <span class="text-gray-700">{{ residentialGaragesType || 'Select General Construction' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showResidentialGaragesDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showResidentialGaragesDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectResidentialGaragesType('CMU')"
                      class="form-dropdown-item"
                    >
                      CMU
                    </div>
                    <div
                      @click="selectResidentialGaragesType('Tilt-up')"
                      class="form-dropdown-item"
                    >
                      Tilt-up
                    </div>
                    <div
                      @click="selectResidentialGaragesType('Light-gauge Steel')"
                      class="form-dropdown-item"
                    >
                      Light-gauge Steel
                    </div>
                    <div
                      @click="selectResidentialGaragesType('Wood')"
                      class="form-dropdown-item"
                    >
                      Wood
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Roof Type -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Roof Type</label>
              <button
                @click="toggleResidentialGaragesRoofDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showResidentialGaragesRoofDropdown }"
              >
                <span class="text-gray-700">{{ residentialGaragesRoofType || 'Select Roof Type' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showResidentialGaragesRoofDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showResidentialGaragesRoofDropdown"
                  class="form-dropdown-menu"
                >
                  <!-- Search Input -->
                  <div class="p-2 border-b border-gray-200">
                    <input
                      type="text"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search roof types..."
                      v-model="residentialGaragesRoofFilter"
                      @click.stop
                    />
                  </div>
                  <!-- Options -->
                  <div class="py-1 max-h-48 overflow-y-auto">
                    <div
                      v-for="option in filteredResidentialGaragesRoofOptions"
                      :key="option.value"
                      @click="selectResidentialGaragesRoofType(option)"
                      class="form-dropdown-item"
                    >
                      {{ option.label }}
                    </div>
                    <div v-if="filteredResidentialGaragesRoofOptions.length === 0" class="px-3 py-2 text-sm text-gray-500">
                      No roof types found
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-3 w-full">
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="residential-garages-quality-condition"
                  value="excellent"
                  class="sr-only peer"
                  v-model="residentialGaragesQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Excellent</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="residential-garages-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="residentialGaragesQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="residential-garages-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="residentialGaragesQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
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
        </div>
      </div>

      <!--Gazebo/Pavilion Accordion-->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'gazebo-pavilion' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('gazebo-pavilion')">
          Gazebo/ Pavilion
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'gazebo-pavilion' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'gazebo-pavilion'">
          <!-- Gazebo/Pavilion Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">General Construction</label>
              <button
                @click="toggleGazeboPavilionDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showGazeboPavilionDropdown }"
              >
                <span class="text-gray-700">{{ gazeboPavilionType || 'Select General Construction' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showGazeboPavilionDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showGazeboPavilionDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectGazeboPavilionType('CMU')"
                      class="form-dropdown-item"
                    >
                      CMU
                    </div>
                    <div
                      @click="selectGazeboPavilionType('Tilt-up')"
                      class="form-dropdown-item"
                    >
                      Tilt-up
                    </div>
                    <div
                      @click="selectGazeboPavilionType('Light-gauge Steel')"
                      class="form-dropdown-item"
                    >
                      Light-gauge Steel
                    </div>
                    <div
                      @click="selectGazeboPavilionType('Wood')"
                      class="form-dropdown-item"
                    >
                      Wood
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Roof Type -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Roof Type</label>
              <button
                @click="toggleGazeboPavilionRoofDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showGazeboPavilionRoofDropdown }"
              >
                <span class="text-gray-700">{{ gazeboPavilionRoofType || 'Select Roof Type' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showGazeboPavilionRoofDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showGazeboPavilionRoofDropdown"
                  class="form-dropdown-menu"
                >
                  <!-- Search Input -->
                  <div class="p-2 border-b border-gray-200">
                    <input
                      type="text"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search roof types..."
                      v-model="gazeboPavilionRoofFilter"
                      @click.stop
                    />
                  </div>
                  <!-- Options -->
                  <div class="py-1 max-h-48 overflow-y-auto">
                    <div
                      v-for="option in filteredGazeboPavilionRoofOptions"
                      :key="option.value"
                      @click="selectGazeboPavilionRoofType(option)"
                      class="form-dropdown-item"
                    >
                      {{ option.label }}
                    </div>
                    <div v-if="filteredGazeboPavilionRoofOptions.length === 0" class="px-3 py-2 text-sm text-gray-500">
                      No roof types found
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-3 w-full">
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="gazebo-pavilion-quality-condition"
                  value="excellent"
                  class="sr-only peer"
                  v-model="gazeboPavilionQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Excellent</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="gazebo-pavilion-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="gazeboPavilionQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="gazebo-pavilion-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="gazeboPavilionQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
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
        </div>
      </div>

      <!--Greenhouse Accordion-->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'greenhouse' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('greenhouse')">
          Greenhouse
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'greenhouse' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'greenhouse'">
          <!-- Greenhouse Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">General Construction</label>
              <button
                @click="toggleGreenhouseDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showGreenhouseDropdown }"
              >
                <span class="text-gray-700">{{ greenhouseType || 'Select General Construction' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showGreenhouseDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showGreenhouseDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectGreenhouseType('CMU')"
                      class="form-dropdown-item"
                    >
                      CMU
                    </div>
                    <div
                      @click="selectGreenhouseType('Tilt-up')"
                      class="form-dropdown-item"
                    >
                      Tilt-up
                    </div>
                    <div
                      @click="selectGreenhouseType('Light-gauge Steel')"
                      class="form-dropdown-item"
                    >
                      Light-gauge Steel
                    </div>
                    <div
                      @click="selectGreenhouseType('Wood')"
                      class="form-dropdown-item"
                    >
                      Wood
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Roof Type -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Roof Type</label>
              <button
                @click="toggleGreenhouseRoofDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showGreenhouseRoofDropdown }"
              >
                <span class="text-gray-700">{{ greenhouseRoofType || 'Select Roof Type' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showGreenhouseRoofDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showGreenhouseRoofDropdown"
                  class="form-dropdown-menu"
                >
                  <!-- Search Input -->
                  <div class="p-2 border-b border-gray-200">
                    <input
                      type="text"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search roof types..."
                      v-model="greenhouseRoofFilter"
                      @click.stop
                    />
                  </div>
                  <!-- Options -->
                  <div class="py-1 max-h-48 overflow-y-auto">
                    <div
                      v-for="option in filteredGreenhouseRoofOptions"
                      :key="option.value"
                      @click="selectGreenhouseRoofType(option)"
                      class="form-dropdown-item"
                    >
                      {{ option.label }}
                    </div>
                    <div v-if="filteredGreenhouseRoofOptions.length === 0" class="px-3 py-2 text-sm text-gray-500">
                      No roof types found
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-3 w-full">
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="greenhouse-quality-condition"
                  value="excellent"
                  class="sr-only peer"
                  v-model="greenhouseQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Excellent</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="greenhouse-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="greenhouseQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="greenhouse-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="greenhouseQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
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
        </div>
      </div>

      <!--Laundry Bldg Accordion-->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'laundry-bldg' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('laundry-bldg')">
          Laundry Bldg.
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'laundry-bldg' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'laundry-bldg'">
          <!-- Laundry Bldg Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">General Construction</label>
              <button
                @click="toggleLaundryBldgDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showLaundryBldgDropdown }"
              >
                <span class="text-gray-700">{{ laundryBldgType || 'Select General Construction' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showLaundryBldgDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showLaundryBldgDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectLaundryBldgType('CMU')"
                      class="form-dropdown-item"
                    >
                      CMU
                    </div>
                    <div
                      @click="selectLaundryBldgType('Tilt-up')"
                      class="form-dropdown-item"
                    >
                      Tilt-up
                    </div>
                    <div
                      @click="selectLaundryBldgType('Light-gauge Steel')"
                      class="form-dropdown-item"
                    >
                      Light-gauge Steel
                    </div>
                    <div
                      @click="selectLaundryBldgType('Wood')"
                      class="form-dropdown-item"
                    >
                      Wood
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Roof Type -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Roof Type</label>
              <button
                @click="toggleLaundryBldgRoofDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showLaundryBldgRoofDropdown }"
              >
                <span class="text-gray-700">{{ laundryBldgRoofType || 'Select Roof Type' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showLaundryBldgRoofDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showLaundryBldgRoofDropdown"
                  class="form-dropdown-menu"
                >
                  <!-- Search Input -->
                  <div class="p-2 border-b border-gray-200">
                    <input
                      type="text"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search roof types..."
                      v-model="laundryBldgRoofFilter"
                      @click.stop
                    />
                  </div>
                  <!-- Options -->
                  <div class="py-1 max-h-48 overflow-y-auto">
                    <div
                      v-for="option in filteredLaundryBldgRoofOptions"
                      :key="option.value"
                      @click="selectLaundryBldgRoofType(option)"
                      class="form-dropdown-item"
                    >
                      {{ option.label }}
                    </div>
                    <div v-if="filteredLaundryBldgRoofOptions.length === 0" class="px-3 py-2 text-sm text-gray-500">
                      No roof types found
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-3 w-full">
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="laundry-bldg-quality-condition"
                  value="excellent"
                  class="sr-only peer"
                  v-model="laundryBldgQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Excellent</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="laundry-bldg-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="laundryBldgQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="laundry-bldg-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="laundryBldgQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
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
        </div>
      </div>

      <!--Well Pump House Accordion-->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'well-pump-house' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('well-pump-house')">
          Well Pump House
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'well-pump-house' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'well-pump-house'">
          <!-- Well Pump House Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">General Construction</label>
              <button
                @click="toggleWellPumpHouseDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showWellPumpHouseDropdown }"
              >
                <span class="text-gray-700">{{ wellPumpHouseType || 'Select General Construction' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showWellPumpHouseDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showWellPumpHouseDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectWellPumpHouseType('CMU')"
                      class="form-dropdown-item"
                    >
                      CMU
                    </div>
                    <div
                      @click="selectWellPumpHouseType('Tilt-up')"
                      class="form-dropdown-item"
                    >
                      Tilt-up
                    </div>
                    <div
                      @click="selectWellPumpHouseType('Light-gauge Steel')"
                      class="form-dropdown-item"
                    >
                      Light-gauge Steel
                    </div>
                    <div
                      @click="selectWellPumpHouseType('Wood')"
                      class="form-dropdown-item"
                    >
                      Wood
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Roof Type -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Roof Type</label>
              <button
                @click="toggleWellPumpHouseRoofDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showWellPumpHouseRoofDropdown }"
              >
                <span class="text-gray-700">{{ wellPumpHouseRoofType || 'Select Roof Type' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showWellPumpHouseRoofDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showWellPumpHouseRoofDropdown"
                  class="form-dropdown-menu"
                >
                  <!-- Search Input -->
                  <div class="p-2 border-b border-gray-200">
                    <input
                      type="text"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search roof types..."
                      v-model="wellPumpHouseRoofFilter"
                      @click.stop
                    />
                  </div>
                  <!-- Options -->
                  <div class="py-1 max-h-48 overflow-y-auto">
                    <div
                      v-for="option in filteredWellPumpHouseRoofOptions"
                      :key="option.value"
                      @click="selectWellPumpHouseRoofType(option)"
                      class="form-dropdown-item"
                    >
                      {{ option.label }}
                    </div>
                    <div v-if="filteredWellPumpHouseRoofOptions.length === 0" class="px-3 py-2 text-sm text-gray-500">
                      No roof types found
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-3 w-full">
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="well-pump-house-quality-condition"
                  value="excellent"
                  class="sr-only peer"
                  v-model="wellPumpHouseQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Excellent</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="well-pump-house-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="wellPumpHouseQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="well-pump-house-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="wellPumpHouseQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
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
        </div>
      </div>

      <!--Sewer Pump House Accordion-->
      <div class="collapse bg-base-100 border border-base-300" :class="{ 'collapse-open': openAccordion === 'sewer-pump-house' }">
        <div class="collapse-title font-semibold cursor-pointer" @click="toggleAccordion('sewer-pump-house')">
          Sewer Pump House
          <svg class="w-4 h-4 float-right mt-1 transition-transform duration-200" :class="{ 'rotate-180': openAccordion === 'sewer-pump-house' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="collapse-content text-sm" v-show="openAccordion === 'sewer-pump-house'">
          <!-- Sewer Pump House Dropdown -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">General Construction</label>
              <button
                @click="toggleSewerPumpHouseDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showSewerPumpHouseDropdown }"
              >
                <span class="text-gray-700">{{ sewerPumpHouseType || 'Select General Construction' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showSewerPumpHouseDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showSewerPumpHouseDropdown"
                  class="form-dropdown-menu"
                >
                  <div class="py-1">
                    <div
                      @click="selectSewerPumpHouseType('CMU')"
                      class="form-dropdown-item"
                    >
                      CMU
                    </div>
                    <div
                      @click="selectSewerPumpHouseType('Tilt-up')"
                      class="form-dropdown-item"
                    >
                      Tilt-up
                    </div>
                    <div
                      @click="selectSewerPumpHouseType('Light-gauge Steel')"
                      class="form-dropdown-item"
                    >
                      Light-gauge Steel
                    </div>
                    <div
                      @click="selectSewerPumpHouseType('Wood')"
                      class="form-dropdown-item"
                    >
                      Wood
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Roof Type -->
          <div class="mb-4">
            <div class="relative">
              <label class="form-label">Roof Type</label>
              <button
                @click="toggleSewerPumpHouseRoofDropdown"
                type="button"
                class="form-dropdown-button"
                :class="{ 'form-dropdown-button--active': showSewerPumpHouseRoofDropdown }"
              >
                <span class="text-gray-700">{{ sewerPumpHouseRoofType || 'Select Roof Type' }}</span>
                <svg
                  class="w-4 h-4 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showSewerPumpHouseRoofDropdown }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <Transition name="dropdown">
                <div
                  v-if="showSewerPumpHouseRoofDropdown"
                  class="form-dropdown-menu"
                >
                  <!-- Search Input -->
                  <div class="p-2 border-b border-gray-200">
                    <input
                      type="text"
                      class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search roof types..."
                      v-model="sewerPumpHouseRoofFilter"
                      @click.stop
                    />
                  </div>
                  <!-- Options -->
                  <div class="py-1 max-h-48 overflow-y-auto">
                    <div
                      v-for="option in filteredSewerPumpHouseRoofOptions"
                      :key="option.value"
                      @click="selectSewerPumpHouseRoofType(option)"
                      class="form-dropdown-item"
                    >
                      {{ option.label }}
                    </div>
                    <div v-if="filteredSewerPumpHouseRoofOptions.length === 0" class="px-3 py-2 text-sm text-gray-500">
                      No roof types found
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <!-- Quality Condition -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Quality Condition</label>
            <div class="grid grid-cols-3 gap-3 w-full">
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="sewer-pump-house-quality-condition"
                  value="excellent"
                  class="sr-only peer"
                  v-model="sewerPumpHouseQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 peer-hover:border-green-300 peer-hover:bg-green-25 min-h-[80px]">
                  <div class="text-2xl mb-1">✅</div>
                  <span class="text-sm font-medium">Excellent</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="sewer-pump-house-quality-condition"
                  value="fair"
                  class="sr-only peer"
                  v-model="sewerPumpHouseQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-yellow-500 peer-checked:bg-yellow-50 peer-checked:text-yellow-700 peer-hover:border-yellow-300 peer-hover:bg-yellow-25 min-h-[80px]">
                  <div class="text-2xl mb-1">⚠️</div>
                  <span class="text-sm font-medium">Fair</span>
                </div>
              </label>
              <label class="relative cursor-pointer">
                <input
                  type="radio"
                  name="sewer-pump-house-quality-condition"
                  value="poor"
                  class="sr-only peer"
                  v-model="sewerPumpHouseQualityCondition"
                />
                <div class="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-hover:border-red-300 peer-hover:bg-red-25 min-h-[80px]">
                  <div class="text-2xl mb-1">❌</div>
                  <span class="text-sm font-medium">Poor</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Repair Status -->
          <div class="mb-3">
            <label class="form-label mb-3 block">Repair Status</label>
            <div class="grid grid-cols-3 gap-2 w-full">
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
        </div>
      </div>

      <!-- Tenant Responsibilities Multi-Select -->
      <div class="mb-6 mt-6">
        <div class="relative">
          <label class="form-label">Which are tenant responsible for:</label>
          <button
            @click="toggleTenantResponsibilitiesDropdown"
            type="button"
            class="form-dropdown-button"
            :class="{ 'form-dropdown-button--active': showTenantResponsibilitiesDropdown }"
          >
            <span class="text-gray-700">{{ tenantResponsibilitiesDisplayText }}</span>
            <svg
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showTenantResponsibilitiesDropdown }"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <Transition name="dropdown">
            <div
              v-if="showTenantResponsibilitiesDropdown"
              class="form-dropdown-menu"
            >
              <!-- Search Input -->
              <div class="px-3 py-2 border-b border-gray-200">
                <input
                  v-model="tenantResponsibilitiesFilter"
                  type="text"
                  placeholder="Search structures..."
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <!-- Options List -->
              <div class="py-1 max-h-64 overflow-y-auto">
                <label
                  v-for="option in filteredTenantResponsibilityOptions"
                  :key="option.value"
                  class="form-dropdown-item flex items-center cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    :value="option.value"
                    v-model="tenantResponsibilities"
                    class="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span class="text-sm text-gray-700">{{ option.label }}</span>
                </label>
                
                <!-- No results message -->
                <div v-if="filteredTenantResponsibilityOptions.length === 0" class="px-4 py-2 text-sm text-gray-500 italic">
                  No structures found matching "{{ tenantResponsibilitiesFilter }}"
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="mb-6">
        <label class="form-label">Comments</label>
        <textarea 
          v-model="otherStructuresComments"
          class="form-input min-h-[100px] resize-y" 
          placeholder="Additional notes or comments about other structures..."
          rows="4"
        ></textarea>
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
const carportsQualityCondition = ref('')
const carportsRepairStatus = ref('')
const carportsAmount = ref('')
const carportsComments = ref('')
const carportsRoofType = ref('')
const carportsRoofFilter = ref('')
const showCarportsDropdown = ref(false)
const showCarportsRoofDropdown = ref(false)

// Maintenance Building data
const maintenanceBldgType = ref('')
const maintenanceBldgCondition = ref('')
const maintenanceBldgQualityCondition = ref('')
const maintenanceBldgRepairStatus = ref('')
const maintenanceBldgAmount = ref('')
const maintenanceBldgComments = ref('')
const maintenanceBldgRoofType = ref('')
const maintenanceBldgRoofFilter = ref('')
const showMaintenanceBldgDropdown = ref(false)
const showMaintenanceBldgRoofDropdown = ref(false)

// Fire Pump Building data
const firePumpBldgType = ref('')
const firePumpBldgCondition = ref('')
const firePumpBldgQualityCondition = ref('')
const firePumpBldgRepairStatus = ref('')
const firePumpBldgAmount = ref('')
const firePumpBldgComments = ref('')
const firePumpBldgRoofType = ref('')
const firePumpBldgRoofFilter = ref('')
const showFirePumpBldgDropdown = ref(false)
const showFirePumpBldgRoofDropdown = ref(false)

// Residential Garages data
const residentialGaragesType = ref('')
const residentialGaragesCondition = ref('')
const residentialGaragesQualityCondition = ref('')
const residentialGaragesRepairStatus = ref('')
const residentialGaragesAmount = ref('')
const residentialGaragesComments = ref('')
const residentialGaragesRoofType = ref('')
const residentialGaragesRoofFilter = ref('')
const showResidentialGaragesDropdown = ref(false)
const showResidentialGaragesRoofDropdown = ref(false)

// Gazebo/Pavilion data
const gazeboPavilionType = ref('')
const gazeboPavilionCondition = ref('')
const gazeboPavilionQualityCondition = ref('')
const gazeboPavilionRepairStatus = ref('')
const gazeboPavilionAmount = ref('')
const gazeboPavilionComments = ref('')
const gazeboPavilionRoofType = ref('')
const gazeboPavilionRoofFilter = ref('')
const showGazeboPavilionDropdown = ref(false)
const showGazeboPavilionRoofDropdown = ref(false)

// Greenhouse data
const greenhouseType = ref('')
const greenhouseCondition = ref('')
const greenhouseQualityCondition = ref('')
const greenhouseRepairStatus = ref('')
const greenhouseAmount = ref('')
const greenhouseComments = ref('')
const greenhouseRoofType = ref('')
const greenhouseRoofFilter = ref('')
const showGreenhouseDropdown = ref(false)
const showGreenhouseRoofDropdown = ref(false)

// Laundry Building data
const laundryBldgType = ref('')
const laundryBldgCondition = ref('')
const laundryBldgQualityCondition = ref('')
const laundryBldgRepairStatus = ref('')
const laundryBldgAmount = ref('')
const laundryBldgComments = ref('')
const laundryBldgRoofType = ref('')
const laundryBldgRoofFilter = ref('')
const showLaundryBldgDropdown = ref(false)
const showLaundryBldgRoofDropdown = ref(false)

// Well Pump House data
const wellPumpHouseType = ref('')
const wellPumpHouseCondition = ref('')
const wellPumpHouseQualityCondition = ref('')
const wellPumpHouseRepairStatus = ref('')
const wellPumpHouseAmount = ref('')
const wellPumpHouseComments = ref('')
const wellPumpHouseRoofType = ref('')
const wellPumpHouseRoofFilter = ref('')
const showWellPumpHouseDropdown = ref(false)
const showWellPumpHouseRoofDropdown = ref(false)

// Sewer Pump House data
const sewerPumpHouseType = ref('')
const sewerPumpHouseCondition = ref('')
const sewerPumpHouseQualityCondition = ref('')
const sewerPumpHouseRepairStatus = ref('')
const sewerPumpHouseAmount = ref('')
const sewerPumpHouseComments = ref('')
const sewerPumpHouseRoofType = ref('')
const sewerPumpHouseRoofFilter = ref('')
const showSewerPumpHouseDropdown = ref(false)
const showSewerPumpHouseRoofDropdown = ref(false)

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

// Roof type options data
const roofTypeOptions = ref([
  { value: 'asp-shingles', label: 'Asp. Shingles' },
  { value: 'built-up', label: 'Built-up' },
  { value: 'conc-tile', label: 'Conc Tile' },
  { value: 'slate', label: 'Slate' },
  { value: 'standing-seam-metal', label: 'Standing Seam Metal' },
  { value: 'corrugated-metal', label: 'Corrugated Metal' },
  { value: 'min-cap-sheet', label: 'Min Cap Sheet' },
  { value: 'modified-bitumin', label: 'Modified Bitumin' },
  { value: 'tpo', label: 'TPO' },
  { value: 'epdm', label: 'EPDM' },
  { value: 'wood-shake', label: 'Wood Shake' },
  { value: 'alum-coating', label: 'Alum Coating' },
  { value: 'ballasted', label: 'Ballasted' }
])

// Tenant Responsibilities data
const tenantResponsibilities = ref([])
const showTenantResponsibilitiesDropdown = ref(false)
const tenantResponsibilitiesFilter = ref('')
const otherStructuresComments = ref('')

// Tenant Responsibilities options
const tenantResponsibilityOptions = ref([
  { value: 'carports', label: 'Carports' },
  { value: 'maintenance-bldg', label: 'Maintenance Bldg.' },
  { value: 'fire-pump-bldg', label: 'Fire Pump Bldg.' },
  { value: 'residential-garages', label: 'Residential Garages' },
  { value: 'gazebo-pavilion', label: 'Gazebo / Pavilion' },
  { value: 'greenhouse', label: 'Greenhouse' },
  { value: 'laundry-bldg', label: 'Laundry Bldg.' },
  { value: 'well-pump-house', label: 'Well Pump house' },
  { value: 'sewer-pump-house', label: 'Sewer pump house' }
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

// Computed properties for filtered roof options
const filteredCarportsRoofOptions = computed(() => {
  if (!carportsRoofFilter.value) return roofTypeOptions.value
  return roofTypeOptions.value.filter(option =>
    option.label.toLowerCase().includes(carportsRoofFilter.value.toLowerCase())
  )
})

const filteredMaintenanceBldgRoofOptions = computed(() => {
  if (!maintenanceBldgRoofFilter.value) return roofTypeOptions.value
  return roofTypeOptions.value.filter(option =>
    option.label.toLowerCase().includes(maintenanceBldgRoofFilter.value.toLowerCase())
  )
})

const filteredFirePumpBldgRoofOptions = computed(() => {
  if (!firePumpBldgRoofFilter.value) return roofTypeOptions.value
  return roofTypeOptions.value.filter(option =>
    option.label.toLowerCase().includes(firePumpBldgRoofFilter.value.toLowerCase())
  )
})

const filteredResidentialGaragesRoofOptions = computed(() => {
  if (!residentialGaragesRoofFilter.value) return roofTypeOptions.value
  return roofTypeOptions.value.filter(option =>
    option.label.toLowerCase().includes(residentialGaragesRoofFilter.value.toLowerCase())
  )
})

const filteredGazeboPavilionRoofOptions = computed(() => {
  if (!gazeboPavilionRoofFilter.value) return roofTypeOptions.value
  return roofTypeOptions.value.filter(option =>
    option.label.toLowerCase().includes(gazeboPavilionRoofFilter.value.toLowerCase())
  )
})

const filteredGreenhouseRoofOptions = computed(() => {
  if (!greenhouseRoofFilter.value) return roofTypeOptions.value
  return roofTypeOptions.value.filter(option =>
    option.label.toLowerCase().includes(greenhouseRoofFilter.value.toLowerCase())
  )
})

const filteredLaundryBldgRoofOptions = computed(() => {
  if (!laundryBldgRoofFilter.value) return roofTypeOptions.value
  return roofTypeOptions.value.filter(option =>
    option.label.toLowerCase().includes(laundryBldgRoofFilter.value.toLowerCase())
  )
})

const filteredWellPumpHouseRoofOptions = computed(() => {
  if (!wellPumpHouseRoofFilter.value) return roofTypeOptions.value
  return roofTypeOptions.value.filter(option =>
    option.label.toLowerCase().includes(wellPumpHouseRoofFilter.value.toLowerCase())
  )
})

const filteredSewerPumpHouseRoofOptions = computed(() => {
  if (!sewerPumpHouseRoofFilter.value) return roofTypeOptions.value
  return roofTypeOptions.value.filter(option =>
    option.label.toLowerCase().includes(sewerPumpHouseRoofFilter.value.toLowerCase())
  )
})

// Tenant Responsibilities computed properties
const filteredTenantResponsibilityOptions = computed(() => {
  if (!tenantResponsibilitiesFilter.value) return tenantResponsibilityOptions.value
  return tenantResponsibilityOptions.value.filter(option =>
    option.label.toLowerCase().includes(tenantResponsibilitiesFilter.value.toLowerCase())
  )
})

const tenantResponsibilitiesDisplayText = computed(() => {
  if (tenantResponsibilities.value.length === 0) {
    return 'Select all that apply'
  }
  
  const selectedLabels = tenantResponsibilities.value.map(value => {
    const option = tenantResponsibilityOptions.value.find(opt => opt.value === value)
    return option ? option.label : value
  })
  
  const fullText = selectedLabels.join(', ')
  
  // Truncate if too long for mobile display
  if (fullText.length > 40) {
    return selectedLabels.length === 1 
      ? selectedLabels[0] 
      : `${selectedLabels[0]} +${selectedLabels.length - 1} more`
  }
  
  return fullText
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

// Roof type dropdown methods
const toggleCarportsRoofDropdown = () => {
  showCarportsRoofDropdown.value = !showCarportsRoofDropdown.value
  if (showCarportsRoofDropdown.value) {
    carportsRoofFilter.value = ''
  }
}

const selectCarportsRoofType = (option) => {
  carportsRoofType.value = option.label
  showCarportsRoofDropdown.value = false
  carportsRoofFilter.value = ''
}

const toggleMaintenanceBldgRoofDropdown = () => {
  showMaintenanceBldgRoofDropdown.value = !showMaintenanceBldgRoofDropdown.value
  if (showMaintenanceBldgRoofDropdown.value) {
    maintenanceBldgRoofFilter.value = ''
  }
}

const selectMaintenanceBldgRoofType = (option) => {
  maintenanceBldgRoofType.value = option.label
  showMaintenanceBldgRoofDropdown.value = false
  maintenanceBldgRoofFilter.value = ''
}

const toggleFirePumpBldgRoofDropdown = () => {
  showFirePumpBldgRoofDropdown.value = !showFirePumpBldgRoofDropdown.value
  if (showFirePumpBldgRoofDropdown.value) {
    firePumpBldgRoofFilter.value = ''
  }
}

const selectFirePumpBldgRoofType = (option) => {
  firePumpBldgRoofType.value = option.label
  showFirePumpBldgRoofDropdown.value = false
  firePumpBldgRoofFilter.value = ''
}

const toggleResidentialGaragesRoofDropdown = () => {
  showResidentialGaragesRoofDropdown.value = !showResidentialGaragesRoofDropdown.value
  if (showResidentialGaragesRoofDropdown.value) {
    residentialGaragesRoofFilter.value = ''
  }
}

const selectResidentialGaragesRoofType = (option) => {
  residentialGaragesRoofType.value = option.label
  showResidentialGaragesRoofDropdown.value = false
  residentialGaragesRoofFilter.value = ''
}

const toggleGazeboPavilionRoofDropdown = () => {
  showGazeboPavilionRoofDropdown.value = !showGazeboPavilionRoofDropdown.value
  if (showGazeboPavilionRoofDropdown.value) {
    gazeboPavilionRoofFilter.value = ''
  }
}

const selectGazeboPavilionRoofType = (option) => {
  gazeboPavilionRoofType.value = option.label
  showGazeboPavilionRoofDropdown.value = false
  gazeboPavilionRoofFilter.value = ''
}

const toggleGreenhouseRoofDropdown = () => {
  showGreenhouseRoofDropdown.value = !showGreenhouseRoofDropdown.value
  if (showGreenhouseRoofDropdown.value) {
    greenhouseRoofFilter.value = ''
  }
}

const selectGreenhouseRoofType = (option) => {
  greenhouseRoofType.value = option.label
  showGreenhouseRoofDropdown.value = false
  greenhouseRoofFilter.value = ''
}

const toggleLaundryBldgRoofDropdown = () => {
  showLaundryBldgRoofDropdown.value = !showLaundryBldgRoofDropdown.value
  if (showLaundryBldgRoofDropdown.value) {
    laundryBldgRoofFilter.value = ''
  }
}

const selectLaundryBldgRoofType = (option) => {
  laundryBldgRoofType.value = option.label
  showLaundryBldgRoofDropdown.value = false
  laundryBldgRoofFilter.value = ''
}

const toggleWellPumpHouseRoofDropdown = () => {
  showWellPumpHouseRoofDropdown.value = !showWellPumpHouseRoofDropdown.value
  if (showWellPumpHouseRoofDropdown.value) {
    wellPumpHouseRoofFilter.value = ''
  }
}

const selectWellPumpHouseRoofType = (option) => {
  wellPumpHouseRoofType.value = option.label
  showWellPumpHouseRoofDropdown.value = false
  wellPumpHouseRoofFilter.value = ''
}

const toggleSewerPumpHouseRoofDropdown = () => {
  showSewerPumpHouseRoofDropdown.value = !showSewerPumpHouseRoofDropdown.value
  if (showSewerPumpHouseRoofDropdown.value) {
    sewerPumpHouseRoofFilter.value = ''
  }
}

const selectSewerPumpHouseRoofType = (option) => {
  sewerPumpHouseRoofType.value = option.label
  showSewerPumpHouseRoofDropdown.value = false
  sewerPumpHouseRoofFilter.value = ''
}

// Tenant Responsibilities methods
const toggleTenantResponsibilitiesDropdown = () => {
  showTenantResponsibilitiesDropdown.value = !showTenantResponsibilitiesDropdown.value
  if (showTenantResponsibilitiesDropdown.value) {
    tenantResponsibilitiesFilter.value = ''
  }
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