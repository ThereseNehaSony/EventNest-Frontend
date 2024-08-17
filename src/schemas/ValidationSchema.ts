// import * as yup from 'yup';

// export const ValidationSchema = yup.object().shape({
//     username: yup.string().min(2).max(25).matches(/^\S*$/, 'Username cannot contain spaces').required("User name is required"),
//     email: yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
//     password: yup.string()
//     .required("Password is required")
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//       "Password must be at least 8 characters and include uppercase letter, lowercase letter,and special character"
//     )
//     .max(20, "Must be less than 20 characters"),
//     confirmPassword: yup.string()
//     .required("Confirm your password")
//     .oneOf([yup.ref("password")], "Passwords must Match"),
// })

import * as yup from 'yup';

export const ValidationSchema = yup.object().shape({
    username: yup.string()
        .min(2, "Username must be at least 2 characters")
        .max(25, "Username cannot exceed 25 characters")
        .matches(/^\S*$/, 'Username cannot contain spaces')
        .required("User name is required"),
    email: yup.string()
        .email("Invalid email address")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid email format"
        )
        .required("Email is required"),
    password: yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must be at least 8 characters and include uppercase letter, lowercase letter, and special character"
        )
        .max(20, "Must be less than 20 characters"),
    confirmPassword: yup.string()
        .required("Confirm your password")
        .oneOf([yup.ref("password")], "Passwords must match"),
});
