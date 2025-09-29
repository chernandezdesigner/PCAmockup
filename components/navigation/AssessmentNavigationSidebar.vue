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

        <!-- Search Bar -->
        <div class="p-4 border-b border-gray-100">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search sections..."
              class="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
          </div>
        </div>

        <!-- Progress Overview -->
        <div class="p-4 border-b border-gray-100">
          <div class="flex items-center justify-between text-sm text-gray-600">
            <span class="font-medium">Progress Overview</span>
            <span class="font-semibold">1/6</span>
          </div>
        </div>

        <!-- Navigation Items -->
        <nav class="flex-1 overflow-y-auto">
          <div class="p-2">
            <div
              v-for="section in filteredSections"
              :key="section.id"
              class="mb-2"
            >
              <!-- Section Header -->
              <div
                class="section-item"
                @click="toggleSection(section.id)"
              >
                <div class="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-lg">
                  <div class="flex items-center space-x-3 flex-1">
                    <!-- Status Icon -->
                    <div class="flex-shrink-0">
                      <div
                        v-if="section.status === 'completed'"
                        class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div
                        v-else-if="section.status === 'in_progress'"
                        class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                      >
                        <div class="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div
                        v-else
                        class="w-5 h-5 border-2 border-gray-300 rounded-full"
                      ></div>
                    </div>

                    <!-- Section Info -->
                    <div class="flex-1 min-w-0">
                      <h3 class="font-medium text-sm text-gray-900">{{ section.title }}</h3>
                      <p class="text-xs text-gray-500">{{ section.completedItems }}/{{ section.totalItems }} items</p>
                    </div>
                  </div>

                  <!-- Status Badge and Expand Icon -->
                  <div class="flex items-center space-x-2">
                    <span
                      class="text-xs px-2 py-1 rounded-full font-medium"
                      :class="getStatusBadgeClass(section.status)"
                    >
                      {{ getStatusText(section.status) }}
                    </span>
                    <svg
                      class="w-4 h-4 text-gray-400 transition-transform duration-200"
                      :class="{ 'rotate-180': expandedSections.includes(section.id) }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <!-- Progress Bar -->
                <div v-if="section.progress > 0" class="px-3 pb-3">
                  <div class="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      class="h-1.5 rounded-full transition-all duration-300 bg-blue-500"
                      :style="{ width: `${section.progress}%` }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Expandable Substeps -->
              <Transition name="expand">
                <div v-if="expandedSections.includes(section.id)" class="ml-8 space-y-1 mb-2">
                  <div
                    v-for="substep in section.substeps"
                    :key="substep.id"
                    class="substep-item"
                    :class="{ 'substep-item--current': currentStep === substep.id }"
                    @click="navigateToStep(substep.id, section.id)"
                  >
                    <div class="flex items-center space-x-3 p-2 cursor-pointer rounded hover:bg-gray-50">
                      <!-- Substep Status Icon -->
                      <div class="flex-shrink-0">
                        <div
                          v-if="substep.completed"
                          class="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div
                          v-else-if="currentStep === substep.id"
                          class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
                        >
                          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <div
                          v-else
                          class="w-4 h-4 border-2 border-gray-300 rounded-full"
                        ></div>
                      </div>

                      <!-- Substep Content -->
                      <div class="flex-1 min-w-0">
                        <p class="text-sm text-gray-700">{{ substep.title }}</p>
                        <p v-if="substep.inputs" class="text-xs text-gray-500">{{ substep.inputs.length }} inputs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </nav>

        <!-- Footer -->
        <div class="border-t border-gray-200 p-4 bg-gray-50">
          <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
            <div>
              <span class="font-medium">Assessment Progress</span>
            </div>
            <div class="text-sm font-semibold">
              34%
            </div>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-green-500 h-2 rounded-full transition-all duration-300"
              style="width: 34%"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Props
interface SubStep {
  id: string
  title: string
  completed: boolean
  inputs?: string[]
}

interface Section {
  id: string
  title: string
  status: 'not_started' | 'in_progress' | 'completed' | 'needs_attention'
  progress: number
  totalItems: number
  completedItems: number
  substeps: SubStep[]
}

interface Props {
  isOpen: boolean
  currentStep?: string
  sections: Section[]
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'close': []
  'navigate-to-step': [stepId: string, sectionId: string]
}>()

// Reactive state
const searchQuery = ref('')
const expandedSections = ref<string[]>([])

// Computed properties
const filteredSections = computed(() => {
  if (!searchQuery.value.trim()) {
    return props.sections
  }

  const query = searchQuery.value.toLowerCase()
  return props.sections.filter(section => {
    // Search in section title
    if (section.title.toLowerCase().includes(query)) return true

    // Search in substep titles
    return section.substeps.some(substep =>
      substep.title.toLowerCase().includes(query) ||
      (substep.inputs && substep.inputs.some(input =>
        input.toLowerCase().includes(query)
      ))
    )
  })
})


// Methods
const closeSidebar = () => {
  emit('close')
}

const toggleSection = (sectionId: string) => {
  const index = expandedSections.value.indexOf(sectionId)
  if (index > -1) {
    expandedSections.value.splice(index, 1)
  } else {
    expandedSections.value.push(sectionId)
  }
}

const navigateToStep = (stepId: string, sectionId: string) => {
  emit('navigate-to-step', stepId, sectionId)
  closeSidebar()
}


const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'in_progress':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'completed'
    case 'in_progress':
      return 'in progress'
    default:
      return 'not started'
  }
}
</script>

<style scoped>
.section-item {
  @apply border border-gray-200 rounded-lg transition-all duration-200;
}

.section-item--completed {
  @apply border-green-200 bg-green-50;
}

.section-item--in-progress {
  @apply border-blue-200 bg-blue-50;
}

.section-item--needs-attention {
  @apply border-red-200 bg-red-50;
}

.section-item--not-started {
  @apply border-gray-200 bg-white hover:bg-gray-50;
}

.substep-item {
  @apply transition-colors duration-150;
}

.substep-item--current {
  @apply bg-blue-50 rounded;
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

/* Expand Transitions */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>