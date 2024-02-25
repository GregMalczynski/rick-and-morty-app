import { useState, useEffect } from 'react'
import ShowCharacter from './ShowCharacter'
import styled from 'styled-components'
import { useApiData } from '../api/useApiData'
import CharacterInfo from './CharacterInfo'
import { useApiDataCharacter } from '../api/useApiDataCharacter'
import image from '../../public/logo.svg'

const Main = () => {

    const [ page, setPage ] = useState(1)
    const [ searchValue, setSearchValue] = useState("")
    const [ isCharacterInfoVisible, setIsCharacterInfoVisible ] = useState(false)
    const [ pageButtons, setPageButtons ] = useState()
    const [ id, setId ] = useState(0)

    const { dataApi } = useApiData(page, searchValue)
    const { dataApiCharacter } = useApiDataCharacter(id)
    
    const pagesCount = Math.ceil(dataApi.data?.characters.info.count / 20)

    useEffect(() => {
        if ( pagesCount ) {
            const arr = []
                for ( let i = 0; i < pagesCount; i++ ) {
                    arr.push(i)
                }
            setPageButtons(arr)
            console.log('Array ' + arr)
        }
    }, [])
    
    console.log('pageButton ' + pageButtons)
    
    const handleChangeSearchValue = (e) => {
        setPage(1)
        setSearchValue(e.target.value)
    }

    return(
        <MainWrapper>
            <PopUpWrapper isCharacterInfoVisible={isCharacterInfoVisible}>
                <CharacterInfo 
                    isCharacterInfoVisible={isCharacterInfoVisible} 
                    setIsCharacterInfoVisible={setIsCharacterInfoVisible}
                    dataApiCharacter={dataApiCharacter}
                    setId={setId}
                />   
            </PopUpWrapper>
            <PageContainer isCharacterInfoVisible={isCharacterInfoVisible}>
                <Logo>
                    <img style={{width: "420px"}} src={image} alt="image"/>
                </Logo>
                <InputWrapper>
                    <input value={searchValue} onChange={handleChangeSearchValue} placeholder="Search Character..."/>
                </InputWrapper>
                <ItemList>
                    {dataApi.data?.characters?.results.length > 0 ?                   
                    (dataApi.data?.characters?.results.map((item, index) => {
                        return <ShowCharacter 
                            key={index} 
                            item={item} 
                            isCharacterInfoVisible={isCharacterInfoVisible} 
                            setIsCharacterInfoVisible={setIsCharacterInfoVisible}
                            setId={setId}
                        />
                    })) : <div>No results...</div>
                }
                </ItemList>
                <PagesButtons>
                    {pageButtons?.map((item, index) => {
                        return <PageButton key={index} onClick={() => setPage(index + 1)}>{index + 1}</PageButton>
                    })}
                </PagesButtons>
            </PageContainer>
        </MainWrapper>
    )
}

export default Main;

const MainWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(52,64,75);
    background: linear-gradient(180deg, rgba(52,64,75,1) 6%, rgba(89,143,143,1) 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const PageContainer = styled.div`
    z-index: 1;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 15px;
    filter: ${props => props.isCharacterInfoVisible ? 'blur(15px)' : 'blur(0px)'};
`
const PagesButtons = styled.div`
    width: 1400px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
`
const PageButton = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: #00000020;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.5s;

    &:hover{
        background-color: #00000040;;
    }
`
const ItemList = styled.div`
    width: 1400px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
`

const PopUpWrapper = styled.div`
    z-index: 2;
    visibility: ${props => props.isCharacterInfoVisible ? 'visible' : 'hidden'};
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #00000080;
`
const Logo = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    input{
        width: 50%;
        background: none;
        border: 1px solid #ffffff40;
        color: white;
        font-size: 20px;
        padding: 8px;
        border-radius: 10px;
        transform: 0.5s;
    }
    input:focus {
        border: 1px solid #ffffff70;
        outline: none;
        
    }
    
    ::placeholder {
        color: #d5ff43;
        opacity: 1; /* Firefox */
      }
`