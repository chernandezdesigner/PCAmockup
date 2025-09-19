<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <PhoneMockup>
      <div class="flex flex-col w-full h-full">
        <HeaderBar
          :title="title"
          @toggle-sidebar="toggleSidebar"
        />

        <Breadcrumbs
          :current-step="currentStep"
          :total-steps="totalSteps"
        />

        <!-- Form Container -->
        <form @submit.prevent="handleSubmit" class="flex flex-col flex-1 min-h-0 bg-gray-50">
          <!-- Scrollable Content Area -->
          <div class="flex-1 px-6 py-6 space-y-8 overflow-y-auto min-h-0">
            <!-- Form Header -->
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ title }}</h2>
              <p class="text-base text-gray-600">{{ description }}</p>
            </div>

            <!-- Form Content Slot -->
            <slot />
          </div>

          <!-- Sticky Navigation Buttons -->
          <div class="sticky bottom-0 px-6 py-6 border-t border-gray-200 bg-white/95 backdrop-blur-sm shadow-2xl">
            <div class="flex gap-4">
              <button
                v-if="showBackButton"
                @click="goBack"
                type="button"
                class="form-navigation-button form-navigation-button--secondary"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                {{ backButtonText }}
              </button>

              <button
                @click="goNext"
                type="button"
                class="form-navigation-button form-navigation-button--primary"
                :class="{ 'flex-1': !showBackButton }"
              >
                <span class="font-semibold">{{ nextButtonText }}</span>
                <svg v-if="!isLastStep" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <!-- Navigation Sidebar -->
      <NavigationSidebar
        :show="showSidebar"
        :current-form="formKey"
        @close="closeSidebar"
        @navigate="handleSidebarNavigation"
      />
    </PhoneMockup>
  </div>
</template>

<script setup lang="ts">
import PhoneMockup from '~/components/PhoneMockup.vue'
import HeaderBar from '~/components/HeaderBar.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import NavigationSidebar from '~/components/navigation/NavigationSidebar.vue'

interface Props {
  title: string
  description: string
  formKey: string
  currentStep: number
  totalSteps: number
  showBackButton?: boolean
  backButtonText?: string
  nextButtonText?: string
  backRoute?: string
  nextRoute?: string
}

const props = withDefaults(defineProps<Props>(), {
  showBackButton: true,
  backButtonText: 'Back',
  nextButtonText: 'Continue',
  backRoute: '',
  nextRoute: ''
})

const emit = defineEmits<{
  'go-back': []
  'go-next': []
  'form-submit': []
}>()

const showSidebar = ref(false)

const isLastStep = computed(() => props.currentStep === props.totalSteps)

const showBackButton = computed(() => {
  return props.showBackButton && (props.currentStep > 1 || props.backRoute)
})

const nextButtonText = computed(() => {
  if (props.nextButtonText && props.nextButtonText !== 'Continue') {
    return props.nextButtonText
  }
  return isLastStep.value ? 'Complete Section' : 'Continue'
})

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const closeSidebar = () => {
  showSidebar.value = false
}

const goBack = () => {
  if (props.backRoute) {
    navigateTo(props.backRoute)
  } else {
    emit('go-back')
  }
}

const goNext = () => {
  if (props.nextRoute) {
    navigateTo(props.nextRoute)
  } else {
    emit('go-next')
  }
}

const handleSubmit = () => {
  emit('form-submit')
}

const handleSidebarNavigation = (route: string) => {
  closeSidebar()
  navigateTo(route)
}
</script>

<style scoped>
/* Form Navigation Button Styles */
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
</style>