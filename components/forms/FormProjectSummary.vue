<template>
  <!-- Step Content Container -->
  <Transition
    name="step-transition"
    mode="out-in"
  >
    <div :key="currentStep" class="space-y-4 pb-4">
      <!-- Step 1: Project Summary -->
      <div v-if="currentStep === 1">
        <div class="space-y-6">
          <div>
            <label class="form-label">Project Name</label>
            <input
              v-model="formData.projectName"
              type="text"
              class="form-input"
              placeholder="Enter project name"
            />
          </div>
          <div>
            <label class="form-label">Project Number</label>
            <input
              v-model="formData.projectNumber"
              type="text"
              class="form-input"
              placeholder="Enter project ID"
            />
          </div>
          <div>
            <label class="form-label">Street Address</label>
            <input
              v-model="formData.address"
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
              v-if="formData.address"
              class="space-y-4"
            >
              <div>
                <label class="form-label">City</label>
                <input
                  v-model="formData.city"
                  type="text"
                  class="form-input"
                  placeholder="Enter city"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <!-- Mobile-friendly State Selector -->
                <CustomDropdown
                  v-model="formData.state"
                  :options="states"
                  label="State"
                  placeholder="Select State"
                />
                <div>
                  <label class="form-label">ZIP Code</label>
                  <input
                    v-model="formData.zipCode"
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
              <label class="form-label">Weather</label>
              <input v-model="formData.weather" type="text" class="form-input" placeholder="Sunny, Cloudy, etc." />
            </div>
            <div class="col-span-1">
              <label class="form-label">Temperature</label>
              <input v-model="formData.temperature" type="text" class="form-input" placeholder="70°F" />
            </div>
          </div>

          <!-- Date and Time Selectors -->
          <DateTimePicker
            v-model:date-value="formData.selectedDate"
            v-model:time-value="formData.selectedTime"
            date-label="Inspection Date"
            time-label="Inspection Time"
          />

          <div>
            <label class="form-label">Inspector Name</label>
            <input v-model="formData.inspectorName" type="text" class="form-input" placeholder="Enter inspector name" />
          </div>
          <div>
            <label class="form-label">Inspector Number</label>
            <input v-model="formData.inspectorNumber" type="text" class="form-input" placeholder="Enter inspector ID" />
          </div>
          <div>
            <label class="form-label">Access Issues</label>
            <input v-model="formData.accessIssues" type="text" class="form-input" placeholder="Any access limitations?" />
          </div>

          <!-- Property Type Selector -->
          <CustomDropdown
            v-model="formData.propertyType"
            :options="propertyTypes"
            label="Surrounding Properties"
            placeholder="Select Property Type"
          />
        </div>
      </div>

      <!-- Step 2: Property Details -->
      <div v-if="currentStep === 2">
        <div class="space-y-6">
          <div>
            <label class="form-label">Acreage</label>
            <input
              v-model="formData.acreage"
              type="text"
              class="form-input"
              placeholder="Enter lot size in acres"
            />
          </div>

          <div>
            <label class="form-label">Units Down</label>
            <input
              v-model="formData.unitsDown"
              type="text"
              class="form-input"
              placeholder="Number of units out of service"
            />
          </div>

          <div>
            <label class="form-label">Year Renovated</label>
            <input
              v-model="formData.yearRenovated"
              type="text"
              class="form-input"
              placeholder="Last major renovation year"
            />
          </div>

          <div>
            <label class="form-label">Number of Buildings</label>
            <input
              v-model="formData.numberOfBuildings"
              type="text"
              class="form-input"
              placeholder="Total building count"
            />
          </div>

          <div>
            <label class="form-label">Net Square Feet</label>
            <input
              v-model="formData.netSqFt"
              type="text"
              class="form-input"
              placeholder="Usable interior space"
            />
          </div>

          <div>
            <label class="form-label">Gross Square Feet</label>
            <input
              v-model="formData.grossSqFt"
              type="text"
              class="form-input"
              placeholder="Total building area"
            />
          </div>

          <div>
            <label class="form-label">Number of Vacant Units</label>
            <input
              v-model="formData.vacantUnits"
              type="text"
              class="form-input"
              placeholder="Currently unoccupied units"
            />
          </div>

          <div>
            <label class="form-label">Year Built</label>
            <input
              v-model="formData.yearBuilt"
              type="text"
              class="form-input"
              placeholder="Original construction year"
            />
          </div>

          <!-- Lease Type Selector -->
          <CustomDropdown
            v-model="formData.leaseType"
            :options="leaseTypes"
            label="Lease Type"
            placeholder="Select Lease Type"
          />

          <div>
            <label class="form-label">Recent Capital Improvements</label>
            <textarea
              v-model="formData.capitalImprovements"
              class="form-input min-h-[100px] resize-none"
              placeholder="Describe recent major improvements or renovations"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Step 3: Documentation & Personnel -->
      <div v-if="currentStep === 3">
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
                  v-for="(doc, index) in formData.documentationList"
                  :key="doc.id"
                  class="scrollable-option-item"
                  :class="{ 'border-b border-gray-200': index < formData.documentationList.length - 1 }"
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
                v-for="(person, index) in formData.personnelList"
                :key="person.id"
                class="modern-dynamic-item"
              >
                <div class="flex items-center justify-between mb-4">
                  <span class="modern-item-number">Person {{ index + 1 }}</span>
                  <button
                    v-if="formData.personnelList.length > 1"
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
                v-for="(tenant, index) in formData.tenantList"
                :key="tenant.id"
                class="modern-dynamic-item"
              >
                <div class="flex items-center justify-between mb-4">
                  <span class="modern-item-number">Tenant {{ index + 1 }}</span>
                  <button
                    v-if="formData.tenantList.length > 1"
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
                  v-for="(material, index) in formData.problematicMaterials"
                  :key="material.id"
                  class="scrollable-option-item"
                  :class="{ 'border-b border-gray-200': index < formData.problematicMaterials.length - 1 }"
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
                    v-model="formData.utilities.domesticWater"
                    type="text"
                    class="form-input"
                    placeholder="City water, well, etc."
                  />
                </div>
                <div>
                  <label class="form-label">Domestic Sewage</label>
                  <input
                    v-model="formData.utilities.domesticSewage"
                    type="text"
                    class="form-input"
                    placeholder="City sewer, septic, etc."
                  />
                </div>
              </div>

              <div>
                <label class="form-label">Storm Water Drainage</label>
                <input
                  v-model="formData.utilities.stormWaterDrainage"
                  type="text"
                  class="form-input"
                  placeholder="Storm drain system details"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Electricity</label>
                  <input
                    v-model="formData.utilities.electricity"
                    type="text"
                    class="form-input"
                    placeholder="Utility provider"
                  />
                </div>
                <div>
                  <label class="form-label">Natural Gas</label>
                  <input
                    v-model="formData.utilities.naturalGas"
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
                    v-model="formData.utilities.heatingOil"
                    type="text"
                    class="form-input"
                    placeholder="Oil heating details"
                  />
                </div>
                <div>
                  <label class="form-label">Propane</label>
                  <input
                    v-model="formData.utilities.propane"
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
                    v-model="formData.utilities.wellSystem"
                    type="text"
                    class="form-input"
                    placeholder="Well details"
                  />
                </div>
                <div>
                  <label class="form-label">Septic System</label>
                  <input
                    v-model="formData.utilities.septicSystem"
                    type="text"
                    class="form-input"
                    placeholder="Septic system details"
                  />
                </div>
              </div>

              <div>
                <label class="form-label">Wastewater Treatment Plant</label>
                <input
                  v-model="formData.utilities.wastewaterTreatmentPlant"
                  type="text"
                  class="form-input"
                  placeholder="Treatment facility details"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import CustomDropdown from '~/components/shared/CustomDropdown.vue'
import DateTimePicker from '~/components/shared/DateTimePicker.vue'

interface Props {
  currentStep: number
  formData: any
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:currentStep': [step: number]
  'update:formData': [data: any]
  'form-completed': []
}>()

// Reactive form data with defaults
const formData = ref({
  // Step 1
  projectName: '',
  projectNumber: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  weather: '',
  temperature: '',
  selectedDate: '',
  selectedTime: '',
  inspectorName: '',
  inspectorNumber: '',
  accessIssues: '',
  propertyType: '',

  // Step 2
  acreage: '',
  unitsDown: '',
  yearRenovated: '',
  numberOfBuildings: '',
  netSqFt: '',
  grossSqFt: '',
  vacantUnits: '',
  yearBuilt: '',
  leaseType: '',
  capitalImprovements: '',

  // Step 3
  documentationList: [
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
  ],
  personnelList: [
    {
      id: 1,
      name: '',
      title: '',
      yearsAtProperty: '',
      phoneNumber: ''
    }
  ],
  tenantList: [
    {
      id: 1,
      name: '',
      address: '',
      accessed: null
    }
  ],

  // Step 4
  problematicMaterials: [
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
  ],
  utilities: {
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
  },

  ...props.formData
})

// Sync with parent
watch(formData, (newData) => {
  emit('update:formData', newData)
}, { deep: true })

// States data
const states = [
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
]

// Property types data
const propertyTypes = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'vacant-land', label: 'Vacant Land' },
  { value: 'wooded-land', label: 'Wooded Land' },
  { value: 'water-feature', label: 'River / Creek / Pond / Ocean' }
]

// Lease types data
const leaseTypes = [
  { value: 'modified-triple-net', label: 'Modified Triple Net' },
  { value: 'true-triple-net', label: 'True Triple Net' },
  { value: 'various', label: 'Various' },
  { value: 'owner-occupied', label: 'Owner Occupied' },
  { value: 'full-service', label: 'Full Service' }
]

// Personnel management methods
const addPersonnel = () => {
  const newId = Math.max(...formData.value.personnelList.map(p => p.id)) + 1
  formData.value.personnelList.push({
    id: newId,
    name: '',
    title: '',
    yearsAtProperty: '',
    phoneNumber: ''
  })
}

const removePersonnel = (id: number) => {
  const index = formData.value.personnelList.findIndex(p => p.id === id)
  if (index > -1) {
    formData.value.personnelList.splice(index, 1)
  }
}

// Tenant management methods
const addTenant = () => {
  const newId = Math.max(...formData.value.tenantList.map(t => t.id)) + 1
  formData.value.tenantList.push({
    id: newId,
    name: '',
    address: '',
    accessed: null
  })
}

const removeTenant = (id: number) => {
  const index = formData.value.tenantList.findIndex(t => t.id === id)
  if (index > -1) {
    formData.value.tenantList.splice(index, 1)
  }
}

// Material comment management
const toggleMaterialComment = (id: number) => {
  const material = formData.value.problematicMaterials.find(m => m.id === id)
  if (material) {
    material.showComment = !material.showComment
  }
}
</script>

<style>
/* Include all the existing styles from the original app.vue for forms */
@import url('../app.css');
</style>