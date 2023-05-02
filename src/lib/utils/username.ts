export function isValidUsername(username: string) {
  const regex = /^[a-zA-Z0-9][a-zA-Z0-9_ ]{2,24}$/;
  return regex.test(username);
}
