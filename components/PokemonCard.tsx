import { View, Text, useWindowDimensions, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
import { Pokemon } from '../types'
import { typeColors } from '../typeColors'

export default function PokemonCard({ item, index, loader = false }: { item?: Pokemon, index: number, loader?: boolean }) {
    const router = useRouter()
    const { width } = useWindowDimensions()
    const cardWidth = ((width - 18 * 2) - 20 * 1) / 2
    const style = { width: cardWidth, marginBottom: 20, marginRight: (index + 1 % 2 !== 0) ? 20 : 0, }

    if (!loader && item) return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => router.push({ pathname: '/pokemonDetails', params: { item: encodeURI(JSON.stringify(item)) } })}
            style={[styles.pokemonCard, style,]}
        >
            <Image source={{ uri: item.short.img }} style={styles.img} />
            <Text style={styles.pokemonName}>{item.short.name}</Text>
            <View style={[styles.gapSm, styles.row]}>
                {item.long.types.map((item: any) => <View key={item.type.name} style={[styles.badge, { backgroundColor: typeColors[item.type.name] }]}>
                    <Text key={item.type.name} style={styles.badgeText}>{item.type.name}</Text>
                </View>)}
            </View>
        </TouchableOpacity>
    )

    if (loader) return (
        <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing' }}
            style={[styles.pokemonCard, style,]}
        >
            <Skeleton
                colorMode='light'
                height={50}
                width={cardWidth}
                transition={{ type: 'timing' }}
            />
        </MotiView>
    )


}

const styles = StyleSheet.create({
    img: { width: 100, height: 100 },
    pokemonCard: {
        minHeight: 150,
        backgroundColor: '#eee',
        borderRadius: 8,
        padding: 10,
        width: '100%',
    },
    pokemonName: {
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'capitalize',
        marginBottom: 10,
        marginTop: 15
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
    ,
    badge: {
        borderRadius: 4, padding: 5,
    },
    badgeText: { color: '#fff', textTransform: 'capitalize' },
})

