export const checkEmptyValue = (value) => {
  if (value.trim() === "") {
    return false;
  }
  return true;
};

export const checkEmail = (email) => {
  return /^(?!.*[А-Яа-я])(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@[a-zA-Z]+(\.[a-zA-Z]{2,})+$/iu.test(
    email
  );
};

export const checkSpaces = (value) => {
  return !/^\s|\s$/.test(value);
};
export const checkRussianLetters = (value) => {
  return /^[а-яёА-ЯЁ]+$/.test(value);
};
const checkPassword = (pass, pass2) => {
  if (pass !== pass2) {
    return false;
  }
  return true;
};

export const validation = (data) => {
  let error = null;
  const { name, email, pass, pass2 } = data;
  if (
    (name && !checkEmptyValue(name)) ||
    !checkEmptyValue(email) ||
    !checkEmptyValue(pass) ||
    (pass2 && !checkEmptyValue(pass2))
  ) {
    error = "Все поля должны быть заполнены!";
    return error;
  }
  if (!checkEmail(email)) {
    error = "Неверный формат электронной почты!";
    return error;
  }
  if (
    (name && !checkSpaces(name)) ||
    !checkSpaces(email) ||
    !checkSpaces(pass) ||
    (pass2 && !checkSpaces(pass2))
  ) {
    error = "Пробелы в начале или конце строк недопустимы!";
    return error;
  }
  if (!checkRussianLetters(name) && name) {
    error = "В поле имени должны быть русские буквы";
    return error;
  }
  if (!checkPassword(pass, pass2) && pass2) {
    error = "Пароли не совпадают!";
    return error;
  }
  return true;
};
