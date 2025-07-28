import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    users: null,
    salaries: null,
    deducts: null,
    rate: null,
    PAYE: null,
    UIF: null,
    HealthInsure: null,
    TakeHome: null,
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
      try {
        let data = await axios.get('http://localhost:9090/users/load')
        console.log(data.data.users)
        
        commit('setUsers', data.data.users)
        
      } catch (error) {
        console.error('Failed to fetch users:', error)
        alert('Error loading users. Please try again later.')
        
      }
      
    },

    async getSalaries({ commit }) {
      try {
        let data = await axios.get('http://localhost:9090/salaries')
        console.log(data.data.salaries)

        commit('setSalaries', data.data.salaries)

      } catch (error) {
        console.error('Failed to fetch salaries:', error)
        alert('Error loading salaries. Please try again later.')

      }

    },

    async getReviews({ commit }) {
      try {
        let data = await axios.get('http://localhost:9090/reviews')
        console.log(data.data)

        commit('setReviews', data.data.reviews)

      } catch (error) {
        console.error('Failed to fetch reviews:', error)
        alert('Error loading reviews. Please try again later.')

      }

    },

    async fetchDeduction({ commit }, EmpID) {
      try {
        let res = await axios.get(`http://localhost:9090/users/deduct/${EmpID}`)
        console.log(`deduct store action${res.data.deduction}`)

        commit('setDeduct', res.data.deduction)

      } catch (error) {
        console.error('Failed to fetch deduction:', error)
        alert('Error fetching deduction data.')

      }

    },

    async fetchRateHr({ commit }, EmpId) {
      try {
        let res = await axios.get(`http://localhost:9090/users/hrrate/${EmpId}`)
        console.log(`Rate store action:${res.data.rateHr}`)

        commit('setRateHr', res.data.rateHr)

      } catch (error) {
        console.error('Failed to fetch hourly rate:', error)
        alert('Error fetching hourly rate data.')

      }

    },

    async fetchPAYE({ commit }, EmpID) {
      try {
        let res = await axios.get(`http://localhost:9090/users/PAYE/${EmpID}`)
        console.log(`PAYE store action:${res.data.PAYE}`)

        commit('setPAYE', res.data.PAYE)

      } catch (error) {
        console.error('Failed to fetch PAYE:', error)
        alert('Error fetching PAYE data.')

      }

    },

    async fetchUIF({ commit }, EmpID) {
      try {
        let res = await axios.get(`http://localhost:9090/users/UIF/${EmpID}`)
        console.log(`UIF store action:${res.data.UIF}`)

        commit('setUIF', res.data.UIF)

      } catch (error) {
        console.error('Failed to fetch UIF:', error)
        alert('Error fetching UIF data.')

      }

    },

    async fetchHealthInsure({ commit }, EmpID) {
      try {
        let res = await axios.get(`http://localhost:9090/users/HealthInsure/${EmpID}`)
        console.log(`HealthInsure store action:${res.data.HealthInsure}`)

        commit('setHealthInsure', res.data.HealthInsure)
        
      } catch (error) {
        console.error('Failed to fetch Health Insurance:', error)
        alert('Error fetching Health Insurance data.')

      }

    },

    async fetchTakeHome({ commit }, EmpID) {
      try {
        let res = await axios.get(`http://localhost:9090/users/TakeHome/${EmpID}`)
        console.log(`TakeHome store action:${res.data.TakeHome}`)

        commit('setTakeHome', res.data.TakeHome)

      } catch (error) {
        console.error('Failed to fetch Take Home:', error)
        alert('Error fetching Take Home data.')

      }

    },

  },

  modules: {

  }
})
