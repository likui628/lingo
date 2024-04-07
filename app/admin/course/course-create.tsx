import {
  Create,
  required,
  SimpleForm,
  TextInput
} from 'react-admin';

export const CourseCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="title"
        validate={[required()]}
      />
      <TextInput
        source="imageSrc"
        validate={[required()]}
      />
    </SimpleForm>
  </Create>
);