<template>
    <div class="w-full px-4 py-2 bg-gray-100 text-sm text-gray-600">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <span class="opacity-75">Assessment</span>
                <span class="opacity-75">&gt;</span>
                <span>{{ currentFormTitle }}</span>
            </div>
            <div class="flex space-x-1">
                <div 
                    v-for="form in forms" 
                    :key="form.id"
                    class="w-2 h-2 rounded-full transition-colors duration-200"
                    :class="{
                        'bg-green-500': form.completed,
                        'bg-blue-500': form.id === currentForm && !form.completed,
                        'bg-gray-300': form.id !== currentForm && !form.completed
                    }"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Form {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    completed: boolean;
    progress?: number;
}

interface Props {
    currentForm: string;
    forms: Form[];
}

const props = defineProps<Props>();

const currentFormTitle = computed(() => {
    const form = props.forms.find(f => f.id === props.currentForm);
    return form ? form.title : 'Unknown Form';
});
</script>
