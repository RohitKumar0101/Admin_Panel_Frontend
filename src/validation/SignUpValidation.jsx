import * as Yup from "yup"

export const SignUpValidation = async (obj) => {   

    const SignUpSchema = Yup.object().shape({
        name: Yup.string().min(2, "Name is Too short").required("Name  is Required"),
        email: Yup.string().email("!Invlid email").required("Email is Required"),
        password: Yup.string().min(3, "Password is Too Short!").required("Password is Required"),
        confirmPassword: Yup.string().min(3, "Too Short!").max(15, "Too Long!").required("Required"),
        mobile:Yup.number().min(3,"minimum 3 number").required("Required")
    })
    try {
        const ValidationError = await SignUpSchema.validate(obj, {abortEarly:false})
        console.log(ValidationError, 'yyyy')
        return ValidationError;
    }
    catch (err) {
    //  console.log(err);
    return err.errors;
    }
}