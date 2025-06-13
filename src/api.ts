const BASE_URL = "https://api.coinpaprika.com/v1";
const ICON_URL = "https://cryptocurrencyliveprices.com/img"
async function doFetch(url:string){
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

export async function getAllCoin(){
    const json = await doFetch(
       `${BASE_URL}/coins`
    );
    return json;
}

export async function getCoin(id:string){
    const json = await doFetch(
        `${BASE_URL}/coins/${id}`
    );
    return json;
}

export async function getTickers(id:string){
    const json = await doFetch(
        `${BASE_URL}/tickers/${id}`
    );
    return json;
}

export async function getLatestOHLCV(id:string){
    const json = await doFetch(
        `${BASE_URL}/coins/${id}/ohlcv/latest`
    );
    return json;
}

export async function getTodayOHLCV(id:string){
    const json = await doFetch(
        `${BASE_URL}/coins/${id}/ohlcv/today`
    );
    return json;
}

export async function getCoinOHLCV(id:string){
    console.log(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${id}`);
    const json = await doFetch(
        `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${id}`
    );
    return json;
}

export function getIconURL(id:string){
    return `${ICON_URL}/${id}.png`;
}