import {
  Edit, required,
  SimpleForm,
  TextInput
} from 'react-admin';

export const CourseEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source="id"
        validate={[required()]}
        InputProps={{disabled: true}}
      />
      <TextInput
        source="title"
        validate={[required()]}
      />
      <TextInput
        source="imageSrc"
        validate={[required()]}
      />
    </SimpleForm>
  </Edit>
);