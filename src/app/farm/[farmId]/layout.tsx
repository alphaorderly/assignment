'use client'

import { smartFarms } from '@/dummyData/smartFarm'
import { accountState } from '@/state/accountState'
import { useRouter } from 'next/navigation'
import { useEffect, useState, ChangeEvent } from 'react'
import { useRecoilValue } from 'recoil'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const userAccount = useRecoilValue(accountState)
    const ownFarm = smartFarms.filter(
        (farm) => farm.ownerId === userAccount.loggedIn,
    )

    const router = useRouter()

    const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === '') return
        router.push(`/farm/${event.target.value}`)
    }

    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        mounted && (
            <>
                <header className="ml-10 mt-10">
                    <label>
                        <span className="mr-5 font-bold">
                            스마트팜 선택하기
                        </span>
                        <select
                            id="farmSelect"
                            defaultValue=""
                            onChange={selectHandler}
                            className="rounded-lg border-[1px] border-gray-700 p-1 shadow-md"
                        >
                            <option value="">농장을 선택해주세요</option>
                            {ownFarm.map((farm) => {
                                return (
                                    <option key={farm.id} value={farm.id}>
                                        {farm.name}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                </header>
                {children}
            </>
        )
    )
}
