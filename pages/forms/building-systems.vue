<template>
  <FormLayout
    title="Building Systems"
    description="HVAC, electrical, plumbing, and mechanical systems assessment"
    form-key="building-systems"
    :current-step="currentStep"
    :total-steps="totalSteps"
    @go-back="goToPreviousStep"
    @go-next="goToNextStep"
  >
    <Transition name="step-transition" mode="out-in">
      <div :key="currentStep" class="space-y-4 pb-4">

        <!-- Step 1: HVAC Systems -->
        <div v-if="currentStep === 1">
          <div class="space-y-6">
            <div>
              <label class="form-label">HVAC System Type</label>
              <CustomDropdown
                v-model="formData.hvacSystemType"
                :options="hvacSystemOptions"
                placeholder="Select HVAC System Type"
              />
            </div>

            <div>
              <label class="form-label">HVAC Age (Years)</label>
              <input
                v-model="formData.hvacAge"
                type="number"
                class="form-input"
                placeholder="Enter system age"
              />
            </div>

            <div>
              <label class="form-label">HVAC Condition</label>
              <CustomDropdown
                v-model="formData.hvacCondition"
                :options="conditionOptions"
                placeholder="Select Overall Condition"
              />
            </div>

            <div>
              <label class="form-label">Heating Fuel Type</label>
              <CustomDropdown
                v-model="formData.heatingFuelType"
                :options="fuelTypeOptions"
                placeholder="Select Fuel Type"
              />
            </div>

            <div>
              <label class="form-label">Cooling System</label>
              <CustomDropdown
                v-model="formData.coolingSystem"
                :options="coolingSystemOptions"
                placeholder="Select Cooling System"
              />
            </div>

            <div>
              <label class="form-label">Ductwork Condition</label>
              <CustomDropdown
                v-model="formData.ductworkCondition"
                :options="conditionOptions"
                placeholder="Select Ductwork Condition"
              />
            </div>

            <div>
              <label class="form-label">HVAC Notes</label>
              <textarea
                v-model="formData.hvacNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional HVAC observations and notes"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 2: Electrical Systems -->
        <div v-if="currentStep === 2">
          <div class="space-y-6">
            <div>
              <label class="form-label">Electrical Service Size (Amps)</label>
              <input
                v-model="formData.electricalServiceSize"
                type="number"
                class="form-input"
                placeholder="e.g., 200"
              />
            </div>

            <div>
              <label class="form-label">Main Panel Type</label>
              <CustomDropdown
                v-model="formData.mainPanelType"
                :options="panelTypeOptions"
                placeholder="Select Panel Type"
              />
            </div>

            <div>
              <label class="form-label">Panel Condition</label>
              <CustomDropdown
                v-model="formData.panelCondition"
                :options="conditionOptions"
                placeholder="Select Panel Condition"
              />
            </div>

            <div>
              <label class="form-label">Wiring Type</label>
              <CustomDropdown
                v-model="formData.wiringType"
                :options="wiringTypeOptions"
                placeholder="Select Primary Wiring Type"
              />
            </div>

            <div>
              <label class="form-label">GFCI Protection</label>
              <CustomDropdown
                v-model="formData.gfciProtection"
                :options="yesNoOptions"
                placeholder="GFCI outlets present?"
              />
            </div>

            <div>
              <label class="form-label">Emergency Lighting</label>
              <CustomDropdown
                v-model="formData.emergencyLighting"
                :options="emergencyLightingOptions"
                placeholder="Select Emergency Lighting Type"
              />
            </div>

            <div>
              <label class="form-label">Electrical Notes</label>
              <textarea
                v-model="formData.electricalNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional electrical observations and notes"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 3: Plumbing Systems -->
        <div v-if="currentStep === 3">
          <div class="space-y-6">
            <div>
              <label class="form-label">Water Supply Material</label>
              <CustomDropdown
                v-model="formData.waterSupplyMaterial"
                :options="pipingMaterialOptions"
                placeholder="Select Water Supply Material"
              />
            </div>

            <div>
              <label class="form-label">Waste/Sewer Material</label>
              <CustomDropdown
                v-model="formData.wasteSewerMaterial"
                :options="pipingMaterialOptions"
                placeholder="Select Waste/Sewer Material"
              />
            </div>

            <div>
              <label class="form-label">Water Heater Type</label>
              <CustomDropdown
                v-model="formData.waterHeaterType"
                :options="waterHeaterTypeOptions"
                placeholder="Select Water Heater Type"
              />
            </div>

            <div>
              <label class="form-label">Water Heater Age (Years)</label>
              <input
                v-model="formData.waterHeaterAge"
                type="number"
                class="form-input"
                placeholder="Enter water heater age"
              />
            </div>

            <div>
              <label class="form-label">Water Pressure</label>
              <CustomDropdown
                v-model="formData.waterPressure"
                :options="pressureOptions"
                placeholder="Select Water Pressure Level"
              />
            </div>

            <div>
              <label class="form-label">Sprinkler System</label>
              <CustomDropdown
                v-model="formData.sprinklerSystem"
                :options="sprinklerSystemOptions"
                placeholder="Select Sprinkler System Type"
              />
            </div>

            <div>
              <label class="form-label">Plumbing Notes</label>
              <textarea
                v-model="formData.plumbingNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional plumbing observations and notes"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Step 4: Fire Safety & Security -->
        <div v-if="currentStep === 4">
          <div class="space-y-6">
            <div>
              <label class="form-label">Fire Alarm System</label>
              <CustomDropdown
                v-model="formData.fireAlarmSystem"
                :options="fireAlarmOptions"
                placeholder="Select Fire Alarm System Type"
              />
            </div>

            <div>
              <label class="form-label">Fire Extinguishers</label>
              <CustomDropdown
                v-model="formData.fireExtinguishers"
                :options="yesNoOptions"
                placeholder="Fire extinguishers present?"
              />
            </div>

            <div>
              <label class="form-label">Emergency Exits</label>
              <CustomDropdown
                v-model="formData.emergencyExits"
                :options="conditionOptions"
                placeholder="Select Emergency Exit Condition"
              />
            </div>

            <div>
              <label class="form-label">Security System</label>
              <CustomDropdown
                v-model="formData.securitySystem"
                :options="securitySystemOptions"
                placeholder="Select Security System Type"
              />
            </div>

            <div>
              <label class="form-label">Elevator System</label>
              <CustomDropdown
                v-model="formData.elevatorSystem"
                :options="elevatorOptions"
                placeholder="Select Elevator Status"
              />
            </div>

            <div>
              <label class="form-label">Generator/Backup Power</label>
              <CustomDropdown
                v-model="formData.backupPower"
                :options="backupPowerOptions"
                placeholder="Select Backup Power Type"
              />
            </div>

            <div>
              <label class="form-label">Fire Safety & Security Notes</label>
              <textarea
                v-model="formData.fireSafetyNotes"
                class="form-input min-h-[100px] resize-none"
                placeholder="Additional fire safety and security observations"
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
  // HVAC
  hvacSystemType: '',
  hvacAge: '',
  hvacCondition: '',
  heatingFuelType: '',
  coolingSystem: '',
  ductworkCondition: '',
  hvacNotes: '',

  // Electrical
  electricalServiceSize: '',
  mainPanelType: '',
  panelCondition: '',
  wiringType: '',
  gfciProtection: '',
  emergencyLighting: '',
  electricalNotes: '',

  // Plumbing
  waterSupplyMaterial: '',
  wasteSewerMaterial: '',
  waterHeaterType: '',
  waterHeaterAge: '',
  waterPressure: '',
  sprinklerSystem: '',
  plumbingNotes: '',

  // Fire Safety & Security
  fireAlarmSystem: '',
  fireExtinguishers: '',
  emergencyExits: '',
  securitySystem: '',
  elevatorSystem: '',
  backupPower: '',
  fireSafetyNotes: '',

  ...getFormData('building-systems')
})

// Dropdown options
const hvacSystemOptions = [
  { value: 'central-air', label: 'Central Air/Heat' },
  { value: 'heat-pump', label: 'Heat Pump' },
  { value: 'forced-air', label: 'Forced Air' },
  { value: 'radiant', label: 'Radiant Heat' },
  { value: 'steam', label: 'Steam' },
  { value: 'hydronic', label: 'Hydronic' },
  { value: 'geothermal', label: 'Geothermal' },
  { value: 'none', label: 'No Central System' }
]

const conditionOptions = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
  { value: 'not-observed', label: 'Not Observed' }
]

const fuelTypeOptions = [
  { value: 'natural-gas', label: 'Natural Gas' },
  { value: 'electric', label: 'Electric' },
  { value: 'oil', label: 'Oil' },
  { value: 'propane', label: 'Propane' },
  { value: 'wood', label: 'Wood' },
  { value: 'solar', label: 'Solar' },
  { value: 'other', label: 'Other' }
]

const coolingSystemOptions = [
  { value: 'central-ac', label: 'Central Air Conditioning' },
  { value: 'window-units', label: 'Window Units' },
  { value: 'evaporative', label: 'Evaporative Cooling' },
  { value: 'heat-pump', label: 'Heat Pump' },
  { value: 'none', label: 'No Cooling System' }
]

const panelTypeOptions = [
  { value: 'circuit-breaker', label: 'Circuit Breaker' },
  { value: 'fuse-box', label: 'Fuse Box' },
  { value: 'federal-pacific', label: 'Federal Pacific (Recalled)' },
  { value: 'zinsco', label: 'Zinsco' },
  { value: 'other', label: 'Other' }
]

const wiringTypeOptions = [
  { value: 'copper-romex', label: 'Copper Romex' },
  { value: 'copper-bx', label: 'Copper BX/MC' },
  { value: 'copper-conduit', label: 'Copper in Conduit' },
  { value: 'aluminum', label: 'Aluminum' },
  { value: 'knob-tube', label: 'Knob & Tube' },
  { value: 'mixed', label: 'Mixed Types' }
]

const yesNoOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'partial', label: 'Partial' },
  { value: 'unknown', label: 'Unknown' }
]

const emergencyLightingOptions = [
  { value: 'battery-backup', label: 'Battery Backup' },
  { value: 'generator', label: 'Generator' },
  { value: 'exit-signs-only', label: 'Exit Signs Only' },
  { value: 'none', label: 'None' },
  { value: 'not-required', label: 'Not Required' }
]

const pipingMaterialOptions = [
  { value: 'copper', label: 'Copper' },
  { value: 'pex', label: 'PEX' },
  { value: 'pvc', label: 'PVC' },
  { value: 'cpvc', label: 'CPVC' },
  { value: 'galvanized', label: 'Galvanized Steel' },
  { value: 'polybutylene', label: 'Polybutylene' },
  { value: 'cast-iron', label: 'Cast Iron' },
  { value: 'abs', label: 'ABS' },
  { value: 'mixed', label: 'Mixed Materials' }
]

const waterHeaterTypeOptions = [
  { value: 'tank-gas', label: 'Tank - Gas' },
  { value: 'tank-electric', label: 'Tank - Electric' },
  { value: 'tankless-gas', label: 'Tankless - Gas' },
  { value: 'tankless-electric', label: 'Tankless - Electric' },
  { value: 'heat-pump', label: 'Heat Pump Water Heater' },
  { value: 'solar', label: 'Solar' },
  { value: 'boiler', label: 'Boiler/Indirect' }
]

const pressureOptions = [
  { value: 'low', label: 'Low (< 40 PSI)' },
  { value: 'normal', label: 'Normal (40-80 PSI)' },
  { value: 'high', label: 'High (> 80 PSI)' },
  { value: 'unknown', label: 'Unknown' }
]

const sprinklerSystemOptions = [
  { value: 'wet-system', label: 'Wet Sprinkler System' },
  { value: 'dry-system', label: 'Dry Sprinkler System' },
  { value: 'partial', label: 'Partial Coverage' },
  { value: 'none', label: 'No Sprinkler System' },
  { value: 'unknown', label: 'Unknown' }
]

const fireAlarmOptions = [
  { value: 'addressable', label: 'Addressable System' },
  { value: 'conventional', label: 'Conventional System' },
  { value: 'smoke-detectors', label: 'Smoke Detectors Only' },
  { value: 'heat-detectors', label: 'Heat Detectors Only' },
  { value: 'none', label: 'No Fire Alarm System' }
]

const securitySystemOptions = [
  { value: 'monitored', label: 'Monitored Security System' },
  { value: 'local-alarm', label: 'Local Alarm Only' },
  { value: 'cameras-only', label: 'Cameras Only' },
  { value: 'access-control', label: 'Access Control System' },
  { value: 'none', label: 'No Security System' }
]

const elevatorOptions = [
  { value: 'hydraulic', label: 'Hydraulic Elevator' },
  { value: 'traction', label: 'Traction Elevator' },
  { value: 'freight', label: 'Freight Elevator' },
  { value: 'multiple', label: 'Multiple Elevators' },
  { value: 'none', label: 'No Elevator' }
]

const backupPowerOptions = [
  { value: 'generator-auto', label: 'Automatic Generator' },
  { value: 'generator-manual', label: 'Manual Generator' },
  { value: 'ups-battery', label: 'UPS/Battery Backup' },
  { value: 'solar-battery', label: 'Solar + Battery' },
  { value: 'none', label: 'No Backup Power' }
]

// Step navigation
const goToNextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++
  } else {
    // Complete form
    markFormCompleted('building-systems')
    navigateTo('/forms/structural-assessment')
  }
}

const goToPreviousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    navigateTo('/forms/project-summary')
  }
}

// Auto-save form data on changes
watch(formData, (newData) => {
  saveFormData('building-systems', newData, false)
}, { deep: true })
</script>

<style>
@import url('~/assets/css/forms.css');
</style>