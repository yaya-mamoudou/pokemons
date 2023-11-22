export type Pokemon = {
    short: {
        name: string,
        img: string
    },
    long: any
}

export type FetchResponse = {
    results: Pokemon[],
    count: number | undefined,
    next: string,
}