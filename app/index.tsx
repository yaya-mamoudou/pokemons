import Icon from '@expo/vector-icons/AntDesign'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { fetchPokemons } from '../apiCalls'
import PokemonCard from '../components/PokemonCard'
import { FetchResponse } from '../types'

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const [types, setTypes] = useState<string[]>([])
    const [selectedType, setSelectedType] = useState('')
    const [pokemons, setPokemons] = useState<FetchResponse>({
        results: [],
        count: undefined,
        next: ''
    })

    useEffect(() => {
        getPokemons()
    }, [])

    const filteredList = pokemons.results
        ?.filter((pokemon) => selectedType ? pokemon?.long.types.some((item: any) => item.type.name === selectedType) : true)
        ?.filter((pokemon) => pokemon?.short.name.includes(searchTerm.toLowerCase()))
    const clearSearch = () => setSearchTerm('')

    const getPokemons = (url = '') => fetchPokemons({ types, setLoading, setPokemons, pokemons, setTypes, url: url })

    return (
        <View style={styles.container}>
            <View style={[styles.row, styles.gapSm, styles.screenMargin, styles.inputContainer]}>
                <Icon name="search1" size={20} color='black' />
                <TextInput value={searchTerm} style={{ flex: 1 }} onChangeText={(e) => setSearchTerm(e)} placeholderTextColor="#ccc" placeholder='Search Pokemon' />
                {searchTerm && <TouchableOpacity onPress={clearSearch} style={styles.closeIconContainer}>
                    <Icon name="close" size={12} color='black' />
                </TouchableOpacity>}
            </View>

            <View style={[styles.row, styles.screenMargin, styles.gapSm]}>

                {types.length > 0 &&
                    <FlatList
                        horizontal
                        data={types}
                        style={styles.filterItemContainer}
                        contentContainerStyle={{ gap: 10, }}
                        renderItem={({ item }) => (
                            <Pressable style={[styles.centerXY, styles.filterItem, item == selectedType && { backgroundColor: '#bbb' }]} onPress={() => setSelectedType(item)}>
                                <Text style={{ textTransform: 'capitalize' }}>{item}</Text>
                            </Pressable>)}
                        keyExtractor={item => item}
                    />
                }

                {types.length === 0 &&
                    <FlatList
                        horizontal
                        data={Array(7).fill('')}
                        style={[styles.filterItemContainer, { marginBottom: 10 }]}
                        contentContainerStyle={{ gap: 10, }}
                        renderItem={({ item }) => (
                            <MotiView
                                from={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ type: 'timing' }}
                            >
                                <Skeleton
                                    colorMode='light'
                                    height={50}
                                    width={150}
                                    transition={{ type: 'timing' }}
                                />
                            </MotiView>)}
                        keyExtractor={(_, index) => index.toString()}
                    />}

                {selectedType && <TouchableOpacity onPress={() => setSelectedType('')}>
                    <Text style={{ color: '#2096F3' }} >Reset</Text>
                </TouchableOpacity>}
            </View>

            {
                pokemons.results.length > 0 &&
                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 18, paddingVertical: 20 }}
                    onEndReached={() => getPokemons(pokemons.next)}
                    keyExtractor={item => item.short.name}
                    onEndReachedThreshold={0}
                    ListEmptyComponent={searchTerm ? <NotFound /> : null}
                    data={filteredList}
                    numColumns={2}
                    renderItem={({ item, index }) => <PokemonCard item={item} index={index} />}
                />
            }

            {filteredList.length === 0 && searchTerm === '' &&
                <FlatList
                    contentContainerStyle={{ paddingHorizontal: 18, paddingVertical: 20 }}
                    onEndReached={() => getPokemons(pokemons.next)}
                    keyExtractor={(_, index) => index.toFixed()}
                    data={Array(6).fill('')}
                    numColumns={2}
                    renderItem={({ item, index }) => <PokemonCard index={index} loader={true} />}
                />
            }

            <ActivityIndicator animating={pokemons.results.length > 0 && loading} style={{ display: loading ? 'flex' : 'none' }} color="#000" />
        </View>
    )
}

const NotFound = () => <Text style={{ textAlign: 'center' }}>No pokemon found</Text>



export const styles = StyleSheet.create({
    inputContainer: {
        padding: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        borderColor: '#aaa',
    },

    filterItemContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        height: 65,
        backgroundColor: '#fff'
    },

    filterItem: {
        paddingHorizontal: 20,
        backgroundColor: '#eee',
        borderRadius: 10
    },
    closeIconContainer: {
        backgroundColor: '#eeeeee',
        padding: 5,
        borderRadius: 30
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    gapSm: {
        gap: 10
    },
    centerXY: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenMargin: {
        marginHorizontal: 18,
    }

})