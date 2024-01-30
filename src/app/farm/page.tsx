'use client'

import { smartFarms } from '@/dummyData/smartFarm'
import { accountState } from '@/state/accountState'
import { useRecoilValue } from 'recoil'
import { devices } from '@/dummyData/devices'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

/**
 * /farm
 */

export default function Home() {
    const userAccount = useRecoilValue(accountState)
    const router = useRouter()

    const myFarm = smartFarms.filter(
        (farm) => farm.ownerId === userAccount.loggedIn,
    )

    const clickFarmHandler = (id: number) => {
        router.push(`/farm/${id}`)
    }

    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        mounted && (
            <main>
                <div className="m-10">
                    <p className="inline border-b-2 border-dotted border-black text-2xl font-bold sm:text-4xl">
                        운영중인 농장을 선택해주세요
                    </p>
                </div>
                <div className="m-20 grid grid-cols-1 sm:grid-cols-5">
                    {myFarm.map((farm) => {
                        return (
                            <div
                                onClick={() => {
                                    clickFarmHandler(farm.id)
                                }}
                                key={farm.id}
                                className="m-1 cursor-pointer rounded-lg bg-gray-100 p-4 shadow-lg shadow-gray-400 transition-colors duration-100 ease-in hover:bg-gray-400 sm:m-4"
                                role="presentation"
                            >
                                <p className="border-b border-gray-600 text-[20px]">
                                    {farm.name}
                                </p>
                                <div className="mt-5 grid grid-cols-2">
                                    {devices
                                        .filter(
                                            (device) =>
                                                device.smartFarmId === farm.id,
                                        )
                                        .map((device) => {
                                            return (
                                                <div
                                                    key={device.id}
                                                    className="m-1 sm:m-2"
                                                >
                                                    <div className="flex flex-row justify-between">
                                                        <p>{device.name}</p>
                                                        <PowerSettingsNewIcon
                                                            className={`${device.power ? 'text-green-300' : 'text-gray'}`}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        )
    )
}
