/** Короткий анонс новости: первое предложение или первые 100 символов */
export const newsExcerpt = (content: string) => {
  if (!content) return "";

  const sentenceEnd = content.match(/[.!?…]/);

  if (sentenceEnd) {
    return content.substring(0, sentenceEnd.index! + 1);
  }

  return content.length > 100 ? content.substring(0, 100) + "..." : content;
};

/** Картинка-заглушка для новостей без обложки */
export const NEWS_PLACEHOLDER_IMAGE = "/sl1.jpg";
