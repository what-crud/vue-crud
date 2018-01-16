<template>
  <v-dialog v-model="dialog.show" max-width="480">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        <template v-for="field in fields">
          <v-text-field :label="field.text" v-if="field.type == 'input'" v-model="field.value"></v-text-field>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black" flat="flat" @click.native="close()">Zamknij</v-btn>
        <v-btn v-if="dialog.action == 'create'" color="green" flat="flat" @click="store()">Utwórz</v-btn>
        <v-btn v-else-if="dialog.action == 'edit'" color="blue" flat="flat" @click="update()">Modyfikuj</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
      props: [
          'title',
          'dialog',
          'fields'
      ],
      methods: {
        close: function() {
          this.dialog.show = false
        },
        update: function() {
          this.$parent.update()
          this.close()
        },
        store: function() {
          this.$parent.store()
          this.close()
        }
      },
    data() {
      return {}
    }
  }

</script>
