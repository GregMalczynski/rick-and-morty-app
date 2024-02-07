import styled from 'styled-components'
import { useState } from 'react'

const ShowCharacter = ({item, isCharacterInfoVisible, setIsCharacterInfoVisible, setId}) => {

    const [ isCharacterMouseEnter, setIsCharacterMouseEnter ] = useState(false)

    const handleClickCharacter = () => {
        setId(item.id)
        setIsCharacterInfoVisible(!isCharacterInfoVisible)
    }

    return(
        <Wrapper 
            onClick={handleClickCharacter} 
            onMouseEnter={() => setIsCharacterMouseEnter(true)} 
            onMouseLeave={() => setIsCharacterMouseEnter(false)}
        >
            <TextWrapper>
                <p><b>{item.name}</b></p>
                <OpenDetails isCharacterMouseEnter={isCharacterMouseEnter}>
                    <p>See Details</p>
                </OpenDetails>
            </TextWrapper>
            <ImageWrapper>
                <img style={{width: "130px"}} src={item.image} />
            </ImageWrapper>   
        </Wrapper>
    )
}

export default ShowCharacter;

const Wrapper = styled.div`
    width: 130px;
    background-color: #00000040;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    border-radius: 10px;
    text-align: center;
    line-height: 16px;
    color: white;
    cursor: pointer;
    overflow: hidden;
    transform: translate(0px, 0px);
    transition: 0.5s;

    &:hover {
        background-color: #00000060;
        transform: translate(-5px, -5px);
        box-shadow: 7px 7px 5px #00000030;
    }
`
const ImageWrapper = styled.div`
    height: 130px;
    display: flex;
`

const TextWrapper = styled.div`
`

const OpenDetails = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 130px;
    height: 130px;
    background-color: #00000085;
    transform: ${props => props.isCharacterMouseEnter ? "translate(0px, 0px)" : "translate(0px, 130px)"};
    transition: 0.5s;

    p{
        color: #d5ff43;
    }
`