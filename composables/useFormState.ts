export interface FormData {
  [key: string]: any
}

export interface FormState {
  completed: boolean
  data: FormData
  lastModified: string
  currentStep?: number
}

export interface FormsState {
  [formKey: string]: FormState
}

const STORAGE_KEY = 'pca-forms-state'

const defaultFormState: FormState = {
  completed: false,
  data: {},
  lastModified: new Date().toISOString(),
  currentStep: 1
}

const formKeys = [
  'project-summary',
  'building-systems',
  'structural-assessment',
  'environmental-hazards',
  'maintenance-records'
] as const

export type FormKey = typeof formKeys[number]

export const useFormState = () => {
  // Initialize reactive state
  const forms = ref<FormsState>({})

  // Initialize forms structure
  const initializeForms = () => {
    const savedState = process.client ? localStorage.getItem(STORAGE_KEY) : null

    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        forms.value = parsed
      } catch (error) {
        console.warn('Failed to parse saved form state:', error)
        resetForms()
      }
    } else {
      resetForms()
    }

    // Ensure all form keys exist
    formKeys.forEach(key => {
      if (!forms.value[key]) {
        forms.value[key] = { ...defaultFormState }
      }
    })
  }

  // Reset all forms to default state
  const resetForms = () => {
    forms.value = formKeys.reduce((acc, key) => {
      acc[key] = { ...defaultFormState }
      return acc
    }, {} as FormsState)
    saveToStorage()
  }

  // Save to localStorage
  const saveToStorage = () => {
    if (process.client) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(forms.value))
      } catch (error) {
        console.warn('Failed to save form state to localStorage:', error)
      }
    }
  }

  // Get form data for a specific form
  const getFormData = (formKey: FormKey): FormData => {
    return forms.value[formKey]?.data || {}
  }

  // Save form data for a specific form
  const saveFormData = (formKey: FormKey, data: FormData, completed: boolean = false) => {
    if (!forms.value[formKey]) {
      forms.value[formKey] = { ...defaultFormState }
    }

    forms.value[formKey] = {
      ...forms.value[formKey],
      data: { ...data },
      completed,
      lastModified: new Date().toISOString()
    }

    saveToStorage()
  }

  // Update form step
  const updateFormStep = (formKey: FormKey, step: number) => {
    if (!forms.value[formKey]) {
      forms.value[formKey] = { ...defaultFormState }
    }

    forms.value[formKey].currentStep = step
    forms.value[formKey].lastModified = new Date().toISOString()
    saveToStorage()
  }

  // Mark form as completed
  const markFormCompleted = (formKey: FormKey) => {
    if (!forms.value[formKey]) {
      forms.value[formKey] = { ...defaultFormState }
    }

    forms.value[formKey].completed = true
    forms.value[formKey].lastModified = new Date().toISOString()
    saveToStorage()
  }

  // Get completed forms count
  const getCompletedFormsCount = (): number => {
    return Object.values(forms.value).filter(form => form.completed).length
  }

  // Get overall progress percentage
  const getOverallProgress = (): number => {
    const total = formKeys.length
    const completed = getCompletedFormsCount()
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  // Check if form has data
  const hasFormData = (formKey: FormKey): boolean => {
    const data = getFormData(formKey)
    return Object.keys(data).length > 0
  }

  // Get form completion status
  const isFormCompleted = (formKey: FormKey): boolean => {
    return forms.value[formKey]?.completed || false
  }

  // Get current step for form
  const getCurrentStep = (formKey: FormKey): number => {
    return forms.value[formKey]?.currentStep || 1
  }

  // Get last modified date for form
  const getLastModified = (formKey: FormKey): string => {
    return forms.value[formKey]?.lastModified || new Date().toISOString()
  }

  // Export all form data (for submission/review)
  const exportAllFormData = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      overallProgress: getOverallProgress(),
      forms: {}
    }

    formKeys.forEach(key => {
      exportData.forms[key] = {
        completed: isFormCompleted(key),
        lastModified: getLastModified(key),
        data: getFormData(key)
      }
    })

    return exportData
  }

  // Clear all form data
  const clearAllData = () => {
    resetForms()
  }

  // Initialize on composable creation
  if (process.client) {
    initializeForms()
  }

  return {
    forms: readonly(forms),
    formKeys,

    // Data operations
    getFormData,
    saveFormData,
    hasFormData,

    // Step operations
    updateFormStep,
    getCurrentStep,

    // Completion operations
    markFormCompleted,
    isFormCompleted,
    getCompletedFormsCount,
    getOverallProgress,

    // Utility operations
    getLastModified,
    exportAllFormData,
    clearAllData,
    resetForms,

    // Initialization
    initializeForms
  }
}