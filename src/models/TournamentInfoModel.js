import * as Yup from "yup";

const validFileExtensions = { image: ['jpg', 'png', 'jpeg'] };

function isValidFileType(fileName, fileType) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}
const today = new Date();
today.setHours(0, 0, 0, 0)

export const TournamentInfoSchema = (isEdit) => Yup.object({
  tournament_name: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .matches(/^(?!.*\s{2})[\w\d\s!@#$%^&*()-_=+|~`{}[\]:;"'<>,.?\\]+$/, "Please enter valid tournament name")
    .min(5, "Team name must be at least 5 characters")
    .max(40, "Team name should not be more than 40 characters")
    .required("Please Enter Tournament Name "),
  tournament_logo: Yup.mixed()
    .test("is-valid-type", "Logo should be in jpg, jpeg or png format",
      value => {
        if (!value) {
          return true; // skip validation if value is empty
        }
        return isValidFileType(value && value.name.toLowerCase(), "image")
      })
    .test("is-valid-size", "Max allowed size is 2MB", value => {
      if (!value) {
        return true;
      }
      return value && value.size <= 2097152
    }),

  address: Yup.string()
    .test('trim', 'Must not contain leading or trailing spaces', (value) => {
      if (value) {
        return value.trim() === value;
      }
      return true;
    })
    .matches(/^[A-Za-z0-9\s.,\/\-()#]+$/, "No special characters are allowed except for periods (.), commas (,), hash symbols (#), and hyphens (-)")
    .required("Please Enter Address")
    .min(5, 'Atleast 5 characters are required')
    .max(120, "Miximum 120 characters are allowed"),

  tournament_category: Yup.object().shape({
    boys: Yup.boolean(),
    girls: Yup.boolean(),
    men: Yup.boolean(),
    women: Yup.boolean(),
    mixed: Yup.boolean(),
  }).test('has-category', 'Please Select Tournament Category', (value) =>
    Object.values(value).some(Boolean)
  ),

  starting_date: Yup.date()
    .max(
      Yup.ref('ending_date'), "End date can't be before Start date"
    )
    .required("Please Select Start Date")
    .min(today, "Date cannot be in the past"),

  ending_date: Yup.date()
    .min(
      Yup.ref('starting_date'), "End date can't be before Start date"
    )
    .required('Please Select End Date'),

  age_cutoff: Yup.object().shape({
    under_14: Yup.boolean(),
    under_16: Yup.boolean(),
    under_17: Yup.boolean(),
    under_19: Yup.boolean(),
    under_21: Yup.boolean(),
    under_25: Yup.boolean(),
    under_27: Yup.boolean(),
  }).test('has-category', 'Please Select Age CutOff', (value) =>
    Object.values(value).some(Boolean)
  ),

  tournament_level: Yup.string().required("Please Select Tournament Level"),

  referees: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .test('trim', 'Must not contain leading or trailing spaces', (value) => {
          if (value) {
            return value.trim() === value;
          }
          return true;
        })
        .matches(/^[A-Za-z]+(?: [A-Za-z]+(?: [A-Za-z]+)?)?(?: [A-Za-z]+(?: [A-Za-z]+)?)?$/, "Please enter valid name")
        .min(2, "Referee name must be at least 2 characters")
        .max(25, "Referee name should not be more than 25 characters")
        .test('-is-name-required', 'Referee name is required', function (value) {
          const { mobile } = this.parent;
          if (!mobile && !value) {
            return true; // both fields are optional
          }
          if (mobile && !value) {
            return false; // referee name is required when mobile is provided
          }
          return true;
        }),

      mobile: Yup.string()
        .test('trim', 'Must not contain leading or trailing spaces', (value) => {
          if (value) {
            return value.trim() === value;
          }
          return true;
        })
        .matches(/^[1-9][0-9]{9}$/, "Please valid mobile number")
        .min(10, "Mobile number should be at least 10 digits")
        .max(10, "Mobile number should not be more than 10 digits")
        .test('is-mobile-required', 'Referee mobile is required', function (value) {
          const { name } = this.parent;
          if (!name && !value) {
            return true; // both fields are optional
          }
          if (name && !value) {
            return false; // mobile is required when referee name is provided
          }
          return true;
        }),
      type: Yup.string()
        .test('is-type-required', 'Select referee type', function (value) {
          const { name } = this.parent;
          if (!name && !value) {
            return true; // both fields are optional
          }
          if (name && !value) {
            return false; // referee type is required when referee name is provided
          }
          return true;
        })
    })
  ),

  sponsors: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .test('trim', 'Must not contain leading or trailing spaces', (value) => {
          if (value) {
            return value.trim() === value;
          }
          return true;
        })
        .matches(/^[A-Za-z0-9\s.,&'-]+$/, "Please valid sponsor name")
        .min(3, "Sponsor name must be at least 3 characters")
        .max(25, "Sponsor name should not be more than 25 characters")
        .when('logo', {
          is: (logo) => !!logo,
          then: Yup.string().required('Sponsor name is required'),
          otherwise: Yup.string().optional(),
        }),
      logo: Yup
        .mixed()
        .test('fileSize', 'Logo is required', function (value) {
          const { name } = this.parent;
          if (isEdit && value) {
            return true
          }
          if (!name && !value) {
            return true; // both fields are optional
          }
          if (name && !value) {
            return false; // logo is required when sponsor name is provided
          }
          return true; // all other cases are valid
        })
        .test("is-valid-type", "Logo should be in jpg, jpeg or png format",
          value => {
            if (!value) return true
            if (!value.name && !value.size) return true
            return isValidFileType(value && value.name.toLowerCase(), "image")
          }
        )
        .test("is-valid-size", "Max allowed size is 2MB",
          value => {
            if (!value) return true
            if (!value.name && !value.size) return true
            return value && value.size <= 2097152
          }
        )
    })
  ),
});