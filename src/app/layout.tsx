'use client'

import './globals.css'
import { RecoilRoot } from 'recoil'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" title="sangsangfarm">
            <RecoilRoot>
                <body>{children}</body>
            </RecoilRoot>
        </html>
    )
}
