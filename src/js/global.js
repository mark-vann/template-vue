/* global Vue */

const getName = component => (component.$options.$name || component.name || '');

Vue.mixin({
  created() {
    console.log(`%ccreated ${getName(this)}`, 'background:darkblue;color:white');
  },
  mounted() {
    console.log(`%cmounted ${getName(this)}`, 'background:darkgreen;color:white');
  },
  updated() {
    console.log(`%cupdated ${getName(this)}`, 'background:darkslatgray;color:white');
  },
  actived() {
    console.log(`%cactived ${getName(this)}`, 'background:darkslatblue;color:white');
  },
  destroyed() {
    console.log(`%cdestoryed ${getName(this)}`, 'background:darkred;color:white');
  },
  methods: {
    gapv(page) {
      console.log(`%cGAPV /${page}.html`, 'background:darkgray;color:cyan');
    },
    gaev(category, action, label, value) {
      console.log(`%cGAEV ${category}, ${action}, ${label}, ${value}`, 'background:darkgray;color:yellow');
    },
  },
});
