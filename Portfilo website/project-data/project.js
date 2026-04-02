const dot=document.getElementById('dot');
const ring=document.getElementById('ring');
const tc=document.getElementById('trail-canvas');
const tctx=tc.getContext('2d');
tc.width=window.innerWidth;tc.height=window.innerHeight;
window.addEventListener('resize',()=>{tc.width=window.innerWidth;tc.height=window.innerHeight;});

let mx=0,my=0,rx=0,ry=0;
const trail=[];
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  dot.style.left=(mx-4)+'px';dot.style.top=(my-4)+'px';
  document.getElementById('spotlight').style.background=
    `radial-gradient(circle 280px at ${mx}px ${my}px,rgba(0,255,170,.055) 0%,transparent 70%)`;
  trail.push({x:mx,y:my,r:4,a:0.6});
  if(trail.length>28)trail.shift();
});

(function loopRing(){
  rx+=(mx-rx)*.1;ry+=(my-ry)*.1;
  ring.style.left=(rx-18)+'px';ring.style.top=(ry-18)+'px';
  tctx.clearRect(0,0,tc.width,tc.height);
  trail.forEach((p,i)=>{
    const ratio=i/trail.length;
    tctx.beginPath();
    tctx.arc(p.x,p.y,p.r*ratio,0,Math.PI*2);
    tctx.fillStyle=`rgba(0,255,170,${ratio*0.3})`;
    tctx.fill();
  });
  requestAnimationFrame(loopRing);
})();

document.querySelectorAll('a,button,.skill-pill').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    dot.style.transform='scale(3)';
    dot.style.borderRadius='4px';
    ring.style.opacity='0';
  });
  el.addEventListener('mouseleave',()=>{
    dot.style.transform='scale(1)';
    dot.style.borderRadius='50%';
    ring.style.opacity='1';
  });
});

document.querySelectorAll('.card-wrap').forEach(wrap=>{
  const shell=wrap.querySelector('.card-shell');
  wrap.addEventListener('mousemove',e=>{
    const r=wrap.getBoundingClientRect();
    const cx=r.left+r.width/2,cy=r.top+r.height/2;
    const dx=(e.clientX-cx)/r.width,dy=(e.clientY-cy)/r.height;
    shell.style.transform=`perspective(900px) rotateY(${dx*12}deg) rotateX(${-dy*10}deg) scale(1.02)`;
  });
  wrap.addEventListener('mouseleave',()=>{
    shell.style.transform='perspective(900px) rotateY(0) rotateX(0) scale(1)';
    shell.style.transition='transform .6s cubic-bezier(.23,1,.32,1)';
  });
  wrap.addEventListener('mouseenter',()=>{shell.style.transition='transform .1s'});
});

const spinStyle=document.getElementById('spin-style');
let ang=0;
(function spinBorders(){
  ang=(ang+.65)%360;
  const g=`conic-gradient(from ${ang}deg,#00ffaa,#00cfff,#c44dff,#ff4d8d,#ffd700,#00ffaa)`;
  spinStyle.textContent=`
    .card-wrap:hover .card-shell::after{background:${g}!important}
    #fshell::after{background:${g}!important}
  `;
  requestAnimationFrame(spinBorders);
})();

document.querySelectorAll('.stat-num[data-count]').forEach(el=>{
  const target=+el.dataset.count;
  let cur=0;
  const step=()=>{
    cur+=Math.ceil(target/40);
    if(cur>=target){el.textContent=target;return;}
    el.textContent=cur;
    requestAnimationFrame(step);
  };
  setTimeout(step,600);
});

const fBtns=document.querySelectorAll('.f-btn');
const cards=document.querySelectorAll('.card-wrap[data-cat]');
const empty=document.getElementById('emptyState');

fBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    fBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    let vis=0;
    cards.forEach((c,i)=>{
      const match=f==='all'||c.dataset.cat===f;
      c.classList.toggle('hidden',!match);
      if(match) vis++;
    });
    empty.style.display=vis===0?'block':'none';
  });
});
/* ─── YOUR EXACT JS END ─── */
