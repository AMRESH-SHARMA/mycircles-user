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

export const dateInMonths = (param) => {

  const dum = param.split(' ')[0].split('-')
  const index = dum[1]
  const arr = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return (arr.at(index - 1) + ' ' + dum[2] + ', ' + dum[0])
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
    const myString = param.split(" ", 2)
    if (myString.length === 1)
      return myString[0].charAt(0).toUpperCase()
    else {
      return myString[0].charAt(0).toUpperCase() + myString[1].charAt(0).toUpperCase()
    }
  }
}

export const randomColor = (param) => {
  if (param) {
    const myString = param.split(" ", 2)
    if (myString.length === 1)
      var numb = myString[0].charAt(0).toUpperCase().charCodeAt(0)
    else {
      var numb = myString[0].charAt(0).toUpperCase().charCodeAt(0) + myString[1].charAt(0).toUpperCase().charCodeAt(0)
    }
    const index = numb.toString().slice(-1)
    const arr = ["#f1c40f", "#27ae60", "#0000ff", "#d35400", "#3498db", "#2980b9", "#e74c3c", "#c0392b", "#8e44ad", "#21A1B3"];
    return arr.at(index)
  }
}

// local storage items
// localStorage.removeItem("authToken");
// localStorage.removeItem("container_iid");
// localStorage.removeItem("containerName");
// localStorage.removeItem("current_user_id");