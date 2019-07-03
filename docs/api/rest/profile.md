# Profile

## About
The user profile allows you to edit the user's basic data, ie his email address, name and password. All routes should be secured with a middleware to check if the user is logged in.

## Editing user data

`POST`
**[*](/api/rest/getting-started.html)/auth/user**

**Parameters:**
| Field | Type | Description |
| - | - | - |
| email | String | User email |
| name | String | User name |

**Success 200:**
| Field | Type | Description |
| - | - | - |
| name | String | User name |
| user | String | User email |

**Error 4xx:**
| Field | Type | Description |
| - | - | - |
| error | String | An error message |

**Error 5xx:**
| Field | Type | Description |
| - | - | - |
| error | String | An error message |

## Password change

`POST`
**[*](/api/rest/getting-started.html)/auth/user-password**

**Parameters:**
| Field | Type | Description |
| - | - | - |
| old | String | Old password |
| new | String | New password |
| repeat | String | New password |

**Success 200:**
| Field | Type | Description |
| - | - | - |
| status | Number | 0 (success) or -1 (validation not passed) |
| msg | String | Optional. Reason of the failure |

**Error 4xx:**
| Field | Type | Description |
| - | - | - |
| error | String | An error message |

**Error 5xx:**
| Field | Type | Description |
| - | - | - |
| error | String | An error message |