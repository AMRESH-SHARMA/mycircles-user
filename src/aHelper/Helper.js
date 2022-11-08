export const signout = () => {
  localStorage.removeItem("authToken");
  window.location.reload();
  return true;
};

export const noofdays = (param) => {
  let a = new Date().toISOString().slice(0, 10).replace('-', '').replace('-', '');
  let currentDate = parseInt(a);
  let b = param.slice(0, 10).replace('-', '').replace('-', '');
  let postDate = parseInt(b)
  let d = (currentDate - postDate)
  if (d === 0) {
    return 'now';
  } else if (d === 1) {
    return '1 day ago';
  } else {
    return d+' days ago';
  }
}
