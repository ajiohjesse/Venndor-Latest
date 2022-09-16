export const stringLength = (strg, length) => {
  const string = String(strg);
  const stringArray = Array.from(string);
  const stringLength = stringArray.length;
  if (stringLength > length) {
    stringArray.splice(length);
    stringArray.push("...");
  }
  return stringArray.join("");
};
