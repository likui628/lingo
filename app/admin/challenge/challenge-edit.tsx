import {
  Edit,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput
} from "react-admin";

export const ChallengeEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source="id"
        validate={[required()]}
        InputProps={{disabled: true}}
      />
      <TextInput
        source="question"
        validate={[required()]}
      />
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
      <ReferenceInput
        source="lessonId"
        reference="lessons"
      >
        <SelectInput validate={[required()]}/>
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)