const emailPatternRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

const acadstaffLinkPatternRegex = /(^https:\/\/acadstaff.ugm.ac.id\/)/g

export const emailValidation = {
  required: "Email harus diisi.",
  pattern: {
    value: emailPatternRegex,
    message: "Mohon masukkan email dengan format yang benar."
  }
}

export const passwordValidation = {
  required: "Password harus diisi.",
  minLength: {
    value: 7,
    message: "Password minimal 8 kata."
  }
}

export const requiredValidation = {
  required: "Isian ini harus diisi."
}

export const acadstaffLinkValidation = {
  required: "Link acadstaff harus diisi.",
  pattern: {
    value: acadstaffLinkPatternRegex,
    message: "Mohon masukkan link acadstaff yang valid."
  }
}
