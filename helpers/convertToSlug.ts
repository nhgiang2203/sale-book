import unidecode from 'unidecode';

export const converToSlug = (text: string): string => {
  const stringUnidecode = unidecode(text).trim();

  const slug: string = stringUnidecode.replace(/\+s/g, '-');
  return slug;
}