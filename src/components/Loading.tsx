import styled from "styled-components"

const Boxes = styled.div`
    width: 100%;
`;
const Text = styled.div`
    margin: 50px auto;
    display: flex;
    justify-content: center;
    gap: 8px;
    font-size: 32px;
    font-weight: bold;
    color: #16A085;
`;
interface IProps{
    text:string
}
export default function Loading({text}:IProps){
    return <Boxes>
        <Text>{[...text].map((c,i) => <span key={i}>{c}</span>)}</Text>
    </Boxes>
}