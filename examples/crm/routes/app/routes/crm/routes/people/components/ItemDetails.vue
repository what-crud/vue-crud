<template>
  <item-details-container :title="$t('title')" :fields="fields" :basic-information="$t('basicInformation')">
    <v-tab key="positions" ripple>{{ $t('positions') }}</v-tab>
    <v-tab key="comments" ripple>{{ $t('comments') }}</v-tab>
    <!-- Positions -->
    <v-tab-item key="positions">
      <v-card flat>
        <v-card-text>
          <person-positions
            :exclude="['id', 'person']"
            path="crm/positions"
            child-item-name="personPositions"
            fk-name="person_id"
          ></person-positions>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <!-- Comments -->
    <v-tab-item key="comments">
      <v-card flat>
        <v-card-text>
          <person-comments
            :exclude="['id', 'person']"
            path="crm/person-comments"
            child-item-name="personComments"
            fk-name="person_id"
          ></person-comments>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </item-details-container>
</template>

<script>
import ItemDetailsContainer from '@/utils/crud/components/ItemDetailsContainer.vue'
import ItemDetailsContainerMixin from '@/utils/crud/mixins/item-details-container'
import PersonPositions from './PersonPositions.vue'
import PersonComments from './PersonComments.vue'

export default {
  mixins: [ItemDetailsContainerMixin],
  components: {
    ItemDetailsContainer,
    PersonPositions,
    PersonComments,
  },
  created () {
    this.setIdColumn('id')
    this.setChildItemsMapping([
      {
        name: 'personPositions',
        objName: 'positions',
      },
      {
        name: 'personComments',
        objName: 'comments',
      },
    ])
  },
  i18n: {
    messages: {
      pl: {
        title: 'Szczegóły osoby',
        basicInformation: 'Dane podstawowe',
        positions: 'Stanowiska',
        comments: 'Komentarze',
      },
      en: {
        title: 'Person details',
        basicInformation: 'Basic information',
        positions: 'Positions',
        comments: 'Comments',
      },
    },
  },
}

</script>
