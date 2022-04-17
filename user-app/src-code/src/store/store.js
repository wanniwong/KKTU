import { firebaseAuth,firebaseDb } from 'boot/firebase'
import Vue from 'Vue'


const state = { 
    userDetails: {},
    users: {},
}

const mutations = {
    setUserDetails(state, payload){
        state.userDetails = payload
    },
    addUser(state, payload){
        Vue.set(state.users, payload.userId, payload.userDetails)
    },
    updateUserQueueInfo(state, payload){
        Object.assign(state.users[payload.patientId], payload.patient)
    },
    updateService(state,payload){
        Object.assign(state.users[payload.userId],payload.updates)
    },
    updateQueue(state,payload){
        Object.assign(state.users[payload.userId],payload.updates)
    },
    updateEwallet(state,payload){
        Object.assign(state.users[payload.userId],payload.updates)
    },
    updateType(state,payload){
        state.userDetails.user_type =  state.userDetails.fixed_type
    },
    updateRemain(state, payload){
        state.userDetails.ewallet.remain = payload        
    },
    updateMedicine(state, payload){
        Object.assign(state.users[payload.userId],payload.updates)
    },    
    deductRemain(state, payload){
        state.userDetails.ewallet.remain = payload        
    },
    exactTopUp(state, payload){
        state.userDetails.ewallet.remain = payload        
    },
    chgPatientType(state,payload){
        state.userDetails.user_type = "Appointment"
     }
}

const actions = {
    chgAppointment({state,dispatch, commit},payload){
        firebaseDb.ref('patient/'+ payload).child('userInfo').update({
            user_type: 'Appointment'
        })
        commit("chgPatientType",  payload)
    },
    registerUser({},payload){
        console.log('register me')
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log(response)
            let userId = firebaseAuth.currentUser.uid
            firebaseDb.ref('patient/'+ userId).child('userInfo').set({
                name:payload.name,
                ic: payload.ic,
                age: payload.age,
                nationality: payload.nationality,
                gender: payload.gender,
                occupation: payload.occupation,
                address: payload.address,
                phone_no: payload.phoneNo,
                user_type: payload.user_type,
                email: payload.email,
                password: payload.password,
                race: payload.race,
                userId: userId,
                fixed_type: payload.user_type
            })
            firebaseDb.ref('patient/'+userId).child('ewallet').set({
                payment: false,
                remain:0.00,
                topup:0.00,
                deduct:1.00,
            })    
            firebaseDb.ref('patient/'+userId).child('queueDetails').set({
                queueNo: "",
                roomNo: "",
                getQnum: false,
                service: "",
                called: false,
                recall: false,
                position: "",
                drName: "",
                cancel:false
            })            
            firebaseDb.ref('patient/'+userId).child('medicineDetails').set({
                counterNo: "",
                icNo: payload.ic,
                qNumber: "",
                getQnum: false,
                called: false,
                recall: false,
                scanned: false,
                position: ""
            })        
        })
        .then(response => {
            console.log(response)
            this.$router.push('/home')
        })
        .catch(error => {
            console.log(error.message)
        })
    },
    loginUser({}, payload){
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log(response)
            this.$router.push('/home')
        })
        .catch(error => {
            alert('Incorrect Email / Password',error.mesasage);
            console.log(error.message)
        })
    },
    logoutUser(){
        firebaseAuth.signOut()
        console.log('logout')
    },
    handleAuthStateChanged({commit, dispatch, state}) {
        firebaseAuth.onAuthStateChanged( user => {
            if (user) {
              // User is signed in.
              let userId = firebaseAuth.currentUser.uid
              firebaseDb.ref('patient/'+ userId).once('value',
              snapshot => {
                  let userDetails = snapshot.val()
                  commit('setUserDetails',{
                      name: userDetails.userInfo.name,
                      ic: userDetails.userInfo.ic,
                      age: userDetails.userInfo.age,
                      nationality: userDetails.userInfo.nationality,
                      gender: userDetails.userInfo.gender,
                      occupation: userDetails.userInfo.occupation,
                      address: userDetails.userInfo.address,
                      phone_no: userDetails.userInfo.phone_no,
                      user_type: userDetails.userInfo.user_type,
                      fixed_type: userDetails.userInfo.fixed_type,
                      email: userDetails.userInfo.email,
                      userId: userId,
                      race: userDetails.userInfo.race,
                      getQueue: userDetails.userInfo.getQueue,
                      ewallet: userDetails.ewallet,
                      payment: userDetails.ewallet.paymentStatus,
                      remain: userDetails.ewallet.remain,
                      topup: userDetails.ewallet.topup,
                      deduct: userDetails.ewallet.deduct,
                      queueDetails: userDetails.queueDetails,
                      queueNo: userDetails.queueDetails.queueNo,
                      roomNo: userDetails.queueDetails.roomNo,
                      getQnum: userDetails.queueDetails.getQueue,
                      service: userDetails.queueDetails.service,
                      called: userDetails.queueDetails.called,
                      recall: userDetails.queueDetails.recall,
                      position: userDetails.queueDetails.position,
                      drName: userDetails.queueDetails.drName,
                      counterNo: userDetails.medicineDetails.counterNo,
                      icNo: userDetails.medicineDetails.ic,
                      qNumber: userDetails.medicineDetails.qNumber,
                      getQnum: userDetails.medicineDetails.getQueue,
                      called: userDetails.medicineDetails.called,
                      recall: userDetails.medicineDetails.recall,
                      scanned: userDetails.medicineDetails.scanned,
                      position: userDetails.medicineDetails.position

                  })
              })

              dispatch('firebaseUpdateUser',{
                userId: userId,
                updates: {
                    online: true
                }  
            })    
              dispatch('firebaseGetUsers')
            //   this.$router.push('/home')
            }
            else {
                //User is logged out.
                dispatch('firebaseUpdateUser',{
                    userId: state.userDetails.userId,
                    updates: {
                        online: false,
                    }  
                })
                        
                commit('setUserDetails',{})                          
                this.$router.replace('/')
            }
          })
    },
    firebaseUpdateUser({},payload) {
        if(payload.userId){
        firebaseDb.ref('patient/'+ payload.userId).update(payload.updates)
        }
    },
    firebaseGetUsers({commit, state}, payload){
        firebaseDb.ref('patient').on ('child_added',snapshot => {
            let userDetails = snapshot.val()
            let userId = snapshot.key
            commit('addUser', {
                userId,
                userDetails
            })
        })
        firebaseDb.ref('patient/').on('child_changed', snapshot=>{
            let patient = snapshot.val()
            let patientId = snapshot.key
            commit("updateUserQueueInfo", {
             patientId,
             patient
            })
        })
        firebaseDb.ref('patient/' + firebaseAuth.currentUser.uid).child('queueDetails').on('child_changed', snapshot=>{
            window.location.reload()
        })
        firebaseDb.ref('patient/' + firebaseAuth.currentUser.uid).child('medicineDetails').on('child_changed', snapshot=>{
            window.location.reload()
        })
    },
    updateService({ commit },payload){
        let userId = firebaseAuth.currentUser.uid
        payload.userId = userId
        commit('updateService', payload)
        firebaseDb.ref('patient/'+ payload.userId).child('queueDetails').update(payload.updates)   
    },
    updateQueue({ commit },payload){
        let userId = firebaseAuth.currentUser.uid
        payload.userId = userId
        commit('updateQueue', payload)
        firebaseDb.ref('patient/'+ payload.userId).child('queueDetails').update(payload.updates)      
    },
    updateEwallet({ commit },payload){
        let userId = firebaseAuth.currentUser.uid
        payload.userId = userId
        commit('updateEwallet', payload)
        firebaseDb.ref('patient/'+ payload.userId).child('ewallet').update(payload.updates)
        console.log('ewallet')
    },
    updateType({ commit },payload){
        let userId = firebaseAuth.currentUser.uid
        // payload.userId = userId
        commit('updateType', payload)
        firebaseDb.ref('patient/'+ firebaseAuth.currentUser.uid).child('userInfo').update(payload.updates)
    },
    updateRemain({state,commit,dispatch}){
        var total = 0
        
        Object.keys(state.users).forEach(key => {
            if(key == state.userDetails.userId){
                total += ((state.users[key].ewallet.remain)+(state.users[key].ewallet.topup))
                commit('updateRemain',total) 
                // state.users[key].ewallet.remain = total
                // console.log('remain',state.users[key].ewallet.remain)
                let userId = firebaseAuth.currentUser.uid 
                dispatch('updateEwallet',{
                    userId: userId,
                    updates: {
                        remain: total
                    }     
                }   
                )
            }
        })
    },
    deductRemain({state,commit,dispatch}){
        var total = 0
        
        Object.keys(state.users).forEach(key => {
            if(key == state.userDetails.userId){
                total += ((state.users[key].ewallet.remain)-(state.users[key].ewallet.deduct))
                commit('deductRemain',total) 
                // state.users[key].ewallet.remain = total
                // console.log('remain',state.users[key].ewallet.remain)
                let userId = firebaseAuth.currentUser.uid 
                dispatch('updateEwallet',{
                    userId: userId,
                    updates: {
                        remain: total
                    }     
                }   
                )
            } 
        })
    },
    exactTopUp({state,commit,dispatch}){
        var total = 0
        
        Object.keys(state.users).forEach(key => {
            if(key == state.userDetails.userId){
                total += ((state.users[key].ewallet.remain)-(state.users[key].ewallet.deduct)
                +(state.users[key].ewallet.deduct))
                commit('deductRemain',total) 
                let userId = firebaseAuth.currentUser.uid 
                dispatch('updateEwallet',{
                    userId: userId,
                    updates: {
                        remain: total
                    }     
                }   
                )
            } 
        })
    }
    ,
    updateMedicine({ commit },payload){
        let userId = firebaseAuth.currentUser.uid
        payload.userId = userId
        commit('updateMedicine', payload)
        firebaseDb.ref('patient/'+ payload.userId).child('medicineDetails').update(payload.updates)
    
    }, 
}

const getters = {
    users: state => {
        let usersFiltered = {}
        Object.keys(state.users).forEach(key => {
            if(key == state.userDetails.userId){
                usersFiltered[key]=state.users[key]
            }    
        })
        return usersFiltered
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}