// Версия сайта для слабовидящих (ориентир — ГОСТ Р 52872-2019).
// Настройки хранятся в cookie, чтобы сервер сразу отдавал страницу в нужном виде
// (без «мигания» обычной версии). Это технически необходимая cookie — согласие не требуется.

export interface A11ySettings {
  enabled: boolean;
  fontSize: 1 | 2 | 3; // 100% / 150% / 200%
  scheme: "default" | "bw" | "wb" | "blue" | "beige";
  images: "on" | "gray" | "off";
  spacing: 1 | 2 | 3; // межбуквенный интервал: обычный / средний / большой
  font: "sans" | "serif";
}

const DEFAULTS: A11ySettings = {
  enabled: false,
  fontSize: 2,
  scheme: "bw",
  images: "on",
  spacing: 1,
  font: "sans",
};

export const useAccessibility = () => {
  const settings = useCookie<A11ySettings>("a11y", {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/",
    default: () => ({ ...DEFAULTS }),
  });

  const panelOpen = useState("a11y-panel-open", () => false);

  const set = <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
    settings.value = { ...DEFAULTS, ...settings.value, [key]: value };
  };

  const enable = () => {
    settings.value = { ...DEFAULTS, ...settings.value, enabled: true };
    panelOpen.value = true;
  };

  const disable = () => {
    settings.value = { ...DEFAULTS };
    panelOpen.value = false;
  };

  const reset = () => {
    settings.value = { ...DEFAULTS, enabled: true };
  };

  /** Классы для <html> */
  const htmlClass = computed(() => {
    const s = { ...DEFAULTS, ...settings.value };
    if (!s.enabled) return "";
    return [
      "a11y",
      `a11y-fs-${s.fontSize}`,
      `a11y-scheme-${s.scheme}`,
      `a11y-img-${s.images}`,
      `a11y-ls-${s.spacing}`,
      `a11y-font-${s.font}`,
    ].join(" ");
  });

  return { settings, panelOpen, set, enable, disable, reset, htmlClass };
};
