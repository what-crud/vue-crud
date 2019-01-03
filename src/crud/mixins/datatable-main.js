import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from "vuex";
import DataTableRow from "../components/DataTableRow.vue";
import DataTableControls from "../components/DataTableControls.vue";

export default {
  components: {
    DataTableRow,
    DataTableControls,
  },
  props: [
    "tableFields",
    "deleteMode",
    "customButtons",
    "itemElements",
    "editButton",
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
        this.alertError(this.$t("global.datatable.noItemsSelected"));
        return false;
      } else {
        if (confirm(this.$t("global.datatable.confirm"))) {
          return true;
        } else {
          return false;
        }
      }
    },
    editSelected() {
      if (this.selected.length == 0) {
        this.alertError(this.$t("global.datatable.noItemsSelected"));
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
  },
};
