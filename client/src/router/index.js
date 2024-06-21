import { createRouter, createWebHistory } from 'vue-router'; 
import Login from '../components/Login.vue'; 
import Clients from '../components/Clients.vue'; 

const routes = [
  { path: '/', component: Login }, // Маршрут для страницы авторизации, компонент Login.vue
  { path: '/clients', component: Clients } // Маршрут для страницы клиентов, компонент Clients.vue
];

const router = createRouter({
  history: createWebHistory(), 
  routes 
});

export default router; 

