<template>
  <div id="app">
    <header>
      <h1>Приложение для управления клиентами</h1>
      <nav>
        <router-link to="/">Авторизация</router-link>
        <router-link to="/clients">Клиенты</router-link>
      </nav>
    </header>

    <main>
      <!-- Основная часть приложения -->
      <router-view></router-view>
    </main>

    <footer>
      <p>2024</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'; 
import { useRouter } from 'vue-router'; 

const router = useRouter(); 

// Проверка наличия токена авторизации при загрузке приложения
onMounted(() => {
  const token = localStorage.getItem('token'); // Получение токена из localStorage
  if (!token && router.currentRoute.value.path !== '/') { // Проверка отсутствия токена и текущего маршрута
    router.push('/'); // Перенаправление на страницу авторизации, если токен отсутствует
  }
});
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
}

body {
  margin: 0;
}

header {
  background-color: #5D96B0; 
  padding: 10px; 
}

header h1 {
  color: white; 
  margin: 0; 
}

nav {
  display: flex; 
  gap: 10px;
}

nav a {
  color: white; 
  text-decoration: none; 
  padding: 5px 10px; 
  border-radius: 4px; 
  transition: background-color 0.3s ease; 
}

nav a:hover {
  background-color: #5D96B0; 
}

main {
  flex: 1; 
  padding: 20px; 
}

footer {
  text-align: center; 
  padding: 10px; 
  background-color: #0C1B26; 
  color: #BDBDBD; 
}
</style>
