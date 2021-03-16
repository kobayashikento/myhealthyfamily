import { FormControl, InputLabel, Select, MenuItem, Typography } from '@material-ui/core';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const CssFormControl = withStyles({
    root: {
        '& .MuiInputBase-root': {
            fontSize: "15px",
            width: "150px"
        },
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
    },
})(FormControl);

const list = ["A-Z Alphabet", "Z-A Alphabet", "Price Low-High", "Price High-Low", "Sale", "Newest", "Oldest"]

const SortByDropdown = (props) => {
    // need collection 
    // need state for keeping track of which sort is active
    const handleChange = (e) => {
        props.setSortBy(e.target.value);
    }

    const createSortByList = () => {
        return (
            list.map((item, index) => {
                return (
                    <MenuItem key={`sortitem-${index}`} style={{ fontSize: "15px" }} value={index}>{item}</MenuItem>
                )
            })
        )
    }

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Typography style={{ fontSize: "15px", marginRight: "15px" }}>
                Sort By
            </Typography>
            <CssFormControl style={{ fontSize: "15px" }}>
                <Select
                    value={props.sortBy}
                    onChange={handleChange}
                >
                    {createSortByList()}
                </Select>
            </CssFormControl>
        </div>
    )
}

export default SortByDropdown;