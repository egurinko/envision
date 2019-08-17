export const setCookie = (token, username) => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);

  let tokenCookie = `envision_session=${encodeURIComponent(
    token
  )}; expires=${date.toUTCString()}; path=/`;

  let usernameCookie = `envision_username=${encodeURIComponent(
    username
  )}; expires=${date.toUTCString()}; path=/`;

  // if (process.env.NODE_ENV !== "development") {
  //   cookie += "; secure";
  // }

  document.cookie = tokenCookie;
  document.cookie = usernameCookie;
};

export const getCookie = () => {
  let token = "";
  let username = "";
  const rows = document.cookie.split(";");
  rows.forEach(row => {
    const content = row.split("=");
    if (content[0].replace(/\s/g, "") === "envision_session") {
      token = content[1];
    }
    if (content[0].replace(/\s/g, "") === "envision_username") {
      username = content[1];
    }
  });
  return { token, username };
};

export const removeCookie = () => {
  document.cookie = "envision_session=; max-age=0";
  document.cookie = "envision_username=; max-age=0";
};
