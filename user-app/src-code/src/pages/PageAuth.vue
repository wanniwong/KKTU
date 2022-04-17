<template><q-page style="background: linear-gradient(0deg, rgba(9,63,79, 0.6)0%, rgba(89,181,215, 0.1)) 100%">
 <!-- <q-layout view="lHh lpr lFf" container style="height: 650px" class="shadow-2 rounded-borders"> -->
      <!-- <q-header elevated  class="bg-white "> -->
        <!-- <q-toolbar >
          <q-toolbar-title class="text-subtitle1 text-black absolute-center">Klinik Kesihatan Taman Universiti</q-toolbar-title>
        </q-toolbar> -->
      <!-- </q-header> -->


      <!-- <q-page-container class=" full-width full-height" > -->
        <q-page class="q-pa-md">
          <div style="margin:0px 60px 0px 70px; text-align:center">
                <img src="~assets/imgs/logo2.jpg.png" style="width: 70%; height: 70%; ">
              </div>
          <q-card class=" full-width full-height">
            
                  <q-tabs
                    v-model="tab"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                  >
                    <q-tab name="login" label="Login" />
                    <q-tab name="register" label="Register" />
                  </q-tabs>

                  <q-separator />

                  <q-tab-panels  v-model="tab" animated>
                    <q-tab-panel  name="login">
                      <login-register :tab="tab"/>
                    </q-tab-panel>

                    <q-tab-panel name="register">
                      <login-register :tab="tab"/>
                    </q-tab-panel>
                  </q-tab-panels>
            </q-card>
          </q-page></q-page>
      <!-- </q-page-container> -->
 <!-- </q-layout> -->
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  data () {
    return {
      tab: 'login'
    }
  },
  components:{
    'login-register': require('components/LoginRegister.vue').default
  },
  computed: {
    ...mapState('store',['userDetails']),
  },
  methods:{
    ...mapActions('store',['logoutUser'])
  }
}
</script>
