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
              <!-- Back Button -->
                          <button
                v-if="canGoBack"
                @click="goBack"
                            type="button"
                class="form-navigation-button form-navigation-button--secondary"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                Back
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
            
            <!-- Sidebar Content -->
            <div class="absolute inset-y-0 left-0 w-80 bg-white shadow-xl transform transition-transform sidebar-content">
              <!-- Header -->
              <div class="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Assessment Sections</h2>
                          <button
                  @click="closeSidebar"
                            type="button"
                  class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close navigation menu"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                      </div>

              <!-- Navigation Items -->
              <nav class="p-4 overflow-y-auto" style="height: calc(100% - 80px);">
                <div class="space-y-3">
                  <div
                    v-for="form in forms"
                    :key="form.id"
                    class="navigation-item"
                  >
                          <button
                      @click="selectForm(form.id)"
                            type="button"
                      class="w-full text-left p-4 rounded-lg transition-all duration-200 border"
                      :disabled="!form.enabled"
                      :class="{
                        'bg-blue-50 border-blue-200 text-blue-900': currentForm === form.id,
                        'bg-green-50 border-green-200 text-green-900': form.completed && currentForm !== form.id,
                        'bg-white border-gray-200 text-gray-900 hover:bg-gray-50': form.enabled && currentForm !== form.id && !form.completed,
                        'bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed': !form.enabled
                      }"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                          <!-- Status Icon -->
                          <div class="flex-shrink-0">
                            <div
                              v-if="form.completed"
                              class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                            <div
                              v-else-if="currentForm === form.id"
                              class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                            >
                              <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                  </div>
                                  <div
                              v-else-if="form.enabled"
                              class="w-6 h-6 border-2 border-gray-300 rounded-full"
                            ></div>
                            <div
                              v-else
                              class="w-6 h-6 border-2 border-gray-200 rounded-full bg-gray-100"
                            ></div>
                        </div>

                          <!-- Form Info -->
                          <div class="flex-1">
                            <h3 class="font-medium text-sm">{{ form.title }}</h3>
                            <p class="text-xs opacity-75 mt-1">{{ form.description }}</p>
                          </div>
                        </div>

                        <!-- Arrow -->
                        <div class="flex-shrink-0 ml-3">
                          <svg
                            v-if="form.enabled"
                            class="w-4 h-4 opacity-50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
          </div>
              </button>
            </div>
                </div>
              </nav>
          </div>
        </div>
      </Transition>
            </div>
    </PhoneMockup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import PhoneMockup from '../components/PhoneMockup.vue'
import HeaderBar from '../components/HeaderBar.vue'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import ProjectSummaryForm from '../components/forms/ProjectSummaryForm.vue'
import SiteGroundsForm from '../components/forms/SiteGroundsForm.vue'
import BuildingEnvelopeForm from '../components/forms/BuildingEnvelopeForm.vue'
import MechanicalSystemsForm from '../components/forms/MechanicalSystemsForm.vue'
import InteriorConditionsForm from '../components/forms/InteriorConditionsForm.vue'
import NavigationSidebar from '../components/navigation/NavigationSidebar.vue'

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

// Form configuration
const forms = ref([
  {
    id: 'project-summary',
    title: 'Project Summary',
    description: 'Basic project information and location details',
    enabled: true,
    completed: false,
    progress: 0
  },
  {
    id: 'site-grounds',
    title: 'Site Grounds',
    description: 'Drainage, topography, and site improvements',
    enabled: false,
    completed: false,
    progress: 0
  },
  {
    id: 'building-envelope',
    title: 'Building Envelope',
    description: 'Exterior walls, roof, and structural elements',
    enabled: false,
    completed: false,
    progress: 0
  },
  {
    id: 'mechanical-systems',
    title: 'Mechanical Systems',
    description: 'HVAC, plumbing, and electrical systems',
    enabled: false,
    completed: false,
    progress: 0
  },
  {
    id: 'interior-conditions',
    title: 'Interior Conditions',
    description: 'Interior spaces, finishes, and fixtures',
    enabled: false,
    completed: false,
    progress: 0
  }
])

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

const openSidebar = () => {
  sidebarOpen.value = true
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const selectForm = (formId: string) => {
  const form = forms.value.find(f => f.id === formId)
  if (form && form.enabled) {
    currentForm.value = formId
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
  // After Project Summary is complete, enable all other forms
  if (completedFormId === 'project-summary') {
    forms.value.forEach(form => {
      if (form.id !== 'project-summary') {
        form.enabled = true
      }
    })
  }
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

/* Sidebar transitions */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: opacity 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}

.sidebar-enter-active .absolute.inset-y-0,
.sidebar-leave-active .absolute.inset-y-0 {
  transition: transform 0.3s ease;
}

.sidebar-enter-from .absolute.inset-y-0,
.sidebar-leave-to .absolute.inset-y-0 {
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
</style>
