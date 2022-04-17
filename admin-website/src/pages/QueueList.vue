<template>
  <q-page>
    <div class="pageTitle"><h5> Queue List </h5></div>
    <div class="directory"><q-item to="/Dashboard" dense
    style="color:#509cb6;">Dashboard</q-item></div>

    <div class="queueReport">
      <q-input filled v-model="date" mask="date" :rules="['date']" style="width:50%">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="date" @input="() => $refs.qDateProxy.hide()"  today-btn ></q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

    <q-input v-model="search" filled type="search" style="width:30%; position: absolute; right:20px; top:62px;">
          <template v-slot:append>
            <q-icon name="search" ></q-icon>
          </template>
        </q-input>

        <q-table
         style="box-shadow:none"
          :data="data"
          :columns="columns"
        >
        <template v-slot:body-cell-called="cellProperties">
        <q-td :props="cellProperties" >
          <q-btn round
          :icon="check(cellProperties.row.called)"
          :disabled="cellProperties.row.called"
          size="xs"
          style="background-color:#3c70a4;
          color:white;"
          ></q-btn>
        </q-td>
        </template>

        <template v-slot:body-cell-recall="cellProperties">
        <q-td :props="cellProperties" >
          <q-btn round 
          :icon="check(cellProperties.row.recall)"
          :disabled="cellProperties.row.recall"
          size="xs"
          style="background-color:#3c70a4;
          color:white;"></q-btn>
        </q-td>
        </template>

        <template v-slot:body-cell-served="cellProperties">
        <q-td :props="cellProperties" >
          <q-btn round 
          :icon="check(cellProperties.row.served)"
          :disabled="cellProperties.row.served"
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
export default {
  name: 'Reports',
  data () {
    return {
      
      date: '2019/10/29',
      search:'',
      columns: [
        {
          name: 'index',
          required: true,
          label: '#',
          align: 'left',
          field: row => row.index,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'number', align: 'center', label: 'Number', field: 'number'},
        { name: 'room', label: 'Room', field: 'room', sortable: true },
        { name: 'called', label: 'Called', field: 'called' },
        { name: 'recall', label: 'Recall', field: 'recall' },
        { name: 'served', label: 'Served', field: 'served' }
      ],
      data: [
        {
          index: 1,
          number: 5030,
          room: 6,
          called: true,
          recall: false,
          served: true
        },
        {
          index: 2,
          number: 5035,
          room: 6,
          called: true,
          recall: false,
          served: true
        },
        {
          index: 3,
          number: 5043,
          room: 11,
          called: true,
          recall: true,
          served: true
        },
        {
         index: 4,
          number: 5444,
          room: 9,
          called: true,
          recall: false,
          served: true
        },
        {
         index: 5,
          number: 5033,
          room: 8,
          called: true,
          recall: true,
          served: true
        },
        {
          index: 6,
          number: 5029,
          room: 7,
          called: true,
          recall: false,
          served: true
        },
        {
          index: 7,
          number: 5039,
          room: 15,
          called: true,
          recall: false,
          served: true
        },
        {
         index: 8,
          number: 6642,
          room: 9,
          called: true,
          recall: false,
          served: true
        },
        {
         index: 9,
          number: 3345,
          room: 8,
          called: true,
          recall: false,
          served: true
        },
        {
          index: 10,
          number: 1233,
          room: 8,
          called: true,
          recall: false,
          served: true
        }
      ]
    
     }
  },
  methods :{
    check(value){
      if(value){
        return "check"
      }
      else{
        return "clear"
      }
    }
  }
}
</script>

<style>
  .queueReport{
    width: 95%;
    height: 100%;
    background-color:white;
    margin:60px 10px 20px 10px;
    padding:10px;
    box-shadow: 0px 0px 15px #b8bcc5;
  }
</style>
