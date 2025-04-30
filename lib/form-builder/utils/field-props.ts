import {
  Calendar,
  CalendarClock,
  CircleDot, Clock,
  Hash, LetterText, Link2, List,
  Lock,
  Mail,
  Paperclip, Phone,
  SlidersHorizontal,
  SquareCheck,
  Type
} from 'lucide-vue-next'

export { formElements } from './form-elements'

export type { FormKitSchemaFormKit } from '@formkit/core'

export const fieldProps = [
  {
    name: 'text',
    tooltip: 'Allows user to enter text',
    icon: Type,
  },
  {
    name: 'email',
    tooltip: 'Allows user to enter email',
    icon: Mail,
  },
  {
    name: 'number',
    tooltip: 'Allows user to enter number',
    icon: Hash,
  },
  {
    name: 'checkbox',
    tooltip: 'Allows user to select multiple options',
    icon: SquareCheck,
  },
  {
    name: 'date',
    tooltip: 'Allows user to select date',
    icon: Calendar,
  },
  {
    name: 'datetime-local',
    tooltip: 'Allows user to select date and time',
    icon: CalendarClock,
  },
  {
    name: 'file',
    tooltip: 'Allows user to upload file',
    icon: Paperclip,
  },
  {
    name: 'password',
    tooltip: 'Allows user to enter password',
    icon: Lock,
  },
  {
    name: 'radio',
    tooltip: 'Allows user to select single option',
    icon: CircleDot,
  },
  {
    name: 'range',
    tooltip: 'Allows user to select between a range of values',
    icon: SlidersHorizontal,
  },
  {
    name: 'select',
    tooltip: 'Allows user to select from a list of options',
    icon: List,
  },
  {
    name: 'tel',
    tooltip: 'Allows user to enter telephone number',
    icon: Phone,
  },
  {
    name: 'textarea',
    tooltip: 'Allows user to enter multiple lines of text',
    icon: LetterText,
  },
  {
    name: 'time',
    tooltip: 'Allows user to select time',
    icon: Clock,
  },
  {
    name: 'url',
    tooltip: 'Allows user to enter url',
    icon: Link2,
  },
]
