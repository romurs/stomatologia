<script setup lang="ts">
import F7AlarmFill from "~/assets/icons/F7AlarmFill.svg";
import F7PhoneFillArrowDownLeft from "~/assets/icons/F7PhoneFillArrowDownLeft.svg";
import F7PlacemarkFill from "~/assets/icons/F7PlacemarkFill.svg";
import EmailIcon from "~/assets/icons/EmailIcon.svg";
</script>

<template>
  <footer>
    <div class="wrap footer_container">
      <div class="footer-grid">
        <div class="footer-col footer-about">
          <NuxtLink to="/" class="footer-logo">
            <img src="/Logo_White.svg" alt="Стоматология «Для Вас»" />
          </NuxtLink>
          <p class="footer-about__text">
            Стоматологическая клиника «Для Вас», ООО «Сто процентов». Лечение, протезирование и имплантация с 2008 года.
          </p>
          <div class="footer-social">
            <a href="https://vk.com/" target="_blank" rel="noopener" aria-label="ВКонтакте">VK</a>
            <a href="https://wa.me/79027437080" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a>
            <a href="https://t.me/" target="_blank" rel="noopener" aria-label="Telegram">TG</a>
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
          </ul>
        </div>

        <div class="footer-col">
          <h4>Контакты</h4>
          <div class="date_container">
            <FooterDateText text="ПН–ПТ 09:00–20:00; СБ 09:00–16:00">
              <template #icon>
                <F7AlarmFill width="14" />
              </template>
            </FooterDateText>

            <FooterDateText text="+7 (8362) 73-33-33" link="tel:+78362733333">
              <template #icon>
                <F7PhoneFillArrowDownLeft width="14" />
              </template>
            </FooterDateText>

            <FooterDateText text="г. Йошкар-Ола, ул. Строителей, 1Б, 2 этаж">
              <template #icon>
                <F7PlacemarkFill width="14" />
              </template>
            </FooterDateText>

            <FooterDateText text="stoprots@yandex.ru" link="mailto:stoprots@yandex.ru">
              <template #icon>
                <EmailIcon width="14" />
              </template>
            </FooterDateText>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} ООО «Сто процентов». Все права защищены.</p>
        <p class="footer-disclaimer">Есть противопоказания, необходима консультация специалиста.</p>
      </div>
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
  grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
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
  width: 9rem;
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

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  padding: 18px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.78rem;
}
</style>
