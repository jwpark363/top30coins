import { BrowserRouter, Route, Routes } from "react-router";
import AllCoin from "./router/AllCoin";
import Coin from "./router/Coin";
import CoinPrice from "./router/CoinPrice";
import LineChart from "./router/LineChart";
import Candlestick from "./router/Candlestick";

export default function Router(){
    return <BrowserRouter>
        <Routes>
            <Route index element={<AllCoin />} />
            <Route path="/top30coins/" element={<AllCoin />} />
            <Route path="/top30coins/:coinId" element={<Coin />}>
                <Route path="price" element={<CoinPrice />} />
                <Route path="line" element={<LineChart />} />
                <Route path="candle" element={<Candlestick />} />
            </Route>
        </Routes>
    </BrowserRouter>
}