import { Flex, Text, Textarea } from '@chakra-ui/react';
import React from 'react';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { FormField, JSONObject } from '../shared/types';

interface Props {
  textarea: FormField;
  register: UseFormRegister<JSONObject>;
  rules?: RegisterOptions;
  error: FieldError | undefined;
}

export const ViewerTextarea: React.FC<Props> = ({
  textarea,
  register,
  error,
  rules,
}) => {
  return (
    <>
      <Flex>
        <Text mb="8px" fontWeight="bold" fontSize="lg">
          {textarea.title}
        </Text>
        {textarea.required && (
          <Text color="red" ml={1} fontSize="xl">
            *
          </Text>
        )}
      </Flex>
      {textarea.description !== '' && (
        <Text mb="8px">{textarea.description}</Text>
      )}
      <Textarea
        border="0"
        borderBottom="1px solid lightGray"
        borderRadius="0"
        pl="0"
        {...register(textarea.name, rules)}
      />
      {error && <Text color="red">Dette feltet er påkrevd</Text>}
    </>
  );
};
