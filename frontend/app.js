async function login(){
  try{
    const res = await fetch("http://localhost:5000/api/users/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      })
    });

    if(!res.ok){
      alert("Login failed");
      return;
    }

    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data));
    window.location.href = "dashboard.html";

  }catch(err){
    console.error(err);
    alert("Backend not connected");
  }
}