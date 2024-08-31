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



// export const eventSchema = yup.object().shape({
//   title: yup.string().required('Title is required'),
//   category: yup.string().required('Category is required'),
//   description: yup.string().required('Description is required'),
//   startDate: yup.date().required('Start date is required'),
//   endDate: yup.date()
//     .min(yup.ref('startDate'), 'End date must be after start date')
//     .required('End date is required'),
//   location: yup.object().shape({
//     address1: yup.string().required('Address line 1 is required'),
//     city: yup.string().required('City is required'),
//     state: yup.string().required('State is required'),
//     pincode: yup.string().required('Pincode is required'),
//   }),
//   entryType: yup.string().oneOf(['Free', 'Paid'], 'Invalid entry type').required('Entry type is required'),
//   ticketDetails: yup.array().when('entryType', {
//     is: 'Paid',
//     then: yup.array().of(
//         yup.object().shape({
//         type: yup.string().required('Ticket type is required'),
//         seats: yup.number().min(1, 'At least one seat is required').required('Number of seats is required'),
//         price: yup.number().min(0, 'Price must be positive').required('Price is required')
//       })
//     ),
//     otherwise: yup.array().of(
//         yup.object().shape({
//         type: yup.string().notRequired(),
//         seats: yup.number().notRequired(),
//         price: yup.number().notRequired()
//       })
//     )
//   })
// });
