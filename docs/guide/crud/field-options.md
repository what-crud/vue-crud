# Field options

## `text`
*String*. Field label (item details) and header (table). You can hardcode it or use i18n.

## `column`
*String*. The column in the table referenced by the field.

## `name`
*String*. If `apiObject.name` is defined, you must define custom field name. Eg. if table `column` is *car_brand_id*, and its `apiObject.name` is *car_brand.name*, the name may be *car_brand* or *car_brand_name*.

## `table`
*Boolean*, default: **true**. Responsible for displaying the field in the CRUD table.

## `details`
*Boolean*, default: **true**. Responsible for displaying the field in the item details.

## `create`
*Boolean*, default: **true**. Responsible for displaying the field in the creating item form.

## `multiedit`
*Boolean*, default: **true**. Responsible for displaying the field in the multiple update form.

## `apiObject`
*Object*, optional. If the field to be displayed in the table is not directly in the downloaded object, but is nested inside the object or the field is to be displayed in an unusual way, then the display method can be specified here.\
Parameters:
- `name`: eg. 'car_brand.name',
- `functions`: array of functions used to modify given field. You can define your functions in **src/helpers/functions.js** file.

## `type`
*String*, optional. Type of field. Must be defined if `details` is set to **true**. You may use following types:
- input,
- number,
- decimal,
- date,
- time,
- datetime,
- textarea,
- file,
- select,
- textarea,
- datePicker,
- richTextBox,
- checkbox

## `list`
*Object*, optional. Field must be defined if field `type` is **select**.\
Parameters:
- `value`: primary key in select recordset,
- `text`: column with data to be displayed in the select field,
- `data`: [] (empty array)

## `grid`
*String*, optional. Vuetify grid used in extended details. This parameter is used to determine the field width on different screens.
