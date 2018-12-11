import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from "vuex";
import {
  download
} from "@/helpers/functions.js";

export default {
  props: [
    "tableFields",
    "deleteMode",
    "customButtons",
    "itemElements",
    "editButton",
    "fileMode",
    "meta",
    "primaryKey",
    "activeColumnName"
  ],
  data() {
    return {
      selected: [],
    };
  },
  computed: {
    ...mapState(["filesPath"]),
    ...mapState("crud", ["prefix", "path"]),
    ...mapGetters("crud", ["itemsList"]),
    selectedIds() {
      return this.selected.map(item => item.id);
    },
    headers() {
      let actionHeader = [{
        text: this.$t("fields.action"),
        sortable: false
      }];
      let headers = this.tableFields.map(field => {
        let header = {};
        header.text = field.text;
        header.value = field.name.toLowerCase();
        if (field.sortable != undefined) {
          header.sortable = field.sortable;
        }
        return header;
      });
      return [...actionHeader, ...headers];
    },
    items() {
      return this.itemsList(this.tableFields, this.meta, this.primaryKey, this.customButtons, this.activeColumnName);
    },
  },
  methods: {
    ...mapMutations(["alertError"]),
    ...mapMutations("crud", [
      "resetItems",
      "resetItem",
      "editItemDialog",
      "createItemDialog",
      "multipleEditDialog",
      "setItemElementsInfo",
      "editItemElementsDialog",
      "openImageContainer",
      "setSelectedIds"
    ]),
    ...mapActions("crud", [
      "getItem",
      "updateItem",
      "storeItem",
      "deleteItem",
      "getItemElements",
      "mulitipleItemsUpdate",
      "mulitipleItemsDelete"
    ]),
    edit(id) {
      this.getItem([id]).then(response => {
        this.editItemDialog(id);
      })
    },
    create() {
      this.resetItem();
      this.createItemDialog();
    },
    suspend(id) {
      let obj = {}
      obj[this.activeColumnName] = 0
      this.updateItem([
        id,
        obj,
        this.$t("global.alerts.suspended"),
        this.$t("global.alerts.suspendError")
      ]);
    },
    restore(id) {
      let obj = {}
      obj[this.activeColumnName] = 1
      this.updateItem([
        id,
        obj,
        this.$t("global.alerts.restored"),
        this.$t("global.alerts.restoreError")
      ]);
    },
    destroy(id) {
      if (confirm(this.$t("global.alerts.confirm"))) {
        this.deleteItem([
          id,
          this.$t("global.alerts.deleted"),
          this.$t("global.alerts.deleteError")
        ]);
      }
    },
    checkSelected() {
      if (this.selected.length == 0) {
        this.alertError(this.$t("noItemsSelected"));
        return false;
      } else {
        if (confirm(this.$t("confirm"))) {
          return true;
        } else {
          return false;
        }
      }
    },
    editSelected() {
      if (this.selected.length == 0) {
        this.alertError(this.$t("noItemsSelected"));
        return false;
      }
      else {
        this.setSelectedIds(this.selected)
        this.resetItem();
        this.multipleEditDialog();
      }
    },
    suspendSelected() {
      if (this.checkSelected()) {
        this.mulitipleItemsUpdate([{
            ids: this.selectedIds,
            request: {
              active: 0
            }
          },
          this.$t("global.alerts.suspended"),
          this.$t("global.alerts.suspendError")
        ]);
      }
    },
    restoreSelected() {
      if (this.checkSelected()) {
        this.mulitipleItemsUpdate([{
            ids: this.selectedIds,
            request: {
              active: 1
            }
          },
          this.$t("global.alerts.restored"),
          this.$t("global.alerts.restoreError")
        ]);
      }
    },
    destroySelected() {
      if (this.checkSelected()) {
        this.mulitipleItemsDelete([{
            ids: this.selectedIds
          },
          this.$t("global.alerts.deleted"),
          this.$t("global.alerts.deleteError")
        ]);
      }
    },
    custom(name, item) {
      this.$parent.custom(name, item);
    },
    editItemElements(name, id) {
      let obj = this.itemElements[name];
      this.setItemElementsInfo([id, obj]);
      this.getItemElements();
    },
    rowDblclickAction(item) {
      if(this.editButton){
        this.edit(item.meta.id)
      }
      else {
        let goToItemButton = false
        for(let button of this.customButtons) {
          if (button.name == 'goToItem') {
            goToItemButton = true
            break
          }
        }
        if(goToItemButton){
          this.custom('goToItem', item)
        }
      }
    },
    download(item) {
      download(this.filesPath + item.meta.path, item.filename);
    },
    isImage(mime) {
      let supportedMimeTypes = ["image/jpeg", "image/png"];
      return supportedMimeTypes.includes(mime);
    },
    showImage(image) {
      this.openImageContainer(image);
    },
  },
};
