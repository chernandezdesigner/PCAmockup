<template>
  <FormLayout
    title="Maintenance Records"
    description="Service history, warranties, and documentation review"
    form-key="maintenance-records"
    :current-step="currentStep"
    :total-steps="totalSteps"
    @go-back="goToPreviousStep"
    @go-next="goToNextStep"
  >
    <Transition name="step-transition" mode="out-in">
      <div :key="currentStep" class="space-y-4 pb-4">

        <!-- Step 1: Maintenance History -->
        <div v-if="currentStep === 1">
          <div class="space-y-6">
            <div>
              <label class="form-label">Overall Maintenance Level</label>
              <CustomDropdown
                v-model="formData.overallMaintenanceLevel"
                :options="maintenanceLevelOptions"
                placeholder="Select Overall Maintenance Level"
              />
            </div>

            <div>
              <label class="form-label">Maintenance Records Available</label>
              <CustomDropdown
                v-model="formData.maintenanceRecordsAvailable"
                :options="recordsAvailabilityOptions"
                placeholder="Maintenance records availability"
              />
            </div>

            <div>
              <label class="form-label">Preventive Maintenance Program</label>
              <CustomDropdown
                v-model="formData.preventiveMaintenanceProgram"
                :options="yesNoOptions"
                placeholder="Formal preventive maintenance program?"
              />
            </div>

            <div>
              <label class="form-label">Recent Major Repairs</label>
              <div class="space-y-4">
                <div
                  v-for="(repair, index) in formData.majorRepairs"
                  :key="repair.id"
                  class="modern-dynamic-item"
                >
                  <div class="flex items-center justify-between mb-4">
                    <span class="modern-item-number">Repair {{ index + 1 }}</span>
                    <button
                      v-if="formData.majorRepairs.length > 1"
                      @click="removeMajorRepair(repair.id)"
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
                      <label class="form-label">System/Component</label>
                      <input
                        v-model="repair.system"
                        type="text"
                        class="form-input"
                        placeholder="e.g., HVAC, Roof, Electrical"
                      />
                    </div>
                    <div>
                      <label class="form-label">Repair Description</label>
                      <input
                        v-model="repair.description"
                        type="text"
                        class="form-input"
                        placeholder="Brief description of repair"
                      />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="form-label">Date Completed</label>
                        <input
                          v-model="repair.dateCompleted"
                          type="date"
                          class="form-input"
                        />
                      </div>
                      <div>
                        <label class="form-label">Cost</label>
                        <input
                          v-model="repair.cost"
                          type="number"
                          class="form-input"
                          placeholder="$0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  @click="addMajorRepair"
                  type="button"
                  class="modern-add-button w-full"
                >
                  Add Major Repair
                </button>
              </div>
            </div>

            <div>
              <label class="form-label">Maintenance History Notes</label>
              <textarea
                v-model="formData.maintenanceHistoryNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional maintenance history observations"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 2: Warranties & Guarantees -->
        <div v-if="currentStep === 2">
          <div class="space-y-6">
            <div>
              <label class="form-label">Active Warranties</label>
              <div class="modern-dynamic-item">
                <div class="scrollable-card-content">
                  <div
                    v-for="(warranty, index) in formData.warranties"
                    :key="warranty.id"
                    class="scrollable-option-item"
                    :class="{ 'border-b border-gray-200': index < formData.warranties.length - 1 }"
                  >
                    <span class="option-label">{{ warranty.name }}</span>
                    <div class="option-controls">
                      <label class="modern-checkbox">
                        <input
                          type="checkbox"
                          :id="`warranty-${warranty.id}`"
                          v-model="warranty.active"
                          class="modern-checkbox-input"
                        />
                        <span class="modern-checkbox-box"></span>
                      </label>
                      <span class="modern-status-badge" :class="{ 'modern-status-badge--active': warranty.active }">
                        {{ warranty.active ? 'Active' : 'Expired/None' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label class="form-label">Warranty Documentation</label>
              <CustomDropdown
                v-model="formData.warrantyDocumentation"
                :options="documentationQualityOptions"
                placeholder="Quality of warranty documentation"
              />
            </div>

            <div>
              <label class="form-label">Extended Service Contracts</label>
              <CustomDropdown
                v-model="formData.extendedServiceContracts"
                :options="yesNoOptions"
                placeholder="Extended service contracts in place?"
              />
            </div>

            <div>
              <label class="form-label">Warranty Transfer Status</label>
              <CustomDropdown
                v-model="formData.warrantyTransferStatus"
                :options="transferStatusOptions"
                placeholder="Can warranties be transferred?"
              />
            </div>

            <div>
              <label class="form-label">Warranty Notes</label>
              <textarea
                v-model="formData.warrantyNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional warranty and guarantee information"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 3: Service Contracts -->
        <div v-if="currentStep === 3">
          <div class="space-y-6">
            <div>
              <label class="form-label">Active Service Contracts</label>
              <div class="space-y-4">
                <div
                  v-for="(contract, index) in formData.serviceContracts"
                  :key="contract.id"
                  class="modern-dynamic-item"
                >
                  <div class="flex items-center justify-between mb-4">
                    <span class="modern-item-number">Contract {{ index + 1 }}</span>
                    <button
                      v-if="formData.serviceContracts.length > 1"
                      @click="removeServiceContract(contract.id)"
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
                      <label class="form-label">Service Provider</label>
                      <input
                        v-model="contract.provider"
                        type="text"
                        class="form-input"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label class="form-label">Service Type</label>
                      <CustomDropdown
                        v-model="contract.serviceType"
                        :options="serviceTypeOptions"
                        placeholder="Select service type"
                      />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="form-label">Contract Start</label>
                        <input
                          v-model="contract.startDate"
                          type="date"
                          class="form-input"
                        />
                      </div>
                      <div>
                        <label class="form-label">Contract End</label>
                        <input
                          v-model="contract.endDate"
                          type="date"
                          class="form-input"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="form-label">Monthly Cost</label>
                      <input
                        v-model="contract.monthlyCost"
                        type="number"
                        class="form-input"
                        placeholder="$0"
                      />
                    </div>
                  </div>
                </div>
                <button
                  @click="addServiceContract"
                  type="button"
                  class="modern-add-button w-full"
                >
                  Add Service Contract
                </button>
              </div>
            </div>

            <div>
              <label class="form-label">Service Contract Transfer</label>
              <CustomDropdown
                v-model="formData.serviceContractTransfer"
                :options="transferStatusOptions"
                placeholder="Can service contracts be transferred?"
              />
            </div>

            <div>
              <label class="form-label">Service Contract Notes</label>
              <textarea
                v-model="formData.serviceContractNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional service contract information"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 4: Future Recommendations -->
        <div v-if="currentStep === 4">
          <div class="space-y-6">
            <div>
              <label class="form-label">Recommended Maintenance Actions</label>
              <div class="modern-dynamic-item">
                <div class="scrollable-card-content">
                  <div
                    v-for="(action, index) in formData.recommendedActions"
                    :key="action.id"
                    class="scrollable-option-item"
                    :class="{ 'border-b border-gray-200': index < formData.recommendedActions.length - 1 }"
                  >
                    <span class="option-label">{{ action.name }}</span>
                    <div class="option-controls">
                      <label class="modern-checkbox">
                        <input
                          type="checkbox"
                          :id="`action-${action.id}`"
                          v-model="action.recommended"
                          class="modern-checkbox-input"
                        />
                        <span class="modern-checkbox-box"></span>
                      </label>
                      <span class="modern-status-badge" :class="{ 'modern-status-badge--active': action.recommended }">
                        {{ action.recommended ? 'Yes' : 'No' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label class="form-label">Priority Maintenance Items</label>
              <CustomDropdown
                v-model="formData.priorityMaintenanceItems"
                :options="priorityLevelOptions"
                placeholder="Overall priority level for maintenance"
              />
            </div>

            <div>
              <label class="form-label">Estimated Annual Maintenance Cost</label>
              <input
                v-model="formData.estimatedAnnualMaintenanceCost"
                type="number"
                class="form-input"
                placeholder="$0"
              />
            </div>

            <div>
              <label class="form-label">Maintenance Budget Recommendations</label>
              <textarea
                v-model="formData.maintenanceBudgetRecommendations"
                class="form-input min-h-[100px] resize-none"
                placeholder="Budgeting recommendations for future maintenance"
              ></textarea>
            </div>

            <div>
              <label class="form-label">Overall Maintenance Summary</label>
              <textarea
                v-model="formData.overallMaintenanceSummary"
                class="form-input min-h-[100px] resize-none"
                placeholder="Summary of maintenance findings and recommendations"
              ></textarea>
            </div>
          </div>
        </div>

      </div>
    </Transition>
  </FormLayout>
</template>

<script setup lang="ts">
import FormLayout from '~/components/layouts/FormLayout.vue'
import CustomDropdown from '~/components/shared/CustomDropdown.vue'

const { saveFormData, getFormData, markFormCompleted } = useFormState()

const currentStep = ref(1)
const totalSteps = ref(4)
const formData = ref({
  // Maintenance History
  overallMaintenanceLevel: '',
  maintenanceRecordsAvailable: '',
  preventiveMaintenanceProgram: '',
  majorRepairs: [
    {
      id: 1,
      system: '',
      description: '',
      dateCompleted: '',
      cost: ''
    }
  ],
  maintenanceHistoryNotes: '',

  // Warranties
  warranties: [
    { id: 1, name: 'Roof Warranty', active: false },
    { id: 2, name: 'HVAC Equipment Warranty', active: false },
    { id: 3, name: 'Appliance Warranties', active: false },
    { id: 4, name: 'Flooring Warranty', active: false },
    { id: 5, name: 'Window Warranty', active: false },
    { id: 6, name: 'Siding/Exterior Warranty', active: false },
    { id: 7, name: 'Electrical Work Warranty', active: false },
    { id: 8, name: 'Plumbing Work Warranty', active: false }
  ],
  warrantyDocumentation: '',
  extendedServiceContracts: '',
  warrantyTransferStatus: '',
  warrantyNotes: '',

  // Service Contracts
  serviceContracts: [
    {
      id: 1,
      provider: '',
      serviceType: '',
      startDate: '',
      endDate: '',
      monthlyCost: ''
    }
  ],
  serviceContractTransfer: '',
  serviceContractNotes: '',

  // Future Recommendations
  recommendedActions: [
    { id: 1, name: 'Establish Preventive Maintenance Program', recommended: false },
    { id: 2, name: 'Create Maintenance Schedule', recommended: false },
    { id: 3, name: 'Document All Equipment Serial Numbers', recommended: false },
    { id: 4, name: 'Organize Warranty Documentation', recommended: false },
    { id: 5, name: 'Implement Regular HVAC Maintenance', recommended: false },
    { id: 6, name: 'Schedule Annual Roof Inspection', recommended: false },
    { id: 7, name: 'Establish Vendor Relationships', recommended: false },
    { id: 8, name: 'Create Maintenance Budget', recommended: false },
    { id: 9, name: 'Train Staff on Equipment Operation', recommended: false },
    { id: 10, name: 'Implement Emergency Response Procedures', recommended: false }
  ],
  priorityMaintenanceItems: '',
  estimatedAnnualMaintenanceCost: '',
  maintenanceBudgetRecommendations: '',
  overallMaintenanceSummary: '',

  ...getFormData('maintenance-records')
})

// Dropdown options
const maintenanceLevelOptions = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
  { value: 'deferred', label: 'Deferred Maintenance' }
]

const recordsAvailabilityOptions = [
  { value: 'comprehensive', label: 'Comprehensive Records' },
  { value: 'partial', label: 'Partial Records' },
  { value: 'minimal', label: 'Minimal Records' },
  { value: 'none', label: 'No Records Available' }
]

const yesNoOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'partial', label: 'Partial' },
  { value: 'unknown', label: 'Unknown' }
]

const documentationQualityOptions = [
  { value: 'excellent', label: 'Excellent Documentation' },
  { value: 'good', label: 'Good Documentation' },
  { value: 'fair', label: 'Fair Documentation' },
  { value: 'poor', label: 'Poor Documentation' },
  { value: 'none', label: 'No Documentation' }
]

const transferStatusOptions = [
  { value: 'transferable', label: 'Fully Transferable' },
  { value: 'partial', label: 'Partially Transferable' },
  { value: 'not-transferable', label: 'Not Transferable' },
  { value: 'unknown', label: 'Unknown' },
  { value: 'not-applicable', label: 'Not Applicable' }
]

const serviceTypeOptions = [
  { value: 'hvac', label: 'HVAC Maintenance' },
  { value: 'elevator', label: 'Elevator Service' },
  { value: 'fire-safety', label: 'Fire Safety Systems' },
  { value: 'security', label: 'Security Systems' },
  { value: 'landscaping', label: 'Landscaping' },
  { value: 'cleaning', label: 'Cleaning Services' },
  { value: 'pest-control', label: 'Pest Control' },
  { value: 'snow-removal', label: 'Snow Removal' },
  { value: 'electrical', label: 'Electrical Maintenance' },
  { value: 'plumbing', label: 'Plumbing Maintenance' }
]

const priorityLevelOptions = [
  { value: 'immediate', label: 'Immediate Attention Required' },
  { value: 'high', label: 'High Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'low', label: 'Low Priority' },
  { value: 'routine', label: 'Routine Maintenance' }
]

// Dynamic list management
const addMajorRepair = () => {
  const newId = Math.max(...formData.value.majorRepairs.map(r => r.id)) + 1
  formData.value.majorRepairs.push({
    id: newId,
    system: '',
    description: '',
    dateCompleted: '',
    cost: ''
  })
}

const removeMajorRepair = (id: number) => {
  const index = formData.value.majorRepairs.findIndex(r => r.id === id)
  if (index > -1) {
    formData.value.majorRepairs.splice(index, 1)
  }
}

const addServiceContract = () => {
  const newId = Math.max(...formData.value.serviceContracts.map(c => c.id)) + 1
  formData.value.serviceContracts.push({
    id: newId,
    provider: '',
    serviceType: '',
    startDate: '',
    endDate: '',
    monthlyCost: ''
  })
}

const removeServiceContract = (id: number) => {
  const index = formData.value.serviceContracts.findIndex(c => c.id === id)
  if (index > -1) {
    formData.value.serviceContracts.splice(index, 1)
  }
}

// Step navigation
const goToNextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++
  } else {
    markFormCompleted('maintenance-records')
    navigateTo('/')
  }
}

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    navigateTo('/forms/environmental-hazards')
  }
}

// Auto-save form data on changes
watch(formData, (newData) => {
  saveFormData('maintenance-records', newData, false)
}, { deep: true })
</script>

<style>
@import url('~/assets/css/forms.css');
</style>