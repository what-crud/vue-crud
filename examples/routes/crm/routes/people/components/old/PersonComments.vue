<template>
  <div>
    <comments :data="personComments" :commentTypes="commentTypes"></comments>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Comments from '../../../components/Comments.vue'
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    name: 'personComments',
    components: {
      Comments
    },
    data() {
      return {
        commentTypes: {
          idColumn: 'id',
          textColumn: 'name',
          data: []
        },
      }
    },
    computed: {
      ...mapGetters('crm', [
        'person',
        'personComments'
      ])
    },
    created () {
      Vue.http.get('crm/person-comment-types')
        .then((response) => this.commentTypes.data = response.body)
    },
    methods: {
      ...mapActions('crm', [
        'storePersonComment',
        'suspendPersonComment'
      ]),
      store (content, commentTypeId) {
        let comment = {
          'person_id': this.person.id,
          'person_comment_type_id': commentTypeId,
          'content': content
        }
        this.storePersonComment([
          comment,
          this.$t('global.alerts.stored')
        ])
      },
      suspend (commentId) {
        this.suspendPersonComment([
          commentId,
          this.$t('global.alerts.suspended')
        ])
      }
    },
  }

</script>
