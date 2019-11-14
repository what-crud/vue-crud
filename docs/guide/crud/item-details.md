# Item details

Item details form is a modal dialog that shows when user click for create or edit selected item. This component is an integral part of `crud` component but you can customize it if you wish. 
You can achieve it using the slots:

``` html
<template>
  <crud
    :prefix="prefix"
    :path="path"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')"
  >

    <!-- Example of slot usage: -->
    <template #item-details-under-fields>
      Lorem ipsum...
    </template>

  </crud>
</template>
```

## Slots

### **item-details-title**

Slot for dialog title.

Slot scope: { title }

Default template:

```html
<v-card-title
    class="headline"
>
    {{ details.action == 'multiedit' ? $t('global.details.multipleUpdateTitle') : title }}
</v-card-title>
```

Example:
```html
<template #item-details-title="{ title }">
    {{ title }}
</template>
```

### **item-details-over-fields**

Slot for content over the item fields.

Slot scope: {}

Example:
```html
<template #item-details-over-fields>
    Lorem ipsum...
</template>
```

### **item-details-field:[name]**

Dynamic slot for selected field.

Slot scope: {
    value,
    fieldType,
    field,
    reload,
    rules,
    changeValue,
}

Example:
```html
<template #item-details-field:name="{ value, changeValue }">
    <input
        style="border: 1px solid black"
        v-model="value"
        @change="changeValue(value)"
    />
</template>
<template #item-details-field:code="{ value, changeValue }">
    <input
        style="border: 1px solid black; color: white; background-color: red;"
        v-model="value"
        @change="changeValue(value)"
    />
</template>
```

### **item-details-under-fields**

Slot for content under the item fields.

Slot scope: {}

Example:
```html
<template #item-details-under-fields>
    Lorem ipsum...
</template>
```

### **item-details-custom-actions**

Slot for custom actions.

Slot scope: {}

Example:
```html
<template #item-details-custom-actions>
    <button>Custom action</button>
</template>
```