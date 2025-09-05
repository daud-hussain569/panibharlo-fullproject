import React from "react";
import {
  List, Datagrid, TextField, NumberField, DateField,
  ReferenceField, EditButton, Edit, SimpleForm, NumberInput,
  ReferenceInput, SelectInput, TextInput
} from "react-admin";

const statusChoices = [
  { id: "Pending", name: "Pending" },
  { id: "In Transit", name: "In Transit" },
  { id: "Delivered", name: "Delivered" }
];

export const BottleOrdersList = (props) => (
  <List {...props} title="Bottle Orders">
    <Datagrid rowClick="edit">
      <ReferenceField source="user" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="deliverer" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="product" reference="products">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="quantity" />
      <TextField source="status" />
      <TextField source="address" />
      <DateField source="createdAt" label="Created" />
      <DateField source="updatedAt" label="Updated" />
      <EditButton />
    </Datagrid>
  </List>
);

export const BottleOrdersEdit = (props) => (
  <Edit {...props} title="Edit Bottle Order">
    <SimpleForm>
      <ReferenceInput source="user" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="deliverer" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="product" reference="products">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="quantity" />
      <SelectInput source="status" choices={statusChoices} />
      <TextInput source="address" />
    </SimpleForm>
  </Edit>
);

export default { list: BottleOrdersList, edit: BottleOrdersEdit };
