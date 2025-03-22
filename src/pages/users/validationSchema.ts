import * as Yup from 'yup';


export const addUserSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(),
  
    email: Yup.string()
      .email("Invalid email format")
      .trim()
      .lowercase()
      .required(),
  
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long.")
      .max(30, "Password must be at most 30 characters long.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
      .required()
  });


export const editAgencySchema = Yup.object({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),

        username: Yup.string()
            .min(4, "Username must be at least 4 characters")
            .max(20, "Username must be at most 20 characters")
            .matches(/^(?!.*[_.]{2})[a-zA-Z0-9][a-zA-Z0-9._]{2,18}[a-zA-Z0-9]$/,
                "Username can only contain letters, numbers, underscores, and dots. It must start and end with a letter or number, and cannot have consecutive special characters."
            )
            .required("Username is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .matches(/\d/, "Password must contain a number")
                .matches(/[!@#$%^&*]/, "Password must contain a special character")
                .required("Password is required"),
                countryId: Yup.string().required("Country ID is required"),
    languageId: Yup.string().required("Language ID is required"),
    uniqueId: Yup.string().required("Unique ID is required"),


});
