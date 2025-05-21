import {afterEach, describe, expect, it, vi} from 'vitest'
import { ref, computed } from 'vue'
import { useFormField } from "../../lib/utils/composable"
import * as formElementsModule from "../../lib/utils/default-form-elements"
import createFormattedSchema from "../../lib/utils/format-schema";

describe('useFormField composable functions test suite', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mockSchema = ref([
    {
      $formkit: 'text',
      label: 'initial',
      placeholder: 'enter',
      validation: '',
      help: 'this is help text',
      description: 'single line text field',
      number: 'integer',
      step: 0,
      multiple: false,
      options: ['one'],
      min: 0,
      max: 10,
    },
  ])
  const selectedIndex = ref(0)
  // Fields reference the same object as mockSchema
  const fields = mockSchema

  const selectedField = computed(() => mockSchema.value[selectedIndex.value])

  it('should get and set label', async () => {
    vi.spyOn(formElementsModule, 'formSchema', 'get').mockReturnValue(mockSchema)
    vi.spyOn(formElementsModule, 'selectedIndex', 'get').mockReturnValue(selectedIndex)
    // Mutate directly on the reactive object
    mockSchema.value[selectedIndex.value].label = 'new label'

    const { label } = useFormField(selectedField, selectedIndex, fields)
    expect(label.value).toBe('new label')
  })

  it('should get and set placeholder', async () => {
    vi.spyOn(formElementsModule, 'formSchema', 'get').mockReturnValue(mockSchema)
    vi.spyOn(formElementsModule, 'selectedIndex', 'get').mockReturnValue(selectedIndex)

    mockSchema.value[selectedIndex.value].placeholder = 'new placeholder'

    const { placeholder } = useFormField(selectedField, selectedIndex, fields)
    expect(placeholder.value).toBe('new placeholder')
  })

  it('should get and set help', async () => {
    vi.spyOn(formElementsModule, 'formSchema', 'get').mockReturnValue(mockSchema)
    vi.spyOn(formElementsModule, 'selectedIndex', 'get').mockReturnValue(selectedIndex)

    mockSchema.value[selectedIndex.value].help = 'new help'

    const { help } = useFormField(selectedField, selectedIndex, fields)
    expect(help.value).toBe('new help')
  })

  it('should get and set number type and step', async () => {
    vi.spyOn(formElementsModule, 'formSchema', 'get').mockReturnValue(mockSchema)
    vi.spyOn(formElementsModule, 'selectedIndex', 'get').mockReturnValue(selectedIndex)

    mockSchema.value[selectedIndex.value].number = 'integer'
    mockSchema.value[selectedIndex.value].step = 1

    const { whichNumber } = useFormField(selectedField, selectedIndex, fields)
    expect(whichNumber.value).toBe('integer')
    expect(mockSchema.value[0].step).toBe(1)

    whichNumber.value = 'float'

    expect(whichNumber.value).toBe('float')
    expect(mockSchema.value[0].step).toBe('0.1')

    whichNumber.value = 'integer'
    expect(whichNumber.value).toBe('integer')
    expect(mockSchema.value[0].step).toBe('1')
  })

  it('should get and set min and max', async () => {
    vi.spyOn(formElementsModule, 'formSchema', 'get').mockReturnValue(mockSchema)
    vi.spyOn(formElementsModule, 'selectedIndex', 'get').mockReturnValue(selectedIndex)

    mockSchema.value[selectedIndex.value].min = 1
    mockSchema.value[selectedIndex.value].max = 10

    const { min, max } = useFormField(selectedField, selectedIndex, fields)
    expect(min.value).toBe(1)
    expect(max.value).toBe(10)
  })

  it('should get and set number of options', async () => {
    vi.spyOn(formElementsModule, 'formSchema', 'get').mockReturnValue(mockSchema)
    vi.spyOn(formElementsModule, 'selectedIndex', 'get').mockReturnValue(selectedIndex)

    mockSchema.value[selectedIndex.value].options = ['one', 'two', 'three']
    const { modelValue } = useFormField(selectedField, selectedIndex, fields)
    expect(modelValue.value).toStrictEqual(['one', 'two', 'three'])
  })

  it('should get and set number of files', async () => {
    vi.spyOn(formElementsModule, 'formSchema', 'get').mockReturnValue(mockSchema)
    vi.spyOn(formElementsModule, 'selectedIndex', 'get').mockReturnValue(selectedIndex)

    mockSchema.value[selectedIndex.value].multiple = true
    const { numOfFiles } = useFormField(selectedField, selectedIndex, fields)
    expect(numOfFiles.value).toBe(true)
  })

  it('should update validation string', async () => {
    vi.spyOn(formElementsModule, 'formSchema', 'get').mockReturnValue(mockSchema)
    vi.spyOn(formElementsModule, 'selectedIndex', 'get').mockReturnValue(selectedIndex)
    // Set validation directly
    mockSchema.value[selectedIndex.value].validation = 'required'

    // Pass the reactive computed directly
    const { updateValidationString } = useFormField(selectedField, selectedIndex, fields)

    // invoke function to update validation
    updateValidationString('alphanumeric')

    // Check the actual schema value
    expect(mockSchema.value[selectedIndex.value].validation).toContain('required')
    expect(mockSchema.value[selectedIndex.value].validation).toContain('alphanumeric')

    updateValidationString('required')
    expect(mockSchema.value[selectedIndex.value].validation).not.toContain('required')
  })
})

describe('tests for showing and hiding validation inputs', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  const mockSchema = ref([
    {
      $formkit: 'text',
      label: 'initial',
    }
  ])
  const selectedIndex = ref(0)
  const fields = mockSchema
  const selectedField = computed(() => mockSchema.value[selectedIndex.value])

  it('should return true for text field types', () => {
    vi.spyOn(formElementsModule, 'formSchema', 'get').mockReturnValue(mockSchema)
    const { showTextValidation } = useFormField(selectedField, selectedIndex, fields)
    expect(showTextValidation.value).toBe(true)

  })
  it('should return true for text area field types', () => {
    vi.spyOn(formElementsModule, 'formSchema', 'get').mockReturnValue(mockSchema)
    mockSchema.value[selectedIndex.value].$formkit = 'textarea'
    const { showTextValidation } = useFormField(selectedField, selectedIndex, fields)
    expect(showTextValidation.value).toBe(true)
  })
  it('should return true for password fields', () => {
    vi.spyOn(formElementsModule, 'formSchema', 'get').mockReturnValue(mockSchema)
    mockSchema.value[selectedIndex.value].$formkit = 'password'
    const { showTextValidation } = useFormField(selectedField, selectedIndex, fields)
    expect(showTextValidation.value).toBe(true)
  })
  it('should return false for all other field types', () => {
    vi.spyOn(formElementsModule, 'formSchema', 'get').mockReturnValue(mockSchema)
    mockSchema.value[selectedIndex.value].$formkit = 'number'
    const { showTextValidation } = useFormField(selectedField, selectedIndex, fields)
    expect(showTextValidation.value).toBe(false)

    mockSchema.value[selectedIndex.value].$formkit = 'email'
    expect(showTextValidation.value).toBe(false)

    mockSchema.value[selectedIndex.value].$formkit = 'url'
    expect(showTextValidation.value).toBe(false)

    mockSchema.value[selectedIndex.value].$formkit = 'checkbox'
    expect(showTextValidation.value).toBe(false)

    mockSchema.value[selectedIndex.value].$formkit = 'color'
    expect(showTextValidation.value).toBe(false)

    mockSchema.value[selectedIndex.value].$formkit = 'date'
    expect(showTextValidation.value).toBe(false)

    mockSchema.value[selectedIndex.value].$formkit = 'time'
    expect(showTextValidation.value).toBe(false)

    mockSchema.value[selectedIndex.value].$formkit = 'datetime-local'
    expect(showTextValidation.value).toBe(false)

    mockSchema.value[selectedIndex.value].$formkit = 'file'
    expect(showTextValidation.value).toBe(false)

    mockSchema.value[selectedIndex.value].$formkit = 'radio'
    expect(showTextValidation.value).toBe(false)

    mockSchema.value[selectedIndex.value].$formkit = 'select'
    expect(showTextValidation.value).toBe(false)

    mockSchema.value[selectedIndex.value].$formkit = 'telephone'
    expect(showTextValidation.value).toBe(false)

    mockSchema.value[selectedIndex.value].$formkit = 'range'
    expect(showTextValidation.value).toBe(false)
  })
})

describe('test suite for schema formatting', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should format schema correctly', async () => {
    const mockSchema = ref([
      {
        $formkit: 'text',
        name: 'field1',
        label: 'initial',
        placeholder: 'enter',
        validation: '',
        help: 'this is help text',
        description: 'single line text field', // This should be excluded in the formatted schema
        number: 'integer',
        multiple: false,
        options: ['one'],
        min: 0,
        max: 10,
        validationVisibility: 'live',
        __raw__sectionsSchema: { foo: 'bar' },
        value: 'test value'
      },
    ])

    const formattedSchema = createFormattedSchema(mockSchema)
    
    // Access the value of the computed property
    const result = formattedSchema.value
    
    // Test the first (and only) element in the array
    expect(result.length).toBe(1)
    
    const formattedField = result[0]
    
    // Check that the field was properly formatted
    expect(formattedField.$formkit).toBe('text')
    expect(formattedField.name).toBe('field1_0')
    expect(formattedField.id).toBe('preview_field_0')
    expect(formattedField.label).toBe('initial')
    expect(formattedField.placeholder).toBe('enter')
    expect(formattedField.validation).toBe('')
    expect(formattedField.help).toBe('this is help text')
    expect(formattedField.number).toBe('integer')
    expect(formattedField.step).toBe(undefined)
    expect(formattedField.multiple).toBe(false)
    expect(formattedField.options).toEqual(['one'])
    expect(formattedField.min).toBe(0)
    expect(formattedField.max).toBe(10)
    expect(formattedField.value).toBe('test value')
    expect(formattedField.validationVisibility).toBe('live')
    expect(formattedField.__raw__sectionsSchema).toEqual({ foo: 'bar' })
    
    // Ensure the description is not included
    expect(formattedField).not.toHaveProperty('description')
  })

  it('should return empty array if fields is undefined', () => {
    const formattedSchema = createFormattedSchema(undefined)
    expect(formattedSchema.value).toEqual([])
  })

  it('should handle multiple fields correctly', () => {
    const mockSchema = ref([
      {
        $formkit: 'text',
        name: 'text_field',
        label: 'Text Field',
      },
      {
        $formkit: 'number',
        name: 'number_field',
        label: 'Number Field',
        number: 'integer',
        step: '1',
      }
    ])

    const formattedSchema = createFormattedSchema(mockSchema)
    const result = formattedSchema.value
    
    expect(result.length).toBe(2)
    
    // Check the first field
    expect(result[0].$formkit).toBe('text')
    expect(result[0].name).toBe('text_field_0')
    expect(result[0].id).toBe('preview_field_0')
    
    // Check the second field
    expect(result[1].$formkit).toBe('number')
    expect(result[1].name).toBe('number_field_1')
    expect(result[1].id).toBe('preview_field_1')
  })
})