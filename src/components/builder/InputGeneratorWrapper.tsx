import { CopyIcon, DeleteIcon, Icon } from '@chakra-ui/icons';
import { Box, Flex, Spacer } from '@chakra-ui/layout';
import { IconButton, Input, Select, Switch, Text, Collapse } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { FaRegCircle, FaRegSquare } from 'react-icons/fa';
import { FormField, FormFieldType } from '..';
import { getFormFieldType, getFormFieldTypeDescription } from './helpers';
import { FiFile } from 'react-icons/fi';

interface Props {
  children: ReactElement | ReactElement[];
  formField: FormField;
  toggleEdit: () => void;
  isEditing: boolean;
  updateFormField: (formField: FormField) => void;
  removeFormField: (id: string) => void;
  handleAddInput: (formFieldType: FormFieldType) => void;
}

export const InputGeneratorWrapper: React.FC<Props> = ({
  children,
  formField,
  toggleEdit,
  isEditing,
  updateFormField,
  removeFormField,
  handleAddInput,
}) => {
  return (
    <Box
      boxShadow="md"
      borderWidth="1px"
      borderTop={0}
      borderColor="black"
      borderBottomRadius="md"
      maxW="90vw"
      w="640px"
      mb={4}
      tabIndex={0}
      onFocus={() => !isEditing && toggleEdit()}
      _hover={{ cursor: 'pointer' }}
      backgroundColor="white"
    >
      <Flex pr={4} pl={4} pt={4}>
        {!isEditing && (
          <>
            <Text
              display="flex"
              flexDirection="column"
              justifyContent="center"
              mb={4}
            >
              {formField.title === '' ? 'Spørsmål' : formField.title}
            </Text>
            {formField.required && (
              <Text color="red" ml={1} fontSize="xl">
                *
              </Text>
            )}
          </>
        )}
      </Flex>
      <Box>
        <Box mb={6} pr={4} pl={4} hidden={isEditing}>
          <FormFieldTypeDescription formField={formField} />
        </Box>
        <Collapse in={isEditing} animateOpacity>
          <Flex pr={4} pl={4}>
            <Input
              w="60%"
              border="0"
              borderBottom="1px solid lightgray"
              backgroundColor="#f8f9fa"
              borderRadius="0"
              placeholder="Spørsmål"
              value={formField.title}
              onChange={e =>
                updateFormField({ ...formField, title: e.target.value })
              }
            />
            <Spacer />
            <Select
              w="35%"
              value={formField.formFieldType}
              onChange={e =>
                updateFormField({
                  ...formField,
                  formFieldType: getFormFieldType(e.target.value),
                  options:
                    getFormFieldType(e.target.value) === FormFieldType.FILE
                      ? [{ idx: 0, value: '1', label: '' }]
                      : [],
                })
              }
            >
              <option value={FormFieldType.INPUT}>Kortsvar</option>
              <option value={FormFieldType.TEXTAEREA}>Langsvar</option>
              <option value={FormFieldType.RADIO}>Enkeltvalg</option>
              <option value={FormFieldType.CHECKBOX}>Flervalg</option>
              <option value={FormFieldType.FILE}>Fil</option>
            </Select>
          </Flex>
          <Box h={4} />
          <Box pr={4} pl={4}>
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
          <Box h={4} />
          {children}
          <Box h={8} />
          <Flex
            backgroundColor="#f0f0f0"
            borderBottomRadius="md"
            justifyContent="center"
            alignItems="center"
            height={12}
          >
            <Spacer />
            <IconButton
              aria-label="duplicate input"
              icon={<CopyIcon />}
              variant="unstyled"
              onClick={() => handleAddInput(formField.formFieldType)}
            />
            <IconButton
              aria-label="delete input"
              icon={<DeleteIcon />}
              variant="unstyled"
              onClick={() => removeFormField(formField.id)}
            />
            <Flex justifyContent="center" alignItems="center" mt="4px">
              <Text ml={2} mr={2}>
                Påkrevd
              </Text>
              <Switch
                mr={4}
                isChecked={formField.required}
                onChange={e =>
                  updateFormField({ ...formField, required: e.target.checked })
                }
              />
            </Flex>
          </Flex>
        </Collapse>
      </Box>
    </Box>
  );
};

interface FormFieldTypeDescriptionProps {
  formField: FormField;
}

const FormFieldTypeDescription: React.FC<FormFieldTypeDescriptionProps> = ({
  formField,
}) => {
  if (
    formField.formFieldType === FormFieldType.CHECKBOX ||
    formField.formFieldType === FormFieldType.RADIO
  ) {
    return (
      <>
        {formField.options.map(x => (
          <Box key={x.idx}>
            <Icon
              as={
                formField.formFieldType === FormFieldType.RADIO
                  ? FaRegCircle
                  : FaRegSquare
              }
              mr={2}
              mb="4px"
            />
            {x.label}
          </Box>
        ))}
      </>
    );
  }

  if (formField.formFieldType === FormFieldType.FILE) {
    return (
      <Box>
        <Icon as={FiFile} />
      </Box>
    );
  }

  return (
    <Text
      borderBottom="1px"
      borderStyle="dashed"
      borderColor="gray"
      w={formField.formFieldType === FormFieldType.INPUT ? '50%' : '100%'}
      color="gray"
    >
      {getFormFieldTypeDescription(formField.formFieldType)}
    </Text>
  );
};
