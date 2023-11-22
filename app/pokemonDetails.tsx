import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { typeColors } from '../typeColors';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

export default function pokemonDetails() {
    const router: any = useRoute()
    const data = JSON.parse(decodeURI(router.params.item))
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <ScrollView style={[styles.container, styles.screenHorizontal]}>
            <StatusBar style="auto" translucent />
            <Image onLoad={() => setImageLoaded(true)
            } source={{ uri: data.short.img }} style={styles.image} />
            {!imageLoaded && <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing' }}
                style={[styles.image, { position: 'absolute' }]}
            >
                <Skeleton
                    colorMode='light'
                    height={250}
                    width={'100%'}
                    transition={{ type: 'timing' }}
                />
            </MotiView>}
            <Text style={styles.title}>{data.short.name}</Text>

            <View style={styles.section2}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 18 }}>{data.long.weight} KG</Text>
                    <Text style={styles.section2Label}>Weight</Text>
                </View>

                {data.long.types.map((item: any) => (
                    <View key={item.type.name} style={[styles.badge, { backgroundColor: typeColors[item.type.name] }]}>
                        <Text style={styles.badgeText}>{item.type.name}</Text>
                    </View>
                ))}

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 18 }}>{data.long.height} M</Text>
                    <Text style={styles.section2Label}>Height</Text>
                </View>
            </View>

            <View style={styles.section3}>
                {data.long.stats.map((item: any) => (
                    <View key={item.stat.name} style={[styles.row]}>
                        <Text style={styles.section3Label}>{item.stat.name}</Text>
                        <View style={{ height: 4, backgroundColor: '#ddd', width: 150 }} >
                            <View style={{ height: 4, backgroundColor: '#aaa', width: `${item.base_stat}%` }} />
                        </View>
                        <Text style={styles.baseStat}>{item.base_stat}</Text>
                    </View>
                ))}
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20
    },
    section3: { backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 16, padding: 10, marginTop: 25, gap: 5 },
    section3Label: { textTransform: 'capitalize', marginRight: 'auto' },
    image: { width: 250, height: 250, alignSelf: 'center', marginTop: 50 },
    section2Label: { fontSize: 11, fontWeight: 'bold' },
    title: { fontSize: 25, fontWeight: 'bold', textAlign: 'center' },
    baseStat: { width: 25, marginLeft: 10, textAlign: 'right' },
    section2: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 20 },
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
    screenHorizontal: {
        paddingHorizontal: 18,
    },
    badge: {
        borderRadius: 4, padding: 5, paddingHorizontal: 10, justifyContent: 'center'
    },
    badgeText: { color: '#fff', textTransform: 'capitalize', fontSize: 14, fontWeight: 'bold' },
})