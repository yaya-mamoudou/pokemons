import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
    return (
        <Stack screenOptions={{
            headerShadowVisible: false,
            headerBackTitle: ''
        }}>
            <Stack.Screen name='index' options={{ title: 'Pokemons' }} />
            <Stack.Screen name='pokemonDetails' options={{ title: 'Pokemon Detail', headerBackTitle: undefined }} />
        </Stack>
    )
}