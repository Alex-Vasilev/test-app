// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
import VueApollo from 'vue-apollo';

Vue.use(VueResource);

Vue.use(Vuex); 

Vue.config.productionTip = false;

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
//    uri: 'http://localhost:8080/graphql',
    uri: 'https://api.github.com/users/octocat/repos',
    transportBatching: true,
  }),
  queryTransformer: addTypename,
  dataIdFromObject: r => r.id,
});

// Install the vue plugin
// With the apollo client instance
Vue.use(VueApollo, {
  apolloClient,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

const store = new Vuex.Store({
    state: {
        notes: []
    },
    actions: {
        addNote({commit}, url) {
//            console.log(this)
//             return new Promise((resolve, reject) => {
            // Do something here... lets say, a http call using vue-resource
            Vue.http.get(url).then(response => {
                console.log(response.body)
                commit('ADD_NOTE', response.body)
                // http success, call the mutator and change something in state
//                resolve(response);  // Let the calling function know that http is done. You may send some data back
            }, error => {
                // http failed, let the calling function know that action did not work out
                console.log(error);
            })
//        })
        }
    },
    mutations: {
        ADD_NOTE(state, data) {
            data.forEach(function(i){
                state.notes.push(i);
            })   
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
  apolloProvider,
  template: '<App/>',
  components: { App }
})
