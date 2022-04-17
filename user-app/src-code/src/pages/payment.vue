<template>
  <div >
    <!-- <q-layout view="lHh lpr lFf" container style="height: 650px" class="shadow-2 rounded-borders"> -->
      <q-header elevated  class="bg-white ">
        <q-toolbar class="text-center" >
          <q-btn to='/home' style="color:black" flat round dense icon="chevron_left" />
          <q-toolbar-title class="text-subtitle1 text-black text-bold ">e-Wallet</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <!-- <q-page-container> -->
        <q-page >
          <div v-for ="(user, key) in users" :key="key">
            <div class="q-pa-xs text-center" style='background: linear-gradient(0deg, rgba(9,63,79,1) 0%, rgba(89,181,215,1) 100%)' >
              <div><br>
                <div class="text-h5 text-white text-center" font-style:italic>
                  Available Amount
                </div>            
                <h2 class="text-white "><q-badge class="text-black" color="white">MYR</q-badge>{{user.ewallet.remain}}.00</h2>
              </div>    
            </div>

         <div class="q-pa-sm">
          <q-card class="pay q-pa-md " style='background-color: white'>
           <q-btn   to="/topup" style="box-shadow:none;  display: block;
            margin: 0 auto;
            text-align: center;">
            <img to="/topup"  height='100' width='100' src="~assets/imgs/icontopup.png"/>
          </q-btn>

           <div class="row text-center">
            <div class="col ">
              Top Up
            </div>
           </div>
          </q-card><q-separator/>

          <q-card class="pay q-pa-md " style='background-color: white'>
            <div class="row text-bold">
             QUICK ACCESS
            </div>
            <div class="row">
             <div class="col" style="display: block; margin: 0 auto; text-align: center;">
              <img src="https://www.stickpng.com/assets/images/58482363cef1014c0b5e49c1.png" width="100px"/> 
             </div>
             <div class="col" style="display: block;margin: 0 auto;text-align: center;">
               <div class="row">
                ** ** ** 1278
               </div>
               <div class="row">
                Valid Thru 07/23
               </div> 
              </div>
            </div>
            
            <div>
            <q-form @submit="onSubmit">
            <div class="row" >
              <div class="col-9 q-gutter-sm " style="float:left;display: block;margin: 0 auto; padding-left: 0px;">
               
                <q-btn class="q-pa-sm "
                   color="primary"
                   size="size"
                   label="20.00"
                   @click ="updateOne()"/>

                <q-btn class="q-pa-sm "
                   color="primary"
                   size="size"
                   label="50.00"
                   @click ="updateTwo()"/>

                <q-btn class="q-pa-sm "
                   color="primary"
                   size="size"
                   label="100.00"
                   @click ="updateThree()"/>             
                   </div>

              <div class="col-3" style="display: block;margin: 0 auto;text-align: center;">
                <q-space/>
                  <q-btn 
                   style="margin-top: 10px;"
                   class="q-pa-sm"
                   color="primary"
                   label="SUBMIT"
                   v-model.number="amount" 
                   @click="updateEwallet ({
                      userId: userId, 
                      updates:{topup: amount}
                      }); onSubmit()"
                   />
              </div>
            </div>
          </q-form>
            </div>
          </q-card><q-separator/>

          <!-- <q-card class="pay q-pa-md " style='background-color: white'>
            <div class="row text-bold">
            RECENT ACTIVITY
            </div>
            <div class="row">
            No transaction yet.
            {{user.ewallet.topup}}.00
            </div>
        </q-card> -->
        </div>
        </div>
        </q-page>
      <!-- </q-page-container> -->
    <!-- </q-layout> -->
  </div>
</template>

<script>
import {mapActions,mapGetters,mapState} from 'vuex'

export default {
  props : ['store','userId'],
  data () {
    return {
      text: '',
      sizes:['md'],
      total:0,
      loading: false,
      amount: '',
}
  },
  methods:{
    ...mapActions('store', ['refresh','updateRemain','updateEwallet','firebaseGetEwallet','updateQueue','updateService','firebaseGetUsers']),
    refreshPage(){
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
    updateOne(){
      this.amount=20;
    },
    updateTwo(){
      this.amount=50;
    },
    updateThree(){
      this.amount=100;
    },
    onSubmit(){
      if (this.amount == '') {
        this.$q.notify({
          color: 'red',
          textColor: 'white',
          icon: 'warning',
          message: 'Please Select your Top-up Amount'
        })
      }
      else {
        this.$router.push('/sc2')
        this.refreshPage()
      }
    },
  },
  computed:{
    ...mapGetters('store',['users']),
  },

}

</script>
<style lang="sass" scoped>
.row > div
  padding: 10px 15px

.row + .row
  margin-top: 1rem

img.center
  display: inline-block;
  margin: 0 auto;
  text-align: center;


.column > div
  padding: 10px 15px

.column + .column
  margin-top: 1rem
</style>