export const setTokenToCookie = token => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);

  let cookie = `envision_session=${encodeURIComponent(
    token
  )}; expires=${date.toUTCString()}; path=/`;

  if (process.env.NODE_ENV !== "development") {
    cookie += "; secure";
  }

  console.log("TOKEN", cookie);
  document.cookie = cookie;
};

export const getTokenFromCookie = () => {
  let token = "";
  const rows = document.cookie.split(";");
  rows.forEach(row => {
    const content = row.split("=");
    if (content[0] === "token") {
      token = content[1];
    }
  });
  return token;
};
