import { AddIcon, DragHandleIcon } from '@chakra-ui/icons';
import { Center } from '@chakra-ui/layout';
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BuilderGenerator } from './BuilderGenerator';
import { FormField, FormFieldType } from '../shared/types';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  BeforeCapture,
} from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  formFields: FormField[];
  updateFormFields: (formFields: FormField[]) => void;
  updateFormField: (formField: FormField) => void;
}

export const Builder: React.FC<Props> = ({
  formFields,
  updateFormFields,
  updateFormField,
}) => {
  const [currentFormFieldEditingId, setCurrentFormFieldEditingId] = useState(
    ''
  );
  const [draggableId, setDraggableId] = useState('');

  const handleAddInput = (formFieldType: FormFieldType) => {
    const inputId = uuidv4();
    const newInput: FormField = {
      id: inputId,
      idx: formFields.length,
      formFieldType: formFieldType,
      name: inputId,
      required: false,
      title: '',
      description: '',
      options:
        formFieldType === FormFieldType.FILE
          ? [{ idx: 0, value: '1', label: '' }]
          : [],
    };
    updateFormField(newInput);
    updateFormFields([...formFields, newInput]);
    setCurrentFormFieldEditingId(inputId.toString());
  };

  const handleUpdateFormField = (formField: FormField) => {
    const elementsIndex = formFields.findIndex(f => f.id === formField.id);
    let newFormFields = [...formFields];
    newFormFields[elementsIndex] = {
      ...newFormFields[elementsIndex],
      title: formField.title,
      description: formField.description,
      required: formField.required,
      options:
        formField.formFieldType === FormFieldType.INPUT ||
        formField.formFieldType === FormFieldType.TEXTAEREA
          ? []
          : formField.options,
      formFieldType: formField.formFieldType,
    };
    const newFormField = newFormFields.find(f => f.id === formField.id);
    if (newFormField) updateFormField(newFormField);
    updateFormFields(newFormFields);
  };

  const handleRemoveFormField = (id: string) => {
    const formField = formFields.find(f => f.id === id);
    if (formField) updateFormField(formField);
    updateFormFields(formFields.filter(f => f.id !== id));
  };

  const onBeforeCapture = (beforeCapture: BeforeCapture) => {
    setDraggableId(beforeCapture.draggableId);
  };

  const onDragEnd = (result: DropResult) => {
    setDraggableId('');

    if (!result.destination) {
      return;
    }

    const items: FormField[] = reorder(
      formFields,
      result.source.index,
      result.destination.index
    );

    const itemsWithNewIdx = updateIdx(items);

    const formField =
      itemsWithNewIdx.length - 1 >= result.destination.index
        ? itemsWithNewIdx[result.destination.index]
        : null;
    if (formField) updateFormField(formField);

    updateFormFields(itemsWithNewIdx);
  };

  const reorder = (list: FormField[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const updateIdx = (list: FormField[]) => {
    const result = Array.from(list);
    let newIdx = 0;
    for (let res of result) {
      res.idx = newIdx;
      newIdx++;
    }
    return result;
  };

  return (
    <Box>
      <Center mb={6}>
        <DragDropContext
          onBeforeCapture={onBeforeCapture}
          onDragEnd={onDragEnd}
        >
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {formFields
                  .sort((a, b) => a.idx - b.idx)
                  .map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(
                            snapshot.isDragging || item.id === draggableId,
                            provided.draggableProps.style
                          )}
                        >
                          <Box
                            {...provided.dragHandleProps}
                            borderWidth="1px"
                            borderColor="black"
                            borderBottom={0}
                            borderTopRadius="md"
                            color="#b3b3b3"
                            backgroundColor="white"
                          >
                            <Center>
                              <DragHandleIcon
                                transform="rotate(90deg)"
                                mt={2}
                              />
                            </Center>
                          </Box>
                          <BuilderGenerator
                            formField={item}
                            updateFormField={handleUpdateFormField}
                            removeFormField={handleRemoveFormField}
                            handleAddInput={handleAddInput}
                            currentFormFieldEditingId={
                              currentFormFieldEditingId
                            }
                            setCurrentFormFieldEditingId={
                              setCurrentFormFieldEditingId
                            }
                            isDragging={snapshot.isDragging}
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
      </Center>
      <Center mb={32}>
        <Tooltip label="Nytt spørsmål" aria-label="Nytt spørsmål tooltip">
          <IconButton
            aria-label="Add question"
            borderRadius="full"
            icon={<AddIcon />}
            border="1px solid black"
            onClick={() => handleAddInput(FormFieldType.INPUT)}
          />
        </Tooltip>
      </Center>
    </Box>
  );
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  height: isDragging ? '160px' : '100%',

  // styles we need to apply on draggables
  ...draggableStyle,
});
