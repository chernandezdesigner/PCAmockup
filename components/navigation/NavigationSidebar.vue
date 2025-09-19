<template>
  <!-- Sidebar Overlay -->
  <Transition name="sidebar-overlay">
    <div
      v-if="show"
      class="absolute inset-0 z-50 flex"
      @click="closeSidebar"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      <!-- Sidebar Content -->
      <Transition name="sidebar-content">
        <div
          v-if="show"
          class="relative w-80 h-full bg-white shadow-2xl"
          @click.stop
        >
          <!-- Sidebar Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 class="text-lg font-bold text-gray-900">Navigation</h2>
              <p class="text-sm text-gray-600">Jump to any form section</p>
            </div>
            <button
              @click="closeSidebar"
              class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Overall Progress -->
          <div class="p-6 border-b border-gray-200 bg-gray-50">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-medium text-gray-700">Overall Progress</span>
              <span class="text-sm text-gray-600">{{ completedFormsCount }}/{{ totalForms }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-600 h-2 rounded-full transition-all duration-500"
                :style="{ width: `${progressPercentage}%` }"
              ></div>
            </div>
            <p class="text-xs text-gray-600 mt-2">{{ progressPercentage }}% Complete</p>
          </div>

          <!-- Navigation List -->
          <div class="flex-1 overflow-y-auto p-4">
            <nav class="space-y-2">
              <!-- Home Link -->
              <NuxtLink
                to="/"
                class="nav-item"
                :class="{ 'nav-item--active': $route.path === '/' }"
                @click="handleNavigation('/')"
              >
                <div class="flex items-center">
                  <div class="nav-icon">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21l0-4a2 2 0 012-2h2a2 2 0 012 2l0 4" />
                    </svg>
                  </div>
                  <div class="flex-1 ml-3">
                    <div class="nav-title">Dashboard</div>
                    <div class="nav-subtitle">Overview & form selection</div>
                  </div>
                </div>
              </NuxtLink>

              <!-- Form Links -->
              <div
                v-for="(form, index) in navigationForms"
                :key="form.route"
                class="nav-item"
                :class="{
                  'nav-item--active': currentForm === form.key,
                  'nav-item--completed': form.completed
                }"
                @click="handleNavigation(form.route)"
              >
                <div class="flex items-center">
                  <div class="nav-icon">
                    <div v-if="form.completed" class="nav-status nav-status--completed">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div v-else-if="form.hasData" class="nav-status nav-status--in-progress">
                      <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <div v-else class="nav-status nav-status--pending">
                      <span class="text-xs font-bold">{{ index + 1 }}</span>
                    </div>
                  </div>
                  <div class="flex-1 ml-3">
                    <div class="nav-title">{{ form.title }}</div>
                    <div class="nav-subtitle">{{ form.description }}</div>
                  </div>
                </div>

                <!-- Form Progress Indicator -->
                <div v-if="form.hasData && !form.completed" class="ml-2">
                  <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            </nav>
          </div>

          <!-- Sidebar Footer -->
          <div class="p-4 border-t border-gray-200 bg-gray-50">
            <div class="flex items-center justify-between text-xs text-gray-600">
              <span>Last saved: {{ formattedLastSaved }}</span>
              <button
                @click="exportData"
                class="text-blue-600 hover:text-blue-800 font-medium"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  currentForm?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  navigate: [route: string]
}>()

const { forms, getCompletedFormsCount, hasFormData, getLastModified, exportAllFormData } = useFormState()

const navigationForms = [
  {
    key: 'project-summary',
    route: '/forms/project-summary',
    title: 'Project Summary',
    description: 'Basic project information',
    completed: computed(() => forms.value['project-summary']?.completed || false),
    hasData: computed(() => hasFormData('project-summary'))
  },
  {
    key: 'building-systems',
    route: '/forms/building-systems',
    title: 'Building Systems',
    description: 'HVAC, electrical, plumbing',
    completed: computed(() => forms.value['building-systems']?.completed || false),
    hasData: computed(() => hasFormData('building-systems'))
  },
  {
    key: 'structural-assessment',
    route: '/forms/structural-assessment',
    title: 'Structural Assessment',
    description: 'Foundation, roof, structure',
    completed: computed(() => forms.value['structural-assessment']?.completed || false),
    hasData: computed(() => hasFormData('structural-assessment'))
  },
  {
    key: 'environmental-hazards',
    route: '/forms/environmental-hazards',
    title: 'Environmental Hazards',
    description: 'Asbestos, lead, mold',
    completed: computed(() => forms.value['environmental-hazards']?.completed || false),
    hasData: computed(() => hasFormData('environmental-hazards'))
  },
  {
    key: 'maintenance-records',
    route: '/forms/maintenance-records',
    title: 'Maintenance Records',
    description: 'Service history, warranties',
    completed: computed(() => forms.value['maintenance-records']?.completed || false),
    hasData: computed(() => hasFormData('maintenance-records'))
  }
]

const totalForms = navigationForms.length
const completedFormsCount = computed(() => getCompletedFormsCount())
const progressPercentage = computed(() =>
  totalForms > 0 ? Math.round((completedFormsCount.value / totalForms) * 100) : 0
)

const formattedLastSaved = computed(() => {
  // Find the most recently modified form
  let lastModified = ''
  let mostRecent = new Date(0)

  navigationForms.forEach(form => {
    const modified = new Date(getLastModified(form.key))
    if (modified > mostRecent) {
      mostRecent = modified
      lastModified = getLastModified(form.key)
    }
  })

  if (!lastModified) return 'Never'

  const date = new Date(lastModified)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`

  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`

  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
})

const closeSidebar = () => {
  emit('close')
}

const handleNavigation = (route: string) => {
  emit('navigate', route)
}

const exportData = () => {
  const data = exportAllFormData()
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pca-forms-export-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
/* Sidebar Transitions */
.sidebar-overlay-enter-active,
.sidebar-overlay-leave-active {
  transition: all 0.3s ease;
}

.sidebar-overlay-enter-from,
.sidebar-overlay-leave-to {
  opacity: 0;
}

.sidebar-content-enter-active,
.sidebar-content-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sidebar-content-enter-from,
.sidebar-content-leave-to {
  transform: translateX(-100%);
}

/* Navigation Item Styles */
.nav-item {
  @apply block w-full p-4 rounded-xl transition-all duration-200 cursor-pointer;
  @apply bg-transparent hover:bg-gray-50 border-2 border-transparent;
}

.nav-item--active {
  @apply bg-blue-50 border-blue-200;
}

.nav-item--completed {
  @apply bg-green-50 border-green-200;
}

.nav-item--completed:hover {
  @apply bg-green-100;
}

.nav-icon {
  @apply flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100;
}

.nav-item--active .nav-icon {
  @apply bg-blue-100;
}

.nav-item--completed .nav-icon {
  @apply bg-green-100;
}

.nav-title {
  @apply text-sm font-semibold text-gray-900;
}

.nav-subtitle {
  @apply text-xs text-gray-600 mt-1;
}

.nav-status {
  @apply flex items-center justify-center w-6 h-6 rounded-full;
}

.nav-status--completed {
  @apply bg-green-600 text-white;
}

.nav-status--in-progress {
  @apply bg-yellow-100;
}

.nav-status--pending {
  @apply bg-gray-200 text-gray-600;
}
</style>