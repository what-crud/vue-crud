<template>
  <div>
    <comments :data="companyComments" :commentTypes="commentTypes"></comments>
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
    name: 'companyComments',
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
        'company',
        'companyComments'
      ])
    },
    created () {
      Vue.http.get('crm/company-comment-types')
        .then((response) => this.commentTypes.data = response.body)
    },
    methods: {
      ...mapActions('crm', [
        'storeCompanyComment',
        'suspendCompanyComment'
      ]),
      store (content, commentTypeId) {
        let comment = {
          'company_id': this.company.id,
          'company_comment_type_id': commentTypeId,
          'content': content
        }
        this.storeCompanyComment([
          comment,
          this.$t('global.alerts.stored')
        ])
      },
      suspend (commentId) {
        this.suspendCompanyComment([
          commentId,
          this.$t('global.alerts.suspended')
        ])
      }
    },
  }

</script>
