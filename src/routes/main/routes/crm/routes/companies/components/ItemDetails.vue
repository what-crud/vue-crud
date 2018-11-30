<template>
  <item-details-container :title="$t('title')" :fields="fields" :basicInformation="$t('basicInformation')">
    <v-tab key="positions" ripple>{{ $t('positions') }}</v-tab>
    <v-tab key="comments" ripple>{{ $t('comments') }}</v-tab>
    <!-- <v-tab key="files" ripple>{{ $t('files') }}</v-tab> -->
    <!-- Positions -->
    <v-tab-item key="positions">
      <v-card flat>
        <v-card-text>
          <company-positions :exclude="['id', 'company']" path="crm/positions" childItemName="companyPositions" fkName="company_id"></company-positions>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <!-- Comments -->
    <v-tab-item key="comments">
      <v-card flat>
        <v-card-text>
          <company-comments :exclude="['id', 'company']" path="crm/company-comments" childItemName="companyComments" fkName="company_id"></company-comments>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <!-- Files -->
    <!-- <v-tab-item key="files">
      <v-card flat>
        <v-card-text>
          <company-files></company-files>
          <image-container></image-container>
        </v-card-text>
      </v-card>
    </v-tab-item> -->
  </item-details-container>
</template>

<script>
  import ItemDetailsContainer from "@/crud/components/ItemDetailsContainer.vue"
  import ItemDetailsContainerMixin from "@/crud/mixins/item-details-container.js"
  import CompanyPositions from './CompanyPositions.vue'
  import CompanyComments from './CompanyComments.vue'
  // import CompanyFiles from './CompanyFiles.vue'
  // import ImageContainer from './ImageContainer.vue'

  export default {
    mixins: [ItemDetailsContainerMixin],
    components: {
      ItemDetailsContainer,
      CompanyPositions,
      CompanyComments,
      // CompanyFiles,
      // ImageContainer
    },
    created() {
      this.setIdColumn('id')
      this.setChildItemsMapping([
        {
          name: 'companyPositions',
          objName: 'positions'
        },
        {
          name: 'companyComments',
          objName: 'comments'
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
        }
      }
    }
  }

</script>
