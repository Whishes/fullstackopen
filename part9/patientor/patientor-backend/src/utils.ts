import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseString = (label: string, data: unknown): string => {
    if (!data || !isString(data)) {
        throw new Error(`incorrect or missing string ${label}`);
    }
    return data;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("incorrect or missing gender: " + gender)
    };
    return gender;
}

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown }

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientEntry => {
    return {
        name: parseString("name", name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString("ssn", ssn),
        gender: parseGender(gender),
        occupation: parseString("occupation", occupation)
    };
};

export default toNewPatientEntry;