import {BooleanField, Datagrid, List, ReferenceField, TextField} from 'react-admin';

export const ChallengeOptionList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id"/>
      <TextField source="text"/>
      <BooleanField source="correct"/>
      <TextField source="imageSrc"/>
      <TextField source="audioSrc"/>
      <ReferenceField source="challengeId" reference="challenges"/>
    </Datagrid>
  </List>
);