window.onload = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    document.getElementById("studName").innerHTML = userData.name;
    let fav = "";
    userData.fav_teachers.forEach(element => {
        fav += `<div class="container d-flex justify-content-center">
        <div class="container h-100p">${element.teacherId.name}</div>
        <button endpoint='${element.teacherId._id}' class="btn btn-primary h-25">Remove</button>
    </div>`
    });
    // document.getElementById("favTeacher").innerHTML = fav;
    // fetch("http://localhost:3000/mostFav",{
    //     headers:{
    //         "Authorization":`Bearer ${localStorage.getItem("jwtToken")}`
    //     }
    // })
    // .then((res) => {
    //     return res.json();
    // })
    // .then((data) => {
    //     console.log(data);
    // })
    fetch("http://localhost:3000/getTeacher", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
}