'use client'

import { Device, devices } from '@/dummyData/devices'
import { smartFarms } from '@/dummyData/smartFarm'
import { accountState } from '@/state/accountState'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import { Modal } from '@mui/material'
import Graph from '@/components/SensorLineChart'

/**
 * /farm/[farmId]
 */

export default function Home() {
    const param = useParams()
    const { farmId } = param

    const userAccount = useRecoilValue(accountState)

    const farmDevices = devices.filter(
        (device) => device.smartFarmId === Number(farmId),
    )

    const [deviceModal, setDeviceModal] = useState<Device | null>(null)

    const closeModalHandler = () => {
        setDeviceModal(null)
    }

    const temperature = [
        { name: 0, value: 10 },
        { name: 1, value: 20 },
        { name: 2, value: 30 },
        { name: 3, value: 40 },
    ]

    const deviceClickHandler = (device: Device) => {
        setDeviceModal(device)
    }

    /**
     * 해당 스마트팜이 유저의 소유인지 확인한다.
     */
    const farms = smartFarms.filter(
        (farm) =>
            farm.id === Number(farmId) && farm.ownerId === userAccount.loggedIn,
    )

    if (farms.length !== 1) {
        return (
            <div className="m-10 text-2xl font-bold">
                <p className="mb-3">
                    해당 농장은 본인의 소유가 아니거나 존재 하지 않습니다.
                </p>
                <p>다른 농장을 선택해 주세요</p>
            </div>
        )
    }

    const [currentFarm] = farms

    return (
        <main className="p-10">
            <div className="">
                <p className="inline border-b-2 border-dotted border-black text-4xl font-bold">
                    {currentFarm.name}
                </p>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4">
                <div className="m-5 h-[300px] p-5 shadow-lg">
                    <p className="border-b p-1 text-[20px] font-bold">온도</p>
                    <Graph
                        data={temperature}
                        dataKey="value"
                        margin={[20, 40, 5, 0]}
                        color="red"
                    />
                </div>
                <div className="m-5 h-[300px] p-5 shadow-lg">
                    <p className="border-b p-1 text-[20px] font-bold">습도</p>
                    <Graph
                        data={temperature}
                        dataKey="value"
                        margin={[20, 40, 5, 0]}
                        color="blue"
                    />
                </div>
                <div className="m-5 h-[300px] p-5 shadow-lg">
                    <p className="border-b p-1 text-[20px] font-bold">Co2</p>
                    <Graph
                        data={temperature}
                        dataKey="value"
                        margin={[20, 40, 5, 0]}
                        color="black"
                    />
                </div>
                <div className="m-5 h-[300px] p-5 shadow-lg">
                    <p className="border-b border-gray-100 p-1 text-[20px] font-bold">
                        pH
                    </p>
                    <Graph
                        data={temperature}
                        dataKey="value"
                        margin={[20, 40, 5, 0]}
                        color="green"
                    />
                </div>
            </div>
            <div>
                <p className="m-5 text-2xl font-bold">기기제어</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
                    {farmDevices.map((device) => {
                        return (
                            <div
                                key={device.id}
                                className="m-3 cursor-pointer rounded-lg bg-gray-50 p-5 shadow-md"
                                onClick={() => {
                                    deviceClickHandler(device)
                                }}
                                role="presentation"
                            >
                                <div className="flex flex-row justify-between">
                                    <p>{device.name}</p>
                                    <PowerSettingsNewIcon
                                        className={`${device.power ? 'text-green-300' : 'text-gray'}`}
                                    />
                                </div>
                                <div className="mt-5 grid grid-cols-1">
                                    <div className="mx-2 flex flex-row justify-between">
                                        <p className="font-bold">연결 상태</p>
                                        <p>{device.connection}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {deviceModal && (
                <Modal open={deviceModal !== null}>
                    <div
                        className="fixed left-0 top-0 z-10 flex h-[100vh] w-[100%] items-center justify-center bg-[#00000055]"
                        onClick={() => {
                            closeModalHandler()
                        }}
                        role="presentation"
                    >
                        <div className="w-[500px] rounded-lg bg-white p-5">
                            <div className="flex flex-row items-center justify-between">
                                <p>{deviceModal.name}</p>
                                <PowerSettingsNewIcon
                                    className={`${deviceModal.power ? 'text-green-300' : 'text-gray'}`}
                                />
                                <button
                                    type="submit"
                                    onClick={() => {
                                        closeModalHandler()
                                    }}
                                    className="cursor-pointer rounded-lg bg-red-300 px-3 py-2"
                                >
                                    닫기
                                </button>
                            </div>
                            <div className="mt-5 flex flex-row items-center justify-between">
                                <p>연결상태</p>
                                <div className="mx-3 h-[1px] flex-1 border-separate border-b border-dashed border-gray-600" />
                                <p>{deviceModal.connection}</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </main>
    )
}
