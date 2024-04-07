import {Datagrid, List, NumberField, ReferenceField, TextField} from 'react-admin';

export const ChallengeList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id"/>
      <TextField source="question"/>
      <TextField source="type"/>
      <NumberField source="order"/>
      <ReferenceField source="lessonId" reference="lessons"/>
    </Datagrid>
  </List>
);