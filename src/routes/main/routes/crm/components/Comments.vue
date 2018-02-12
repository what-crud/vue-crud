<template>
  <div>
    <v-card>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 md8>
            <v-text-field v-model="commentContent" :label="$t('newComment')" rows="3" multi-line></v-text-field>
          </v-flex>
          <v-flex xs12 md4 text-xs-center>
            <v-select :items="commentTypes.data" :label="$t('commentType')" :item-text="commentTypes.textColumn" :item-value="commentTypes.idColumn"
              v-model="selectedCommentType" bottom></v-select>
            <v-btn outline color="green" @click="store()">
              {{ $t('buttons.store') }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    <div class="comments-container">
      <v-card v-for="(comment,i) in data" :key="i">
        <v-card-title>
          {{ comment.author }}
          <v-spacer></v-spacer>
          {{ comment.commentType }}
          <v-spacer></v-spacer>
          {{ comment.created || ' ' }}
          <v-spacer></v-spacer>
          <v-tooltip top>
            <v-btn outline fab small class="xs" color="red" @click="suspend(comment.id)" slot="activator">
              <v-icon>undo</v-icon>
            </v-btn>
            <span>{{ $t('buttons.suspend') }}</span>
          </v-tooltip>
        </v-card-title>
        <v-card-text class="text-xs-left">
          <strong v-html="prettify(comment.content)" class="comment-content"></strong>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'comments',
    props: [
      'data',
      'commentTypes'
    ],
    data() {
      return {
        selectedCommentType: 1,
        commentContent: ''
      }
    },
    methods: {
      prettify(text) {
        let linesArray = text.split("\n")
        let formattedText = '<p>' + linesArray.join("</p><p>") + '</p>'
        return formattedText
      },
      store() {
        this.$parent.store(this.commentContent, this.selectedCommentType)
      },
      suspend(commentId) {
        this.$parent.suspend(commentId)
      },
    },
    i18n: {
      messages: {
        pl: {
          newComment: 'Nowy komentarz',
          commentType: 'Typ komentarza',
          buttons: {
            suspend: 'Zawieś',
            store: 'Dodaj'
          }
        },
        en: {
          newComment: 'New comment',
          commentType: 'Comment type',
          buttons: {
            suspend: 'Suspend',
            store: 'Store'
          }
        },
      }
    }
  }

</script>
<style scoped>
  .comments-container {
    max-height: 50vh;
    overflow-y: auto;
  }

</style>
