import firebase from "firebase";
import firestore from "firebase/firestore";
import React, { Component } from "react";
var firebaseConfig = {
  apiKey: "AIzaSyCq8Ji67PTx7kmed1PWff0gtiZpuzVa7QY",
  authDomain: "newsystem-d44d4.firebaseapp.com",
  databaseURL: "https://newsystem-d44d4.firebaseio.com",
  projectId: "newsystem-d44d4",
  storageBucket: "newsystem-d44d4.appspot.com",
  messagingSenderId: "333480572352",
  appId: "1:333480572352:web:f587013f5044a00475c425",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const ref = firebase.firestore().collection("materials");
ref.doc("زيناتون C").set({
  properties:{
  
  كيلو:{
      buying_price:14.92,
      store_num:5,
      weight:1,
      selling_price:{
        customer:21.93,
        companies:21.93,
        hotels:21.93,
        stores:18.66
      }
    },
    جالون:{
      buying_price:53.68,
      store_num:5,
      weight:3.3,
      selling_price:{
        customer:70.18,
        companies:70.18,
        hotels:70.18,
        stores:67.12
      }
    },
    بستلة:{
      buying_price:134.35,
      store_num:5,
      weight:9,
      selling_price:{
        customer:171.05,
        companies:171.05,
        hotels:171.05,
        stores:167.95
      }
    }
  }
}).then(()=>{
  console.log("added");
}).catch((error)=>{
  console.error("error"+error);
})

/*let F = async () => {
  try {
    await firebase
      .firestore()
      .collection("materials")
      .doc("كيماتون مط صاج")
      .get()
      .then((data) => {
        console.log(data.get());
      });
  } catch (e) {
    console.log(e);
  }
};
F();

export function updateMinus(x, y, z, w) {
  firebase
    .database()
    .ref("materials/" + x + "/properties/" + y)
    .update({
      store_num: z - w,
    })

    .catch((error) => {
      console.log(error);
    });
}*/
export default firebase;
