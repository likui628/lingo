import {Datagrid, List, NumberField, ReferenceField, TextField} from 'react-admin';

export const UnitList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id"/>
      <TextField source="title"/>
      <TextField source="description"/>
      <NumberField source="order"/>
      <ReferenceField source="courseId" reference="courses"/>
    </Datagrid>
  </List>
);