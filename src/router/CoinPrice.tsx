import { useQuery } from "@tanstack/react-query"
import { getLatestOHLCV } from "../api"
import styled from "styled-components";
import Loading from "../components/Loading";
import { useParams } from "react-router";

interface IOHLCV{
    time_open: string,
    time_close: string,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    market_cap: number,
}
const Boxes = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 32px 12px;
    margin: 12px 20px;
    background-color: #3a665d;
    border-radius: 28px;
`;
const Box = styled.div`
    color: whitesmoke;
    display: grid;
    grid-template-columns: 1fr 0.5fr 1.5fr ;
    margin: 0px 20px;
    border-bottom: 1px solid white;
    span{
        padding: 4px 0px;
        font-size: 18px;
    }
    span.info__arr{
        text-align: center;
    }
    span.info__value{
        text-align: end;
    }
`;
export default function CoinPrice(){
    const {coinId} = useParams<string>();
    const {isLoading, data} = useQuery<IOHLCV[]>({
        queryKey: ["coin", coinId, "price"],
        queryFn: () => getLatestOHLCV(coinId!)
    })
    const info = data?.[0];
    return (
    <>
        {isLoading ? <Loading text="Wait plz......" /> : 
        <Boxes>
            <Box>
                <span>TIME OPEN</span>
                <span className="info__arr">&rarr;</span>
                <span className="info__value">{info?.time_open}</span></Box>
            <Box>
                <span>TIME CLOSE</span>
                <span className="info__arr">&rarr;</span>
                <span className="info__value">{info?.time_close}</span></Box>
            <Box>
                <span>OPEN</span>
                <span className="info__arr">&rarr;</span>
                <span className="info__value">{info?.open.toFixed(2)}</span></Box>
            <Box>
                <span>LOW</span>
                <span className="info__arr">&rarr;</span>
                <span className="info__value">{info?.low.toFixed(2)}</span></Box>
            <Box>
                <span>HIGH</span>
                <span className="info__arr">&rarr;</span>
                <span className="info__value">{info?.high.toFixed(2)}</span></Box>
            <Box>
                <span>CLOSE</span>
                <span className="info__arr">&rarr;</span>
                <span className="info__value">{info?.close.toFixed(2)}</span></Box>
            <Box>
                <span>MARKET CAP</span>
                <span className="info__arr">&rarr;</span>
                <span className="info__value">{info?.market_cap.toFixed(2)}</span></Box>
            <Box>
                <span>VOLUME</span>
                <span className="info__arr">&rarr;</span>
                <span className="info__value">{info?.volume.toFixed(2)}</span></Box>
        </Boxes>
        }
    </>
    )
}