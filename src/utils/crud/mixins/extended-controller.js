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
          text: this.$t("global.details.title")
        }
      ];
    },
    itemFields() {
      return this.fieldsInfo.filter(field => field.details != false);
    }
  },
  methods: {
    ...mapMutations("crud", ["showItemDetailsDialog", "setCreatedItemStatus", "setCurrentItem"]),
    ...mapActions("crud", ["getItemDetails"]),
    goToItem(item, index) {
      this.setCurrentItem({id:item.meta.id, index:index})
      this.getItemDetails([item.meta.id]).then(response => {
        this.showItemDetailsDialog();
      })
    }
  },
};
