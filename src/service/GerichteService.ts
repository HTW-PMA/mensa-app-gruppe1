import type {Meal} from "@/types/GerichteInterface";

const apiUrl = 'https://mensa.gregorflachs.de/api/v1/meal';

export async function fetchMeal(apiKey: string, params: Record<string, string> = {}): Promise<Meal[]> {
  const url = new URL(apiUrl);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'X-API-KEY': apiKey,
      },
    });

    if (!response.ok) {
      console.error('API request failed with status:', response.status);
      throw new Error('API request failed');
    }

    const data: Meal[] = await response.json();
    console.log('Fetched meals data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching meals:', error);
    throw error;
  }
}
