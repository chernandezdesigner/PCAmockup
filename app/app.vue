<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <PhoneMockup>
      <div class="flex flex-col w-full h-full">
        <HeaderBar />
        <Breadcrumbs :current-step="currentStep" :total-steps="totalSteps" />
        
        <!-- Form Container -->
        <form @submit.prevent="handleSubmit" class="flex flex-col flex-1 min-h-0">
          <!-- Scrollable Content Area -->
          <div class="flex-1 mt-8 px-4 space-y-4 overflow-y-auto min-h-0">
            <!-- Step Content Container -->
            <Transition
              name="step-transition"
              mode="out-in"
            >
              <div :key="currentStep" class="space-y-4 pb-4">
                <!-- Step 1: Project Summary -->
                <div v-if="currentStep === 1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Project Summary</h3>
                  
                  <div class="space-y-4">
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

                <!-- Step 2: Property Details -->
                <div v-if="currentStep === 2">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Unit Info</h3>
                  
                  <div class="space-y-4">
                    <input 
                      type="text" 
                      class="form-input" 
                      placeholder="Acreage" 
                    />
                    
                    <input 
                      type="text" 
                      class="form-input" 
                      placeholder="# Down" 
                    />
                    
                    <input 
                      type="text" 
                      class="form-input" 
                      placeholder="Year Renovated" 
                    />
                    
                    <input 
                      type="text" 
                      class="form-input" 
                      placeholder="Number of Buildings" 
                    />

                    <input 
                      type="text" 
                      class="form-input" 
                      placeholder="Net Sq Ft" 
                    />

                    <input 
                      type="text" 
                      class="form-input" 
                      placeholder="Gross Sq Ft" 
                    />

                    <input 
                      type="text" 
                      class="form-input" 
                      placeholder="Number of Vacant Units" 
                    />

                    <input 
                      type="text" 
                      class="form-input" 
                      placeholder="Year Built" 
                    />

                    <!-- Lease Type Selector -->
                    <div class="relative">
                      <button
                        @click="toggleLeaseTypeDropdown"
                        type="button"
                        class="form-dropdown-button"
                        :class="{ 'form-dropdown-button--active': showLeaseTypeDropdown }"
                      >
                        <span class="text-gray-700">{{ leaseType || 'Lease Type' }}</span>
                        <svg 
                          class="w-4 h-4 text-gray-400 transition-transform duration-200"
                          :class="{ 'rotate-180': showLeaseTypeDropdown }"
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
                          v-if="showLeaseTypeDropdown"
                          class="form-dropdown-menu"
                        >
                          <div class="py-1">
                            <button
                              v-for="leaseOption in leaseTypes"
                              :key="leaseOption.value"
                              @click="selectLeaseType(leaseOption.value)"
                              type="button"
                              class="form-dropdown-item"
                              :class="{ 'form-dropdown-item--selected': leaseType === leaseOption.value }"
                            >
                              {{ leaseOption.label }}
                            </button>
                          </div>
                        </div>
                      </Transition>
                    </div>

                    <textarea 
                      class="form-input min-h-[100px] resize-none" 
                      placeholder="Recent Capital Improvements"
                    ></textarea>
                    

                  </div>
                </div>

                <!-- Step 3: Documentation & Personnel -->
                <div v-if="currentStep === 3">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Documentation & Personnel</h3>
                  
                  <div class="space-y-6">
                    <!-- Documentation Section -->
                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 class="text-base font-semibold text-gray-900 mb-2">Documentation</h4>
                      <p class="text-sm text-gray-500 mb-4">Select provided / reviewed documents</p>
                      
                      <div class="space-y-3 max-h-64 overflow-y-auto">
                        <div 
                          v-for="doc in documentationList" 
                          :key="doc.id"
                          class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <span class="text-sm text-gray-700">{{ doc.name }}</span>
                          <div class="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              :id="`doc-${doc.id}`"
                              v-model="doc.value"
                              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span class="text-sm text-gray-600">{{ doc.value ? 'Yes' : 'No' }}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Personnel Interviewed Section -->
                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-4">
                        <h4 class="text-base font-semibold text-gray-900">Personnel Interviewed</h4>
                        <button
                          @click="addPersonnel"
                          type="button"
                          class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      
                      <div class="space-y-4">
                        <div 
                          v-for="(person, index) in personnelList" 
                          :key="person.id"
                          class="space-y-3 p-3 border border-gray-200 rounded-lg"
                        >
                          <div class="flex items-center justify-between">
                            <span class="text-sm font-medium text-gray-600">Person {{ index + 1 }}</span>
                            <button
                              v-if="personnelList.length > 1"
                              @click="removePersonnel(person.id)"
                              type="button"
                              class="text-red-500 hover:text-red-700"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <input 
                            v-model="person.name"
                            type="text" 
                            class="form-input" 
                            placeholder="Interviewee Name" 
                          />
                          <input 
                            v-model="person.title"
                            type="text" 
                            class="form-input" 
                            placeholder="Interviewee Title" 
                          />
                          <input 
                            v-model="person.yearsAtProperty"
                            type="text" 
                            class="form-input" 
                            placeholder="Years at property" 
                          />
                          <input 
                            v-model="person.phoneNumber"
                            type="text" 
                            class="form-input" 
                            placeholder="Phone number" 
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Commercial Tenants Section -->
                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-4">
                        <h4 class="text-base font-semibold text-gray-900">Commercial Tenants</h4>
                        <button
                          @click="addTenant"
                          type="button"
                          class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      
                      <div class="space-y-4">
                        <div 
                          v-for="(tenant, index) in tenantList" 
                          :key="tenant.id"
                          class="space-y-3 p-3 border border-gray-200 rounded-lg"
                        >
                          <div class="flex items-center justify-between">
                            <span class="text-sm font-medium text-gray-600">Tenant {{ index + 1 }}</span>
                            <button
                              v-if="tenantList.length > 1"
                              @click="removeTenant(tenant.id)"
                              type="button"
                              class="text-red-500 hover:text-red-700"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <input 
                            v-model="tenant.name"
                            type="text" 
                            class="form-input" 
                            placeholder="Tenant Name" 
                          />
                          <input 
                            v-model="tenant.address"
                            type="text" 
                            class="form-input" 
                            placeholder="Address/Unit #" 
                          />
                          <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600">Accessed</span>
                            <div class="flex items-center space-x-2">
                              <input 
                                type="checkbox" 
                                :id="`tenant-accessed-${tenant.id}`"
                                v-model="tenant.accessed"
                                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span class="text-sm text-gray-600">{{ tenant.accessed ? 'Yes' : 'No' }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 4: Red Flags and Utilities -->
                <div v-if="currentStep === 4">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Red Flags and Utilities</h3>
                  
                  <div class="space-y-6">
                    <!-- Problematic Materials Section -->
                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 class="text-base font-semibold text-gray-900 mb-2">Problematic materials</h4>
                      <p class="text-sm text-gray-500 mb-4">Select & Comment on red flags</p>
                      
                      <div class="space-y-3 max-h-64 overflow-y-auto">
                        <div 
                          v-for="material in problematicMaterials" 
                          :key="material.id"
                          class="py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-700 flex-1">{{ material.name }}</span>
                            <div class="flex items-center space-x-3">
                              <div class="flex items-center space-x-2">
                                <input 
                                  type="checkbox" 
                                  :id="`material-${material.id}`"
                                  v-model="material.value"
                                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span class="text-sm text-gray-600">{{ material.value ? 'Yes' : 'No' }}</span>
                              </div>
                              <button
                                @click="toggleMaterialComment(material.id)"
                                type="button"
                                class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                :class="{ 'text-blue-600': material.showComment }"
                              >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          <!-- Comment Section -->
                          <Transition name="slide-fade">
                            <div v-if="material.showComment" class="mt-3 pt-3 border-t border-gray-100">
                              <label class="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                              <textarea 
                                v-model="material.comment"
                                class="form-input min-h-[60px] resize-none" 
                                placeholder="Comments"
                                rows="2"
                              ></textarea>
                            </div>
                          </Transition>
                        </div>
                      </div>
                    </div>

                    <!-- Utilities Section -->
                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 class="text-base font-semibold text-gray-900 mb-4">Utilities</h4>
                      
                      <div class="space-y-4">
                        <input 
                          v-model="utilities.domesticWater"
                          type="text" 
                          class="form-input" 
                          placeholder="Domestic Water" 
                        />
                        <input 
                          v-model="utilities.domesticSewage"
                          type="text" 
                          class="form-input" 
                          placeholder="Domestic Sewage" 
                        />
                        <input 
                          v-model="utilities.stormWaterDrainage"
                          type="text" 
                          class="form-input" 
                          placeholder="Storm Water Drainage" 
                        />
                        <input 
                          v-model="utilities.electricity"
                          type="text" 
                          class="form-input" 
                          placeholder="Electricity" 
                        />
                        <input 
                          v-model="utilities.naturalGas"
                          type="text" 
                          class="form-input" 
                          placeholder="Natural Gas" 
                        />
                        <input 
                          v-model="utilities.heatingOil"
                          type="text" 
                          class="form-input" 
                          placeholder="Heating Oil" 
                        />
                        <input 
                          v-model="utilities.propane"
                          type="text" 
                          class="form-input" 
                          placeholder="Propane" 
                        />
                        <input 
                          v-model="utilities.wellSystem"
                          type="text" 
                          class="form-input" 
                          placeholder="Well System" 
                        />
                        <input 
                          v-model="utilities.septicSystem"
                          type="text" 
                          class="form-input" 
                          placeholder="Septic System" 
                        />
                        <input 
                          v-model="utilities.wastewaterTreatmentPlant"
                          type="text" 
                          class="form-input" 
                          placeholder="Wastewater Treatment Plant" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Sticky Navigation Buttons -->
          <div class="sticky bottom-0 px-4 py-4 border-t border-gray-200 bg-white shadow-lg">
            <div class="flex gap-3">
              <button
                v-if="currentStep > 1"
                @click="goToPreviousStep"
                type="button"
                class="form-navigation-button form-navigation-button--secondary"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <button
                @click="goToNextStep"
                type="button"
                class="form-navigation-button form-navigation-button--primary"
                :class="{ 'flex-1': currentStep === 1 }"
              >
                {{ currentStep === totalSteps ? 'Submit' : 'Next' }}
                <svg v-if="currentStep < totalSteps" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </form>
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
const leaseType = ref('');
const showLeaseTypeDropdown = ref(false);

// Step management
const currentStep = ref(1);
const totalSteps = ref(4);

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

// Lease types data
const leaseTypes = ref([
  { value: 'modified-triple-net', label: 'Modified Triple Net' },
  { value: 'true-triple-net', label: 'True Triple Net' },
  { value: 'various', label: 'Various' },
  { value: 'owner-occupied', label: 'Owner Occupied' },
  { value: 'full-service', label: 'Full Service' }
]);

// Documentation list data
const documentationList = ref([
  { id: 1, name: 'ADA Survey', value: null },
  { id: 2, name: 'Certificate of Occupancy', value: null },
  { id: 3, name: 'Occupancy Summary', value: null },
  { id: 4, name: 'ALTA Survey', value: null },
  { id: 5, name: 'Marketing Brochure', value: null },
  { id: 6, name: 'Pending Repair Proposals', value: null },
  { id: 7, name: 'CapEx Plan', value: null },
  { id: 8, name: 'Equipment Inventory', value: null },
  { id: 9, name: 'Previous PCA Reports', value: null },
  { id: 10, name: 'CapEx History', value: null },
  { id: 11, name: 'Fire Department Inspection', value: null },
  { id: 12, name: 'Rent Roll/Tenant List', value: null },
  { id: 13, name: 'Site Plans / Surveys', value: null },
  { id: 14, name: 'Fire Alarm Inspection', value: null },
  { id: 15, name: 'Unit Type and Quantity List', value: null },
  { id: 16, name: 'Building Plans', value: null },
  { id: 17, name: 'Fire Sprinkler Inspection', value: null },
  { id: 18, name: 'Vendor List', value: null },
  { id: 19, name: 'Floor Plans', value: null },
  { id: 20, name: 'Elevator Certificates', value: null },
  { id: 21, name: 'Healthcare Inspection', value: null },
  { id: 22, name: 'Roof Warranty', value: null },
  { id: 23, name: 'Boiler Permits', value: null },
  { id: 24, name: 'Other', value: null },
  { id: 25, name: 'Warranties', value: null }
]);

// Personnel list data
const personnelList = ref([
  {
    id: 1,
    name: '',
    title: '',
    yearsAtProperty: '',
    phoneNumber: ''
  }
]);

// Tenant list data
const tenantList = ref([
  {
    id: 1,
    name: '',
    address: '',
    accessed: null
  }
]);

// Problematic materials data
const problematicMaterials = ref([
  { id: 1, name: 'Fire Retardant Treated (FRT) Plywood', value: false, showComment: false, comment: '' },
  { id: 2, name: 'Composite Wood Siding', value: false, showComment: false, comment: '' },
  { id: 3, name: 'Exterior Insulation and Finish System (EIFS)', value: false, showComment: false, comment: '' },
  { id: 4, name: 'Problematic "Chinese" Drywall', value: false, showComment: false, comment: '' },
  { id: 5, name: 'Less Than 60-AMP Residential Electric Service', value: false, showComment: false, comment: '' },
  { id: 6, name: 'Aluminum Branch Wiring', value: false, showComment: false, comment: '' },
  { id: 7, name: 'Fused Electrical Sub-panels', value: false, showComment: false, comment: '' },
  { id: 8, name: 'Recalled Breaker Panels (Federal Pacific)', value: false, showComment: false, comment: '' },
  { id: 9, name: 'Polybutylene Water Piping', value: false, showComment: false, comment: '' },
  { id: 10, name: 'Galvanized Steel Water Piping', value: false, showComment: false, comment: '' },
  { id: 11, name: 'Lead Piping/Fittings', value: false, showComment: false, comment: '' },
  { id: 12, name: 'ABS Sanitary Sewer Lines', value: false, showComment: false, comment: '' },
  { id: 13, name: 'Recalled Fire Sprinkler Heads (take photos)', value: false, showComment: false, comment: '' },
  { id: 14, name: 'Recalled In-wall Electric Heaters', value: false, showComment: false, comment: '' }
]);

// Utilities data
const utilities = ref({
  domesticWater: '',
  domesticSewage: '',
  stormWaterDrainage: '',
  electricity: '',
  naturalGas: '',
  heatingOil: '',
  propane: '',
  wellSystem: '',
  septicSystem: '',
  wastewaterTreatmentPlant: ''
});

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

const toggleLeaseTypeDropdown = () => {
  showLeaseTypeDropdown.value = !showLeaseTypeDropdown.value;
};

const selectLeaseType = (leaseValue: string) => {
  leaseType.value = leaseValue;
  showLeaseTypeDropdown.value = false;
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

// Personnel management methods
const addPersonnel = () => {
  const newId = Math.max(...personnelList.value.map(p => p.id)) + 1;
  personnelList.value.push({
    id: newId,
    name: '',
    title: '',
    yearsAtProperty: '',
    phoneNumber: ''
  });
};

const removePersonnel = (id: number) => {
  const index = personnelList.value.findIndex(p => p.id === id);
  if (index > -1) {
    personnelList.value.splice(index, 1);
  }
};

// Tenant management methods
const addTenant = () => {
  const newId = Math.max(...tenantList.value.map(t => t.id)) + 1;
  tenantList.value.push({
    id: newId,
    name: '',
    address: '',
    accessed: null
  });
};

const removeTenant = (id: number) => {
  const index = tenantList.value.findIndex(t => t.id === id);
  if (index > -1) {
    tenantList.value.splice(index, 1);
  }
};

// Material comment management
const toggleMaterialComment = (id: number) => {
  const material = problematicMaterials.value.find(m => m.id === id);
  if (material) {
    material.showComment = !material.showComment;
  }
};

// Step navigation methods
const goToNextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++;
  } else {
    // Final step - submit form
    handleSubmit();
  }
};

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const handleSubmit = () => {
  // Handle final form submission
  console.log('Form submitted!');
};

// Close dropdown when clicking outside
const closeDropdownOnOutsideClick = (event: Event) => {
  if (!(event.target as Element).closest('.relative')) {
    showStateDropdown.value = false;
    showPropertyTypeDropdown.value = false;
    showLeaseTypeDropdown.value = false;
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

/* Navigation Button Styles */
.form-navigation-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  min-height: 44px; /* Mobile touch target */
}

.form-navigation-button--primary {
  background-color: #3b82f6;
  color: white;
  border: none;
}

.form-navigation-button--primary:hover {
  background-color: #2563eb;
}

.form-navigation-button--primary:active {
  background-color: #1d4ed8;
}

.form-navigation-button--secondary {
  background-color: white;
  color: #4b5563;
  border: 1px solid #d1d5db;
}

.form-navigation-button--secondary:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.form-navigation-button--secondary:active {
  background-color: #f3f4f6;
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

/* Step transition */
.step-transition-enter-active {
  transition: all 0.4s ease-out;
}

.step-transition-leave-active {
  transition: all 0.3s ease-in;
}

.step-transition-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.step-transition-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>