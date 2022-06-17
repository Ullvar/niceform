import { CloseIcon, DragHandleIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FormField, FormFieldType, FormOption } from '../shared/types';
import { FaRegCircle, FaRegSquare } from 'react-icons/fa';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  formField: FormField;
  updateFormField: (formField: FormField) => void;
}

export const ChoiceInput: React.FC<Props> = ({
  formField,
  updateFormField,
}) => {
  const [optionId, setOptionId] = useState(formField.options.length);
  const [formOptionFocusIndex, setFormOptionFocusIndex] = useState(-1);

  const addOption = () => {
    const newOptionId = optionId + 1;
    const newOption: FormOption = {
      idx: formField.options.length,
      label: `Alternativ ${newOptionId}`,
      value: uuidv4(),
    };
    updateFormField({
      ...formField,
      options: [...formField.options, newOption],
    });
    setOptionId(newOptionId);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items: FormOption[] = reorder(
      formField.options,
      result.source.index,
      result.destination.index
    );

    const itemsWithNewIdx = updateIdx(items);

    updateFormField({ ...formField, options: itemsWithNewIdx });
  };

  const reorder = (
    list: FormOption[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const updateIdx = (list: FormOption[]) => {
    const result = Array.from(list);
    let newIdx = 0;
    for (let res of result) {
      res.idx = newIdx;
      newIdx++;
    }
    return result;
  };

  const updateOption = (value: string, label: string) => {
    const elementsIndex = formField.options.findIndex(f => f.value === value);
    let newOptions = [...formField.options];
    newOptions[elementsIndex] = {
      ...newOptions[elementsIndex],
      label: label,
    };
    updateFormField({ ...formField, options: newOptions });
  };

  const removeOption = (value: string) => {
    updateFormField({
      ...formField,
      options: formField.options.filter(o => o.value !== value),
    });
  };

  const isRadio = formField.formFieldType === FormFieldType.RADIO;

  return (
    <Box pr={4} pl={4}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {formField.options
                .sort((a, b) => a.idx - b.idx)
                .map((item, index) => (
                  <Draggable
                    key={item.value}
                    draggableId={item.value}
                    index={index}
                  >
                    {provided => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <FormOption
                          provided={provided}
                          isRadio={isRadio}
                          formOption={item}
                          updateOption={updateOption}
                          removeOption={removeOption}
                          formOptionIndex={index}
                          formOptionFocusIndex={formOptionFocusIndex}
                          setFormOptionFocusIndex={setFormOptionFocusIndex}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Box h={4} />
      <Button ml="7px" variant="ghost" onClick={addOption}>
        <Icon as={isRadio ? FaRegCircle : FaRegSquare} mr={2} />
        <Text color="#5f5f5f">Legg til alternativ</Text>
      </Button>
    </Box>
  );
};

interface FormOptionProps {
  provided: DraggableProvided;
  isRadio: boolean;
  formOption: FormOption;
  updateOption: (value: string, label: string) => void;
  removeOption: (value: string) => void;
  formOptionIndex: number;
  formOptionFocusIndex: number;
  setFormOptionFocusIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FormOption: React.FC<FormOptionProps> = ({
  provided,
  isRadio,
  formOption,
  updateOption,
  removeOption,
  formOptionIndex,
  formOptionFocusIndex,
  setFormOptionFocusIndex,
}) => {
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (formOptionFocusIndex === formOptionIndex) setShowEdit(true);
    else setShowEdit(false);
  }, [formOptionFocusIndex]);

  return (
    <Box
      onMouseOver={_ => setShowEdit(true)}
      onMouseLeave={_ => setShowEdit(false)}
    >
      <Flex mb={3}>
        <Box
          {...provided.dragHandleProps}
          color="#b3b3b3"
          hidden={!showEdit}
          onBlur={_ => setFormOptionFocusIndex(-1)}
        >
          <DragHandleIcon mt="10px" mr="7px" />
        </Box>
        <Icon
          as={isRadio ? FaRegCircle : FaRegSquare}
          mr={2}
          mt="12px"
          ml={showEdit ? 0 : '23px'}
        />
        <Input
          border="0"
          borderBottom={showEdit ? '1px solid lightGray' : ''}
          borderRadius="0"
          pl="0"
          value={formOption.label}
          onChange={e => updateOption(formOption.value, e.target.value)}
          onFocus={e => {
            e.target.select();
            setFormOptionFocusIndex(formOptionIndex);
          }}
        />
        <IconButton
          hidden={!showEdit}
          aria-label="delete option"
          icon={<CloseIcon />}
          variant="unstyled"
          onClick={() => removeOption(formOption.value)}
          onBlur={_ => setFormOptionFocusIndex(-1)}
        />
      </Flex>
    </Box>
  );
};
