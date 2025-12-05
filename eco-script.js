// eco-script.js — small interactions for the eco-themed page
document.addEventListener('DOMContentLoaded', ()=>{
  const menu = document.getElementById('ecoMenu');
  const nav = document.getElementById('ecoNav');
  if(menu && nav){
    menu.addEventListener('click', ()=>{
      nav.classList.toggle('open');
      menu.classList.toggle('open');
    });
  }

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Reveal elements on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e => {
      if(e.isIntersecting){
        // stagger stats-card reveals by index within their grid
        if(e.target.classList && e.target.classList.contains('stats-card')){
          let idx = 0;
          try{
            const parent = e.target.parentNode;
            if(parent){ idx = Array.prototype.indexOf.call(parent.children, e.target); }
          }catch(err){ idx = 0 }
          e.target.style.transitionDelay = (idx * 120) + 'ms';
        }
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.cat-card, .comm-card, .story-media, .hero-media, .stats-card').forEach(el=>observer.observe(el));

  // Expand / collapse clothing panel when the Sustainable Clothing card is pressed
  const clothingCard = document.querySelector('.cat-card[data-cat="clothing"]');
  const clothingPanel = document.getElementById('clothing-panel');
  const closeBtn = document.getElementById('closeClothing');
  function openPanel(){
    if(!clothingPanel) return;
    clothingPanel.classList.add('open');
    clothingPanel.setAttribute('aria-hidden','false');
    // animate max-height to content height for smooth open
    const grid = clothingPanel.querySelector('.panel-grid');
    clothingPanel.style.maxHeight = (grid ? grid.scrollHeight + 160 : 600) + 'px';
  }
  function closePanel(){
    if(!clothingPanel) return;
    clothingPanel.style.maxHeight = '0';
    clothingPanel.setAttribute('aria-hidden','true');
    clothingPanel.classList.remove('open');
  }
  if(clothingCard && clothingPanel){
    clothingCard.addEventListener('click', function(e){
      e.preventDefault();
      if(clothingPanel.classList.contains('open')){
        closePanel();
      } else {
        openPanel();
        // scroll into view smoothly so user sees expanded panel
        setTimeout(()=>{clothingPanel.scrollIntoView({behavior:'smooth',block:'start'})},120);
      }
    });
  }
  if(closeBtn){
    closeBtn.addEventListener('click', ()=>{ closePanel(); });
  }

  // Footwear panel handlers
  const footwearCard = document.querySelector('.cat-card[data-cat="footwear"]');
  const footwearPanel = document.getElementById('footwear-panel');
  const closeFootwearBtn = document.getElementById('closeFootwear');
  function openFootwear(){
    if(!footwearPanel) return;
    footwearPanel.classList.add('open');
    footwearPanel.setAttribute('aria-hidden','false');
    const grid = footwearPanel.querySelector('.panel-grid');
    footwearPanel.style.maxHeight = (grid ? grid.scrollHeight + 160 : 600) + 'px';
  }
  function closeFootwear(){
    if(!footwearPanel) return;
    footwearPanel.style.maxHeight = '0';
    footwearPanel.setAttribute('aria-hidden','true');
    footwearPanel.classList.remove('open');
  }
  if(footwearCard && footwearPanel){
    footwearCard.addEventListener('click', function(e){
      e.preventDefault();
      if(footwearPanel.classList.contains('open')){
        closeFootwear();
      } else {
        // close other panels first
        // close other panels first
        closePanel();
        // if skincare open, close it too
        if(typeof closeSkincare === 'function'){
          try{ closeSkincare(); }catch(e){}
        }
        openFootwear();
        setTimeout(()=>{footwearPanel.scrollIntoView({behavior:'smooth',block:'start'})},120);
      }
    });
  }
  if(closeFootwearBtn){
    closeFootwearBtn.addEventListener('click', ()=>{ closeFootwear(); });
  }

  // Skincare panel handlers
  const skincareCard = document.querySelector('.cat-card[data-cat="skincare"]');
  const skincarePanel = document.getElementById('skincare-panel');
  const closeSkincareBtn = document.getElementById('closeSkincare');
  function openSkincare(){
    if(!skincarePanel) return;
    skincarePanel.classList.add('open');
    skincarePanel.setAttribute('aria-hidden','false');
    const grid = skincarePanel.querySelector('.panel-grid');
    skincarePanel.style.maxHeight = (grid ? grid.scrollHeight + 160 : 600) + 'px';
  }
  function closeSkincare(){
    if(!skincarePanel) return;
    skincarePanel.style.maxHeight = '0';
    skincarePanel.setAttribute('aria-hidden','true');
    skincarePanel.classList.remove('open');
  }
  if(skincareCard && skincarePanel){
    skincareCard.addEventListener('click', function(e){
      e.preventDefault();
      if(skincarePanel.classList.contains('open')){
        closeSkincare();
      } else {
        // close other panels first
        closePanel();
        try{ closeFootwear(); }catch(e){}
        openSkincare();
        setTimeout(()=>{skincarePanel.scrollIntoView({behavior:'smooth',block:'start'})},120);
      }
    });
  }
  if(closeSkincareBtn){
    closeSkincareBtn.addEventListener('click', ()=>{ closeSkincare(); });
  }

  // Home Décor panel handlers
  const homedecorCard = document.querySelector('.cat-card[data-cat="homedecor"]');
  const homedecorPanel = document.getElementById('homedecor-panel');
  const closeHomeDecorBtn = document.getElementById('closeHomeDecor');
  function openHomeDecor(){
    if(!homedecorPanel) return;
    homedecorPanel.classList.add('open');
    homedecorPanel.setAttribute('aria-hidden','false');
    const grid = homedecorPanel.querySelector('.panel-grid');
    homedecorPanel.style.maxHeight = (grid ? grid.scrollHeight + 160 : 600) + 'px';
  }
  function closeHomeDecor(){
    if(!homedecorPanel) return;
    homedecorPanel.style.maxHeight = '0';
    homedecorPanel.setAttribute('aria-hidden','true');
    homedecorPanel.classList.remove('open');
  }
  if(homedecorCard && homedecorPanel){
    homedecorCard.addEventListener('click', function(e){
      e.preventDefault();
      if(homedecorPanel.classList.contains('open')){
        closeHomeDecor();
      } else {
        // close other panels first
        closePanel();
        try{ closeFootwear(); }catch(e){}
        try{ closeSkincare(); }catch(e){}
        openHomeDecor();
        setTimeout(()=>{homedecorPanel.scrollIntoView({behavior:'smooth',block:'start'})},120);
      }
    });
  }
  if(closeHomeDecorBtn){
    closeHomeDecorBtn.addEventListener('click', ()=>{ closeHomeDecor(); });
  }

  // Accessories panel handlers
  const accessoriesCard = document.querySelector('.cat-card[data-cat="accessories"]');
  const accessoriesPanel = document.getElementById('accessories-panel');
  const closeAccessoriesBtn = document.getElementById('closeAccessories');
  function openAccessories(){
    if(!accessoriesPanel) return;
    accessoriesPanel.classList.add('open');
    accessoriesPanel.setAttribute('aria-hidden','false');
    const grid = accessoriesPanel.querySelector('.panel-grid');
    accessoriesPanel.style.maxHeight = (grid ? grid.scrollHeight + 160 : 600) + 'px';
  }
  function closeAccessories(){
    if(!accessoriesPanel) return;
    accessoriesPanel.style.maxHeight = '0';
    accessoriesPanel.setAttribute('aria-hidden','true');
    accessoriesPanel.classList.remove('open');
  }
  if(accessoriesCard && accessoriesPanel){
    accessoriesCard.addEventListener('click', function(e){
      e.preventDefault();
      if(accessoriesPanel.classList.contains('open')){
        closeAccessories();
      } else {
        // close other panels first
        closePanel();
        try{ closeFootwear(); }catch(e){}
        try{ closeSkincare(); }catch(e){}
        try{ closeHomeDecor(); }catch(e){}
        openAccessories();
        setTimeout(()=>{accessoriesPanel.scrollIntoView({behavior:'smooth',block:'start'})},120);
      }
    });
  }
  if(closeAccessoriesBtn){
    closeAccessoriesBtn.addEventListener('click', ()=>{ closeAccessories(); });
  }

  // Wellness panel handlers
  const wellnessCard = document.querySelector('.cat-card[data-cat="wellness"]');
  const wellnessPanel = document.getElementById('wellness-panel');
  const closeWellnessBtn = document.getElementById('closeWellness');
  function openWellness(){
    if(!wellnessPanel) return;
    wellnessPanel.classList.add('open');
    wellnessPanel.setAttribute('aria-hidden','false');
    const grid = wellnessPanel.querySelector('.panel-grid');
    wellnessPanel.style.maxHeight = (grid ? grid.scrollHeight + 160 : 600) + 'px';
  }
  function closeWellness(){
    if(!wellnessPanel) return;
    wellnessPanel.style.maxHeight = '0';
    wellnessPanel.setAttribute('aria-hidden','true');
    wellnessPanel.classList.remove('open');
  }
  if(wellnessCard && wellnessPanel){
    wellnessCard.addEventListener('click', function(e){
      e.preventDefault();
      if(wellnessPanel.classList.contains('open')){
        closeWellness();
      } else {
        // close other panels first
        closePanel();
        try{ closeFootwear(); }catch(e){}
        try{ closeSkincare(); }catch(e){}
        try{ closeHomeDecor(); }catch(e){}
        try{ closeAccessories(); }catch(e){}
        openWellness();
        setTimeout(()=>{wellnessPanel.scrollIntoView({behavior:'smooth',block:'start'})},120);
      }
    });
  }
  if(closeWellnessBtn){
    closeWellnessBtn.addEventListener('click', ()=>{ closeWellness(); });
  }

  // Tech panel handlers
  const techCard = document.querySelector('.cat-card[data-cat="tech"]');
  const techPanel = document.getElementById('tech-panel');
  const closeTechBtn = document.getElementById('closeTech');
  function openTech(){
    if(!techPanel) return;
    techPanel.classList.add('open');
    techPanel.setAttribute('aria-hidden','false');
    const grid = techPanel.querySelector('.panel-grid');
    techPanel.style.maxHeight = (grid ? grid.scrollHeight + 160 : 600) + 'px';
  }
  function closeTech(){
    if(!techPanel) return;
    techPanel.style.maxHeight = '0';
    techPanel.setAttribute('aria-hidden','true');
    techPanel.classList.remove('open');
  }
  if(techCard && techPanel){
    techCard.addEventListener('click', function(e){
      e.preventDefault();
      if(techPanel.classList.contains('open')){
        closeTech();
      } else {
        // close other panels first
        closePanel();
        try{ closeFootwear(); }catch(e){}
        try{ closeSkincare(); }catch(e){}
        try{ closeHomeDecor(); }catch(e){}
        try{ closeAccessories(); }catch(e){}
        try{ closeWellness(); }catch(e){}
        openTech();
        setTimeout(()=>{techPanel.scrollIntoView({behavior:'smooth',block:'start'})},120);
      }
    });
  }
  if(closeTechBtn){
    closeTechBtn.addEventListener('click', ()=>{ closeTech(); });
  }
});
