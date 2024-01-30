export enum DeviceConnectionState {
    NOT_CONNECTED = '연결 안됨',
    CONNECTING = '연결 중',
    CONNECTED = '연결 됨',
}

export type Device = {
    id: number
    name: string
    connection: DeviceConnectionState
    smartFarmId: number
    power: boolean
}

export const devices: Device[] = [
    {
        id: 0,
        name: 'device_0',
        connection: DeviceConnectionState.NOT_CONNECTED,
        smartFarmId: 0,
        power: false,
    },
    {
        id: 1,
        name: 'device_1',
        connection: DeviceConnectionState.CONNECTED,
        smartFarmId: 0,
        power: true,
    },
    {
        id: 2,
        name: 'device_2',
        connection: DeviceConnectionState.CONNECTING,
        smartFarmId: 1,
        power: false,
    },
    {
        id: 3,
        name: 'device_3',
        connection: DeviceConnectionState.CONNECTED,
        smartFarmId: 1,
        power: true,
    },
    {
        id: 4,
        name: 'device_4',
        connection: DeviceConnectionState.CONNECTED,
        smartFarmId: 2,
        power: false,
    },
    {
        id: 5,
        name: 'device_5',
        connection: DeviceConnectionState.CONNECTED,
        smartFarmId: 2,
        power: true,
    },
    {
        id: 6,
        name: 'device_6',
        connection: DeviceConnectionState.CONNECTED,
        smartFarmId: 3,
        power: true,
    },
    {
        id: 7,
        name: 'device_7',
        connection: DeviceConnectionState.CONNECTED,
        smartFarmId: 3,
        power: false,
    },
]
