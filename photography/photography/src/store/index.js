import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const state = {
    name: ""
}
const mutations = {
    setname(state, value){
        state.name = value
    }
}
export default new Vuex.Store({
    state,
    mutations,
})