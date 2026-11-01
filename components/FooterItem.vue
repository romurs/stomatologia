<script setup lang="ts">
import F7AlarmFill from "~/assets/icons/F7AlarmFill.svg";
import F7PhoneFillArrowDownLeft from "~/assets/icons/F7PhoneFillArrowDownLeft.svg";
import F7PlacemarkFill from "~/assets/icons/F7PlacemarkFill.svg";
import FooterDateText from "./Footer/FooterDateText.vue";

const { openSettings: openCookieSettings } = useCookieConsent();
const year = new Date().getFullYear();
</script>

<template>
  <footer>
    <div class="wrap footer_container">
      <div class="footer-grid">
        <div class="footer-col footer-about">
          <NuxtLink to="/" class="footer-logo">
            <img src="/main_logo2.png" alt="Стоматология «Для Вас»" />
          </NuxtLink>
          <p class="footer-about__text">
            Стоматологическая клиника «Для Вас». Лечение, протезирование и имплантация с {{ CLINIC.foundedYear }} года.
          </p>
          <div class="footer-social">
            <a :href="CLINIC.vk" target="_blank" rel="noopener" aria-label="Группа ВКонтакте">VK</a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Услуги</h4>
          <ul>
            <li><NuxtLink to="/price">Прайс-лист</NuxtLink></li>
            <li><NuxtLink to="/staff">Наши врачи</NuxtLink></li>
            <li><NuxtLink to="/#promotions">Акции</NuxtLink></li>
            <li><NuxtLink to="/booking">Запись онлайн</NuxtLink></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Информация</h4>
          <ul>
            <li><NuxtLink to="/documents">Документы и лицензии</NuxtLink></li>
            <li><NuxtLink to="/contacts">Контакты и реквизиты</NuxtLink></li>
            <li><NuxtLink to="/allnews">Новости</NuxtLink></li>
            <li><NuxtLink to="/privacy">Политика обработки персональных данных</NuxtLink></li>
            <li><NuxtLink to="/consent">Согласие на обработку персональных данных</NuxtLink></li>
            <li><NuxtLink to="/cookies">Политика использования cookie</NuxtLink></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Контакты</h4>
          <div class="date_container">
            <FooterDateText :text="clinicHoursText()">
              <template #icon>
                <F7AlarmFill width="24" />
              </template>
            </FooterDateText>

            <FooterDateText :text="CLINIC.phone.text" :link="CLINIC.phone.href">
              <template #icon>
                <F7PhoneFillArrowDownLeft width="24" />
              </template>
            </FooterDateText>

            <FooterDateText :text="CLINIC.addressShort">
              <template #icon>
                <F7PlacemarkFill width="24" />
              </template>
            </FooterDateText>
          </div>
        </div>
      </div>

      <div class="footer-owner">
        <h4>Сведения о владельце сайта</h4>
        <p>
          {{ CLINIC.fullName }} ({{ CLINIC.shortName }}).
          ОГРН {{ CLINIC.ogrn }}, ИНН {{ CLINIC.inn }}, КПП {{ CLINIC.kpp }}.
        </p>
        <p>Юридический адрес: {{ CLINIC.legalAddress }}.</p>
        <p>Адрес осуществления деятельности: {{ CLINIC.address }}.</p>
        <p>
          Телефон: <a :href="CLINIC.phone.href">{{ CLINIC.phone.text }}</a><template v-if="CLINIC.email">, e-mail: <a :href="`mailto:${CLINIC.email}`">{{ CLINIC.email }}</a></template>.
          Директор — {{ CLINIC.director }}.
        </p>
        <p v-if="CLINIC.license">
          Лицензия на осуществление медицинской деятельности {{ CLINIC.license }}<template v-if="CLINIC.licenseIssuer">, выдана: {{ CLINIC.licenseIssuer }}</template>.
        </p>
      </div>

      <div class="footer-bottom">
        <p>© {{ CLINIC.foundedYear }}–{{ year }} {{ CLINIC.shortName }}. Все права защищены.</p>
        <button type="button" class="footer-cookie-btn" @click="openCookieSettings">Настройки cookie</button>
      </div>

      <p class="footer-disclaimer">
        Имеются противопоказания. Необходима консультация специалиста.
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  width: 100%;
  background-color: var(--color-primary-700);
  font-weight: 400;
  flex-shrink: 0;
  padding-top: 48px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.4fr;
  gap: 32px;
  padding-bottom: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
}

.footer-col {
  h4 {
    color: #fff;
    font-size: 1rem;
    margin-bottom: 14px;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  a {
    color: rgba(255, 255, 255, 0.78);
    font-size: 0.92rem;
    transition: color 0.2s ease;
  }
  a:hover {
    color: #fff;
  }
}

.footer-logo {
  display: inline-block;
  width: 16rem;
  margin-bottom: 14px;
}

.footer-about__text {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.88rem;
  line-height: 1.5;
  margin-bottom: 16px;
}

.footer-social {
  display: flex;
  gap: 10px;

  a {
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 700;
    color: #fff;
  }
  a:hover {
    background: var(--color-accent);
  }
}

.date_container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: rgba(255, 255, 255, 0.85);
}

.footer-owner {
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;

  h4 {
    color: #fff;
    font-size: 0.9rem;
    margin-bottom: 6px;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
    line-height: 1.5;
  }

  a {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: underline;
  }
}

.footer-cookie-btn {
  background: none;
  border: none;
  padding: 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.78rem;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
}

.footer-disclaimer {
  text-align: center;
  color: #fff;
  font-weight: 700;
  font-size: clamp(0.95rem, 1.6vw, 1.2rem);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  padding: 14px 0 22px;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  padding: 18px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.78rem;

  p {
    color: inherit;
  }
}
</style>
