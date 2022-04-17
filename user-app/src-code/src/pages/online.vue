<template><q-page style="background: linear-gradient(0deg, rgba(9,63,79, 0.6)0%, rgba(89,181,215, 0.1)) 100%">
  <!-- <q-layout 
    view="lHh lpr lFf" 
    container 
    style="height: 650px" 
    class="shadow-2 rounded-borders"> -->
    <q-header elevated class="bg-white">
      <q-toolbar class="text-center" >
        <q-btn  
          v-go-back="'/topup'" 
          style="color:black" 
          flat 
          round 
          dense 
          icon="chevron_left" />
        <q-toolbar-title class="text-subtitle1 text-black text-bold" align="center">
          Online Banking
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
      
    <!-- <q-page-container> -->
      <q-form
       @submit="onSubmit">
      <div v-for ="(user, key) in users" :key="key">
        <q-page>
          <div>
            <div class="q-pa-md">
              <q-card style='background-color: white'>
                <div class="row text-bold q-pa-sm"> 
                  1. Select a top-up value(RM)</div>
                 <div class="col q-gutter-sm" style="display: block;margin: 0 auto">
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

                  <q-input class="q-pa-sm"
                  v-model.number="amount" 
                  label="Or Enter A Value"  
                  :rules="[val => !!val || 'Please select or enter your required amount.']"
                  />    
                </q-card>
              </div>
            </div>

            <div class="q-pa-md">
              <q-card style='background-color: white'>
                <div class="row text-bold q-pa-sm"> 2. Select preferred payment method</div>
                  <div style="max-width: 300px">
                    <div class="q-gutter-md">
                      <q-select class="q-pa-sm" v-model="model" :options="options" label="Select a bank" 
                      :rules="[val => !!val || 'Please select your bank.']"
                      @input="updateBank()"/>
                    </div>
                  </div>
              </q-card>
            </div>
         
            <div class="q-pa-md">
              <q-card style='background-color: white'>
                <div class="row text-bold q-pa-sm">Summary (RM)</div>
                <div class="q-pa-sm"><p></p>Top-up Amount: 
                <p class="text-right">RM{{amount}}</p></div>
              </q-card>
            </div>

            <q-btn style="background-color:#272343; color:white" class="full-width" label="CONFIRM" type="submit" 
            @click="onSubmit()"/>
          </q-page>
        </div>
      </q-form></q-page>
      <!-- </q-page-container>
    </q-layout> -->
</template>
<script>
import {mapActions,mapGetters} from 'vuex'

export default {
  props : ['store','userId'],
  data () {
    return {
      sizes:['md'],
      model: null,
      loading: false,
      visible: false,
      amount: '',
      bank: false,

      options: [
      '<img src="https://pngimage.net/wp-content/uploads/2018/06/maybank-png.png" width="100px">', 
      '<img src="https://www.rhbgroup.com/~/media/images/default/rhb-logo-xxl.ashx"width=100px>', 
      '<img src="https://d1ic4altzx8ueg.cloudfront.net/finder-us/wp-uploads/sites/35/2019/04/CIMBbankLogo_Supplied_250x250.png"width="100px">', 
      '<img src="https://pinjamanperibadibank.com/wp-content/uploads/bank-rakyat-bank-kerjasama-rakyat-malaysia-berhad-300x300.jpg.webp" width="100px"> ', 
      '<img src="https://www.1300.com.my/wp-content/uploads/2014/11/Public_Bank_Berhad_Logo.png"width="100px">'
      ]
      
    }
  },
  methods:{
    // online(){window.location.href='https://www.cimbclicks.com.my/clicks/#/'},
    ...mapActions('store', ['updateRemain','updateEwallet','firebaseGetEwallet','updateQueue','updateService','firebaseGetUsers']),
    onSubmit(){
      if ((this.amount !== '')&&(this.bank == true)) {
        window.location.href='https://www.cimbclicks.com.my/clicks/#/'
      }
      else {
      }
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
    updateBank(){
      this.bank=true
    }
},

  computed:{
    ...mapGetters('store',['users']),
  }
}

</script>