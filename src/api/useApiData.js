import { useState, useEffect } from 'react'

export const useApiData = (page, searchValue) => {

    const [ dataApi, setDataApi ] = useState([])

    useEffect(() => {
              
        fetch('https://rickandmortyapi.com/graphql', {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            query: `
            query {
                characters(page: ${page}, filter: { name: "${searchValue}"}) {
                info {
                    count
                }
                    results {
                        id
                        name
                        image
                        status
                        species
                        type
                        gender
                    }
                }
            }
            `
            })
        })
        
        .then(response => {
            if ( !response.ok) {
                throw new Error()
            } 
            return response.json()
        })
        .then(data => {
            setDataApi(data) 
            console.log(data)
        })
        
    }, [page, searchValue])

    return {dataApi}
    }