<template><q-page style="background: linear-gradient(0deg, rgba(9,63,79, 0.6)0%, rgba(89,181,215, 0.1)) 100%">
  <!-- <q-layout view="lHh lpr lFf" container style="height: 650px" class="shadow-2 rounded-borders"> -->
    <q-header elevated  class="bg-white ">
      <q-toolbar class="text-center" >
      <q-btn  to="/queue" style="color:black" flat round dense icon="chevron_left" />          
          <q-toolbar-title class="text-subtitle1 text-black ">Top Up
          </q-toolbar-title>
      </q-toolbar>
    </q-header>

  <!-- <q-page-container> -->
    <div v-for ="(user, key) in users" :key="key">    
      <q-page style='background-color: #c9f5ff'>        
        <div   class="q-pa-xs text-center" style='margin:auto; height:200px; display:block; background: linear-gradient(0deg, rgba(9,63,79,1) 0%, rgba(89,181,215,1) 100%)' >
          <h6 class="text-white">Balance (RM)<br>{{user.ewallet.remain}}.00</h6>
        </div>
          
        <div class="q-pa-sm">
          <q-card class="q-pa-md " style='background-color: white'>
            <div class="row text-bold">
             Top Up Through
            </div>
            <div class="row ">
              <div class="col">
                <q-btn  style="margin-top: 10px; background-color:#272343; color:white" 
                  to='/onlineexact'
                  class="q-pa-sm"
                  type="submit"
                  label="Online Banking"/>
              </div>
              <div class="col">
                <q-btn style="margin-top: 10px; background-color:#272343; color:white" 
                  to='/debit_exact'
                  class="q-pa-sm"
                  type="submit"
                  label="Credit / Debit Card"/>
              </div>     
            </div> 
          </q-card>
        </div>

        <div class="q-pa-md">
          <!-- <q-banner dense style="margin-top: 10px; background-color:white; color:black; 
          border: 1px solid red;
          border-radius: 20px; padding:10px" >
          Amount needed to top-up is RM {{user.ewallet.deduct}}.00
           <template v-slot:action>
            <q-btn to="/fail" flat color="#272343" label="Dismiss" />
            </template>
          </q-banner> -->
           <q-dialog> {{ fees(user.ewallet.deduct) }}</q-dialog>
        </div>
      </q-page>
     </div>
    <!-- </q-page-container>
  </q-layout>  -->
  </q-page>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
  props : ['store','userId'],

  data () {
    return {
      auto: true,
      blueModel:'on',
      group: null,
      options: [
        { label: 'ONLINE BANKING', value: 'bat' },
        { label: 'CREDIT / DEBIT CARD', value: 'friend', color: 'green' }
        
      ]
    }
  },
  methods:{
    ...mapActions('store', ['updateEwallet','updateQueue','updateService','firebaseGetUsers']),
     fees(payload){
       this.$q.dialog({
        title: "Klinik Kesihatan Taman Universiti",
        message: "Amount needed to top-up is RM " + payload +".00"
      }).onOk(() => {
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
  },
  computed: {
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
