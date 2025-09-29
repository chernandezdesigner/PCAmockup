<template>
  <div class="fixed top-0 left-0 w-full z-50 pointer-events-none">
    <div class="flex flex-col items-center pt-20 space-y-2">
      <Toast
        v-for="toast in toasts"
        :key="toast.id"
        :visible="true"
        :message="toast.message"
        :type="toast.type"
        :duration="0"
        class="pointer-events-auto"
        @close="removeToast(toast.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Toast from './Toast.vue'
import { useToast } from '../../composables/useToast'

const { toasts, removeToast } = useToast()
</script>