document.querySelector('#add_user');
function addRecord(e){
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let sendData = {name, email};
    console.log(sendData);
    fetch("http://localhost:3000 ", {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(sendData),
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        getUser();
        document.getElementById('user_form').reset();
    }).catch((e)=>{
        console.log(e);
    })
}

function getUser(){
    fetch("http://localhost:3000").then((res)=>{
        return res.json();
    }).then((data)=>{
        let users = data.users;
        let outPut=" ";
        users.map((users,index)=>{
            outPut+=`
            <tr>
                  <td>${index+1}</td>
                  <td>${users.name}</td>
                  <td>${users.email}</td>
                  <td>
                   <button>Edit</button>
                   <button onclick="deleteUser('${users._id}')">Delete</button>
                  </td>
              </tr>
            `;
        });
        document.getElementById("users_list").innerHTML = outPut;

    }).catch((e)=>{
        console.log(e);
    })
}

getUser();

function deleteUser(id){
    fetch(`http://localhost:3000/${id}`,{
        method: "DELETE",
    }).then((res) =>{
        return res.json();
    }).then((data)=>{
        getUser();
        console.log(data);
    }).catch((e)=>{
        console.log(e);
    });
}