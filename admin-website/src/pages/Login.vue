<template>
  <q-page class="flex flex-center">
    <div class="login">
      <img src="~assets/logo2.jpg.png" style="margin:-20px 50px -30px 50px;"/>
     <!-- <h4 style="text-align:center"> Klinik Kesihatan <br> Taman Universiti </h4> -->
     <h4 class="label">ENTER THE CREDENTIALS TO LOG IN</h4>
     <q-separator/>
     <q-item><q-item-section avatar>
        <q-icon name="perm_identity" /></q-item-section>
          <q-item-section>
            <q-item-label>Email</q-item-label>
            <q-item-label caption>
            <q-input ref="email" v-model="email" filled type="email"
            :rules="[
            val => !!val || 'Email is needed',
            val => this.validateEmail(val) || 'Email format invalid']"></q-input>
            </q-item-label>
          </q-item-section>
     </q-item>

          <q-item><q-item-section avatar>
        <q-icon name="lock" /></q-item-section>
          <q-item-section>
            <q-item-label>Password</q-item-label>
            <q-item-label caption>
            <q-input ref="password" v-model="password" 
            filled :type="isPwd ? 'password' : 'text'"
            :rules="[val => !!val || 'Password is required']">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            ></q-icon>
          </template>
        </q-input>
            </q-item-label>
          </q-item-section>
     </q-item>
      <q-item>
     <form>
     <input id="rememberme" name="rememberme" value="remember" type="checkbox" align="left" /> &nbsp;Remember me
   </form> </q-item>
  <q-btn flat style="margin:auto;
    display:block;
    background-color: #1aa3ff;
    color:white;
    border:none;
    padding:10px;
    width:80%"
    @click="tryLogin"> Login </q-btn>
    </div>
  </q-page>
</template>

<script>
import {mapActions} from 'vuex'
import { firebaseAuth } from 'boot/firebase'
import isEmail from 'validator/lib/isEmail'
export default {
  name:'Login',
  data () {
    return{
     
      isPwd: true,
      email: '',
      password: ''
    }
  },
  methods:{
    
    validateEmail(value) {
      return isEmail(value)
    },
    tryLogin() {
      const emailSelector = this.$refs.email
      const passwordSelector = this.$refs.password
      emailSelector.validate()
      passwordSelector.validate()
      if (emailSelector.hasError || passwordSelector.hasError) return 
      else {
        let data =  {
          email: this.email,
          password: this.password
        } 
        this.tryVerify(data)
      }
    },
    async tryVerify(payload) {
        try {
          // firebase authentication
          await firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
          console.log('User signed in.')
          this.$router.push('/Dashboard')
        } catch (err) {
          this.$q.notify({
            message: err.message,
            color: 'negative',
            icon: 'eva-alert-circle-outline',
            position: 'top'
          })
        }
    }
  }
}
</script>
<style>
</style>

