'use client'
import { makeStore } from "@/lib/store"
import { useState } from "react"
import { Provider } from "react-redux"


export default function StoreProvider({ children }) {
    const [store] = useState(makeStore)
    return <Provider store={store}>{children}</Provider>
}