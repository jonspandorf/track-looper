import {  MenuItem, Select } from '@material-ui/core'

const SelectMenu = ({options, addTrack, isPlayingAll}) => {


    const onAddTrack = (value) => {
        addTrack(value)
    }


    return(
        <div className=" d-flex justify-content-center">
        <div className="text-muted me-4 ms-4">
            Select Track
        </div>
        <Select onChange={e => onAddTrack(e.target.value)}>
        {options.map(option => {
            return(
                <MenuItem disabled={isPlayingAll} key={option.Id} value={option.Id}>{option.owner}</MenuItem>
            )
        })}
    </Select>
    </div>
    )
}

export default SelectMenu