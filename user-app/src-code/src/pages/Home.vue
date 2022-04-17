<template><q-page style='background-color:white'>
 
    <!-- <q-layout  view="lHh Lpr lff" container style="height: cover" class="bg-white shadow-2 rounded-borders"> -->
      <q-header elevated class="bg-white ">
        <q-toolbar><q-btn style="color:black" flat @click="drawer = !drawer" round dense  />
          <q-space/>
          <q-btn
        @click="logoutUser"
        class="absolute-right-q-pr-sa"
        style="color:black"
        icon="exit_to_app"
        no-caps
        flat
        dense
        label="Logout"/>
        </q-toolbar>
      </q-header>

      <!-- <q-page-container class="bg-white "> -->
       <div  v-for ="(user, key) in users"
          :key="key"
          style='height:220px; font-size: 18px;
          background:linear-gradient(0deg, rgba(9,63,79, 1)0%, rgba(89,181,215, 0.6)) 100%, url(https://cdn4.vectorstock.com/i/1000x1000/50/98/pills-related-medical-pattern-background-vector-15365098.jpg);
          '><br>
          <q-list  seperator>
          <q-item >
            <q-item-section avatar style="color:white; display: block; margin-left: auto; margin-right: auto">
              <q-avatar style="width:50px; height:50px">
                <img  src="https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png"/>
              </q-avatar>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="text-white" style="margin-right: 14px">
              <q-item-label style="display: block; margin-left: auto; margin-right: auto;">{{user.userInfo.name}}</q-item-label>
               <q-item-label style="display: block; margin-left: auto;margin-right: auto;">
        <q-icon name="verified_user" style="margin-right:10px"/>{{user.userInfo.ic}}</q-item-label>
            </q-item-section>
          </q-item>
          </q-list>
        </div>
<!-- <img height='150' width='150' src="~assets/imgs/logo2.jpg.png"/> -->
        <!-- content  -->
        <div style='background-color:white;  border-radius: 35px; margin-top:-30px;box-shadow:none; '>

         <div style="text-align:center; padding:10px;font-size: 16px; font-weight:bold">
         <div><img src="~assets/imgs/logo2.jpg.png" style="width:30%; height:30%;"></div>
           {{dateDate()}}
         </div><q-separator/>
          
         <div style="margin: 0 auto; width: 350px; height: 100px; font-size:20px; font-style:italic">
        <q-item to="/queue" exact clickable style="margin-top:5px;margin-bottom:-100px;">
          <q-item-section avatar>
            <img src="~assets/imgs/icons8-heart-with-pulse-50.png"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Online Queue Registration</q-item-label>
          </q-item-section>
        </q-item></div><q-separator/>

        <div style="margin: 0 auto; width: 350px; height: 100px; font-size:20px; font-style:italic">
        <q-item to="/collect_med" exact clickable>
          <q-item-section avatar>
            <img src="~assets/imgs/icons8-pill-50.png"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Medicine Collection</q-item-label>
          </q-item-section>
        </q-item></div><q-separator/>

        <div style="margin: 0 auto; width: 350px; height: 100px; font-size:20px; font-style:italic" 
        v-for ="(user, key) in users"
          :key="key">
        <q-item to="/payment" exact clickable>
          <q-item-section avatar>
            <img src="~assets/imgs/icons8-wallet-50.png"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>E-Wallet</q-item-label>
          </q-item-section>
           <q-item-section-right>
             <p style="font-size:15px">RM </p> </q-item-section-right>
              <q-item-section-right><p style="font-size:24px; color:#4d80e4">{{user.ewallet.remain}}</p>
             </q-item-section-right>
        </q-item></div>
        <!-- <q-btn to="/queue" class="full-width q-mt-md" style="box-shadow:none">
          <q-img 
            src="https://www.michigangastro.com/wp-content/uploads/2017/06/patients-header-e1496856947566.jpg"
            style="max-width: 100%; height:  120px;">
            <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
              Online Queue Registration</div>
          </q-img>
        </q-btn>

        <q-btn to="/collect_med" class="full-width q-mt-md" style="box-shadow:none">
          <q-img 
            src="https://s.abcnews.com/images/Health/pharmacist-stock-gty-jef-181010_hpMain_4x3_1600.jpg"
            style="max-width: 100%; height: 120px;">
            <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
              Medicine Collection</div>
          </q-img>
        </q-btn>

        <q-btn to="/payment" class="full-width q-mt-md" style="box-shadow:none">
          <q-img
            src="https://www.baenegocios.com/__export/1572462860429/sites/cronica/img/2019/10/30/billetera_electronica_afip_1.jpg?__scale=c:transparent,w:NaN,h:732,t:3,p:0,q:80"
            style="max-width: 100%; height: 120px;box-shadow:none">
            <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
              E-Wallet</div>
          </q-img>
        </q-btn> -->

        </div>
        <!-- </q-page-container> -->
      <!-- </q-layout> -->
    </q-page>
</template>

<script>

  var n =  new Date()

import {mapActions, mapState,mapGetters} from 'vuex'


export default {
  data () {
    return {
      drawer: false,
      polling: null,
    }
  },
  methods:{
    ...mapActions('store',['logoutUser','firebaseGetUsers']),
    dateDate(){
      return n.toLocaleString();
    },
     pollData() {
      this.polling = setInterval(() => {
      this.dateDate()
      }, 3000)
    }
  },
  computed:{
    ...mapGetters('store',['users']),
    beforeDestroy () {
  	clearInterval(this.polling)
  },
  created(){
  this.pollData()
  }
  }
}
</script>

<style lang="sass" scoped>
.profile
  display: block;
  margin-left: auto;
  margin-right: auto;
</style>