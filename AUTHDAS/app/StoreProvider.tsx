'use client'
import { makeStore } from "@/lib/store"
import { useState } from "react"
import { Provider } from "react-redux"

interface ReduxProviderProps {
    children?: React.ReactNode 
}

export default function StoreProvider({ children } : ReduxProviderProps) {
    const [store] = useState(makeStore)
    return <Provider store={store}>{children}</Provider>
}
