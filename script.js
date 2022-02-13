  const taskinput = document.getElementById("new");
  const addbutton = document.getElementById("add");
  const tasks = document.getElementById("tasks");
  addbutton.addEventListener("click", addNewItem);
  const items = await getItems();
  console.log(items);
  for (let item in items) {
    const li = createElementForTask(items[item]);
    tasks.appendChild(li);
  function createElementForTask(item) {
    const template = document.getElementById("taskTemplate");
    const newListItem = template.content.cloneNode(true);

    const checkbox = newListItem.querySelector(".item-check");
    const text = newListItem.querySelector(".item-text");
    text.innerText = item.value;
    checkbox.checked = item.complete;

    };

    return newListItem;
  function addNewItem() {
    const task = {
      value: taskinput.value,
      complete: false,
    };
    let newItem = createElementForTask(task);
    tasks.appendChild(newItem);

    taskinput.value = "";
    taskinput.focus();
