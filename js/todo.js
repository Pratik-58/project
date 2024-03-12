let text = document.querySelector("#name");
let desc = document.querySelector("#desc");
let priority = document.querySelector("#priority");
let savebtn = document.querySelector("#save");
let cancelbtn = document.querySelector("#cancel");
let add_btn = document.querySelector(".add-btn");
let cancel = document.querySelector("#cancel");

//popup
add_btn.addEventListener("click", ()=>{
    let overlay = document.querySelector(".overlay");
    overlay.classList.remove("d-none");
})

cancel.addEventListener("click", ()=>{
    let overlay = document.querySelector(".overlay");
    overlay.classList.add("d-none");
})
//storing data
savebtn.addEventListener("click", () => {
    let dodata = {
      text: text.value,
      desc: desc.value,
      priority: priority.value,
      id:Date.now(),
    };
  
    console.log(dodata); //works fine
  
    let todos = localStorage.getItem("data");
    todos = todos === null ? [] : JSON.parse(todos);
  
    todos.push(dodata);
    console.log(todos);
  
    localStorage.setItem("data", JSON.stringify(todos));
    let overlay = document.querySelector(".overlay");
    overlay.classList.add("d-none");
});

function writetodo() {
    let content=document.querySelector(".content");
    let tododata = localStorage.getItem("data");
    tododata = JSON.parse(tododata);
  
    let dataw = tododata.map((value) => {
      if (value.priority == "!") {
        pri = "green";
      } else if (value.priority == "!!") {
        pri = "blue";
      } else {
        pri = "red";
      }
      return ` <div class="data">
      <div class="data-text">
          <div>
              <h1>${value.text}</h1>
              <p>${value.desc}</p>
          </div> 
          <div class="pri"><span class="priority" style="background-color: ${pri};">${value.priority}</span></div>   
          
      </div>
  
  <div class="del">
      <button id="del-btn" type="button"><i class="fa fa-trash" aria-hidden="true"></i></button>
  </div>
</div>`;
    });
dataw = dataw.join(" ");
content.innerHTML=dataw;
delelement();
}
function delelement() {
    let deletebtn = document.querySelectorAll("#del-btn");
  
    deletebtn.forEach((value) => {  
      value.addEventListener("click", () => {

        let id = value.dataset.id;
  
        let newtodo = JSON.parse(localStorage.getItem("data"));
        newtodo = newtodo.filter((temp) => {
          return temp.id != id;
        });
        localStorage.setItem("data", JSON.stringify(newtodo));
        writetodo();
      });
    });
  }


