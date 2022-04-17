<template>
  <!-- <q-layout 
    view="lHh lpr lFf" 
    container 
    style="height: 650px" 
    class="shadow-2 rounded-borders"> --><q-page style="background: linear-gradient(0deg, rgba(9,63,79, 0.6)0%, rgba(89,181,215, 0.1)) 100%">
    <q-header elevated class="bg-white">
      <q-toolbar class="text-center" >
        <q-btn  
          to='/queue'
          style="color:black" 
          flat 
          round 
          dense 
          icon="chevron_left" />
        <q-toolbar-title class="text-subtitle1 text-black text-bold" align="center">
          Success
          </q-toolbar-title>
        </q-toolbar>
      </q-header>


    <q-page-container>
      <q-page>
        <div v-for ="(user, key) in users" :key="key">
          <div class="card ">
            <q-card style="box-shadow:none" > 
              <div class="column" style="height: 150px">
                <div class="text-center col-5">
                  <img src="~assets/imgs/icons8-check-dollar-64.png" width="100px"></div></div>
                  <q-space/>
                  <div class="text-center" align="center"> 
                    You have successfully top-up your e-wallet and paid the fees directly.  
                    </div>
                  <div align="center" class="text-bold">
                    {{dateDate()}}
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
                      RM {{user.ewallet.deduct}}.00 
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
                    Maybank   
                    </div>
                  </div>
                 </q-card>
                 </div>
                </div>
          </q-page> 
      </q-page-container></q-page>
  <!-- </q-layout> -->
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  props : ['store','userId'],
  data(){
    return{
    }
  },
  methods:{
     dateDate(){
      var n =  new Date()
      return n.toLocaleString();
    },
    refreshPage(){
      window.location.href = '/#/queue'    
      setTimeout(() => {
        window.location.reload ()
      }, 1)
    },
    
    ...mapActions('store', ['exactTopUp','deductRemain','updateEwallet','firebaseGetUsers']),
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
<style>
.card {
    width:93%;
    height:100%;
    background-color:white;
    margin:10px;
    padding:10px;
    border-radius: 35px;
    margin-left:15px;
    padding:25px;
}
</style>
