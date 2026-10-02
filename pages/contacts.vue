<script setup lang="ts">
useHead({
  title: "Контакты | Стоматология «Для Вас»",
  meta: [
    { name: "description", content: "Контакты, реквизиты и режим работы стоматологической клиники «Для Вас», ООО «Сто процентов», Йошкар-Ола." },
  ],
});

const legalRows = [
  { subtitle: "Полное наименование", description: "Общество с ограниченной ответственностью «Сто процентов»" },
  { subtitle: "Сокращённое наименование", description: "ООО «Сто процентов»" },
  { subtitle: "ОГРН", description: "1081215005497 (выдано 16.07.2008г. Инспекцией Федеральной налоговой службы по г. Йошкар-Оле)" },
  { subtitle: "ИНН / КПП", description: "1215133108 / 121501001" },
  { subtitle: "Юридический адрес", description: "424000, Республика Марий Эл, г. Йошкар-Ола, ул. Строителей, дом № 1, корпус Б" },
  { subtitle: "Почтовый адрес", description: "424028, Республика Марий Эл, г. Йошкар-Ола, ул. Строителей, дом № 1, корпус Б" },
  { subtitle: "Учредители", description: "Поздеев Алексей Сергеевич, Полушин Сергей Анатольевич" },
  { subtitle: "Директор", description: "Поздеев Алексей Сергеевич" },
  { subtitle: "Главный врач", description: "Полушин Сергей Анатольевич" },
  { subtitle: "Старшая медицинская сестра", description: "Калинина Елена Геннадьевна" },
  { subtitle: "Приём граждан директором", description: "вт и чт с 9:00 до 12:00" },
];
</script>

<template>
  <div class="contacts-page">
    <div class="wrap">
      <h1 class="contacts-page__title">Контакты</h1>

      <div class="contacts-cards">
        <div class="contacts-cards__item card">
          <span class="contacts-cards__icon">📍</span>
          <strong>Адрес</strong>
          <p>Марий Эл, г. Йошкар-Ола, ул. Строителей, 1Б, 2 этаж</p>
        </div>
        <div class="contacts-cards__item card">
          <span class="contacts-cards__icon">🕒</span>
          <strong>Режим работы</strong>
          <p>ПН–ПТ 09:00–20:00<br />СБ 09:00–16:00, ВС — выходной</p>
        </div>
        <div class="contacts-cards__item card">
          <span class="contacts-cards__icon">📞</span>
          <strong>Телефон</strong>
          <p><a href="tel:+78362733333">+7 (8362) 73-33-33</a><br /><a href="tel:+79027437080">+7 902 743-70-80</a></p>
        </div>
        <div class="contacts-cards__item card">
          <span class="contacts-cards__icon">✉️</span>
          <strong>Email</strong>
          <p><a href="mailto:stoprots@yandex.ru">stoprots@yandex.ru</a></p>
        </div>
      </div>

      <div class="contacts-layout">
        <div class="contacts-map card">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=47.832581%2C56.639343&mode=poi&poi%5Bpoint%5D=47.832481%2C56.639388&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D1331474234&z=17"
            width="100%"
            height="100%"
            frameborder="0"
            allowfullscreen="true"
          ></iframe>
        </div>
        <PagesContactsContactForm />
      </div>

      <div class="page-content contacts-legal">
        <h2>Реквизиты и структура управления</h2>
        <PagesContactsRowContacts
          v-for="row in legalRows"
          :key="row.subtitle"
          :subtitle="row.subtitle"
          :description="row.description"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contacts-page {
  padding: 48px 0 64px;
}

.contacts-page__title {
  text-align: center;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  margin-bottom: 32px;
}

.contacts-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
}

.contacts-cards__item {
  padding: 22px;
  text-align: center;

  strong {
    display: block;
    margin: 10px 0 6px;
    color: var(--color-ink);
  }

  p {
    font-size: 0.88rem;
    color: var(--color-text-muted);
  }

  a {
    color: var(--color-primary-700);
    font-weight: 600;
  }
}

.contacts-cards__icon {
  font-size: 1.6rem;
}

.contacts-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.contacts-map {
  min-height: 380px;
  overflow: hidden;
}

.contacts-legal {
  h2 {
    margin-bottom: 16px;
    font-size: 1.2rem;
  }
}
</style>
