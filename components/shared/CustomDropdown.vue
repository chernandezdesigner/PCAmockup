<template>
  <div class="relative">
    <label v-if="label" class="form-label">{{ label }}</label>
    <button
      @click="toggleDropdown"
      type="button"
      class="form-dropdown-button"
      :class="{ 'form-dropdown-button--active': showDropdown }"
    >
      <span class="text-gray-700">{{ displayValue || placeholder }}</span>
      <svg
        class="w-4 h-4 text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': showDropdown }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <Transition name="dropdown">
      <div
        v-if="showDropdown"
        class="form-dropdown-menu"
      >
        <div class="py-1">
          <button
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option.value)"
            type="button"
            class="form-dropdown-item"
            :class="{ 'form-dropdown-item--selected': modelValue === option.value }"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
}

interface Props {
  modelValue: string
  options: Option[]
  placeholder?: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  label: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const showDropdown = ref(false)

const displayValue = computed(() => {
  const selected = props.options.find(option => option.value === props.modelValue)
  return selected?.label || ''
})

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const selectOption = (value: string) => {
  emit('update:modelValue', value)
  showDropdown.value = false
}

// Close dropdown when clicking outside
const closeDropdownOnOutsideClick = (event: Event) => {
  if (!(event.target as Element).closest('.relative')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdownOnOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdownOnOutsideClick)
})
</script>

<style scoped>
/* Form Label Styles */
.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  letter-spacing: 0.025em;
}

/* Dropdown Button Styles */
.form-dropdown-button {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #1f2937;
  background-color: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: all 0.2s ease-in-out;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-height: 52px;
}

.form-dropdown-button:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #fefefe;
}

.form-dropdown-button:hover:not(:focus) {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

.form-dropdown-button--active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #fefefe;
}

/* Dropdown Menu Styles */
.form-dropdown-menu {
  position: absolute;
  z-index: 50;
  width: 100%;
  margin-top: 0.5rem;
  background-color: white;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 16rem;
  overflow-y: auto;
  backdrop-filter: blur(8px);
}

.form-dropdown-item {
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
  transition: all 0.15s ease;
  cursor: pointer;
  border: none;
  background: none;
}

.form-dropdown-item:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

.form-dropdown-item:focus {
  background-color: #e0e7ff;
  color: #3730a3;
  outline: none;
}

.form-dropdown-item--selected {
  background-color: #dbeafe;
  color: #1e40af;
  font-weight: 600;
}

/* Dropdown transition */
.dropdown-enter-active {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dropdown-leave-active {
  transition: all 0.2s ease-in;
}

.dropdown-enter-from {
  transform: translateY(-8px) scale(0.95);
  opacity: 0;
}

.dropdown-leave-to {
  transform: translateY(-8px) scale(0.95);
  opacity: 0;
}

/* Mobile-optimized touch targets */
@media (max-width: 768px) {
  .form-dropdown-button {
    min-height: 48px;
  }
}
</style>