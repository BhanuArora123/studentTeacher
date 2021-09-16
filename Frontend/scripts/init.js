window.onload = () => {
    let fav = "";
    fetch("http://localhost:3000/favTeacher", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
        }
    })
        .then(res => res.json())
        .then((data) => {
            data.userData.fav_teachers.forEach(element => {
                fav += `<div class="container d-flex justify-content-center">
            <div class="container h-100p">${element.teacherId.name}</div>
            <button  endpoint='${element.teacherId._id}' class="remove btn btn-primary h-25">Remove</button>
        </div>`
            });
            document.getElementById("favTeacher").innerHTML = fav;
        })
        .then(() => {
            console.log(" i am executed")
            for (let i = 0; i < document.getElementsByClassName("remove").length; i++) {
                const element = document.getElementsByClassName("remove")[i];
                console.log(element);
                element.addEventListener("click", function () {
                    fetch(`http://localhost:3000/removeFav/${this.getAttribute("endpoint")}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("jwtToken")
                        }
                    })
                        .then(res => res.json())
                        .then((data) => {
                            console.log(data);
                        })
                })
            }
        })
        .catch(err => console.log(err))
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
            let chooseTeacher = "";
            data.teacherData.forEach((element) => {
                chooseTeacher += `<option value='${element.email}'>${element.name}</option>`
            })
            document.getElementById("teachers").innerHTML = chooseTeacher;
            console.log("done");
            return;
        })
    try {
        document.getElementById("addFav").addEventListener("click", () => {
            fetch("http://localhost:3000/addFav", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    teacher: document.getElementById("teachers").value
                })
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    document.getElementById("favTeacher").innerHTML += `<div class="container d-flex justify-content-center">
        <div class="container h-100p">${data.teacherData.name}</div>
        <button id="remove" endpoint='${data.teacherData._id}' class="btn btn-primary h-25 remove">Remove</button>
    </div>`;
                })
        })
    } catch (error) {

    }
}