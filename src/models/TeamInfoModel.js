import * as Yup from "yup";

export const TeamInfoSchema = Yup.object({
  team_name: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .matches(/^(?!.*\s{2})[\w\d\s!@#$%^&*()-_=+|~`{}[\]:;"'<>,.?\\]+$/, "Please enter valid team name")
    .min(5, "Team name must be at least 5 characters")
    .max(30, "Team name should not be more than 30 characters")
    .required("Please Enter Team Name ")
    .matches(/^\s*\S[\s\S]*$/, "Invalid Name"),

  coach_name: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .matches(/^[A-Za-z]+(?: [A-Za-z]+(?: [A-Za-z]+)?)?(?: [A-Za-z]+(?: [A-Za-z]+)?)?$/, "Please enter valid name")
    .min(3, "Coach name must be at least 3 characters")
    .max(25, "Coach name should not be more than 25 characters"),

  coach_mobile: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .matches(/^[1-9][0-9]{9}$/, "Please enter valid mobile number")
    .min(10, "Mobile number should be at least 10 digits")
    .max(10, "Mobile number should be at least 10 digits"),

  asst_coach_name: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .matches(/^[A-Za-z]+(?: [A-Za-z]+(?: [A-Za-z]+)?)?(?: [A-Za-z]+(?: [A-Za-z]+)?)?$/, "Please enter valid name")
    .min(3, "Asst. Coach name must be at least 3 characters")
    .max(25, "Asst. Coach name should not be more than 25 characters"),

  asst_coach_mobile: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .matches(/^[1-9][0-9]{9}$/, "Please valid mobile number")
    .min(10, "Mobile number should be at least 10 digits")
    .max(10, "Mobile number should be at least 10 digits"),
});
