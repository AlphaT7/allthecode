import firebase from "firebase/app";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyClYb5VGROlSqpXN0N5Wjb27nR0_TbFikQ",
  authDomain: "tic-tac-toe-50adf.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-50adf.firebaseio.com",
  projectId: "tic-tac-toe-50adf"
});

export const db = firebaseApp.database();
