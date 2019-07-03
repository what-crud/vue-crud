# CRUD

## Basics
The main element of Vue CRUD is the table management system. This system works in such a way that on the client's side a route is defined for communication with the API, as well as a list of fields in a given table, including information on whether the field should be displayed in the table, whether it is editable, whether it is required, what type it is (text, number, foreign key, etc.), what column in the database it refers to, etc.

Each table must be assigned to a specific module (middleware). Therefore, the paths to resources associated with individual tables look like:

**[*](/api/rest/getting-started.html)/`module`/`table`**

`module` - module designation (slugified),
`table` - table designation (slugified)

According to the REST rules, the API should be structured as follows:
| METHOD    | ADDRESS   | RESOURCE                  |
|-----------|-----------|---------------------------|
| GET       |           | get table data            |
| GET       | ./{id}    | get {id} record details   |
| PUT       | ./{id}    | edit {id} record          |
| POST      |           | store new record          |
| DELETE    | ./{id}    | delete {id} record        |

In addition, the following methods are provided:

According to the REST rules, the API should be structured as follows:
| METHOD    | ADDRESS           | RESOURCE                  |
|-----------|-------------------|---------------------------|
| POST      | ./multiple-update | update selected records   |
| POST      | ./multiple-add    | add some connections to junction table   |
| POST      | ./multiple-delete | delete selected records   |
| POST      | ./search          | get one page of table data based on the specified sorting, filters, page number, etc. |

**Examples**:
- Updating user with id 7:
`PUT`
https://your-site.com/api/admin/users/7
- Get list of posts in CMS module:
`GET`
https://your-site.com/api/cms/posts
- Store new post category:
`POST`
https://your-site.com/api/cms/categories
- Delete product 456 in store module:
`DELETE`
https://your-site.com/api/store/products/456
- Delete few messages from CMS module:
`POST`
https://your-site.com/api/cms/messages/multiple-delete

::: tip
Vue CRUD does not limit the user to creating only modules based on a predefined CRUD system, so you can also create your own paths.
:::

## Get table data

`GET`
**[*](/api/rest/getting-started.html)/[`module`/`table`](/api/rest/crud.html)**

**Example:**
`GET`
https://your-site.com/api/admin/users


**Parameters:**
| Field | Type | Description |
| - | - | - |
| - | - | - |

**Success 200:**
| Field | Type | Description |
| - | - | - |
| - | Object [] | Records list (Table of Objects). |

**Response example:**
``` js
[{
  "id": 1,
  "name": "User 1",
  "email": "user1@demo.com",
  "active": 1,
  "created_at": "2018-02-10 22:21:22",
  "updated_at": "2019-02-07 11:25:01",
  "user_type_id": 2,
  "user_type": {
    "id": 2,
    "name": "Admin",
    "read": 1,
    "insert": 1,
    "update": 1,
    "delete": 1,
    "admin": 1
  }
}, {
  "id": 2,
  "name": "User 2",
  "email": "user2@demo.com",
  "active": 1,
  "created_at": "2018-12-07 15:15:59",
  "updated_at": "2018-12-07 15:15:59",
  "user_type_id": 1,
  "user_type": {
    "id": 1,
    "name": "User",
    "read": 1,
    "insert": 1,
    "update": 1,
    "delete": 1,
    "admin": 0,
  }
}]
```

## Get selected item

`GET`
**[*](/api/rest/getting-started.html)/[`module`/`table`](/api/rest/crud.html)/:id**

**Example:**
`GET`
https://your-site.com/api/admin/users/2


**Parameters:**
| Field | Type | Description |
| - | - | - |
| - | - | - |

**Success 200:**
| Field | Type | Description |
| - | - | - |
| - | Object | Object with record fields |

**Response example:**
``` js
{
  "id": 2,
  "name": "User 2",
  "email": "user2@demo.com",
  "active": 1,
  "created_at": "2018-12-07 15:15:59",
  "updated_at": "2018-12-07 15:15:59",
  "user_type_id": 1
}
```

## Store item

`POST`
**[*](/api/rest/getting-started.html)/[`module`/`table`](/api/rest/crud.html)**

**Example:**
`POST`
https://your-site.com/api/admin/users


**Parameters:**
| Field | Type | Description |
| - | - | - |
| - | Object | Object with record fields |

**Parameters example:**
```
name: User 3
email: user3@demo.com
user_type_id: 3
```

**Success 200:**
| Field | Type | Description |
| - | - | - |
| status | Number | 0 (success) or -1 (validation not passed) |
| msg | Object | Optional. Reasons of the validation failure |
| id | Number/String | Optional. Created element's id |

**Response examples:**
``` js
{
  "id": 3,
  "status": 0
}
```
or
``` js
{
  "msg": {
    "email": ["The email has already been taken."]
  },
  "status": -1
}
```

## Update item

`PUT`
**[*](/api/rest/getting-started.html)/[`module`/`table`](/api/rest/crud.html)/id**

**Example:**
`PUT`
https://your-site.com/api/admin/users/3


**Parameters:**
| Field | Type | Description |
| - | - | - |
| - | Object | Object fields to be updated |

**Parameters example:**
``` js
{
name: User 33
email: user3@demo.com
user_type_id: 3
}
```

**Success 200:**
| Field | Type | Description |
| - | - | - |
| status | Number | 0 (success) or -1 (validation not passed) |
| msg | Object | Optional. Reasons of the validation failure |
| id | Number/String | Optional. Created element's id |

**Response examples:**
``` js
{
  "id": 3,
  "status": 0
}
```
or
``` js
{
  "msg": {
    "email": ["The email has already been taken."]
  },
  "status": -1
}
```

## Delete item

`DELETE`
**[*](/api/rest/getting-started.html)/[`module`/`table`](/api/rest/crud.html)/id**

**Example:**
`DELETE`
https://your-site.com/api/admin/users/3


**Parameters:**
| Field | Type | Description |
| - | - | - |
| - | - | - |

**Success 200:**
| Field | Type | Description |
| - | - | - |
| - | - | - |

## Get paginated data (large tables)

`POST`
**[*](/api/rest/getting-started.html)/[`module`/`table`](/api/rest/crud.html)/search**

**Example:**
`POST`
https://your-site.com/api/crm/people/search


**Parameters:**
| Field | Type | Description |
| - | - | - |
| sortBy | String | Column name |
| descending | Boolean | Sorting direction is descending |
| rowsPerPage | Number | Number of rows per page|
| page | Number | Page number|
| search | String | Search phrases (searching in all columns, space should be a delimeter) |
| selectedStatuses | Array | Selected activity statuses. Array can contain values 0 and 1 |
| deleteMode | String | If equals 'soft', 'both' or 'filter', API should take into account `selectedStatuses` value|
| activeColumnName | String | If equals 'soft', 'both' or 'filter', API should use this column name to filter active/inactive records |
| filterColumns | Object [] | Array of Objects |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; mode | string | 'like', 'equals' or 'list' |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; text | string | Field label |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; name | string | Column name |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; value | string | Field value, nullable |

**Parameters example:**
```
sortBy: 
descending: false
rowsPerPage: 20
page: 1
search: Abbott
filterColumns[0][mode]: like
filterColumns[0][text]: Id
filterColumns[0][name]: id
filterColumns[0][column]: undefined
filterColumns[0][value]: 
filterColumns[1][mode]: like
filterColumns[1][text]: Lastname
filterColumns[1][name]: lastname
filterColumns[1][column]: lastname
filterColumns[1][value]: 
filterColumns[2][mode]: like
filterColumns[2][text]: Firstname
filterColumns[2][name]: firstname
filterColumns[2][column]: firstname
filterColumns[2][value]: 
filterColumns[3][mode]: like
filterColumns[3][text]: Distinction
filterColumns[3][name]: distinction
filterColumns[3][column]: distinction
filterColumns[3][value]: 
filterColumns[4][mode]: like
filterColumns[4][text]: Language
filterColumns[4][name]: language
filterColumns[4][column]: language_id
filterColumns[4][value]: 
filterColumns[5][mode]: like
filterColumns[5][text]: Sex
filterColumns[5][name]: sex
filterColumns[5][column]: sex_id
filterColumns[5][value]: 
filterColumns[6][mode]: like
filterColumns[6][text]: E-mail
filterColumns[6][name]: email
filterColumns[6][column]: email
filterColumns[6][value]: gmail.com
filterColumns[7][mode]: like
filterColumns[7][text]: Phone
filterColumns[7][name]: phone
filterColumns[7][column]: phone
filterColumns[7][value]: 
selectedStatuses[]: 1
deleteMode: soft
activeColumnName: active
mode: paginate
```

**Success 200:**
| Field | Type | Description |
| - | - | - |
|data| Object [] | List of filtered and paginated items (Array of Objects) |
|total| Number | Number of total items (if pagination was turned off)|

**Response example:**
``` js
{
  "current_page": 1,
  "data": [{
      "id": 2635,
      "firstname": "Quincy",
      "lastname": "Abbott",
      "distinction": "Sr.",
      "sex_id": 2,
      "language_id": 2,
      "email": "layla.wilkinson@gmail.com",
      "phone": "(732) 531-0044",
      "active": 1,
      "created_at": null,
      "updated_at": null,
      "sexes_id": 2,
      "sex": {
          "id": 2,
          "name": "M\u0119\u017cczyzna",
          "code": "M",
          "eng_name": "Male",
          "eng_code": "M",
          "priority": 2,
          "active": 1,
          "created_at": null,
          "updated_at": null
      },
      "languages_id": 2,
      "language": {
          "id": 2,
          "name": "Angielski",
          "priority": 2,
          "active": 1,
          "created_at": null,
          "updated_at": null
      },
      "fullname": "Abbott Quincy"
  }, {
      "id": 1110,
      "firstname": "Vicenta",
      "lastname": "Abbott",
      "distinction": "PhD",
      "sex_id": 3,
      "language_id": 2,
      "email": "jmayert@gmail.com",
      "phone": "767-908-9556",
      "active": 1,
      "created_at": null,
      "updated_at": null,
      "sexes_id": 3,
      "sex": {
          "id": 3,
          "name": "Kobieta",
          "code": "K",
          "eng_name": "Female",
          "eng_code": "F",
          "priority": 3,
          "active": 1,
          "created_at": null,
          "updated_at": null
      },
      "languages_id": 2,
      "language": {
          "id": 2,
          "name": "Angielski",
          "priority": 2,
          "active": 1,
          "created_at": null,
          "updated_at": null
      },
      "fullname": "Abbott Vicenta"
  }, {
      "id": 2081,
      "firstname": "River",
      "lastname": "Bogan",
      "distinction": "IV",
      "sex_id": 3,
      "language_id": 2,
      "email": "cabbott@gmail.com",
      "phone": "+1-352-613-4426",
      "active": 1,
      "created_at": null,
      "updated_at": null,
      "sexes_id": 3,
      "sex": {
          "id": 3,
          "name": "Kobieta",
          "code": "K",
          "eng_name": "Female",
          "eng_code": "F",
          "priority": 3,
          "active": 1,
          "created_at": null,
          "updated_at": null
      },
      "languages_id": 2,
      "language": {
          "id": 2,
          "name": "Angielski",
          "priority": 2,
          "active": 1,
          "created_at": null,
          "updated_at": null
      },
      "fullname": "Bogan River"
  }, {
      "id": 557,
      "firstname": "Sydnee",
      "lastname": "Romaguera",
      "distinction": "Sr.",
      "sex_id": 3,
      "language_id": 2,
      "email": "eabbott@gmail.com",
      "phone": "1-696-966-4145",
      "active": 1,
      "created_at": null,
      "updated_at": null,
      "sexes_id": 3,
      "sex": {
          "id": 3,
          "name": "Kobieta",
          "code": "K",
          "eng_name": "Female",
          "eng_code": "F",
          "priority": 3,
          "active": 1,
          "created_at": null,
          "updated_at": null
      },
      "languages_id": 2,
      "language": {
          "id": 2,
          "name": "Angielski",
          "priority": 2,
          "active": 1,
          "created_at": null,
          "updated_at": null
      },
      "fullname": "Romaguera Sydnee"
  }],
  "from": 1,
  "last_page": 1,
  "next_page_url": null,
  "path": "http:\/\/127.0.0.1:8000\/api\/crm\/people\/search",
  "per_page": "20",
  "prev_page_url": null,
  "to": 4,
  "total": 4
}
```

## Update many items

## Delete many items

## Add many connections in junction table

## Upload file

`POST`
**[**](/api/rest/getting-started.html)**
(path to uploading files must be set in config file)

**Example:**
`POST`
https://your-site.com/api/files/file-upload


**Parameters:**
| Field | Type | Description |
| - | - | - |
| file | Binary data | File to upload |
| module | String | current module name |
| table | String | current table |
| field | String | field name |

`module`, `table` and `field` values can help to organize files on the storage.

**Parameters example:**
```
file: (binary)
module: crm
table: company-files
field: file
```

**Success 200:**
| Field | Type | Description |
| - | - | - |
| path | String | Relative path to file |
| status | Number | 0 (success), -1 (requested module doesn't exist), -2 (access denied or file validation error, e.g. wrong format) |

**Response example:**
``` js
{
  path: "files/crm/company-files/file/1549553733000001"
  status: 0
}
```
::: warning
File must be uploaded with its original name, because CORS doesn't allow file sharing under a different name than the original file name. For this reason, the suggested way to save files is:
**[**](/api/rest/getting-started.html)/files/`module`/`table`/`field`/`random`/`filename`**

**Example:**
https://your-site.com/api/files/crm/company-files/file/1549553733000001/image.jpg
:::

## Custom request

