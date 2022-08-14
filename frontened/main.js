window.addEventListener("load",()=>{
    getdata();
    
})

let getdata = async ()=>{
    let res = await fetch("http://127.0.0.1:3000/api/todo");
    let data = await res.json();
    // console.log(data);
    append(data);

}

let append = (data)=>{
    let container = document.getElementById("container");
    container.innerHTML = null;

    data.forEach(({title,id,status})=> {
       

        let div1 = document.createElement("div");
        div1.setAttribute("class","box");

        let box = document.createElement("div");
        

        let name = document.createElement("h3");
        name.innerText = title;
    
        let p = document.createElement("p");
        p.innerText = status;

        let toogle = document.createElement("button");
        toogle.innerText = `Toogle`;
        
        toogle.onclick = ()=>{
            update_todo(id);
            toogle.setAttribute("id","toogle");

        }
    
        let remove = document.createElement("button");
        remove.innerText = `Remove`;
        remove.onclick = ()=>{
           delete_todo(id);
        }

        div1.append(name,toogle,remove);

        let div = document.createElement("div");
        div.append(div1);
    
        container.append(div);
    
    });
   
}
// Performing CRUD OPERATION 
// CREATE(POST) , READ(GET), UPDATE(PUT & PATCH) , DELETE(delete);

let add_todo = async ()=>{
    let todo = document.getElementById("todo").value;

    let data = {
        title:todo,
        status: false,
        id: Date.now(), //to get perfect id 
    };
    let res =  await fetch(`http://127.0.0.1:3000/api/todo`,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            "Content-Type": "application/json",
        }
        
    });
    getdata();
    let result = await res.json();
    // console.log(result)
}
//put --> Replace and patch request ---> update & modified

let update_todo = async (id) =>{
    let todo_data = JSON.parse(localStorage.getItem("comp_task")) || [];
    let todo=  await fetch(`http://127.0.0.1:3000/api/todo/${id}`);
    todo  = await todo.json();
    // console.log(todo);
    let data = { status: !todo.status };

    let res = await fetch(`http://127.0.0.1:3000/api/todo/${id}`,{
        method :"PATCH",
        body: JSON.stringify(data),
        headers:{
            "Content-Type" : "application/json",
        },
    });
    getdata();
    res= await res.json();
     console.log("resp",res);

     todo_data.push(res);

     console.log(todo_data)
     localStorage.setItem("comp_task",JSON.stringify(todo_data));
     
     
}

//delete request 
let delete_todo = async (id)=>{
    let res = await fetch(`http://127.0.0.1:3000/api/todo/${id}`,{
        method:"DELETE",
        // body : JSON.stringify(data),
        headers :{
            "Content-Type" :"application/json",
        },
    });
    getdata();
    res = await res.json();
    console.log(res)
    
}

//completed task function 
let completed_task = ()=>{
    let data = JSON.parse(localStorage.getItem("comp_task"));
    console.log("completed",data);
    
    let task = document.getElementById("task");
    task.innerHTML = null;
        data.forEach(({title,id,status,index})=> {
            let div1 = document.createElement("div");
        div1.setAttribute("class","box");

        let box = document.createElement("div");
        

        let name = document.createElement("h3");
        name.innerText = title;
    
        let p = document.createElement("p");
        p.innerText = status;

        let toogle = document.createElement("button");
        toogle.innerText = `Toogle`;
        
        toogle.onclick = ()=>{
            update_todo(id);
            toogle.setAttribute("id","toogle");

        }
    
        let remove = document.createElement("button");
        remove.innerText = `Remove`;
        remove.onclick = ()=>{
           delete_todo(id);
        }

        div1.append(name,toogle,remove);

        let div = document.createElement("div");
        div.append(div1);
             task.append(div);
        });
}
//remove completed todo 
let data = JSON.parse(localStorage.getItem("comp_task"));

let remove_todo = (index)=>{
    console.log(index);
//    data.splice(index,1);
//    localStorage.setItem("comp_task",JSON.stringify(data));
//    completed_task();
    
}