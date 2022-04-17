<template>
<div>
  <div v-for ="(user, key) in users"
          :key="key">
    <q-btn qr(
      user.userInfo.userId, 
      user.userInfo.ic,
      user.userInfo.name)>click</q-btn>    
    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
  </div>
</div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue'
  import {mapActions, mapState,mapGetters} from 'vuex'

  export default {
    data() {
      return {
        value: `
        UserId : `,
        value2: `
        
        Ic/Passport No : `,
        value3: `
        
        Name: `,
        size: 300,
      }
    },
    methods:{
      ...mapActions('store',['logoutUser','firebaseGetUsers']),
      qr(payload1,payload2,payload3){
        this.value = this.value+payload1+this.value2+payload2+this.value3+payload3
        console.log('value',this.value)
      }
    },
    computed:{
      ...mapGetters('store',['users']),
    },
    components: {
      QrcodeVue,
    }
 }
</script> 
