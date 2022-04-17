<template>
  <q-layout view="hHh Lpr lFf" style="background-color:white">
    <q-header elevated style="background-color:#64b2cd">
      <q-toolbar> 
        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" ></q-btn>
        <q-toolbar-title>
          Klinik Kesihatan Taman Universiti
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
          v-model="drawerLeft"
          show-if-above
          :breakpoint="700"
          elevated
        
        >
        <q-scroll-area class="fit">
            <div>
              
      <q-list>

        <q-item style="padding:50px; padding-right:20px;background-color:#3c70a4;">
          <q-icon name="account_circle" style="font-size: 50px; color:white; margin:10px" ></q-icon>
          <q-item-section right>
          <q-btn flat style="background-color:transparent; color:white" icon-right="arrow_drop_down" label="Admin">
          <q-menu fit anchor="bottom left" self="top left">
             <q-item clickable @click="logOut()">
          <q-item-section avatar>
            <q-icon name="keyboard_tab" style="margin:auto"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
          </q-menu>
          </q-btn>
          <q-item-section caption style="padding-left:20px;color:white; font-size:12px">   Administrator</q-item-section>
          </q-item-section>
      </q-item>
         

        <q-item to="/Dashboard" exact clickable>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
       
        <q-item to="/Call" exact clickable>
          <q-item-section avatar>
            <q-icon name="message" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Call</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Pharmacy" exact clickable>
          <q-item-section avatar>
            <q-icon name="apartment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pharmacy</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item
          expand-separator
          icon="library_books"
          label="Reports">

          <q-item to="/QueueList" exact clickable>
          <q-item-section style="margin-left:55px;">
            <q-item-label>Queue List</q-item-label>
          </q-item-section></q-item>
          <q-item to="/Monthly" exact clickable>
          <q-item-section style="margin-left:55px;">
            <q-item-label>Monthly</q-item-label>
          </q-item-section></q-item>
        </q-expansion-item>

      </q-list>
            </div>
          </q-scroll-area>
        </q-drawer>
      
    <q-page-container>
     <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { firebaseAuth } from 'boot/firebase'
import {mapActions} from 'vuex'  
export default {
  name: 'MyLayout',


  data () {
    return {
    drawerLeft: false,
    }
  },
  methods : {
    ...mapActions('store', ['userStatus']),
    
    async logOut(){
      try{
        await firebaseAuth.signOut()
        console.log('User signed out.')
        this.$router.push('/')
      } catch (err) {
        this.$q.notify({
           message: err.message,
            color: 'negative',
            icon: 'eva-alert-circle-outline',
            position: 'top'
        })
      }
    }
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  }
}
</script>
<style>
.pageTitle{
    position: relative;
    left: 0px;  
    margin:-30px 0px -40px 30px;
}
.directory{
    position:absolute; 
    top:-5px;
    right: 30px;
    margin:10px 0px 0px 30px;
    font-size:16px;
}

</style>
