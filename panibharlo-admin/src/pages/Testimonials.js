import React from "react";
import {
  List, Datagrid, TextField, NumberField, DateField,
  EditButton, Edit, SimpleForm, TextInput, NumberInput
} from "react-admin";

export const TestimonialsList = (props) => (
  <List {...props} title="Testimonials">
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="message" />
      <NumberField source="rating" />
      <DateField source="createdAt" label="Created" />
      <DateField source="updatedAt" label="Updated" />
      <EditButton />
    </Datagrid>
  </List>
);

export const TestimonialsEdit = (props) => (
  <Edit {...props} title="Edit Testimonial">
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="message" />
      <NumberInput source="rating" />
    </SimpleForm>
  </Edit>
);

export default { list: TestimonialsList, edit: TestimonialsEdit };
