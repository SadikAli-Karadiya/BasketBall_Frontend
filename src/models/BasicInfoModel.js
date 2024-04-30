import * as Yup from "yup";

export const basicInfoSchema = Yup.object({
  first_name: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .min(3, "Minimum 3 characters are required")
    .max(25, "Miximum 25 characters are allowed")
    .required("Please enter your first name")
    .matches(/^[a-zA-Z]{2,}(?: [a-zA-Z]{1,})?$/, "* Please enter valid first name"),
  middle_name: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .min(3, "Minimum 3 characters are required")
    .max(25, "Miximum 25 characters are allowed")
    .matches(/^[a-zA-Z]{2,}(?: [a-zA-Z]{1,})?$/, "* Please enter valid second name"),
  last_name: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .min(3, "Minimum 3 characters are required")
    .max(25, "Miximum 25 characters are allowed")
    .required("Please enter your last name")
    .matches(/^[a-zA-Z]{2,}$/, "* Please enter valid last name"),
  mobile: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .min(10, "Please enter valid mobile no")
    .max(10, "Please enter valid mobile no")
    .required("Please enter your mobile number")
    .matches(/^[1-9][0-9]{9}$/, "* Please enter valid mobile number"),
  alternate_mobile: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .min(10, "Please enter valid mobile no").max(10, "Please enter valid mobile no")
    .matches(/^[1-9][0-9]{9}$/, "* Please enter valid mobile number"),
  date_of_birth
    : Yup.date()
      .max(new Date(), 'Please select valid DOB')
      .required("Please enter your date of birth")
      .nullable(),
  gender: Yup.string().required("Please select gender"),
  pincode: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .min(6, "Please enter valid pincode").max(6, "Please enter valid pincode").required("Please Enter Your Pincode")
    .matches(/^\d{6}$/, "* Please enter valid pincode"),
});
