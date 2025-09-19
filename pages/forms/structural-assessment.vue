<template>
  <FormLayout
    title="Structural Assessment"
    description="Foundation, roof, and structural elements evaluation"
    form-key="structural-assessment"
    :current-step="currentStep"
    :total-steps="totalSteps"
    @go-back="goToPreviousStep"
    @go-next="goToNextStep"
  >
    <Transition name="step-transition" mode="out-in">
      <div :key="currentStep" class="space-y-4 pb-4">

        <!-- Step 1: Foundation & Structure -->
        <div v-if="currentStep === 1">
          <div class="space-y-6">
            <div>
              <label class="form-label">Foundation Type</label>
              <CustomDropdown
                v-model="formData.foundationType"
                :options="foundationTypeOptions"
                placeholder="Select Foundation Type"
              />
            </div>

            <div>
              <label class="form-label">Foundation Condition</label>
              <CustomDropdown
                v-model="formData.foundationCondition"
                :options="conditionOptions"
                placeholder="Select Foundation Condition"
              />
            </div>

            <div>
              <label class="form-label">Structural Material</label>
              <CustomDropdown
                v-model="formData.structuralMaterial"
                :options="structuralMaterialOptions"
                placeholder="Select Primary Structural Material"
              />
            </div>

            <div>
              <label class="form-label">Load-Bearing Elements</label>
              <CustomDropdown
                v-model="formData.loadBearingElements"
                :options="conditionOptions"
                placeholder="Select Load-Bearing Element Condition"
              />
            </div>

            <div>
              <label class="form-label">Basement/Crawl Space</label>
              <CustomDropdown
                v-model="formData.basementCrawlSpace"
                :options="basementOptions"
                placeholder="Select Basement/Crawl Space Type"
              />
            </div>

            <div>
              <label class="form-label">Moisture Issues</label>
              <CustomDropdown
                v-model="formData.moistureIssues"
                :options="yesNoOptions"
                placeholder="Evidence of moisture problems?"
              />
            </div>

            <div>
              <label class="form-label">Foundation & Structure Notes</label>
              <textarea
                v-model="formData.foundationNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional foundation and structural observations"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 2: Roof System -->
        <div v-if="currentStep === 2">
          <div class="space-y-6">
            <div>
              <label class="form-label">Roof Type</label>
              <CustomDropdown
                v-model="formData.roofType"
                :options="roofTypeOptions"
                placeholder="Select Roof Type"
              />
            </div>

            <div>
              <label class="form-label">Roof Material</label>
              <CustomDropdown
                v-model="formData.roofMaterial"
                :options="roofMaterialOptions"
                placeholder="Select Roof Material"
              />
            </div>

            <div>
              <label class="form-label">Roof Age (Years)</label>
              <input
                v-model="formData.roofAge"
                type="number"
                class="form-input"
                placeholder="Enter roof age"
              />
            </div>

            <div>
              <label class="form-label">Roof Condition</label>
              <CustomDropdown
                v-model="formData.roofCondition"
                :options="conditionOptions"
                placeholder="Select Roof Condition"
              />
            </div>

            <div>
              <label class="form-label">Gutters & Downspouts</label>
              <CustomDropdown
                v-model="formData.guttersDownspouts"
                :options="conditionOptions"
                placeholder="Select Gutter System Condition"
              />
            </div>

            <div>
              <label class="form-label">Roof Drainage</label>
              <CustomDropdown
                v-model="formData.roofDrainage"
                :options="drainageOptions"
                placeholder="Select Roof Drainage Adequacy"
              />
            </div>

            <div>
              <label class="form-label">Roof Access</label>
              <CustomDropdown
                v-model="formData.roofAccess"
                :options="accessOptions"
                placeholder="How was roof accessed?"
              />
            </div>

            <div>
              <label class="form-label">Roof System Notes</label>
              <textarea
                v-model="formData.roofNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional roof system observations"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 3: Exterior Elements -->
        <div v-if="currentStep === 3">
          <div class="space-y-6">
            <div>
              <label class="form-label">Exterior Wall Material</label>
              <CustomDropdown
                v-model="formData.exteriorWallMaterial"
                :options="exteriorMaterialOptions"
                placeholder="Select Primary Exterior Material"
              />
            </div>

            <div>
              <label class="form-label">Exterior Wall Condition</label>
              <CustomDropdown
                v-model="formData.exteriorWallCondition"
                :options="conditionOptions"
                placeholder="Select Exterior Wall Condition"
              />
            </div>

            <div>
              <label class="form-label">Windows</label>
              <CustomDropdown
                v-model="formData.windows"
                :options="windowOptions"
                placeholder="Select Window Type/Condition"
              />
            </div>

            <div>
              <label class="form-label">Doors</label>
              <CustomDropdown
                v-model="formData.doors"
                :options="conditionOptions"
                placeholder="Select Door Condition"
              />
            </div>

            <div>
              <label class="form-label">Insulation</label>
              <CustomDropdown
                v-model="formData.insulation"
                :options="insulationOptions"
                placeholder="Select Insulation Type/Adequacy"
              />
            </div>

            <div>
              <label class="form-label">Weatherproofing</label>
              <CustomDropdown
                v-model="formData.weatherproofing"
                :options="conditionOptions"
                placeholder="Select Weatherproofing Condition"
              />
            </div>

            <div>
              <label class="form-label">Exterior Elements Notes</label>
              <textarea
                v-model="formData.exteriorNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional exterior element observations"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 4: Interior Structure -->
        <div v-if="currentStep === 4">
          <div class="space-y-6">
            <div>
              <label class="form-label">Floor System</label>
              <CustomDropdown
                v-model="formData.floorSystem"
                :options="floorSystemOptions"
                placeholder="Select Floor System Type"
              />
            </div>

            <div>
              <label class="form-label">Floor Condition</label>
              <CustomDropdown
                v-model="formData.floorCondition"
                :options="conditionOptions"
                placeholder="Select Floor System Condition"
              />
            </div>

            <div>
              <label class="form-label">Interior Walls</label>
              <CustomDropdown
                v-model="formData.interiorWalls"
                :options="interiorWallOptions"
                placeholder="Select Interior Wall Material"
              />
            </div>

            <div>
              <label class="form-label">Ceiling System</label>
              <CustomDropdown
                v-model="formData.ceilingSystem"
                :options="ceilingSystemOptions"
                placeholder="Select Ceiling System Type"
              />
            </div>

            <div>
              <label class="form-label">Stairways</label>
              <CustomDropdown
                v-model="formData.stairways"
                :options="conditionOptions"
                placeholder="Select Stairway Condition"
              />
            </div>

            <div>
              <label class="form-label">Railings & Guards</label>
              <CustomDropdown
                v-model="formData.railingsGuards"
                :options="conditionOptions"
                placeholder="Select Railing/Guard Condition"
              />
            </div>

            <div>
              <label class="form-label">Structural Concerns</label>
              <CustomDropdown
                v-model="formData.structuralConcerns"
                :options="yesNoOptions"
                placeholder="Any structural concerns noted?"
              />
            </div>

            <div>
              <label class="form-label">Interior Structure Notes</label>
              <textarea
                v-model="formData.interiorNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional interior structural observations"
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
  // Foundation & Structure
  foundationType: '',
  foundationCondition: '',
  structuralMaterial: '',
  loadBearingElements: '',
  basementCrawlSpace: '',
  moistureIssues: '',
  foundationNotes: '',

  // Roof System
  roofType: '',
  roofMaterial: '',
  roofAge: '',
  roofCondition: '',
  guttersDownspouts: '',
  roofDrainage: '',
  roofAccess: '',
  roofNotes: '',

  // Exterior Elements
  exteriorWallMaterial: '',
  exteriorWallCondition: '',
  windows: '',
  doors: '',
  insulation: '',
  weatherproofing: '',
  exteriorNotes: '',

  // Interior Structure
  floorSystem: '',
  floorCondition: '',
  interiorWalls: '',
  ceilingSystem: '',
  stairways: '',
  railingsGuards: '',
  structuralConcerns: '',
  interiorNotes: '',

  ...getFormData('structural-assessment')
})

// Dropdown options
const foundationTypeOptions = [
  { value: 'full-basement', label: 'Full Basement' },
  { value: 'partial-basement', label: 'Partial Basement' },
  { value: 'crawl-space', label: 'Crawl Space' },
  { value: 'slab-on-grade', label: 'Slab on Grade' },
  { value: 'pier-beam', label: 'Pier & Beam' },
  { value: 'raised-foundation', label: 'Raised Foundation' }
]

const conditionOptions = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
  { value: 'not-observed', label: 'Not Observed' }
]

const structuralMaterialOptions = [
  { value: 'wood-frame', label: 'Wood Frame' },
  { value: 'steel-frame', label: 'Steel Frame' },
  { value: 'concrete-block', label: 'Concrete Block' },
  { value: 'poured-concrete', label: 'Poured Concrete' },
  { value: 'brick-masonry', label: 'Brick/Masonry' },
  { value: 'mixed-materials', label: 'Mixed Materials' }
]

const basementOptions = [
  { value: 'full-basement', label: 'Full Basement' },
  { value: 'partial-basement', label: 'Partial Basement' },
  { value: 'crawl-space', label: 'Crawl Space' },
  { value: 'none', label: 'None (Slab)' },
  { value: 'not-accessible', label: 'Not Accessible' }
]

const yesNoOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'minor', label: 'Minor' },
  { value: 'unknown', label: 'Unknown' }
]

const roofTypeOptions = [
  { value: 'gable', label: 'Gable' },
  { value: 'hip', label: 'Hip' },
  { value: 'flat', label: 'Flat' },
  { value: 'shed', label: 'Shed' },
  { value: 'mansard', label: 'Mansard' },
  { value: 'gambrel', label: 'Gambrel' },
  { value: 'complex', label: 'Complex/Mixed' }
]

const roofMaterialOptions = [
  { value: 'asphalt-shingles', label: 'Asphalt Shingles' },
  { value: 'architectural-shingles', label: 'Architectural Shingles' },
  { value: 'metal', label: 'Metal' },
  { value: 'tile', label: 'Tile' },
  { value: 'slate', label: 'Slate' },
  { value: 'wood-shakes', label: 'Wood Shakes' },
  { value: 'built-up', label: 'Built-up (BUR)' },
  { value: 'single-ply', label: 'Single Ply Membrane' },
  { value: 'modified-bitumen', label: 'Modified Bitumen' }
]

const drainageOptions = [
  { value: 'adequate', label: 'Adequate' },
  { value: 'marginal', label: 'Marginal' },
  { value: 'poor', label: 'Poor' },
  { value: 'ponding-observed', label: 'Ponding Observed' },
  { value: 'not-observed', label: 'Not Observed' }
]

const accessOptions = [
  { value: 'walked-on', label: 'Walked On' },
  { value: 'ladder', label: 'Ladder Access' },
  { value: 'binoculars', label: 'Binoculars/Visual' },
  { value: 'not-accessible', label: 'Not Accessible' },
  { value: 'partial-access', label: 'Partial Access' }
]

const exteriorMaterialOptions = [
  { value: 'brick', label: 'Brick' },
  { value: 'vinyl-siding', label: 'Vinyl Siding' },
  { value: 'wood-siding', label: 'Wood Siding' },
  { value: 'fiber-cement', label: 'Fiber Cement' },
  { value: 'stucco', label: 'Stucco' },
  { value: 'stone', label: 'Stone' },
  { value: 'concrete-block', label: 'Concrete Block' },
  { value: 'metal-siding', label: 'Metal Siding' },
  { value: 'eifs', label: 'EIFS' },
  { value: 'mixed', label: 'Mixed Materials' }
]

const windowOptions = [
  { value: 'single-pane', label: 'Single Pane' },
  { value: 'double-pane', label: 'Double Pane' },
  { value: 'triple-pane', label: 'Triple Pane' },
  { value: 'storm-windows', label: 'Storm Windows' },
  { value: 'mixed-types', label: 'Mixed Types' },
  { value: 'needs-replacement', label: 'Needs Replacement' }
]

const insulationOptions = [
  { value: 'adequate', label: 'Adequate' },
  { value: 'inadequate', label: 'Inadequate' },
  { value: 'none-visible', label: 'None Visible' },
  { value: 'unknown', label: 'Unknown' },
  { value: 'recently-upgraded', label: 'Recently Upgraded' }
]

const floorSystemOptions = [
  { value: 'wood-joist', label: 'Wood Joist' },
  { value: 'engineered-joist', label: 'Engineered Joist' },
  { value: 'concrete-slab', label: 'Concrete Slab' },
  { value: 'steel-joist', label: 'Steel Joist' },
  { value: 'post-tension', label: 'Post-Tension Slab' }
]

const interiorWallOptions = [
  { value: 'drywall', label: 'Drywall' },
  { value: 'plaster', label: 'Plaster' },
  { value: 'paneling', label: 'Wood Paneling' },
  { value: 'concrete-block', label: 'Concrete Block' },
  { value: 'brick', label: 'Exposed Brick' },
  { value: 'mixed', label: 'Mixed Materials' }
]

const ceilingSystemOptions = [
  { value: 'drywall', label: 'Drywall' },
  { value: 'plaster', label: 'Plaster' },
  { value: 'suspended-tile', label: 'Suspended Tile' },
  { value: 'exposed-structure', label: 'Exposed Structure' },
  { value: 'wood-planks', label: 'Wood Planks' },
  { value: 'acoustic-tile', label: 'Acoustic Tile' }
]

// Step navigation
const goToNextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++
  } else {
    markFormCompleted('structural-assessment')
    navigateTo('/forms/environmental-hazards')
  }
}

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    navigateTo('/forms/building-systems')
  }
}

// Auto-save form data on changes
watch(formData, (newData) => {
  saveFormData('structural-assessment', newData, false)
}, { deep: true })
</script>

<style>
@import url('~/assets/css/forms.css');
</style>