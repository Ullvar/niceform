import { Checkbox, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { FormField, JSONObject } from '../shared/types';

interface Props {
  checkbox: FormField;
  register: UseFormRegister<JSONObject>;
  rules?: RegisterOptions;
  error: FieldError | undefined;
}

export const ViewerCheckbox: React.FC<Props> = ({
  checkbox,
  register,
  error,
  rules,
}) => {
  return (
    <>
      <Flex>
        <Text mb="8px" fontWeight="bold" fontSize="lg">
          {checkbox.title}
        </Text>
        {checkbox.required && (
          <Text color="red" ml={1} fontSize="xl">
            *
          </Text>
        )}
      </Flex>
      {checkbox.description !== '' && (
        <Text mb="8px">{checkbox.description}</Text>
      )}
      <Stack>
        {checkbox.options
          .sort((a, b) => a.idx - b.idx)
          .map((o, i) => {
            return (
              <Checkbox
                key={i}
                value={o.value}
                {...register(checkbox.name, rules)}
              >
                {o.label}
              </Checkbox>
            );
          })}
      </Stack>
      {error && <Text color="red">Velg minst ett alternativ</Text>}
    </>
  );
};
