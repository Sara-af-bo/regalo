const lines=[
"> verifying identity... <span class='ok'>OK</span>",
"> user: DERIK <span class='ok'>VERIFIED</span>",
"> memories loaded........ <span class='ok'>OK</span>",
"> relationship database... <span class='ok'>OK</span>",
"> birthday protocol....... <span class='ok'>READY</span>",
"> heart.exe............... <span class='ok'>ONLINE</span>"
];
const logs=document.querySelector("#logs"),execute=document.querySelector("#execute");
let i=0;function boot(){if(i<lines.length){const d=document.createElement("div");d.className="boot-line";d.innerHTML=lines[i++];logs.appendChild(d);setTimeout(boot,500)}else execute.disabled=false}boot();

execute.onclick=()=>{
 document.querySelector("#boot").classList.add("hidden");document.querySelector("#decrypt").classList.remove("hidden");
 let n=0,bar=document.querySelector("#progress"),txt=document.querySelector("#decryptText");
 const t=setInterval(()=>{n=Math.min(100,n+Math.floor(Math.random()*14)+5);bar.style.width=n+"%";txt.textContent=n<35?"Decrypting memories...":n<70?"Reconstructing moments...":"Opening final file...";if(n===100){clearInterval(t);txt.textContent="All memories decrypted. Welcome.";setTimeout(()=>{document.querySelector("#decrypt").classList.add("hidden");document.querySelector("#site").classList.remove("hidden");window.scrollTo(0,0)},900)}},220)
};

document.querySelector("#openLetter").onclick=()=>document.querySelector("#ch1").scrollIntoView({behavior:"smooth"});
const links=[...document.querySelectorAll("#nav button")];
links.forEach(b=>b.onclick=()=>document.querySelector("#"+b.dataset.id).scrollIntoView({behavior:"smooth"}));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(b=>b.classList.toggle("active",b.dataset.id===e.target.id))}),{rootMargin:"-20% 0px -65% 0px"});
document.querySelectorAll(".letter section").forEach(s=>obs.observe(s));


const audioState={ordinary:document.querySelector("#ordinary"),perfect:document.querySelector("#perfect")};
document.querySelectorAll(".play").forEach(btn=>{
 btn.addEventListener("click",()=>{
  const audio=audioState[btn.dataset.song];
  if(!audio)return;
  if(audio.paused){
   Object.values(audioState).forEach(a=>{if(a&&a!==audio)a.pause()});
   document.querySelectorAll(".play").forEach(b=>b.textContent="▶");
   audio.play().catch(()=>{});
   btn.textContent="❚❚";
   audio.onended=()=>btn.textContent="▶";
  }else{audio.pause();btn.textContent="▶"}
 });
});
