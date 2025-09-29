<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <PhoneMockup>
      <div class="flex flex-col w-full h-full">
        <HeaderBar @toggle-sidebar="toggleSidebar" />
        <Breadcrumbs :current-form="currentForm" :forms="forms" />
        
        <!-- Form Container -->
        <div class="flex flex-col flex-1 min-h-0 bg-gray-50">
          <!-- Form Content Area -->
          <div class="flex-1 px-6 py-6 space-y-8 overflow-y-auto min-h-0">
            <!-- Form Content Container -->
            <Transition
              name="form-transition"
              mode="out-in"
            >
              <div :key="currentForm" class="space-y-4 pb-4">
                <!-- Project Summary Form -->
                <ProjectSummaryForm
                  v-if="currentForm === 'project-summary'"
                  ref="projectSummaryRef"
                  v-model="formData.projectSummary"
                  @form-complete="completeForm('project-summary')"
                  @next-step="handleFormNavigation"
                  @previous-step="handleFormNavigation"
                />
                
                <!-- Site Grounds Form -->
                <SiteGroundsForm
                  v-else-if="currentForm === 'site-grounds'"
                  ref="siteGroundsRef"
                  v-model="formData.siteGrounds"
                  @form-complete="completeForm('site-grounds')"
                  @next-step="handleFormNavigation"
                  @previous-step="handleFormNavigation"
                />
                
                <!-- Building Envelope Form -->
                <BuildingEnvelopeForm
                  v-else-if="currentForm === 'building-envelope'"
                  ref="buildingEnvelopeRef"
                  v-model="formData.buildingEnvelope"
                  @form-complete="completeForm('building-envelope')"
                  @next-step="handleFormNavigation"
                  @previous-step="handleFormNavigation"
                />

                <!-- Mechanical Systems Form -->
                <MechanicalSystemsForm
                  v-else-if="currentForm === 'mechanical-systems'"
                  ref="mechanicalSystemsRef"
                  v-model="formData.mechanicalSystems"
                  @form-complete="completeForm('mechanical-systems')"
                  @next-step="handleFormNavigation"
                  @previous-step="handleFormNavigation"
                />

                <!-- Interior Conditions Form -->
                <InteriorConditionsForm
                  v-else-if="currentForm === 'interior-conditions'"
                  ref="interiorConditionsRef"
                  v-model="formData.interiorConditions"
                  @form-complete="completeForm('interior-conditions')"
                  @next-step="handleFormNavigation"
                  @previous-step="handleFormNavigation"
                />
                            </div>
                          </Transition>
                      </div>

          <!-- Consistent Sticky Navigation Footer -->
          <div class="sticky bottom-0 px-6 py-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm shadow-2xl">
            <div class="flex gap-3">
              <!-- Back Button (always shown, disabled for step 1) -->
              <button
                @click="canGoBack ? goBack() : null"
                type="button"
                class="form-navigation-button"
                :class="{
                  'form-navigation-button--secondary': canGoBack,
                  'form-navigation-button--disabled': !canGoBack
                }"
                :disabled="!canGoBack"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <!-- Camera Button -->
              <button
                type="button"
                class="form-navigation-button form-navigation-button--camera"
                aria-label="Take photo"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              <!-- Primary Action Button -->
              <button
                @click="handlePrimaryAction"
                type="button"
                class="form-navigation-button form-navigation-button--primary flex-1"
              >
                <span class="font-semibold">{{ primaryActionText }}</span>
                <svg v-if="primaryActionIcon === 'next'" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                <svg v-else-if="primaryActionIcon === 'menu'" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
                      </div>

        <!-- Navigation Sidebar - Contained within phone mockup -->
        <Transition name="sidebar">
          <div v-if="sidebarOpen" class="absolute inset-0 z-50">
            <!-- Backdrop -->
            <div
              class="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
              @click="closeSidebar"
            ></div>

            <!-- Sidebar Content - Modern Mobile Design -->
            <div class="absolute left-0 w-80 bg-white transform transition-transform sidebar-content" style="top: 1.5rem; bottom: 0; border-radius: 0 1.5rem 0 0; box-shadow: 0 10px 40px -5px rgba(0, 0, 0, 0.2);">
              <!-- Drag Handle -->
              <div class="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-300 rounded-full"></div>

              <!-- Header -->
              <div class="flex items-center justify-between px-6 pt-6 pb-4">
                <div>
                  <h2 class="text-xl font-bold text-gray-900 mb-1">Assessment</h2>
                  <p class="text-sm text-gray-500">Select section to continue</p>
                </div>
                <button
                  @click="closeSidebar"
                  type="button"
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:bg-gray-200 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Progress Card -->
              <div class="mx-6 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-sm font-semibold text-gray-800">Progress</span>
                  <span class="text-lg font-bold text-blue-600">{{ completedFormsCount }}/{{ forms.length }}</span>
                </div>
                <div class="w-full bg-white bg-opacity-70 rounded-full h-2.5 shadow-inner">
                  <div
                    class="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out shadow-sm"
                    :style="{ width: `${overallProgress}%` }"
                  ></div>
                </div>
                <div class="text-xs text-gray-600 mt-2 text-center">
                  {{ overallProgress }}% Complete
                </div>
              </div>

              <!-- Navigation Items -->
              <nav class="flex-1 overflow-y-auto px-6 pb-6" style="height: calc(100% - 200px);">
                <div class="space-y-3">
                  <div
                    v-for="(form, index) in forms"
                    :key="form.id"
                    class="navigation-section"
                  >
                    <!-- Section Card -->
                    <div class="rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 active:scale-[0.98]" :class="{
                      'bg-blue-50 border-blue-200 shadow-blue-100': currentForm === form.id,
                      'bg-green-50 border-green-200 shadow-green-100': form.completed,
                      'bg-white border-gray-200': !form.completed && currentForm !== form.id
                    }">
                      <button
                        @click="toggleSection(form.id)"
                        type="button"
                        class="w-full text-left p-5 transition-all duration-200"
                      >
                        <div class="flex items-start space-x-4">
                          <!-- Status Icon -->
                          <div class="flex-shrink-0 pt-0.5">
                            <div
                              v-if="form.completed"
                              class="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg"
                            >
                              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div
                              v-else-if="currentForm === form.id"
                              class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg relative"
                            >
                              <div class="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                              <div class="absolute inset-0 rounded-2xl border-2 border-blue-300 animate-ping"></div>
                            </div>
                            <div
                              v-else
                              class="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center border-2 border-gray-300"
                            >
                              <span class="text-sm font-bold text-gray-600">{{ index + 1 }}</span>
                            </div>
                          </div>

                          <!-- Form Info -->
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center justify-between mb-1">
                              <h3 class="font-bold text-lg leading-tight" :class="{
                                'text-blue-800': currentForm === form.id,
                                'text-green-800': form.completed,
                                'text-gray-900': !form.completed && currentForm !== form.id
                              }">{{ form.title }}</h3>

                              <!-- Expand/Collapse Icon -->
                              <div class="flex-shrink-0 ml-2">
                                <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="{
                                  'bg-blue-100': currentForm === form.id,
                                  'bg-green-100': form.completed,
                                  'bg-gray-100': !form.completed && currentForm !== form.id
                                }">
                                  <svg
                                    class="w-5 h-5 transition-transform duration-300"
                                    :class="{
                                      'rotate-180': expandedSections.includes(form.id),
                                      'text-blue-600': currentForm === form.id,
                                      'text-green-600': form.completed,
                                      'text-gray-500': !form.completed && currentForm !== form.id
                                    }"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            <p class="text-sm leading-tight mb-3" :class="{
                              'text-blue-700': currentForm === form.id,
                              'text-green-700': form.completed,
                              'text-gray-600': !form.completed && currentForm !== form.id
                            }">{{ form.description }}</p>

                            <!-- Status Badge -->
                            <div class="inline-flex items-center">
                              <div
                                class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold"
                                :class="{
                                  'bg-blue-100 text-blue-700': currentForm === form.id,
                                  'bg-green-100 text-green-700': form.completed,
                                  'bg-gray-100 text-gray-600': !form.completed && currentForm !== form.id
                                }"
                              >
                                <span v-if="form.completed">✓ Complete</span>
                                <span v-else-if="currentForm === form.id" class="flex items-center">
                                  <div class="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                                  In Progress
                                </span>
                                <span v-else>Not Started</span>
                              </div>
                            </div>

                            <!-- Progress indicator -->
                            <div v-if="form.progress > 0" class="mt-3">
                              <div class="w-full bg-gray-200 rounded-full h-2 shadow-inner">
                                <div
                                  class="h-2 rounded-full transition-all duration-500"
                                  :class="{
                                    'bg-gradient-to-r from-green-400 to-green-500': form.completed,
                                    'bg-gradient-to-r from-blue-400 to-blue-500': currentForm === form.id,
                                    'bg-gray-400': currentForm !== form.id && !form.completed
                                  }"
                                  :style="{ width: `${form.progress}%` }"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>

                      <!-- Expandable Subsections -->
                      <Transition name="expand">
                        <div v-if="expandedSections.includes(form.id)" class="border-t bg-gray-50 bg-opacity-50" :class="{
                          'border-blue-200': currentForm === form.id,
                          'border-green-200': form.completed,
                          'border-gray-200': !form.completed && currentForm !== form.id
                        }">
                          <div class="p-4 space-y-2">
                            <div
                              v-for="(subsection, subIndex) in form.subsections"
                              :key="subsection.id"
                            >
                              <button
                                @click="navigateToSubsection(form.id, subsection.id)"
                                type="button"
                                class="w-full text-left p-4 rounded-xl transition-all duration-200 active:scale-[0.98] min-h-[60px]"
                                :class="{
                                  'bg-blue-100 shadow-sm': currentForm === form.id,
                                  'bg-white shadow-sm': subsection.completed || (!subsection.completed && currentForm !== form.id)
                                }"
                              >
                                <div class="flex items-center space-x-4">
                                  <!-- Subsection Status Icon -->
                                  <div class="flex-shrink-0">
                                    <div
                                      v-if="subsection.completed"
                                      class="w-7 h-7 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-md"
                                    >
                                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                    <div
                                      v-else
                                      class="w-7 h-7 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center shadow-sm"
                                    >
                                      <span class="text-xs font-bold text-gray-600">{{ subIndex + 1 }}</span>
                                    </div>
                                  </div>

                                  <!-- Subsection Info -->
                                  <div class="flex-1 min-w-0">
                                    <p class="text-sm font-semibold text-gray-900 leading-tight break-words">{{ subsection.title }}</p>
                                  </div>

                                  <!-- Navigation Arrow -->
                                  <div class="flex-shrink-0">
                                    <div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                      <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </div>
                </div>
              </nav>
          </div>
        </div>
      </Transition>
            </div>
    </PhoneMockup>

    <!-- Toast Container -->
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from 'vue'
import PhoneMockup from '../components/PhoneMockup.vue'
import HeaderBar from '../components/HeaderBar.vue'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import ProjectSummaryForm from '../components/forms/ProjectSummaryForm.vue'
import SiteGroundsForm from '../components/forms/SiteGroundsForm.vue'
import BuildingEnvelopeForm from '../components/forms/BuildingEnvelopeForm.vue'
import MechanicalSystemsForm from '../components/forms/MechanicalSystemsForm.vue'
import InteriorConditionsForm from '../components/forms/InteriorConditionsForm.vue'
import NavigationSidebar from '../components/navigation/NavigationSidebar.vue'
import ToastContainer from '../components/ui/ToastContainer.vue'
import { useToast } from '../composables/useToast'

// Form management
const currentForm = ref('project-summary')
const sidebarOpen = ref(false)

// Form refs
const projectSummaryRef = ref(null)
const siteGroundsRef = ref(null)
const buildingEnvelopeRef = ref(null)
const mechanicalSystemsRef = ref(null)
const interiorConditionsRef = ref(null)

// Form data storage
const formData = reactive({
  projectSummary: {},
  siteGrounds: {},
  buildingEnvelope: {},
  mechanicalSystems: {},
  interiorConditions: {}
})

// Sidebar state
const expandedSections = ref<string[]>(['project-summary'])

// Toast functionality
const { showToast } = useToast()

// Form configuration
const forms = ref([
  {
    id: 'project-summary',
    title: 'Project Summary',
    description: 'Basic project information and location details',
    enabled: true,
    completed: false,
    progress: 0,
    subsections: [
      { id: 'basic-information', title: 'Basic Information', completed: false },
      { id: 'property-details', title: 'Property Details', completed: false },
      { id: 'documentation-personnel', title: 'Documentation & Personnel', completed: false },
      { id: 'red-flags-utilities', title: 'Red Flags & Utilities', completed: false }
    ]
  },
  {
    id: 'site-grounds',
    title: 'Site Grounds',
    description: 'Drainage, topography, and site improvements',
    enabled: true,
    completed: false,
    progress: 0,
    subsections: [
      { id: 'drainage-erosion-control', title: 'Drainage system & erosion control', completed: false },
      { id: 'topography-landscaping', title: 'Topography & Landscaping', completed: false },
      { id: 'general-site-improvements', title: 'General Site Improvements', completed: false },
      { id: 'other-structures', title: 'Other Structures', completed: false }
    ]
  },
  {
    id: 'building-envelope',
    title: 'Building Envelope',
    description: 'Exterior walls, roof, and structural elements',
    enabled: true,
    completed: false,
    progress: 0,
    subsections: [
      { id: 'foundations-substructures', title: 'Foundations/Substructures', completed: false },
      { id: 'superstructure', title: 'Superstructure', completed: false },
      { id: 'roofing', title: 'Roofing', completed: false },
      { id: 'exterior-walls', title: 'Exterior Walls', completed: false },
      { id: 'parking-paving-sidewalks', title: 'Parking, Paving, & Sidewalks', completed: false },
      { id: 'parking-garage-structure', title: 'Parking garage structure type', completed: false },
      { id: 'stairs-balconies-patios', title: 'Building stairs, balconies, & patios', completed: false },
      { id: 'windows', title: 'Windows', completed: false },
      { id: 'doors', title: 'Doors', completed: false },
      { id: 'swimming-pools-spas', title: 'Swimming pools and spas', completed: false }
    ]
  },
  {
    id: 'mechanical-systems',
    title: 'Mechanical Systems',
    description: 'HVAC, plumbing, and electrical systems',
    enabled: true,
    completed: false,
    progress: 0,
    subsections: [
      { id: 'hvac-individual-units', title: 'Hvac Individual Units', completed: false },
      { id: 'misc-units', title: 'Misc Units', completed: false },
      { id: 'chillers-cooling-towers', title: 'Chillers & Cooling Towers', completed: false },
      { id: 'boiler-heat', title: 'Boiler Heat', completed: false },
      { id: 'plumbing-systems', title: 'Plumbing Systems', completed: false },
      { id: 'water-heater-common', title: 'Water Heater - Common area', completed: false },
      { id: 'water-heater-tenant', title: 'Water Heater - Tenant spaces', completed: false },
      { id: 'boilers-plumbing-water', title: 'Boilers - Plumbing water', completed: false },
      { id: 'electric', title: 'Electric', completed: false },
      { id: 'elevators-conveying', title: 'Elevators and Conveying Systems', completed: false },
      { id: 'fire-protection', title: 'Fire Protection', completed: false }
    ]
  },
  {
    id: 'interior-conditions',
    title: 'Interior Conditions',
    description: 'Interior spaces, finishes, and fixtures',
    enabled: true,
    completed: false,
    progress: 0,
    subsections: [
      { id: 'commercial-tenant-finishes', title: 'Commercial Tenant unit finishes', completed: false },
      { id: 'common-area-finishes', title: 'Common Area finishes', completed: false },
      { id: 'furniture-fixtures-equipment', title: 'Furniture, Fixtures, and Equipment', completed: false },
      { id: 'mold', title: 'Mold', completed: false },
      { id: 'alternative-property-data', title: 'Alternative Property Specific Data', completed: false }
    ]
  }
])

// Computed properties for progress tracking
const completedFormsCount = computed(() => {
  return forms.value.filter(form => form.completed).length
})

const overallProgress = computed(() => {
  const totalForms = forms.value.length
  const completed = completedFormsCount.value
  return Math.round((completed / totalForms) * 100)
})

// Get current form ref
const getCurrentFormRef = () => {
  try {
    switch (currentForm.value) {
      case 'project-summary':
        return projectSummaryRef.value
      case 'site-grounds':
        return siteGroundsRef.value
      case 'building-envelope':
        return buildingEnvelopeRef.value
      case 'mechanical-systems':
        return mechanicalSystemsRef.value
      case 'interior-conditions':
        return interiorConditionsRef.value
      default:
        return null
    }
  } catch (error) {
    console.warn('Error accessing form ref:', error)
    return null
  }
}

// Navigation computed properties
const currentFormObj = computed(() => {
  return forms.value.find(f => f.id === currentForm.value)
})

const canGoBack = computed(() => {
  const formRef = getCurrentFormRef()
  if (formRef && 'canGoPrevious' in formRef && typeof (formRef as any).canGoPrevious !== 'undefined') {
    return (formRef as any).canGoPrevious
  }
  // Fallback for placeholder forms
  return false
})

const primaryActionText = computed(() => {
  const formRef = getCurrentFormRef()
  const formObj = currentFormObj.value
  
  // If form is completed, show navigation option
  if (formObj?.completed) {
    return 'Choose Next Section'
  }
  
  // If we're on the last step of a form, show navigation option
  if (formRef && 'currentStep' in formRef && 'totalSteps' in formRef && (formRef as any).currentStep && (formRef as any).totalSteps && (formRef as any).currentStep === (formRef as any).totalSteps) {
    return 'Choose Next Section'
  }
  
  // For placeholder forms, show navigation option
  if (!formRef && formObj) {
    return 'Choose Next Section'
  }
  
  // Otherwise show continue
  return 'Continue'
})

const primaryActionIcon = computed(() => {
  const formObj = currentFormObj.value
  const formRef = getCurrentFormRef()
  
  // If form is completed, show menu icon
  if (formObj?.completed) {
    return 'menu'
  }
  
  // If on last step, show menu icon
  if (formRef && 'currentStep' in formRef && 'totalSteps' in formRef && (formRef as any).currentStep && (formRef as any).totalSteps && (formRef as any).currentStep === (formRef as any).totalSteps) {
    return 'menu'
  }
  
  // For placeholder forms, show menu icon
  if (!formRef && formObj) {
    return 'menu'
  }
  
  return 'next'
})

// Methods
const toggleSidebar = () => {
  console.log('Toggle sidebar called, current state:', sidebarOpen.value)
  sidebarOpen.value = !sidebarOpen.value
  console.log('New sidebar state:', sidebarOpen.value)
}

const toggleSection = (sectionId: string) => {
  const index = expandedSections.value.indexOf(sectionId)
  if (index > -1) {
    expandedSections.value.splice(index, 1)
  } else {
    expandedSections.value.push(sectionId)
  }
}

const navigateToSubsection = (formId: string, subsectionId: string) => {
  // Check if this is a built form (Project Summary or Site Grounds)
  if (formId === 'project-summary' || formId === 'site-grounds') {
    // Navigate to form
    currentForm.value = formId

    // Wait for next tick to ensure form is mounted
    nextTick(() => {
      const formRef = getCurrentFormRef()
      if (formRef) {
        // Map subsection to step number
        const stepNumber = getStepFromSubsection(formId, subsectionId)
        if (stepNumber) {
          // Navigate directly to the specific step
          (formRef as any).currentStep = stepNumber
        }
      }
    })

    closeSidebar()
  } else {
    // Show toast for unbuilt sections
    showToast('This section is not built for this prototype', 'info', 3000)
  }
}

// Helper function to map subsections to step numbers
const getStepFromSubsection = (formId: string, subsectionId: string): number | null => {
  const stepMappings = {
    'project-summary': {
      'basic-information': 1,
      'property-details': 2,
      'documentation-personnel': 3,
      'red-flags-utilities': 4
    },
    'site-grounds': {
      'drainage-erosion-control': 1,
      'topography-landscaping': 2,
      'general-site-improvements': 3,
      'other-structures': 4
    }
  }

  return stepMappings[formId]?.[subsectionId] || null
}

const openSidebar = () => {
  sidebarOpen.value = true
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const selectForm = (formId: string) => {
  const form = forms.value.find(f => f.id === formId)
  if (form) {
    currentForm.value = formId
    closeSidebar()

    // Auto-expand the selected section
    if (!expandedSections.value.includes(formId)) {
      expandedSections.value.push(formId)
    }
  }
}

const completeForm = (formId: string) => {
  const form = forms.value.find(f => f.id === formId)
  if (form) {
    form.completed = true
    form.progress = 100
    
    // Enable the next form based on the completion logic
    enableNextForm(formId)
  }
}

const enableNextForm = (completedFormId: string) => {
  // Non-linear flow: all forms are always enabled after project summary exists
  // This function can be used for progress tracking if needed
  console.log(`Form completed: ${completedFormId}`)
}

// Navigation methods
const goBack = () => {
  const formRef = getCurrentFormRef()
  if (formRef && 'goToPreviousStep' in formRef && (formRef as any).goToPreviousStep) {
    (formRef as any).goToPreviousStep()
  }
}

const handlePrimaryAction = () => {
  const formObj = currentFormObj.value
  const formRef = getCurrentFormRef()
  
  // If form is already completed, open sidebar
  if (formObj?.completed) {
    openSidebar()
    return
  }
  
  // If we're on the last step, complete the form and open sidebar
  if (formRef && 'currentStep' in formRef && 'totalSteps' in formRef && (formRef as any).currentStep === (formRef as any).totalSteps) {
    completeForm(currentForm.value)
    openSidebar()
    return
  }
  
  // Otherwise, continue to next step
  if (formRef && 'goToNextStep' in formRef && (formRef as any).goToNextStep) {
    (formRef as any).goToNextStep()
  }
}

const handleFormNavigation = () => {
  // This is called when forms emit navigation events
  // We can add any additional logic here if needed
}

// Handle form submission
const handleSubmit = () => {
  console.log('Form submitted:', formData)
  // Handle final form submission
}
</script>

<style>
/* Form transition styles */
.form-transition-enter-active,
.form-transition-leave-active {
  transition: all 0.3s ease;
}

.form-transition-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.form-transition-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Ensure smooth transitions */
.form-transition-enter-to,
.form-transition-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* Essential form styles */
.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  letter-spacing: 0.025em;
}

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

.form-input:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #fefefe;
}

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

.form-navigation-button--disabled {
  background-color: #f9fafb;
  color: #9ca3af;
  border: 2px solid #e5e7eb;
  cursor: not-allowed;
  opacity: 0.6;
}

.form-navigation-button--disabled:hover {
  background-color: #f9fafb;
  border-color: #e5e7eb;
  color: #9ca3af;
  transform: none;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
}

.form-navigation-button--camera {
  background-color: #ffffff;
  color: #4b5563;
  border: 2px solid #e5e7eb;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  width: 56px;
  height: 56px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-navigation-button--camera:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
  color: #374151;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
}

/* Modern checkbox styles */
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

/* Dropdown and other essential styles */
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

/* Modern Mobile Sidebar Transitions */
.sidebar-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.sidebar-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}

.sidebar-enter-active .sidebar-content,
.sidebar-leave-active .sidebar-content {
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.sidebar-enter-from .sidebar-content,
.sidebar-leave-to .sidebar-content {
  transform: translateX(-100%);
}

/* Drawer transitions */
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

/* Form dropdown menu styles */
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

/* Modern scrollable card styles */
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

/* Modern status badges */
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

/* Slide fade animation */
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

/* Accordion/Collapse styles */
.collapse {
  visibility: visible;
  border-collapse: separate;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
}

.collapse-title {
  position: relative;
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 1rem 1.5rem;
  color: #1f2937;
  font-weight: 600;
  transition: all 0.2s ease;
}

.collapse-title:hover {
  background-color: #f9fafb;
}

.collapse-content {
  padding: 0 1.5rem 1.5rem 1.5rem;
  color: #4b5563;
  display: none;
}

.collapse-open .collapse-content {
  display: block;
}

/* DaisyUI base classes */
.bg-base-100 {
  background-color: #ffffff;
}

.border-base-300 {
  border-color: #e5e7eb;
}

/* Phone mockup containment */
.phone-mockup-container {
  position: relative;
  overflow: hidden;
  contain: layout style paint;
}

.phone-content {
  position: relative;
  overflow: hidden;
  height: 100%;
  contain: layout style paint;
}

/* Fixed phone mockup height for consistency */
.mockup-phone {
  height: 900px !important;
  max-height: 900px !important;
  min-height: 900px !important;
}

/* Mobile drawer styles */
.mobile-drawer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: white;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  box-shadow: 0 -10px 25px -5px rgba(0, 0, 0, 0.1), 0 -10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 80vh;
  overflow: hidden;
  contain: layout style paint;
}

.mobile-drawer-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 45;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

/* Calendar styles */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-top: 1rem;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.calendar-day-header {
  padding: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;
  color: #374151;
}

.calendar-day:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

.calendar-day--selected {
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
}

.calendar-day--today {
  border-color: #3b82f6;
  color: #3b82f6;
  font-weight: 600;
}

.calendar-day--other-month {
  color: #d1d5db;
}

/* Modern button styles */
.modern-add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.3);
}

.modern-add-button:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(59, 130, 246, 0.4);
}

.modern-remove-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.modern-remove-button:hover {
  background-color: #dc2626;
  transform: scale(1.05);
}

.modern-item-number {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  background-color: #f3f4f6;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
}

.modern-toggle-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
}

.modern-toggle-field:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

/* Comment button styles */
.comment-button {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  background-color: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
  cursor: pointer;
  transition: all 0.15s ease;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comment-button:hover {
  background-color: #e5e7eb;
  color: #374151;
}

.comment-button--active {
  background-color: #dbeafe;
  color: #1e40af;
  border-color: #93c5fd;
}

/* Problematic materials styles */
.problematic-details {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
}

.problematic-textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #374151;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s ease-in-out;
}

.problematic-textarea:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #fefefe;
}

.problematic-textarea::placeholder {
  color: #9ca3af;
  font-style: italic;
}

/* Modern Mobile Transitions */
.expand-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
}

.expand-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.expand-enter-to,
.expand-leave-from {
  max-height: 600px;
  opacity: 1;
  transform: translateY(0);
}

/* Mobile Touch Feedback */
.mobile-touch-feedback {
  transition: transform 0.1s ease;
}

.mobile-touch-feedback:active {
  transform: scale(0.98);
}

/* Pulse Animation for Active States */
@keyframes mobile-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.mobile-pulse {
  animation: mobile-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
