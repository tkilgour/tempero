import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyDk54r9RkREwXVlRynK5YBzX_sZyY3dgUc",
  authDomain: "todo-today-72682.firebaseapp.com",
  projectId: "todo-today-72682",
  storageBucket: "todo-today-72682.appspot.com",
  messagingSenderId: "859812494503",
  appId: "1:859812494503:web:1a48d433a4b917ee906f82",
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
