export const fieldSxStyle = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#F7F7F7',
        color: "#666666",
        '& fieldset': {
            borderColor: '#DEDEDE',
            borderRadius: 2,
            backgroundColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: 'black', // Change border color on hover
        },
        '&.Mui-focused fieldset': {
            borderColor: 'black', // Change border color on focus
        },


    },
    '& .MuiInputLabel-root': {
        color: "#666666",
        fontSize: 14,
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: "#666666"

    },

}

export const boxSxStyle = {
    '& .MuiTextField-root': { width: '100%' },
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
}

export const buttonSxStyle = {
    backgroundColor: '#000000',
    color: '#fff !important',
    textTransform: "none",
    height: '40px',

    borderColor: 'black', // Normal state
    '&:hover': {
        borderColor: 'black', // On hover
        backgroundColor: '#000000',
    },
    '&:focus': {
        borderColor: 'black', // On focus
    },
}


export const initialValues = {
    name: '',
    username:'',
    password:'',
    countryId:'',
    languageId:'',
    uniqueId:'',
}