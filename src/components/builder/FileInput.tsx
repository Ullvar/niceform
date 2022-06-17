import { Box, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FormField } from '../shared/types';

interface Props {
  formField: FormField;
  updateFormField: (formField: FormField) => void;
}

export const FileInput: React.FC<Props> = ({ formField, updateFormField }) => {
  const updateFileType = (value: string) => {
    updateFormField({
      ...formField,
      options: [{ idx: 0, value: value, label: '' }],
    });
  };

  return (
    <Box pr={4} pl={4}>
      <Text mb={2} mt={2}>
        Filtype
      </Text>
      <RadioGroup
        onChange={updateFileType}
        value={formField.options.length > 0 ? formField.options[0].value : ''}
      >
        <Stack direction="row">
          <Radio value="1">PDF</Radio>
          <Radio value="2">Bilde</Radio>
          <Radio value="3">Video</Radio>
          <Radio value="4">Lyd</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};
