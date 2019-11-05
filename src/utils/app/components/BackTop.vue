<template>
  <span v-if="top > 0" @click.prevent="backTop">
    <v-btn id="scroll" fab class="secondary" floating>
      <v-icon class="white--text">keyboard_arrow_up</v-icon>
    </v-btn>
   <slot></slot>
 </span>
</template>

<script>
export default {
  name: 'backTop',
  props: {
    speed: {
      type: Number,
      default: 0.1,
    },
  },
  data () {
    return {
      top: 0,
    }
  },
  created () {
    const that = this
    setInterval(() => {
      that.top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    }, 20)
  },
  methods: {
    backTop () {
      const that = this
      let { top } = that
      const timer = setInterval(() => {
        top -= Math.abs(top * that.speed)
        if (top <= 1) {
          top = 0
          clearInterval(timer)
        }
        // Internet Explorer
        document.documentElement.scrollTop = top
        // Other browsers
        document.body.scrollTop = top
      }, 20)
      return false
    },
  },
}
</script>

<style lang="css" scoped>
  #scroll{
    position:fixed;
    bottom:50px;
    right:20px;
  }
</style>
