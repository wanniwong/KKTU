import Vue from 'vue'
import { firebaseAuth , firebaseDb } from 'boot/firebase'

const state = {
  mainQueue : [],
  subQueue : [],
  patient: {}
}
const mutations = {
    setMainQueue(state, payload) {
        Vue.set(state.mainQueue, payload.mainId, payload.mainQueue)
    },
    setPatientList(state, payload) {
        Vue.set(state.patient, payload.patientId, payload.patient)
    },
    updatePatientList(state, payload){
        Object.assign(state.patient[payload.patientId], payload.patient)
    },
    updateQnumRoom(state, payload){
        state.patient[payload.patientId].queueDetails.queueNo = payload.qNo
        state.patient[payload.patientId].queueDetails.roomNo = payload.room
        state.patient[payload.patientId].queueDetails.position = payload.pos
    },
    updateQnumCounter(state, payload){
        state.patient[payload.patientId].medicineDetails.qNumber = payload.qNo
        state.patient[payload.patientId].medicineDetails.counterNo = payload.counter
        state.patient[payload.patientId].medicineDetails.position = payload.pos
    },
    changeCallValue(state, index){
        state.mainQueue[index].element.called = true
        Object.keys(state.patient).forEach(key => {
            if((state.patient[key].queueDetails.queueNo) == (state.mainQueue[index].element.qNumber)){
                state.patient[key].queueDetails.called = true
            }
        })
    },
    changeQnumValue(state,payload){
        state.patient[payload].queueDetails.getQnum = true
    },
    changeMedQnumValue(state,payload){
        state.patient[payload].medicineDetails.getQnum = true
    },
    changeRecallValue(state,index){
        state.mainQueue[index].element.recall = true
        Object.keys(state.patient).forEach(key => {
            if((state.patient[key].queueDetails.queueNo) == (state.mainQueue[index].element.qNumber)){
                state.patient[key].queueDetails.recall = true
            }
        })
    },
    setSubQueue(state, payload){
        Vue.set(state.subQueue, payload.subId, payload.subQueue)
    },
    subCall(state, index){
        state.subQueue[index].called = true
        Object.keys(state.patient).forEach(key => {
            if((state.patient[key].medicineDetails.qNumber) == (state.subQueue[index].qNumber)){
                state.patient[key].medicineDetails.called = true
            }
        })
    },
    subRecall(state, index){
        state.subQueue[index].recall = true
        Object.keys(state.patient).forEach(key => {
            if((state.patient[key].medicineDetails.qNumber) == (state.subQueue[index].qNumber)){
                state.patient[key].medicineDetails.recall = true
            }
        })
    },
    updateNewQList(state, payload){
        Object.keys(state.patient).forEach(key =>{
            if((state.patient[key].queueDetails.queueNo)==(state.mainQueue[payload].element.qNumber)){
                state.patient[key].queueDetails.position = ""
                state.patient[key].queueDetails.getQnum=false
                state.patient[key].queueDetails.service=""
                state.patient[key].queueDetails.roomNo=""
                state.patient[key].queueDetails.queueNo=""
                state.patient[key].queueDetails.called=false
                state.patient[key].queueDetails.recall=false
                state.patient[key].queueDetails.cancel=false
                state.patient[key].ewallet.payment=false
                state.patient[key].userInfo.user_type = state.patient[key].userInfo.fixed_type
            }
        })
        Vue.delete(state.mainQueue, payload)
    },
    appCancel(state, payload){
        Object.keys(state.patient).forEach(key=>{
            if((state.patient[key].queueDetails.queueNo)==(state.mainQueue[payload].element.qNumber)){
                state.patient[key].queueDetails.cancel=false
                state.patient[key].queueDetails.queueNo=""
            }
        })
        Vue.delete(state.mainQueue, payload)
    },
    updateNewSubQList(state, payload){
        Object.keys(state.patient).forEach(key =>{
            if((state.patient[key].medicineDetails.queueNo)==(state.subQueue[payload].qNumber)){
                state.patient[key].medicineDetails.position = ""
                state.patient[key].medicineDetails.getQnum=false
                state.patient[key].medicineDetails.scanned=false
                state.patient[key].medicineDetails.counterNo=""
                state.patient[key].medicineDetails.qNumber=""
                state.patient[key].medicineDetails.called=false
                state.patient[key].medicineDetails.recall=false
            }
        })
        Vue.delete(state.subQueue, payload)
     },
    //  chgPatientType(state,payload){
    //     state.patient[payload].userInfo.user_type = "Appointment"
    //  }
}
const actions = {
    // chgAppointment({dispatch, commit},payload){
    //     firebaseDb.ref('patient/'+ payload).child('userInfo').update({
    //         user_type: 'Appointment'
    //     })
    //     commit("chgPatientType",  payload)
    // },
    // firebaseUpdatePosition({}, payload){
    //     if(payload.id){
    //         firebaseDb.ref('patient/' + payload.id).child('queueDetails').update(payload.updates)}
    // },
    enqueue({dispatch},payload){
        firebaseDb.ref("Medical/").set({
            mainQueue: payload
        })
        dispatch('firebaseGetQueue')
        dispatch('getPatient')
    },
    setPatientPosition({dispatch}){
        firebaseDb.ref('Medical/mainQueue/').on('child_added', snapshot=> {
            Object.keys(state.patient).forEach(key1 =>{
                if(state.patient[key1]){
                    Object.keys(state.mainQueue).forEach(key2 => {
                        if((state.mainQueue[key2].element.qNumber)==(state.patient[key1].queueDetails.queueNo)){
                            dispatch('firebaseUpdatePosition',{
                                id: key1,
                                updates: {
                                    position: key2
                                }
                            })
                        }
                    })
                }
            })
        })
    },
    firebaseUpdatePosition({}, payload){
            if(payload.id){
                firebaseDb.ref('patient/' + payload.id).child('queueDetails').update(payload.updates)}
    },
    getPatient({state,commit,dispatch}){
        firebaseDb.ref('patient/').on('child_added', snapshot=>{
            let patient = snapshot.val()
            let patientId = snapshot.key
            commit("setPatientList", {
             patientId,
             patient
            })
        })

        firebaseDb.ref('patient/').on('child_changed', snapshot=>{
            let patient = snapshot.val()
            let patientId = snapshot.key
            commit("updatePatientList", {
             patientId,
             patient
            })
        })
        dispatch('setPatientPosition')
        dispatch('setSubPatientPosition')
    },
    qRoom({commit, dispatch}, payload){
        let patientId = payload.id
        let qNo = payload.qNo
        let room = payload.room
        let pos  = payload.position

        dispatch('firebaseUpdateQnumRoom',{
            id: patientId,
             updates: {
                 queueNo:  qNo,
                 roomNo:  room,
                 position: pos
             }
         })
        commit("updateQnumRoom", {
             qNo, 
             room, 
             pos,
             patientId
        })
    },
    firebaseUpdateQnumRoom({}, payload){
        if(payload.id){
            firebaseDb.ref('patient/' + payload.id).child('queueDetails').update(payload.updates)
        }
    },
    getQnumber({commit,dispatch},payload){
        dispatch('gotQnum',{
           id: payload,
            updates: {
                getQnum: true
            }
        })
        commit("changeQnumValue", payload);
     },
     gotQnum({},payload){
        if(payload.id){
            firebaseDb.ref('patient/' + payload.id).child('queueDetails').update(payload.updates)
        }
     },
    
    called({commit,dispatch, state},payload){
        firebaseDb.ref('Medical/mainQueue').once("value", snapshot=>{
            Object.keys((snapshot.val())).forEach(key =>{
                if(state.mainQueue[payload].element.qNumber == (snapshot.val())[key].element.qNumber){
                    dispatch('calledOnce',{
                        id: key,
                         updates: {
                             called: true
                         }
                     })
                }
            })
        })
       commit("changeCallValue", payload);
       Object.keys(state.patient).forEach(key => {
        if((state.patient[key].queueDetails.queueNo) == (state.mainQueue[payload].element.qNumber)){
            dispatch('calledOnceApp', {
                id:key,
                updates:{
                    called: true
                }
            })
        }
        });
       alert(state.mainQueue[payload].element.qNumber + " is called.")
    },
    calledOnceApp({}, payload){
        firebaseDb.ref('patient/' + payload.id).child('queueDetails').update(payload.updates)
    },
    recall({commit,dispatch, state},payload){
        firebaseDb.ref('Medical/mainQueue').once("value", snapshot=>{
            Object.keys((snapshot.val())).forEach(key =>{
                if(state.mainQueue[payload].element.qNumber == (snapshot.val())[key].element.qNumber){
                    dispatch('recalled',{
                        id: key,
                         updates: {
                             recall: true
                         }
                     })
                }
            })
        })
        commit("changeRecallValue", payload);
        Object.keys(state.patient).forEach(key => {
            if((state.patient[key].queueDetails.queueNo) == (state.mainQueue[payload].element.qNumber)){
                dispatch('recalledApp', {
                    id:key,
                    updates:{
                        recall: true
                    }
                })
            }
            });
        alert(state.mainQueue[payload].element.qNumber + " is recalled.")
    },
    recalledApp({}, payload){
        firebaseDb.ref('patient/' + payload.id).child('queueDetails').update(payload.updates)
    },
    calledOnce({}, payload){
        firebaseDb.ref('Medical/mainQueue/'+ payload.id +'/element').update(payload.updates)
    },
    recalled({}, payload){
        firebaseDb.ref('Medical/mainQueue/'+ payload.id +'/element').update(payload.updates)
    },
    checkCancel({commit,dispatch}, payload){
        Object.keys(state.mainQueue).forEach(key1=>{
            Object.keys(state.patient).forEach(key2=>{
                if((state.patient[key2].queueDetails.cancel == true) && 
                (payload == state.mainQueue[key1].element.qNumber)){
                    //delete in firebase
                    firebaseDb.ref('Medical/mainQueue').once("value", snapshot=>{
                        Object.keys((snapshot.val())).forEach(key =>{
                            if(payload == (snapshot.val())[key].element.qNumber){
                                firebaseDb.ref('Medical/mainQueue/'+ key).remove()
                                alert(payload + " has cancelled the queue and removed from the list.")
                            }
                        })
                    })
                    //delete in state
                    commit('appCancel', key1)
                    dispatch('cancelDefault',{
                        id: key2,
                        updates: {
                            cancel: false,
                            queueNo:""
                        }
                    })
                }
            })
        })
    },
    cancelDefault({},payload){
        if(payload.id){
            firebaseDb.ref('patient/' + payload.id).child('queueDetails').update(payload.updates)}
    },
    served({commit, state, dispatch}, payload){
        alert(state.mainQueue[payload].element.qNumber + " is served and removed from the queue.")
     
            Object.keys(state.patient).forEach(key1 =>{
                if((state.patient[key1].queueDetails.queueNo)==(state.mainQueue[payload].element.qNumber)){
                    dispatch('clearPatientPosition',{
                        id: key1,
                        updates: {
                            position: "",
                            getQnum:false,
                            service:"",
                            roomNo:"",
                            queueNo:"",
                            called:false,
                            recall:false
                        }
                    })
                    dispatch('patientType',{
                        id: key1,
                        updates: {
                            user_type: state.patient[key1].userInfo.fixed_type
                        }
                    })
                    dispatch('clearPayment', {
                        id: key1,
                        updates:{
                            payment: false
                        }
                    })
                }
            })
            firebaseDb.ref('Medical/mainQueue').once("value", snapshot=>{
                Object.keys((snapshot.val())).forEach(key =>{
                    if(state.mainQueue[payload].element.qNumber == (snapshot.val())[key].element.qNumber){
                        firebaseDb.ref('Medical/mainQueue/'+ key).remove()
                    }
                })
            })
            
            
            Object.keys(state.patient).forEach(key1 =>{
                if(state.patient[key1]){
                    Object.keys(state.mainQueue).forEach(key2 => {
                        if((state.mainQueue[key2].element.qNumber)==(state.patient[key1].queueDetails.queueNo)){
                            dispatch('firebaseUpdatePosition',{
                                id: key1,
                                updates: {
                                    position: key2
                                }
                            })
                        }
                    })
                }
            })
            commit('updateNewQList', payload)
    },
    patientType({}, payload){
        if(payload.id){
            firebaseDb.ref('patient/' + payload.id).child('userInfo').update(payload.updates)}
    },
    clearPayment({},payload){
        if(payload.id){
            firebaseDb.ref('patient/' + payload.id).child('ewallet').update(payload.updates)}
    },
    clearPatientPosition({},payload){
        if(payload.id){
            firebaseDb.ref('patient/' + payload.id).child('queueDetails').update(payload.updates)}
    },
    firebaseGetQueue({commit}){
        firebaseDb.ref('Medical/mainQueue').on('child_added', snapshot=>{
            let mainQueue = snapshot.val()
            let mainId = snapshot.key
            commit("setMainQueue", {
             mainId,
             mainQueue
            })
          })
    },

    //----------------------------------------------------------------------------------------
    subQline({dispatch,commit}, payload){
        firebaseDb.ref("Pharmacy/").set({
            subQueue : payload
        })
        dispatch('firebaseGetSubQueue')   
        dispatch('getPatient') 
    },
    setSubPatientPosition({dispatch}){
        firebaseDb.ref('Pharmacy/subQueue/').on('child_added', snapshot=> {
            Object.keys(state.patient).forEach(key1 =>{
                if(state.patient[key1]){
                    Object.keys(state.subQueue).forEach(key2 => {
                        if((state.subQueue[key2].qNumber)==(state.patient[key1].medicineDetails.qNumber)){
                            dispatch('subUpdatePosition',{
                                id: key1,
                                updates: {
                                    position: key2
                                }
                            })
                        }
                    })
                }
            })
        })
    },
    subUpdatePosition({}, payload){
        if(payload.id){
            firebaseDb.ref('patient/' + payload.id).child('medicineDetails').update(payload.updates)}
    },
    subCalling({commit,dispatch},payload){
      
        firebaseDb.ref('Pharmacy/subQueue/').once("value", snapshot=>{
            Object.keys((snapshot.val())).forEach(key =>{
                if(state.subQueue[payload].qNumber == (snapshot.val())[key].qNumber){
                    dispatch('subQcalled',{
                        id: key,
                         updates: {
                             called: true
                         }
                     })
                }
            })
        })
       Object.keys(state.patient).forEach(key => {
        if((state.patient[key].medicineDetails.qNumber) == (state.subQueue[payload].qNumber)){
            dispatch('medCalledOnceApp', {
                id:key,
                updates:{
                    called: true
                }
            })
        }
        });
       commit("subCall", payload);
       alert(state.subQueue[payload].qNumber + " is called.")
    },
    medCalledOnceApp({}, payload){
        firebaseDb.ref('patient/' + payload.id).child('medicineDetails').update(payload.updates)
    },
    subRecalling({commit,dispatch},payload){
        firebaseDb.ref('Pharmacy/subQueue/').once("value", snapshot=>{
            Object.keys((snapshot.val())).forEach(key =>{
                if(state.subQueue[payload].qNumber == (snapshot.val())[key].qNumber){
                    dispatch('subQRecalled',{
                        id: key,
                         updates: {
                             recall: true
                         }
                     })
                }
            })
        })
        Object.keys(state.patient).forEach(key => {
            if((state.patient[key].medicineDetails.qNumber) == (state.subQueue[payload].qNumber)){
                dispatch('medRecalledApp', {
                    id:key,
                    updates:{
                        recall: true
                    }
                })
            }
            });
        commit("subRecall", payload);
        alert(state.subQueue[payload].qNumber + " is recalled.")
    },
    medRecalledApp({}, payload){
        firebaseDb.ref('patient/' + payload.id).child('medicineDetails').update(payload.updates)
    },
    subQcalled({}, payload){
        firebaseDb.ref('Pharmacy/subQueue/'+ payload.id).update(payload.updates)
    },
    subQRecalled({}, payload){
        firebaseDb.ref('Pharmacy/subQueue/'+ payload.id).update(payload.updates)
    },
    firebaseGetSubQueue({commit}){
        firebaseDb.ref('Pharmacy/subQueue').on('child_added', snapshot=>{
            let subQueue = snapshot.val()
            let subId = snapshot.key
            commit("setSubQueue", {
             subId,
             subQueue
            })
          })
    },
    subServed({commit,state, dispatch}, payload){
        alert(state.subQueue[payload].qNumber + " is served and removed from the queue.")
        Object.keys(state.patient).forEach(key1 =>{
            if((state.patient[key1].medicineDetails.qNumber)==(state.subQueue[payload].qNumber)){
                dispatch('clearSubPatientPosition',{
                    id: key1,
                    updates: {
                        position: "",
                        getQnum:false,
                        counterNo:"",
                        qNumber:"",
                        called:false,
                        recall:false,
                        scanned:false
                    }
                })
            }
        })
        firebaseDb.ref('Pharmacy/subQueue/').once("value", snapshot=>{
            Object.keys((snapshot.val())).forEach(key =>{
                if(state.subQueue[payload].qNumber == (snapshot.val())[key].qNumber){
                    firebaseDb.ref('Pharmacy/subQueue/'+ key).remove()
                }
            })
        })
        commit('updateNewSubQList', payload)
        firebaseDb.ref('Pharmacy/subQueue/'+ payload).remove()
        Object.keys(state.patient).forEach(key1 =>{
            if(state.patient[key1]){
                Object.keys(state.subQueue).forEach(key2 => {
                    if((state.subQueue[key2].qNumber)==(state.patient[key1].medicineDetails.qNumber)){
                        dispatch('subUpdatePosition',{
                            id: key1,
                            updates: {
                                position: key2
                            }
                        })
                    }
                })
            }
        })
    },
    clearSubPatientPosition({}, payload){
        if(payload.id){
            firebaseDb.ref('patient/' + payload.id).child('medicineDetails').update(payload.updates)}
    },
    medQnumber({commit,dispatch},payload){
        dispatch('medGotQnum',{
           id: payload,
            updates: {
                getQnum: true
            }
        })
        commit("changeMedQnumValue", payload);
     },
     medGotQnum({},payload){
        if(payload.id){
            firebaseDb.ref('patient/' + payload.id).child('medicineDetails').update(payload.updates)
        }
     },
     qCounter({commit, dispatch}, payload){
        let patientId = payload.id
        let qNo = payload.qNo
        let counter = payload.counter
        let pos  = payload.position
        dispatch('firebaseUpdateQnumCounter',{
            id: patientId,
             updates: {
                 qNumber:  qNo,
                 counterNo:  counter,
                 position: pos
             }
         })
        commit("updateQnumCounter", {
             qNo, 
             counter, 
             pos,
             patientId
        })
    },
    firebaseUpdateQnumCounter({}, payload){
        if(payload.id){
            firebaseDb.ref('patient/' + payload.id).child('medicineDetails').update(payload.updates)
        }
    },
}
const getters = {
    mainQ: state => {
        return state.mainQueue
    },
    subQ: state => {
        return state.subQueue
    },
    patientList: state=> {
        return state.patient
    },
    patient: state => {
        let patientFiltered = {}
        Object.keys(state.patient).forEach(key => {
            if((state.patient[key].queueDetails.service !== "" ) && !(state.patient[key].queueDetails.getQnum)){
                patientFiltered[key] = state.patient[key]
            }
        })
        return patientFiltered
    },
    medPatient: state => {
        let patientFiltered = {}
        Object.keys(state.patient).forEach(key => {
            if((state.patient[key].medicineDetails.scanned) && !(state.patient[key].medicineDetails.getQnum)){
                patientFiltered[key] = state.patient[key]
            }
        })
        return patientFiltered
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}