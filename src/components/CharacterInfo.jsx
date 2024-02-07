import styled from 'styled-components'
import { useState, useEffect } from 'react'

const CharacterInfo = ({isCharacterInfoVisible, setIsCharacterInfoVisible, dataApiCharacter, setId}) => {

    const [ isAlive, setIsAlive ] = useState()
    const { id, name, status, species, gender, location, created } = dataApiCharacter

    const handleClickClose = () => {
        setIsCharacterInfoVisible(!isCharacterInfoVisible)
        setId()
    }

    useEffect(() => {
        if ( dataApiCharacter.status === 'Alive' ) {
            setIsAlive(true)
        } else {
            setIsAlive(false)
        }
    }, [dataApiCharacter, setId])


    return(
        <>
        { dataApiCharacter.name ? (
            <Wrapper>
                <div>
                    <img style={{width: "370px", borderRadius: "10px"}} src={dataApiCharacter.image} />
                </div>
                <CharacterData>
                    <div>id: <p>{id}</p></div>
                    <div>name: <p>{name}</p></div>
                    <div>status: <p><Alive isAlive={isAlive}></Alive>{status}</p></div>
                    <div>species: <p>{species}</p></div>
                    <div>gender: <p>{gender}</p></div>
                    <div>location: <p>{location?.name}</p></div>
                    <div>Created: <p>{created}</p></div>
                    <CloseButton onClick={handleClickClose}>Close</CloseButton>
                </CharacterData>
        </Wrapper>
            
        ) : <Loading>Loading...</Loading>
        
        
        }
     </>
    )
}

export default CharacterInfo;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

const CharacterData = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    line-height: 0px;
    gap: 10px;

    p{  
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
        color: #fbe4a3;
    }
`
const Alive = styled.div`
    display: flex;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    background-color: ${props => props.isAlive ? "green" : "red"}
`

const CloseButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 28px;
    border-radius: 10px;
    background-color: black;
    cursor: pointer;
`

const Loading = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`