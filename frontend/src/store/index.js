import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    users: null,
    salaries : null,
    deducts: null,
    rate: null,
    PAYE: null,
    UIF : null,
    HealthInsure : null,
    TakeHome : null,
    reviews: null

  },

  getters: {
    getDeduction(state) {
      console.log(`Getter Value: ${JSON.stringify(state)}`)
      return state.deducts
    },

    getRateHr(state) {
      return state.rate
    },

    getPAYE(state) {
      return state.PAYE

    },

    getUIF(state) {
      return state.UIF

    },

    getHealthInsure(state) {
      return state.HealthInsure

    },

    getTakeHome(state) {
      return state.TakeHome

    },

  },

  mutations: {
    setUsers(state, payload) {
      state.users = payload

    },

    setSalaries(state, payload) {
      state.salaries = payload

    },

    setReviews(state, payload) {
      state.reviews = payload

    },

    setDeduct(state, payload) {
      state.deducts = payload

    },

    setRateHr(state, payload) {
      state.rate = payload

    },

    setPAYE(state, payload) {
      state.PAYE = payload

    },

    setUIF(state, payload) {
      state.UIF = payload

    },

    setHealthInsure(state, payload) {
      state.HealthInsure = payload

    },

    setTakeHome(state, payload) {
      state.TakeHome = payload

    },
    
  },

  actions: {

    async getUsers({ commit }) {
      let data = await axios.get('http://localhost:9090/users')
      console.log(data.data.users)

      commit('setUsers', data.data.users)
    },

    async getSalaries({ commit }) {
      let data = await axios.get('http://localhost:9090/salaries')
      console.log(data.data.salaries)

      commit('setSalaries', data.data.salaries)
    },

    async getReviews({ commit }) {
      let data = await axios.get('http://localhost:9090/reviews')
      console.log(data.data)


      commit('setReviews', data.data.reviews)
    },

    async fetchDeduction({ commit }, EmpID) {
      let res = await axios.get(`http://localhost:9090/users/deduct/${EmpID}`)
      console.log(`deduct store action${res.data.deduction}`)


      commit('setDeduct', res.data.deduction)
    },

    async fetchRateHr({ commit }, EmpId) {
      let res = await axios.get(`http://localhost:9090/users/hrrate/${EmpId}`)
      console.log(`Rate store action:${res.data.rateHr}`)

      commit('setRateHr', res.data.rateHr)
    },

    async fetchPAYE({ commit }, EmpID) {
      let res = await axios.get(`http://localhost:9090/users/PAYE/${EmpID}`)
      console.log(`PAYE store action:${res.data.PAYE}`)

      commit('setPAYE', res.data.PAYE)

    },

    async fetchUIF({ commit }, EmpID) {
      let res = await axios.get(`http://localhost:9090/users/UIF/${EmpID}`)
      console.log(`UIF store action:${res.data.UIF}`)

      commit('setUIF', res.data.UIF)

    },

    async fetchHealthInsure({ commit }, EmpID) {
      let res = await axios.get(`http://localhost:9090/users/HealthInsure/${EmpID}`)
      console.log(`HealthInsure store action:${res.data.HealthInsure}`)

      commit('setHealthInsure', res.data.HealthInsure)

    },

    async fetchTakeHome({ commit }, EmpID) {
      let res = await axios.get(`http://localhost:9090/users/TakeHome/${EmpID}`)
      console.log(`TakeHome store action:${res.data.TakeHome}`)

      commit('setTakeHome', res.data.TakeHome)

    },

  },

  modules: {

  }
})
