import { avatarPlaceholderUrl } from "../configs";

export const genPlaceholderUrl = (firstName: string, lastName: string) => {
  const upperFirstCharOfFirstName = firstName.charAt(0).toUpperCase();
  const upperFirstCharOfLastName = lastName.charAt(0).toUpperCase();
  const fullName = `${upperFirstCharOfFirstName}+${upperFirstCharOfLastName}`;
  return `${avatarPlaceholderUrl}/?name=${fullName}&size=250`;
};
