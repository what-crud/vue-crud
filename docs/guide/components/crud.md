# CRUD

## CRUD component

### Import:
**import Crud from '@/utils/crud/components/Crud.vue'**

### Props:

<!-- @vuese:[name]:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|prefix|-|`String`|`false`|null|
|path|-|`String`|`false`|null|
|paths|-|`Object`|`false`|-|
|fieldsInfo|Array of objects ( [See list of available properties](/guide/crud/field-options.html) ) |`Array`|`false`|-|
|detailsTitle|-|`String`|`false`|-|
|pageTitle|-|`String`|`false`|-|
|editButton|-|`Boolean`|`false`|crud.editButton || null|
|deleteMode|-|`String`|`false`|crud.deleteMode || 'soft'|
|customHeaderButtons|-|`Array`|`false`||
|customButtons|-|`Array`|`false`||
|meta|-|`Array`|`false`||
|itemElements|-|`Object`|`false`|-|
|watchForCreation|-|`Boolean`|`false`|false|
|primaryKey|-|`String`|`false`|crud.primaryKey || 'id'|
|activeColumnName|-|`String`|`false`|crud.activityColumnName || 'active'|
|mode (obsolete)|'ClientSide' or 'ServerSide'|`String`|`false`|'ClientSide'|
|itemsView|[See list of available properties](/guide/crud/items-view.html)|`Object`|`false`|{type: 'table', mode: 'client'}|
|createMode|-|`Boolean`|`false`|crud.createMode === undefined ? true : crud.createMode|
|editMode|-|`Boolean`|`false`|crud.editMode === undefined ? true : crud.editMode|
|mainFilter|-|`Boolean`|`false`|crud.mainFilter === undefined ? true : crud.mainFilter|
|fieldFilters|-|`Boolean`|`false`|crud.fieldFilters === undefined ? true : crud.fieldFilters|
|exportButton|-|`Boolean`|`false`|crud.exportButton === undefined ? true : crud.exportButton|
|refreshButton|-|`Boolean`|`false`|crud.refreshButton === undefined ? true : crud.refreshButton|
|selectManyMode|-|`Boolean`|`false`|crud.selectManyMode === undefined ? true : crud.selectManyMode|
|updateManyMode|-|`Boolean`|`false`|crud.updateManyMode === undefined ? true : crud.updateManyMode|
|removeManyMode|-|`Boolean`|`false`|crud.removeManyMode === undefined ? true : crud.removeManyMode|
|itemDetailsWidth|-|`Any`|`false`|600|


### Slots:

<!-- @vuese:item-details:slots:start -->
|Name|Description|Default Slot Content|Slot scope|
|---|---|---|---|
|list-item-field:[name]|Slot for custom list item field template|ListItemField component|{ value, item }|
|item-details-title|-|Title|{ title }|
|item-details-over-fields|-|-|-|
|item-details-field:[name]|Slot for custom item details field template|ItemDetailsField component|*See below|
|item-details-under-fields|-|-|-|
|item-details-custom-actions|-|-|-|

If standard configuration of Crud component is not enough for you, you can customize it with slots:

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

#### **list-item-field:[name]**

Dynamic slot for selected field in table/tree.

Slot scope: {
  value,
  item,
}

Example:
```html
<template #list-item-field:name="{ value }">
  <span style="color:red;">{{ value }}</span>
</template>
```

#### **item-details-title**

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

#### **item-details-over-fields**

Slot for content over the item fields.

Slot scope: {}

Example:
```html
<template #item-details-over-fields>
    Lorem ipsum...
</template>
```

#### **item-details-field:[name]**

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

#### **item-details-under-fields**

Slot for content under the item fields.

Slot scope: {}

Example:
```html
<template #item-details-under-fields>
    Lorem ipsum...
</template>
```

#### **item-details-custom-actions**

Slot for custom actions.

Slot scope: {}

Example:
```html
<template #item-details-custom-actions>
    <button>Custom action</button>
</template>
```

<!-- @vuese:[name]:props:end -->

### Example:

``` html
<template>
  <crud
    :meta="meta"
    :file-mode="true"
    :prefix="prefix"
    :path="path"
    :page-title="pageTitle"
    :fields-info="fieldsInfo"
    :details-title="$t('detailsTitle')">
  </crud>
</template>

<script>
  import Crud from '@/utils/crud/components/Crud.vue'

  export default {
    data() {
      return {
        prefix: 'crm',
        path: 'company-files',
        pageTitle: 'crm.companyFiles',
        meta: [{
          name: 'path',
        }]
      }
    },
    computed: {
      fieldsInfo() {
        return [{
            text: this.$t('fields.id'),
            name: 'id',
            details: false,
          },
          {
            type: 'select',
            url: 'crm/companies',
            list: {
              value: 'id',
              text: 'common_name',
              data: []
            },
            column: 'company_id',
            text: this.$t('fields.company'),
            name: 'company',
            apiObject: {
              name: 'company.common_name',
            }
          },
          {
            type: 'file',
            column: 'file',
            text: this.$t('fields.file'),
            name: 'file',
            textMode: 'file',
            multiedit: false
          },
          {
            type: 'file',
            column: 'file_2',
            text: this.$t('fields.file2'),
            name: 'file_2',
            textMode: 'file',
            multiedit: false
          },
          {
            type: 'textarea',
            column: 'description',
            text: this.$t('fields.description'),
            name: 'description',
            required: false
          },
        ]
      },
    },
    methods: {},
    components: {
      Crud
    },
    i18n: {
      messages: {
        en: {
          detailsTitle: 'File',
          fields: {
            id: 'Id',
            company: 'Company',
            file: 'File',
            file2: 'File 2',
            description: 'Description',
            type: 'File type',
            size: 'Size'
          },
        }
      }
    },
  }
</script>
```

## Extended details

### Import:

**import ItemDetailsContainer from "@/utils/crud/components/ItemDetailsContainer.vue"**

**import ItemDetailsContainerMixin from "@/utils/crud/mixins/item-details-container.js"**


### Props:

<!-- @vuese:item-details:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|fields|-|—|`false`|-|
|basicInformation|-|—|`false`|-|
|title|-|—|`false`|-|

<!-- @vuese:item-details:props:end -->

### Slots:

<!-- @vuese:item-details:slots:start -->
|Name|Description|Default Slot Content|Slot scope|
|---|---|---|---|
|default|-|-|-|
|item-details-field:[name]|Slot for custom item details field template|ItemDetailsField component|*See below|

<!-- @vuese:item-details:slots:end -->

#### **default**

Slot for content you want to display in extended item details

Slot scope: {}

Example:
```html
<template #default>
  whatever
</template>
```

or just

```html
whatever
```

#### **item-details-field:[name]**

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
```

### Example:

``` html
<template>
  <item-details-container
    :title="$t('title')"
    :fields="fields"
    :basic-information="$t('basicInformation')"
  >
    <!-- Slot - tabs on right side -->
    <v-tab key="positions" ripple>{{ $t('positions') }}</v-tab>
    <v-tab key="comments" ripple>{{ $t('comments') }}</v-tab>
    <!-- Positions -->
    <v-tab-item key="positions">...</v-tab-item>
    <!-- Comments -->
    <v-tab-item key="comments">...</v-tab-item>
  </item-details-container>
</template>

<script>
  import ItemDetailsContainer from "@/utils/crud/components/ItemDetailsContainer.vue"
  import ItemDetailsContainerMixin from "@/utils/crud/mixins/item-details-container.js"

  // Component to fill tabs on the right side
  import CompanyPositions from './CompanyPositions.vue'
  import CompanyComments from './CompanyComments.vue'

  export default {
    mixins: [ItemDetailsContainerMixin],
    components: {
      ItemDetailsContainer,
      CompanyPositions,
      CompanyComments,
    },
    created() {
      this.setIdColumn('id')
    },
    i18n: {
      messages: {
        pl: {
          title: 'Szczegóły firmy',
          basicInformation: 'Dane podstawowe',
          positions: 'Stanowiska',
          comments: 'Komentarze',
          files: 'Pliki',
        },
        en: {
          title: 'Company details',
          basicInformation: 'Basic information',
          positions: 'Positions',
          comments: 'Comments',
          files: 'Files',
        }
      }
    }
  }

</script>
```

## **Children**

### Import:

**import CompanyPositionsChildMixin from "@/utils/crud/mixins/child.js"**

**import ChildrenTable from "@/utils/crud/components/ChildrenTable.vue"**

**import ChildDetails from "@/utils/crud/components/ChildDetails.vue"**

### Example:

``` html
<template>
  <div>
      <company-positions-table
        :fields-info="fileteredTableFields"
        :details-loader="detailsLoader"
        :table-data="childrenList(fileteredTableFields, [], 'id', childItemName, 'active')"
        delete-mode="both"
        :item-elements="itemElements"
      ></company-positions-table>
      <company-position-details
        :details="details"
        :fields-info="fileteredDetailsFields"
      ></company-position-details>
      <company-position-tasks></company-position-tasks>
  </div>
</template>

<script>
import FieldsInfoMixin from '../../positions/mixins/fields.js'
import LocalesMixin from '../../positions/mixins/locales.js'
import ChildElementsMixin from "../../positions/mixins/item-elements.js";
import CompanyPositionsChildMixin from "@/utils/crud/mixins/child.js";
import ChildrenTable from "@/utils/crud/components/ChildrenTable.vue";
import ChildDetails from "@/utils/crud/components/ChildDetails.vue";
import ItemElements from '@/utils/crud/components/ItemElements.vue'

export default {
  mixins: [FieldsInfoMixin, LocalesMixin, ChildElementsMixin, CompanyPositionsChildMixin],
  components: {
    "company-positions-table": ChildrenTable,
    "company-position-details": ChildDetails,
    "company-position-tasks": ItemElements
  },
};
</script>
```

## Children table

### Import:
**import ChildrenTable from "@/utils/crud/components/ChildrenTable.vue"**

### Props:

<!-- @vuese:[name]:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|title|-|`String`|`false`|-|
|fieldsInfo|-|`Array`|`false`|-|
|createMode|-|`Boolean`|`false`|true|
|editMode|-|`Boolean`|`false`|true|
|deleteMode|-|`String`|`false`|'soft'|
|customHeaderButtons|-|`Array`|`false`||
|customButtons|-|`Array`|`false`||
|itemElements|-|`Object`|`false`|-|
|editButton|-|`Boolean`|`false`|true|
|meta|-|`Array`|`false`||
|primaryKey|-|`String`|`false`|'id'|
|tableData|-|`Array`|`false`||
|detailsLoader|-|`Boolean`|`false`|false|

<!-- @vuese:[name]:props:end -->

### Slots:

<!-- @vuese:item-details:slots:start -->
|Name|Description|Default Slot Content|Slot scope|
|---|---|---|---|
|field:[name]|Slot for custom list item field template|ListItemField component|{ value, item }|

If standard configuration of ChildrenTable component is not enough for you, you can customize it with slots:

``` html
<template>
  <div>
    <company-positions-table
      :fields-info="fileteredTableFields"
      :details-loader="detailsLoader"
      :table-data="childrenList(fileteredTableFields, [], 'id', childItemName, 'active')"
      delete-mode="both"
    >
      <!-- Example of slot usage: -->
      <template #field:name="{ value }">
        <strong>{{ value }}</strong>
      </template>
    </company-positions-table>
  </div>
</template>

<script>
import FieldsInfoMixin from '../../positions/mixins/fields.js'
import LocalesMixin from '../../positions/mixins/locales.js'
import CompanyPositionsChildMixin from "@/utils/crud/mixins/child.js";
import ChildrenTable from "@/utils/crud/components/ChildrenTable.vue";

export default {
  mixins: [FieldsInfoMixin, LocalesMixin, CompanyPositionsChildMixin],
  components: {
    "company-positions-table": ChildrenTable,
  },
};
</script>
```

#### **field:[name]**

Dynamic slot for selected field in table/tree.

Slot scope: {
  value,
  item,
}

Example:
```html
<template #field:name="{ value }">
  <span style="color:red;">{{ value }}</span>
</template>
```

### MixIns:

<!-- @vuese:[name]:mixIns:start -->
|MixIn|
|---|
|ClientModeFilteringMixin|
|HelperMixin|

<!-- @vuese:[name]:mixIns:end -->
### Example:

``` html
<template>
  <div>
    <company-positions-table
      :fields-info="fileteredTableFields"
      :details-loader="detailsLoader"
      :table-data="childrenList(fileteredTableFields, [], 'id', childItemName, 'active')"
      delete-mode="both"
    ></company-positions-table>
  </div>
</template>

<script>
import FieldsInfoMixin from '../../positions/mixins/fields.js'
import LocalesMixin from '../../positions/mixins/locales.js'
import CompanyPositionsChildMixin from "@/utils/crud/mixins/child.js";
import ChildrenTable from "@/utils/crud/components/ChildrenTable.vue";

export default {
  mixins: [FieldsInfoMixin, LocalesMixin, CompanyPositionsChildMixin],
  components: {
    "company-positions-table": ChildrenTable,
  },
};
</script>
```

## Child details

### Import:
**import ChildrenTable from "@/utils/crud/components/ChildrenTable.vue"**

### Props:

<!-- @vuese:[name]:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|details|-|`Object`|`false`|-|
|fieldsInfo|-|`Array`|`false`|-|

<!-- @vuese:[name]:props:end -->


### Slots:

|Name|Description|Default Slot Content|Slot scope|
|---|---|---|---|
|title|-|Title|{ title }|
|over-fields|-|-|-|
|field:[name]|Slot for custom item details field template|ItemDetailsField component|*See below|
|under-fields|-|-|-|
|custom-actions|-|-|-|

If standard configuration of ChildDetails component is not enough for you, you can customize it with slots:

``` html
<template>
  <div>
    <company-position-details
      :details="details"
      :fields-info="fileteredDetailsFields"
    >
      <!-- Example of slot usage: -->
      <template #under-fields>
        Lorem ipsum...
      </template>
    </company-position-details>
  </div>
</template>

<script>
import FieldsInfoMixin from '../../positions/mixins/fields.js'
import LocalesMixin from '../../positions/mixins/locales.js'
import CompanyPositionsChildMixin from "@/utils/crud/mixins/child.js";
import ChildDetails from "@/utils/crud/components/ChildDetails.vue";

export default {
  mixins: [FieldsInfoMixin, LocalesMixin, CompanyPositionsChildMixin],
  components: {
    "company-position-details": ChildDetails,
  },
};
</script>
```

#### **title**

Slot for dialog title.

Slot scope: {}

Example:
```html
<template #title>
  Details
</template>
```

#### **over-fields**

Slot for content over the item fields.

Slot scope: {}

Example:
```html
<template #over-fields>
  Lorem ipsum...
</template>
```

#### **field:[name]**

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
<template #field:name="{ value, changeValue }">
  <input
    style="border: 1px solid black"
    v-model="value"
    @change="changeValue(value)"
  />
</template>
<template #field:code="{ value, changeValue }">
  <input
    style="border: 1px solid black; color: white; background-color: red;"
    v-model="value"
    @change="changeValue(value)"
  />
</template>
```

#### **under-fields**

Slot for content under the item fields.

Slot scope: {}

Example:
```html
<template #under-fields>
    Lorem ipsum...
</template>
```

#### **custom-actions**

Slot for custom actions.

Slot scope: {}

Example:
```html
<template #custom-actions>
  <button>Custom action</button>
</template>
```

### Example:

``` html
<template>
  <div>
    <company-position-details
      :details="details"
      :fields-info="fileteredDetailsFields"
    ></company-position-details>
  </div>
</template>

<script>
import FieldsInfoMixin from '../../positions/mixins/fields.js'
import LocalesMixin from '../../positions/mixins/locales.js'
import CompanyPositionsChildMixin from "@/utils/crud/mixins/child.js";
import ChildDetails from "@/utils/crud/components/ChildDetails.vue";

export default {
  mixins: [FieldsInfoMixin, LocalesMixin, CompanyPositionsChildMixin],
  components: {
    "company-position-details": ChildDetails,
  },
};
</script>
```
