
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateContainLowerCase = (password) => {
  return String(password).match(/(?=.*[a-z])/);
};

export const validateContainUpperCase = (password) => {
  return String(password).match(/(?=.*[A-Z])/);
};

export const validateContainNumber = (password) => {
  return String(password).match(/(?=.*[0-9])/);
};

export const validateContainCharacters = (password) => {
  return String(password).match(/.{8,}/);
};

export const validateNotContainSpace = (password) => {
  return String(password).match(/^\S+$/);
};

export const getFirstLetter = (string) => {
  if (typeof string === "string" && string.length > 0) {
    return string[0];
  } else {
    return "";
  }
};

export const formatISOToCustomDate = (isoDateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(isoDateString);
  return date.toLocaleDateString("en-US", options);
};
