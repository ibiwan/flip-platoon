import "./TokenCard.css"

import { rules } from '../../rules'
import { TOKEN_MODE_ASSAULT, TOKEN_MODE_SKIRMISH } from "../../util/consts"
import classNames from "classnames"

export const TokenCard = ({ token }) => {
    const tokenRules = rules.tokens[token.type]

    return (
        <div className='tokenCard'>
            <div className={classNames(
                'tokenName',
                token.color
            )} >{token.type}</div>
            <div className="ruleSection tokenBaseRules">
                <div className="ruleSectionLabel"></div>
                <div className="tokenRule">
                    <div className="ruleLabel">Health: </div>
                    <div className="ruleValue">{token.health} / {token.maxHealth}</div>
                </div>
            </div>
            <div className={classNames(
                'ruleSection',
                'tokenAssaultRules',
                { active: token.mode === TOKEN_MODE_ASSAULT }
            )} >
                <div className="ruleSectionLabel">Assault Mode</div>
                <div className="tokenRule">
                    <div className="ruleLabel">Damage: </div>
                    <div className="ruleValue">{tokenRules[TOKEN_MODE_ASSAULT].damage}</div>
                </div>
                <div className="tokenRule">
                    <div className="ruleLabel">Move Range: </div>
                    <div className="ruleValue">{
                        tokenRules[TOKEN_MODE_ASSAULT].move.min
                        + ' to ' +
                        tokenRules[TOKEN_MODE_ASSAULT].move.max
                    }</div>
                </div>
                <div className="tokenRule">
                    <div className="ruleLabel">Attack Range: </div>
                    <div className="ruleValue">{
                        tokenRules[TOKEN_MODE_ASSAULT].range.min
                        + ' to ' +
                        tokenRules[TOKEN_MODE_ASSAULT].range.max
                    }</div>
                </div>
            </div>
            <div className={classNames(
                'ruleSection',
                'tokenSkirmishRules',
                { active: token.mode === TOKEN_MODE_SKIRMISH }
            )} >
                <div className="ruleSectionLabel">Skirmish Mode</div>
                <div className="tokenRule">
                    <div className="ruleLabel">Damage: </div>
                    <div className="ruleValue">{tokenRules[TOKEN_MODE_SKIRMISH].damage}</div>
                </div>
                <div className="tokenRule">
                    <div className="ruleLabel">Move Range: </div>
                    <div className="ruleValue">{
                        tokenRules[TOKEN_MODE_SKIRMISH].move.min
                        + ' to ' +
                        tokenRules[TOKEN_MODE_SKIRMISH].move.max
                    }</div>
                </div>
                <div className="tokenRule">
                    <div className="ruleLabel">Attack Range: </div>
                    <div className="ruleValue">{
                        tokenRules[TOKEN_MODE_SKIRMISH].range.min
                        + ' to ' +
                        tokenRules[TOKEN_MODE_SKIRMISH].range.max
                    }</div>
                </div>

            </div>
            <div className="ruleSection tokenTargets"></div>
        </div>
    )
}
