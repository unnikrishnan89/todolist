module.exports = function() {
  'use strict';
  var todo = todo || {};
  return todo = {
    init: function init(options) {
      this.listWrap = document.querySelector(options.element);
      this.userInput = document.querySelector(options.input);
      this.countInfo = document.querySelector('.todo__added');
      this.events();
      console.log(todo);
    },
    getLength: function getLength() {
      return this.userInput.value.length;
    },
    createListElement: function createListElement() {
      var li = document.createElement("li");
      var inputItem = document.createElement("input");
      var labelItem = document.createElement("label");
      li.classList.add('list-group-item');
      inputItem.type = "checkbox";
      inputItem.classList.add('todo__checkbox');
      li.appendChild(inputItem);
      li.appendChild(labelItem);
      labelItem.appendChild(document.createTextNode(this.userInput.value));
      this.listWrap.appendChild(li);
      this.userInput.value = "";
      var count = document.querySelectorAll('.todo__list li').length;
      itemLeftDisplay(count);
      var delSpan = document.createElement("button");
      delSpan.appendChild(document.createTextNode(" x "));
      li.appendChild(delSpan);
      delSpan.classList.add("todo__close");

      li.addEventListener("click", itemDone);
      delSpan.addEventListener("click", deleteItem);

      function itemDone() {
        li.classList.toggle("done");
      }

      function deleteItem() {
        todo.listWrap.removeChild(li);
        count = document.querySelectorAll('.todo__list li').length;
        itemLeftDisplay(count);
      }

      function itemLeftDisplay(count){
        console.log(count);
        todo.countInfo.innerHTML = count+ " Items left";
        if(count <= 0){
          todo.countInfo.classList.remove('show');
        }
        else{
          todo.countInfo.classList.add('show');
        }
      }
    },
    addList: function addList() {
      if (todo.getLength() > 0 && event.keyCode === 13) {
        todo.createListElement();
      }
    },
    events: function events() {
      var $this = this;
      this.userInput.addEventListener("keypress", $this.addList);
    }
  }
}
