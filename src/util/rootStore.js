import { createContext, useContext } from "react";

import { makeBoardStore } from 'feature/board';

let _store;

const StoreContext = createContext(undefined);

const makeRootStore = () => ({
    boardStore: makeBoardStore(),
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
