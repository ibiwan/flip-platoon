export const HealthBar = ({ pctHealth }) => {
    return (
        <div className='healthBarMax'>
            <div
                className='healthBarCurrent'
                style={{ width: `${pctHealth}%` }}
            />
        </div>
    )
}
