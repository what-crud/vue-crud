<template>
  <item-details-container
    :title="$t('title')"
    :fields="fields"
    :basic-information="$t('basicInformation')"
  >
    <v-tab key="positions" ripple>{{ $t('positions') }}</v-tab>
    <v-tab key="comments" ripple>{{ $t('comments') }}</v-tab>
    <!-- Positions -->
    <v-tab-item key="positions">
      <v-card flat>
        <v-card-text>
          <company-positions
            :exclude="['id', 'company']"
            path="crm/positions"
            child-item-name="companyPositions"
            fk-name="company_id"
          ></company-positions>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <!-- Comments -->
    <v-tab-item key="comments">
      <v-card flat>
        <v-card-text>
          <company-comments
            :exclude="['id', 'company']"
            path="crm/company-comments"
            child-item-name="companyComments"
            fk-name="company_id"
          ></company-comments>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </item-details-container>
</template>

<script>
import ItemDetailsContainer from '@/utils/crud/components/ItemDetailsContainer.vue'
import ItemDetailsContainerMixin from '@/utils/crud/mixins/item-details-container'
import CompanyPositions from './CompanyPositions.vue'
import CompanyComments from './CompanyComments.vue'

export default {
  mixins: [ItemDetailsContainerMixin],
  components: {
    ItemDetailsContainer,
    CompanyPositions,
    CompanyComments,
  },
  created () {
    this.setIdColumn('id')
    this.setChildItemsMapping([
      {
        name: 'companyPositions',
        objName: 'positions',
      },
      {
        name: 'companyComments',
        objName: 'comments',
      },
    ])
  },
  i18n: {
    messages: {
      pl: {
        title: 'Szczegóły firmy',
        basicInformation: 'Dane podstawowe',
        positions: 'Stanowiska',
        comments: 'Komentarze',
        files: 'Pliki',
      },
      en: {
        title: 'Company details',
        basicInformation: 'Basic information',
        positions: 'Positions',
        comments: 'Comments',
        files: 'Files',
      },
    },
  },
}

</script>
