<template>
<div class='bg-brand'>
  <q-layout view="lHh Lpr lFf" >

    <q-page-container>
      <router-view  />
    </q-page-container>
  </q-layout>
</div> 
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style>
.bg-brand {
  background:#c9f5ff;
}
</style>