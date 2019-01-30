import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  watch: {
    createdElement: {
      handler(val) {
        let created = this.createdElement.created;
        if (created) {
          let id = this.createdElement.id;
          if(id){
            this.goToItem({ id: id });
          }
          this.setCreatedItemStatus([false, null]);
        }
      },
      deep: true
    },
  },
  computed: {
    ...mapState("crud", ["createdElement"]),
    ...mapGetters("crud", ["itemCreated"]),
    buttons() {
      return [
        {
          name: "goToItem",
          icon: "forward",
          color: "blue",
          text: this.$t("buttons.goToItem")
        }
      ];
    },
    itemFields() {
      return this.fieldsInfo.filter(field => field.hidden != true);
    }
  },
  methods: {
    ...mapMutations("crud", ["showItemDetailsDialog", "setCreatedItemStatus", "setCurrentItem"]),
    ...mapActions("crud", ["getItemDetails"]),
    goToItem(item, index) {
      this.setCurrentItem({id:item.id, index:index})
      this.getItemDetails([item.id]).then(response => {
        this.showItemDetailsDialog();
      })
    }
  },
  i18n: {
    messages: {
      pl: {
        buttons: {
          goToItem: "Szczegóły"
        },
      },
      en: {
        buttons: {
          goToItem: "Details"
        },
      }
    }
  }
};
