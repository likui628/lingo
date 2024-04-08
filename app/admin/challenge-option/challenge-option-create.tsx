import {
  BooleanInput,
  Create,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput
} from "react-admin";

export const ChallengeOptionCreate = () => (
  <Create>
    <SimpleForm>
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
  </Create>
)