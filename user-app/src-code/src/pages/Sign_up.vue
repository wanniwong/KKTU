<template>
   <div class="q-pa-mdc " >
    <div class="q-gutter-md row items-start justify-center ">
       <form style="width: 85%" @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
      <q-card >
        <q-card-section>
            <p>Personal Information</p>
            <q-input filled v-model="text.name" label="Full Name" stack-label dense="dense" 
                   lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your Full Name']"/>
                  <q-input filled v-model="text.ic" label="IC/Passport No." stack-label dense="dense" 
                   lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your IC No.']"/>
            <q-select filled v-model="text.nationality" :options="option_nationality" label="Nationality" stack-label dense="dense" 
                   lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please select your Nationality']"/>
            <q-input filled v-model="text.age" label="Age" stack-label dense="dense" 
                   lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your Age']"/>            

            <q-select filled v-model="text.gender" :options="option_gender" label="Gender" stack-label dense="dense" 
                   lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please select your gender']"/>

            <q-select filled v-model="text.race" :options="option_race" label="Race" stack-label dense="dense" 
                   lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please select your race']"/> 
            </q-card-section>

        <q-separator inset/>

        <q-card-section>       
            <q-input filled v-model="text.address" label="Address" stack-label dense="dense"
                 lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your address']"/>

      
        </q-card-section>        

        <q-separator inset/>   

        <q-card-section> 
           <q-select filled v-model="text.user_type" :options="option_user" label="User Type" stack-label dense="dense" 
           lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please select your user type']"/>
        </q-card-section>
        <q-separator inset/>   

        <q-card-section> 
            <q-input filled v-model="text.phone_no" label="Phone No." stack-label dense="dense"          
            lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your phone no.']"/>
            <q-input filled v-model="text.email" label="E-mail" stack-label dense="dense" 
                     lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your email']"/>

      <q-input v-model="password" filled label="Password" type="password" stack-label dense="dense" 
               lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your password']"/>
      <q-input v-model="password" filled label="Confirm Password" :type="isPwd ? 'password' : 'text'" stack-label dense="dense">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <br>
      <q-btn @click="showNotif('top')" to="/home" label="Submit" type="Submit" color="primary" />
      </q-card-section>
      </q-card>
      </form>
    </div>
  </div>
</template>

<script>
const alerts = [
  { color:'black',message: 'You have successfully registered !'},
]
export default {
   data () {
    return {
      text:{
        name:'',
        ic:'',
        nationality:'',
        age:'',
        gender:'',
        race:'',
        address:'',
        user_type:'',
        phone_no:'',
        email:''
      } ,
      password: '',
      isPwd: '',

      option_nationality: [
        'Malaysian', 'Non-Malaysian'
      ],
      option_gender: [
          'Male', 'Female'
      ],
      option_race: [
          'Malay', 'Chinese', 'Indian', 'Others'
      ],
      option_user: [
          'Senior Citizen', 'Government Officer','OKU', 'Others'
      ]
    }
  },
  methods: {
       onSubmit () {
      this.$refs.text.validate()
      if (this.$refs.text.hasError || this.$refs.text.hasError) {
        this.formHasError = true
      }
      else if (this.accept !== true) {
        this.$q.notify({
          color: 'negative',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Submitted'
        })
      }
    },
    onReset () {
      this.text = null
      this.$refs.text.resetValidation()
  
    },
    showNotif (position) {
      const { color, textColor, multiLine, icon, message, avatar } = alerts[ Math.floor(Math.random(alerts.length) * 10) % alerts.length ]
      const random = Math.random() * 100
      const twoActions = random > 70
      const buttonColor = color ? 'white' : void 0
      this.$q.notify({
        color,
        textColor,
        icon: random > 30 ? icon : null,
        message,
        position,
        avatar,
        multiLine,
        timeout: Math.random() * 5000 + 3000
      })
    }
  }
}
</script>