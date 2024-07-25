import {Mensa} from '@/types/mensainterface';

const apiUrl = 'https://mensa.gregorflachs.de/api/v1/canteen';
const apiKey = 'KJFzc/5w7I61UPPRrP8Is1Fq8ZTgvx93RIcuckfzqXqeEYIuwcJq7Ut1ZfasBnIppFJxkqCi7MOnME15cppwGbd9689hWV97bWPxmgTykB7pT1oCOWQlJFTVt/1nl1imKVNyRpPHGbR7ZYoTl7QAOQRtom/+iTt6+AcgaKLzBzrGqoxWbuRQEcLv98jhGE9Sibojc0Oj8n5GYn2xKfCcp/mJaFf23OSB3vPkcMPrEOPw+0TinGeu6LZZ4UFt8qeaKNi8jc+Tb9uEKeBUjOTM1co5RjyoKun2M5EWVTHYLRY8jZvF/VSJXLzHc6E3gp3dW7b3EPqE+/5RUZi5XFyWaQ==';

export async function fetchMensaById(id: string): Promise<Mensa> {
    const url = new URL(apiUrl);
    url.searchParams.append('ID', id);

    const response = await fetch(url.toString(), {
        headers: {
            'X-API-KEY': apiKey,
        },
    });

    if (!response.ok) {
        throw new Error('API request failed');
    }

    const data: Mensa[] = await response.json();
    return data[0];
}

export async function fetchMensas(): Promise<Mensa[]> {
    const response = await fetch(apiUrl, {
        headers: {
            'X-API-KEY': apiKey,
        },
    });

    if (!response.ok) {
        throw new Error('API request failed');
    }

    return await response.json();
}

export class fetchMenuForDate {
}

export class fetchMensasFromLocalforage {
}
