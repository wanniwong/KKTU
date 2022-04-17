<template><q-page style="background: linear-gradient(0deg, rgba(9,63,79, 0.6)0%, rgba(89,181,215, 0.1)) 100%">
  <!-- <q-layout 
    view="lHh lpr lFf" 
    container 
    style="height: 650px" 
    class="shadow-2 rounded-borders"> -->
    <q-header elevated class="bg-white">
      <q-toolbar class="text-center" >
        <q-btn  
          to="/topupexact" 
          style="color:black" 
          flat 
          round 
          dense 
          icon="chevron_left" />
        <q-toolbar-title 
          class="text-subtitle1 text-black text-bold" align="center">
          Credit Card / Debit Card
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      

  <!-- <q-page-container> -->
    <q-form
       @submit="onSubmit">    
      <div v-for ="(user, key) in users"
      :key="key">
      <q-page >
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

                <q-input 
                v-model.number="amount" 
                :value="amount" class="q-pa-sm"  label="Or Enter A Value" 
                :rules="[val => !!val || 'Please select or enter your required amount.']" />   
            </q-card><br>
            
            <q-card style='background-color: white'>
              <div class="q-pa-md">
                <div class="row">
                  <div class="col text-bold">
                    Select Your Card Type
                    <div style="max-width: 300px">
                      <div class="q-gutter-md">
                        <q-select class="q-pa-sm" v-model="model" :options="options" label="Select Your Card Type" 
                        :rules="[val => !!val || 'Please select your card type.']"
                        @input="updateCard()"/>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>


              <div class="q-pa-md">
                <div class="row">
                  <div class="col text-bold">
                    Card Number
                    <q-input 
                    filled
                    color="purple-12"
                    v-model="card"
                    label="* Card Number "
                    mask="#### - #### - #### - ####"
                    lazy-rules
                    :rules="[ val => val && val.length ==25 ||'* Required']"
                    >
                      <template v-slot:prepend>
                        <q-icon name="credit_card" />
                      </template>
                    </q-input>   
                  </div>
                </div> 
              </div>

              <div class="q-pa-md">
                <div class="row">
                  <div class="col text-bold">
                    Expiry Date
                  <q-input
                    filled
                    v-model="exp"
                    label="* Expiry Date "
                    mask="## / ##"
                    lazy-rules
                    :rules="[ val => val && val.length ==7 ||'* Required']"/>    
                  </div>
                    <div class="col text-bold">
                      CVV
                      <q-input
                      filled
                      v-model="cvv"
                      label="*CVV "
                      mask="###"
                      lazy-rules
                      :rules="[ val => val.length == 3 || '* Required']"/>  
                    </div>
                  </div>
                </div>

                <div class="q-pa-md q-gutter-lg">
                  <q-toggle
                    v-model="save"
                    label="Save my card details for future payments."/>
                </div>

                <div class="text-center">
                  <q-btn
                    align="center"
                    label="Submit" 
                    type="submit" 
                    color="primary"
                    @click="updateEwallet({
                    userId:userId,
                    updates: {payment: true}});
                    onSubmit()
                     "
                    middle-label/>
                </div><br> 
              </q-card><br>
            </div>
          </q-page>
        </div>
    </q-form>
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
      card:'',
      exp:'',
      cvv:'',
      save:false,
      text: '',
      sizes:['md'],
      model: null,
      amount: '1',
      options: [
      '<img src="https://img.pngio.com/mastercard-logo-png-transparent-svg-vector-freebie-supply-mastercard-png-2400_2400.png" width="100px"> Master Card', 
      '<img src="https://i.pinimg.com/originals/15/0e/c9/150ec9cd8807be98f5f950d459b536bf.png" width="100px" >Visa Card', 
      '<img src="https://cdn4.iconfinder.com/data/icons/simple-peyment-methods/512/jcb-512.png"width="100px"> JCB', 

      ],
       usercard:false,
    }
  },
  methods:{
  refreshPage(){
      setTimeout(() => {
              window.location.reload ()       
      }, 1000)
  },
    ...mapActions('store', ['exactTopUp','deductRemain','updateRemain',
    'updateEwallet','updateQueue','firebaseGetUsers']),
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
      if ((this.amount !== '')&&(this.usercard == true)) {
        this.$router.push('/successexact')
        this.refreshPage()
      }
      else {
      }
    },
    updateCard(){
      this.usercard=true
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
