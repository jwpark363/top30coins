import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getCoinOHLCV } from "../api";
import Loading from "../components/Loading";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

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

export default function Candlestick(){
    const {coinId} = useParams<string>();
    const {isLoading, data} = useQuery<IOHLCV[]>({
        queryKey: ["coin", coinId, "chart"],
        queryFn: () => getCoinOHLCV(coinId!)
    });

    const options: ApexOptions = {
        chart: {
            height: 300,
            width: 400,
            toolbar: {
                show: false
            }
        },
        xaxis: {
            type: "datetime",
            labels:{
                show: false,
            },
            axisBorder:{
                show: false
            },
            axisTicks:{
                show: false
            }
        },
        yaxis:{
            labels:{
                show: false
            }
        },
    };

    const series = [{
        data: data?.map(d => ({
            x: new Date(d.time_close),
            y: [Number(d.open), Number(d.high), Number(d.low), Number(d.close)]
        })) || []
    }];
    return (<>
        {isLoading ? <Loading text="Wait plz......" /> : 
            <Chart 
                type="candlestick" 
                options={options}
                series={series}
            />
        }
    </>)
}