import {Datagrid, List, NumberField, ReferenceField, TextField} from 'react-admin';

export const LessonList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id"/>
      <TextField source="title"/>
      <NumberField source="order"/>
      <ReferenceField source="unitId" reference="units"/>
    </Datagrid>
  </List>
);