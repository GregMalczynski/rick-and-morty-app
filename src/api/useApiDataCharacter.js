import { useState, useEffect } from 'react'

export const useApiDataCharacter = (id) => {

    const [ dataApiCharacter, setDataApiCharacter ] = useState({})

    useEffect(() => {

        const asyncFetch = async () => {
            await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => response.json())
            .then(data => setDataApiCharacter(data))
        }

        asyncFetch()
    }, [id])
        
    return {dataApiCharacter}
    }