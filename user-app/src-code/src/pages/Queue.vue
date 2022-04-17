<template><q-page style="background: linear-gradient(0deg, rgba(9,63,79, 0.6)0%, rgba(89,181,215, 0.1)) 100%">
  <!-- <q-layout view="lHh lpr lFf" container style="height: 650px" class="shadow-2 rounded-borders"> -->
      <q-header elevated  class="bg-white ">
        <q-toolbar class="text-center" >
          <q-btn  to="/home" style="color:black" flat round dense icon="chevron_left" />
          <q-toolbar-title class="text-subtitle1 text-black ">Online Queue Registration</q-toolbar-title>
          </q-toolbar>
      </q-header>

     
        <div v-for ="(user, key) in users" :key="key">
        <q-page><br>
          <q-card v-show="user.queueDetails.getQnum" class="q-pa-xs" style="margin-right: 15px;margin-left: 15px;">
            <q-card-section style="background-color:#4d80e4; color:white;margin: -5px;">
              <div class="row no-wrap items-center"  style="text-align: center">
                <div class="col text-subtitle1 ellipsis text-center " >
                  Klinik Kesihatan Taman Universiti </div>
              </div></q-card-section><q-card-section>
              <div style="margin:0px 60px -30px 70px; text-align:center">
                <img src="~assets/imgs/logo2.jpg.png" style="width: 130px; height: 130px; ">
              </div>
            </q-card-section>
            

            <q-card-section>          
              <div class="col text-h2 ellipsis text-center ">{{user.queueDetails.queueNo}}</div>
               <div class="text-grey text-center" v-if="(user.queueDetails.position)==0 && user.ewallet.payment==true">
                  It's your turn now. Please go to Room {{user.queueDetails.roomNo }}. </div>
              <div class="text-grey text-center" v-if="(user.queueDetails.position)!=0"> {{user.queueDetails.position}} PATIENTS WAITING</div>
              <div class="text-grey text-center"> {{dateDate()}}</div>
            </q-card-section><q-separator />

            <q-card-section v-if="user.ewallet.payment==true">
              <div class="text-h6 text-weight-bold text-left" ><q-icon name="room"/>  Room {{user.queueDetails.roomNo}}</div>
              <div class="text-h6 text-weight-bold text-left" ><q-icon name="person"/>  Dr. Ismail
              <q-btn class="float-right" color="primary" @click="o_confirm = true">Cancel</q-btn></div>
            </q-card-section><q-separator />

   

            <q-card-section v-if="user.ewallet.payment==false">
              <div class="text-subtitle1 text-center text-red">In order to continue, please proceed the payment first.</div>
            </q-card-section>

            <q-card-actions  v-if="user.ewallet.payment==false">
              <q-btn color="primary" @click="topup=true;" >Pay</q-btn>
              <q-space />
              <q-btn flat color="primary" @click="o_confirm = true">Cancel</q-btn>
            </q-card-actions>

            <q-dialog  v-if="user.queueDetails.called==true && user.queueDetails.recall==false">
              {{ called(user.queueDetails.roomNo) }}
            </q-dialog>
             <q-dialog  v-if="user.queueDetails.recall==true">
              {{ recall(user.queueDetails.roomNo) }}
            </q-dialog>
            <q-dialog v-if="(user.queueDetails.position)==1 && user.ewallet.payment==true">
              {{prepare(user.queueDetails.roomNo)}}
            </q-dialog>

            <q-dialog v-model="topup">
              <q-card>
                <q-card-section>
                  <div class="text-center"><h6>Total Cost</h6></div>
                  <div class="text-center"><h4>RM {{user.ewallet.deduct}}.00</h4>
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
                  <q-btn flat label="OK" color="primary"  
                  @click="updateQueue({
                  userId:userId,
                  updates: {service:'',getQnum: false, called:false, recall:false, position:'', roomNo:'', cancel:true}});
                  updateEwallet({
                  userId:userId,
                  updates: {payment: false}});
                  updateType({
                    userId:userId,
                    updates:{user_type: user.userInfo.fixed_type}
                  });
                  showNotif('top');
                  refreshPage()" 
                  v-close-popup/>
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
          
          <!-- waiting admin  --><q-card  style="margin-right: 15px;margin-left: 15px;">
          <div v-show="(user.queueDetails.service)!='' && user.queueDetails.getQnum==false"
           class="q-pa-xs" style="margin-right: 15px;margin-left: 15px;">
            <img src="~assets/imgs/redirect.jpg" style="height:100%; width:100%;"><br>
             <img src="~assets/imgs/loader.gif" style="height:30%; width:30%; margin-top:-430px; margin-left:130px">
             <p style="text-align:center; font-style:italic">Please wait while retrieving your queue number ... </p>
            </div>
            </q-card>
          <div>
            <div style="display: block; margin-left: auto; margin-right: auto" class="q-pa-md fixed-center" >
              <div  class="q-gutter-md ">
                <q-form v-show="!user.queueDetails.getQnum && (user.queueDetails.service)==''" class="q-gutter-md " >
                  <div> 
                    <div><img src="~assets/imgs/logo2.jpg.png"></div>
                  <q-select style="width: 230px" bg-color="white" 
                  class="q-pa-sm " filled v-model="formData.service" 
                  :options="option_services" 
                  label="Services *"
                  :rules="[val => !!val || 'Field is required']"
                  />
                  <q-checkbox v-model="option_appointment"  color="cyan" @input="appointment()">Appointment</q-checkbox>
                  </div>
                  <div>
                    <q-btn style="display: block; margin-left: auto; margin-right: auto"
                    @click="updateService ({
                      userId: userId, 
                      updates:{service: formData.service}
                      });onSubmit()
                      "
                      label="Confirm" 
                      color="primary" 
                      type="submit"/>
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
      </q-page>
    <!-- </q-layout> -->
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import { Dialog } from 'quasar'
import VueRouter from 'vue-router'
const router = new VueRouter({
  mode: 'history'
})
const alerts = [
     { color:'black',message: 'You have successfully cancelled the queue !' }
]
 

export default {
  props : ['store','userId'],
  data(){
    return {
      option_appointment: false,
      option_services: [
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
      
    }
  },
  methods: {    
    ...mapActions('store', ['chgAppointment']),
    refreshPage(){
      window.location.reload()
    },    
    appointment(){
      if(this.option_appointment){
        Object.keys(this.users).forEach(key =>{
          this.chgAppointment(this.users[key].userInfo.userId)
        })
      }
    },
    dateDate(){
      var n =  new Date()
      return n.toLocaleString();
    },
    called(room){
       this.$q.dialog({
        title: "Klinik Kesihatan Taman Universiti",
        message: "Your number is calling. Please go to room " + room
      }).onOk(() => {
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    recall(room){
       this.$q.dialog({
        title: "Klinik Kesihatan Taman Universiti",
        message: "Your number is recalled. Please go to room " + room + " within 15 minutes, or your turn will be skipped."
      }).onOk(() => {
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    prepare(room){
       this.$q.dialog({
        title: "Klinik Kesihatan Taman Universiti",
        message: "Remaining 1 patient, you are welcome to our clinic and your room number is " + room
      }).onOk(() => {
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
     showTextLoading () {
      this.loading = true
      this.visible =true
      setTimeout(() => {
        this.loading = false
        this.visible = false
        window.location.reload()
      }, 1000)
    },
     showTextLoading2 () {
      this.loading = true
      this.visible =true
      setTimeout(() => {
        this.loading = false
        this.visible = false
        this.$router.push('/paysu')
      }, 1000)
    },    
    ...mapActions('store', ['updateEwallet','updateQueue','updateType','updateService','firebaseGetUsers']),
    checkTick(){
      if(this.tick == true){
        this.$router.push('/topupexact')
      }
      
      else {
        this.showTextLoading2()
      }
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
    },
    onSubmit () {
      if(this.formData.service==''){
        console.log('no selected service')
      }
      else {
       this.showTextLoading()
       console.log('service')
      }
    },
      
    },
  computed: {
    ...mapGetters('store',['users']),
  },
  mounted(){
    this.firebaseGetUsers()
  }
}
</script> 
