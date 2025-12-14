export const classNames = (classes: string[]) => {
  let className = "";
  classes.map((c) => (className = className + " " + c));
  return className;
};
