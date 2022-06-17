import { Box } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { FormField, FormFieldType, JSONObject } from '../shared/types';
import { ViewerCheckbox } from './ViewerCheckbox';
import { ViewerInput } from './ViewerInput';
import { ViewerRadio } from './ViewerRadio';
import { ViewerTextarea } from './ViewerTextarea';
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form';
import { ViewerFile } from './ViewerFile';

interface Props {
  formField: FormField;
  register: UseFormRegister<JSONObject>;
  errors: DeepMap<JSONObject, FieldError>;
}

export const ViewerGenerator: React.FC<Props> = ({
  formField,
  register,
  errors,
}) => {
  let formFieldElement = null;

  if (formField.formFieldType === FormFieldType.INPUT) {
    formFieldElement = (
      <ViewerInput
        input={formField}
        register={register}
        error={errors[formField.name]}
        rules={{ required: formField.required }}
      />
    );
  }

  if (formField.formFieldType === FormFieldType.TEXTAEREA) {
    formFieldElement = (
      <ViewerTextarea
        textarea={formField}
        register={register}
        error={errors[formField.name]}
        rules={{ required: formField.required }}
      />
    );
  }

  if (formField.formFieldType === FormFieldType.RADIO) {
    formFieldElement = (
      <ViewerRadio
        radio={formField}
        register={register}
        error={errors[formField.name]}
        rules={{ required: formField.required }}
      />
    );
  }

  if (formField.formFieldType === FormFieldType.CHECKBOX) {
    formFieldElement = (
      <ViewerCheckbox
        checkbox={formField}
        register={register}
        error={errors[formField.name]}
        rules={{ required: formField.required }}
      />
    );
  }

  if (formField.formFieldType === FormFieldType.FILE) {
    formFieldElement = (
      <ViewerFile
        file={formField}
        register={register}
        error={errors[formField.name]}
        rules={{ required: formField.required }}
      />
    );
  }

  return (
    <ViewerWrapper error={errors[formField.name]}>
      {formFieldElement ? formFieldElement : <></>}
    </ViewerWrapper>
  );
};

type WrapperProps = {
  error: FieldError | undefined;
  children: ReactElement | ReactElement[];
};

const ViewerWrapper: React.FC<WrapperProps> = ({ error, children }) => {
  return (
    <Box
      borderWidth="1px"
      borderColor={error ? 'red' : 'gray.400'}
      borderRadius="md"
      maxW="90vw"
      w="640px"
      mb={4}
      p={4}
    >
      {children}
    </Box>
  );
};
