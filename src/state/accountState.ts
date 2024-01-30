import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()


export type AccountState = {
    loggedIn?: string
}

export const accountStateInitial: AccountState = {
    loggedIn: undefined,
}

export const accountState = atom<AccountState>({
    key: 'accountState',
    default: accountStateInitial,
    effects_UNSTABLE: [persistAtom],
})
