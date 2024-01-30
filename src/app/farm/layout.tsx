'use client'

import { accountState } from '@/state/accountState'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [account, setAccount] = useRecoilState(accountState)
    const router = useRouter()

    const logoutHandler = () => {
        setAccount((prev) => {
            router.push('/')
            return {
                ...prev,
                loggedIn: undefined,
            }
        })
    }

    useEffect(() => {
        if (account.loggedIn === undefined) {
            router.push('/')
        }
    }, [])

    return (
        <>
            <header className="m-4 rounded-xl bg-[#76b92b33]">
                <nav className="flex flex-row items-center justify-between px-5">
                    <p className="text-xl font-bold">스마트팜 관리 페이지</p>
                    <button
                        type="submit"
                        className="m-2 rounded-xl bg-red-200 p-3 text-xl"
                        onClick={logoutHandler}
                    >
                        로그아웃
                    </button>
                </nav>
            </header>
            {children}
        </>
    )
}
