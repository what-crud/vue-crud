import {
  mapMutations,
} from 'vuex'

export default {
  name: 'item-details',
  props: ['fields'],
  methods: {
    ...mapMutations('crud', [
      'setIdColumn',
      'setChildItemsMapping',
    ]),
  },
}
