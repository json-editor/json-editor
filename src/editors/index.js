/* Internal helper function called only here so we won't export as part of class */
/* Previously the assignment to the JSONEditor.defaults.editors was done in each of the editor */
/* files but doing it this way removes each of the editors' dependency on JSONEditor */

import { AceEditor as ace } from './ace.js'
import { ArrayEditor as array } from './array.js'
import { ArrayChoicesEditor as arrayChoices } from './array/choices.js'
import { ArraySelect2Editor as arraySelect2 } from './array/select2.js'
import { ArraySelectizeEditor as arraySelectize } from './array/selectize.js'
import { AutocompleteEditor as autocomplete } from './autocomplete.js'
import { Base64Editor as base64 } from './base64.js'
import { ButtonEditor as button } from './button.js'
import { CheckboxEditor as checkbox } from './checkbox.js'
import { ChoicesEditor as choices } from './choices.js'
import { DatetimeEditor as datetime } from './datetime.js'
import { DescribedByEditor as describedBy } from './describedby.js'
import { EnumEditor } from './enum.js'
import { HiddenEditor as hidden } from './hidden.js'
import { InfoEditor as info } from './info.js'
import { IntegerEditor as integer } from './integer.js'
import { IpEditor as ip } from './ip.js'
import { JoditEditor as jodit } from './jodit.js'
import { MultipleEditor as multiple } from './multiple.js'
import { MultiSelectEditor as multiselect } from './multiselect.js'
import { NullEditor } from './null.js'
import { NumberEditor as number } from './number.js'
import { ObjectEditor as object } from './object.js'
import { RadioEditor as radio } from './radio.js'
import { ScEditor as sceditor } from './sceditor.js'
import { SelectEditor as select } from './select.js'
import { Select2Editor as select2 } from './select2.js'
import { SelectizeEditor as selectize } from './selectize.js'
import { SignatureEditor as signature } from './signature.js'
import { SimplemdeEditor as simplemde } from './simplemde.js'
import { StarratingEditor as starrating } from './starrating.js'
import { StepperEditor as stepper } from './stepper.js'
import { StringEditor as string } from './string.js'
import { TableEditor as table } from './table.js'
import { UploadEditor as upload } from './upload.js'
import { UuidEditor as uuid } from './uuid.js'
import { ColorEditor as colorpicker } from './colorpicker.js'

export const editors = {
  ace,
  array,
  arrayChoices,
  arraySelect2,
  arraySelectize,
  autocomplete,
  base64,
  button,
  checkbox,
  choices,
  datetime,
  describedBy,
  enum: EnumEditor,
  hidden,
  info,
  integer,
  ip,
  jodit,
  multiple,
  multiselect,
  null: NullEditor,
  number,
  object,
  radio,
  sceditor,
  select,
  select2,
  selectize,
  signature,
  simplemde,
  starrating,
  stepper,
  string,
  table,
  upload,
  uuid,
  colorpicker
}
