// Согласие на использование cookie.
// "all"       — пользователь разрешил все cookie, включая сторонние сервисы (Яндекс Карты и т. п.);
// "necessary" — только технически необходимые cookie, сторонние виджеты не загружаются;
// undefined   — выбор ещё не сделан, показываем баннер.
//
// Сам выбор хранится в технически необходимой cookie на 1 год.

export type CookieConsent = "all" | "necessary";

export const useCookieConsent = () => {
  const consent = useCookie<CookieConsent | undefined>("cookie_consent", {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/",
  });

  const settingsOpen = useState("cookie-settings-open", () => false);

  const hasChoice = computed(() => consent.value === "all" || consent.value === "necessary");
  const allowThirdParty = computed(() => consent.value === "all");

  const acceptAll = () => {
    consent.value = "all";
    settingsOpen.value = false;
  };
  const acceptNecessary = () => {
    consent.value = "necessary";
    settingsOpen.value = false;
  };
  const openSettings = () => {
    settingsOpen.value = true;
  };

  return { consent, hasChoice, allowThirdParty, settingsOpen, acceptAll, acceptNecessary, openSettings };
};
