<template>
  <q-layout 
    view="lHh lpr lFf" 
    container 
    style="height: 650px" 
    class="shadow-2 rounded-borders">
    <q-header elevated class="bg-white">
      <q-toolbar class="text-center" >
        <q-btn  
          to ="/queue" 
          style="color:black" 
          flat 
          round 
          dense 
          icon="chevron_left" />
        <q-toolbar-title class="text-subtitle1 text-black text-bold" align="center">
          Success
        </q-toolbar-title>
        <q-btn  
          to="/home" 
          style="color:black" 
          flat 
          round 
          dense 
          icon="home" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div v-for ="(user, key) in users" :key="key">
        <q-page>
          <div class="card ">
            <q-card style="box-shadow:none" > 
              <div class="column" style="height: 150px">
                <div class="text-center col-5">
                  <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png" width="100px"></div></div>
                  <q-space/>
                  <div class="text-center" align="center"> 
                    You have successfully top-up RM {{user.ewallet.topup}}.00 to your e-wallet.   
                  </div>
                  <div align="center" class="text-bold">
                    Monday 28 October 2019 16:24
                  </div>
              </q-card>
            </div>

            <div class="card ">
              <q-card style="box-shadow:none">
                <div class="q-pa-md">
                  <div class="row">
                    <div class="col ">
                      Payment
                    </div>
                    <div class="col text-bold" align="right">
                      RM {{user.ewallet.topup}} 
                    </div> 
                  </div>
                </div>
              </q-card>
            </div>

            <div class="card ">
              <q-card style="box-shadow:none">
                <div class="row">
                  <div class="col">
                    Payment Method
                  </div>
                  <div class="col text-bold" align="right">
                    Visa Card  
                  </div>
                </div>
              </q-card>
            </div><br>

            <div class="text-center">
              <q-btn 
                to='/queue'
                align="center"
                label="Back to Queue" 
                type="submit" 
                color="primary"
                middle-label/>
            </div>
          </q-page>
        </div>
      </q-page-container>
    </q-layout>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  props : ['store','userId'],
  data () {
    return {
      text: '',
      sizes:['md']
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
<style>
.card {
    width:93%;
    height:100%;
    background-color:white;
    margin:10px;
    padding:10px;
}
</style>
