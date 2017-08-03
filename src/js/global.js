/* global Vue */

Vue.mixin({
  created() {
    console.log(`%ccreated ${this.$options.$name || ''}`, 'background:darkblue;color:white;font-size:12px');
  },
  mounted() {
    console.log(`%cmounted ${this.$options.$name || ''}`, 'background:darkgreen;color:white;font-size:12px');
  },
  destroyed() {
    console.log(`%cdestoryed ${this.$options.$name || ''}`, 'background:darkred;color:white;font-size:12px');
  },
  methods: {
    gapv(page) {
      console.log(`%cGAPV /${page}.html`, 'background:darkgray;color:cyan;font-size:12px');
    },
    gaev(category, action, label, value) {
      console.log(`%cGAEV ${category}, ${action}, ${label}, ${value}`, 'background:darkgray;color:yellow;font-size:12px');
    },
  },
});
