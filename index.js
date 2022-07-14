let myLinks = []
const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.querySelector("#delete-btn")
const tabBtn=document.querySelector("#tab-btn")

const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if (linksFromLocalStorage) {
  myLinks = linksFromLocalStorage
  render(myLinks)
}

inputBtn.addEventListener("click", function () {
  myLinks.push(inputEl.value)
  localStorage.setItem("myLinks", JSON.stringify(myLinks))
  render(myLinks)
})

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear()
  myLinks = []
  ulEl.innerHTML = ""
})

tabBtn.addEventListener("click",function(){
   chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
       myLinks.push(tabs[0].url)
       localStorage.setItem("myLinks", JSON.stringify(myLinks))
       render(myLinks)
    });
})
function render(links) {
  let listItems = ""
  for (let i = 0; i < links.length; i++) {
    listItems += `<li><a target='_blank' href='${links[i]}'>${links[i]}</a></li>`
  }
  ulEl.innerHTML = listItems
  inputEl.value = ""
}
