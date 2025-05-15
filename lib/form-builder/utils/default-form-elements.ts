import type { FormKitSchemaFormKit } from '@formkit/core'
import { ref } from 'vue'

export const formSchema = ref<FormKitSchemaFormKit[]>([])
export const selectedIndex = ref(0)

export const defaultFormElements: FormKitSchemaFormKit[] = [
  {
    $formkit: 'text',
    name: 'Text',
    label: 'Client Name',
    id: 'text_field',
    placeholder: 'Enter your name',
    help: 'This is help text',
    validation: '',
    validationVisibility: 'live',
    description: 'Single line text field',
  },
  {
    $formkit: 'textarea',
    name: 'Text Area',
    label: 'Client Address',
    id: 'textarea_field',
    placeholder: 'Enter your address',
    help: 'This is help text',
    validation: '', // TODO: add in ability to change max and min characters
    validationVisibility: 'live',
    description: 'Multi-line text field',
  },
  {
    $formkit: 'email',
    name: 'Email',
    label: 'Client Email',
    id: 'email_field',
    placeholder: 'Enter your email',
    help: 'This is help text',
    validation: '',
    validationVisibility: 'live',
    description: 'Email field input',
  },
  {
    $formkit: 'number',
    name: 'Number',
    label: 'Client Age',
    id: 'number_field',
    placeholder: 'Enter your age',
    number: 'integer',
    help: 'This is help text',
    validation: '',
    validationVisibility: 'live',
    description: 'Single number input',
  },
  {
    $formkit: 'url',
    label: 'URL Field',
    help: 'This is help text',
    placeholder: 'www.example.com',
    name: 'URL',
    id: 'url_field',
    validation: '',
    validationVisibility: 'live',
    description: 'URL field input',
  },
  {
    $formkit: 'checkbox',
    label: 'Label For Checkbox',
    help: 'This is help text',
    name: 'Checkbox',
    options: ['One'],
    id: 'checkbox_field',
    validation: '',
    validationVisibility: 'live',
    description: 'Multiple choice checkbox',
  },
  {
    $formkit: 'color',
    label: 'Color Field',
    value: '#00ff00',
    help: 'This is help text',
    name: 'Color',
    id: 'color_field',
    validation: '',
    validationVisibility: 'live',
    description: 'Color picker',
  },
  {
    $formkit: 'date',
    label: 'Date Field',
    help: 'This is help text',
    name: 'Date',
    id: 'date_field',
    validation: '',
    validationVisibility: 'live',
    description: 'Date input picker'
  },
  {
    $formkit: 'time',
    label: 'Time Field',
    help: 'This is help text',
    name: 'Time',
    id: 'time_field',
    validation: '',
    validationVisibility: 'live',
    description: 'Time input picker'
  },
  {
    $formkit: 'datetime-local',
    label: 'Date Time Local Field',
    help: 'This is help text',
    name: 'Date-Time',
    id: 'datetime_local_field',
    validation: '',
    validationVisibility: 'live',
    description: 'Date and time input'
  },
  {
    $formkit: 'file',
    label: 'File Field',
    help: 'Select as many files as you want',
    name: 'File Picker',
    id: 'file_field',
    validation: '',
    multiple: false,
    validationVisibility: 'live',
    description: 'One or more file uploads'
  },
  {
    $formkit: 'password',
    label: 'Password Field',
    placeholder: 'Enter your password',
    help: 'This is help text',
    name: 'Password',
    id: 'password_field',
    validation: '', // TODO: Add validation confirmation
    validationVisibility: 'live',
    description: 'Password masked field'
  },
  {
    $formkit: 'radio',
    options: ['one'],
    label: 'Radio Field',
    help: 'This is help text',
    name: 'Radio',
    id: 'radio_field',
    validation: '',
    validationVisibility: 'live',
    description: 'Single choice select'
  },
  {
    $formkit: 'range',
    label: 'Range Field',
    children: '$slots.default',
    help: 'This is help text',
    value: "0",
    name: 'Range',
    __raw__sectionsSchema: {
      prefix: {
        $el: 'div',
        attrs: {
          class:
            " py-1 px-2 mr-1 text-sm flex items-center bg-muted mr-2 rounded-md",
        },
        children: '$value',
      },
    },
    id: 'range_field',
    min: 0,
    max: 10,
    validation: '',
    validationVisibility: 'live',
    description: 'Slider field input'
  },
  {
    $formkit: 'select',
    label: 'Select Field',
    help: 'This is help text',
    name: 'Dropdown Select',
    id: 'select_field',
    validation: '',
    validationVisibility: 'live',
    options: ['one'],
    description: 'Selection dropdown'
  },
  {
    $formkit: 'tel',
    label: 'Tel Field',
    placeholder: '(+XX) XXXXXXXXXX',
    help: 'This is help text',
    name: 'Telephone Number',
    id: 'tel_field',
    validation: '',
    validationVisibility: 'live',
    description: 'Telephone input field'
  },
]
