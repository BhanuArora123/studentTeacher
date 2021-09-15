document.getElementById("signup").addEventListener("click",() => {
  fetch("http://localhost:3000/signup",{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          email:document.getElementById("emailId").value,
          password:document.getElementById("pass").value,
          name:document.getElementById("username").value,
          accountType:document.getElementById("accountType").value
      })
  })
  .then((res) => {
      return res.json();
  })
  .then((data) => {
      console.log(data);
  })
})
document.getElementById("login").addEventListener("click",() => {
    fetch("http://localhost:3000/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:document.getElementById("emailId1").value,
            password:document.getElementById("pass1").value,
            accountType:document.getElementById("accountType1").value
        })
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
    })
  })