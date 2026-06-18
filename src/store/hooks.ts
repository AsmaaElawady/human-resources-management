import type { store } from "./store"
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type { RootState, AppDispatch }