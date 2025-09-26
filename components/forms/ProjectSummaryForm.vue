<template>
  <div class="space-y-4 pb-4">
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


    <!-- Date Drawer -->
    <Transition name="drawer">
      <div v-if="showDateDrawer" class="fixed inset-0 z-50 flex items-end">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="closeDateDrawer"></div>
        
        <!-- Drawer Content -->
        <div class="relative w-full bg-white rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Select Date</h3>
            <button
              @click="closeDateDrawer"
              type="button"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Calendar Content -->
          <div class="p-4">
            <!-- Month Navigation -->
            <div class="flex items-center justify-between mb-4">
              <button
                @click="previousMonth"
                type="button"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <h4 class="text-lg font-semibold text-gray-900">
                {{ currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }}
              </h4>
              
              <button
                @click="nextMonth"
                type="button"
                class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <!-- Day Labels -->
            <div class="grid grid-cols-7 gap-1 mb-2">
              <div
                v-for="day in dayLabels"
                :key="day"
                class="p-2 text-center text-sm font-medium text-gray-500"
              >
                {{ day }}
              </div>
            </div>
            
            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-1">
              <button
                v-for="dateObj in calendarDates"
                :key="`${dateObj.date.getMonth()}-${dateObj.date.getDate()}`"
                @click="selectDate(dateObj)"
                type="button"
                class="p-3 text-sm rounded-lg transition-colors"
                :class="{
                  'text-gray-400': !dateObj.inCurrentMonth,
                  'text-gray-900 hover:bg-gray-100': dateObj.inCurrentMonth && !dateObj.isSelected && !dateObj.isToday,
                  'bg-blue-500 text-white': dateObj.isSelected,
                  'bg-blue-100 text-blue-600 font-semibold': dateObj.isToday && !dateObj.isSelected
                }"
                :disabled="!dateObj.inCurrentMonth"
              >
                {{ dateObj.date.getDate() }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Time Drawer -->
    <Transition name="drawer">
      <div v-if="showTimeDrawer" class="fixed inset-0 z-50 flex items-end">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="closeTimeDrawer"></div>
        
        <!-- Drawer Content -->
        <div class="relative w-full bg-white rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Select Time</h3>
            <button
              @click="closeTimeDrawer"
              type="button"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Time Picker Content -->
          <div class="p-6">
            <div class="flex items-center justify-center space-x-4">
              <!-- Hour Selector -->
              <div class="text-center">
                <label class="block text-sm font-medium text-gray-700 mb-2">Hour</label>
                <select
                  v-model="selectedHour"
                  class="form-input text-center text-lg font-mono w-20"
                >
                  <option v-for="hour in 12" :key="hour" :value="hour">
                    {{ hour.toString().padStart(2, '0') }}
                  </option>
                </select>
              </div>
              
              <div class="text-2xl font-bold text-gray-400 pt-6">:</div>
              
              <!-- Minute Selector -->
              <div class="text-center">
                <label class="block text-sm font-medium text-gray-700 mb-2">Minute</label>
                <select
                  v-model="selectedMinute"
                  class="form-input text-center text-lg font-mono w-20"
                >
                  <option v-for="minute in [0, 15, 30, 45]" :key="minute" :value="minute">
                    {{ minute.toString().padStart(2, '0') }}
                  </option>
                </select>
              </div>
              
              <!-- AM/PM Selector -->
              <div class="text-center">
                <label class="block text-sm font-medium text-gray-700 mb-2">Period</label>
                <select
                  v-model="selectedPeriod"
                  class="form-input text-center text-lg font-mono w-20"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            
            <!-- Confirm Button -->
            <button
              @click="confirmTimeSelection"
              type="button"
              class="w-full mt-6 form-navigation-button form-navigation-button--primary"
            >
              Confirm Time
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, readonly } from 'vue'

// Props
interface Props {
  modelValue?: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({})
})

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: any]
  'form-complete': []
  'next-step': []
  'previous-step': []
  'step-change': [step: number]
}>()

// Form step management
const currentStep = ref(1)
const totalSteps = ref(4)

// Form data
const projectName = ref('')
const projectNumber = ref('')
const address = ref('')
const city = ref('')
const state = ref('')
const zipCode = ref('')
const showStateDropdown = ref(false)
const propertyType = ref('')
const showPropertyTypeDropdown = ref(false)
const selectedDate = ref('')
const showDateDrawer = ref(false)
const selectedTime = ref('')
const showTimeDrawer = ref(false)
const leaseType = ref('')
const showLeaseTypeDropdown = ref(false)

// Date picker state
const currentDate = ref(new Date())
const selectedDateObj = ref(new Date())
const dayLabels = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])

// Time picker state
const selectedHour = ref(new Date().getHours() % 12 || 12)
const selectedMinute = ref(0)
const selectedPeriod = ref(new Date().getHours() >= 12 ? 'PM' : 'AM')

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
  // Add more states as needed
])

// Property types data
const propertyTypes = ref([
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'mixed-use', label: 'Mixed Use' }
])

// Lease types data
const leaseTypes = ref([
  { value: 'modified-triple-net', label: 'Modified Triple Net' },
  { value: 'true-triple-net', label: 'True Triple Net' },
  { value: 'gross', label: 'Gross' },
  { value: 'net', label: 'Net' }
])

// Documentation list
const documentationList = ref([
  { id: 1, name: 'Property Deed', value: false },
  { id: 2, name: 'Previous Inspection Reports', value: false },
  { id: 3, name: 'Building Plans', value: false },
  { id: 4, name: 'Maintenance Records', value: false },
  { id: 5, name: 'Insurance Documents', value: false }
])

// Personnel list
const personnelList = ref([
  {
    id: Date.now(),
    name: '',
    title: '',
    yearsAtProperty: '',
    phoneNumber: ''
  }
])

// Tenant list
const tenantList = ref([
  {
    id: Date.now(),
    name: '',
    address: '',
    accessed: false
  }
])

// Problematic materials
const problematicMaterials = ref([
  { id: 1, name: 'Asbestos', value: false, showComment: false, comment: '' },
  { id: 2, name: 'Lead Paint', value: false, showComment: false, comment: '' },
  { id: 3, name: 'Mold', value: false, showComment: false, comment: '' },
  { id: 4, name: 'Radon', value: false, showComment: false, comment: '' }
])

// Utilities
const utilities = reactive({
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
})

// Calendar computed property
const calendarDates = computed(() => {
  const dates = []
  const firstDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1)
  const lastDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    const today = new Date()
    
    dates.push({
      date,
      inCurrentMonth: date.getMonth() === currentDate.value.getMonth(),
      isToday: date.toDateString() === today.toDateString(),
      isSelected: selectedDateObj.value && date.toDateString() === selectedDateObj.value.toDateString()
    })
  }
  
  return dates
})

// Methods
const toggleStateDropdown = () => {
  showStateDropdown.value = !showStateDropdown.value
}

const selectState = (stateValue: string) => {
  state.value = stateValue
  showStateDropdown.value = false
}

const togglePropertyTypeDropdown = () => {
  showPropertyTypeDropdown.value = !showPropertyTypeDropdown.value
}

const selectPropertyType = (propertyValue: string) => {
  propertyType.value = propertyValue
  showPropertyTypeDropdown.value = false
}

const toggleLeaseTypeDropdown = () => {
  showLeaseTypeDropdown.value = !showLeaseTypeDropdown.value
}

const selectLeaseType = (leaseValue: string) => {
  leaseType.value = leaseValue
  showLeaseTypeDropdown.value = false
}

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
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDate = (dateObj: any) => {
  if (dateObj.inCurrentMonth) {
    selectedDateObj.value = dateObj.date
    selectedDate.value = dateObj.date.toISOString().split('T')[0]
    closeDateDrawer()
  }
}

const confirmTimeSelection = () => {
  const hour24 = selectedPeriod.value === 'AM' 
    ? (selectedHour.value === 12 ? 0 : selectedHour.value)
    : (selectedHour.value === 12 ? 12 : selectedHour.value + 12)
  
  const timeString = `${hour24.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')}`
  selectedTime.value = timeString
  closeTimeDrawer()
}

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
  const hour = parseInt(hours || '0')
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${period}`
}

const addPersonnel = () => {
  personnelList.value.push({
    id: Date.now(),
    name: '',
    title: '',
    yearsAtProperty: '',
    phoneNumber: ''
  })
}

const removePersonnel = (id: number) => {
  const index = personnelList.value.findIndex(person => person.id === id)
  if (index > -1) {
    personnelList.value.splice(index, 1)
  }
}

const addTenant = () => {
  tenantList.value.push({
    id: Date.now(),
    name: '',
    address: '',
    accessed: false
  })
}

const removeTenant = (id: number) => {
  const index = tenantList.value.findIndex(tenant => tenant.id === id)
  if (index > -1) {
    tenantList.value.splice(index, 1)
  }
}

const toggleMaterialComment = (id: number) => {
  const material = problematicMaterials.value.find(m => m.id === id)
  if (material) {
    material.showComment = !material.showComment
  }
}

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    emit('step-change', currentStep.value)
  }
  emit('previous-step')
}

const goToNextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++
    emit('step-change', currentStep.value)
    emit('next-step')
  } else {
    // Form is complete
    emit('form-complete')
  }
}

const handleNextStep = () => {
  goToNextStep()
}

// Expose methods and state for parent component
defineExpose({
  currentStep: readonly(currentStep),
  totalSteps: readonly(totalSteps),
  goToNextStep,
  goToPreviousStep,
  canGoNext: computed(() => currentStep.value < totalSteps.value),
  canGoPrevious: computed(() => currentStep.value > 1),
  isComplete: computed(() => currentStep.value === totalSteps.value)
})
</script>
