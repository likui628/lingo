import {
  Edit,
  NumberInput,
  ReferenceInput,
  required, SelectInput,
  SimpleForm,
  TextInput
} from 'react-admin';

export const UnitEdit = () => (
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
        source="description"
        validate={[required()]}
      />
      <NumberInput
        source="order"
        validate={[required()]}
      />
      <ReferenceInput
        source="courseId"
        reference="courses"
      >
        <SelectInput validate={[required()]}/>
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);