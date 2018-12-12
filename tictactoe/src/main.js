import Vue from "vue";
import VueFire from "vuefire";
import App from "./App.vue";
//import Firebase from "firebase";

//Vue.config.productionTip = false;
Vue.use(VueFire);

//let firebaseApp = Firebase.initializeApp(config);

new Vue({
  el: "#app",
  render: h => h(App)
});

//.$mount('#app');

/*
firebase.database().ref('games/g1/n/').once('value', function(snapshot){
	console.log(snapshot.val());
	alert(snapshot.val());
});

firebase.database().ref('games/').on('value', function(data) {
    console.log(data.val());
	Vue.games = data.val();
})
*/
