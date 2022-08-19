var inpt=document.getElementById("inpt");
var img1=document.getElementById("img1");
var btn=document.getElementById("btn");
var span=document.getElementById("span");
var div1=document.getElementById("div1");
window.addEventListener("load",function(){
	inpt.value="";
});
btn.addEventListener("click",function(){
	if (!inpt.value) {
		span.style.display="block";
		span.innerText="* please enter aurl or text to create QR Code *";
		img1.style.display="none";

	}else{
		img1.style.display="block";
		span.innerText="* please wait ... *"
		img1.src=`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${inpt.value}`;
		span.style.display="none";
	}

})
// this for scan 
var btn2=document.getElementById("btn2");
var btn3=document.getElementById("btn3");
var scan=document.getElementsByClassName("wrapper")
btn2.addEventListener("click",function(){
div1.style.display="none";
scan[0].style.display="block";
})
btn3.addEventListener("click",function(){
	div1.style.display="block";
	scan[0].style.display="none";
})
const wrapper = document.querySelector(".wrapper"),
form = document.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
closeBtn = document.querySelector(".close"),
copyBtn = document.querySelector(".copy");

function fetchRequest(file, formData) {
    infoText.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't scan QR Code";
        if(!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Couldn't scan QR Code";
    });
}

fileInp.addEventListener("change", async e => {
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});

copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));