import Vue from "vue"
import Vuex from 'vuex'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getName, setName, removeName } from '@/utils/name'
import { getAdmin, setAdmin, removeAdmin } from '@/utils/isAdmin'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    name: getName(),
    token: getToken(),
    isAdmin: getAdmin()*1,
    is: 0,

  },
  mutations: {
    SET_NAME(state,value){
      state.name = value
    },
    SET_TOKEN(state,value){
      state.token = value
    },
    SET_ADMIN(state,value){
      state.isAdmin = value
    },

    SET_IS(state,value){
      state.is = value
    },
  },
  actions: {
    login({ commit },userInfo){
      setToken(userInfo.token)
      setName(userInfo.name)
      setAdmin(userInfo.isAdmin)
      commit("SET_TOKEN",userInfo.token)
      commit("SET_NAME",userInfo.name)
      commit("SET_ADMIN",userInfo.isAdmin)
    },
    logout({ commit }){
      commit("SET_NAME","")
      commit("SET_TOKEN","")
      commit("SET_ADMIN",0)
      commit("SET_IS",0)
      removeAdmin()
      removeToken()
      removeName()
    }
  }
})

export default store