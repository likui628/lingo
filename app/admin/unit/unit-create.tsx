import {
  Create,
  NumberInput,
  ReferenceInput,
  required, SelectInput,
  SimpleForm,
  TextInput
} from 'react-admin';

export const UnitCreate = () => (
  <Create>
    <SimpleForm>
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
  </Create>
);