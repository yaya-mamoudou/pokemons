import { api } from "./service/api"
import axios from 'axios'

type Props = {
    url?: string,
    pokemons: any,
    setLoading: any,
    setPokemons: any,
    setTypes: any,
    types: string[]

}

export const fetchPokemons = async ({ url, pokemons, setLoading, setPokemons, setTypes, types, }: Props) => {

    setLoading(true)
    try {
        const typesTemp: string[] = [...types]
        const res1 = await api.get(url || `/pokemon/?limit=8&offset=0`)
        let data = res1.data

        const res2 = await axios.all(data.results.map((pokemon: any) => api.get(pokemon.url)))
        let pokemonData = res2.map((res: any) => {
            res.data.types.forEach((item: any) => {
                if (!typesTemp.includes(item.type.name)) typesTemp.push(item.type.name)
            })
            return { short: { name: res.data.name, img: res.data.sprites.other['official-artwork'].front_default }, long: res.data }
        })
        data.results = pokemonData

        if (url) data = { ...data, results: [...pokemons.results, ...pokemonData] }

        setTypes(typesTemp)
        setPokemons(data)
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
}