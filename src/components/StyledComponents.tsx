import styled from "styled-components";

export const Boxes = styled.div`
    max-width: 520px;
    min-width: 320px;
    margin: 0px auto;
    flex-grow: 1;
`;
export const HeaderBox = styled.div`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const MainBox = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0px 12px;
`;
export const Title = styled.h1`
    color: ${props => props.theme.accentColor};
    font-size: 32px;
    font-weight: bold;
`;