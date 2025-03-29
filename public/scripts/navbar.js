const isOnline = async () => {
  try {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    const url = "/api/auth/online";
    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
    const selector = document.querySelector("#opts");
    if (response.user_id) {
      // reonderizar opociones correctas + signout
      selector.innerHTML = `
      <a class="btn btn-success py-1 px-2 m-1" href="/carts/:${response.user_id}"> Cart</a>
      <a class="btn btn-success py-1 px-2 m-1" href="/profile/${response.user_id}"> Profile</a>
      <button class="btn btn-success py-1 px-2 m-1" id="signout">Sign Out</button>
    `;
      document.querySelector("#signout").addEventListener("click", async () => {
        try {
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          };
          const url = "/api/auth/signout";
          response = await fetch(url, opts);
          location.replace("/");
        } catch (error) {
          throw error;
        }
      });
    } else {
      // renerizar las opciones correctas
      selector.innerHTML = `
        <a class="btn btn-success py-1 px-2 m-1" href="/register"> Register</a>
        <a class="btn btn-success py-1 px-2 m-1" href="/login"> Login</a>
    `;
    }
  } catch (error) {
    throw error;
  }
};

isOnline()
