(async function () {
  const taskinput = document.getElementById("new");
  const addbutton = document.getElementById("add");
  const tasks = document.getElementById("tasks");

  addbutton.addEventListener("click", addNewItem);
  taskinput.addEventListener("keyup", processKeyPress);

  localStorage.setItem("message", "hello world");

  const items = await getItems();
  console.log(items);
  for (let item in items) {
    const li = createElementForTask(items[item]);
    tasks.appendChild(li);
  }

  async function getItems() {
    const request = await fetch(
      "https://todo-api-ff.azurewebsites.net/api/todo",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const itemsJson = (await request.text()) || "[]";
    return JSON.parse(itemsJson);
  }

  async function saveItems() {
    const data = JSON.stringify(items);
    await fetch("https://todo-api-ff.azurewebsites.net/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
  }

  function processKeyPress(event) {
    addbutton.disabled = event.target.value.trim() === "";
    if (event.key === "Enter") {
      addNewItem();
    }
  }

  function createElementForTask(item) {
    const template = document.getElementById("taskTemplate");
    const newListItem = template.content.cloneNode(true);

    const checkbox = newListItem.querySelector(".item-check");
    const text = newListItem.querySelector(".item-text");
    const deleteButton = newListItem.querySelector(".delete");
    text.innerText = item.value;
    checkbox.checked = item.complete;

    checkbox.onchange = function (event) {
      item.complete = event.target.checked;
      saveItems();
    };

    deleteButton.onclick = function (event) {
      event.target.closest("li").remove();
      items.splice(items.indexOf(item), 1);
      saveItems();
    };
    return newListItem;
  }
  function addNewItem() {
    const task = {
      value: taskinput.value,
      complete: false,
    };
    items.push(task);
    saveItems();

    let newItem = createElementForTask(task);
    tasks.appendChild(newItem);

    taskinput.value = "";
    taskinput.focus();
    addbutton.disabled = true;
  }
})();
