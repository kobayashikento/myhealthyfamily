import { FormControl, InputLabel, Select, MenuItem, Typography } from '@material-ui/core';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

const list = ["A-Z Alphabet", "Z-A Alphabet", "Price Low-High", "Price High-Low", "Newest", "Oldest"]

const SortByDropdown = (props) => {
    const matches = useMediaQuery('(min-width:1024px)', { noSsr: true });

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
        matches ?
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
            :
            <div style={{ display: "flex", alignItems: "center" }}>
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