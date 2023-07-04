(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const g="7ee9589e1997464daa2174654232706",v=async o=>{const a=`https://api.weatherapi.com/v1/search.json?lang=pt&key=${g}&q=${o}`,e=await(await fetch(a)).json();return(!o||e.length<1)&&alert("Nenhuma cidade encontrada"),e},L=async o=>{const n=`https://api.weatherapi.com/v1/current.json?lang=pt&key=${g}&q=${o}`,c=await(await fetch(n)).json(),{location:{name:e,country:t},current:{temp_c:s,condition:{icon:d,text:r}}}=c;return{temp:s,condition:r,icon:d,name:e,country:t,url:o}},x="7ee9589e1997464daa2174654232706";function i(o,n,a=""){const c=document.createElement(o);return c.classList.add(...n.split(" ")),c.textContent=a,c}function B(o){const{date:n,maxTemp:a,minTemp:c,condition:e,icon:t}=o,s=new Date(n);s.setDate(s.getDate()+1);const d=s.toLocaleDateString("pt-BR",{weekday:"short"}),r=i("div","forecast"),m=i("p","forecast-weekday",d),y=i("span","forecast-temp max","max"),E=i("span","forecast-temp max",`${a}\xBA`),C=i("span","forecast-temp min","min"),u=i("span","forecast-temp min",`${c}\xBA`),l=i("div","forecast-temp-container");l.appendChild(y),l.appendChild(C),l.appendChild(E),l.appendChild(u);const h=i("p","forecast-condition",e),p=i("img","forecast-icon");p.src=t.replace("64x64","128x128");const f=i("div","forecast-middle-container");return f.appendChild(l),f.appendChild(p),r.appendChild(m),r.appendChild(f),r.appendChild(h),r}function w(o){const n=document.getElementById(o);for(;n.firstChild;)n.removeChild(n.firstChild)}function k(o){const n=document.getElementById("forecast-container"),a=document.getElementById("weekdays");w("weekdays"),o.forEach(c=>{const e=B(c);a.appendChild(e)}),n.classList.remove("hidden")}async function I(o){const n=`http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${x}&q=${o}&days=7`,c=await(await fetch(n)).json();k(c.forecast.forecastday.map(e=>{const{date:t,day:{maxtemp_c:s,mintemp_c:d,condition:{text:r,icon:m}}}=e;return{date:t,maxTemp:s,minTemp:d,condition:r,icon:m}}))}function T(o){const{name:n,country:a,temp:c,condition:e,icon:t,url:s}=o,d=i("li","city"),r=i("div","city-heading"),m=i("h2","city-name",n),y=i("p","city-country",a);r.appendChild(m),r.appendChild(y);const E=i("p","city-temp",`${c}\xBA`),C=i("p","city-condition",e),u=i("div","city-temp-container");u.appendChild(C),u.appendChild(E);const l=i("img","condition-icon");l.src=t.replace("64x64","128x128");const h=i("div","city-info-container");h.appendChild(u),h.appendChild(l),d.appendChild(r),d.appendChild(h);const p=document.createElement("button");return p.innerText="Ver previs\xE3o",p.classList.add("city-forecast-button"),p.addEventListener("click",()=>{I(s)}),d.appendChild(p),document.getElementById("cities").appendChild(d),d}async function $(o){o.preventDefault(),w("cities");const a=document.getElementById("search-input").value,c=await v(a);(await Promise.all(c.map(t=>{const{url:s}=t;return L(s)}))).forEach(t=>T(t))}document.getElementById("search-form").addEventListener("submit",$);document.getElementById("close-forecast").addEventListener("click",()=>{document.getElementById("forecast-container").classList.add("hidden")});
