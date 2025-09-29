<template>
  <Transition name="toast">
    <div
      v-if="visible"
      class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full mx-4"
    >
      <div
        class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center space-x-3"
        :class="typeClasses"
      >
        <!-- Icon -->
        <div class="flex-shrink-0">
          <svg
            v-if="type === 'info'"
            class="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg
            v-else-if="type === 'warning'"
            class="w-5 h-5 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <svg
            v-else-if="type === 'error'"
            class="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg
            v-else
            class="w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <!-- Message -->
        <div class="flex-1 text-sm text-gray-700">
          {{ message }}
        </div>

        <!-- Close button -->
        <button
          @click="close"
          class="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

interface Props {
  visible: boolean
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 3000
})

const emit = defineEmits<{
  'close': []
}>()

const typeClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'border-green-200 bg-green-50'
    case 'error':
      return 'border-red-200 bg-red-50'
    case 'warning':
      return 'border-orange-200 bg-orange-50'
    default:
      return 'border-blue-200 bg-blue-50'
  }
})

const close = () => {
  emit('close')
}

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      close()
    }, props.duration)
  }
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>