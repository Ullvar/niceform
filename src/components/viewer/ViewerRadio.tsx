import { Flex, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { FormField, JSONObject } from '../shared/types';

interface Props {
  radio: FormField;
  register: UseFormRegister<JSONObject>;
  rules?: RegisterOptions;
  error: FieldError | undefined;
}

export const ViewerRadio: React.FC<Props> = ({
  radio,
  register,
  error,
  rules,
}) => {
  return (
    <>
      <Flex>
        <Text mb="8px" fontWeight="bold" fontSize="lg">
          {radio.title}
        </Text>
        {radio.required && (
          <Text color="red" ml={1} fontSize="xl">
            *
          </Text>
        )}
      </Flex>
      {radio.description !== '' && <Text mb="8px">{radio.description}</Text>}
      <RadioGroup name={radio.name}>
        <Stack>
          {radio.options
            .sort((a, b) => a.idx - b.idx)
            .map((o, i) => {
              return (
                <Radio key={i} value={o.value} {...register(radio.name, rules)}>
                  {o.label}
                </Radio>
              );
            })}
        </Stack>
      </RadioGroup>
      {error && <Text color="red">Velg ett alternativ</Text>}
    </>
  );
};
