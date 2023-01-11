window.onload = ()=>{
    console.log("page loaded")
    document.querySelector(`.loader`).classList.add(`loader-disappear-anim`)
}



//return to the top button
const windowHeight = window.innerHeight
const scrollTopBtn = document.querySelector(`#btn-top`)
let firstTime = true

window.addEventListener("scroll", ()=>{
    const top = document.documentElement.scrollTop
    
    if(top > windowHeight/2){
        scrollTopBtn.classList.remove(`fadeIn`)
        scrollTopBtn.classList.add(`topBtn`)
    } else{
        scrollTopBtn.classList.add(`fadeIn`)
    }
})

scrollTopBtn.onclick = function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}



