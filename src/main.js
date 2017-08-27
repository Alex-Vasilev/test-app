// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(VueResource);

Vue.use(Vuex); 

Vue.config.productionTip = false;

const store = new Vuex.Store({
    state: {
        notes: []
    },
    actions: {
        addNote({commit}, note) {
//            console.log(this)
             return new Promise((resolve, reject) => {
            // Do something here... lets say, a http call using vue-resource
            Vue.http.get("https://api.github.com/users/octocat/repos").then(response => {
                console.log(response)
                // http success, call the mutator and change something in state
                resolve(response);  // Let the calling function know that http is done. You may send some data back
            }, error => {
                // http failed, let the calling function know that action did not work out
                reject(error);
            })
        })
//            this.$http.get('https://api.github.com/users/${name}/repos?per_page=${first}&sort=${orderby}').then(response => {
//                    console.log(response);
//                }, response => {
//                    console.log(response);
//                });
//            commit('ADD_NOTE', note);
        }
    },
    mutations: {
        ADD_NOTE(state, note) {
            state.notes.push(note);
        }
    },
    getters: {
        notes(state) {
            return state.notes;
        }
    }  
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
