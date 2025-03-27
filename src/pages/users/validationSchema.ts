import * as Yup from 'yup';


export const addUserSchema = Yup.object().shape({
  name: Yup.string()
  .trim()
  .min(3, "Name must be at least 3 characters long.") // Minimum length
  .max(50, "Name must be at most 50 characters long.") // Maximum length
  .required("Name is required"),
  
    email: Yup.string()
      .email("Invalid email format")
      .trim()
      .lowercase()
      .required(),
  
      password: Yup.string()
      .min(8, "Password must be at least 8 characters long.")
      .max(30, "Password must be at most 30 characters long.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,30}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
      )
      .required("Password is required"),
    
  });


export const editAgencySchema = Yup.object({
  name: Yup.string()
  .trim()
  .min(3, "Name must be at least 3 characters long.") // Minimum length
  .max(50, "Name must be at most 50 characters long.") // Maximum length
  .required("Name is required"),
  
    email: Yup.string()
      .email("Invalid email format")
      .trim()
      .lowercase()
      .required(),
  
      password: Yup.string()
      .min(8, "Password must be at least 8 characters long.")
      .max(30, "Password must be at most 30 characters long.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,30}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
      )
      .optional()
    


});



export const profileAgencySchema = Yup.object({

  
    email: Yup.string()
      .email("Invalid email format")
      .trim()
      .lowercase()
      .required(),
  
      password: Yup.string()
      .min(8, "Password must be at least 8 characters long.")
      .max(30, "Password must be at most 30 characters long.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,30}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
      )
      .optional(),
    
      name: Yup.string()
      .trim()
      .min(3, "Name must be at least 3 characters long.") // Minimum length
      .max(50, "Name must be at most 50 characters long.") // Maximum length
      .required("Name is required"),
      

});
