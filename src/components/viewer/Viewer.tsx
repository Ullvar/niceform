import { Box, Button, Center, Flex, Spacer } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { FormField, JSONObject } from '../shared/types';
import { ViewerGenerator } from './ViewerGenerator';
import { useForm } from 'react-hook-form';

interface Props {
  formFields: FormField[];
  submit: (answers: JSONObject) => void;
  backButton?: ReactElement | ReactElement[];
  isSubmitting: boolean;
}

export const Viewer: React.FC<Props> = ({
  formFields,
  submit,
  backButton,
  isSubmitting,
}) => {
  const names = formFields.map(f => f.name);

  let nameStr = '';
  if (names.length > 1) {
    for (let i = 0; i <= names.length - 1; i++) {
      if (i === 0) nameStr += `{ "${names[i]}": "", `;
      else if (i === names.length - 1) nameStr += `"${names[i]}": "" }`;
      else nameStr += `"${names[i]}": "", `;
    }
  } else {
    nameStr = `{ "${names[0]}": "" }`;
  }

  const formValues: JSONObject = JSON.parse(
    nameStr !== '' ? nameStr : `{"nan": ""}`
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formValues,
  });

  const onSubmit = (data: JSONObject) => {
    submit(data);
  };

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') e.preventDefault();
  };

  const formId = 'viewerForm';

  if (names.length === 0) return <></>;

  return (
    <Center>
      <Box>
        <form
          id={formId}
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={e => checkKeyDown(e)}
        >
          {formFields
            .sort((a, b) => a.idx - b.idx)
            .map((f, i) => {
              return (
                <ViewerGenerator
                  key={i}
                  formField={f}
                  register={register}
                  errors={errors}
                />
              );
            })}
          <Flex>
            <Spacer />
            {backButton}
            {backButton && <Box w={4} />}
            <Button type="submit" form={formId} isLoading={isSubmitting}>
              Send søknad
            </Button>
          </Flex>
        </form>
      </Box>
    </Center>
  );
};
