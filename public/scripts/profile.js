

const find = async () => {
  try {
    const token = localStorage.getItem("token")
    const opts = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
       }
    
    };
    const url = "/api/auth/profile";
    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
    if (response.error) {
      alert(response.error);
    } else {
        document.querySelector("#name").innerHTML = response.response.name
        document.querySelector("#avatar").src = response.response.avatar;
        
    }
  } catch (error) {
    alert(error);
  }
}

find()
