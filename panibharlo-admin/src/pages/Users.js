import React from "react";
import {
  List, Datagrid, TextField, EmailField, DateField,
  EditButton, Edit, SimpleForm, TextInput, SelectInput
} from "react-admin";

const roleChoices = [
  { id: "user", name: "User" },
  { id: "admin", name: "Admin" },
  { id: "superadmin", name: "Superadmin" },
  { id: "deliverer", name: "Deliverer" }
];

export const UsersList = (props) => (
  <List {...props} title="Users">
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="role" />
      <DateField source="createdAt" label="Created" />
      <DateField source="updatedAt" label="Updated" />
      <EditButton />
    </Datagrid>
  </List>
);

export const UsersEdit = (props) => (
  <Edit {...props} title="Edit User">
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <SelectInput source="role" choices={roleChoices} />
    </SimpleForm>
  </Edit>
);

export default { list: UsersList, edit: UsersEdit };
