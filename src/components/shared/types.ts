export enum FormFieldType {
  INPUT = 1,
  TEXTAEREA = 2,
  RADIO = 3,
  CHECKBOX = 4,
  FILE = 5,
}

export interface FormField {
  id: string;
  idx: number;
  formFieldType: FormFieldType;
  required: boolean;
  title: string;
  description: string;
  name: string;
  options: FormOption[];
}

export interface FormOption {
  idx: number;
  label: string;
  value: string;
}

export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> {}
