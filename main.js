let allQ = [
    {text: "Сколько блоков в высоту может прыгнуть игрок с зельем прыгучести?", opts: ["2", "1.5", "зависит от уровня зелья"],
    right : 2},
    {text: "Как зовут создателя майнкрафта?", opts: ["Нотч", "Маркус персон", "джеб"],
    right : 1},
    {text: "Когда появился майнкрафт?", opts: ["2011", "2009", "2014"],
    right : 1}
]

let name = "";
let qIndex = 0;
let points = 0;

let startCard = document.getElementById('startCard');
let quizCard = document.getElementById('quizCard');
let resultCard = document.getElementById('resultCard');
let leaderCard = document.getElementById('leader');

let nameFileld = document.getElementById('nameField');
let qText = document.getElementById('qText');
let optButtons = document.getElementById('optButtons');
let nextBtn = document.getElementById('nextBtn');
let pointGot = document.getElementById('pointGot');
let totalQ = document.getElementById('totalQ');
let showBtn = document.getElementById('showBtn');
let leaderBody = document.getElementById('leaderBody');
let restartBtn = document.getElementById('restartBtn');
let startBtn = document.getElementById('startBtn');

startBtn.onclick = () => {
    let v = nameFileld.value.trim()
    if (!v) return alert("Чтобы начать введите имя...")
    name = v 
    startCard.classList.add("hidden")
    quizCard.classList.remove("hidden")
    showQ();
}
function showQ(){
    nextBtn.classList.add("hidden");
    let q = allQ[qIndex];
    qText.innerHTML = q.text 
    optButtons.innerHTML = "";
    q.opts.forEach((o, i) => {
        let b = document.createElement("button")
        b.className = "btn-answer"
        b.textContent = o;
        b.onclick = () => choose(i);
        optButtons.append(b);
    })
}
function choose(i){
    let q = allQ[qIndex];
    if (i === q.right) points++ 
    [...optButtons.children].forEach((b, idx) => {
        b.disabled = true
        if (idx === q.right) b.style.background = "green"
        else if (idx === i) b.style.background = "red"
        
    });
    nextBtn.classList.remove("hidden");
}
nextBtn.onclick = () => {
    qIndex++
    if (qIndex < allQ.length) showQ();
    else endQ();
};

function endQ(){
    quizCard.classList.add("hidden");
    resultCard.classList.remove("hidden");
    pointGot.textContent = points; 
    totalQ.textContent = allQ.length; 
    save();
}
function save(){
    let arr = JSON.parse(localStorage.getItem("key") || "[]")
    arr.push({ name, points });
    arr.sort((a, b) => b.points - a.points)
    localStorage.setItem("key", JSON.stringify(arr));
}
showBtn.onclick = () => {
    resultCard.classList.add("hidden")
    leaderCard.classList.remove("hidden")
    render();
}
function render(){
    let arr = JSON.parse(localStorage.getItem("key") || "[]")
    leaderBody.innerHTML = "";
    arr.forEach((item) => {
        let tr = document.createElement("tr")
        tr.innerHTML = `<td>${item.name}</td> <td>${item.points}</td>`;
        leaderBody.append(tr);
    })
}
