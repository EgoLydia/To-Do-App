  const taskinput = document.getElementById("new");
  const addbutton = document.getElementById("add");
  const tasks = document.getElementById("tasks");
  addbutton.addEventListener("click", addNewItem);
  const items = await getItems();
  console.log(items);
  for (let item in items) {
  function addNewItem() {
    const task = {
      value: taskinput.value,
      complete: false,
    };

    taskinput.value = "";
    taskinput.focus();
