import { TOKEN_MODE_ASSAULT, TOKEN_MODE_SKIRMISH } from './consts';

export const flipOf = mode => mode === TOKEN_MODE_ASSAULT ?
    TOKEN_MODE_SKIRMISH :
    TOKEN_MODE_ASSAULT;
