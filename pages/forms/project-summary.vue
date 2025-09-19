<template>
  <FormLayout
    title="Project Summary"
    description="Enter basic project information and location details"
    form-key="project-summary"
    :current-step="currentStep"
    :total-steps="totalSteps"
  >
    <FormProjectSummary
      v-model:current-step="currentStep"
      v-model:form-data="formData"
      @form-completed="handleFormCompleted"
    />
  </FormLayout>
</template>

<script setup lang="ts">
import FormLayout from '~/components/layouts/FormLayout.vue'
import FormProjectSummary from '~/components/forms/FormProjectSummary.vue'

const { saveFormData, getFormData } = useFormState()

const currentStep = ref(1)
const totalSteps = ref(4)
const formData = ref(getFormData('project-summary') || {})

const handleFormCompleted = () => {
  saveFormData('project-summary', formData.value, true)
  navigateTo('/forms/building-systems')
}

// Auto-save form data on changes
watch(formData, (newData) => {
  saveFormData('project-summary', newData, false)
}, { deep: true })
</script>