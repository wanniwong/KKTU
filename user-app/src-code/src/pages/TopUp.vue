<template><q-page style="background: linear-gradient(0deg, rgba(9,63,79, 0.6)0%, rgba(89,181,215, 0.1)) 100%">
  <!-- <q-layout view="lHh lpr lFf" container style="height: 650px" class="shadow-2 rounded-borders"> -->
    <q-header elevated  class="bg-white ">
      <q-toolbar class="text-center" >
        <q-btn  to='/payment' style="color:black" flat round dense icon="chevron_left" />
          <q-toolbar-title class="text-subtitle1 text-black ">Top Up
          </q-toolbar-title>
      </q-toolbar>
    </q-header>

  <!-- <q-page-container > -->
    <div v-for ="(user, key) in users" :key="key">
      <q-page style='background-color: #c9f5ff'>
        <div class="q-pa-xs text-center" style='margin:auto; height:200px; display:block; background: linear-gradient(0deg, rgba(9,63,79,1) 0%, rgba(89,181,215,1) 100%)' >
          <h6 class="text-white">Balance (RM)<br>{{user.ewallet.remain}}.00</h6>
        </div>           
        <div class="q-pa-sm">
          <q-card class="q-pa-md " style='background-color: white'>
            <div class="row text-bold">
              Top Up through
            </div>
            <div class="row ">
              <div class="col">
                <q-btn style="margin-top: 10px;background-color:#272343; color:white"
                  to='/online'
                  class="q-pa-sm"
                  type="submit"
                  label="Online Banking"/>
              </div>
              <div class="col">
                <q-btn  style="margin-top: 10px;background-color:#272343; color:white"
                  to='/debit'
                  class="q-pa-sm"
                  type="submit"
                  label="Credit / Debit Card"/>
              </div>     
            </div>
          </q-card>
              
          <!-- <q-card style="background-color:#c9f5ff" class="q-pa-md ">
            <div class="btn-group" style="width:100%">
              <q-toggle
                :label="`Auto top-up ${blueModel}`"
                false-value="off"
                true-value="on"
                v-model="blueModel"
                align="left"/>
            </div>
          </q-card> -->
        </div>
      </q-page>
      </div>
    <!-- </q-page-container> -->
  <!-- </q-layout> -->
   </q-page>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
  props : ['store','userId'],

  data () {
    return {
      auto: true,
      group:null,
      blueModel:'off',
    }
  },
  
  methods:{
    ...mapActions('store', ['updateEwallet','firebaseGetEwallet','updateQueue','updateService','firebaseGetUsers']),
    reloadPage(){
      window.location.reload()
    }
  },
  computed:{
    ...mapGetters('store',['users']),
  }

}
</script>
<style lang="sass" scoped>
.row > div
  padding: 10px 15px

.row + .row
  margin-top: 1rem

.btn-group button 

  padding: 10px 24px;
  cursor: pointer; 
  float: left; 

.btn-group button:not(:last-child) 
  border-right: none;
.btn-group:after 
  content: "";
  clear: both;
  display: table;

</style>
