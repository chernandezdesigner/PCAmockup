<template>
    <div class="w-full px-4 py-2 bg-gray-100 text-sm text-gray-600">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <span class="opacity-75">Assessment</span>
                <span class="opacity-75">&gt;</span>
                <span>Step {{ currentStep }} of {{ totalSteps }}</span>
            </div>
            <div class="flex space-x-1">
                <div 
                    v-for="step in totalSteps" 
                    :key="step"
                    class="w-2 h-2 rounded-full transition-colors duration-200"
                    :class="step <= currentStep ? 'bg-blue-500' : 'bg-gray-300'"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    currentStep: number;
    totalSteps: number;
}

defineProps<Props>();
</script>
