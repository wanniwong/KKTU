<template>
<q-form @submit="submitForm"> 
   <q-input 
        v-if="tab=='register'"
        class="q-mb-md"
        outlined
        v-model="formData.name"
        label="Full Name"
        :rules="[val => !!val || 'Field is required']"        
        /> 
   <q-input 
        v-if="tab=='register'"
        class="q-mb-md"
        outlined
        v-model="formData.ic"
        label="IC / Passport No."
        mask="######-##-####"
        :rules="[val => !!val && val.length==14 || 'Field is required']"
        />  
   <q-input 
        v-if="tab=='register'"
        class="q-mb-md"
        outlined
        type="number"
        v-model="formData.age"
        label="Age"
        :rules="[val => !!val || 'Field is required']"
        />
   <q-select 
        :options="option_nat"
        v-if="tab=='register'"
        class="q-mb-md"
        outlined
        v-model="formData.nationality"
        label="Nasionality"
        :rules="[val => !!val || 'Field is required']"
        /> 
   <q-select 
        :options="option_gender"
        v-if="tab=='register'"
        class="q-mb-md"
        outlined
        v-model="formData.gender"
        label="Gender"
        :rules="[val => !!val || 'Field is required']"
        />  
   <q-select 
        :options="option_race"
        v-if="tab=='register'"
        class="q-mb-md"
        outlined
        v-model="formData.race"
        label="Race"
        :rules="[val => !!val || 'Field is required']"
        />          
   <q-input 
        v-if="tab=='register'"
        class="q-mb-md"
        outlined
        type="text"
        v-model="formData.occupation"
        label="Occupation"
        :rules="[val => !!val || 'Field is required']"
        />     
   <q-input 
        v-if="tab=='register'"
        class="q-mb-md"
        outlined
        v-model="formData.address"
        label="Address"
        :rules="[val => !!val || 'Field is required']"
        />  
   <q-input 
        v-if="tab=='register'"
        class="q-mb-md"
        outlined
        type="number"
        v-model="formData.phoneNo"
        label="Phone No."
        :rules="[val => !!val || 'Field is required']"
        />      
   <q-select 
        :options="option_user"
        v-if="tab=='register'"
        class="q-mb-md"
        outlined
        v-model="formData.user_type"
        label="User Type"
        :rules="[val => !!val || 'Field is required']"
        />            
   <q-input 
        class="q-mb-md"
        outlined
        type="email"
        v-model="formData.email"
        label="E-mail *"
        :rules="[val => !!val || 'Field is required']"
        />   
        
        <q-input 
        class="q-mb-md"
        outlined
        type="password"
        v-model="formData.password"
        label="Password *"
        :rules="[val => !!val && val.length>5 || 'Password must be more than 5 characters']"
        />   
    
     <div class="row">
        <q-space />
        <q-btn 
        type="submit"
        color="primary"
        :label="tab"
        />
    </div>
</q-form>
</template>

<script>
import {mapActions} from 'vuex'

const alerts = [
     { color:'black',message: 'You have successfully registered !' }
]

export default {
    props:['tab'],
    data() {
        return {
            formData: {
                name:'',
                ic:'',
                nationality:'',
                password:'',
                email:'',
                age:'',
                race: '',
                gender:'',
                address:'',
                user_type:'',
                occupation:'',
                phone_no:'',
            },

            option_gender: ['Male', 'Female'],
            option_nat: ['Malaysian', 'Non-Malaysian'],
            option_user: ['Senior Citizen', 'Government Officer','OKU', 'Other'],
            option_race: ['Malay', 'Chinese', 'Indian', 'Others']
            }
    },
    methods: {
        ...mapActions('store',['registerUser','loginUser']),
        submitForm(){
            if(this.tab == 'login'){
                this.loginUser(this.formData) 
            }
            else{

                this.registerUser(this.formData) 
               //  this.firebaseAddEwallet()
                this.showNotif('top')            
            }
        },
        showNotif (position) {
          const {color, message } = alerts[ Math.floor(Math.random(alerts.length) * 10) % alerts.length ]
          const random = Math.random() * 100

          const buttonColor = color ? 'white' : void 0

          this.$q.notify({
          message,
          position,
          message: 'You have successfully registered !',
          timeout: Math.random() * 5000 + 3000
          })
     },
     
    },
}
</script>
