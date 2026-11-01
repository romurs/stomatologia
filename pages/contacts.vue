<script setup lang="ts">
useHead({
  title: "Контакты | Стоматология «Для Вас»",
  meta: [
    { name: "description", content: "Контакты, реквизиты и режим работы стоматологической клиники «Для Вас», ООО «Сто процентов», Йошкар-Ола." },
  ],
});

const legalRows = [
  { subtitle: "Полное наименование", description: CLINIC.fullName },
  { subtitle: "Сокращённое наименование", description: CLINIC.shortName },
  { subtitle: "ОГРН", description: `${CLINIC.ogrn} (присвоен ${CLINIC.ogrnIssued})` },
  { subtitle: "ИНН / КПП", description: `${CLINIC.inn} / ${CLINIC.kpp}` },
  { subtitle: "Юридический адрес", description: CLINIC.legalAddress },
  { subtitle: "Почтовый адрес", description: CLINIC.postalAddress },
  { subtitle: "Адрес осуществления деятельности", description: CLINIC.address },
  CLINIC.license && {
    subtitle: "Лицензия на медицинскую деятельность",
    description: CLINIC.licenseIssuer ? `${CLINIC.license}, выдана: ${CLINIC.licenseIssuer}` : CLINIC.license,
  },
  CLINIC.email && { subtitle: "E-mail", description: CLINIC.email },
  { subtitle: "Учредители", description: "Поздеев Алексей Сергеевич, Полушин Сергей Анатольевич" },
  { subtitle: "Директор", description: CLINIC.director },
  { subtitle: "Главный врач", description: CLINIC.chiefDoctor },
  { subtitle: "Старшая медицинская сестра", description: "Калинина Елена Геннадьевна" },
  { subtitle: "Приём граждан директором", description: "вт и чт с 09:00 до 12:00" },
].filter((row): row is { subtitle: string; description: string } => Boolean(row));
</script>

<template>
  <div class="contacts-page">
    <div class="wrap">
      <h1 class="contacts-page__title">Контакты</h1>

      <div class="contacts-cards">
        <div class="contacts-cards__item card">
          <span class="contacts-cards__icon">📍</span>
          <strong>Адрес</strong>
          <p>{{ CLINIC.address }}</p>
        </div>
        <div class="contacts-cards__item card">
          <span class="contacts-cards__icon">🕒</span>
          <strong>Режим работы</strong>
          <p><template v-for="(h, i) in CLINIC.hours" :key="h.days"><br v-if="i" />{{ h.days }}: {{ h.time }}</template></p>
        </div>
        <div class="contacts-cards__item card">
          <span class="contacts-cards__icon">📞</span>
          <strong>Телефон</strong>
          <p><a :href="CLINIC.phone.href">{{ CLINIC.phone.text }}</a><br /><a :href="CLINIC.phone2.href">{{ CLINIC.phone2.text }}</a></p>
        </div>
        <div class="contacts-cards__item card">
          <span class="contacts-cards__icon">
            <img src="/VK Logo.svg" alt="" />
          </span>
          <strong>Группа ВКонтакте</strong>
          <p><a :href="CLINIC.vk" target="_blank" rel="noopener">Стоматология «Для Вас»</a></p>
        </div>
      </div>

      <div class="contacts-layout">
        <div class="contacts-map card">
          <YandexMap />
        </div>
        <!-- <PagesContactsContactForm /> -->
      </div>

      <div class="page-content contacts-legal">
        <h2>Сведения о владельце сайта, реквизиты и структура управления</h2>
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
  img {
    max-width: 1.6rem;
    margin: 0 auto;
  }
}

.contacts-layout {
  display: grid;
  // grid-template-columns: 1.2fr 1fr;
  max-width: 900px;
  margin: 0 auto;
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
