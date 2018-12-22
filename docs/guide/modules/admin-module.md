# Admin module
Admin module is thing that should be added by default to each project. It contains the logic that allows you to manage user access to your application. Routing to this page should be included in the file `src/routes/main/router.js` according to the instructions in the 'router' chapter.\
Admin module is located in `src/routes/main/routes/administration` directory.

#### Folder structure:
```
.
├─ Index.vue
├─ router.js
└─ routes
    ├─ permissions
    |  └─ Index.vue
    ├─ user-permissions
    |  └─ Index.vue
    └─ users.js
        └─ Index.vue
```
The module is created using the CRUD mechanism and its logic complies with the instructions in the next chapter about creating own CRUD modules.\
By default this module contains 3 sites:
* permissions - list of permissions, users assigned to the specific permission,
* user permissions - list of all user-permission connections
* users - list of users, permissions assigned to the specific user, reset password option