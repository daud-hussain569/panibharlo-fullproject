import { List, Datagrid, TextField, NumberField } from "react-admin";

export default {
  list: (props) => (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <NumberField source="price" />
        <TextField source="category" />
      </Datagrid>
    </List>
  ),
};
