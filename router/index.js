//This entire file is purely for routing purposes in Vue.js
//Vue.js router enables us to display different pages, depending on the URL
//Here, if the URL is "www.somewebsitename.com/", e.g. only "/" after the website name, we will display the HomePage component
//If the URL is "www.somewebsitename.com/diagram", e.g. with "/diagram" after the website name, we will display the CardioDiagram component

import Vue from "vue";
import VueRouter from "vue-router";

//Importing components from different folders to use
import HomePage from "../home/HomePage.vue";
import CardioDiagram from "../diagram/CardioDiagram.vue";

Vue.use(VueRouter);

//Object containing router paths
export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage
    },
    {
      path: "/diagram",
      name: "CardioDiagram",
      component: CardioDiagram
    }
  ]
});
