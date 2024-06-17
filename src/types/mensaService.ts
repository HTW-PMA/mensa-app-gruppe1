

import { Mensa } from './mensainterface';

export async function fetchMensas(apiKey: string): Promise<Mensa[]> {
  const response = await fetch('https://mensa.gregorflachs.de/api/v1/canteen', {
    headers: {
      'X-API-KEY': 'EjGTzhCqu7TbBUwpN2x4H7YIRf5LIepS28Uc+Pn2k8IBkc05wDI6F+ZQbA13f67qSlENe8AU3UqL5Zzck+rERaYxrXKqISZQ6ut9/KIgGJoHs1VMlNvp0DfvWa69WzXyvdEEtTUN/3tsfxeGDG//UmzHTps9DnYKemomcgwGEPx+4U/dbv4L/QeHoTph8dLISK9ipWP2By5SjFKPreZoAJWuOy/6+u5uF23irGt5wBVZCFsdrvJUiIN72QURoF6aR9dzT+a8g1i9w9cFnTFxTtewRtm4lFY2ME/nmMIHKkchUuqfT0bNsxZL2dPfIo1E3ahzuNctbqUfdBBv1lslYw==',
    },
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  const data: Mensa[] = await response.json();
  return data;
}
