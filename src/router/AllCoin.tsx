import { Link } from "react-router";
import styled from "styled-components";
import { getAllCoin, getIconURL } from "../api";
import Loading from "../components/Loading";
import { Boxes, HeaderBox, Title, MainBox } from "../components/StyledComponents";
import { useQuery } from "@tanstack/react-query";

const Item = styled.div`
    padding: 4px;
    color: ${props => props.theme.backgroundColor};
    background-color: whitesmoke;
    font-size: 20px;
    border-radius: 12px;
    a{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        color: inherit;
        transition: color 0.2s linear;
        padding: 12px 24px;
        &:hover{
            color: ${props => props.theme.accentColor};
        }
        span{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`;
interface ICoin{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}
export default function AllCoin(){
    const {isLoading, data: coins} = useQuery<ICoin[]>({
        queryKey: ['coin','all'],
        queryFn: getAllCoin,
    });
    return (
        <Boxes>
            <HeaderBox>
                <Title>Coin(Top 30)</Title>
            </HeaderBox>
            {isLoading ? <Loading text="Loading......" /> :
            <MainBox>
                <MainBox>
                    {coins?.slice(0,30).map(coin => <Item key={coin.id}>
                        <Link state={{name: `${coin.name}`}} to={`/top30coins/${coin.id}`}>
                            <img src={getIconURL(coin.id)} 
                            style={{width:"40px", height:"40px"}}/>
                            <span>{coin.name}</span><span>&rarr;</span>
                        </Link>
                    </Item>)}
                </MainBox>
            </MainBox>
            }
        </Boxes>        
    )
}