export const signout = () => {
  localStorage.removeItem("authToken");
  window.location.reload();
  return true;
};

