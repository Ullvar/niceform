import { FormFieldType } from '../shared';

export const getFormFieldTypeDescription = (formFieldType: FormFieldType) => {
  if (formFieldType === FormFieldType.INPUT) return 'Kortsvar';
  else if (formFieldType === FormFieldType.TEXTAEREA) return 'Langsvar';
  else if (formFieldType === FormFieldType.RADIO) return 'Enkeltvalg';
  else if (formFieldType === FormFieldType.CHECKBOX) return 'Flervalg';
  else return 'Fil';
};

export const getFormFieldType = (value: string) => {
  if (value === '1') return FormFieldType.INPUT;
  else if (value === '2') return FormFieldType.TEXTAEREA;
  else if (value === '3') return FormFieldType.RADIO;
  else if (value === '4') return FormFieldType.CHECKBOX;
  else return FormFieldType.FILE;
};
