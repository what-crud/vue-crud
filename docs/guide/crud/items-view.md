# Items view

## `type`
*String*, default: **table**. Available values: **table**, **tree**. Information items view should be displayed as table or tree.

## `mode`
*String*, default: **client**. Available values: **client**, **server**. Information items view should be automatically by Vue CRUD or server side by API.

## `config`
*Object*, optional. Property must be defined if field `type` is **tree**.

Parameters:
- `parentColumnName`: Name of column with parent item id. Default value: **parent_id**
- `unassignedItemParent`: Value of item's parent that means this item is unassigned (root object). Default value: **null**