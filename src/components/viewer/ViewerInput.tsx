import { Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { FormField, JSONObject } from '../shared/types';

interface Props {
  input: FormField;
  register: UseFormRegister<JSONObject>;
  rules?: RegisterOptions;
  error: FieldError | undefined;
}

export const ViewerInput: React.FC<Props> = ({
  input,
  register,
  error,
  rules,
}) => {
  return (
    <>
      <Flex>
        <Text mb="8px" fontWeight="bold" fontSize="lg">
          {input.title}
        </Text>
        {input.required && (
          <Text color="red" ml={1} fontSize="xl">
            *
          </Text>
        )}
      </Flex>
      {input.description !== '' && <Text mb="8px">{input.description}</Text>}
      <Input
        border="0"
        borderBottom="1px solid lightGray"
        borderRadius="0"
        pl="0"
        {...register(input.name, rules)}
      />
      {error && <Text color="red">Dette feltet er påkrevd</Text>}
    </>
  );
};
