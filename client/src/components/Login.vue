<template>
  <div class="login-container">
    <h2>Авторизация</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username">Логин</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit" class="btn-login">Войти</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'; 
import { useRouter } from 'vue-router'; 

const username = ref('');
const password = ref(''); 
const router = useRouter(); 

// Функция для отправки запроса на сервер для авторизации
const login = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ username: username.value, password: password.value }), 
    });

    const data = await response.json(); 

    if (data.token) {
      localStorage.setItem('token', data.token); 
      router.push('/clients'); // Перенаправление пользователя на страницу клиентов при успешной авторизации
    } else {
      alert(data.message); 
    }
  } catch (error) {
    console.error('Ошибка при авторизации:', error); 
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.login-form {
  width: 300px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
}

.form-group input {
  width: calc(100% - 20px);
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-login {
  width: 100%;
  padding: 10px;
  background-color: #D8013F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #5D96B0;
}
</style>
