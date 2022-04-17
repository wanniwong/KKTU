<template>
  <q-page>
    <div class="pageTitle"><h5> Pharmacy</h5></div>
   
   <div class="directory"><q-item to="/Dashboard" dense
    style="color:#509cb6;">Dashboard</q-item></div>
    
    <div class="queueList">
      <h6> Insert New Number</h6>
      <hr>

      <q-input  filled v-model="queue.icNo" 
      label="Patient's IC/Passport Number">
          <template v-slot:prepend>
            <q-icon name="portrait" ></q-icon>
          </template>
        </q-input>
      <hr style="border:none">
      <q-btn style="background-color:#1aa3ff; color:white; right:-70px" 
      @click="generateQNum(); fromApp()"> Generate Number </q-btn>
     
  </div>
  
  <div class="queueList">
  <h6> Today's Queue</h6>
  <hr>
      
  <q-table
    style="box-shadow:none"
    :data="subQ"
    :columns="columns"> 
          
         
    <template v-slot:body-cell-called="cellProperties">
    <q-td :props="cellProperties" >
      <q-btn  @click="subCalling(cellProperties.row.__index)" round 
      icon="call_made"
      :disabled="cellProperties.row.called"
      size="xs"
      style="background-color:#3c70a4;
      color:white;"></q-btn>
    </q-td>
    </template>
          
    <template v-slot:body-cell-recall="cellProperties" >
    <q-td :props="cellProperties" >
      <q-btn @click="subRecalling(cellProperties.row.__index)" round 
      icon="replay"
      :disabled="cellProperties.row.recall"
      size="xs"
      style="background-color:#3c70a4;
      color:white;"></q-btn> 
    </q-td>
    </template>

    <template v-slot:body-cell-served="cellProperties" >
    <q-td :props="cellProperties" >
      <q-btn @click="subServed(cellProperties.row.__index)" round 
      icon="delete"
      size="xs"
      style="background-color:#3c70a4;
      color:white;"></q-btn> 
    </q-td>
    </template>

  </q-table>       
  </div>
  </q-page>
</template>

<script>
 var subQueue = [];
 var generatedNo = 7000;
 var appNo = 8000;
import {mapActions, mapGetters, mapState} from 'vuex' 
export default {
  name: 'Department',
  data(){
    return{
      queue : [],
      columns: [
        
        { name: 'number', align: 'center', label: 'Queue Number', field: subQ => subQ.qNumber, format: val => `${val}`},
        { name: 'counter', label: 'Counter', field: subQ => subQ.counter,  format: val => `${val}`, sortable: true },
        { 
          name: 'called', 
          label: 'Call', 
         field: subQ => subQ.called, 
         format: val => `${val}`
        },
        { 
          name: 'recall', 
          label: 'Recall', 
          field: subQ => subQ.recall, 
          format: val => `${val}`
        },
        { 
          name: 'served', 
          label: 'Served'
        }
      ],
    }
  },
  methods : {
 ...mapActions('store', ['getPatient','subQline' , 'subCalling', 'subRecalling', 'medQnumber', 'qCounter', 'subServed']),
    
    increment(value)
    { return value + 1; },

    generateQNum(){
      // finishing patient's detail
      this.queue.called = false
      this.queue.recall = false
      this.queue.qNumber=generatedNo
      this.queue.counter=Math.floor(1 + Math.random() * 4)
      generatedNo = this.increment(generatedNo)
      
      if(subQueue.length!=0){
        subQueue = this.subQ.slice()
      }
      
      subQueue.push(this.queue)
      this.subQline(subQueue)
      this.queue = []
    },
    fromApp(){
      Object.keys(this.medPatient).forEach(patientKey => {
        if(this.medPatient){
        var medPatient = {}
        medPatient.icNo = this.medPatient[patientKey].userInfo.ic
        medPatient.qNumber = appNo 
        appNo = this.increment(appNo)
        medPatient.counter = Math.floor(1 + Math.random() * 4)
        medPatient.called = false
        medPatient.recall = false
        if(subQueue.length!=0){
        subQueue = this.subQ.slice()
       }
        subQueue.push(medPatient)
        this.subQline(subQueue)
        this.medQnumber(patientKey)

       var qNo = medPatient.qNumber
       var counter = medPatient.counter
       var id = patientKey
       Object.keys(this.subQ).forEach(key2 => {
            if((this.subQ[key2].qNumber)==qNo){
                var position = key2
                this.qCounter({qNo, counter, id, position})
            }
        })
        medPatient = {}
        }
        else{
          return
        }
      }
      )
    },
    pollData () {
		this.polling = setInterval(() => {
			this.fromApp()
		}, 3000)
    }
  },
  computed:{
    ...mapGetters('store', ['subQ', 'medPatient'])
  },
  beforeDestroy () {
  	clearInterval(this.polling)
  },
  created(){
  this.pollData()
  this.getPatient()
  }
}

</script>

<style>
.queueList{
    width: 90%;
    height:100%;
    background-color:white;
    margin:10px 10px 20px 20px;
    padding:10px;
    display:inline-block;
    box-shadow: 0px 0px 15px #b8bcc5;
    text-align:center;
    vertical-align: top;
}

</style>