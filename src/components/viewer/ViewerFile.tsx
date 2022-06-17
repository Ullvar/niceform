import { Flex, Text, Input, InputGroup, Button, Icon } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { FormField, JSONObject } from '../shared/types';
import { FiFile } from 'react-icons/fi';

interface Props {
  file: FormField;
  register: UseFormRegister<JSONObject>;
  rules?: RegisterOptions;
  error: FieldError | undefined;
}

export const ViewerFile: React.FC<Props> = ({
  file,
  register,
  error,
  rules,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputFileName, setInputFileName] = useState('');

  let acceptedType = '';
  switch (file.options[0].value) {
    case '1':
      acceptedType = 'application/pdf';
      break;
    case '2':
      acceptedType = 'image/gif, image/jpeg, image/png';
      break;
    case '3':
      acceptedType = 'video/mpeg, video/mp4';
      break;
    case '4':
      acceptedType = 'audio/mpeg, audio/mp3';
      break;
    default:
      acceptedType = '';
  }

  const handleClick = () => {
    inputRef.current?.click();
  };

  const { ref, onChange, ...rest } = register(file.name, rules);

  return (
    <>
      <Flex>
        <Text mb="8px" fontWeight="bold" fontSize="lg">
          {file.title}
        </Text>
        {file.required && (
          <Text color="red" ml={1} fontSize="xl">
            *
          </Text>
        )}
      </Flex>
      {file.description !== '' && <Text mb="8px">{file.description}</Text>}
      <InputGroup onClick={handleClick}>
        <Input
          type="file"
          accept={acceptedType}
          ref={e => {
            inputRef.current = e;
            ref(e);
          }}
          {...rest}
          onChange={e => {
            onChange(e);
            setInputFileName(
              e.target.files && e.target.files.length > 0
                ? e.target.files[0].name
                : ''
            );
          }}
          hidden
        />
        <Button leftIcon={<Icon as={FiFile} />}>Velg fil</Button>
        <Text
          display="flex"
          flexDirection="column"
          justifyContent="center"
          ml={2}
          fontWeight="bold"
        >
          {inputFileName}
        </Text>
      </InputGroup>
      {error && <Text color="red">Dette feltet er påkrevd</Text>}
    </>
  );
};
