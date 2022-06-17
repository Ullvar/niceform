import React, { useEffect, useState } from 'react';
import { ChoiceInput } from './ChoiceInput';
import { FormField, FormFieldType } from '../shared/types';
import { FileInput } from './FileInput';
import { InputGeneratorWrapper } from './InputGeneratorWrapper';

interface Props {
  formField: FormField;
  updateFormField: (formField: FormField) => void;
  removeFormField: (id: string) => void;
  handleAddInput: (formFieldType: FormFieldType) => void;
  currentFormFieldEditingId: string;
  setCurrentFormFieldEditingId: (id: string) => void;
  isDragging: boolean;
}

export const BuilderGenerator: React.FC<Props> = ({
  formField,
  updateFormField,
  removeFormField,
  handleAddInput,
  currentFormFieldEditingId,
  setCurrentFormFieldEditingId,
  isDragging,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(currentFormFieldEditingId === formField.id);
  }, [currentFormFieldEditingId, formField.id]);

  useEffect(() => {
    if (isDragging) {
      setIsEditing(false);
    } else {
      setIsEditing(currentFormFieldEditingId === formField.id);
    }
  }, [isDragging, currentFormFieldEditingId, formField.id]);

  const toggleEdit = () => {
    setIsEditing(prev => !prev);
    setCurrentFormFieldEditingId(formField.id);
  };

  let formFieldSpecialInput = null;
  if (
    formField.formFieldType === FormFieldType.RADIO ||
    formField.formFieldType === FormFieldType.CHECKBOX
  ) {
    formFieldSpecialInput = (
      <ChoiceInput formField={formField} updateFormField={updateFormField} />
    );
  }

  if (formField.formFieldType === FormFieldType.FILE) {
    formFieldSpecialInput = (
      <FileInput formField={formField} updateFormField={updateFormField} />
    );
  }

  return (
    <InputGeneratorWrapper
      formField={formField}
      toggleEdit={toggleEdit}
      isEditing={isEditing}
      updateFormField={updateFormField}
      removeFormField={removeFormField}
      handleAddInput={handleAddInput}
    >
      {formFieldSpecialInput ? formFieldSpecialInput : <></>}
    </InputGeneratorWrapper>
  );
};
