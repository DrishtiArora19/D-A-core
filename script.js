// script.js — small micro-interactions and reveal-on-scroll
document.addEventListener('DOMContentLoaded', function(){
  // Mobile nav toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if(menuToggle && nav){
    menuToggle.addEventListener('click', ()=>{
      nav.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });
  }

  // Smooth scroll for anchor links (enhanced)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Cart micro interaction (pulse when clicked)
  const cartBtn = document.querySelector('.icon-btn.cart');
  if(cartBtn){
    cartBtn.addEventListener('click', ()=>{
      cartBtn.animate([
        {transform:'scale(1)'},
        {transform:'scale(1.06)'},
        {transform:'scale(1)'}
      ],{duration:320,easing:'cubic-bezier(.2,.9,.3,1)'});
    });
  }

  // Live chat button (placeholder interaction)
  const chatBtn = document.getElementById('chatBtn');
  if(chatBtn){
    chatBtn.addEventListener('click', ()=>{
      // Simple placeholder: open mailto or show a quick inline message
      const openMail = confirm('Open an email to customer service for live chat?');
      if(openMail){
        window.location.href = 'mailto:support@studio.com?subject=Live%20Chat%20Request';
      }
    });
  }
});
