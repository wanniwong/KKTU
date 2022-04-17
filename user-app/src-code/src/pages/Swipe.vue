<template>
  <q-layout view="lHh lpr lFf" container style="height: 650px" class="shadow-2 rounded-borders">
      <q-header elevated  class="bg-white ">
        <q-toolbar class="text-center" >
          <q-btn  v-go-back=" '/home' " style="color:black" flat round dense icon="chevron_left" />
          <q-toolbar-title class="text-subtitle1 text-black ">Online Queue Registration</q-toolbar-title>
          </q-toolbar>
      </q-header>

      <q-page-container >
        <div v-for ="(user, key) in users"
          :key="key">
        <q-page>
          <br>
          <q-card v-show="user.queueDetails.getQueue" class="q-pa-xs" style="margin-right: 15px;margin-left: 15px;">
            <q-card-section>
              <div class="row no-wrap items-center"  style="text-align: center">
              <div class="col text-subtitle1 ellipsis text-center ">Klinik Kesihatan Taman Universiti </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>          
              <div class="col text-h2 ellipsis text-center ">{{user.medicineDetails.qNumber}}</div>
              <div class="text-grey text-center"> 3 PTIENTS WAITING</div>
              <div class="text-grey text-center"> Saturday 2019 October 12th 15:29</div>
            </q-card-section>
            <q-separator />
            <q-card-section v-if="user.ewallet.payment==true">

              <div class="text-h6 text-weight-bold text-left" ><q-icon name="room"/>  Room {{user.queueDetails.roomNo}}</div>
              <div class="text-h6 text-weight-bold text-left" ><q-icon name="person"/>  Dr. Ismail
              <q-btn class="float-right" color="primary" @click="o_confirm = true">Cancel</q-btn></div>

            </q-card-section>            
            <q-separator />
              <q-card-section v-if="user.ewallet.payment==false">
                <div class="text-subtitle1 text-center">Please pay your fee in time to get the room number</div>
              </q-card-section>
              <q-card-actions  v-if="user.ewallet.payment==false">
                <q-btn color="primary" @click="topup=true;" >Pay</q-btn>
                <q-space />
                <q-btn flat color="primary" @click="o_confirm = true">Cancel</q-btn>
              </q-card-actions>

              <q-dialog v-model="topup">
                <q-card>
                  <q-card-section>
                    <div class="text-center"><h6>Total Cost</h6></div>
                    <div class="text-center"><h4>RM {{user.ewallet.deduct}}</h4>
                    </div>
                    <div class="text-center"><p class="text-h6">e-Wallet: RM {{user.ewallet.remain}}</p>
                    </div>
                    <q-checkbox v-model="tick" label="Top Up the exact amount" color="primary"/>

                  </q-card-section>
                  <q-card-actions>
                    <q-space/>
                    <q-btn @click="checkTick()"
                     >Next</q-btn>
                  </q-card-actions>
                </q-card>
              </q-dialog>
                                                  
              <q-dialog v-model="o_confirm" persistent>
                <q-card>
                  <q-card-section class="row items-center">
                    <q-avatar icon="warning" color="primary" text-color="white" />
                    <span class="q-ml-sm">Are you sure you want to cancel</span>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="OK" color="primary"  @click="updateQueue({
                                            userId:userId,
                                            updates: {getQueue: false, service:''}
                                            });updateEwallet({
                                              userId:userId,
                                              updates: {payment: false
                                              }
                                            });showNotif('top')" v-close-popup/>
                  </q-card-actions>
                <q-dialog v-model="o_ok" persistent>
                  <q-card>
                    <q-card-section class="row items-center">
                      <span class="q-ml-sm">Successfully cancelled</span>
                    </q-card-section>
                    <q-card-actions align="right">
                      <q-btn @click="o_confirm=false; " to="/queue" flat label="Dismiss" color="primary" v-close-popup />
                    </q-card-actions>
                    </q-card>
                  </q-dialog>
                </q-card>
              </q-dialog>   
                                                                   

          </q-card>
          
          <div>
            <div style="display: block; margin-left: auto; margin-right: auto" class="q-pa-md fixed-center" >
              <div  class="q-gutter-md ">

                <q-form v-show="!user.queueDetails.getQueue" class="q-gutter-md " >
                  <div>
                  <q-select style="width: 230px" bg-color="white" class="q-pa-sm " filled v-model="formData.service" :options="option_services" label="Services">
                  </q-select>
                  </div>
                  <div>
                    <q-btn style="display: block; margin-left: auto; margin-right: auto"
                    @click="updateService ({
                      userId: userId, 
                      updates:{service: formData.service}
                      }); updateQueue({
                        userId:userId,
                        updates: {getQueue: true}
                      });
                      showTextLoading();refreshPage()
                       "
                      label="Confirm" color="primary" type="submit"/>
                      </div>
                      </q-form>

                      <q-dialog v-model="loading" class="bg-grey-3 relative-position" style="width: 288px; height: 290px">
                        <q-card>
                         <q-spinner-ios class="pull-right on-left q-pa-sm"
                         anchor="center"
                         color="primary"
                         size="4em"/>
                        </q-card>
                      </q-dialog>
                    </div>
                </div>
            </div>         
          </q-page>
        </div>
      </q-page-container>
    </q-layout>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
const alerts = [
     { color:'black',message: 'You have successfully cancelled the queue !' }
]
export default {
  props : ['store','userId'],
  data(){
    return {
      option_appointment: ['Yes', 'No'],
      option_services: ['Appointment (Previously Booked with the Doctor)',
         'Diabetes Observation', 'Vision Test', 'Blood Test', 'General'],
      info: null,
      queue: false,
      confirm: false,
      ok: false,
      tick: false,
      topup: false,
      formData:{
        service: '',
      },
      visible: false,
      loading: false,
      customeModel: false,
      o_ok: false,
      o_confirm: false
      // getQueue: false,
    }
  },
  methods: {
     showTextLoading () {
      this.loading = true
      this.visible =true
      setTimeout(() => {
        this.loading = false
        this.visible = false
      }, 2000)
    },
     showTextLoading2 () {
      this.loading = true
      this.visible =true
      setTimeout(() => {
        this.loading = false
        this.visible = false
        window.location.href='/#/paysu'
      }, 2000)
    },    
    ...mapActions('store', ['updateEwallet','updateQueue','updateService','firebaseGetUsers']),
    checkTick(){
      if(this.tick == true){
        window.location.href='/#/topupexact'
      }
      
      else {
        this.showTextLoading2()
      }
    },
        refreshPage(){
      window.location.reload ()
      // window.location.href('/#/queue')
      console.log('refresh')
    },
    showNotif (position) {
          const {color, message } = alerts[ Math.floor(Math.random(alerts.length) * 10) % alerts.length ]
          const random = Math.random() * 100

          const buttonColor = color ? 'white' : void 0

          this.$q.notify({
          message,
          position,
          message: 'You have successfully cancelled the queue!',
          timeout: Math.random() * 5000 + 3000
          })
    }
  },
  computed: {
    ...mapGetters('store',['users']),

  }


}
</script> 
