<template>
  <v-menu
    v-model="datepicker"
    :close-on-content-click="false"
    :nudge-right="40"
    min-width="290px"
    transition="scale-transition"
    lazy
    offset-y
    full-width
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        v-on="on"
        :label="field.text"
        prepend-icon="event"
        readonly
        @blur="onBlur()"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="value"
      :first-day-of-week="firstDayOfWeek"
      :locale="locale"
      scrollable
      @input="datepicker = false"
      @change="onChange()"
    ></v-date-picker>
  </v-menu>
</template>
<script>
import crud from '@/config/crud'

export default {
  name: 'DateField',
  props: [
    'value',
    'field',
  ],
  data () {
    return {
      date: undefined,
      datepicker: false,
    }
  },
  computed: {
    locale () {
      return crud.locale || 'en-us'
    },
    firstDayOfWeek () {
      return crud.firstDayOfWeek || 0
    },
  },
  methods: {
    onBlur () {
      this.emitNewValue()
    },
    onChange () {
      this.emitNewValue()
    },
    emitNewValue () {
      this.$emit('input', this.date)
    },
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.date = val
      },
    },
  },
}
</script>
