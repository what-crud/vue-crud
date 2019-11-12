import {
  mapState,
  mapMutations,
} from 'vuex'

export default {
  computed: {
    ...mapState('crud', [
      'nextItem',
      'moveItemRun',
      'moveItemDirection',
    ]),
  },
  methods: {
    ...mapMutations('crud', [
      'setCurrentItem',
      'moveItem',
    ]),
    beforeGetItem (id) {
      const index = this.getItemIndex(id)
      this.setCurrentItem({
        id,
        index,
      })
    },
    resolveRowDoubleClick (item, index) {
      if (this.editMode) {
        let goToItemButton = false
        for (const button of this.customButtons) {
          if (button.name === 'goToItem') {
            goToItemButton = true
            break
          }
        }
        if (goToItemButton) {
          this.custom('goToItem', item, index)
        } else {
          this.edit(item.meta.id, index)
        }
      }
    },
  },
  watch: {
    moveItemRun (val) {
      if (val) {
        const {
          moveItemDirection,
        } = this
        let currentIndex = this.currentItemIndex
        let {
          page,
        } = this.pagination
        const {
          itemsPerPage,
        } = this.pagination
        const {
          totalItems,
        } = this
        let possible = true
        if (moveItemDirection === 'previous') {
          if (currentIndex > 0) {
            currentIndex -= 1
          } else if (page > 1) {
            page -= 1
            currentIndex = itemsPerPage - 1
          } else {
            possible = false
          }
        } else if (moveItemDirection === 'next') {
          if (currentIndex < itemsPerPage - 1 && (page - 1) * itemsPerPage + currentIndex + 1 <
            totalItems) {
            currentIndex += 1
          } else if (page < Math.ceil(totalItems / itemsPerPage)) {
            page += 1
            currentIndex = 0
          } else {
            possible = false
          }
        }
        if (possible) {
          this.moveDetailsItem(page, currentIndex)
        }
        this.moveItem([
          '',
          false,
        ])
      }
    },
  },
}
