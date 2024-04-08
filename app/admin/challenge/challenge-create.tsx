import {
  Create, NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput
} from "react-admin";

export const ChallengeCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="question" validate={[required()]}/>
      <SelectInput
        source="type"
        choices={[
          {
            id: "SELECT",
            name: "SELECT",
          },
          {
            id: "ASSIST",
            name: "ASSIST",
          }
        ]}
        validate={[required()]}
      />
      <NumberInput source="order" validate={[required()]}/>
      <ReferenceInput source="lessonId" reference="lessons">
        <SelectInput validate={[required()]}/>
      </ReferenceInput>
    </SimpleForm>
  </Create>
)