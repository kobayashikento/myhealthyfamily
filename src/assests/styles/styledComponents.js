import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledTextFieldContact = withStyles({
    root: {
        '& .MuiInputLabel-outlined': {
            fontSize: "13px",
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "0px",
        },
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiInputBase-root': {
            fontSize: "15px",
            height: "50px"
        },
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "0px",
            width: "250px",
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'black',
            },
        },
    },
})(TextField);

const StyledTextFieldHeader = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiInputBase-root': {
            fontSize: "14px"
        }
    },
})(TextField);

const linkStyle = { color: "inherit", textDecoration: "none" }

export {
    StyledTextFieldContact,
    StyledTextFieldHeader,
    linkStyle
}