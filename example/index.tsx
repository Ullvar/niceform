import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Builder, FormField, JSONObject, Viewer } from '../.';
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

const App = () => {
  const [formFields, setFormFields] = React.useState<FormField[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updates = (formFields: FormField[]) => {
    setFormFields(formFields);
  };

  const update = (formField: FormField) => {
    console.log('a field was updated: ', formField);
  };

  const submit = (answers: JSONObject) => {
    console.log(answers);
  };

  console.log(formFields);

  return (
    <ChakraProvider>
      <Box h="100vh" mt={10} mb={10}>
        <Center mb={10}>
          <Button onClick={onOpen}>Forhåndsvis spørreskjema</Button>
        </Center>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent minH={16} minW="95vw">
            <ModalCloseButton />
            <ModalBody>
              <Box mt={4} mb={4}>
                <Viewer
                  formFields={formFields}
                  submit={submit}
                  isSubmitting={true}
                />
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Builder
          formFields={formFields}
          updateFormFields={updates}
          updateFormField={update}
        />
        ;
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
