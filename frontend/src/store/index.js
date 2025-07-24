import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    users:null,
    deducts : null,
    rate : null

  },

  getters: {
    getDeduction(state){
      console.log(`Getter Value: ${JSON.stringify(state)}`)
      return state.deducts
    },

    getRateHr(state){
      return state.rate
    }

  },

  mutations: {
    setUsers(state,payload){
      state.users = payload 
    },
    setDeduct(state,payload){
      state.deducts = payload 
    },
    setRateHr(state,payload){
      state.rate = payload 
    },

  },

  actions: {
    async getUsers({commit}){
      let data = await axios.get('http://localhost:9090/users')
      console.log(data.data.users)
      
      commit('setUsers',data.data.users)
    },

    async fetchDeduction({commit},EmpID){
      let res = await axios.get(`http://localhost:9090/users/deduct/${EmpID}`)
      console.log(`deduct store action${res.data.deduction}`)


      commit('setDeduct',res.data.deduction)
    },

    async fetchRateHr({commit},EmpId){
      let res = await axios.get(`http://localhost:9090/users/hrrate/${EmpId}`)
      console.log(res.data.rateHr)

      commit('setRateHr',res.data.rateHr)
    }

  },

  modules: {

  }
})
