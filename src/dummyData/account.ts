export type Account = {
    id: string
    name: string
    smartFarms: number[]
}

export const accounts: Account[] = [
    {
        id: 'test',
        name: 'test_name',
        smartFarms: [0, 1],
    },
    {
        id: 'test2',
        name: 'test_name_2',
        smartFarms: [2, 3],
    },
]
