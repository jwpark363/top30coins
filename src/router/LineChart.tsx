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

export default function LineChart(){
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
            categories: data?.map(d => d.time_close) || [],
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
        grid:{
            show: true
        },
        fill:{
            type:"gradient",
            gradient:{
                gradientToColors:["red","blue"],
                stops: [0, 70, 100]
            }
        }
    };

    const series = [
        {
            name: "price",
            data: data?.map(d => Number(d.close)) || []
        }
    ];
    return (<>
        {isLoading ? <Loading text="Wait plz......" /> : 
            <Chart 
                type="line" 
                options={options}
                series={series}
            />
        }
    </>)
}