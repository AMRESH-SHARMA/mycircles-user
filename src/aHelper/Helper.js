export const signout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("container_iid");
  localStorage.removeItem("containerName");
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
    return d + ' days ago';
  }
}

export const scpage = () => {
  let url = window.location.href;
  let slug = url.split("/")[3];
  if (slug && slug === "c") {
    return true;
  }
  else return false;
}

export const letterGenerate = (param) => {
  if (param) {
    const myArray = param.split(" ", 2)
    if (myArray.length === 1)
      return myArray[0].charAt(0)
    else {
      return myArray[0].charAt(0) + myArray[1].charAt(0)
    }
  }
}

export const randomColor = () => {
  const arr = ["#f1c40f", "#27ae60","#0000ff", "#d35400", "#3498db", "#2980b9", "#e74c3c", "#c0392b", "#8e44ad"];
  const num = Math.floor(Math.random() * 9);
  return arr[num]
}

// local storage items
// localStorage.removeItem("authToken");
// localStorage.removeItem("container_iid");
// localStorage.removeItem("containerName");
// localStorage.removeItem("current_user_id");