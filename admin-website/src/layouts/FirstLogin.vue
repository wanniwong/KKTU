<template>
  <q-layout view="lHh Lpr lFf" style="background-color:#64b2cd;">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'FirstLogin',

  data () {
    return {
    }
  }
}
</script>
<style>
  .login{
    background-color: white;
    color: black;
    height:100%;
    margin: 10px 50px 10px 50px; 
    padding: 20px;
    box-shadow: 0px 0px 25px grey, 0 0 5px #509cb6;
  }
  input{
    border:none;
    border-bottom: 1px solid grey;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    outline: none;
  }

  input:focus {
  background-color: transparent;
  border-bottom: 2px solid #64b2cd;
  }
  
  hr{
    border:none;
  }

  .label{
    text-align:center;
    font-size: 12px;
  }

</style>

