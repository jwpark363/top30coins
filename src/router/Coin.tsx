import { Link, Outlet, useLocation, useMatch, useParams } from "react-router"
import styled from "styled-components";
import { getCoin, getTickers } from "../api";
import Loading from "../components/Loading";
import { Boxes, HeaderBox, Title, MainBox } from "../components/StyledComponents";
import { useQuery } from "@tanstack/react-query";
interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
    logo: string,
    description: string,
    open_source: string,
    started_at: string,
    development_status: string,
    hardware_wallet: boolean,
    proof_type: string,
    org_structure: string,
    hash_algorithm: string,
    first_data_at: string,
    last_data_at: string,
}
interface ITicker{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    total_supply: number,
    max_supply: number,
    beta_value: number,
    first_data_at: string,
    last_updated: string,
    quotes:{
        USD:{
            price: number,
            volume_24h: number,
            volume_24h_change_24h: number,
            market_cap: number,
            market_cap_change_24h: number,
            percent_change_15m: number,
            percent_change_30m: number,
            percent_change_1h: number,
            percent_change_6h: number,
            percent_change_12h: number,
            percent_change_24h: number,
            percent_change_7d: number,
            percent_change_30d: number,
            percent_change_1y: number,
            ath_price: number,
            ath_date: string,
            percent_from_price_ath: number
        }
    }
}
const CoinBox = styled.div`
    height: 100px;
    color: #2C3E50;
    background-color: #BDC3C7;
    border-radius: 32px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-content: center;
`;
const CoinItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: centr;
    span{
        padding: 12px 4px;
        font-size: 18px;
        font-weight: bold;
    }
`;
const CoinDesc = styled.div`
    min-height: 200px;
    background-color: #ECF0F1;
    border-radius: 40px;
    display: flex;
    padding: 20px 16px;
    span{
        font-size: 16px;
        line-height: 1.4;
    }
`;
const CoinTabs = styled.div`
    display: flex;
    gap: 12px;
    padding: 4px 16px;
`;
const CoinTab = styled.div<{active:boolean}>`
    flex-grow: 1;
    background-color: #2980B9;
    text-align: center;
    border-radius: 12px;
    padding: 12px;
    font-size: 18px;
    opacity: ${props => props.active ? 1 : 0.6};
    a{
        color: ${props => props.theme.textColor};
    }
`;
const Home = styled.span`
    padding: 4px;
    border-radius: 2px;
    font-size:14px;
    color: ${props => props.theme.textColor};
    opacity: 0.7;
    position: absolute;
    right:20px;
    top: 32px;
`;

export default function Coin(){
    const {coinId} = useParams<string>();
    const {state} = useLocation();
    const matchLine = useMatch("/top30coins/:coinId/line");
    const matchCandle = useMatch("/top30coins/:coinId/candle");
    const matchPrice = useMatch("/top30coins/:coinId/price");
    const {isLoading:coinLoading, data: coin} = useQuery<ICoin>({
        queryKey: ['coin', coinId, 'coin'],
        queryFn: () => getCoin(coinId!)
    });
    const {isLoading:tickerLoading, data: ticker} = useQuery<ITicker>({
        queryKey: ['coin', coinId, 'ticker'],
        queryFn: () => getTickers(coinId!)
    });
    const isLoading = coinLoading || tickerLoading;
    return (<>
    {state === null || isLoading ? <Loading text="Loading......" />:
        <Boxes>
            <HeaderBox style={{position:"relative"}}>
                <Title>{state?.name}</Title>
                <Link to={"/top30coins/"}>
                    <Home>🏠︎ HOME</Home>
                </Link>
            </HeaderBox>
                <MainBox>
                <CoinBox>
                    <CoinItem>
                        <span>RANK</span>
                        <span>{coin?.rank}</span>
                    </CoinItem>
                    <CoinItem>
                        <span>SYMBOL</span>
                        <span>{coin?.symbol}</span>
                    </CoinItem>
                    <CoinItem>
                        <span>Open Source</span>
                        <span>{coin?.open_source.toString().toUpperCase()}</span>
                    </CoinItem>
                </CoinBox>
                <CoinDesc>
                    <span>{coin?.description}</span>
                </CoinDesc>
                <CoinBox>
                    <CoinItem>
                        <span>TOTAL SUPPLY</span>
                        <span>{ticker?.total_supply.toFixed(1)}</span>
                    </CoinItem>
                    <CoinItem>
                    </CoinItem>
                    <CoinItem>
                        <span>MAX SUPPLY</span>
                        <span>{ticker?.max_supply.toFixed(1)}</span>
                    </CoinItem>
                </CoinBox>
                <CoinTabs>
                    <CoinTab active={matchLine ? true : false}>
                    <Link state={{name: `${state?.name}`}} to={`/top30coins/${coinId}/line`}>Chart Ⅰ</Link>
                    </CoinTab>
                    <CoinTab active={matchCandle ? true : false}>
                    <Link state={{name: `${state?.name}`}} to={`/top30coins/${coinId}/candle`}>Chart Ⅱ</Link>
                    </CoinTab>
                    <CoinTab active={matchPrice ? true : false}>
                    <Link state={{name: `${state?.name}`}} to={`/top30coins/${coinId}/price`}>PRICE</Link>
                    </CoinTab>
                </CoinTabs>
                <Outlet />
                </MainBox>
        </Boxes>
    }
    </>)
}