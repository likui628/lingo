import {
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput
} from "react-admin";

export const LessonEdit = () => (
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
      <NumberInput
        source="order"
        validate={[required()]}
      />
      <ReferenceInput
        source="unitId"
        reference="units"
      >
        <SelectInput validate={[required()]}/>
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);