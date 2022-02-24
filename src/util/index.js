

export const anArray = length => Array.apply(null, Array(length));

export const ijkey = (i, j) => `${i}-${j}`;

export const rand = (max) => Math.floor(Math.random() * max);

export const dist = ({ i, j }, { i: m, j: n }) =>
    Math.max(
        Math.abs(i - m),
        Math.abs(j - n)
    );

let _allCells = null;
export const getAllCells = boardSize => {
    if (!_allCells) {
        _allCells = anArray(boardSize).flatMap((a, i) =>
            anArray(boardSize).map((a, j) =>
                ({ i, j, key: ijkey(i, j) })
            )
        );
    }

    return _allCells;
};
