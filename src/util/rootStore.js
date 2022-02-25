import { createContext, useContext } from "react";

import { getBoardStore } from 'feature/board';
import { getTurnStore } from 'feature/turn';

let _store;

const StoreContext = createContext(undefined);

const makeRootStore = () => ({
    boardStore: getBoardStore(),
    turnStore: getTurnStore(),
});

export const RootStoreProvider = ({ children }) => {
    _store = _store ?? makeRootStore();

    return <StoreContext.Provider value={_store}>{children}</StoreContext.Provider>;
};

export function useRootStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useRootStore must be used within RootStoreProvider");
    }

    return context;
}
