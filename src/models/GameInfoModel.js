import * as Yup from "yup";

export const GameInfoSchema = Yup.object({
  height: Yup.number()
    .required("Please enter your height")
    .min(100, "Height should be min 100 CM").max(230, "Height should not be greater than 230 CM"),
  weight: Yup.number()
    .required("Please enter your weight")
    .min(15, "Weight should be min 15 KG").max(120, "Weight should not be greater than 120 KG"),
  playing_position: Yup.string(),
  jersey_no: Yup.number()
    .min(1, "Jersey no. must be greater than 1")
    .max(999, "Jersey no. should not be greater than 999")
    .integer("Please enter valid jersey number"),
  about: Yup.string()
    .test('trim', 'About must not contain trailing spaces', (value) => {
      if (value) {
        return value.trimEnd() === value;
      }
      return true;
    })
    .min(10, 'Atleast 10 characters are required')
    .max(120, "Miximum 120 characters are allowed")
    .matches(/^[A-Za-z0-9\s.,\/\-()#]+$/, "Please enter valid characters containing only letters, numbers, spaces, and common punctuation marks.")
});
