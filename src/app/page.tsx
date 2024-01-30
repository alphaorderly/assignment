'use client'

import { accounts } from '@/dummyData/account'
import { accountState } from '@/state/accountState'
import { Alert } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'

/**
 * [ROOT PAGE]
 */

export default function Home() {
    const loginInputRef: React.RefObject<HTMLInputElement> = useRef(null)
    const [account, setAccount] = useRecoilState(accountState)
    const [loginFail, setLoginFail] = useState(false)
    const router = useRouter()
    let loginTimeout: NodeJS.Timeout | null = null

    if (account.loggedIn !== undefined) {
        console.log(account)
        router.push('/farm')
    }

    const loginHandler = () => {
        if (
            accounts.filter((item) => item.id === loginInputRef.current?.value)
                .length === 1
        ) {
            setAccount((prev) => {
                return {
                    ...prev,
                    loggedIn: accounts[0].id,
                }
            })
        } else if (loginTimeout === null) {
            setLoginFail(true)
            loginTimeout = setTimeout(() => {
                setLoginFail(false)
            }, 1000)
        }
    }

    const enterHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            loginHandler()
        }
    }

    return (
        <main className="mt-60 flex-row">
            {loginFail && (
                <div className="w-50 fixed left-3 top-3 h-10">
                    <Alert>아이디가 틀렸습니다.</Alert>
                </div>
            )}
            <div className="flex-row">
                <p className="text-center text-4xl font-bold">로그인</p>
                <p className="text-1xl my-10 text-center font-bold">
                    아이디를 입력하십시오
                </p>
            </div>
            <div className="text-center">
                <input
                    className="hover:translate-1 duration-50 h-10 w-[300px] rounded-md border-[1px] border-solid border-black px-2 shadow-sm shadow-gray-300 transition ease-in-out hover:scale-105"
                    placeholder="ID 를 입력해주세요"
                    ref={loginInputRef}
                    onKeyDown={enterHandler}
                />
            </div>
            <div className="flex-row items-center text-center">
                <button
                    type="submit"
                    className="text-1xl m-8 rounded-lg bg-[#90db0d66] p-3 transition duration-100 ease-in hover:bg-[#90db0dFF]"
                    onClick={loginHandler}
                >
                    로그인
                </button>
            </div>
        </main>
    )
}


