<template>
  <header class="flex items-center justify-between p-4 border-b mt-8">
    <button
      @click="toggleSidebar"
      class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="Toggle navigation menu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <div class="flex-1 text-center">
      <h1 class="text-lg font-semibold text-gray-900">{{ displayTitle }}</h1>
      <div v-if="showProgress" class="w-16 h-1 bg-gray-200 rounded-full mx-auto mt-1">
        <div
          class="h-1 bg-blue-600 rounded-full transition-all duration-300"
          :style="{ width: `${progressWidth}%` }"
        ></div>
      </div>
    </div>

    <button
      class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="Open photo gallery"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </button>
  </header>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  showProgress?: boolean
  currentStep?: number
  totalSteps?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'PCA Mobile',
  showProgress: false,
  currentStep: 1,
  totalSteps: 1
})

const emit = defineEmits<{
  'toggle-sidebar': []
}>()

const route = useRoute()

const displayTitle = computed(() => {
  if (props.title && props.title !== 'PCA Mobile') {
    return props.title
  }

  // Auto-generate title from route
  if (route.path === '/') {
    return 'Dashboard'
  }

  const formKey = route.path.split('/').pop()
  const formTitles = {
    'project-summary': 'Project Summary',
    'building-systems': 'Building Systems',
    'structural-assessment': 'Structural Assessment',
    'environmental-hazards': 'Environmental Hazards',
    'maintenance-records': 'Maintenance Records'
  }

  return formTitles[formKey] || 'PCA Mobile'
})

const progressWidth = computed(() => {
  if (!props.showProgress || props.totalSteps === 0) return 0
  return Math.round((props.currentStep / props.totalSteps) * 100)
})

const toggleSidebar = () => {
  emit('toggle-sidebar')
}
</script>