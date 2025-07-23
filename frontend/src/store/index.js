import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async getUsers(){
      let data = await axios.get('http://localhost:9090/users')
      console.log(data)
    }
  },
  modules: {
  }
})
