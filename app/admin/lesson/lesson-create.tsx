import {
  Create,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput
} from "react-admin";

export const LessonCreate = () => (
  <Create>
    <SimpleForm>
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
  </Create>
)