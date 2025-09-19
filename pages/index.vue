<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-50">
    <PhoneMockup>
      <div class="flex flex-col w-full h-full">
        <HeaderBar />

        <!-- Landing Page Content -->
        <div class="flex-1 flex flex-col justify-center items-center px-6 py-8">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-2">Property Condition Assessment</h1>
            <p class="text-base text-gray-600">Select a form section to begin or continue your inspection</p>
          </div>

          <!-- Form Selection Grid -->
          <div class="w-full space-y-4">
            <NuxtLink
              v-for="form in availableForms"
              :key="form.route"
              :to="form.route"
              class="form-section-card"
              :class="{ 'form-section-card--completed': form.completed }"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 mb-1">{{ form.title }}</h3>
                  <p class="text-sm text-gray-600">{{ form.description }}</p>
                </div>
                <div class="ml-4 flex items-center">
                  <div v-if="form.completed" class="text-green-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div v-else class="text-gray-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Overall Progress -->
          <div class="w-full mt-8 p-4 bg-white rounded-xl border border-gray-200">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Overall Progress</span>
              <span class="text-sm text-gray-600">{{ completedFormsCount }}/{{ totalForms }} sections</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${progressPercentage}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </PhoneMockup>
  </div>
</template>

<script setup lang="ts">
import PhoneMockup from '~/components/PhoneMockup.vue'
import HeaderBar from '~/components/HeaderBar.vue'

const { forms, getCompletedFormsCount } = useFormState()

const availableForms = [
  {
    route: '/forms/project-summary',
    title: 'Project Summary',
    description: 'Basic project information and location details',
    completed: forms.value['project-summary']?.completed || false
  },
  {
    route: '/forms/building-systems',
    title: 'Building Systems',
    description: 'HVAC, electrical, plumbing, and mechanical systems',
    completed: forms.value['building-systems']?.completed || false
  },
  {
    route: '/forms/structural-assessment',
    title: 'Structural Assessment',
    description: 'Foundation, roof, and structural elements',
    completed: forms.value['structural-assessment']?.completed || false
  },
  {
    route: '/forms/environmental-hazards',
    title: 'Environmental Hazards',
    description: 'Asbestos, lead, mold, and hazardous materials',
    completed: forms.value['environmental-hazards']?.completed || false
  },
  {
    route: '/forms/maintenance-records',
    title: 'Maintenance Records',
    description: 'Service history, warranties, and documentation',
    completed: forms.value['maintenance-records']?.completed || false
  }
]

const totalForms = availableForms.length
const completedFormsCount = computed(() => getCompletedFormsCount())
const progressPercentage = computed(() =>
  totalForms > 0 ? Math.round((completedFormsCount.value / totalForms) * 100) : 0
)
</script>

<style scoped>
.form-section-card {
  @apply block w-full p-5 bg-white rounded-xl border-2 border-gray-200 transition-all duration-200;
  @apply hover:border-blue-300 hover:shadow-md;
}

.form-section-card--completed {
  @apply border-green-300 bg-green-50;
}

.form-section-card--completed:hover {
  @apply border-green-400;
}
</style>