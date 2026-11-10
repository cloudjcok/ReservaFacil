const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const IC={
tijera:'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.2 8.2 20 20M8.2 15.8 20 4"/>',
barba:'<path d="M5 8c0 7 2 12 7 12s7-5 7-12"/><path d="M9 14c1.5 1 4.5 1 6 0"/><path d="M5 8c2-4 12-4 14 0"/>',
tinte:'<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
peine:'<rect x="3" y="7" width="18" height="5" rx="1"/><path d="M6 12v6M9.5 12v6M13 12v6M16.5 12v6"/>',
brillo:'<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
spa:'<path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14zM5 19l8-8"/>',
cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
plus:'<path d="M12 5v14M5 12h14"/>',users:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1"/>',chart:'<path d="M5 20V11M11 20V4M17 20v-6M2 20h20"/>'};
const ico=(k,z=20)=>`<svg viewBox="0 0 24 24" width="${z}" height="${z}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]||IC.tijera}</svg>`;
let nid=100;
const S={tab:"agenda",fecha:"2026-11-11",
cli:[{id:1,nombre:"Luis Mora",tel:"099 123 4567",mail:"luis.mora@correo.com"},{id:2,nombre:"Andrea Vera",tel:"098 765 4321",mail:""},{id:3,nombre:"Pedro Salas",tel:"097 555 0198",mail:""},{id:4,nombre:"Carolina Intriago",tel:"096 410 2233",mail:"caro.i@correo.com"},{id:5,nombre:"Marco Yagual",tel:"099 880 1475",mail:""}],
srv:[{id:1,nombre:"Corte clásico",dur:30,precio:8,ico:"tijera"},{id:2,nombre:"Barba",dur:20,precio:5,ico:"barba"},{id:3,nombre:"Corte y barba",dur:45,precio:12,ico:"peine"},{id:4,nombre:"Tinte",dur:60,precio:25,ico:"tinte"},{id:5,nombre:"Manicure",dur:45,precio:10,ico:"brillo"},{id:6,nombre:"Limpieza facial",dur:40,precio:15,ico:"spa"}],
cit:[{id:1,cid:1,sid:1,fecha:"2026-11-11",hora:"09:00",estado:"Confirmada"},{id:2,cid:2,sid:4,fecha:"2026-11-11",hora:"10:00",estado:"Confirmada"},{id:3,cid:3,sid:2,fecha:"2026-11-11",hora:"11:30",estado:"Cancelada"}],
hor:{ini:"09:00",fin:"18:00",paso:30,dias:[1,2,3,4,5,6]}};
const N={cid:null,sid:null,hora:null,fecha:"2026-11-11",q:""};
const D={c:null,foto:null,cb:null,s:null};
const cl=id=>S.cli.find(c=>c.id===id),sv=id=>S.srv.find(s=>s.id===id);
const money=n=>"$"+Number(n).toFixed(2);
const m=h=>{const p=h.split(":");return +p[0]*60+ +p[1]},hh=x=>String(Math.floor(x/60)).padStart(2,"0")+":"+String(x%60).padStart(2,"0");
function av(c){if(c.foto)return `<img class="av" src="${c.foto}" alt="">`;let h=0;for(const ch of c.nombre)h=(h*31+ch.charCodeAt(0))%360;
 return `<span class="av" style="background:hsl(${h} 35% 36%)">${esc(c.nombre.split(" ").slice(0,2).map(w=>w[0]||"").join("").toUpperCase())}</span>`}
function toast(t){const e=$("toast");e.textContent=t;e.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("on"),2600)}
function slots(f,dur){const d=new Date(f+"T12:00:00").getDay();if(!S.hor.dias.includes(d))return null;const o=[];
 for(let t=m(S.hor.ini);t+dur<=m(S.hor.fin);t+=S.hor.paso){const busy=S.cit.some(c=>c.fecha===f&&c.estado!=="Cancelada"&&t<m(c.hora)+sv(c.sid).dur&&m(c.hora)<t+dur);o.push({h:hh(t),ok:!busy})}return o}

function nav(){const T=[["agenda","cal","Agenda"],["nueva","plus","Nueva reserva"],["clientes","users","Clientes"],["servicios","tag","Servicios y horarios"],["reportes","chart","Reportes"]];
 $("nav").innerHTML=`<div class="brand">ReservaFácil</div><div class="bz">Barbería Don Carlos</div>`+T.map(t=>`<button class="nv" data-a="tab" data-t="${t[0]}" ${S.tab===t[0]?'aria-current="page"':""}>${ico(t[1])}${t[2]}</button>`).join("")+`<button class="nv th" data-a="theme">Cambiar tema</button>`}
function view(){nav();({agenda:vAgenda,nueva:vNueva,clientes:vCli,servicios:vSrv,reportes:vRep})[S.tab]($("view"))}

function vAgenda(v){const cs=S.cit.filter(c=>c.fecha===S.fecha).sort((a,b)=>m(a.hora)-m(b.hora)),act=cs.filter(c=>c.estado!=="Cancelada"),ing=act.reduce((s,c)=>s+sv(c.sid).precio,0);
 v.innerHTML=`<h1>Agenda</h1><div class="bar"><label for="af">Día</label><input type="date" id="af" value="${S.fecha}"><span class="fig"><b>${act.length}</b>reservas activas</span><span class="fig"><b>${money(ing)}</b>ingreso estimado</span><button class="btn p" data-a="irnueva">Nueva reserva</button></div>`+
 (cs.length?`<div class="tw"><table><tr><th>Horario</th><th>Cliente</th><th>Servicio</th><th>Precio</th><th>Estado</th><th></th></tr>`+cs.map(c=>{const s=sv(c.sid),k=cl(c.cid);return `<tr><td>${c.hora} – ${hh(m(c.hora)+s.dur)}</td><td><div class="who">${av(k)}<div>${esc(k.nombre)}<div class="mut">${esc(k.tel)}</div></div></div></td><td><div class="sv">${ico(s.ico)}${esc(s.nombre)}</div></td><td>${money(s.precio)}</td><td><span class="tag ${c.estado}">${c.estado}</span></td><td>${c.estado==="Confirmada"?`<button class="btn s" data-a="done" data-id="${c.id}">Completar</button> <button class="btn s" data-a="cancel" data-id="${c.id}">Cancelar</button>`:""}</td></tr>`}).join("")+`</table></div>`:
 `<div class="blk"><p>No hay reservas para este día.</p><button class="btn" data-a="irnueva">Crear una reserva</button></div>`);
 $("af").onchange=e=>{if(e.target.value){S.fecha=e.target.value;vAgenda(v)}}}

function vNueva(v){v.innerHTML=`<h1>Nueva reserva</h1><div class="two"><div>
 <div class="blk"><h2>1. Cliente</h2><div id="cliSel"></div></div>
 <div class="blk"><h2>2. Servicio</h2><div class="tiles" id="tiles"></div></div>
 <div class="blk"><h2>3. Fecha y hora</h2><label for="nf" style="margin-top:0">Fecha</label><input type="date" id="nf" value="${N.fecha}"><div id="slots" class="slots"></div></div></div>
 <div class="blk sum" id="sum"></div></div>`;
 $("nf").onchange=e=>{N.fecha=e.target.value;N.hora=null;pSlots();pSum()};pCli();pTiles();pSlots();pSum()}
function pCli(){const e=$("cliSel");if(N.cid){const c=cl(N.cid);e.innerHTML=`<div class="chip"><div class="who">${av(c)}<div>${esc(c.nombre)}<div class="mut">${esc(c.tel)}</div></div></div><button class="btn s" data-a="changec">Cambiar</button></div>`;return}
 e.innerHTML=`<label for="q" style="margin-top:0">Buscar por nombre o teléfono</label><input id="q" autocomplete="off" value="${esc(N.q)}"><ul class="res" id="res"></ul>`;$("q").oninput=ev=>{N.q=ev.target.value;pRes()};pRes()}
function pRes(){const q=N.q.trim().toLowerCase(),r=S.cli.filter(c=>!q||c.nombre.toLowerCase().includes(q)||c.tel.replace(/\s/g,"").includes(q.replace(/\s/g,""))).slice(0,5);
 $("res").innerHTML=r.map(c=>`<li><button data-a="pickc" data-id="${c.id}">${av(c)}<span>${esc(c.nombre)}<small> · ${esc(c.tel)}</small></span></button></li>`).join("")+`<li><button data-a="newfromres">+ Crear cliente${N.q.trim()?` «${esc(N.q.trim())}»`:" nuevo"}</button></li>`}
function pTiles(){$("tiles").innerHTML=S.srv.map(s=>`<button class="tile" data-a="picks" data-id="${s.id}" aria-pressed="${N.sid===s.id}">${ico(s.ico,26)}<span>${esc(s.nombre)}<small>${s.dur} min · ${money(s.precio)}</small></span></button>`).join("")}
function pSlots(){const e=$("slots");if(!N.sid){e.innerHTML='<span class="mut">Elige un servicio para ver los horarios disponibles.</span>';return}
 if(!N.fecha){e.innerHTML="";return}const s=slots(N.fecha,sv(N.sid).dur);
 if(!s){e.innerHTML='<span class="mut">El negocio no atiende ese día. Cambia la fecha o revisa el horario en Servicios y horarios.</span>';return}
 if(N.hora&&!(s.find(x=>x.h===N.hora)||{}).ok)N.hora=null;
 e.innerHTML=s.length?s.map(x=>`<button class="slot" data-a="pickh" data-h="${x.h}" aria-pressed="${N.hora===x.h}" ${x.ok?"":"disabled"}>${x.h}</button>`).join(""):'<span class="mut">El servicio no cabe en el horario de atención.</span>'}
function pSum(){const c=N.cid&&cl(N.cid),s=N.sid&&sv(N.sid),ok=c&&s&&N.hora&&N.fecha;
 $("sum").innerHTML=`<h2>Resumen</h2><dl><dt>Cliente</dt><dd>${c?esc(c.nombre):"—"}</dd><dt>Servicio</dt><dd>${s?esc(s.nombre)+" · "+s.dur+" min":"—"}</dd><dt>Fecha y hora</dt><dd>${N.hora?N.fecha+" a las "+N.hora:"—"}</dd><dt>Total</dt><dd>${s?money(s.precio):"—"}</dd></dl><p><button class="btn p" data-a="confirm" ${ok?"":"disabled"}>Confirmar reserva</button></p>`}

function vCli(v){v.innerHTML=`<h1>Clientes</h1><div class="bar"><div style="flex:1;min-width:200px"><label for="cq" class="mut" style="display:block;margin:0 0 4px">Buscar</label><input id="cq" placeholder="Nombre o teléfono" autocomplete="off"></div><button class="btn p" data-a="clinew">Nuevo cliente</button></div><div class="tw"><table><thead><tr><th>Cliente</th><th>Teléfono</th><th>Correo</th><th>Reservas</th><th></th></tr></thead><tbody id="cb"></tbody></table></div>`;
 const p=()=>{const q=$("cq").value.trim().toLowerCase();$("cb").innerHTML=S.cli.filter(c=>!q||c.nombre.toLowerCase().includes(q)||c.tel.includes(q)).map(c=>`<tr><td><div class="who">${av(c)}${esc(c.nombre)}</div></td><td>${esc(c.tel)}</td><td>${esc(c.mail)||"—"}</td><td>${S.cit.filter(x=>x.cid===c.id&&x.estado!=="Cancelada").length}</td><td><button class="btn s" data-a="cliedit" data-id="${c.id}">Editar</button></td></tr>`).join("")||'<tr><td colspan="5" class="mut">Sin resultados.</td></tr>'};$("cq").oninput=p;p()}

function vSrv(v){const H=S.hor,dn=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
 v.innerHTML=`<h1>Servicios y horarios</h1><div class="bar"><h2 style="margin:0;flex:1">Servicios</h2><button class="btn p" data-a="srvnew">Nuevo servicio</button></div><div class="tw"><table><tr><th>Servicio</th><th>Duración</th><th>Precio</th><th></th></tr>`+S.srv.map(s=>`<tr><td><div class="sv">${ico(s.ico,24)}${esc(s.nombre)}</div></td><td>${s.dur} min</td><td>${money(s.precio)}</td><td><button class="btn s" data-a="srvedit" data-id="${s.id}">Editar</button></td></tr>`).join("")+`</table></div>
 <div class="blk" style="margin-top:16px"><h2>Horario de atención</h2><div class="hg"><div><label for="hi">Apertura</label><input type="time" id="hi" value="${H.ini}"></div><div><label for="hf">Cierre</label><input type="time" id="hf" value="${H.fin}"></div><div><label for="hp">Intervalo de citas</label><select id="hp">${[15,30,60].map(x=>`<option value="${x}" ${H.paso===x?"selected":""}>${x} min</option>`).join("")}</select></div></div>
 <label>Días de atención</label><div class="days">${dn.map((d,i)=>`<label><input type="checkbox" class="dd" value="${i}" ${H.dias.includes(i)?"checked":""}>${d}</label>`).join("")}</div>
 <p><button class="btn p" data-a="savehor">Guardar horario</button></p><p class="mut" style="margin:0">Los horarios disponibles de Nueva reserva se generan con estos datos y con la duración de cada servicio.</p></div>`}

function vRep(v){const act=S.cit.filter(c=>c.estado!=="Cancelada");let tc=0,ti=0;
 const rows=S.srv.map(s=>{const n=act.filter(c=>c.sid===s.id).length;tc+=n;ti+=n*s.precio;return `<tr><td><div class="sv">${ico(s.ico)}${esc(s.nombre)}</div></td><td>${n}</td><td>${money(n*s.precio)}</td></tr>`}).join("");
 v.innerHTML=`<h1>Reportes</h1><div class="bar"><span class="fig"><b>${tc}</b>reservas activas</span><span class="fig"><b>${S.cit.length-act.length}</b>canceladas</span><span class="fig"><b>${S.cli.length}</b>clientes</span><span class="fig"><b>${money(ti)}</b>ingreso estimado</span></div><div class="tw"><table><tr><th>Servicio</th><th>Reservas</th><th>Ingreso</th></tr>${rows}</table></div>`}

function pvAv(){const n=$("cNom").value||"?";$("pvAv").innerHTML=av({nombre:n,foto:D.foto})}
function openCli(id,pre,cb){D.c=id;D.cb=cb;const c=id&&cl(id);D.foto=c?c.foto:null;$("tCli").textContent=c?"Editar cliente":"Nuevo cliente";
 $("cNom").value=c?c.nombre:pre||"";$("cTel").value=c?c.tel:"";$("cMail").value=c?c.mail:"";$("fFoto").value="";pvAv();$("dCli").showModal()}
function openSrv(id){D.s=id;const s=id&&sv(id);$("tSrv").textContent=s?"Editar servicio":"Nuevo servicio";$("sNom").value=s?s.nombre:"";$("sDur").value=s?s.dur:"";$("sPre").value=s?s.precio:"";
 $("sIco").innerHTML=["tijera","barba","peine","tinte","brillo","spa"].map(k=>`<label class="ic"><input type="radio" name="ik" value="${k}" ${(s?s.ico:"tijera")===k?"checked":""}><span>${ico(k,22)}</span></label>`).join("");$("dSrv").showModal()}

$("cNom").oninput=pvAv;
$("fFoto").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const i=new Image();i.onload=()=>{const c=document.createElement("canvas");c.width=c.height=96;const z=Math.min(i.width,i.height);c.getContext("2d").drawImage(i,(i.width-z)/2,(i.height-z)/2,z,z,0,0,96,96);D.foto=c.toDataURL("image/jpeg",.8);pvAv()};i.src=r.result};r.readAsDataURL(f)};
$("fCli").onsubmit=e=>{e.preventDefault();const d={nombre:$("cNom").value.trim(),tel:$("cTel").value.trim(),mail:$("cMail").value.trim(),foto:D.foto};let c;
 if(D.c){c=cl(D.c);Object.assign(c,d)}else{c=Object.assign({id:++nid},d);S.cli.push(c)}
 $("dCli").close();if(D.cb)D.cb(c);view();toast(D.c?"Cliente actualizado":"Cliente creado")};
$("fSrv").onsubmit=e=>{e.preventDefault();const d={nombre:$("sNom").value.trim(),dur:+$("sDur").value,precio:+$("sPre").value,ico:document.querySelector("input[name=ik]:checked").value};
 if(D.s)Object.assign(sv(D.s),d);else S.srv.push(Object.assign({id:++nid},d));$("dSrv").close();view();toast(D.s?"Servicio actualizado":"Servicio creado")};

document.addEventListener("click",e=>{const b=e.target.closest("[data-a]");if(!b)return;const a=b.dataset.a,id=+b.dataset.id;
 if(a==="tab"){S.tab=b.dataset.t;view()}
 else if(a==="irnueva"){S.tab="nueva";N.fecha=S.fecha;view()}
 else if(a==="theme"){const r=document.documentElement,d=r.dataset.theme==="dark"||(!r.dataset.theme&&matchMedia("(prefers-color-scheme:dark)").matches);r.dataset.theme=d?"light":"dark"}
 else if(a==="close")$(b.dataset.d).close();
 else if(a==="done"||a==="cancel"){S.cit.find(c=>c.id===id).estado=a==="done"?"Completada":"Cancelada";view();toast(a==="done"?"Reserva completada":"Reserva cancelada")}
 else if(a==="pickc"){N.cid=id;N.q="";pCli();pSum()}
 else if(a==="changec"){N.cid=null;pCli();pSum()}
 else if(a==="newfromres")openCli(null,N.q.trim(),c=>{N.cid=c.id;N.q=""});
 else if(a==="picks"){N.sid=id;pTiles();pSlots();pSum()}
 else if(a==="pickh"){N.hora=b.dataset.h;pSlots();pSum()}
 else if(a==="confirm"){S.cit.push({id:++nid,cid:N.cid,sid:N.sid,fecha:N.fecha,hora:N.hora,estado:"Confirmada"});S.fecha=N.fecha;N.cid=N.sid=N.hora=null;N.q="";S.tab="agenda";view();toast("Reserva confirmada")}
 else if(a==="clinew")openCli(null,"");else if(a==="cliedit")openCli(id);
 else if(a==="srvnew")openSrv(null);else if(a==="srvedit")openSrv(id);
 else if(a==="savehor"){const i=$("hi").value,f=$("hf").value,d=[...document.querySelectorAll(".dd:checked")].map(x=>+x.value);
  if(!i||!f||m(i)>=m(f)){toast("La apertura debe ser anterior al cierre");return}if(!d.length){toast("Selecciona al menos un día");return}
  Object.assign(S.hor,{ini:i,fin:f,paso:+$("hp").value,dias:d});toast("Horario guardado")}});
view();
