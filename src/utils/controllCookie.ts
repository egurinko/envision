export const setCookie = (token: string, username: string): void => {
  const date: Date = new Date();
  date.setMonth(date.getMonth() + 1);

  let tokenCookie: string = `envision_session=${encodeURIComponent(
    token
  )}; expires=${date.toUTCString()}; path=/`;

  let usernameCookie: string = `envision_username=${encodeURIComponent(
    username
  )}; expires=${date.toUTCString()}; path=/`;

  document.cookie = tokenCookie;
  document.cookie = usernameCookie;
};

export type Cookie = {
  token: string;
  username: string;
}

export const getCookie = (): Cookie => {
  let token: string = "";
  let username: string = "";
  const rows: string[] = document.cookie.split(";");
  rows.forEach(row => {
    const content: string[] = row.split("=");
    if (content[0].replace(/\s/g, "") === "envision_session") {
      token = content[1];
    }
    if (content[0].replace(/\s/g, "") === "envision_username") {
      username = content[1];
    }
  });
  return { token, username };
};

export const removeCookie = (): void => {
  document.cookie = "envision_session=; max-age=0";
  document.cookie = "envision_username=; max-age=0";
};
