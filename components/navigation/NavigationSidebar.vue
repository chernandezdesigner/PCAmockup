<template>
  <!-- Sidebar Overlay -->
  <Transition name="sidebar">
    <div v-if="isOpen" class="fixed inset-0 z-50 lg:hidden">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        @click="closeSidebar"
      ></div>
      
      <!-- Sidebar Content -->
      <div class="fixed inset-y-0 left-0 w-80 bg-white shadow-xl transform transition-transform">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
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
        <nav class="p-6">
          <div class="space-y-3">
            <div
              v-for="form in forms"
              :key="form.id"
              class="navigation-item"
              :class="{
                'navigation-item--active': currentForm === form.id,
                'navigation-item--completed': form.completed,
                'navigation-item--disabled': !form.enabled
              }"
            >
              <button
                @click="selectForm(form.id)"
                type="button"
                class="w-full text-left p-4 rounded-lg transition-all duration-200"
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
                  
                  <!-- Progress Indicator -->
                  <div class="flex-shrink-0 ml-3">
                    <div v-if="form.progress !== undefined" class="text-xs">
                      {{ form.progress }}%
                    </div>
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
                
                <!-- Progress Bar -->
                <div v-if="form.progress !== undefined && form.progress > 0" class="mt-3">
                  <div class="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      class="h-1.5 rounded-full transition-all duration-300"
                      :class="{
                        'bg-green-500': form.completed,
                        'bg-blue-500': currentForm === form.id,
                        'bg-gray-400': !form.completed && currentForm !== form.id
                      }"
                      :style="{ width: `${form.progress}%` }"
                    ></div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </nav>
        
        <!-- Footer -->
        <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between text-sm text-gray-600">
            <div>
              <span class="font-medium">{{ completedCount }}/{{ totalForms }}</span> sections completed
            </div>
            <div class="text-xs">
              {{ Math.round(overallProgress) }}% complete
            </div>
          </div>
          <div class="mt-2">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${overallProgress}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
interface Form {
  id: string
  title: string
  description: string
  enabled: boolean
  completed: boolean
  progress?: number
}

interface Props {
  isOpen: boolean
  currentForm: string
  forms: Form[]
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'close': []
  'select-form': [formId: string]
}>()

// Computed properties
const completedCount = computed(() => {
  return props.forms.filter(form => form.completed).length
})

const totalForms = computed(() => {
  return props.forms.length
})

const overallProgress = computed(() => {
  if (totalForms.value === 0) return 0
  
  const totalProgress = props.forms.reduce((sum, form) => {
    if (form.completed) return sum + 100
    return sum + (form.progress || 0)
  }, 0)
  
  return totalProgress / totalForms.value
})

// Methods
const closeSidebar = () => {
  emit('close')
}

const selectForm = (formId: string) => {
  const form = props.forms.find(f => f.id === formId)
  if (form && form.enabled) {
    emit('select-form', formId)
    closeSidebar()
  }
}
</script>

<style scoped>
.navigation-item {
  border: 1px solid transparent;
  border-radius: 0.5rem;
}

.navigation-item--active {
  @apply border-blue-200;
}

.navigation-item--completed {
  @apply border-green-200;
}

.navigation-item--disabled {
  @apply border-gray-100;
}

/* Sidebar Transitions */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: opacity 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}

.sidebar-enter-active .fixed.inset-y-0,
.sidebar-leave-active .fixed.inset-y-0 {
  transition: transform 0.3s ease;
}

.sidebar-enter-from .fixed.inset-y-0,
.sidebar-leave-to .fixed.inset-y-0 {
  transform: translateX(-100%);
}
</style>
