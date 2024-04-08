import {
  BooleanInput,
  Edit,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput
} from "react-admin";

export const ChallengeOptionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source="id"
        validate={[required()]}
        InputProps={{disabled: true}}
      />
      <TextInput
        source="text"
        validate={[required()]}
      />
      <BooleanInput
        source="correct"
        validate={[required()]}
      />
      <TextInput
        source="imageSrc"
      />
      <TextInput
        source="audioSrc"
      />
      <ReferenceInput
        source="challengeId"
        reference="challenges"
      >
        <SelectInput validate={[required()]}/>
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);