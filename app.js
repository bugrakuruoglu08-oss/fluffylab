(function(){
  /* ---------- language ---------- */
  var root=document.documentElement;
  var bTr=document.getElementById('btn-tr'), bEn=document.getElementById('btn-en');
  function setLang(l){
    root.classList.toggle('en',l==='en'); root.lang=l;
    if(bTr){bTr.setAttribute('aria-pressed',l==='tr'); bEn.setAttribute('aria-pressed',l==='en');}
    document.querySelectorAll('[data-tr]').forEach(function(el){el.textContent=el.getAttribute('data-'+l);});
    try{localStorage.setItem('fl-lang',l)}catch(e){}
  }
  if(bTr){bTr.onclick=function(){setLang('tr')}; bEn.onclick=function(){setLang('en')};}
  var menu=document.querySelector('.menu-btn');
  if(menu) menu.onclick=function(){var n=document.querySelector('nav.top');n.classList.toggle('open');menu.setAttribute('aria-expanded',n.classList.contains('open'));};

  /* ---------- studio product renders ---------- */
  var n=0;
  function G(id,stops,vert){
    return '<linearGradient id="'+id+'" x1="0" y1="0" x2="'+(vert?0:1)+'" y2="'+(vert?1:0)+'">'+
      stops.map(function(s){return '<stop offset="'+s[0]+'" stop-color="'+s[1]+'"'+(s[2]!=null?' stop-opacity="'+s[2]+'"':'')+'/>';}).join('')+'</linearGradient>';
  }
  var WHITE=[[0,'#c4ada4'],[.1,'#e6d8d2'],[.28,'#fdf8f6'],[.4,'#ffffff'],[.58,'#f3e9e5'],[.84,'#dac6be'],[1,'#b39990']];
  var PINK=[[0,'#9c5249'],[.13,'#d48b82'],[.32,'#f1bab2'],[.42,'#fad6d0'],[.62,'#e4a49c'],[.88,'#bb726a'],[1,'#934b43']];
  var GOLD=[[0,'#80513f'],[.18,'#d3a28b'],[.38,'#f8dccc'],[.52,'#e4b59e'],[.78,'#a66f5d'],[1,'#704333']];
  var GLASS=[[0,'#cf9e96'],[.1,'#ecc9c2'],[.3,'#f9e5e0'],[.45,'#fff3f0'],[.7,'#f0d2cb'],[.9,'#dcaea6'],[1,'#c08d85']];
  var SHADE=[[0,'#4a2620',.3],[.2,'#4a2620',0],[.72,'#4a2620',0],[1,'#4a2620',.34]];
  var HL=[[0,'#ffffff',0],[.15,'#ffffff',.95],[.8,'#ffffff',.55],[1,'#ffffff',0]];
  var F='font-family="Figtree,system-ui,sans-serif"', S='font-family="Allura,cursive"';
  function ridges(x1,x2,y1,y2,step,vert){var o='';for(var v=(vert?x1:y1);v<=(vert?x2:y2);v+=step){o+=vert?'<line x1="'+v+'" x2="'+v+'" y1="'+y1+'" y2="'+y2+'" stroke="#5a2e26" stroke-opacity=".1"/>':'<line x1="'+x1+'" x2="'+x2+'" y1="'+v+'" y2="'+v+'" stroke="#5a2e26" stroke-opacity=".09"/>';}return o;}

  var P={
    sunscreen:function(u){
      var body='M150,372 C146,300 126,190 118,108 L282,108 C274,190 254,300 250,372 Z';
      return {base:434,sw:84,defs:G(u+'b',WHITE)+G(u+'c',PINK)+G(u+'s',SHADE)+G(u+'h',HL,1)+G(u+'band',[[0,'#f6d9d1'],[1,'#efc6bc']],1),
      body:
        '<path d="'+body+'" fill="url(#'+u+'b)"/>'+
        '<path d="M139,300 C134,250 128,200 124,160 L276,160 C272,200 266,250 261,300 Z" fill="url(#'+u+'band)" opacity=".75"/>'+
        '<rect x="114" y="80" width="172" height="32" rx="4" fill="url(#'+u+'b)"/>'+ridges(118,282,85,107,4)+
        '<path d="'+body+'" fill="url(#'+u+'s)"/><rect x="114" y="80" width="172" height="32" rx="4" fill="url(#'+u+'s)"/>'+
        '<g transform="translate(200,232) rotate(-90)">'+
          '<text y="-4" text-anchor="middle" '+S+' font-size="46" fill="#a95c50">fluffylab</text>'+
          '<text y="17" text-anchor="middle" '+F+' font-weight="700" font-size="11" letter-spacing="2.2" fill="#5e3f39">CLOUD UV SUNSCREEN</text>'+
          '<text y="33" text-anchor="middle" '+F+' font-size="9.5" letter-spacing="1.4" fill="#86675f">SPF 50+ · PA++++ · 50 ml</text></g>'+
        '<path d="M160,364 C156,300 141,200 134,114 L147,114 C153,200 167,300 171,364 Z" fill="url(#'+u+'h)" opacity=".75" filter="url(#'+u+'f2)"/>'+
        '<rect x="146" y="368" width="108" height="66" rx="10" fill="url(#'+u+'c)"/>'+
        '<rect x="146" y="368" width="108" height="6" fill="#6e352d" opacity=".2"/>'+
        '<rect x="161" y="376" width="7" height="52" rx="3.5" fill="#fff" opacity=".4" filter="url(#'+u+'f1)"/>'};
    },
    serum:function(u){
      var bottle='M178,178 C150,182 138,196 138,226 L138,410 Q138,432 160,432 L240,432 Q262,432 262,410 L262,226 C262,196 250,182 222,178 Z';
      return {base:432,sw:96,defs:G(u+'g',GLASS)+G(u+'c',PINK)+G(u+'au',GOLD)+G(u+'s',SHADE)+G(u+'h',HL,1)+
        G(u+'liq',[[0,'#f7cfc6',.55],[1,'#eaa99e',.85]],1)+'<clipPath id="'+u+'clip"><path d="'+bottle+'"/></clipPath>',
      body:
        '<path d="M182,64 C182,30 218,30 218,64 L221,122 L179,122 Z" fill="url(#'+u+'c)"/>'+ridges(181,219,98,120,5)+
        '<rect x="170" y="118" width="60" height="48" rx="4" fill="url(#'+u+'au)"/>'+ridges(170,230,124,162,6)+
        '<path d="'+bottle+'" fill="url(#'+u+'g)" opacity=".95"/>'+
        '<g clip-path="url(#'+u+'clip)"><rect x="130" y="246" width="140" height="200" fill="url(#'+u+'liq)"/>'+
        '<ellipse cx="200" cy="246" rx="62" ry="5" fill="#fff" opacity=".45"/>'+
        '<rect x="195" y="166" width="10" height="236" rx="5" fill="#fff" opacity=".35"/><rect x="195" y="166" width="10" height="236" rx="5" fill="none" stroke="#b77d74" stroke-opacity=".35"/></g>'+
        '<path d="'+bottle+'" fill="url(#'+u+'s)"/>'+
        '<rect x="152" y="282" width="96" height="108" rx="3" fill="#fffaf7"/>'+
        '<rect x="152" y="282" width="96" height="108" rx="3" fill="url(#'+u+'s)" opacity=".6"/>'+
        '<text x="200" y="316" text-anchor="middle" '+S+' font-size="30" fill="#a95c50">fluffylab</text>'+
        '<text x="200" y="338" text-anchor="middle" '+F+' font-weight="700" font-size="10" letter-spacing="1.8" fill="#5e3f39">DEW GLAZE</text>'+
        '<text x="200" y="352" text-anchor="middle" '+F+' font-weight="600" font-size="8.5" letter-spacing="1.6" fill="#5e3f39">BARRIER SERUM</text>'+
        '<line x1="176" x2="224" y1="362" y2="362" stroke="#d8b3aa"/>'+
        '<text x="200" y="378" text-anchor="middle" '+F+' font-size="8.5" letter-spacing="1" fill="#86675f">30 ml · 1.01 fl oz</text>'+
        '<rect x="150" y="200" width="9" height="216" rx="4.5" fill="url(#'+u+'h)" opacity=".85" filter="url(#'+u+'f1)"/>'+
        '<rect x="246" y="214" width="4" height="190" rx="2" fill="#fff" opacity=".5"/>'+
        '<rect x="186" y="46" width="5" height="60" rx="2.5" fill="#fff" opacity=".35" filter="url(#'+u+'f1)"/>'};
    },
    cleanser:function(u){
      return {base:438,sw:92,defs:G(u+'b',WHITE)+G(u+'c',PINK)+G(u+'cv',[[0,'#f5c6be'],[.4,'#e8a59c'],[1,'#b56c63']],1)+G(u+'s',SHADE)+G(u+'h',HL,1)+G(u+'band',[[0,'#f8ddd5'],[1,'#f1c9bf']],1),
      body:
        '<rect x="192" y="110" width="16" height="44" fill="url(#'+u+'b)"/>'+
        '<path d="M160,90 h80 q9,0 9,9 v20 q0,9 -9,9 h-80 q-9,0 -9,-9 v-20 q0,-9 9,-9 Z" fill="url(#'+u+'c)"/>'+
        '<path d="M246,96 h48 q7,0 7,7 v7 q0,7 -7,7 h-48 Z" fill="url(#'+u+'cv)"/>'+
        '<rect x="160" y="150" width="80" height="34" rx="6" fill="url(#'+u+'c)"/>'+ridges(164,236,150,184,5,true)+
        '<rect x="132" y="180" width="136" height="258" rx="22" fill="url(#'+u+'b)"/>'+
        '<rect x="132" y="244" width="136" height="132" fill="url(#'+u+'band)"/>'+
        '<rect x="132" y="180" width="136" height="258" rx="22" fill="url(#'+u+'s)"/>'+
        '<text x="200" y="292" text-anchor="middle" '+S+' font-size="40" fill="#a95c50">fluffylab</text>'+
        '<text x="200" y="318" text-anchor="middle" '+F+' font-weight="700" font-size="10" letter-spacing="1.6" fill="#5e3f39">WHIPPED BUBBLE</text>'+
        '<text x="200" y="333" text-anchor="middle" '+F+' font-weight="600" font-size="9.5" letter-spacing="2" fill="#5e3f39">CLEANSER</text>'+
        '<text x="200" y="358" text-anchor="middle" '+F+' font-size="9" letter-spacing="1" fill="#86675f">150 ml · 5.07 fl oz</text>'+
        '<rect x="150" y="196" width="10" height="226" rx="5" fill="url(#'+u+'h)" opacity=".8" filter="url(#'+u+'f1)"/>'+
        '<rect x="168" y="94" width="5" height="28" rx="2.5" fill="#fff" opacity=".45"/>'+
        bubbles(u,[[298,424,9],[316,430,6],[286,432,5],[306,412,4],[96,428,7],[110,434,4]])};
    },
    jar:function(u){
      return {base:432,sw:112,defs:G(u+'g',GLASS)+G(u+'c',PINK)+G(u+'s',SHADE)+G(u+'h',HL,1)+G(u+'gel',[[0,'#fff6f3'],[1,'#f1c3ba']],1),
      body:
        '<rect x="110" y="298" width="180" height="134" rx="26" fill="url(#'+u+'g)"/>'+
        '<rect x="110" y="298" width="180" height="134" rx="26" fill="url(#'+u+'s)"/>'+
        '<rect x="102" y="240" width="196" height="68" rx="16" fill="url(#'+u+'c)"/>'+ridges(108,292,242,306,4,true)+
        '<rect x="102" y="240" width="196" height="68" rx="16" fill="url(#'+u+'s)" opacity=".6"/>'+
        '<rect x="102" y="300" width="196" height="8" fill="#6e352d" opacity=".18"/>'+
        '<text x="200" y="356" text-anchor="middle" '+S+' font-size="38" fill="#a95c50">fluffylab</text>'+
        '<text x="200" y="380" text-anchor="middle" '+F+' font-weight="700" font-size="8.5" letter-spacing="1.1" fill="#5e3f39">MARSHMALLOW GEL-CREAM</text>'+
        '<text x="200" y="398" text-anchor="middle" '+F+' font-size="8.5" letter-spacing="1" fill="#86675f">50 ml · 1.69 fl oz</text>'+
        '<rect x="126" y="312" width="9" height="106" rx="4.5" fill="url(#'+u+'h)" opacity=".85" filter="url(#'+u+'f1)"/>'+
        '<rect x="122" y="248" width="7" height="50" rx="3.5" fill="#fff" opacity=".45" filter="url(#'+u+'f1)"/>'+
        '<path d="M300,436 C296,420 316,410 334,414 C352,406 370,420 362,434 C356,442 306,444 300,436 Z" fill="url(#'+u+'gel)"/>'+
        '<ellipse cx="322" cy="420" rx="9" ry="3" fill="#fff" opacity=".9"/>'};
    }
  };
  function bubbles(u,list){return list.map(function(b){return '<circle cx="'+b[0]+'" cy="'+b[1]+'" r="'+b[2]+'" fill="url(#'+u+'bub)"/><circle cx="'+(b[0]-b[2]*.35)+'" cy="'+(b[1]-b[2]*.35)+'" r="'+(b[2]*.25)+'" fill="#fff"/>';}).join('');}

  function common(u){
    return '<filter id="'+u+'f8" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="9"/></filter>'+
      '<filter id="'+u+'f3" x="-50%" y="-300%" width="200%" height="700%"><feGaussianBlur stdDeviation="3"/></filter>'+
      '<filter id="'+u+'f2" x="-100%" y="-10%" width="300%" height="120%"><feGaussianBlur stdDeviation="2"/></filter>'+
      '<filter id="'+u+'f1" x="-100%" y="-10%" width="300%" height="120%"><feGaussianBlur stdDeviation="1.2"/></filter>'+
      '<radialGradient id="'+u+'bub" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".7" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#e2b7ae" stop-opacity=".8"/></radialGradient>';
  }
  function backdrop(u,w,h){
    return G(u+'bg',[[0,'#fdf2ee'],[.62,'#f5e2db'],[.63,'#efd6ce'],[1,'#e7c9bf']],1)+
      '<radialGradient id="'+u+'spot" cx=".5" cy=".38" r=".55"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>';
  }
  function shadow(u,cx,base,sw){
    return '<ellipse cx="'+cx+'" cy="'+(base+5)+'" rx="'+sw+'" ry="14" fill="#6a3830" opacity=".26" filter="url(#'+u+'f8)"/>'+
      '<ellipse cx="'+cx+'" cy="'+base+'" rx="'+(sw*.72)+'" ry="4.5" fill="#4f2820" opacity=".38" filter="url(#'+u+'f3)"/>';
  }
  function puffs(w,h){
    return [[.12,.18,60],[.86,.14,72],[.92,.5,40]].map(function(p){return '<circle cx="'+p[0]*w+'" cy="'+p[1]*h+'" r="'+p[2]+'" fill="#fff" opacity=".45"/>';}).join('');
  }
  function shot(type){
    var u='p'+(n++), p=P[type](u);
    return '<svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+type+'"><defs>'+common(u)+backdrop(u)+p.defs+'</defs>'+
      '<rect width="400" height="480" fill="url(#'+u+'bg)"/><rect width="400" height="480" fill="url(#'+u+'spot)"/>'+puffs(400,480)+
      shadow(u,200,p.base,p.sw)+p.body+'</svg>';
  }
  function group(){
    var u='g'+(n++), defs=common(u)+backdrop(u), out='';
    var items=[['cleanser',160,.82],['serum',340,.82],['jar',715,.8],['sunscreen',530,.95]];
    var bodies=items.map(function(it){
      var uu=u+it[0], p=P[it[0]](uu), s=it[2], tx=it[1]-200*s, ty=488-p.base*s;
      defs+=common(uu)+p.defs;
      return '<g transform="translate('+tx+','+ty+') scale('+s+')">'+shadow(uu,200,p.base,p.sw)+p.body+'</g>';
    });
    return '<svg viewBox="0 0 880 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fluffy Lab collection"><defs>'+defs+'</defs>'+
      '<rect width="880" height="540" fill="url(#'+u+'bg)"/><rect width="880" height="540" fill="url(#'+u+'spot)"/>'+puffs(880,540)+bodies.join('')+'</svg>';
  }
  document.querySelectorAll('[data-shot]').forEach(function(el){
    var k=el.getAttribute('data-shot'), names={group:'Fluffy Lab collection',sunscreen:'Fluffy Cloud UV Sunscreen',serum:'Fluffy Dew Glaze Barrier Serum',cleanser:'Fluffy Whipped Bubble Cleanser',jar:'Fluffy Marshmallow Gel-Cream'};
    el.innerHTML = '<img src="img/'+k+'.webp" alt="'+names[k]+'" width="'+(k==='group'?1760:1000)+'" height="'+(k==='group'?1080:1200)+'" loading="'+(k==='group'?'eager':'lazy')+'">';
  });

  var saved='tr'; try{saved=localStorage.getItem('fl-lang')||'tr'}catch(e){}
  setLang(saved);
})();
