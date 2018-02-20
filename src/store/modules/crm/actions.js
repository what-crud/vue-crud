import Vue from 'vue'
import router from '@/router'

const prefix = 'crm/'

let actions = {
    // company
    getCompany({commit}, [id]) {
      Vue.http.get(prefix + 'companies/' + id)
        .then((response) => commit('company', response.body))
    },
    updateCompany({commit, dispatch, state}, [id, params, successText]) {
      Vue.http.put(prefix + 'companies/' + id, params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getCompany', [state.company.id])
        })
    },
    // company comments
    storeCompanyComment({commit, dispatch, state}, [params, successText]) {
      Vue.http.post(prefix + 'company-comments', params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getCompany', [state.company.id])
        })
    },
    suspendCompanyComment({commit, dispatch, state}, [id, successText]) {
      Vue.http.put(prefix + 'company-comments/' + id, {active: 0})
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getCompany', [state.company.id])
        })
    },
    // company positions
    updateCompanyPosition({commit, dispatch, state}, [id, params, successText]) {
      Vue.http.put(prefix + 'positions/' + id, params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getCompany', [state.company.id])
        })
    },
    storeCompanyPosition({commit, dispatch, state}, [params, successText]) {
      Vue.http.post(prefix + 'positions', params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getCompany', [state.company.id])
        })
    },
    // person
    getPerson({commit}, [id]) {
      Vue.http.get(prefix + 'people/' + id)
        .then((response) => commit('person', response.body))
    },
    updatePerson({commit, dispatch, state}, [id, params, successText]) {
      Vue.http.put(prefix + 'people/' + id, params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getPerson', [state.person.id])
        })
    },
    // person comments
    storePersonComment({commit, dispatch, state}, [params, successText]) {
      Vue.http.post(prefix + 'person-comments', params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getPerson', [state.person.id])
        })
    },
    suspendPersonComment({commit, dispatch, state}, [id, successText]) {
      Vue.http.put(prefix + 'person-comments/' + id, {active: 0})
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getPerson', [state.person.id])
        })
    },
    // person positions
    updatePersonPosition({commit, dispatch, state}, [id, params, successText]) {
      Vue.http.put(prefix + 'positions/' + id, params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getPerson', [state.person.id])
        })
    },
    storePersonPosition({commit, dispatch, state}, [params, successText]) {
      Vue.http.post(prefix + 'positions', params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getPerson', [state.person.id])
        })
    },
    // position
    getPosition({commit, state}, [id]) {
      Vue.http.get(prefix + 'positions/' + id)
        .then((response) => commit('setPosition', response.body))
    },
    // position tasks
    getPositionTasks({commit, state}, [positionId]) {
      Vue.http.get(prefix + 'positions/' + positionId + '/tasks')
        .then((response) => commit('setPositionTasks', [response.body, positionId]))
    },
    addPositionTask({commit, dispatch, state}, [positionId, params, successText]) {
      Vue.http.post(prefix + 'position-tasks', params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getPositionTasks', [positionId])
        })
    },
    removePositionTask({commit, dispatch, state}, [positionTaskId, positionId, successText]) {
      Vue.http.delete(prefix + 'position-tasks/' + positionTaskId)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getPositionTasks', [positionId])
        })
    },
    addManyPositionTasks({commit, dispatch, state}, [params, successText, errorText]) {
      Vue.http.post(prefix + 'position-tasks/multiple-add', params)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getPositionTasks', [state.tasks.positionId])
        })
    },
    removeManyPositionTasks({commit, dispatch, state}, [ids, successText, errorText]) {
      Vue.http.post(prefix + 'position-tasks/multiple-delete', ids)
        .then((response) => {
          commit('alertSuccess', successText, { root: true })
          dispatch('getPositionTasks', [state.tasks.positionId])
        })
    },
  }
  
  export default actions