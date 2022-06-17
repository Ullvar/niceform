import { Box, Input } from '@chakra-ui/react';
import React from 'react';
import { FormField } from '../shared/types';

interface Props {
  formField: FormField;
  updateFormField: (formField: FormField) => void;
}

export const TextInput: React.FC<Props> = ({ formField, updateFormField }) => {
  return (
    <Box pr={4} pl={4}>
      <Input
        border="0"
        borderBottom="1px solid lightGray"
        borderRadius="0"
        pl="0"
        placeholder="Spørsmål"
        value={formField.title}
        onChange={e => updateFormField({ ...formField, title: e.target.value })}
      />
      <Box h={4} />
      <Input
        border="0"
        borderBottom="1px solid lightGray"
        borderRadius="0"
        pl="0"
        placeholder="Beskrivelse"
        value={formField.description}
        onChange={e =>
          updateFormField({ ...formField, description: e.target.value })
        }
      />
    </Box>
  );
};
