export const configParams = {
    title: "Vue CRUD",
    logoLg: 'vue-crud-lg.png',
    logoSm: 'vue-crud-sm.png',
    locales: [{
            name: 'en',
            text: 'English'
        },
        {
            name: 'pl',
            text: 'Polski'
        },
    ],
    defaultLocale: 'en',
    localeSelectable: true,
    iconfont: 'md',
    primaryTheme: 'dark',
    secondaryTheme: 'dark',
    theme: {
        primary: '#34495e',
        secondary: '#41b883',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    },
    footer: false,
    footerText: '© 2019',
    sidebarExpandOn: 'mouseover',
    sidebarItems: [
        {
            icon: "people",
            text: "crm.name",
            model: false,
            guard: "CRM",
            route: "/crm",
            children: [{
                    text: "crm.companies",
                    route: "/companies"
                },
                {
                    text: "crm.companyTypes",
                    route: "/company-types"
                },
                {
                    text: "crm.companyFiles",
                    route: "/company-files"
                },
                {
                    text: "crm.companyComments",
                    route: "/company-comments"
                },
                {
                    text: "crm.companyCommentTypes",
                    route: "/company-comment-types"
                },
                {
                    text: "crm.people",
                    route: "/people"
                },
                {
                    text: "crm.personComments",
                    route: "/person-comments"
                },
                {
                    text: "crm.personCommentTypes",
                    route: "/person-comment-types"
                },
                {
                    text: "crm.positions",
                    route: "/positions"
                },
                {
                    text: "crm.positionTasks",
                    route: "/position-tasks"
                },
                {
                    text: "crm.tasks",
                    route: "/tasks"
                }
            ]
        },
        {
            icon: "person_add_disabled",
            text: "admin.name",
            model: false,
            guard: "ADMIN",
            route: "/administration",
            children: [{
                    text: "admin.users",
                    route: "/users"
                },
                {
                    text: "admin.permissions",
                    route: "/permissions"
                },
                {
                    text: "admin.userPermissions",
                    route: "/user-permissions"
                }
            ]
        }
    ]
}