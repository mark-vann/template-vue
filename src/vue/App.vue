<template lang="pug">
  main
    .container-fluid
      - for (var i = 0; i < 12; i++)
        .col-md-1
          img(src="~Jellyfish.jpg")

      - for (var i = 0; i < 6; i++)
        .col-md-2
          img(src="~Jellyfish.jpg")

      - for (var i = 0; i < 4; i++)
        .col-md-3
          img(src="~Jellyfish.jpg")

      - for (var i = 0; i < 3; i++)
        .col-md-4
          img(src="~Jellyfish.jpg")

      - for (var i = 0; i < 2; i++)
        .col-md-6
          img(src="~Jellyfish.jpg")
</template>

<script>
  export default {
    $name: 'App.vue',
  };
</script>

<style lang="stylus" src="../css/main">
</style>

<style lang="stylus" scoped>
  main
    padding: 24px 0
  img
    width: 100%
    display: block
</style>
