<template>
  <q-page>
   <div class="pageTitle"><h5> Call </h5></div>
   
   <div class="directory"><q-item to="/Dashboard" dense
    style="color:#509cb6;">Dashboard</q-item></div>
    
    <div class="queueList">
      <h6> Insert New Number</h6>
      <hr>

      <q-select style="margin: -5px 0px 15px 0px" v-model="queue.patientType" :options="[
      'Appointment', 'Senior Citizen', 'Government Officer', 'OKU', 'Other' ]" 
      label="Select Patient" ></q-select>

      <q-select style="margin: -5px 0px 15px 0px" 
      v-model="queue.serviceType" 
      @input="() =>assignRoom(queue.serviceType)"
      :options="[
      'Diabetes Observation', 'Vision Test', 'Blood Test', 'General']" 
      label="Select Service" ></q-select>

      <q-btn style="background-color:#1aa3ff; color:white; right:-70px" 
      @click="generateQNum()"> Generate Number </q-btn>
     
  </div>
  
  <div class="queueList">
  <h6> Today's Queue</h6>
  <hr>
      
  <q-table
    style="box-shadow:none"
    :data="mainQ"
    :columns="columns"
    > 
    <template v-slot:body-cell-called="cellProperties">
    <q-td :props="cellProperties" >
      <q-btn  @click="called(cellProperties.row.__index)" round 
      icon="call_made"
      :disabled="cellProperties.row.element.called"
      size="xs"
      style="background-color:#3c70a4;
      color:white;"></q-btn>
    </q-td>
    </template>
          
    <template v-slot:body-cell-recall="cellProperties" >
    <q-td :props="cellProperties" >
      <q-btn @click="recall(cellProperties.row.__index)" round 
      icon="replay"
      :disabled="cellProperties.row.element.recall"
      size="xs"
      style="background-color:#3c70a4;
      color:white;"></q-btn> 
    </q-td>
    </template>

    <template v-slot:body-cell-served="cellProperties" >
    <q-td :props="cellProperties" >
      <q-btn @click="served(cellProperties.row.__index)" round 
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

  // User defined class 
  // to store element and its priority 
  class QElement { 
      constructor(element, priority) 
      { 
          this.element = element; 
          this.priority = priority; 
      } 
  } 

  // PriorityQueue class 
  class PriorityQueue { 
  
    // An array is used to implement priority 
    constructor() 
    { 
        this.items = [ ]; 
    } 
  
    // functions to be implemented 
    // enqueue function to add element 
    // to the queue as per priority 
    enqueue(element, priority) 
    { 
        // creating object from queue element 
        var qElement = new QElement(element, priority); 
        var contain = false; 
      
        // iterating through the entire 
        // item array to add element at the 
        // correct location of the Queue 
        for (var i = 0; i < this.items.length; i++) { 
            if (this.items[i].priority > qElement.priority) { 
                // Once the correct location is found it is 
                // enqueued 
                this.items.splice(i, 0, qElement); 
                contain = true; 
                break; 
            } 
        } 
      
        // if the element have the highest priority 
        // it is added at the end of the queue 
        if (!contain) { 
            this.items.push(qElement); 
        } 
    }
    // isEmpty function 
    isEmpty() 
    { 
        // return true if the queue is empty. 
        if (this.items.length == 0){
          return true
        } 
        else { return false }
    }  
  } 

  // Creating object for queue classs 
  var priorityQueue = new PriorityQueue(); 
  var generatedNo = 5000;
  var numFromApp = 6000;
import {mapActions, mapGetters, mapState} from 'vuex'  
import { get } from 'http';
  export default {
  name: 'Call',
  
  data () {
    return {
      polling: null,
      queue : [],
      columns: [
        
        { name: 'number', align: 'center', label: 'Queue Number', field: mainQ => mainQ.element.qNumber, format: val => `${val}`},
        { name: 'room', label: 'Room', field: mainQ => mainQ.element.roomNo,  format: val => `${val}`, sortable: true },
        { 
          name: 'called', 
          label: 'Call', 
         field: mainQ => mainQ.element.called, 
         format: val => `${val}`
        },
        { 
          name: 'recall', 
          label: 'Recall', 
          field: mainQ => mainQ.element.recall, 
          format: val => `${val}`
        },
        { 
          name: 'served', 
          label: 'Served'
        }
      ],
      
    }
  },
  methods:{
    ...mapActions('store', ['enqueue' , 'called', 'recall', 'getPatient', 'getQnumber', 'qRoom', 'served', 'checkCancel']),
    
    // Queue Functions
    assignRoom(service){
      if(service=="Diabetes Observation"){
          this.queue.roomNo=11
          return 11
      }
      else if(service=="Vision Test"){
          this.queue.roomNo=14
          return 14
      }
      else if(service=="Blood Test"){
          this.queue.roomNo=15
          return 15
      }
      else if(service=="General"){
          this.queue.roomNo=Math.floor(6 + Math.random() * 4)
          return (Math.floor(6 + Math.random() * 4))
      }
      else{
        return
      }
    },
    increment(value)
    { return value + 1; },
    priorityNo(data){
      
      if(data=="Appointment"){
          return 1
      }
      else if(data=="Other"){
         return 3
      }
      else{
         return 2
      }
    },
    generateQNum(){
      // finishing patient's detail
      this.queue.called = false
      this.queue.recall = false
      this.queue.qNumber=generatedNo
      generatedNo = this.increment(generatedNo)
 
      // Determine priority
      var x = this.priorityNo(this.queue.patientType)
      if(!(priorityQueue.isEmpty())){
        priorityQueue.items = this.mainQ.slice()
      }
      priorityQueue.enqueue(this.queue, x)
      
      this.enqueue(priorityQueue.items)
      this.queue = []
    },
    fromApp(){
      
      Object.keys(this.patient).forEach(patientKey => {
        if(this.patient){
          var patientApp = {}
          patientApp.qNumber = numFromApp
          numFromApp = this.increment(numFromApp)
          patientApp.roomNo = this.assignRoom(this.patient[patientKey].queueDetails.service)
          patientApp.serviceType = this.patient[patientKey].queueDetails.service
          patientApp.patientType = this.patient[patientKey].userInfo.user_type
          patientApp.called = false
          patientApp.recall = false
          
          var y = this.priorityNo(patientApp.patientType)
           if(!(priorityQueue.isEmpty())){
            priorityQueue.items = this.mainQ.slice()
          }
          priorityQueue.enqueue(patientApp, y)
          
          this.enqueue(priorityQueue.items)
          this.getQnumber(patientKey)

          var qNo = patientApp.qNumber
          var room = patientApp.roomNo
          var id = patientKey

          Object.keys(this.mainQ).forEach(key2 => {
              if((this.mainQ[key2].element.qNumber)==qNo){
                  var position = key2
                  this.qRoom({qNo, room, id, position})
              }
          })
        }
      })
     
      Object.keys(this.mainQ).forEach(key1=>{
        Object.keys(this.patientList).forEach(key2=>{
          if(this.mainQ[key1].element.qNumber == this.patientList[key2].queueDetails.queueNo){
            this.checkCancel(this.patientList[key2].queueDetails.queueNo)
          }
        })
        })
    },
    pollData () {
		this.polling = setInterval(() => {
			this.fromApp()
    }, 3000)
    }
  },
  computed:{
    ...mapGetters('store', ['mainQ', 'patient','patientList'])
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
