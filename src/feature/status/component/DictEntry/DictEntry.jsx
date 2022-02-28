import './DictEntry.css'

export const DictEntry = ({ k, v }) => {
    return (
        <div className='dict-entry' >
            <div className='dict-key'>{k}:</div>
            <div className='dict-val'>{v}</div>
        </div >
    );
};
