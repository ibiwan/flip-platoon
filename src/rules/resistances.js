import { TOKEN_ARCHERS, TOKEN_ARTILLERY, TOKEN_CAVALRY, TOKEN_INFANTRY, TOKEN_MODE_ASSAULT, TOKEN_MODE_SKIRMISH } from "../util/consts";

export const resistances = {
    _attacker: { _target: '_damage_multiplier' },
    [`${TOKEN_ARCHERS}-${TOKEN_MODE_SKIRMISH}`]: { // aimed fire
        // to:
        [`${TOKEN_INFANTRY}-${TOKEN_MODE_SKIRMISH}`]: 0.5,// shields forward
        [`${TOKEN_CAVALRY}-${TOKEN_MODE_ASSAULT}`]: 0.5,// lance & shield
        [`${TOKEN_ARTILLERY}-${TOKEN_MODE_ASSAULT}`]: 0,// immune to arrows
        [`${TOKEN_ARTILLERY}-${TOKEN_MODE_SKIRMISH}`]: 0,// immune to arrows
    },
    [`${TOKEN_ARCHERS}-${TOKEN_MODE_ASSAULT}`]: { // arced fire
        [`${TOKEN_INFANTRY}-${TOKEN_MODE_ASSAULT}`]: 0.5,// shields overhead
        [`${TOKEN_CAVALRY}-${TOKEN_MODE_SKIRMISH}`]: 0.5,// near allies
        [`${TOKEN_ARTILLERY}-${TOKEN_MODE_ASSAULT}`]: 0,// immune to arrows
        [`${TOKEN_ARTILLERY}-${TOKEN_MODE_SKIRMISH}`]: 0,// immune to arrows
    },
    [`${TOKEN_INFANTRY}-${TOKEN_MODE_SKIRMISH}`]: { // shield wall
        [`${TOKEN_INFANTRY}-${TOKEN_MODE_SKIRMISH}`]: 0.5,// shields forward
        [`${TOKEN_CAVALRY}-${TOKEN_MODE_ASSAULT}`]: 0.5,// lance & shield
        [`${TOKEN_ARTILLERY}-${TOKEN_MODE_ASSAULT}`]: 0.5,// resist blows
        [`${TOKEN_ARTILLERY}-${TOKEN_MODE_SKIRMISH}`]: 0.5,// resist blows
    },
    [`${TOKEN_INFANTRY}-${TOKEN_MODE_ASSAULT}`]: { // scream and run
        [`${TOKEN_INFANTRY}-${TOKEN_MODE_SKIRMISH}`]: 0.5,// shields forward
        [`${TOKEN_CAVALRY}-${TOKEN_MODE_ASSAULT}`]: 0.5,// lance & shield
        [`${TOKEN_ARTILLERY}-${TOKEN_MODE_ASSAULT}`]: 0.5,// resist blows
        [`${TOKEN_ARTILLERY}-${TOKEN_MODE_SKIRMISH}`]: 0.5,// resist blows
    },
    [`${TOKEN_CAVALRY}-${TOKEN_MODE_ASSAULT}`]: { // lance charge
        [`${TOKEN_INFANTRY}-${TOKEN_MODE_SKIRMISH}`]: 0.5,// shields forward
        [`${TOKEN_CAVALRY}-${TOKEN_MODE_ASSAULT}`]: 0.5,// lance & shield
    },
    [`${TOKEN_CAVALRY}-${TOKEN_MODE_SKIRMISH}`]: { // swinging saber
        [`${TOKEN_INFANTRY}-${TOKEN_MODE_SKIRMISH}`]: 0.5,// shields overhead
        [`${TOKEN_CAVALRY}-${TOKEN_MODE_ASSAULT}`]: 0.5,// lance & shield
    },
    [`${TOKEN_ARTILLERY}-${TOKEN_MODE_SKIRMISH}`]: { // moving; can't fire
        [`${TOKEN_ARCHERS}-${TOKEN_MODE_SKIRMISH}`]: 0,
        [`${TOKEN_ARCHERS}-${TOKEN_MODE_ASSAULT}`]: 0,
        [`${TOKEN_INFANTRY}-${TOKEN_MODE_SKIRMISH}`]: 0,
        [`${TOKEN_INFANTRY}-${TOKEN_MODE_ASSAULT}`]: 0,
        [`${TOKEN_CAVALRY}-${TOKEN_MODE_SKIRMISH}`]: 0,
        [`${TOKEN_CAVALRY}-${TOKEN_MODE_ASSAULT}`]: 0,
        [`${TOKEN_ARTILLERY}-${TOKEN_MODE_SKIRMISH}`]: 0,
        [`${TOKEN_ARTILLERY}-${TOKEN_MODE_ASSAULT}`]: 0,
    },
};
