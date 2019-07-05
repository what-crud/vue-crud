# Field options

## `async`
*Object*, default: **false**.  Property can be specified if field `type` is **select**. Information whether the list is asynchronyous.

## `apiObject`
*Object*, optional. If the field to be displayed in the table is not directly in the downloaded object, but is nested inside the object or the field is to be displayed in an unusual way, then the display method can be specified here.\
Parameters:
- `name`: eg. 'car_brand.name',
- `functions`: array of functions used to modify given field. You can define your functions in **src/helpers/functions.js** file.

## `column`
*String*. The column in the table referenced by the field.

## `create`
*Boolean*, default: **true**. Responsible for displaying the field in the creating item form.

## `details`
*Boolean*, default: **true**. Responsible for displaying the field in the item details.

## `grid`
*String*, optional. Vuetify grid used in extended details. This parameter is used to determine the field width on different screens.

## `multiedit`
*Boolean*, default: **true**. Responsible for displaying the field in the multiple update form.

## `name`
*String*. If `apiObject.name` is defined, you must define custom field name. Eg. if table `column` is *car_brand_id*, and its `apiObject.name` is *car_brand.name*, the name may be *car_brand* or *car_brand_name*.

## `list`
*Object*, optional. Property must be defined if field `type` is **select**.

Parameters:
- `value`: primary key in select recordset.
- `text`: column with data to be displayed in the select field. If text is the nested property od `data` object then use dots to concatenate elements, eg. `position.person.email`.
- `complexName`: If record's label must contain multiple fields, use this property instead of `text`. It works the same as `text` but fields must be placed in array:
```js
{
    value: 'id',
    text: 'complexName',
    complexName: ['person.fullname', 'company.common_name', 'name'],
    data: []
}
```
- `data`: array of list elements. Array item should contain keys from `value` and `text` property. Example:
```js
{
    value: 'name',
    text: 'label',
    data: [
        {
            name: 'input',
            label: 'Input'
        },
        {
            name: 'textarea',
            label: 'Textarea'
        },
        {
            name: 'file',
            label: 'File'
        }
    ]
}
```

::: warning WARNING
If `url` property has been set, `data` content will be ignored and it will be uploaded from API.
:::

## `stringId`
*Boolean*, default **false**. Property can be specified if field `type` is **select**. Information, whether this field is non-numeric ID.

## `table`
*Boolean*, default: **true**. Responsible for displaying the field in the CRUD table.

## `text`
*String*. Field label (item details) and header (table). You can hardcode it or use i18n.

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
- select (this field uses `list`, `url`, `stringId` and `async` property),
- textarea,
- datePicker,
- richTextBox,
- checkbox,
- dynamic (this field uses `typeField` property),

## `typeField`
*String*, optional. Property must be defined if field `type` is **dynamic**. This field contains `name` of another field, which value determines this field's type. Example:
```js
fieldsInfo () {
    return [
        {
            type: 'select',
            list: {
                value: 'name',
                text: 'label',
                data: [
                    {
                        name: 'input',
                        label: this.$t('fieldTypes.input')
                    },
                    {
                        name: 'textarea',
                        label: this.$t('fieldTypes.textarea')
                    },
                    {
                        name: 'file',
                        label: this.$t('fieldTypes.file')
                    }
                ]
            },
            stringId: true,
            column: 'type',
            text: this.$t('fields.type'),
            name: 'type'
        },
        {
            type: 'dynamic',
            typeField: 'type',
            column: 'value',
            text: this.$t('fields.value'),
            name: 'value'
        }
    ]
}
```

## `url`
*String*, optional. Path to resource with list items. Property can be specified if field `type` is **select**.

::: tip INFO
If `url` and `path.default` property has been set in **src/config/api.js** file, only the rest of path is required.
:::
