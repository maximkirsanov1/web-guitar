export const logout = async (removeCookie, navigate) => {
  removeCookie("access");
  removeCookie("refresh");
  navigate("/");
  location.reload();
};
