import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    users:null,
    deducts : null

  },

  getters: {
    getDeduction(state){
      return state.deducts
    }

  },

  mutations: {
    setUsers(state,payload){
      state.users = payload 
    },
    setDeduct(state,payload){
      state.deducts = payload 
    }

  },

  actions: {
    async getUsers({commit}){
      let data = await axios.get('http://localhost:9090/users')
      console.log(data.data.users)
      
      commit('setUsers',data.data.users)
    },

    async fetchDeduction({commit},EmpID){
      let res = await axios.get(`http://localhost:9090/users/deduct/${EmpID}`)
      console.log(res.data.deduction)


      commit('setDeduct',res.data.deducts)
    }

  },

  modules: {

  }
})
