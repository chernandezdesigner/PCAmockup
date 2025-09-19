<template>
  <FormLayout
    title="Environmental Hazards"
    description="Asbestos, lead, mold, and hazardous materials assessment"
    form-key="environmental-hazards"
    :current-step="currentStep"
    :total-steps="totalSteps"
    @go-back="goToPreviousStep"
    @go-next="goToNextStep"
  >
    <Transition name="step-transition" mode="out-in">
      <div :key="currentStep" class="space-y-4 pb-4">

        <!-- Step 1: Asbestos Assessment -->
        <div v-if="currentStep === 1">
          <div class="space-y-6">
            <div>
              <label class="form-label">Building Age (Asbestos Concern)</label>
              <CustomDropdown
                v-model="formData.asbestosConcern"
                :options="asbestosConcernOptions"
                placeholder="Select Asbestos Risk Level"
              />
            </div>

            <div>
              <label class="form-label">Suspected Asbestos Materials</label>
              <div class="modern-dynamic-item">
                <div class="scrollable-card-content">
                  <div
                    v-for="(material, index) in formData.asbestosMaterials"
                    :key="material.id"
                    class="scrollable-option-item"
                    :class="{ 'border-b border-gray-200': index < formData.asbestosMaterials.length - 1 }"
                  >
                    <span class="option-label">{{ material.name }}</span>
                    <div class="option-controls">
                      <label class="modern-checkbox">
                        <input
                          type="checkbox"
                          :id="`asbestos-${material.id}`"
                          v-model="material.present"
                          class="modern-checkbox-input"
                        />
                        <span class="modern-checkbox-box"></span>
                      </label>
                      <span class="modern-status-badge" :class="{ 'modern-status-badge--active': material.present }">
                        {{ material.present ? 'Present' : 'Not Found' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label class="form-label">Asbestos Testing Recommended</label>
              <CustomDropdown
                v-model="formData.asbestosTestingRecommended"
                :options="yesNoOptions"
                placeholder="Should asbestos testing be performed?"
              />
            </div>

            <div>
              <label class="form-label">Asbestos Notes</label>
              <textarea
                v-model="formData.asbestosNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional asbestos observations and recommendations"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 2: Lead Assessment -->
        <div v-if="currentStep === 2">
          <div class="space-y-6">
            <div>
              <label class="form-label">Lead Paint Risk (Pre-1978)</label>
              <CustomDropdown
                v-model="formData.leadPaintRisk"
                :options="riskLevelOptions"
                placeholder="Select Lead Paint Risk Level"
              />
            </div>

            <div>
              <label class="form-label">Lead Paint Condition</label>
              <CustomDropdown
                v-model="formData.leadPaintCondition"
                :options="paintConditionOptions"
                placeholder="Select Paint Condition"
              />
            </div>

            <div>
              <label class="form-label">Lead Plumbing Components</label>
              <CustomDropdown
                v-model="formData.leadPlumbing"
                :options="yesNoOptions"
                placeholder="Lead pipes or solder present?"
              />
            </div>

            <div>
              <label class="form-label">Lead Testing Recommended</label>
              <CustomDropdown
                v-model="formData.leadTestingRecommended"
                :options="yesNoOptions"
                placeholder="Should lead testing be performed?"
              />
            </div>

            <div>
              <label class="form-label">Lead Hazard Notes</label>
              <textarea
                v-model="formData.leadNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional lead hazard observations and recommendations"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 3: Mold & Air Quality -->
        <div v-if="currentStep === 3">
          <div class="space-y-6">
            <div>
              <label class="form-label">Visible Mold</label>
              <CustomDropdown
                v-model="formData.visibleMold"
                :options="yesNoOptions"
                placeholder="Visible mold growth observed?"
              />
            </div>

            <div>
              <label class="form-label">Moisture Issues</label>
              <CustomDropdown
                v-model="formData.moistureIssues"
                :options="moistureOptions"
                placeholder="Select Moisture Issue Level"
              />
            </div>

            <div>
              <label class="form-label">Water Damage History</label>
              <CustomDropdown
                v-model="formData.waterDamageHistory"
                :options="yesNoOptions"
                placeholder="Evidence of past water damage?"
              />
            </div>

            <div>
              <label class="form-label">Ventilation Adequacy</label>
              <CustomDropdown
                v-model="formData.ventilationAdequacy"
                :options="adequacyOptions"
                placeholder="Select Ventilation Adequacy"
              />
            </div>

            <div>
              <label class="form-label">Indoor Air Quality Concerns</label>
              <CustomDropdown
                v-model="formData.airQualityConcerns"
                :options="yesNoOptions"
                placeholder="Any air quality concerns?"
              />
            </div>

            <div>
              <label class="form-label">Mold Testing Recommended</label>
              <CustomDropdown
                v-model="formData.moldTestingRecommended"
                :options="yesNoOptions"
                placeholder="Should mold testing be performed?"
              />
            </div>

            <div>
              <label class="form-label">Mold & Air Quality Notes</label>
              <textarea
                v-model="formData.moldNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional mold and air quality observations"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 4: Other Environmental Hazards -->
        <div v-if="currentStep === 4">
          <div class="space-y-6">
            <div>
              <label class="form-label">Radon Testing</label>
              <CustomDropdown
                v-model="formData.radonTesting"
                :options="testingStatusOptions"
                placeholder="Radon testing status"
              />
            </div>

            <div>
              <label class="form-label">Underground Storage Tanks</label>
              <CustomDropdown
                v-model="formData.undergroundTanks"
                :options="yesNoOptions"
                placeholder="Underground storage tanks present?"
              />
            </div>

            <div>
              <label class="form-label">Chemical Storage</label>
              <CustomDropdown
                v-model="formData.chemicalStorage"
                :options="yesNoOptions"
                placeholder="Chemical storage areas present?"
              />
            </div>

            <div>
              <label class="form-label">Contaminated Soil</label>
              <CustomDropdown
                v-model="formData.contaminatedSoil"
                :options="riskLevelOptions"
                placeholder="Soil contamination risk level"
              />
            </div>

            <div>
              <label class="form-label">Electromagnetic Fields (EMF)</label>
              <CustomDropdown
                v-model="formData.emfConcerns"
                :options="yesNoOptions"
                placeholder="EMF concerns noted?"
              />
            </div>

            <div>
              <label class="form-label">PCB-Containing Equipment</label>
              <CustomDropdown
                v-model="formData.pcbEquipment"
                :options="yesNoOptions"
                placeholder="PCB-containing equipment present?"
              />
            </div>

            <div>
              <label class="form-label">Environmental Recommendations</label>
              <div class="modern-dynamic-item">
                <div class="scrollable-card-content">
                  <div
                    v-for="(recommendation, index) in formData.environmentalRecommendations"
                    :key="recommendation.id"
                    class="scrollable-option-item"
                    :class="{ 'border-b border-gray-200': index < formData.environmentalRecommendations.length - 1 }"
                  >
                    <span class="option-label">{{ recommendation.name }}</span>
                    <div class="option-controls">
                      <label class="modern-checkbox">
                        <input
                          type="checkbox"
                          :id="`env-rec-${recommendation.id}`"
                          v-model="recommendation.recommended"
                          class="modern-checkbox-input"
                        />
                        <span class="modern-checkbox-box"></span>
                      </label>
                      <span class="modern-status-badge" :class="{ 'modern-status-badge--active': recommendation.recommended }">
                        {{ recommendation.recommended ? 'Yes' : 'No' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label class="form-label">Environmental Hazards Summary</label>
              <textarea
                v-model="formData.environmentalSummary"
                class="form-input min-h-[100px] resize-none"
                placeholder="Summary of environmental concerns and recommendations"
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
  // Asbestos
  asbestosConcern: '',
  asbestosMaterials: [
    { id: 1, name: 'Floor Tiles & Mastic', present: false },
    { id: 2, name: 'Pipe Insulation', present: false },
    { id: 3, name: 'Boiler/Furnace Insulation', present: false },
    { id: 4, name: 'Ceiling Tiles', present: false },
    { id: 5, name: 'Roofing Materials', present: false },
    { id: 6, name: 'Siding/Shingles', present: false },
    { id: 7, name: 'Joint Compound/Texture', present: false },
    { id: 8, name: 'Fireproofing Materials', present: false }
  ],
  asbestosTestingRecommended: '',
  asbestosNotes: '',

  // Lead
  leadPaintRisk: '',
  leadPaintCondition: '',
  leadPlumbing: '',
  leadTestingRecommended: '',
  leadNotes: '',

  // Mold & Air Quality
  visibleMold: '',
  moistureIssues: '',
  waterDamageHistory: '',
  ventilationAdequacy: '',
  airQualityConcerns: '',
  moldTestingRecommended: '',
  moldNotes: '',

  // Other Environmental
  radonTesting: '',
  undergroundTanks: '',
  chemicalStorage: '',
  contaminatedSoil: '',
  emfConcerns: '',
  pcbEquipment: '',
  environmentalRecommendations: [
    { id: 1, name: 'Phase I Environmental Site Assessment', recommended: false },
    { id: 2, name: 'Phase II Environmental Site Assessment', recommended: false },
    { id: 3, name: 'Asbestos Survey & Testing', recommended: false },
    { id: 4, name: 'Lead Paint Survey & Testing', recommended: false },
    { id: 5, name: 'Mold Assessment', recommended: false },
    { id: 6, name: 'Radon Testing', recommended: false },
    { id: 7, name: 'Indoor Air Quality Assessment', recommended: false },
    { id: 8, name: 'Underground Tank Investigation', recommended: false }
  ],
  environmentalSummary: '',

  ...getFormData('environmental-hazards')
})

// Dropdown options
const asbestosConcernOptions = [
  { value: 'high-risk', label: 'High Risk (Pre-1980)' },
  { value: 'moderate-risk', label: 'Moderate Risk (1980-1990)' },
  { value: 'low-risk', label: 'Low Risk (Post-1990)' },
  { value: 'unknown', label: 'Unknown Construction Date' }
]

const yesNoOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'possible', label: 'Possible' },
  { value: 'unknown', label: 'Unknown' }
]

const riskLevelOptions = [
  { value: 'high', label: 'High Risk' },
  { value: 'moderate', label: 'Moderate Risk' },
  { value: 'low', label: 'Low Risk' },
  { value: 'none', label: 'No Risk' },
  { value: 'unknown', label: 'Unknown' }
]

const paintConditionOptions = [
  { value: 'intact', label: 'Intact/Good Condition' },
  { value: 'peeling', label: 'Peeling/Chipping' },
  { value: 'deteriorating', label: 'Deteriorating' },
  { value: 'disturbed', label: 'Recently Disturbed' },
  { value: 'unknown', label: 'Unknown/Not Observed' }
]

const moistureOptions = [
  { value: 'none', label: 'No Issues' },
  { value: 'minor', label: 'Minor Issues' },
  { value: 'moderate', label: 'Moderate Issues' },
  { value: 'severe', label: 'Severe Issues' },
  { value: 'active-leaks', label: 'Active Leaks' }
]

const adequacyOptions = [
  { value: 'adequate', label: 'Adequate' },
  { value: 'marginal', label: 'Marginal' },
  { value: 'inadequate', label: 'Inadequate' },
  { value: 'unknown', label: 'Unknown' }
]

const testingStatusOptions = [
  { value: 'not-tested', label: 'Not Tested' },
  { value: 'recently-tested', label: 'Recently Tested' },
  { value: 'recommended', label: 'Testing Recommended' },
  { value: 'not-applicable', label: 'Not Applicable' }
]

// Step navigation
const goToNextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++
  } else {
    markFormCompleted('environmental-hazards')
    navigateTo('/forms/maintenance-records')
  }
}

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    navigateTo('/forms/structural-assessment')
  }
}

// Auto-save form data on changes
watch(formData, (newData) => {
  saveFormData('environmental-hazards', newData, false)
}, { deep: true })
</script>

<style>
@import url('~/assets/css/forms.css');
</style>