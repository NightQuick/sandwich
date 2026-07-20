<script setup lang="ts">
import { useAuthStore } from '@/stores/sessionStore';
import { Ref, ref } from 'vue';

const sessionStore = useAuthStore();
const currentType = ref('login');
// const tableRef = ref<HTMLElement | null>(null);

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const passwordRepeat: Ref<string> = ref('');

const emailError = ref('');
const passwordError = ref('');

function handleEmailBlur(e: Event) {
  validateEmailField(e.target as HTMLInputElement);
}

function handlePasswordlBlur(e: Event) {
  validatePasswordField(e.target as HTMLInputElement);
}

function handleEmailInput(e: Event) {
  emailError.value = '';
}

function handlePasswordInput(e: Event) {
  passwordError.value = '';
}

function validateEmailField(input: HTMLInputElement) {
  if (input.validity.valueMissing) {
    emailError.value = 'Поле Почта обязательно для заполнения';
  } else if (input.validity.typeMismatch) {
    emailError.value = 'Неверный формат email';
  } else {
    emailError.value = '';
  }
}

function validatePasswordField(input: HTMLInputElement) {
  if (input.validity.valueMissing) {
    passwordError.value = 'Поле Пароль обязательно для заполнения';
  } else if (input.validity.tooShort) {
    passwordError.value = 'Длина пароля должна быть больше ' + input.minLength;
  } else if (input.validity.patternMismatch) {
    passwordError.value = 'Пароли должны совпадать';
  } else {
    passwordError.value = '';
  }
}

function handleAuthSubmit() {
  sessionStore.login(email.value, password.value);
}

function handleRegisterSubmit() {
  console.log(email, password);
}
</script>

<template>
  <div>
    <table ref="tableRef" id="login-switcher">
      <thead>
        <tr>
          <td
            id="login"
            @click="
              {
                currentType = 'login';
                email = '';
                password = '';
              }
            "
          >
            Вход
          </td>

          <td
            id="register"
            @click="
              {
                currentType = 'register';
                email = '';
                password = '';
              }
            "
          >
            Регистрация
          </td>
        </tr>
      </thead>
    </table>
    <div v-if="currentType === 'login'" id="login-modal-content">
      <p id="login-title">Выполните вход</p>
      <form @submit.prevent="handleAuthSubmit" id="auth-form">
        <div class="login-form" id="login-wrapper">
          <p>Логин</p>
          <input
            id="login"
            type="email"
            name="login"
            placeholder="examle@mail.com"
            required="true"
            v-model="email"
            @blur="handleEmailBlur"
            @input="handleEmailInput"
          />
        </div>
        <div class="login-form" id="password-wrapper">
          <p>Пароль</p>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            required="true"
            minlength="8"
            v-model="password"
            @blur="handlePasswordlBlur"
            @input="handlePasswordInput"
          />
        </div>
        <p v-if="emailError" class="error">{{ emailError }}</p>
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
        <input type="submit" value="Вход" id="submit" />
      </form>
    </div>
    <div v-if="currentType === 'register'" id="login-modal-content">
      <p id="login-title">Зарегистрируйтесь</p>
      <form @submit.prevent="handleRegisterSubmit" id="auth-form">
        <div class="login-form" id="login-wrapper">
          <p>Введите почту</p>
          <input
            id="login"
            type="email"
            name="login"
            placeholder="examle@mail.com"
            required="true"
            v-model="email"
            @blur="handleEmailBlur"
            @input="handleEmailInput"
          />
        </div>
        <div class="login-form" id="password-wrapper">
          <p>Придумайте пароль</p>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••"
            required="true"
            minlength="8"
            v-model="password"
            @blur="handlePasswordlBlur"
            @input="handlePasswordInput"
          />
        </div>
        <div class="login-form" id="password-repeat-wrapper">
          <p>Повторите пароль</p>
          <input
            id="password-repeat"
            type="password"
            name="password-repeat"
            placeholder="••••••••"
            required="true"
            minlength="8"
            v-model="passwordRepeat"
            @blur="handlePasswordlBlur"
            @input="handlePasswordInput"
            :pattern="password"
          />
        </div>
        <p v-if="emailError" class="error">{{ emailError }}</p>
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
        <input type="submit" value="Вход" id="submit" />
      </form>
    </div>
  </div>
</template>

<style>
#auth-form {
  display: grid;
}

#login-title {
  margin: auto;
  font-size: 20px;
  font-weight: 500;
}
.login-form {
  margin: 10px;
}
.login-form p {
  margin: 0;
}
.login-form input {
  font-size: 18px;
  width: 80%;
}
#login-modal-content {
  display: grid;
}
#login-switcher {
  margin: auto;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}
#login-switcher td {
  font-size: 19px;
  border: 0px solid;
  width: 50%;
  cursor: pointer;
}
#submit {
  width: 200px;
  margin-left: 10px;
  margin-top: 5px;
  border: 0;
  border-radius: 3px;
  background-color: var(--color-brand);
  color: white;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  font-size: 22px;
  box-shadow:
    0px 0px 5px rgba(0, 0, 0, 0.5),
    0px 2px 0px rgba(0, 0, 0, 0.5);
}
</style>
