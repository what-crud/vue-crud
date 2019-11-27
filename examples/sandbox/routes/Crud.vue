<template>
  <div style="margin:20px;">
    <v-row
      wrap
      mb-5
    >
      <v-col
        cols="12"
        xs="12"
      >
        <v-tabs
          v-model="activeTab"
          slider-color="primary"
        >
          <v-tab
            key="crudConfig"
            ripple
          >
            CRUD Configuration
          </v-tab>
          <v-tab
            key="fieldsConfig"
            ripple
          >
            Fields Configuration
          </v-tab>
          <v-tab
            key="customButtons"
            ripple
          >
            Custom buttons
          </v-tab>
          <v-tab
            key="template"
            ripple
          >
            Template
          </v-tab>
          <v-tab
            key="script"
            ripple
          >
            Script
          </v-tab>
          <v-tab
            key="otherSites"
            ripple
          >
            Other sites
          </v-tab>

          <v-tab-item key="crudConfig">
            <v-card flat>
              <v-card-text>
                <v-row wrap>
                  <v-col
                    cols="12"
                    xs="12"
                    md="6"
                    lg="3"
                    px-5
                  >
                    <v-text-field
                      label="detailsTitle"
                      v-model="detailsTitle"
                    />
                    <v-select
                      label="deleteMode"
                      :items="['none', 'soft', 'hard', 'both', 'filter']"
                      v-model="deleteMode"
                    />
                    <v-switch
                      color="green"
                      label="refreshButton"
                      v-model="refreshButton"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    xs="12"
                    md="6"
                    lg="3"
                    px-5
                  >
                    <v-switch
                      color="green"
                      label="exportButton"
                      v-model="exportButton"
                    />
                    <v-switch
                      color="green"
                      label="fieldFilters"
                      v-model="fieldFilters"
                    />
                    <v-switch
                      color="green"
                      label="mainFilter"
                      v-model="mainFilter"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    xs="12"
                    md="6"
                    lg="3"
                    px-5
                  >
                    <v-switch
                      color="green"
                      label="createMode"
                      v-model="createMode"
                    />
                    <v-switch
                      color="green"
                      label="editMode"
                      v-model="editMode"
                    />
                    <v-switch
                      color="green"
                      label="editButton"
                      v-model="editButton"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    xs="12"
                    md="6"
                    lg="3"
                    px-5
                  >
                    <v-switch
                      color="green"
                      label="selectManyMode"
                      v-model="selectManyMode"
                    />
                    <v-switch
                      color="green"
                      label="updateManyMode"
                      v-model="updateManyMode"
                    />
                    <v-switch
                      color="green"
                      label="removeManyMode"
                      v-model="removeManyMode"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item key="fieldsConfig">
            <v-card flat>
              <v-card-text>
                <v-row wrap>
                  <v-col
                    cols="12"
                    xs="12"
                    md="6"
                    lg="3"
                    px-5
                  >
                    <h3>ID</h3>
                    <v-switch
                      color="green"
                      label="Show in table"
                      v-model="idTable"
                    />
                    <v-select
                      label="Field type"
                      :items="[]"
                      disabled
                    />
                    <v-switch
                      color="green"
                      label="Details"
                      v-model="falseConst"
                      disabled
                    />
                    <v-switch
                      color="green"
                      label="Required"
                      v-model="falseConst"
                      disabled
                    />
                    <v-switch
                      color="green"
                      label="Multiedit"
                      v-model="falseConst"
                      disabled
                    />
                    <v-select
                      label="Text mode"
                      :items="['text']"
                      value="text"
                      disabled
                    />
                    <v-select
                      label="Functions"
                      :items="['boolean']"
                      :value="[]"
                      multiple
                      disabled
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    xs="12"
                    md="6"
                    lg="3"
                    px-5
                  >
                    <h3>Name</h3>
                    <v-switch
                      color="green"
                      label="Show in table"
                      v-model="nameTable"
                    />
                    <v-select
                      label="Field type"
                      :items="['input']"
                      disabled
                      value="input"
                    />
                    <v-switch
                      color="green"
                      label="Details"
                      v-model="trueConst"
                      disabled
                    />
                    <v-switch
                      color="green"
                      label="Required"
                      v-model="trueConst"
                      disabled
                    />
                    <v-switch
                      color="green"
                      label="Multiedit"
                      v-model="falseConst"
                      disabled
                    />
                    <v-select
                      label="Text mode"
                      :items="['text']"
                      value="text"
                      disabled
                    />
                    <v-select
                      label="Functions"
                      :items="['boolean']"
                      :value="[]"
                      multiple
                      disabled
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    xs="12"
                    md="6"
                    lg="3"
                    px-5
                  >
                    <h3>Description</h3>
                    <v-switch
                      color="green"
                      label="Show in table"
                      v-model="descriptionTable"
                    />
                    <v-select
                      label="Field type"
                      :items="['input', 'textarea', 'richTextBox']"
                      v-model="descriptionFieldType"
                    />
                    <v-switch
                      color="green"
                      label="Details"
                      v-model="descriptionDetails"
                    />
                    <v-switch
                      color="green"
                      label="Required"
                      v-model="descriptionRequired"
                    />
                    <v-switch
                      color="green"
                      label="Multiedit"
                      v-model="descriptionMultiedit"
                    />
                    <v-select
                      label="Text mode"
                      :items="['text', 'html']"
                      v-model="descriptionTextMode"
                    />
                    <v-select
                      label="Functions"
                      :items="['boolean']"
                      :value="[]"
                      multiple
                      disabled
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    xs="12"
                    md="6"
                    lg="3"
                    px-5
                  >
                    <h3>Activity</h3>
                    <v-switch
                      color="green"
                      label="Show in table"
                      v-model="activeTable"
                    />
                    <v-select
                      label="Field type"
                      :items="['checkbox']"
                      disabled
                      value="checkbox"
                    />
                    <v-switch
                      color="green"
                      label="Details"
                      v-model="activeDetails"
                    />
                    <v-switch
                      color="green"
                      label="Required"
                      v-model="trueConst"
                      disabled
                    />
                    <v-switch
                      color="green"
                      label="Multiedit"
                      v-model="activeMultiedit"
                    />
                    <v-select
                      label="Text mode"
                      :items="['text', 'html']"
                      v-model="activeTextMode"
                    />
                    <v-select
                      label="Functions"
                      :items="['boolean']"
                      v-model="activeFunctions"
                      multiple
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="customButtons">
            <v-card flat>
              <v-card-text>
                <v-row wrap>
                  <v-col
                    cols="12"
                    xs="12"
                    md="6"
                    px-5
                  >
                    <v-switch
                      color="green"
                      label="Show alert button"
                      v-model="showButton1"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    xs="12"
                    md="6"
                    px-5
                  >
                    <v-switch
                      color="green"
                      label="Show form button"
                      v-model="showButton2"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item key="template">
            <v-card flat>
              <v-card-text text-xs-center>
                <code
                  style="width:100%;max-height: 400px;overflow-y:auto"
                  v-text="template"
                ></code>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item key="script">
            <v-card
              flat
              style="max-height: 400px;overflow-y:auto"
            >
              <v-card-text>
                <code
                  style="width:100%"
                  v-text="script"
                ></code>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item key="otherSites">
            <v-card
              flat
              style="max-height: 400px;overflow-y:auto"
            >
              <v-card-text>
                <ul>
                  <li>
                    <router-link to="/app">App layout demo/sandbox</router-link>
                  </li>
                  <li>
                    <router-link to="/login">Login demo/sandbox</router-link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/what-crud/vue-crud"
                      target="_blank"
                    >GitHub</a>
                  </li>
                  <li>
                    <a
                      href="https://vue-crud.github.io/"
                      target="_blank"
                    >Docs</a>
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>

    <crud
      :prefix="prefix"
      :path="path"
      :pageTitle="pageTitle"
      :fieldsInfo="fieldsInfo"
      :detailsTitle="detailsTitle"
      :deleteMode="deleteMode"
      :refreshButton="refreshButton"
      :exportButton="exportButton"
      :fieldFilters="fieldFilters"
      :mainFilter="mainFilter"
      :createMode="createMode"
      :editMode="editMode"
      :editButton="editButton"
      :selectManyMode="selectManyMode"
      :updateManyMode="updateManyMode"
      :removeManyMode="removeManyMode"
      :customButtons="buttons"
    >
    </crud>
    <alert-box></alert-box>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-text>
          id: {{ item.id}}
        </v-card-text>
        <v-card-text>
          name: {{ item.name}}
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'
import AlertBox from '@/utils/app/components/AlertBox.vue'

export default {
  data () {
    return {
      dialog: false,
      trueConst: true,
      falseConst: false,
      activeTab: 'crudConfig',
      prefix: 'demo',
      path: 'tasks',
      pageTitle: 'demo.tasks',
      detailsTitle: '',
      deleteMode: 'soft',
      refreshButton: true,
      exportButton: true,
      fieldFilters: true,
      mainFilter: true,
      createMode: true,
      editMode: true,
      editButton: true,
      selectManyMode: true,
      updateManyMode: true,
      removeManyMode: true,
      idTable: true,
      nameTable: true,
      descriptionTable: true,
      descriptionMultiedit: true,
      descriptionDetails: true,
      descriptionRequired: false,
      descriptionFieldType: 'richTextBox',
      descriptionTextMode: 'html',
      activeTable: true,
      activeMultiedit: false,
      activeDetails: false,
      activeTextMode: 'html',
      activeFunctions: ['boolean'],
      showButton1: true,
      showButton2: true,
      item: {},
    }
  },
  created () {
    this.detailsTitle = this.$t('detailsTitle')
  },
  methods: {
    showAlert (item) {
      alert(`id: ${item.id}, name: ${item.name}`)
    },
    showForm (item) {
      this.item = item
      this.dialog = true
    },
  },
  computed: {
    fieldsInfo () {
      return [
        {
          text: this.$t('fields.id'),
          name: 'id',
          details: false,
          table: this.idTable,
        },
        {
          type: 'input',
          column: 'name',
          text: this.$t('fields.name'),
          name: 'name',
          table: this.nameTable,
          multiedit: false,
        },
        {
          type: this.descriptionFieldType,
          column: 'description',
          text: this.$t('fields.description'),
          name: 'description',
          required: this.descriptionRequired,
          table: this.descriptionTable,
          details: this.descriptionDetails,
          multiedit: this.descriptionMultiedit,
          textMode: this.descriptionTextMode,
        },
        {
          type: 'checkbox',
          column: 'active',
          text: this.$t('fields.active'),
          name: 'active',
          table: this.activeTable,
          create: false,
          details: this.activeDetails,
          multiedit: this.activeMultiedit,
          apiObject: {
            name: 'active',
            functions: this.activeFunctions,
          },
          textMode: this.activeTextMode,
        },
      ]
    },
    button1 () {
      return [
        {
          name: 'showAlert',
          icon: 'notification_important',
          color: 'yellow',
          text: this.$t('buttons.showAlert'),
        },
      ]
    },
    button2 () {
      return [
        {
          name: 'showForm',
          icon: 'insert_comment',
          color: 'blue',
          text: this.$t('buttons.showForm'),
        },
      ]
    },
    buttons () {
      let obj1 = this.showButton1 ? this.button1 : []
      let obj2 = this.showButton2 ? this.button2 : []
      return [
        ...obj1,
        ...obj2,
      ]
    },
    template () {
      return `
          <template>
            <div>
              <crud
                :prefix="prefix"
                :path="path"
                :pageTitle="pageTitle"
                :fieldsInfo="fieldsInfo"
                detailsTitle="${this.detailsTitle}" ${this.deleteMode === 'soft' ? '' : `
                deleteMode="${this.deleteMode}"`} ${this.refreshButton ? '' : `
                :refreshButton="false"`} ${this.exportButton ? '' : `
                :exportButton="false"`} ${this.fieldFilters ? '' : `
                :fieldFilters="false"`} ${this.mainFilter ? '' : `
                :mainFilter="false"`} ${this.createMode ? '' : `
                :createMode="false"`} ${this.editMode ? '' : `
                :editMode="false"`} ${this.editButton ? '' : `
                :editButton="false"`} ${this.selectManyMode ? '' : `
                :selectManyMode="false"`} ${this.updateManyMode ? '' : `
                :updateManyMode="false"`} ${this.removeManyMode ? '' : `
                :removeManyMode="false"`} ${this.showButton1 || this.showButton2 ? `
                :customButtons="buttons"` : ''}
              >
              </crud>
              <alert-box></alert-box> ${!this.showButton2 ? '' : `
              <v-dialog
                v-model="dialog"
                max-width="290"
              >
                <v-card>
                  <v-card-text>
                    id: {{ item.id}}
                  </v-card-text>
                  <v-card-text>
                    name: {{ item.name}}
                  </v-card-text>
                </v-card>
              </v-dialog>`}
            </div>
          </template>
        `
    },
    script () {
      return `
          import Crud from '@/utils/crud/components/Crud.vue'
          import AlertBox from "@/utils/app/components/AlertBox.vue";

          export default {
            data() {
              return {
                prefix: 'demo',
                path: 'tasks',
                pageTitle: 'demo.tasks',
              }
            },
            computed: {
              fieldsInfo() {
                return [
                  {
                    text: this.$t('fields.id'),
                    name: 'id',
                    details: false, ${this.idTable ? '' : `
                    table: false,`}
                  },
                  {
                    type: 'input',
                    column: 'name',
                    text: this.$t('fields.name'),
                    name: 'name', ${this.nameTable ? '' : `
                    table: false,`}
                    multiedit: false,
                  },
                  {
                    type: ${this.descriptionFieldType},
                    column: 'description',
                    text: this.$t('fields.description'),
                    name: 'description', ${this.descriptionTable ? '' : `
                    table: false,`} ${this.descriptionDetails ? '' : `
                    details: false,`} ${this.descriptionRequired ? '' : `
                    required: false,`} ${this.descriptionMultiedit ? '' : `
                    multiedit: false,`}
                  },
                  {
                    type: 'checkbox',
                    column: 'active',
                    text: this.$t('fields.active'),
                    name: 'active', ${this.activeTable ? '' : `
                    table: false,`} ${this.activeDetails ? '' : `
                    create: false,
                    details: false,`} ${this.activeMultiedit ? '' : `
                    multiedit: false,`} ${this.activeFunctions.length === 0 ? '' : `
                    apiObject: {
                      name: 'active',
                      functions: ${JSON.stringify(this.activeFunctions)}
                    },`}
                    textMode: ${this.activeTextMode},
                  },
                ]
              }, ${this.showButton1 || this.showButton2 ? `
              buttons () { 
                return [ ${this.showButton1 ? `
                  {
                    name: 'showAlert',
                    icon: 'notification_important',
                    color: 'yellow',
                    text: this.$t('buttons.showAlert')
                  },` : ''} ${this.showButton2 ? `
                  {
                    name: 'showForm',
                    icon: 'insert_comment',
                    color: 'blue',
                    text: this.$t('buttons.showForm')
                  }` : ''}
                ]
              },` : ''}
            }, ${this.showButton1 || this.showButton2 ? `
            methods: { ${this.showButton1 ? `
              showAlert (item) {
                alert(\`id: \${item.id}, name: \${item.name}\`)
              },` : ''} ${this.showButton2 ? `
              showForm (item) {
                this.item = item
                this.dialog = true
              }` : ''}
            },` : ''}
            components: {
              Crud,
              AlertBox,
            },
            i18n: {
              messages: {
                en: {
                  detailsTitle: 'Task',
                  fields: {
                    id: 'Id',
                    name: 'Name',
                    description: 'Description',
                    active: 'Active'
                  },
                  buttons: {
                    showAlert: 'Show alert',
                    showForm: 'Show form'
                  }
                },
                pl: {
                  detailsTitle: 'Zadanie',
                  fields: {
                    id: 'Id',
                    name: 'Nazwa',
                    description: 'Opis',
                    active: 'Aktywne'
                  },
                  buttons: {
                    showAlert: 'Pokaż alert',
                    showForm: 'Pokaż formularz'
                  }
                }
              }
            },
          }
        `
    },
  },
  components: {
    Crud,
    AlertBox,
  },
  i18n: {
    messages: {
      en: {
        detailsTitle: 'Task',
        fields: {
          id: 'Id',
          name: 'Name',
          description: 'Description',
          active: 'Active',
        },
        buttons: {
          showAlert: 'Show alert',
          showForm: 'Show form',
        },
      },
      pl: {
        detailsTitle: 'Zadanie',
        fields: {
          id: 'Id',
          name: 'Nazwa',
          description: 'Opis',
          active: 'Aktywne',
        },
        buttons: {
          showAlert: 'Pokaż alert',
          showForm: 'Pokaż formularz',
        },
      },
    },
  },
}
</script>
