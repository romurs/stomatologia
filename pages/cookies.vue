<script setup lang="ts">
// TODO: если подключите Яндекс Метрику или другие сервисы — добавьте их в таблицу ниже
// и загружайте только при согласии (useCookieConsent().allowThirdParty).
useHead({
  title: "Политика использования cookie | Стоматология «Для Вас»",
  meta: [{ name: "description", content: "Какие файлы cookie использует сайт клиники и как ими управлять." }],
});

const site = useRequestURL().host;
const { openSettings } = useCookieConsent();
</script>

<template>
  <LegalDoc title="Политика использования файлов cookie">
    <p>
      Сайт {{ site }} (далее — Сайт), владельцем которого является {{ CLINIC.fullName }}
      (ОГРН {{ CLINIC.ogrn }}), использует файлы cookie. Настоящий документ является частью
      <NuxtLink to="/privacy">Политики в отношении обработки персональных данных</NuxtLink>.
    </p>

    <h2>1. Что такое cookie</h2>
    <p>
      Cookie — это небольшие текстовые файлы, которые сохраняются в браузере при посещении Сайта.
      Они позволяют Сайту запоминать ваши настройки и корректно работать.
    </p>

    <h2>2. Какие cookie мы используем</h2>
    <table>
      <thead>
        <tr>
          <th>Cookie</th>
          <th>Тип</th>
          <th>Назначение</th>
          <th>Срок хранения</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>cookie_consent</td>
          <td>Необходимая (Сайт)</td>
          <td>Запоминает ваш выбор в отношении cookie</td>
          <td>1 год</td>
        </tr>
        <tr>
          <td>a11y</td>
          <td>Необходимая (Сайт)</td>
          <td>Хранит настройки версии для слабовидящих</td>
          <td>1 год</td>
        </tr>
        <tr>
          <td>Cookie ООО «Яндекс»</td>
          <td>Сторонние (функциональные)</td>
          <td>Отображение интерактивной карты Яндекс Карт на страницах Сайта</td>
          <td>Определяется ООО «Яндекс»</td>
        </tr>
      </tbody>
    </table>
    <p>
      Сторонние cookie (Яндекс Карты) устанавливаются только после того, как вы нажмёте «Принять все»
      в уведомлении о cookie или кнопку «Разрешить cookie и показать карту». Обработка данных
      ООО «Яндекс» осуществляется в соответствии с его политикой конфиденциальности.
    </p>
    <p>
      Сайт не использует cookie для рекламы и не передаёт данные cookie третьим лицам для целей
      маркетинга.
    </p>

    <h2>3. Как управлять cookie</h2>
    <p>
      Вы можете изменить свой выбор в любой момент:
      <button type="button" class="legal-inline-btn" @click="openSettings">открыть настройки cookie</button>.
      Также cookie можно удалить или запретить в настройках браузера. Отключение необходимых cookie
      может нарушить работу отдельных функций Сайта.
    </p>

    <h2>4. Контакты</h2>
    <p>
      Вопросы об использовании cookie направляйте по телефону {{ CLINIC.phone.text }},
      на e-mail {{ orTodo(CLINIC.email) }} или по адресу {{ CLINIC.postalAddress }}.
    </p>
  </LegalDoc>
</template>

<style scoped lang="scss">
.legal-inline-btn {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: var(--color-primary-700);
  text-decoration: underline;
  cursor: pointer;
}
</style>
