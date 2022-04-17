 <template><q-page style="background: linear-gradient(0deg, rgba(9,63,79, 0.6)0%, rgba(89,181,215, 0.1)) 100%">
    <!-- <q-layout view="lHh lpr lFf" container style="height: 650px" class="shadow-2 rounded-borders"> -->
      <q-header elevated  class="bg-white ">
        <q-toolbar class="text-center" >
          <q-btn to="/home"  style="color:black" flat round dense icon="chevron_left" />
          <q-toolbar-title class="text-subtitle1 text-black ">Medicine Collection</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <!-- <q-page-container>         -->
        <div v-for ="(user, key) in users"
          :key="key">
          <q-page >
            <q-card v-show="user.medicineDetails.getQnum" 
            class="q-pa-xs" 
            style="margin-right: 15px;margin-left: 15px;margin-top:10px">
               <q-card-section style="background-color:#4d80e4; color:white;margin: -5px;">
                <div class="row no-wrap items-center"  style="text-align: center">
                  <div class="col text-subtitle1 ellipsis text-center ">
                    Klinik Kesihatan Taman Universiti</div>          
                </div>  
              </q-card-section>  <q-card-section>
              <div style="margin:0px 60px -30px 70px; text-align:center">
                <img src="~assets/imgs/logo2.jpg.png" style="width: 130px; height: 130px; ">
              </div>
            </q-card-section>
              
              <q-card-section >
                <div class="col text-h2 ellipsis text-center ">{{user.medicineDetails.qNumber}}</div> 
                <div class="text-grey text-center" v-if="(user.medicineDetails.position)!=0" > {{user.medicineDetails.position}} PATIENTS WAITING</div>
                <div class="text-grey text-center" v-if="(user.medicineDetails.position)==0">
                  It's your turn now. Please go to Counter {{user.medicineDetails.counterNo }}. </div>
                <div class="text-grey text-center"> {{dateDate()}}</div>
              </q-card-section>
              <q-separator/>
              <q-card-section >
                <div class="col text-h6 ellipsis text-center ">Counter {{user.medicineDetails.counterNo}}</div> 
              </q-card-section>    

              <q-dialog  v-if="user.medicineDetails.called==true && user.medicineDetails.recall==false">
              {{ called(user.medicineDetails.counterNo) }}
            </q-dialog>
             <q-dialog  v-if="user.medicineDetails.recall==true">
              {{ recall(user.medicineDetails.counterNo) }}
            </q-dialog>      
            </q-card>
              <div class="fixed-center" v-show="!user.medicineDetails.getQnum && !user.medicineDetails.scanned">
             <div><img src="~assets/imgs/logo2.jpg.png" style="margin-top:-200px; margin-bottom:50px"></div>
            <q-btn 
            class="fixed-center" label="Show QR Code" color="primary" 
            @click="qr(
              user.userInfo.userId),
              show = true"/></div>

            <div v-show="show" class="q-pa-xs" style="margin-top:15px; margin-right: 15px;margin-left: 15px;">
              <q-card>
                <q-card-section >
                  <div class="row no-wrap items-center"  style="text-align: center">
                    <div class="col text-subtitle2 ellipsis text-center text-red">Please Show This At the Pharmacy Counter</div>          
                  </div>  
                </q-card-section> 
                <q-separator /> 
            
                <q-card-section>
                  <div class="col text-h2 ellipsis text-center ">
                    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
                  </div>
                </q-card-section>

                <q-card-actions>
                  <q-space />   
                  <q-btn color="primary" @click="updateMedicine ({
                    userId:userId,
                    updates: {scanned: true}
                    });refreshPage()" label="Done"/>
                </q-card-actions>
                </q-card>
            </div>  
              <!-- waiting admin  -->
         <q-card  style="margin-right: 15px;margin-left: 15px; margin-top:10px;">
          <div v-show="(user.medicineDetails.scanned==true) && user.medicineDetails.getQnum==false"
           class="q-pa-xs" style="margin-right: 15px;margin-left: 15px;">
            <img src="~assets/imgs/redirect.jpg" style="height:100%; width:100%;"><br>
             <img src="~assets/imgs/loader.gif" style="height:30%; width:30%; margin-top:-430px; margin-left:130px">
             <p style="text-align:center; font-style:italic">Please wait while retrieving your queue number ... </p>
            </div>
            </q-card>
        </q-page>
        </div></q-page>
      <!-- </q-page-container> -->
    <!-- </q-layout> -->
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import Vue from 'vue';
import { Dialog } from 'quasar'
import VueQrcode from '@chenfengyuan/vue-qrcode';
import QrcodeVue from 'qrcode.vue'

Vue.component(VueQrcode.name, VueQrcode);

export default {
  props : ['store','userId'],    
    data(){
        return{
            qrInput: '',
            show: false,
            medicineNo: false,
            loading: false,
            value: `UserId : `,
            size: 200,
        }
    },
    methods:{
       dateDate(){
      var n =  new Date()
      return n.toLocaleString();
    },
      called(counter){
       this.$q.dialog({
        title: "Klinik Kesihatan Taman Universiti",
        message: "Your number is calling. Please go to counter " + counter
      }).onOk(() => {
      }).onCancel(() => {
      }).onDismiss(() => {
      })
      },
      recall(counter){
        this.$q.dialog({
          title: "Klinik Kesihatan Taman Universiti",
          message: "Your number is recalled. Please go to counter " + counter + " within 15 minutes, or your turn will be skipped."
        }).onOk(() => {
        }).onCancel(() => {
        }).onDismiss(() => {
        })
      },
        create_qrcode(){
            var opts = {
                errorCorrectionLevel: 'H',
                type: 'image/jpeg',
                rendererOpts: {
                    quality: 0.3
                }
            }
            const canvas = document.getElementById('canvas');
            QRCode.toCanvas(canvas, this.qrInput, function (error) {
            if (error) console.error(error)
                console.log('success!');
            })
        },
    ...mapActions('store', ['updateMedicine','updateEwallet','updateQueue','updateService','firebaseGetUsers']),
        showTextLoading () {
      this.loading = true
      this.visible =true

      setTimeout(() => {
        this.loading = false
        this.visible = false      
        
      }, 2000)
    },
    refreshPage(){
        window.location.reload ()
    },
    refreshHome(){
      to = '/home' 
      setTimeout(() => {
              window.location.reload ()       
      }, 1)    
    },
    qr(payload){
        this.value = this.value+payload
        console.log('value',this.value)
      }    
    },
    computed:{
        ...mapGetters('store',['users'])
    },
    mounted(){
    this.firebaseGetUsers()
    },
    components: {
      QrcodeVue,
    }    
}
</script>

<style lang="sass" scoped>
.qr
  display: inline-block;
  margin: 0 auto;
  text-align: center;

</style>