(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const se="http://localhost:8000";async function L(e,t={}){try{const n=`${se}${e}`,a={"Content-Type":"application/json",...t.headers},s=await fetch(n,{...t,headers:a});if(!s.ok){const i=await s.json().catch(()=>({}));throw new Error(i.error||`API error: ${s.status} ${s.statusText}`)}return{data:await s.json(),error:null,loading:!1}}catch(n){return console.error("API request failed:",n),{data:null,error:n instanceof Error?n.message:"Unknown error occurred",loading:!1}}}const D={users:{register:async(e,t,n)=>L("/register",{method:"POST",body:JSON.stringify({username:e,password:t,email:n})}),setAlias:async(e,t)=>L("/set-alias",{method:"POST",body:JSON.stringify({userId:e,alias:t})}),login:async(e,t)=>L("/login",{method:"POST",body:JSON.stringify({username:e,password:t})}),getProfile:async e=>L(`/users/${e}`,{method:"GET"})},tournaments:{create:async(e,t,n)=>L("/tournaments",{method:"POST",body:JSON.stringify({name:e,max_players:t,created_by:n})}),getAll:async()=>L("/tournaments",{method:"GET"}),getById:async e=>L(`/tournaments/${e}`,{method:"GET"}),join:async(e,t,n)=>L(`/tournaments/${e}/join`,{method:"POST",body:JSON.stringify({playerAliases:t,userId:n})}),leave:async(e,t)=>L(`/tournaments/${e}/leave`,{method:"DELETE",body:JSON.stringify({player_id:t})})}};function oe(e={}){var Z;const t=document.createElement("div");t.className="profile-settings";const n={username:"",displayName:"",skillLevel:"beginner",bio:"",...e},a=document.createElement("form");a.className="profile-form",a.noValidate=!0;const s=document.createElement("div");s.className="form-section";const o=document.createElement("div");o.className="avatar-section";const i=document.createElement("label");i.className="form-label",i.textContent="Customize Avatar";const r=document.createElement("div");r.className="avatar-container";const l=document.createElement("div");l.className="avatar-preview-container";const d=document.createElement("div");d.className="avatar-preview",d.innerHTML=`
    <i class="fas fa-user-circle"></i>
  `;const p=document.createElement("div");p.className="avatar-upload",p.innerHTML='<i class="fas fa-camera"></i>';const c=document.createElement("input");c.type="file",c.accept="image/*",c.className="avatar-input",c.hidden=!0;const v=document.createElement("button");v.type="button",v.className="secondary-button",v.textContent="Change Avatar",v.style.marginTop="1rem",v.addEventListener("click",()=>c.click()),l.appendChild(d),l.appendChild(p),r.appendChild(l),r.appendChild(v),r.appendChild(c),o.appendChild(i),o.appendChild(r),s.appendChild(o);const u=M({label:"Username",name:"username",type:"text",value:n.username,required:!0,placeholder:"Enter your username"}),h=M({label:"Display Name",name:"displayName",type:"text",value:n.displayName,required:!0,placeholder:"Enter your display name"}),f=document.createElement("div");f.className="form-group";const y=document.createElement("label");y.className="form-label",y.textContent="Skill Level",y.htmlFor="skillLevel";const g=[{id:"beginner",label:"Beginner",emoji:"👶"},{id:"intermediate",label:"Intermediate",emoji:"💪"},{id:"expert",label:"Expert",emoji:"🏆"}],m=document.createElement("div");m.className="skill-level-options",g.forEach(({id:N,label:J,emoji:$})=>{const A=`skill-${N}`,w=document.createElement("div");w.className="radio-option",w.dataset.level=N;const x=document.createElement("input");x.type="radio",x.id=A,x.name="skillLevel",x.value=N,x.checked=n.skillLevel===N;const P=document.createElement("label");P.htmlFor=A,P.dataset.level=N;const V=document.createElement("span");V.className="level-emoji",V.textContent=$;const _=document.createElement("span");_.className="level-text",_.textContent=J,P.appendChild(V),P.appendChild(document.createElement("br")),P.appendChild(_),w.appendChild(x),w.appendChild(P),m.appendChild(w)}),f.appendChild(y),f.appendChild(m);const b=M({label:"Bio (Optional)",name:"bio",type:"textarea",value:n.bio,placeholder:"Tell us about yourself..."}),S=document.createElement("div");S.className="settings-button-container",S.innerHTML=`
    <button type="button" class="settings-button advanced-toggle-button">
      <span class="button-icon"><i class="fas fa-sliders-h"></i></span>
      <span class="button-text">ADVANCED SETTINGS</span>
      <span class="button-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
  `;const k=document.createElement("div");k.className="advanced-content",k.style.display="none";const ne=M({label:"New Password",name:"newPassword",type:"password",placeholder:"Leave blank to keep current",autoComplete:"new-password"}),ae=M({label:"Confirm New Password",name:"confirmPassword",type:"password",placeholder:"Confirm your new password",autoComplete:"new-password"});k.appendChild(ne),k.appendChild(ae);const W=S.querySelector(".advanced-toggle-button"),X=S.querySelector(".fa-chevron-down");W==null||W.addEventListener("click",()=>{const N=k.style.display!=="none";k.style.display=N?"none":"block",X&&(X.className=N?"fas fa-chevron-down":"fas fa-chevron-up")});const U=document.createElement("div");U.className="settings-button-container",U.innerHTML=`
    <button type="submit" class="settings-button save-changes-button">
      <span class="button-icon"><i class="fas fa-save"></i></span>
      <span class="button-text">SAVE CHANGES</span>
      <span class="button-check"><i class="fas fa-check"></i></span>
    </button>
  `,a.appendChild(s),a.appendChild(u),a.appendChild(h),a.appendChild(f),a.appendChild(b),a.appendChild(S),a.appendChild(k);const O=document.createElement("div");O.className="settings-button-container",O.innerHTML=`
    <button type="button" class="settings-button game-history-button">
      <span class="button-icon"><i class="fas fa-history"></i></span>
      <span class="button-text">GAME HISTORY</span>
      <span class="button-arrow"><i class="fas fa-external-link-alt"></i></span>
    </button>
  `,(Z=O.querySelector("button"))==null||Z.addEventListener("click",()=>{console.log("Game History clicked"),F("Game History feature coming soon!","info")}),a.appendChild(O);const B=document.createElement("div");B.className="delete-profile-section",B.innerHTML=`
    <div class="danger-zone">
      <h3 class="danger-zone-title">
        <i class="fas fa-exclamation-triangle"></i>
        Danger Zone
      </h3>
      <p class="danger-zone-description">
        Once you delete your profile, there is no going back. This action cannot be undone.
      </p>
      <div class="settings-button-container">
        <button type="button" class="settings-button delete-profile-button">
          <span class="button-icon"><i class="fas fa-trash-alt"></i></span>
          <span class="button-text">DELETE PROFILE</span>
          <span class="button-arrow"><i class="fas fa-exclamation-triangle"></i></span>
        </button>
      </div>
    </div>
  `;const j=B.querySelector(".delete-profile-button");return j==null||j.addEventListener("click",()=>{ie()}),a.appendChild(B),a.appendChild(U),a.addEventListener("submit",async N=>{N.preventDefault();const J=new FormData(a),$={};J.forEach((w,x)=>{w&&($[x]=w)});const A=a.querySelector('input[name="skillLevel"]:checked');A&&($.skillLevel=A.value);try{console.log("Updating profile:",$),F("Profile updated successfully!","success")}catch(w){console.error("Error updating profile:",w),F("Failed to update profile. Please try again.","error")}}),t.appendChild(a),t}function M({label:e,name:t,type:n,value:a="",required:s=!1,placeholder:o="",autoComplete:i="",className:r=""}){const l=document.createElement("div");l.className=`form-group ${r}`.trim();const d=document.createElement("label");d.className="form-label",d.htmlFor=t,d.textContent=e;let p;if(n==="textarea"){const c=document.createElement("textarea");c.id=t,c.name=t,c.value=a,c.placeholder=o,c.required=s,c.rows=3,p=c}else{const c=document.createElement("input");c.type=n,c.id=t,c.name=t,c.value=a,c.placeholder=o,c.required=s,i&&(c.autocomplete=i),p=c}return p.className="form-input",l.appendChild(d),l.appendChild(p),l}function ie(){const e=document.createElement("div");e.className="modal-overlay delete-profile-modal",e.innerHTML=`
    <div class="modal-content">
      <div class="modal-header danger-header">
        <div class="modal-title">
          <i class="fas fa-exclamation-triangle"></i>
          Delete Profile
        </div>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="delete-confirmation-content">
          <div class="warning-icon">
            <i class="fas fa-trash-alt"></i>
          </div>
          <h3>Are you absolutely sure?</h3>
          <p class="warning-text">
            This action <strong>cannot be undone</strong>. This will permanently delete your profile, 
            including all your game history, statistics, friends, and achievements.
          </p>
          <div class="confirmation-input-group">
            <label for="delete-confirmation">
              Type <strong>DELETE</strong> to confirm:
            </label>
            <input 
              type="text" 
              id="delete-confirmation" 
              placeholder="Type DELETE here"
              class="confirmation-input"
            />
          </div>
        </div>
      </div>
      <div class="modal-footer danger-footer">
        <button class="secondary-button modal-close">Cancel</button>
        <button class="danger-button" id="confirm-delete-btn" disabled>
          <i class="fas fa-trash-alt"></i>
          Delete Profile Forever
        </button>
      </div>
    </div>
  `;const t=e.querySelector("#delete-confirmation"),n=e.querySelector("#confirm-delete-btn");t.addEventListener("input",()=>{t.value.trim().toUpperCase()==="DELETE"?(n.disabled=!1,n.classList.add("enabled")):(n.disabled=!0,n.classList.remove("enabled"))}),n.addEventListener("click",async()=>{if(t.value.trim().toUpperCase()==="DELETE")try{n.innerHTML='<i class="fas fa-spinner fa-spin"></i> Deleting...',n.disabled=!0,await new Promise(a=>setTimeout(a,2e3)),console.log("Profile deletion confirmed"),e.remove(),F("Profile deleted successfully. Redirecting...","success"),setTimeout(()=>{window.location.href="/"},2e3)}catch(a){console.error("Error deleting profile:",a),F("Failed to delete profile. Please try again.","error"),n.innerHTML='<i class="fas fa-trash-alt"></i> Delete Profile Forever',n.disabled=!1}}),e.addEventListener("click",a=>{(a.target===e||a.target.classList.contains("modal-close"))&&e.remove()}),document.body.appendChild(e),setTimeout(()=>{t.focus()},100)}const F=window.showMessage;window.messageTimeout=null;let z=null;function E(e){R(),setTimeout(()=>{history.pushState(null,"",e);const t=document.getElementById("app");if(t){I(t),document.title=ee(e);const n=document.getElementById("screen-reader-live-region");n&&(n.textContent="",n.textContent=`Navigated to ${document.title}.`),window.scrollTo(0,0)}q()},300)}function ee(e){switch(e){case"/":return"Home - Neon Pong";case"/tournament":return"Tournaments - Neon Pong";case"/register":return"Register - Neon Pong";case"/login":return"Login - Neon Pong";case"/profile":return"Profile - Neon Pong";default:return"Page Not Found - Neon Pong"}}function te(){const e=document.createElement("div");e.className="loading-overlay hidden",e.id="loading-overlay",e.setAttribute("role","status"),e.setAttribute("aria-live","assertive");const t=document.createElement("div");t.className="spinner",e.appendChild(t);const n=document.createElement("p");return n.className="loading-text",n.textContent="Loading...",n.setAttribute("aria-label","Content is loading"),e.appendChild(n),e}function R(){const e=document.getElementById("app");if(e){let t=document.getElementById("loading-overlay");t||(t=te(),e.appendChild(t)),t.classList.remove("hidden")}}function q(){const e=document.getElementById("loading-overlay");e&&e.classList.add("hidden")}function C(e,t="info"){const n=document.querySelector(".message");n&&n.remove(),window.messageTimeout&&clearTimeout(window.messageTimeout);const a=document.createElement("div");a.className=`message ${t}-message`;const s=document.createElement("div");s.className="message-content",s.textContent=e;const o=document.createElement("button");o.className="close-button",o.innerHTML="&times;",o.setAttribute("aria-label","Close message"),o.addEventListener("click",()=>{a.remove(),window.messageTimeout&&clearTimeout(window.messageTimeout)});let i="";t==="success"?i="✓":t==="error"?i="✕":i="ℹ";const r=document.createElement("span");r.className="message-icon",r.textContent=i,a.appendChild(r),a.appendChild(s),a.appendChild(o),a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.setAttribute("aria-atomic","true"),document.body.appendChild(a),window.messageTimeout=window.setTimeout(()=>{a.style.opacity="0",a.style.transform="translateY(-20px)",setTimeout(()=>a.remove(),300)},5e3)}let H=!1,T=1;function re(){H=!H,document.body.classList.toggle("high-contrast",H),localStorage.setItem("highContrast",H.toString())}function Q(e){const s=Math.max(.8,Math.min(2,T+(e?.1:-.1)));if(s!==T){T=s,document.documentElement.style.setProperty("--font-size-multiplier",T.toString()),document.body.style.display="none",document.body.offsetHeight,document.body.style.display="";const o=document.querySelector(".font-size-display");if(o){const i=Math.round(T*100),r=`Font size set to ${i}%`;o.textContent=`${i}%`,localStorage.setItem("fontSizeMultiplier",T.toString()),o.classList.add("active"),setTimeout(()=>o.classList.remove("active"),500);const l=document.getElementById("a11y-announcement");l?(l.textContent=r,setTimeout(()=>l.textContent="",1e3)):C(r,"info")}}}function le(){localStorage.getItem("highContrast")==="true"&&(H=!0,document.body.classList.add("high-contrast"));const t=parseFloat(localStorage.getItem("fontSizeMultiplier")||"1");t>=.8&&t<=1.5&&(T=t,document.documentElement.style.setProperty("--font-size-multiplier",T.toString()))}typeof document<"u"&&document.addEventListener("DOMContentLoaded",le);function ce(){const e=document.createElement("nav");e.className="navbar",e.setAttribute("aria-label","Main navigation");const t=document.createElement("a");t.className="navbar-logo",t.textContent="Neon Pong",t.href="/",t.addEventListener("click",m=>{m.preventDefault(),E("/")});const n=document.createElement("div");n.id="mobile-menu",n.className="menu-toggle",n.setAttribute("aria-expanded","false"),n.setAttribute("aria-controls","navbarLinksContainer");for(let m=0;m<3;m++){const b=document.createElement("span");b.className="bar",n.appendChild(b)}const a=document.createElement("div");a.id="navbarLinksContainer",a.className="navbar-links-container";const s=document.createElement("div");s.className="navbar-links",s.setAttribute("role","menubar");const o=document.createElement("a");o.href="/",o.className="navbar-link",o.textContent="Home",o.setAttribute("role","menuitem"),o.addEventListener("click",m=>{m.preventDefault(),E("/")});const i=document.createElement("a");i.href="/tournament",i.className="navbar-link",i.textContent="Tournaments",i.setAttribute("role","menuitem"),i.addEventListener("click",m=>{m.preventDefault(),E("/tournament")});const r=document.createElement("a");r.href="/ACCOUNT",r.className="navbar-link",r.textContent="ACCOUNT",r.setAttribute("role","menuitem"),r.addEventListener("click",m=>{m.preventDefault();const b=window.location.pathname;E((b==="/login"||b==="/register")&&b==="/login"?"/register":"/login")}),s.appendChild(o),s.appendChild(i),s.appendChild(r);const l=document.createElement("a");l.href="/profile",l.className="navbar-link",l.textContent="Profile",l.setAttribute("role","menuitem"),l.addEventListener("click",m=>{m.preventDefault(),E("/profile")}),s.appendChild(l);const d=document.createElement("div");d.className="accessibility-controls",d.setAttribute("aria-label","Accessibility controls");const p=document.createElement("button");p.className="accessibility-btn",p.innerHTML='<i class="fas fa-adjust" aria-hidden="true"></i>',p.setAttribute("aria-label","Toggle high contrast mode"),p.setAttribute("title","Toggle high contrast mode"),p.addEventListener("click",re);const c=document.createElement("div");c.className="font-size-controls",c.setAttribute("aria-label","Font size controls");const v=document.createElement("span");v.className="sr-only",v.textContent="Font size: ",c.appendChild(v);const u=document.createElement("button");u.className="font-size-btn",u.innerHTML='<i class="fas fa-minus" aria-hidden="true"></i> <span class="sr-only">Decrease font size</span>',u.setAttribute("aria-label","Decrease font size"),u.setAttribute("title","Decrease font size (Smaller text)"),u.addEventListener("click",m=>{m.preventDefault(),Q(!1)});const h=document.createElement("span");h.className="font-size-display",h.textContent="A",h.setAttribute("aria-hidden","true");const f=document.createElement("button");f.className="font-size-btn",f.innerHTML='<i class="fas fa-plus" aria-hidden="true"></i> <span class="sr-only">Increase font size</span>',f.setAttribute("aria-label","Increase font size"),f.setAttribute("title","Increase font size (Larger text)"),f.addEventListener("click",m=>{m.preventDefault(),Q(!0)}),c.appendChild(u),c.appendChild(h),c.appendChild(f);const y=document.createElement("a");y.href="#main-content",y.className="skip-to-content",y.textContent="Skip to main content",y.setAttribute("tabindex","0");const g=document.createElement("div");return g.className="controls-container",g.appendChild(c),g.appendChild(p),d.appendChild(g),a.appendChild(s),a.appendChild(d),e.prepend(y),e.appendChild(t),e.appendChild(n),e.appendChild(a),n.addEventListener("click",()=>{a.classList.toggle("active"),n.classList.toggle("active");const m=n.classList.contains("active");n.setAttribute("aria-expanded",String(m))}),s.querySelectorAll(".navbar-link").forEach(m=>{m.addEventListener("click",()=>{window.innerWidth<=768&&(a.classList.remove("active"),n.classList.remove("active"),n.setAttribute("aria-expanded","false"))})}),document.addEventListener("click",m=>{window.innerWidth<=768&&!a.contains(m.target)&&!n.contains(m.target)&&a.classList.contains("active")&&(a.classList.remove("active"),n.classList.remove("active"),n.setAttribute("aria-expanded","false"))}),e}function G(){return document.createElement("footer")}function de(){const e=document.createElement("div");e.className="page",e.setAttribute("role","main"),e.id="home";const t=document.createElement("section");t.className="hero-section content-section";const n=document.createElement("img");n.className="ping-pong-paddle";const a=document.createElement("h1");a.className="hero-title",a.textContent="NEON PONG";const s=document.createElement("h2");s.className="hero-subtitle",s.textContent="THE ULTIMATE RETRO-FUTURISTIC ARCADE EXPERIENCE.";const o=document.createElement("p");o.className="hero-description",o.textContent="Challenge your friends in a fast-paced game of skill and reflexes.";const i=document.createElement("div");i.className="hero-cta";const r=document.createElement("button");r.className="primary-button register-cta-button",r.innerHTML='<i class="fas fa-user-plus"></i> Register Now',r.addEventListener("click",()=>E("/register")),i.appendChild(r),t.appendChild(n),t.appendChild(a),t.appendChild(s),t.appendChild(o),t.appendChild(i),e.appendChild(t);const l=document.createElement("section");l.id="team",l.className="content-section";const d=document.createElement("h2");d.className="section-title",d.textContent="Meet the Team",l.appendChild(d);const p=document.createElement("div");return p.className="team-grid",[{name:"Hanieh",avatar:"/pic1.png"},{name:"Mira",avatar:"/pic2.png"},{name:"Fatima Fidha",avatar:"/pic3.png"}].forEach(v=>{const u=document.createElement("div");u.className="team-member-card";const h=document.createElement("img");h.src=v.avatar,h.alt=`Avatar of ${v.name}`,h.className="team-member-avatar";const f=document.createElement("p");f.className="team-member-name",f.textContent=v.name,u.appendChild(h),u.appendChild(f),p.appendChild(u)}),l.appendChild(p),e.appendChild(l),e.appendChild(G()),e}function me(){const e=document.createElement("div");e.className="page content-section",e.id="tournaments-page",e.setAttribute("role","main");const t=document.createElement("h1");t.className="section-title",t.textContent="Tournaments",e.appendChild(t);const n=document.createElement("button");n.className="primary-button",n.style.cssText="margin-bottom: 2rem; display: block; margin-left: auto; margin-right: auto;",n.innerHTML='<i class="fas fa-plus"></i> Create Tournament',n.addEventListener("click",ke),e.appendChild(n);const a=document.createElement("div");return a.className="tournament-list",a.setAttribute("role","list"),a.id="tournament-list-container",e.appendChild(a),pe(a),e.appendChild(G()),e}async function pe(e){R();try{const t=await D.tournaments.getAll();t.data&&t.data.length>0?(e.innerHTML="",t.data.forEach(n=>{const a=document.createElement("div");a.className="tournament-item",a.setAttribute("role","listitem");let s="",o="",i=!1;n.status==="pending"?(s="status-open",o="Join Tournament"):n.status==="started"?(s="status-in-progress",o="View Progress",i=!0):(s="status-completed",o="View Results"),a.innerHTML=`
          <h3>${n.name}</h3>
          <p class="tournament-status"><span class="status-indicator ${s}"></span> ${n.status}</p>
          <p><strong>Max Players:</strong> ${n.max_players}</p>
          <button class="primary-button join-button ${n.status==="completed"?"secondary-button":""}" ${i?"disabled":""}>${o}</button>
        `;const r=a.querySelector(".join-button");r&&n.status==="pending"&&r.addEventListener("click",()=>{console.log(`Joining tournament: ${n.name}`)}),e.appendChild(a)})):e.innerHTML=`
        <div style="text-align: center; color: var(--text-color-light); padding: 2rem;">
          <p>No tournaments available. Create one to get started!</p>
        </div>
      `}catch(t){e.innerHTML=`
      <div style="text-align: center; color: var(--error-color); padding: 2rem;">
        <p>Failed to load tournaments. Please try again later.</p>
      </div>
    `,console.error("Failed to load tournaments:",t)}finally{q()}}function Y(e=!0){const t=document.createElement("div");t.className="page content-section",t.id=e?"login":"register",t.setAttribute("role","main");const n=document.createElement("div");n.className="form-container";const a=document.createElement("p");a.className="text-center mt-4";const s=document.createElement("a");s.href="#",s.className="text-blue-500 hover:underline",s.textContent=e?"Create an ACCOUNT":"Sign in to existing ACCOUNT",s.addEventListener("click",m=>{m.preventDefault(),E(e?"/register":"/login")});const o=document.createElement("div");o.className="toggle-text-container";const i=document.createElement("span");i.className="toggle-text",i.textContent=e?"Don't have an account? ":"Already have an account? ",s.className="toggle-link neon-text",s.style.marginLeft="4px",s.style.textDecoration="none",s.style.transition="all 0.3s ease",s.style.fontWeight="600",s.addEventListener("mouseenter",()=>{s.style.textShadow="0 0 10px rgba(99, 102, 241, 0.8)"}),s.addEventListener("mouseleave",()=>{s.style.textShadow="none"}),o.appendChild(i),o.appendChild(s),a.appendChild(o);const r=document.createElement("h2");r.className="form-title",r.textContent=e?"Login to Neon Pong":"Register for Neon Pong";const l=document.createElement("form");l.noValidate=!0;let d=null;if(!e){const m=document.createElement("label");m.className="form-label",m.textContent="Email",d=document.createElement("input"),d.type="email",d.className="form-input",d.required=!0,d.placeholder="Enter your email",l.appendChild(m),l.appendChild(d)}const p=document.createElement("label");p.className="form-label",p.textContent="Username";const c=document.createElement("input");c.type="text",c.className="form-input",c.required=!0,c.placeholder="Choose a username";const v=document.createElement("label");v.className="form-label",v.textContent="Password";const u=document.createElement("input");u.type="password",u.className="form-input",u.required=!0,u.placeholder="Create a password";let h=null,f=null;e||(f=document.createElement("label"),f.className="form-label",f.textContent="Confirm Password",h=document.createElement("input"),h.type="password",h.className="form-input",h.required=!0,h.placeholder="Confirm your password");const y=document.createElement("button");y.type="submit",y.className="primary-button w-full",y.textContent=e?"Login":"Register";const g=document.createElement("button");return g.type="button",g.className="secondary-button w-full mt-2",g.textContent="Back to Home",g.addEventListener("click",()=>E("/")),e||l.appendChild(document.createElement("br")),l.appendChild(p),l.appendChild(c),l.appendChild(document.createElement("br")),l.appendChild(v),l.appendChild(u),!e&&h&&f&&(l.appendChild(document.createElement("br")),l.appendChild(f),l.appendChild(h)),e&&l.appendChild(document.createElement("br")),l.appendChild(y),l.appendChild(g),n.appendChild(r),n.appendChild(l),n.appendChild(a),t.appendChild(n),t.appendChild(G()),l.addEventListener("submit",async m=>{if(m.preventDefault(),!e&&u.value!==(h==null?void 0:h.value)){C("Passwords do not match","error");return}R();try{if(e){const b=await D.users.login(c.value,u.value);b.data?(z={id:b.data.userId,username:c.value},C("Login successful!","success"),E("/tournament")):C(b.error||"Login failed","error")}else if(d){const b=await D.users.register(c.value,u.value,d.value);b.data?(z={id:b.data.userId,username:c.value},C("Registration successful!","success"),E("/tournament")):C(b.error||"Registration failed","error")}}catch(b){console.error("Auth error:",b),C("An error occurred. Please try again.","error")}finally{q()}}),t}function ue(){const e=document.createElement("div");e.className="page content-section",e.id="profile",e.setAttribute("role","main");const t=document.createElement("h1");t.className="section-title",t.textContent="User Profile",e.appendChild(t);const n=document.createElement("div");n.className="profile-tabs";const a=document.createElement("div");a.className="tab-buttons",[{id:"dashboard",label:"Dashboard",icon:"fa-tachometer-alt"},{id:"profile-info",label:"Profile Settings",icon:"fa-user-edit"},{id:"stats",label:"Statistics",icon:"fa-chart-bar"},{id:"friends",label:"Friends",icon:"fa-users"},{id:"match-history",label:"Match History",icon:"fa-history"}].forEach((u,h)=>{const f=document.createElement("button");f.className=`tab-button ${h===0?"active":""}`,f.dataset.tab=u.id,f.innerHTML=`<i class="fas ${u.icon}"></i> ${u.label}`,f.addEventListener("click",()=>K(u.id)),a.appendChild(f)}),n.appendChild(a);const o=document.createElement("div");o.className="tab-content";const i={username:"player123",displayName:"Pro Player",skillLevel:"intermediate",bio:"Passionate ping pong player with 5 years of experience!",avatar:"/pic1.png",wins:45,losses:23,gamesPlayed:68,winRate:66.2,currentStreak:5,longestStreak:12,averageMatchDuration:22,preferredGameMode:"1v1",totalPlayTime:1456,ranking:42,totalPlayers:1337,averageScore:18.5,perfectGames:3,comebacks:8,friends:[{id:1,username:"friend1",displayName:"Alice",avatar:"/pic2.png",isOnline:!0},{id:2,username:"friend2",displayName:"Bob",avatar:"/pic3.png",isOnline:!1,lastSeen:new Date("2024-01-15")},{id:3,username:"friend3",displayName:"Carol",avatar:"/pic1.png",isOnline:!0}],matchHistory:[{id:1,opponent:"Alice",opponentAvatar:"/pic2.png",result:"win",score:"21-18",date:new Date("2024-01-20"),gameType:"1v1",duration:25},{id:2,opponent:"Bob",opponentAvatar:"/pic3.png",result:"loss",score:"19-21",date:new Date("2024-01-19"),gameType:"1v1",duration:30},{id:3,opponent:"Carol",opponentAvatar:"/pic1.png",result:"win",score:"21-15",date:new Date("2024-01-18"),gameType:"tournament",duration:20},{id:4,opponent:"David",opponentAvatar:"/pic2.png",result:"win",score:"21-12",date:new Date("2024-01-17"),gameType:"1v1",duration:18},{id:5,opponent:"Eve",opponentAvatar:"/pic3.png",result:"win",score:"21-16",date:new Date("2024-01-16"),gameType:"tournament",duration:28},{id:6,opponent:"Frank",opponentAvatar:"/pic1.png",result:"win",score:"21-19",date:new Date("2024-01-15"),gameType:"1v1",duration:35},{id:7,opponent:"Grace",opponentAvatar:"/pic2.png",result:"loss",score:"18-21",date:new Date("2024-01-14"),gameType:"tournament",duration:22}],weeklyStats:[{week:"Week 1",wins:8,losses:2,gamesPlayed:10},{week:"Week 2",wins:12,losses:3,gamesPlayed:15},{week:"Week 3",wins:6,losses:4,gamesPlayed:10},{week:"Week 4",wins:10,losses:5,gamesPlayed:15},{week:"Week 5",wins:9,losses:9,gamesPlayed:18}],skillProgression:[{month:"Sep",rating:1200},{month:"Oct",rating:1350},{month:"Nov",rating:1420},{month:"Dec",rating:1465},{month:"Jan",rating:1520}]},r=document.createElement("div");r.className="tab-pane active",r.id="dashboard",r.appendChild(ve(i));const l=document.createElement("div");l.className="tab-pane",l.id="profile-info";const d=oe(i);l.appendChild(d);const p=document.createElement("div");p.className="tab-pane",p.id="stats",p.appendChild(Ce(i));const c=document.createElement("div");c.className="tab-pane",c.id="friends",c.appendChild(Ee(i.friends));const v=document.createElement("div");return v.className="tab-pane",v.id="match-history",v.appendChild(Ne(i.matchHistory)),o.appendChild(r),o.appendChild(l),o.appendChild(p),o.appendChild(c),o.appendChild(v),n.appendChild(o),e.appendChild(n),e}function ve(e){const t=document.createElement("div");t.className="dashboard-section";const n=document.createElement("div");n.className="dashboard-header",n.innerHTML=`
    <div class="welcome-banner">
      <h2>Welcome back, ${e.displayName}!</h2>
      <p>Here's your gaming overview and performance insights</p>
    </div>
  `,t.appendChild(n);const a=document.createElement("div");a.className="dashboard-kpis";const s=document.createElement("h3");s.textContent="Performance Overview",s.className="dashboard-section-title",a.appendChild(s);const o=document.createElement("div");o.className="kpi-grid",[{label:"Current Rank",value:`#${e.ranking}`,subtitle:`of ${e.totalPlayers} players`,icon:"fa-crown",color:"gold",trend:"up"},{label:"Win Rate",value:`${e.winRate}%`,subtitle:`${e.wins}W / ${e.losses}L`,icon:"fa-trophy",color:"success",trend:"up"},{label:"Current Streak",value:e.currentStreak,subtitle:`Best: ${e.longestStreak}`,icon:"fa-fire",color:"warning",trend:"up"},{label:"Total Play Time",value:`${Math.floor(e.totalPlayTime/60)}h ${e.totalPlayTime%60}m`,subtitle:`Avg: ${e.averageMatchDuration}min/game`,icon:"fa-clock",color:"info",trend:"up"}].forEach(g=>{const m=document.createElement("div");m.className=`kpi-card ${g.color}`,m.innerHTML=`
      <div class="kpi-header">
        <div class="kpi-icon">
          <i class="fas ${g.icon}"></i>
        </div>
        <div class="kpi-trend ${g.trend}">
          <i class="fas fa-arrow-${g.trend}"></i>
        </div>
      </div>
      <div class="kpi-content">
        <div class="kpi-value">${g.value}</div>
        <div class="kpi-label">${g.label}</div>
        <div class="kpi-subtitle">${g.subtitle}</div>
      </div>
    `,o.appendChild(m)}),a.appendChild(o),t.appendChild(a);const r=document.createElement("div");r.className="dashboard-analytics";const l=document.createElement("h3");l.textContent="Performance Analytics",l.className="dashboard-section-title",r.appendChild(l);const d=document.createElement("div");d.className="charts-container";const p=he(e.weeklyStats);d.appendChild(p);const c=fe(e.skillProgression);d.appendChild(c),r.appendChild(d),t.appendChild(r);const v=document.createElement("div");v.className="dashboard-activity";const u=document.createElement("div");u.className="activity-row";const h=ge(e.matchHistory.slice(0,5));u.appendChild(h);const f=be(e);u.appendChild(f),v.appendChild(u),t.appendChild(v);const y=ye(e);return t.appendChild(y),t}function he(e){const t=document.createElement("div");t.className="chart-container weekly-chart";const n=document.createElement("h4");n.textContent="Weekly Performance",t.appendChild(n);const a=document.createElement("div");a.className="chart-wrapper";const s=Math.max(...e.map(i=>i.gamesPlayed));e.forEach(i=>{const r=document.createElement("div");r.className="week-bar";const l=i.wins/s*100,d=i.losses/s*100;r.innerHTML=`
      <div class="bar-stack">
        <div class="bar-segment wins" style="height: ${l}%" 
             title="${i.wins} wins"></div>
        <div class="bar-segment losses" style="height: ${d}%" 
             title="${i.losses} losses"></div>
      </div>
      <div class="bar-label">${i.week}</div>
      <div class="bar-stats">
        <span class="win-count">${i.wins}W</span>
        <span class="loss-count">${i.losses}L</span>
      </div>
    `,a.appendChild(r)}),t.appendChild(a);const o=document.createElement("div");return o.className="chart-legend",o.innerHTML=`
    <div class="legend-item">
      <div class="legend-color wins"></div>
      <span>Wins</span>
    </div>
    <div class="legend-item">
      <div class="legend-color losses"></div>
      <span>Losses</span>
    </div>
  `,t.appendChild(o),t}function fe(e){const t=document.createElement("div");t.className="chart-container skill-chart";const n=document.createElement("h4");n.textContent="Skill Rating Progression",t.appendChild(n);const a=document.createElement("div");a.className="line-chart-wrapper";const s=Math.max(...e.map(c=>c.rating)),o=Math.min(...e.map(c=>c.rating)),i=s-o,r=document.createElement("div");r.className="svg-chart";let l="";const d=[];e.forEach((c,v)=>{const u=v/(e.length-1)*100,h=(s-c.rating)/i*100;v===0?l+=`M ${u} ${h}`:l+=` L ${u} ${h}`,d.push(`
      <div class="chart-point" style="left: ${u}%; top: ${h}%"
           title="${c.month}: ${c.rating}">
        <div class="point-value">${c.rating}</div>
      </div>
    `)}),r.innerHTML=`
    <svg viewBox="0 0 100 100" class="line-chart">
      <path d="${l}" class="chart-line" />
      <path d="${l}" class="chart-line-glow" />
    </svg>
    ${d.join("")}
  `,a.appendChild(r);const p=document.createElement("div");return p.className="chart-x-axis",e.forEach(c=>{const v=document.createElement("span");v.textContent=c.month,p.appendChild(v)}),a.appendChild(p),t.appendChild(a),t}function ge(e){const t=document.createElement("div");t.className="recent-matches-summary";const n=document.createElement("h4");n.textContent="Recent Matches",t.appendChild(n);const a=document.createElement("div");a.className="recent-matches-list",e.forEach(o=>{const i=document.createElement("div");i.className=`recent-match-item ${o.result}`;const r=o.result==="win"?"fa-check-circle":"fa-times-circle";i.innerHTML=`
      <div class="match-result-icon">
        <i class="fas ${r}"></i>
      </div>
      <div class="match-info">
        <div class="opponent-name">${o.opponent}</div>
        <div class="match-details">${o.score} • ${o.duration}min</div>
      </div>
      <div class="match-date">${o.date.toLocaleDateString()}</div>
    `,a.appendChild(i)}),t.appendChild(a);const s=document.createElement("button");return s.className="secondary-button",s.textContent="View All Matches",s.addEventListener("click",()=>K("match-history")),t.appendChild(s),t}function be(e){const t=document.createElement("div");t.className="advanced-stats-panel";const n=document.createElement("h4");n.textContent="Advanced Statistics",t.appendChild(n);const a=document.createElement("div");return a.className="advanced-stats-grid",[{label:"Average Score",value:e.averageScore,unit:"pts"},{label:"Perfect Games",value:e.perfectGames,unit:""},{label:"Comebacks",value:e.comebacks,unit:""},{label:"Preferred Mode",value:e.preferredGameMode,unit:""}].forEach(o=>{const i=document.createElement("div");i.className="advanced-stat-item",i.innerHTML=`
      <div class="stat-value">${o.value}${o.unit}</div>
      <div class="stat-label">${o.label}</div>
    `,a.appendChild(i)}),t.appendChild(a),t}function ye(e){const t=document.createElement("div");t.className="achievements-section";const n=document.createElement("h3");n.textContent="Achievements & Goals",n.className="dashboard-section-title",t.appendChild(n);const a=document.createElement("div");return a.className="achievements-grid",[{title:"Win Streak Master",description:"Win 10 games in a row",progress:e.currentStreak,target:10,icon:"fa-fire",unlocked:e.longestStreak>=10},{title:"Century Club",description:"Play 100 total games",progress:e.gamesPlayed,target:100,icon:"fa-medal",unlocked:e.gamesPlayed>=100},{title:"Perfect Player",description:"Win a game 21-0",progress:e.perfectGames,target:1,icon:"fa-star",unlocked:e.perfectGames>=1},{title:"Social Butterfly",description:"Add 10 friends",progress:e.friends.length,target:10,icon:"fa-users",unlocked:e.friends.length>=10}].forEach(o=>{const i=document.createElement("div");i.className=`achievement-card ${o.unlocked?"unlocked":"locked"}`;const r=Math.min(o.progress/o.target*100,100);i.innerHTML=`
      <div class="achievement-icon">
        <i class="fas ${o.icon}"></i>
        ${o.unlocked?'<div class="unlock-badge"><i class="fas fa-check"></i></div>':""}
      </div>
      <div class="achievement-content">
        <div class="achievement-title">${o.title}</div>
        <div class="achievement-description">${o.description}</div>
        <div class="achievement-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${r}%"></div>
          </div>
          <div class="progress-text">${o.progress}/${o.target}</div>
        </div>
      </div>
    `,a.appendChild(i)}),t.appendChild(a),t}function K(e){var t,n;document.querySelectorAll(".tab-button").forEach(a=>{a.classList.remove("active")}),(t=document.querySelector(`[data-tab="${e}"]`))==null||t.classList.add("active"),document.querySelectorAll(".tab-pane").forEach(a=>{a.classList.remove("active")}),(n=document.getElementById(e))==null||n.classList.add("active")}function Ce(e){const t=document.createElement("div");t.className="stats-section";const n=document.createElement("h2");n.textContent="Player Statistics",t.appendChild(n);const a=document.createElement("div");return a.className="stats-grid",[{label:"Games Played",value:e.gamesPlayed,icon:"fa-gamepad"},{label:"Wins",value:e.wins,icon:"fa-trophy",color:"success"},{label:"Losses",value:e.losses,icon:"fa-times-circle",color:"danger"},{label:"Win Rate",value:`${e.winRate}%`,icon:"fa-percentage",color:"info"}].forEach(o=>{const i=document.createElement("div");i.className=`stat-card ${o.color||""}`,i.innerHTML=`
      <div class="stat-icon">
        <i class="fas ${o.icon}"></i>
      </div>
      <div class="stat-content">
        <div class="stat-value">${o.value}</div>
        <div class="stat-label">${o.label}</div>
      </div>
    `,a.appendChild(i)}),t.appendChild(a),t}function Ee(e){const t=document.createElement("div");t.className="friends-section";const n=document.createElement("div");n.className="section-header";const a=document.createElement("h2");a.textContent="Friends List";const s=document.createElement("button");s.className="primary-button",s.innerHTML='<i class="fas fa-user-plus"></i> Add Friend',s.addEventListener("click",we),n.appendChild(a),n.appendChild(s),t.appendChild(n);const o=document.createElement("div");if(o.className="friends-list",e.length===0){const i=document.createElement("div");i.className="empty-state",i.innerHTML=`
      <i class="fas fa-user-friends"></i>
      <p>No friends yet. Start by adding some friends!</p>
    `,o.appendChild(i)}else e.forEach(i=>{const r=document.createElement("div");r.className="friend-card";const l=i.isOnline?"online":"offline",d=i.isOnline?"Online":i.lastSeen?`Last seen ${i.lastSeen.toLocaleDateString()}`:"Offline";r.innerHTML=`
        <div class="friend-avatar">
          <img src="${i.avatar}" alt="${i.displayName}'s avatar" />
          <div class="status-indicator ${l}"></div>
        </div>
        <div class="friend-info">
          <div class="friend-name">${i.displayName}</div>
          <div class="friend-username">@${i.username}</div>
          <div class="friend-status ${l}">${d}</div>
        </div>
        <div class="friend-actions">
          <button class="secondary-button" onclick="challengeFriend('${i.username}')">
            <i class="fas fa-gamepad"></i> Challenge
          </button>
          <button class="danger-button" onclick="removeFriend(${i.id})">
            <i class="fas fa-user-minus"></i>
          </button>
        </div>
      `,o.appendChild(r)});return t.appendChild(o),t}function Ne(e){const t=document.createElement("div");t.className="match-history-section";const n=document.createElement("h2");if(n.textContent="Match History",t.appendChild(n),e.length===0){const s=document.createElement("div");return s.className="empty-state",s.innerHTML=`
      <i class="fas fa-history"></i>
      <p>No matches played yet. Start playing to build your history!</p>
    `,t.appendChild(s),t}const a=document.createElement("div");return a.className="match-history-list",e.forEach(s=>{const o=document.createElement("div");o.className=`match-card ${s.result}`;const i=s.result==="win"?"fa-trophy":"fa-times-circle",r=s.result==="win"?"Victory":"Defeat";o.innerHTML=`
      <div class="match-result">
        <i class="fas ${i}"></i>
        <span class="result-text">${r}</span>
      </div>
      <div class="match-opponent">
        <img src="${s.opponentAvatar}" alt="${s.opponent}'s avatar" class="opponent-avatar" />
        <div class="opponent-info">
          <div class="opponent-name">${s.opponent}</div>
          <div class="game-type">${s.gameType==="1v1"?"1v1 Match":"Tournament"}</div>
        </div>
      </div>
      <div class="match-details">
        <div class="match-score">${s.score}</div>
        <div class="match-date">${s.date.toLocaleDateString()}</div>
        <div class="match-duration">${s.duration} min</div>
      </div>
    `,a.appendChild(o)}),t.appendChild(a),t}function we(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
    <div class="modal-content">
      <div class="modal-header">
        <h3>Add Friend</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-field">
          <label for="friend-username">Username or Display Name</label>
          <input type="text" id="friend-username" placeholder="Enter username..." />
        </div>
      </div>
      <div class="modal-footer">
        <button class="secondary-button modal-close">Cancel</button>
        <button class="primary-button" onclick="addFriend()">Add Friend</button>
      </div>
    </div>
  `,e.addEventListener("click",t=>{(t.target===e||t.target.classList.contains("modal-close"))&&e.remove()}),document.body.appendChild(e)}function Le(){var n;const t=document.getElementById("friend-username").value.trim();t?(C(`Friend request sent to ${t}!`,"success"),(n=document.querySelector(".modal-overlay"))==null||n.remove()):C("Please enter a username","error")}function xe(e){C(`Challenge sent to ${e}!`,"info")}function Te(e){confirm("Are you sure you want to remove this friend?")&&(console.log(`Removing friend with ID: ${e}`),C("Friend removed","info"))}window.addFriend=Le;window.challengeFriend=xe;window.removeFriend=Te;function ke(){const e=document.createElement("div");e.className="modal-overlay",e.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;const t=document.createElement("div");t.className="modal-content",t.style.cssText=`
    background: var(--bg-color);
    border: 2px solid var(--primary-color);
    border-radius: 10px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 0 20px var(--primary-color);
  `,t.innerHTML=`
    <h2 style="color: var(--primary-color); margin-bottom: 1.5rem; text-align: center;">Create Tournament</h2>
    <form id="create-tournament-form">
      <label for="tournament-name" style="display: block; margin-bottom: 0.5rem; color: var(--text-color);">Tournament Name:</label>
      <input type="text" id="tournament-name" required style="width: 100%; padding: 0.8rem; margin-bottom: 1rem; border: 1px solid var(--primary-color); border-radius: 5px; background: var(--bg-color); color: var(--text-color);">
      <label for="max-players" style="display: block; margin-bottom: 0.5rem; color: var(--text-color);">Max Players:</label>
      <select id="max-players" required style="width: 100%; padding: 0.8rem; margin-bottom: 1.5rem; border: 1px solid var(--primary-color); border-radius: 5px; background: var(--bg-color); color: var(--text-color);">
        <option value="">Select Players</option>
        <option value="4">4 Players</option>
        <option value="8">8 Players</option>
      </select>
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button type="button" id="cancel-tournament" class="secondary-button">Cancel</button>
        <button type="submit" class="primary-button">Create Tournament</button>
      </div>
    </form>
  `,e.appendChild(t),document.body.appendChild(e);const n=e.querySelector("#create-tournament-form");e.querySelector("#cancel-tournament").addEventListener("click",()=>{document.body.removeChild(e)}),e.addEventListener("click",s=>{s.target===e&&document.body.removeChild(e)}),n.addEventListener("submit",async s=>{if(s.preventDefault(),!z){C("Please register first to create a tournament.","error"),document.body.removeChild(e),E("/register");return}const o=e.querySelector("#tournament-name"),i=e.querySelector("#max-players"),r=o.value.trim(),l=parseInt(i.value);if(!r||!l){C("Please fill in all fields.","error");return}R();try{const d=await D.tournaments.create(r,l,z.id);if(d.data){if(C(`Tournament "${r}" created successfully!`,"success"),document.body.removeChild(e),window.location.pathname==="/tournament"){const p=document.getElementById("app");p&&I(p)}}else C(d.error||"Failed to create tournament.","error")}catch(d){C("Failed to create tournament. Please try again.","error"),console.error("Tournament creation error:",d)}finally{q()}})}function I(e){const t=window.location.pathname;e.innerHTML="";let n=document.getElementById("screen-reader-live-region");n||(n=document.createElement("div"),n.id="screen-reader-live-region",n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.className="hidden-visually",document.body.appendChild(n));const s={"/":de,"/login":()=>Y(!0),"/register":()=>Y(!1),"/tournament":me,"/profile":ue,"/ACCOUNT":()=>Y(!0)}[t],o=document.createElement("div");if(o.className="page-content-wrapper",e.appendChild(o),s)o.appendChild(s()),document.title=ee(t);else{const i=document.createElement("div");i.className="page content-section",i.id="not-found",i.setAttribute("role","main"),i.innerHTML='<h1 class="section-title">404 - Page Not Found</h1><p style="text-align:center; color: var(--text-color-light);">The page you are looking for does not exist.</p>';const r=document.createElement("button");r.className="primary-button back-button",r.textContent="Go to Home",r.addEventListener("click",()=>E("/")),i.appendChild(r),i.appendChild(G()),o.appendChild(i),document.title="404 - Page Not Found - Neon Pong"}document.querySelectorAll(".navbar-link").forEach(i=>{i.classList.remove("active");const r=i.getAttribute("href"),l=window.location.pathname;(r===l||r==="/"&&l==="/")&&i.classList.add("active"),(l==="/tournament"&&r==="/tournament"||l==="/register"&&r==="/register")&&i.classList.add("active")})}document.addEventListener("DOMContentLoaded",async()=>{console.log("[App] DOM fully loaded, initializing application..."),console.log("[App] Finding app container...");const e=document.getElementById("app");if(!e){console.error("[App] Failed to find #app element");return}console.log("[App] Creating navigation bar...");const t=ce();if(document.body.insertBefore(t,e),!document.getElementById("loading-overlay")){const n=te();document.body.appendChild(n)}console.log("[App] Setting up routes..."),I(e),window.addEventListener("popstate",()=>{I(e)}),(window.location.pathname==="/"||window.location.pathname==="")&&E("/"),console.log("[App] Initialization complete")});window.addEventListener("popstate",()=>{const e=document.getElementById("app");e&&I(e)});window.switchTab=K;
