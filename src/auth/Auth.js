
export const isAutheticated = () => {
  if (localStorage.getItem("authToken")) {
    return true;

  } else {
    return false;
  }
};

export const isAuthenticatedToken = () => {
  if (localStorage.getItem("authToken")) {
    return localStorage.getItem("authToken");

  } else {
    return false;
  }
};

// export const currentUserData = async () => {
//   // const { token } = JSON.parse(localStorage.getItem("authToken"))
//   try {

//     const result = await axios.get('/auth/current', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       })

//     const userData = result
//     // console.log(userData)
//     return userData
//   } catch (err) {
//     console.warn(err);
//   }
// }

export const signout = () => {
  localStorage.removeItem("authToken");
  // localStorage.removeItem("userData");
  window.location.reload();
  return true;
};

