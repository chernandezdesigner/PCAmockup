<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <PhoneMockup>
      <div class="flex flex-col w-full h-full">
        <HeaderBar />
        <Breadcrumbs :current-step="currentStep" :total-steps="totalSteps" />
        
        <!-- Form Container -->
        <form @submit.prevent="handleSubmit" class="flex flex-col flex-1 min-h-0 bg-gray-50">
          <!-- Scrollable Content Area -->
          <div class="flex-1 px-6 py-6 space-y-8 overflow-y-auto min-h-0">
            <!-- Step Content Container -->
            <Transition
              name="step-transition"
              mode="out-in"
            >
              <div :key="currentStep" class="space-y-4 pb-4">

                <!--Start of Form 1 - Project Summary-->
                <!-- Step 1: Project Summary -->
                <div v-if="currentStep === 1">
                  <div class="mb-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Project Summary</h2>
                    <p class="text-base text-gray-600">Enter basic project information and location details</p>
                  </div>
                  
                  <div class="space-y-6">
                    <div>
                      <label class="form-label">Project Name</label>
                      <input
                        v-model="projectName"
                        type="text"
                        class="form-input"
                        placeholder="Enter project name"
                      />
                    </div>
                    <div>
                      <label class="form-label">Project Number</label>
                      <input
                        v-model="projectNumber"
                        type="text"
                        class="form-input"
                        placeholder="Enter project ID"
                      />
                    </div>
                    <div>
                      <label class="form-label">Street Address</label>
                      <input
                        v-model="address"
                        type="text"
                        class="form-input"
                        placeholder="Enter property address"
                      />
                    </div>
                    
                    <Transition
                      name="slide-fade"
                      mode="out-in"
                    >
                      <div 
                        v-if="address"
                        class="space-y-4"
                      >
                      <div>
                        <label class="form-label">City</label>
                        <input
                          v-model="city"
                          type="text"
                          class="form-input"
                          placeholder="Enter city"
                        />
                      </div>
                      
                      <div class="grid grid-cols-2 gap-4">
                        <!-- Mobile-friendly State Selector -->
                        <div class="relative">
                          <label class="form-label">State</label>
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
                        <div>
                          <label class="form-label">ZIP Code</label>
                          <input
                            v-model="zipCode"
                            type="text"
                            pattern="[0-9]{5}(-[0-9]{4})?"
                            class="form-input"
                            placeholder="12345"
                          />
                        </div>
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
                        <label class="form-label">Inspection Date</label>
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
                        <label class="form-label">Inspection Time</label>
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

                    <input type="text" class="form-input" placeholder="Inspector Name" />
                    <input type="text" class="form-input" placeholder="Inspector Number" />
                    <input type="text" class="form-input" placeholder="Access Issues?" />
                    <!-- Property Type Selector -->
                    <div class="relative">
                      <label class="form-label">Surrounding Properties</label>
                      <button
                        @click="togglePropertyTypeDropdown"
                        type="button"
                        class="form-dropdown-button"
                        :class="{ 'form-dropdown-button--active': showPropertyTypeDropdown }"
                      >
                        <span class="text-gray-700">{{ propertyType || 'Select Property Type' }}</span>
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
                  
                  <div class="space-y-6">
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
                      <label class="form-label">Lease Type</label>
                      <button
                        @click="toggleLeaseTypeDropdown"
                        type="button"
                        class="form-dropdown-button"
                        :class="{ 'form-dropdown-button--active': showLeaseTypeDropdown }"
                      >
                        <span class="text-gray-700">{{ leaseType || 'Select Lease Type' }}</span>
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
                  <div class="mb-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Documentation & Personnel</h2>
                    <p class="text-base text-gray-600">Document review and personnel interviews</p>
                  </div>

                  <div class="space-y-8">
                    <!-- Documentation Section -->
                    <div>
                      <div class="mb-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-2">Documentation</h3>
                        <p class="text-sm text-gray-600">Select provided / reviewed documents</p>
                      </div>
                      
                      <div class="modern-dynamic-item">
                        <div class="scrollable-card-content">
                          <div
                            v-for="(doc, index) in documentationList"
                            :key="doc.id"
                            class="scrollable-option-item"
                            :class="{ 'border-b border-gray-200': index < documentationList.length - 1 }"
                          >
                            <span class="option-label">{{ doc.name }}</span>
                            <div class="option-controls">
                              <label class="modern-checkbox">
                                <input
                                  type="checkbox"
                                  :id="`doc-${doc.id}`"
                                  v-model="doc.value"
                                  class="modern-checkbox-input"
                                />
                                <span class="modern-checkbox-box"></span>
                              </label>
                              <span class="modern-status-badge" :class="{ 'modern-status-badge--active': doc.value }">{{ doc.value ? 'Yes' : 'No' }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Personnel Interviewed Section -->
                    <div>
                      <div class="flex items-center justify-between mb-6">
                        <div>
                          <h3 class="text-lg font-bold text-gray-900 mb-2">Personnel Interviewed</h3>
                          <p class="text-sm text-gray-600">Add people interviewed during inspection</p>
                        </div>
                        <button
                          @click="addPersonnel"
                          type="button"
                          class="modern-add-button"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      
                      <div class="space-y-6">
                        <div
                          v-for="(person, index) in personnelList"
                          :key="person.id"
                          class="modern-dynamic-item"
                        >
                          <div class="flex items-center justify-between mb-4">
                            <span class="modern-item-number">Person {{ index + 1 }}</span>
                            <button
                              v-if="personnelList.length > 1"
                              @click="removePersonnel(person.id)"
                              type="button"
                              class="modern-remove-button"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div class="space-y-4">
                            <div>
                              <label class="form-label">Name</label>
                              <input
                                v-model="person.name"
                                type="text"
                                class="form-input"
                                placeholder="Enter full name"
                              />
                            </div>
                            <div>
                              <label class="form-label">Title</label>
                              <input
                                v-model="person.title"
                                type="text"
                                class="form-input"
                                placeholder="Job title or role"
                              />
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                              <div>
                                <label class="form-label">Years at Property</label>
                                <input
                                  v-model="person.yearsAtProperty"
                                  type="number"
                                  min="0"
                                  class="form-input"
                                  placeholder="0"
                                />
                              </div>
                              <div>
                                <label class="form-label">Phone Number</label>
                                <input
                                  v-model="person.phoneNumber"
                                  type="tel"
                                  class="form-input"
                                  placeholder="(555) 123-4567"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Commercial Tenants Section -->
                    <div>
                      <div class="flex items-center justify-between mb-6">
                        <div>
                          <h3 class="text-lg font-bold text-gray-900 mb-2">Commercial Tenants</h3>
                          <p class="text-sm text-gray-600">Document tenant access and information</p>
                        </div>
                        <button
                          @click="addTenant"
                          type="button"
                          class="modern-add-button"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      
                      <div class="space-y-6">
                        <div
                          v-for="(tenant, index) in tenantList"
                          :key="tenant.id"
                          class="modern-dynamic-item"
                        >
                          <div class="flex items-center justify-between mb-4">
                            <span class="modern-item-number">Tenant {{ index + 1 }}</span>
                            <button
                              v-if="tenantList.length > 1"
                              @click="removeTenant(tenant.id)"
                              type="button"
                              class="modern-remove-button"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <div class="space-y-4">
                            <div>
                              <label class="form-label">Tenant Name</label>
                              <input
                                v-model="tenant.name"
                                type="text"
                                class="form-input"
                                placeholder="Enter tenant business name"
                              />
                            </div>
                            <div>
                              <label class="form-label">Address/Unit Number</label>
                              <input
                                v-model="tenant.address"
                                type="text"
                                class="form-input"
                                placeholder="Unit 101, Suite A, etc."
                              />
                            </div>
                            <div class="modern-toggle-field">
                              <div class="flex-1">
                                <span class="text-sm font-medium text-gray-800">Unit Accessed</span>
                                <p class="text-xs text-gray-600">Was this unit inspected?</p>
                              </div>
                              <div class="flex items-center space-x-3">
                                <label class="modern-checkbox">
                                  <input
                                    type="checkbox"
                                    :id="`tenant-accessed-${tenant.id}`"
                                    v-model="tenant.accessed"
                                    class="modern-checkbox-input"
                                  />
                                  <span class="modern-checkbox-box"></span>
                                </label>
                                <span class="modern-status-badge" :class="{ 'modern-status-badge--active': tenant.accessed }">{{ tenant.accessed ? 'Yes' : 'No' }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 4: Red Flags and Utilities -->
                <div v-if="currentStep === 4">
                  <div class="mb-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Red Flags and Utilities</h2>
                    <p class="text-base text-gray-600">Identify problematic materials and utility information</p>
                  </div>

                  <div class="space-y-8">
                    <!-- Problematic Materials Section -->
                    <div>
                      <div class="mb-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-2">Problematic Materials</h3>
                        <p class="text-sm text-gray-600">Select & comment on identified red flags</p>
                      </div>
                      
                      <div class="modern-dynamic-item">
                        <div class="scrollable-card-content">
                          <div
                            v-for="(material, index) in problematicMaterials"
                            :key="material.id"
                            class="scrollable-option-item"
                            :class="{ 'border-b border-gray-200': index < problematicMaterials.length - 1 }"
                          >
                            <span class="option-label">{{ material.name }}</span>
                            <div class="option-controls">
                              <label class="modern-checkbox">
                                <input
                                  type="checkbox"
                                  :id="`material-${material.id}`"
                                  v-model="material.value"
                                  class="modern-checkbox-input"
                                />
                                <span class="modern-checkbox-box"></span>
                              </label>
                              <span class="modern-status-badge" :class="{ 'modern-status-badge--active': material.value }">{{ material.value ? 'Yes' : 'No' }}</span>
                              <button
                                @click="toggleMaterialComment(material.id)"
                                type="button"
                                class="comment-button"
                                :class="{ 'comment-button--active': material.showComment }"
                              >
                                Comment
                              </button>
                            </div>

                            <!-- Comment Section -->
                            <Transition name="slide-fade">
                              <div v-if="material.showComment" class="problematic-details">
                                <textarea
                                  v-model="material.comment"
                                  class="problematic-textarea"
                                  placeholder="Describe location, condition, and any concerns..."
                                  rows="3"
                                ></textarea>
                              </div>
                            </Transition>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Utilities Section -->
                    <div>
                      <div class="mb-6">
                        <h3 class="text-lg font-bold text-gray-900 mb-2">Utilities</h3>
                        <p class="text-sm text-gray-600">Enter utility provider and system information</p>
                      </div>
                      
                      <div class="space-y-6">
                        <div class="grid grid-cols-2 gap-4">
                          <div>
                            <label class="form-label">Domestic Water</label>
                            <input
                              v-model="utilities.domesticWater"
                              type="text"
                              class="form-input"
                              placeholder="City water, well, etc."
                            />
                          </div>
                          <div>
                            <label class="form-label">Domestic Sewage</label>
                            <input
                              v-model="utilities.domesticSewage"
                              type="text"
                              class="form-input"
                              placeholder="City sewer, septic, etc."
                            />
                          </div>
                        </div>

                        <div>
                          <label class="form-label">Storm Water Drainage</label>
                          <input
                            v-model="utilities.stormWaterDrainage"
                            type="text"
                            class="form-input"
                            placeholder="Storm drain system details"
                          />
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                          <div>
                            <label class="form-label">Electricity</label>
                            <input
                              v-model="utilities.electricity"
                              type="text"
                              class="form-input"
                              placeholder="Utility provider"
                            />
                          </div>
                          <div>
                            <label class="form-label">Natural Gas</label>
                            <input
                              v-model="utilities.naturalGas"
                              type="text"
                              class="form-input"
                              placeholder="Gas provider"
                            />
                          </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                          <div>
                            <label class="form-label">Heating Oil</label>
                            <input
                              v-model="utilities.heatingOil"
                              type="text"
                              class="form-input"
                              placeholder="Oil heating details"
                            />
                          </div>
                          <div>
                            <label class="form-label">Propane</label>
                            <input
                              v-model="utilities.propane"
                              type="text"
                              class="form-input"
                              placeholder="Propane supplier"
                            />
                          </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                          <div>
                            <label class="form-label">Well System</label>
                            <input
                              v-model="utilities.wellSystem"
                              type="text"
                              class="form-input"
                              placeholder="Well details"
                            />
                          </div>
                          <div>
                            <label class="form-label">Septic System</label>
                            <input
                              v-model="utilities.septicSystem"
                              type="text"
                              class="form-input"
                              placeholder="Septic system details"
                            />
                          </div>
                        </div>

                        <div>
                          <label class="form-label">Wastewater Treatment Plant</label>
                          <input
                            v-model="utilities.wastewaterTreatmentPlant"
                            type="text"
                            class="form-input"
                            placeholder="Treatment facility details"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!--End of Form 1 - Project Summary-->


                <!--Start of Form 2 - Site Grounds-->
                <div v-if="currentStep === 5">
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

                <div v-if="currentStep === 6">
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

                <div v-if="currentStep === 7">
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
                              value="R"
                              class="sr-only peer"
                              v-model="recreationalFacilitiesRepairStatus"
                            />
                            <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                              <span class="text-sm font-medium">R</span>
                            </div>
                          </label>

                          <label class="relative cursor-pointer">
                            <input
                              type="radio"
                              name="recreational-facilities-repair-status"
                              value="S"
                              class="sr-only peer"
                              v-model="recreationalFacilitiesRepairStatus"
                            />
                            <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                              <span class="text-sm font-medium">S</span>
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
                              value="R"
                              class="sr-only peer"
                              v-model="compactorRepairStatus"
                            />
                            <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                              <span class="text-sm font-medium">R</span>
                            </div>
                          </label>

                          <label class="relative cursor-pointer">
                            <input
                              type="radio"
                              name="compactor-repair-status"
                              value="S"
                              class="sr-only peer"
                              v-model="compactorRepairStatus"
                            />
                            <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                              <span class="text-sm font-medium">S</span>
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
                                value="R"
                                class="sr-only peer"
                                v-model="bridgeRepairStatuses[bridgeType]"
                              />
                              <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                                <span class="text-sm font-medium">R</span>
                              </div>
                            </label>

                            <label class="relative cursor-pointer">
                              <input
                                type="radio"
                                :name="`${bridgeType.toLowerCase()}-bridge-repair-status`"
                                value="S"
                                class="sr-only peer"
                                v-model="bridgeRepairStatuses[bridgeType]"
                              />
                              <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                                <span class="text-sm font-medium">S</span>
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
                                    value="R"
                                    class="sr-only peer"
                                    v-model="bridgeRailingRepairStatuses[railingType]"
                                  />
                                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                                    <span class="text-sm font-medium">R</span>
                                  </div>
                                </label>

                                <label class="relative cursor-pointer">
                                  <input
                                    type="radio"
                                    :name="`${railingType.toLowerCase()}-railing-repair-status`"
                                    value="S"
                                    class="sr-only peer"
                                    v-model="bridgeRailingRepairStatuses[railingType]"
                                  />
                                  <div class="flex items-center justify-center p-3 rounded-lg border-2 border-gray-200 bg-white text-gray-600 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-hover:border-blue-300 peer-hover:bg-blue-25 min-h-[60px]">
                                    <span class="text-sm font-medium">S</span>
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
              </div>
            </Transition>
          </div>

          <!-- Sticky Navigation Buttons -->
          <div class="sticky bottom-0 px-6 py-6 border-t border-gray-200 bg-white/95 backdrop-blur-sm shadow-2xl">
            <div class="flex gap-4">
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
                <span class="font-semibold">{{ currentStep === totalSteps ? 'Next Section' : 'Continue' }}</span>
                <svg v-if="currentStep < totalSteps" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <svg v-else class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
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
    </PhoneMockup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Transition, onMounted, onUnmounted } from 'vue';
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
const surfaceType = ref<string[]>([]);
const showSurfaceTypeDropdown = ref(false);

// Date picker state
const currentDate = ref(new Date());
const selectedDateObj = ref(new Date());
const dayLabels = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);

// Time picker state
const selectedHour = ref(new Date().getHours() % 12 || 12);
const selectedMinute = ref(0);
const selectedPeriod = ref(new Date().getHours() >= 12 ? 'PM' : 'AM');
const hours = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
const minutes = ref([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);

// Step management
const currentStep = ref(1);
const totalSteps = ref(7);

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
]);

// Storm drainage system options
const stormDrainageOptions = ref([
  { id: 1, name: 'Underground to municipal Storm System', value: null },
  { id: 2, name: 'Concrete Swales', value: null },
  { id: 3, name: 'Surface Drains', value: null },
  { id: 4, name: 'Curb Inlets', value: null },
  { id: 5, name: 'Adjacent Property', value: null },
]);

// Surface types data
const surfaceTypes = ref([
  { value: 'ditch', label: 'Ditch' },
  { value: 'stream', label: 'Stream' },
  { value: 'retention-pond', label: 'Retention Pond' },
  { value: 'detention-pond', label: 'Detention Pond' },
  { value: 'parking-garage-sump', label: 'Parking Garage Sump' },
  { value: 'drywell', label: 'Drywell' }
]);

// Topography slope options data
const topographySlopeOptions = ref([
  { value: 'flat', label: 'Flat' },
  { value: 'gentle-slope', label: 'Gentle Slope' },
  { value: 'moderate-slope', label: 'Moderate Slope' },
  { value: 'significant-slope', label: 'Significant Slope' },
  { value: 'highly-variable', label: 'Highly Variable' },
  { value: 'erosion', label: 'Erosion' }
]);

// Signage options data
const signageOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'monument', label: 'Monument' },
  { value: 'wood-post', label: 'Wood Post' },
  { value: 'pylon', label: 'Pylon' },
  { value: 'building-mounted', label: 'Bldg. Mounted' },
]);

// Landscaping options data
const landscapingOptions = ref([
  { value: 'typical', label: 'Typical' },
  { value: 'grass', label: 'Grass' },
  { value: 'shrubs', label: 'Shrubs' },
  { value: 'flowerbeds', label: 'Flowerbeds' },
  { value: 'drought-tolerant', label: 'Drought tolerant' },
  { value: 'trees', label: 'Trees' },
  { value: 'sprinkler-drip-irrig', label: 'Sprinkler | Drip Irrig.' },
  { value: 'stone-rocks-mulch', label: 'Stone | Rocks | Mulch' }
]);

// Retaining walls options data
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
]);

// Railings options data
const railingsOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'metal', label: 'Metal' },
  { value: 'wood', label: 'Wood' },
  { value: 'vinyl', label: 'Vinyl' },
  { value: 'chain-link', label: 'Chain link' }
]);

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
]);

// Water features options data
const waterFeaturesOptions = ref([
  { value: 'na', label: 'N/A' },
  { value: 'decorative-fountain', label: 'Decorative Fountain' },
  { value: 'artificial-pond', label: 'Artificial Pond' },
  { value: 'creek', label: 'Creek' },
  { value: 'reg-pond', label: 'Reg. Pond' },
  { value: 'lake-ocean-shoreline', label: 'Lake / Ocean Shoreline' }
]);

// Pump location options data
const pumpLocationOptions = ref([
  { value: 'vault', label: 'Vault' },
  { value: 'water', label: 'Water' },
  { value: 'enclosure', label: 'Enclosure' }
]);

// Repair status options data
const repairStatusOptions = ref([
  { value: 'IR', label: 'IR' },
  { value: 'ST', label: 'ST' },
  { value: 'RR', label: 'RR' },
  { value: 'RM', label: 'RM' },
  { value: 'INV', label: 'INV' },
  { value: 'NA', label: 'NA' }
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

// Condition assessment toggle
const conditionAssessment = ref('');

// Topography data
const topographySlope = ref('');
const showTopographySlopeDropdown = ref(false);
const topographyCondition = ref('');

// Signage data
const selectedSignageTypes = ref<string[]>([]);
const showSignageDropdown = ref(false);

// Landscaping data
const landscapingType = ref('');
const showLandscapingDropdown = ref(false);

// Retaining walls data
const retainingWallsType = ref('');
const showRetainingWallsDropdown = ref(false);

// Railings data
const hasRailings = ref('');
const railingsType = ref('');
const railingsQualityCondition = ref('');
const railingsRepairStatus = ref('');
const railingsAmount = ref('');

// Screen walls data
const screenWallsType = ref('');
const showScreenWallsDropdown = ref(false);

// Water features data
const waterFeaturesType = ref('');
const showWaterFeaturesDropdown = ref(false);

// Pump location data
const pumpLocation = ref('');
const showPumpLocationDropdown = ref(false);
const pumpAge = ref('');
const pumpQualityCondition = ref('');
const pumpRepairStatus = ref('');
const pumpAmount = ref('');
// Lot Lighting data
const lotLightingType = ref('');
const showLotLightingDropdown = ref(false);
const lotLightingQualityCondition = ref('');
const lotLightingRepairStatus = ref('');
const lotLightingAmount = ref('');
// Building Lighting data
const buildingLightingType = ref('');
const showBuildingLightingDropdown = ref(false);
const buildingLightingQualityCondition = ref('');
const buildingLightingRepairStatus = ref('');
const buildingLightingAmount = ref('');
// Site Fencing data
const siteFencingType = ref('');
const showSiteFencingDropdown = ref(false);
const siteFencingQualityCondition = ref('');
const siteFencingRepairStatus = ref('');
const siteFencingAmount = ref('');
// Security Gates data
const securityGatesType = ref('');
const showSecurityGatesDropdown = ref(false);
const securityGatesQualityCondition = ref('');
const securityGatesRepairStatus = ref('');
const securityGatesAmount = ref('');

// Dumpster data
const dumpsterAvailable = ref('');
const dumpsterEnclosureType = ref('');
const showDumpsterEnclosureDropdown = ref(false);
const dumpsterEnclosureOther = ref('');
const dumpsterGatesType = ref('');
const showDumpsterGatesDropdown = ref(false);
const dumpsterQualityCondition = ref('');
const dumpsterRepairStatus = ref('');
const dumpsterAmount = ref('');

// Recreational Facilities data
const recreationalFacilitiesType = ref('');
const showRecreationalFacilitiesDropdown = ref(false);
const recreationalFacilitiesOther = ref('');
const recreationalFacilitiesQualityCondition = ref('');
const recreationalFacilitiesRepairStatus = ref('');
const recreationalFacilitiesAmount = ref('');

// Compactor data
const compactorType = ref('');
const showCompactorDropdown = ref(false);
const compactorLocation = ref('');
const compactorQualityCondition = ref('');
const compactorRepairStatus = ref('');
const compactorAmount = ref('');

// Bridges data
const selectedBridgeTypes = ref<string[]>([]);
const showBridgesDropdown = ref(false);
const bridgeQualityConditions = ref<Record<string, string>>({});
const bridgeRepairStatuses = ref<Record<string, string>>({});
const bridgeAmounts = ref<Record<string, string>>({});

// Bridge Railings data
const bridgeRailingsPresent = ref('');
const selectedBridgeRailingTypes = ref<string[]>([]);
const showBridgeRailingsDropdown = ref(false);
const bridgeRailingQualityConditions = ref<Record<string, string>>({});
const bridgeRailingRepairStatuses = ref<Record<string, string>>({});
const bridgeRailingAmounts = ref<Record<string, string>>({});

// Repair status data
const repairStatus = ref('');

// Accordion state management
const openAccordion = ref<string | null>(null);

// Computed properties
const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
});

const calendarDates = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const dates = [];
  const today = new Date();

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    dates.push({
      day: date.getDate(),
      date: date,
      key: date.toISOString(),
      inCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: selectedDateObj.value && date.toDateString() === selectedDateObj.value.toDateString()
    });
  }

  return dates;
});

// Surface type display text with truncation
const surfaceTypeDisplayText = computed(() => {
  if (surfaceType.value.length === 0) {
    return 'Select all applicable';
  }
  
  const selectedLabels = surfaceType.value.map(value => {
    const option = surfaceTypes.value.find(opt => opt.value === value);
    return option ? option.label : value;
  });
  
  const fullText = selectedLabels.join(', ');
  const maxLength = 40; // Adjust this value based on your button width
  
  if (fullText.length <= maxLength) {
    return fullText;
  }
  
  // Find the last complete option that fits
  let truncatedText = '';
  for (let i = 0; i < selectedLabels.length; i++) {
    const testText = i === 0 ? selectedLabels[i] : truncatedText + ', ' + selectedLabels[i];
    if (testText && testText.length + 3 <= maxLength) { // +3 for "..."
      truncatedText = testText;
    } else {
      break;
    }
  }
  
  return truncatedText + '...';
});

// Methods
const toggleStateDropdown = () => {
  showStateDropdown.value = !showStateDropdown.value;
};

const selectState = (stateValue: string) => {
  state.value = stateValue;
  showStateDropdown.value = false;
};

const toggleSurfaceTypeDropdown = () => {
  showSurfaceTypeDropdown.value = !showSurfaceTypeDropdown.value;
};

// Surface type selection is now handled by v-model with checkboxes
// No need for individual selection method

const toggleTopographySlopeDropdown = () => {
  showTopographySlopeDropdown.value = !showTopographySlopeDropdown.value;
};

const selectTopographySlope = (slopeValue: string) => {
  topographySlope.value = slopeValue;
  showTopographySlopeDropdown.value = false;
};

// Signage dropdown methods
const toggleSignageDropdown = () => {
  showSignageDropdown.value = !showSignageDropdown.value;
};

const toggleSignageSelection = (signageValue: string) => {
  const index = selectedSignageTypes.value.indexOf(signageValue);
  if (index > -1) {
    // Remove if already selected
    selectedSignageTypes.value.splice(index, 1);
  } else {
    // Add if not selected
    selectedSignageTypes.value.push(signageValue);
  }
};

const isSignageSelected = (signageValue: string) => {
  return selectedSignageTypes.value.includes(signageValue);
};

const toggleLandscapingDropdown = () => {
  showLandscapingDropdown.value = !showLandscapingDropdown.value;
};

const selectLandscaping = (landscapingValue: string) => {
  landscapingType.value = landscapingValue;
  showLandscapingDropdown.value = false;
};

const toggleRetainingWallsDropdown = () => {
  showRetainingWallsDropdown.value = !showRetainingWallsDropdown.value;
};

const selectRetainingWalls = (retainingWallsValue: string) => {
  retainingWallsType.value = retainingWallsValue;
  showRetainingWallsDropdown.value = false;
};

const toggleRailingsDropdown = () => {
  showBridgeRailingsDropdown.value = !showBridgeRailingsDropdown.value;
};

const selectRailings = (railingsValue: string) => {
  railingsType.value = railingsValue;
  showBridgeRailingsDropdown.value = false;
};

const toggleScreenWallsDropdown = () => {
  showScreenWallsDropdown.value = !showScreenWallsDropdown.value;
};

const selectScreenWalls = (screenWallsValue: string) => {
  screenWallsType.value = screenWallsValue;
  showScreenWallsDropdown.value = false;
};

const toggleWaterFeaturesDropdown = () => {
  showWaterFeaturesDropdown.value = !showWaterFeaturesDropdown.value;
};

const selectWaterFeatures = (waterFeaturesValue: string) => {
  waterFeaturesType.value = waterFeaturesValue;
  showWaterFeaturesDropdown.value = false;
};

const togglePumpLocationDropdown = () => {
  showPumpLocationDropdown.value = !showPumpLocationDropdown.value;
};

const selectPumpLocation = (pumpLocationValue: string) => {
  pumpLocation.value = pumpLocationValue;
  showPumpLocationDropdown.value = false;
};

// New dropdown functions
const toggleLotLightingDropdown = () => {
  showLotLightingDropdown.value = !showLotLightingDropdown.value;
};
const selectLotLightingType = (type: string) => {
  lotLightingType.value = type;
  showLotLightingDropdown.value = false;
};

const toggleBuildingLightingDropdown = () => {
  showBuildingLightingDropdown.value = !showBuildingLightingDropdown.value;
};
const selectBuildingLightingType = (type: string) => {
  buildingLightingType.value = type;
  showBuildingLightingDropdown.value = false;
};

const toggleSiteFencingDropdown = () => {
  showSiteFencingDropdown.value = !showSiteFencingDropdown.value;
};
const selectSiteFencingType = (type: string) => {
  siteFencingType.value = type;
  showSiteFencingDropdown.value = false;
};

const toggleSecurityGatesDropdown = () => {
  showSecurityGatesDropdown.value = !showSecurityGatesDropdown.value;
};
const selectSecurityGatesType = (type: string) => {
  securityGatesType.value = type;
  showSecurityGatesDropdown.value = false;
};

// Dumpster functions
const toggleDumpsterEnclosureDropdown = () => {
  showDumpsterEnclosureDropdown.value = !showDumpsterEnclosureDropdown.value;
};
const selectDumpsterEnclosureType = (type: string) => {
  dumpsterEnclosureType.value = type;
  showDumpsterEnclosureDropdown.value = false;
};
const toggleDumpsterGatesDropdown = () => {
  showDumpsterGatesDropdown.value = !showDumpsterGatesDropdown.value;
};
const selectDumpsterGatesType = (type: string) => {
  dumpsterGatesType.value = type;
  showDumpsterGatesDropdown.value = false;
};

// Recreational Facilities functions
const toggleRecreationalFacilitiesDropdown = () => {
  showRecreationalFacilitiesDropdown.value = !showRecreationalFacilitiesDropdown.value;
};
const selectRecreationalFacilitiesType = (type: string) => {
  recreationalFacilitiesType.value = type;
  showRecreationalFacilitiesDropdown.value = false;
};

// Compactor functions
const toggleCompactorDropdown = () => {
  showCompactorDropdown.value = !showCompactorDropdown.value;
};
const selectCompactorType = (type: string) => {
  compactorType.value = type;
  showCompactorDropdown.value = false;
};

// Bridges functions
const toggleBridgesDropdown = () => {
  showBridgesDropdown.value = !showBridgesDropdown.value;
};
const toggleBridgeType = (bridgeType: string) => {
  const index = selectedBridgeTypes.value.indexOf(bridgeType);
  if (index > -1) {
    // Remove if already selected
    selectedBridgeTypes.value.splice(index, 1);
    // Clean up the associated data
    delete bridgeQualityConditions.value[bridgeType];
    delete bridgeRepairStatuses.value[bridgeType];
    delete bridgeAmounts.value[bridgeType];
  } else {
    // Add if not selected
    selectedBridgeTypes.value.push(bridgeType);
    // Initialize empty data for this bridge type
    bridgeQualityConditions.value[bridgeType] = '';
    bridgeRepairStatuses.value[bridgeType] = '';
    bridgeAmounts.value[bridgeType] = '';
  }
};

// Bridge Railings functions
const toggleBridgeRailingsDropdown = () => {
  showBridgeRailingsDropdown.value = !showBridgeRailingsDropdown.value;
};
const toggleBridgeRailingType = (railingType: string) => {
  const index = selectedBridgeRailingTypes.value.indexOf(railingType);
  if (index > -1) {
    // Remove if already selected
    selectedBridgeRailingTypes.value.splice(index, 1);
    // Clean up the associated data
    delete bridgeRailingQualityConditions.value[railingType];
    delete bridgeRailingRepairStatuses.value[railingType];
    delete bridgeRailingAmounts.value[railingType];
  } else {
    // Add if not selected
    selectedBridgeRailingTypes.value.push(railingType);
    // Initialize empty data for this railing type
    bridgeRailingQualityConditions.value[railingType] = '';
    bridgeRailingRepairStatuses.value[railingType] = '';
    bridgeRailingAmounts.value[railingType] = '';
  }
};

// Accordion toggle function
const toggleAccordion = (accordionId: string) => {
  if (openAccordion.value === accordionId) {
    openAccordion.value = null; // Close if already open
  } else {
    openAccordion.value = accordionId; // Open this one, close others
  }
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

const openTimeDrawer = () => {
  showTimeDrawer.value = true;
};

const closeTimeDrawer = () => {
  showTimeDrawer.value = false;
};

// Date picker methods
const previousMonth = () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() - 1);
  currentDate.value = newDate;
};

const nextMonth = () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + 1);
  currentDate.value = newDate;
};

const selectDate = (dateObj: any) => {
  if (dateObj.inCurrentMonth) {
    selectedDateObj.value = dateObj.date;
    selectedDate.value = dateObj.date.toISOString().split('T')[0];
  }
};

const confirmDate = () => {
  showDateDrawer.value = false;
};

const confirmTime = () => {
  const hour24 = selectedPeriod.value === 'PM' && selectedHour.value !== 12
    ? selectedHour.value + 12
    : selectedPeriod.value === 'AM' && selectedHour.value === 12
    ? 0
    : selectedHour.value;

  const timeString = `${hour24.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')}`;
  selectedTime.value = timeString;
  showTimeDrawer.value = false;
};

// Format display methods
const formatDisplayDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

const formatDisplayTime = (timeString: string) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours || '0');
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${period}`;
};

const formatSelectedTime = () => {
  return `${selectedHour.value.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')} ${selectedPeriod.value}`;
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
/* Form Label Styles */
.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  letter-spacing: 0.025em;
}

/* Form Input Styles */
.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #1f2937;
  background-color: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: all 0.2s ease-in-out;
  appearance: none;
  -webkit-appearance: none;
}

.form-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.form-input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #fefefe;
}

.form-input:hover:not(:focus) {
  border-color: #d1d5db;
}

/* Dropdown Button Styles */
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

.form-dropdown-button--active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #fefefe;
}

/* Dropdown Menu Styles */
.form-dropdown-menu {
  position: absolute;
  z-index: 50;
  width: 100%;
  margin-top: 0.5rem;
  background-color: white;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 16rem;
  overflow-y: auto;
  backdrop-filter: blur(8px);
}

.form-dropdown-item {
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
  transition: all 0.15s ease;
  cursor: pointer;
  border: none;
  background: none;
}

.form-dropdown-item:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

.form-dropdown-item:focus {
  background-color: #e0e7ff;
  color: #3730a3;
  outline: none;
}

.form-dropdown-item--selected {
  background-color: #dbeafe;
  color: #1e40af;
  font-weight: 600;
}

/* Drawer Input Styles */
.form-drawer-input {
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: #1f2937;
  background-color: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: all 0.2s ease-in-out;
}

.form-drawer-input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #fefefe;
}

/* Drawer Button Styles */
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

.form-drawer-button--primary:active {
  transform: translateY(0);
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

/* Navigation Button Styles */
.form-navigation-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  min-height: 56px;
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.form-navigation-button--primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.3);
}

.form-navigation-button--primary:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(59, 130, 246, 0.4);
}

.form-navigation-button--primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px 0 rgba(59, 130, 246, 0.3);
}

.form-navigation-button--secondary {
  background-color: #ffffff;
  color: #4b5563;
  border: 2px solid #e5e7eb;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
}

.form-navigation-button--secondary:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
  color: #374151;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
}

.form-navigation-button--secondary:active {
  transform: translateY(0);
  background-color: #f3f4f6;
}

/* Animation Transitions */
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-fade-leave-active {
  transition: all 0.25s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-16px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-16px);
  opacity: 0;
}

/* Focus and accessibility improvements */
.form-input:focus,
.form-dropdown-button:focus,
.form-navigation-button:focus,
.form-drawer-button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* Mobile-First Scrollable Card Styles */
.modern-dynamic-item {
  padding: 1.25rem;
  background: white;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.scrollable-card-content {
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: hidden;
  margin: -0.25rem -0.5rem;
  padding: 0.25rem 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f8fafc;
  width: 100%;
  box-sizing: border-box;
}

.scrollable-card-content::-webkit-scrollbar {
  width: 4px;
}

.scrollable-card-content::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 2px;
}

.scrollable-card-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.scrollable-option-item {
  display: block;
  padding: 1rem 0.75rem;
  min-height: 60px;
}

.scrollable-option-item:last-child {
  border-bottom: none;
}

.option-label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.option-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.comment-button {
  padding: 0.5rem 0.875rem;
  background-color: #f8fafc;
  color: #475569;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comment-button:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: #eff6ff;
  color: #1e40af;
}

.comment-button:active {
  background-color: #e0e7ff;
  border-color: #2563eb;
}

.comment-button--active {
  background-color: #dbeafe;
  color: #1e40af;
  border-color: #93c5fd;
}

.problematic-details {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
}

.problematic-textarea {
  width: 100%;
  min-height: 80px;
  padding: 0.75rem;
  background-color: #fefefe;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #374151;
  resize: vertical;
}

.problematic-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: white;
}

.problematic-textarea::placeholder {
  color: #9ca3af;
  font-style: italic;
}

/* Mobile-optimized touch targets */
@media (max-width: 768px) {
  .form-navigation-button {
    min-height: 48px;
    padding: 0.875rem 1.25rem;
  }

  .form-dropdown-button {
    min-height: 48px;
  }

  .form-input {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}

/* Dropdown transition */
.dropdown-enter-active {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dropdown-leave-active {
  transition: all 0.2s ease-in;
}

.dropdown-enter-from {
  transform: translateY(-8px) scale(0.95);
  opacity: 0;
}

.dropdown-leave-to {
  transform: translateY(-8px) scale(0.95);
  opacity: 0;
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

/* Step transition */
.step-transition-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.step-transition-leave-active {
  transition: all 0.3s ease-in;
}

.step-transition-enter-from {
  transform: translateX(24px);
  opacity: 0;
}

.step-transition-leave-to {
  transform: translateX(-24px);
  opacity: 0;
}

/* Enhanced visual hierarchy */
.form-label {
  position: relative;
}

/* Improved checkbox styling */
input[type="checkbox"] {
  accent-color: #3b82f6;
  transform: scale(1.1);
}

/* Better visual feedback for interactive elements */
.hover\:border-gray-300:hover {
  border-color: #d1d5db !important;
}

.hover\:border-red-300:hover {
  border-color: #fca5a5 !important;
}

/* Improved section styling */
.bg-gray-50 {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
}

.bg-red-50 {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
}

.bg-blue-50 {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
}

/* Modern Section Styling */
.documentation-section,
.personnel-section,
.tenants-section,
.materials-section,
.utilities-section {
  @apply rounded-2xl p-6 transition-all duration-300 cursor-pointer;
  background: white;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.documentation-section:focus-within,
.documentation-section:hover {
  @apply border-blue-200;
  background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.personnel-section:focus-within,
.personnel-section:hover {
  @apply border-green-200;
  background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.tenants-section:focus-within,
.tenants-section:hover {
  @apply border-purple-200;
  background: linear-gradient(135deg, #faf5ff 0%, #ffffff 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.materials-section:focus-within,
.materials-section:hover {
  @apply border-red-200;
  background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.utilities-section:focus-within,
.utilities-section:hover {
  @apply border-cyan-200;
  background: linear-gradient(135deg, #ecfeff 0%, #ffffff 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Section Headers */
.section-header {
  @apply flex items-center justify-between mb-6;
}

.section-title {
  @apply text-lg font-bold text-gray-900;
}

.section-subtitle {
  @apply text-sm text-gray-600 mt-1;
}

/* Scrollable Lists */
.scrollable-list {
  @apply max-h-80 overflow-y-auto;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.scrollable-list::-webkit-scrollbar {
  width: 6px;
}

.scrollable-list::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded-full;
}

.scrollable-list::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}

.scrollable-list::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400;
}

/* List Items */
.list-item {
  @apply flex items-center justify-between p-4 mb-3 bg-gray-50 rounded-xl border border-gray-200 transition-all duration-200;
}

.list-item:hover {
  @apply bg-white border-gray-300 shadow-sm;
}

.item-label {
  @apply text-sm font-medium text-gray-800 flex-1;
}

.item-controls {
  @apply flex items-center space-x-3;
}

/* Custom Checkbox */
.checkbox-container {
  @apply relative cursor-pointer;
}

.checkbox-input {
  @apply sr-only;
}

.checkbox-custom {
  @apply w-5 h-5 border-2 border-gray-300 rounded bg-white transition-all duration-200 flex items-center justify-center;
}

.checkbox-input:checked + .checkbox-custom {
  @apply bg-blue-600 border-blue-600;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '';
  @apply w-2 h-3 border-white border-r-2 border-b-2 transform rotate-45 translate-y-[-1px];
}

.checkbox-input:focus + .checkbox-custom {
  @apply ring-2 ring-blue-500 ring-opacity-50;
}

/* Status Badges */
.status-badge {
  @apply text-xs font-medium px-2 py-1 rounded-full transition-all duration-200;
  @apply bg-gray-100 text-gray-600;
}

.status-badge--active {
  @apply bg-green-100 text-green-800;
}

/* Dynamic Lists */
.dynamic-list {
  @apply space-y-6;
}

.dynamic-item {
  @apply bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-200;
}

.dynamic-item:hover {
  @apply border-gray-300 shadow-md;
}

.item-header {
  @apply flex items-center justify-between mb-4;
}

.item-number {
  @apply text-base font-semibold text-gray-800;
}

.item-content {
  @apply space-y-4;
}

/* Add/Remove Buttons */
.add-button {
  @apply w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-200;
  @apply hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg;
}

.remove-button {
  @apply w-8 h-8 flex items-center justify-center text-red-500 rounded-full transition-all duration-200;
  @apply hover:text-red-700 hover:bg-red-50 active:scale-95;
}

/* Toggle Fields */
.toggle-field {
  @apply flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200;
}

.toggle-info {
  @apply flex-1;
}

.toggle-label {
  @apply text-sm font-medium text-gray-800;
}

.toggle-description {
  @apply text-xs text-gray-600 mt-1;
}

.toggle-controls {
  @apply flex items-center space-x-3;
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

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Modern Scrollable Lists */
.modern-scrollable-list {
  @apply max-h-96 overflow-y-auto;
  scrollbar-width: thin;
  scrollbar-color: #94a3b8 #f8fafc;
}

.modern-scrollable-list::-webkit-scrollbar {
  width: 8px;
}

.modern-scrollable-list::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded-full mx-1;
}

.modern-scrollable-list::-webkit-scrollbar-thumb {
  @apply bg-gray-400 rounded-full;
  transition: background-color 0.2s ease;
}

.modern-scrollable-list::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500;
}

/* Modern List Items */
.modern-list-item {
  @apply flex items-center justify-between p-5 mb-3 bg-white rounded-2xl border-2 border-gray-100 transition-all duration-200;
  min-height: 64px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}

.modern-list-item:hover {
  @apply border-gray-300 shadow-md transform translate-y-[-1px];
}

.modern-item-label {
  @apply text-sm font-medium text-gray-900 flex-1 leading-relaxed;
}

.modern-item-controls {
  @apply flex items-center space-x-4;
}

/* Mobile-First Checkboxes */
.modern-checkbox {
  position: relative;
  cursor: pointer;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modern-checkbox-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.modern-checkbox-box {
  width: 24px;
  height: 24px;
  border: 2px solid #9ca3af;
  border-radius: 6px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.modern-checkbox-input:checked + .modern-checkbox-box {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.modern-checkbox-input:checked + .modern-checkbox-box::after {
  content: '';
  width: 12px;
  height: 16px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translateY(-1px);
}

.modern-checkbox-input:focus + .modern-checkbox-box {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

/* Mobile-First Status Badges */
.modern-status-badge {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #cbd5e1;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
}

.modern-status-badge--active {
  background-color: #dcfce7;
  color: #166534;
  border-color: #bbf7d0;
}

/* Mobile Dynamic Items - Removed in favor of new scrollable cards */

.modern-item-number {
  font-size: 1rem;
  font-weight: 700;
  color: #111827;
}

/* Mobile Add/Remove Buttons */
.modern-add-button {
  width: 48px;
  height: 48px;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
}

.modern-add-button:focus {
  outline: none;
  background-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.modern-add-button:active {
  background-color: #1d4ed8;
  transform: scale(0.95);
}

.modern-remove-button {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dc2626;
  border-radius: 0.75rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.15s ease;
}

.modern-remove-button:focus {
  outline: none;
  background-color: #fef2f2;
  color: #b91c1c;
}

.modern-remove-button:active {
  background-color: #fee2e2;
  transform: scale(0.95);
}

/* Mobile Toggle Fields */
.modern-toggle-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  background-color: #f8fafc;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
}

/* Mobile-Optimized Form Inputs */
.form-input {
  position: relative;
  background: #ffffff;
  border: 1px solid #d1d5db;
}

.form-input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  background: #fefefe;
}

/* Mobile Touch Target Optimization */
@media (max-width: 768px) {
  .modern-add-button {
    width: 56px;
    height: 56px;
  }

  .modern-remove-button {
    width: 48px;
    height: 48px;
  }

  .modern-checkbox {
    min-height: 48px;
    min-width: 48px;
  }

  .modern-checkbox-box {
    width: 28px;
    height: 28px;
  }

  .modern-checkbox-input:checked + .modern-checkbox-box::after {
    width: 14px;
    height: 18px;
  }

  .modern-status-badge {
    min-height: 36px;
    font-size: 0.875rem;
    padding: 0.5rem 0.875rem;
  }

  .comment-button {
    min-height: 44px;
    padding: 0.625rem 1rem;
  }

  .scrollable-option-item {
    min-height: 64px;
    padding: 1.25rem 0.75rem;
  }

  .option-label {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .option-controls {
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .comment-button {
    flex: 1;
    min-width: 100px;
    max-width: 120px;
  }

  .modern-status-badge {
    min-width: 60px;
  }

  .problematic-textarea {
    min-height: 96px;
    font-size: 1rem;
    padding: 0.875rem;
  }
}

/* Condition Assessment Toggle Styles */
.peer-hover\:bg-green-25:hover {
  background-color: rgba(34, 197, 94, 0.05);
}

.peer-hover\:bg-yellow-25:hover {
  background-color: rgba(234, 179, 8, 0.05);
}

.peer-hover\:bg-red-25:hover {
  background-color: rgba(239, 68, 68, 0.05);
}

.peer-hover\:bg-blue-25:hover {
  background-color: rgba(59, 130, 246, 0.05);
}
</style>