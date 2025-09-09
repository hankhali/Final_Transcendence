var ge=Object.defineProperty;var ve=(e,t,a)=>t in e?ge(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var ee=(e,t,a)=>ve(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=a(n);fetch(n.href,o)}})();const te={en:{nav:{home:"HOME",tournaments:"TOURNAMENTS",logout:"LOGOUT",profile:"PROFILE",account:"ACCOUNT"},fontControls:{label:"Font size:",decrease:"DECREASE FONT SIZE",increase:"INCREASE FONT SIZE"},home:{title:"NEON PONG",tagline:"THE ULTIMATE RETRO-FUTURISTIC ARCADE EXPERIENCE.",description:"Challenge your friends in a fast-paced game of skill and reflexes.",registerNow:"REGISTER NOW",meetTheTeam:"MEET THE TEAM"},tournaments:{elite:"ELITE",championship:"CHAMPIONSHIP",arena:"ARENA",subtitle:"Where legends are born and champions rise to glory",stats:{elitePlayers:"ELITE PLAYERS",champion:"CHAMPION",glory:"GLORY"},features:{strategic:{title:"Strategic Gameplay",description:"Master the art of precision and timing"},prestige:{title:"Prestige System",description:"Earn your place among the elite"},competition:{title:"Intense Competition",description:"Face the ultimate challenge"}},createCard:{title:"Forge Your Legacy",description:"Create an exclusive 4-player tournament and witness the birth of a new champion",benefits:{bracket:"Custom Bracket System",progress:"Real-time Match Progress",ceremony:"Championship Ceremony"},button:"Create Elite Tournament"},loginRequired:{title:"Exclusive Access Required",description:"Join our elite community to unlock tournament creation privileges",benefits:{access:"VIP Tournament Access",status:"Elite Player Status"},button:"Unlock Access"}},profile:{title:"USER PROFILE",tabs:{dashboard:"DASHBOARD",settings:"PROFILE SETTINGS",statistics:"STATISTICS",friends:"FRIENDS",history:"MATCH HISTORY"},dashboard:{welcome:"WELCOME BACK, PRO PLAYER!",overview:"Here's your gaming overview and performance insights",rank:"Current Rank",of:"of",players:"players",winRate:"Win Rate",streak:"Current Streak",best:"Best:",playTime:"Total Play Time",avg:"Avg:",analytics:"PERFORMANCE ANALYTICS",weekly:"Weekly Performance",wins:"Wins",losses:"Losses",rating:"Skill Rating Progression",recent:"Recent Matches",viewAll:"VIEW ALL MATCHES",advanced:"Advanced Statistics",avgScore:"AVERAGE SCORE",perfectGames:"PERFECT GAMES",comebacks:"COMEBACKS",preferredMode:"PREFERRED MODE",achievements:"ACHIEVEMENTS & GOALS",winStreakMaster:"Win Streak Master",winStreakDesc:"Win 10 games in a row",centuryClub:"Century Club",centuryDesc:"Play 100 total games",perfectPlayer:"Perfect Player",perfectDesc:"Win a game 21-0",socialButterfly:"Social Butterfly",socialDesc:"Add 10 friends"},settings:{changeAvatar:"CHANGE AVATAR",username:"USERNAME",displayName:"DISPLAY NAME",skillLevel:"SKILL LEVEL",beginner:"BEGINNER",intermediate:"INTERMEDIATE",expert:"EXPERT",bio:"BIO (OPTIONAL)",bioPlaceholder:"Tell others about yourself...",advancedSettings:"ADVANCED SETTINGS",newPassword:"New Password",passwordPlaceholder:"Leave blank to keep current",confirmPassword:"Confirm Password",confirmPasswordPlaceholder:"Confirm your new password",gameHistory:"GAME HISTORY",clearHistory:"Clear History",accountDeletion:"ACCOUNT DELETION",deleteAccount:"Delete Account",deleteWarning:"⚠️ This action cannot be undone",warningTitle:"Warning: Permanent Action",warningDescription:"Once you delete your profile, there is no going back. This action cannot be undone and will permanently remove:",saveChanges:"SAVE CHANGES"},statistics:{title:"PLAYER STATISTICS",gamesPlayed:"GAMES PLAYED",wins:"WINS",losses:"LOSSES",winRate:"WIN RATE"},friends:{title:"FRIENDS LIST",addFriend:"ADD FRIEND",online:"Online",lastSeen:"Last seen",challenge:"CHALLENGE"},history:{title:"MATCH HISTORY",victory:"Victory",defeat:"Defeat",match1v1:"1v1 Match",tournament:"Tournament",min:"min"}},auth:{login:{title:"Login to Neon Pong",username:"USERNAME",password:"PASSWORD",button:"LOGIN",backToHome:"BACK TO HOME",noAccount:"Don't have an account?",createAccount:"Create an ACCOUNT"},register:{title:"Register for Neon Pong",email:"EMAIL",username:"USERNAME",password:"PASSWORD",confirmPassword:"CONFIRM PASSWORD",button:"REGISTER",backToHome:"BACK TO HOME",hasAccount:"Already have an account?",signIn:"Sign in to existing ACCOUNT"}},common:{loading:"Loading...",neonPong:"Neon Pong"},languages:{english:"English",french:"Français",spanish:"Español"}},fr:{nav:{home:"ACCUEIL",tournaments:"TOURNOIS",logout:"DÉCONNEXION",profile:"PROFIL",account:"COMPTE"},fontControls:{label:"Taille de police:",decrease:"DIMINUER LA TAILLE",increase:"AUGMENTER LA TAILLE"},home:{title:"NEON PONG",tagline:"L'EXPÉRIENCE ARCADE RÉTRO-FUTURISTE ULTIME.",description:"Défiez vos amis dans un jeu rapide d'adresse et de réflexes.",registerNow:"S'INSCRIRE MAINTENANT",meetTheTeam:"RENCONTRER L'ÉQUIPE"},tournaments:{elite:"ÉLITE",championship:"CHAMPIONNAT",arena:"ARÈNE",subtitle:"Où naissent les légendes et s'élèvent les champions",stats:{elitePlayers:"JOUEURS D'ÉLITE",champion:"CHAMPION",glory:"GLOIRE"},features:{strategic:{title:"Gameplay Stratégique",description:"Maîtrisez l'art de la précision et du timing"},prestige:{title:"Système de Prestige",description:"Gagnez votre place parmi l'élite"},competition:{title:"Compétition Intense",description:"Relevez le défi ultime"}},createCard:{title:"Forgez Votre Légende",description:"Créez un tournoi exclusif à 4 joueurs et assistez à la naissance d'un nouveau champion",benefits:{bracket:"Système de Bracket Personnalisé",progress:"Progression en Temps Réel",ceremony:"Cérémonie de Championnat"},button:"Créer Tournoi Élite"},loginRequired:{title:"Accès Exclusif Requis",description:"Rejoignez notre communauté d'élite pour débloquer les privilèges de création de tournois",benefits:{access:"Accès VIP aux Tournois",status:"Statut de Joueur Élite"},button:"Débloquer l'Accès"}},profile:{title:"PROFIL UTILISATEUR",tabs:{dashboard:"TABLEAU DE BORD",settings:"PARAMÈTRES DU PROFIL",statistics:"STATISTIQUES",friends:"AMIS",history:"HISTORIQUE DES MATCHS"},dashboard:{welcome:"BON RETOUR, JOUEUR PRO !",overview:"Voici votre aperçu de jeu et vos informations de performance",rank:"Rang Actuel",of:"sur",players:"joueurs",winRate:"Taux de Victoire",streak:"Série Actuelle",best:"Meilleur:",playTime:"Temps de Jeu Total",avg:"Moy:",analytics:"ANALYSES DE PERFORMANCE",weekly:"Performance Hebdomadaire",wins:"Victoires",losses:"Défaites",rating:"Progression du Classement",recent:"Matchs Récents",viewAll:"VOIR TOUS LES MATCHS",advanced:"Statistiques Avancées",avgScore:"SCORE MOYEN",perfectGames:"JEUX PARFAITS",comebacks:"RETOURS",preferredMode:"MODE PRÉFÉRÉ",achievements:"SUCCÈS ET OBJECTIFS",winStreakMaster:"Maître des Séries",winStreakDesc:"Gagner 10 jeux d'affilée",centuryClub:"Club du Centenaire",centuryDesc:"Jouer 100 jeux au total",perfectPlayer:"Joueur Parfait",perfectDesc:"Gagner un jeu 21-0",socialButterfly:"Papillon Social",socialDesc:"Ajouter 10 amis"},settings:{changeAvatar:"CHANGER L'AVATAR",username:"NOM D'UTILISATEUR",displayName:"NOM D'AFFICHAGE",skillLevel:"NIVEAU DE COMPÉTENCE",beginner:"DÉBUTANT",intermediate:"INTERMÉDIAIRE",expert:"EXPERT",bio:"BIO (OPTIONNEL)",bioPlaceholder:"Parlez de vous aux autres...",advancedSettings:"PARAMÈTRES AVANCÉS",newPassword:"Nouveau mot de passe",passwordPlaceholder:"Laisser vide pour conserver l'actuel",confirmPassword:"Confirmer le mot de passe",confirmPasswordPlaceholder:"Confirmez votre nouveau mot de passe",gameHistory:"HISTORIQUE DU JEU",clearHistory:"Effacer l'historique",accountDeletion:"SUPPRESSION DU COMPTE",deleteAccount:"Supprimer le compte",deleteWarning:"⚠️ Cette action ne peut pas être annulée",warningTitle:"Attention : Action permanente",warningDescription:"Une fois que vous supprimez votre profil, il n'y a pas de retour en arrière. Cette action ne peut pas être annulée et supprimera définitivement :",saveChanges:"SAUVEGARDER LES MODIFICATIONS"},statistics:{title:"STATISTIQUES DU JOUEUR",gamesPlayed:"JEUX JOUÉS",wins:"VICTOIRES",losses:"DÉFAITES",winRate:"TAUX DE VICTOIRE"},friends:{title:"LISTE D'AMIS",addFriend:"AJOUTER UN AMI",online:"En ligne",lastSeen:"Vu pour la dernière fois",challenge:"DÉFIER"},history:{title:"HISTORIQUE DES MATCHS",victory:"Victoire",defeat:"Défaite",match1v1:"Match 1v1",tournament:"Tournoi",min:"min"}},auth:{login:{title:"Connexion à Neon Pong",username:"NOM D'UTILISATEUR",password:"MOT DE PASSE",button:"CONNEXION",backToHome:"RETOUR À L'ACCUEIL",noAccount:"Vous n'avez pas de compte ?",createAccount:"Créer un COMPTE"},register:{title:"S'inscrire à Neon Pong",email:"EMAIL",username:"NOM D'UTILISATEUR",password:"MOT DE PASSE",confirmPassword:"CONFIRMER LE MOT DE PASSE",button:"S'INSCRIRE",backToHome:"RETOUR À L'ACCUEIL",hasAccount:"Vous avez déjà un compte ?",signIn:"Se connecter au COMPTE existant"}},common:{loading:"Chargement...",neonPong:"Neon Pong"},languages:{english:"English",french:"Français",spanish:"Español"}},es:{nav:{home:"INICIO",tournaments:"TORNEOS",logout:"CERRAR SESIÓN",profile:"PERFIL",account:"CUENTA"},fontControls:{label:"Tamaño de fuente:",decrease:"DISMINUIR TAMAÑO",increase:"AUMENTAR TAMAÑO"},home:{title:"NEON PONG",tagline:"LA EXPERIENCIA ARCADE RETRO-FUTURISTA DEFINITIVA.",description:"Desafía a tus amigos en un juego rápido de habilidad y reflejos.",registerNow:"REGISTRARSE AHORA",meetTheTeam:"CONOCER AL EQUIPO"},tournaments:{elite:"ÉLITE",championship:"CAMPEONATO",arena:"ARENA",subtitle:"Donde nacen las leyendas y se alzan los campeones",stats:{elitePlayers:"JUGADORES ÉLITE",champion:"CAMPEÓN",glory:"GLORIA"},features:{strategic:{title:"Jugabilidad Estratégica",description:"Domina el arte de la precisión y el timing"},prestige:{title:"Sistema de Prestigio",description:"Gana tu lugar entre la élite"},competition:{title:"Competencia Intensa",description:"Enfrenta el desafío definitivo"}},createCard:{title:"Forja Tu Legado",description:"Crea un torneo exclusivo de 4 jugadores y presencia el nacimiento de un nuevo campeón",benefits:{bracket:"Sistema de Bracket Personalizado",progress:"Progreso de Partida en Tiempo Real",ceremony:"Ceremonia de Campeonato"},button:"Crear Torneo Élite"},loginRequired:{title:"Acceso Exclusivo Requerido",description:"Únete a nuestra comunidad élite para desbloquear privilegios de creación de torneos",benefits:{access:"Acceso VIP a Torneos",status:"Estado de Jugador Élite"},button:"Desbloquear Acceso"}},profile:{title:"PERFIL DE USUARIO",tabs:{dashboard:"PANEL DE CONTROL",settings:"CONFIGURACIÓN DEL PERFIL",statistics:"ESTADÍSTICAS",friends:"AMIGOS",history:"HISTORIAL DE PARTIDAS"},dashboard:{welcome:"¡BIENVENIDO DE VUELTA, JUGADOR PRO!",overview:"Aquí está tu resumen de juego e información de rendimiento",rank:"Rango Actual",of:"de",players:"jugadores",winRate:"Tasa de Victoria",streak:"Racha Actual",best:"Mejor:",playTime:"Tiempo Total de Juego",avg:"Prom:",analytics:"ANÁLISIS DE RENDIMIENTO",weekly:"Rendimiento Semanal",wins:"Victorias",losses:"Derrotas",rating:"Progresión de Clasificación",recent:"Partidas Recientes",viewAll:"VER TODAS LAS PARTIDAS",advanced:"Estadísticas Avanzadas",avgScore:"PUNTUACIÓN PROMEDIO",perfectGames:"JUEGOS PERFECTOS",comebacks:"REMONTAS",preferredMode:"MODO PREFERIDO",achievements:"LOGROS Y OBJETIVOS",winStreakMaster:"Maestro de Rachas",winStreakDesc:"Ganar 10 juegos seguidos",centuryClub:"Club del Centenario",centuryDesc:"Jugar 100 juegos en total",perfectPlayer:"Jugador Perfecto",perfectDesc:"Ganar un juego 21-0",socialButterfly:"Mariposa Social",socialDesc:"Agregar 10 amigos"},settings:{changeAvatar:"CAMBIAR AVATAR",username:"NOMBRE DE USUARIO",displayName:"NOMBRE PARA MOSTRAR",skillLevel:"NIVEL DE HABILIDAD",beginner:"PRINCIPIANTE",intermediate:"INTERMEDIO",expert:"EXPERTO",bio:"BIO (OPCIONAL)",bioPlaceholder:"Cuéntales a otros sobre ti...",advancedSettings:"CONFIGURACIÓN AVANZADA",newPassword:"Nueva contraseña",passwordPlaceholder:"Dejar en blanco para mantener la actual",confirmPassword:"Confirmar contraseña",confirmPasswordPlaceholder:"Confirma tu nueva contraseña",gameHistory:"HISTORIAL DEL JUEGO",clearHistory:"Borrar historial",accountDeletion:"ELIMINACIÓN DE CUENTA",deleteAccount:"Eliminar cuenta",deleteWarning:"⚠️ Esta acción no se puede deshacer",warningTitle:"Advertencia: Acción permanente",warningDescription:"Una vez que elimines tu perfil, no hay vuelta atrás. Esta acción no se puede deshacer y eliminará permanentemente:",saveChanges:"GUARDAR CAMBIOS"},statistics:{title:"ESTADÍSTICAS DEL JUGADOR",gamesPlayed:"JUEGOS JUGADOS",wins:"VICTORIAS",losses:"DERROTAS",winRate:"TASA DE VICTORIA"},friends:{title:"LISTA DE AMIGOS",addFriend:"AGREGAR AMIGO",online:"En línea",lastSeen:"Visto por última vez",challenge:"DESAFIAR"},history:{title:"HISTORIAL DE PARTIDAS",victory:"Victoria",defeat:"Derrota",match1v1:"Partida 1v1",tournament:"Torneo",min:"min"}},auth:{login:{title:"Iniciar Sesión en Neon Pong",username:"NOMBRE DE USUARIO",password:"CONTRASEÑA",button:"INICIAR SESIÓN",backToHome:"VOLVER AL INICIO",noAccount:"¿No tienes una cuenta?",createAccount:"Crear una CUENTA"},register:{title:"Registrarse en Neon Pong",email:"EMAIL",username:"NOMBRE DE USUARIO",password:"CONTRASEÑA",confirmPassword:"CONFIRMAR CONTRASEÑA",button:"REGISTRARSE",backToHome:"VOLVER AL INICIO",hasAccount:"¿Ya tienes una cuenta?",signIn:"Iniciar sesión en CUENTA existente"}},common:{loading:"Cargando...",neonPong:"Neon Pong"},languages:{english:"English",french:"Français",spanish:"Español"}}};class he{constructor(){ee(this,"currentLanguage","en");ee(this,"listeners",[]);const t=localStorage.getItem("neonPongLanguage");t&&te[t]&&(this.currentLanguage=t)}getCurrentLanguage(){return this.currentLanguage}setLanguage(t){te[t]&&(this.currentLanguage=t,localStorage.setItem("neonPongLanguage",t),this.notifyListeners())}getTranslations(){return te[this.currentLanguage]}translate(t){const a=t.split(".");let s=this.getTranslations();for(const n of a)s=s==null?void 0:s[n];return s||t}addListener(t){this.listeners.push(t)}removeListener(t){this.listeners=this.listeners.filter(a=>a!==t)}notifyListeners(){this.listeners.forEach(t=>t())}}const T=new he;function be(e={}){var le;const t=T.getTranslations(),a=document.createElement("div");a.className="profile-settings";const s={username:"",displayName:"",skillLevel:"beginner",bio:"",...e},n=document.createElement("form");n.className="profile-form",n.noValidate=!0;const o=document.createElement("div");o.className="form-section";const i=document.createElement("div");i.className="avatar-section";const r=document.createElement("label");r.className="form-label",r.textContent="Customize Avatar";const l=document.createElement("div");l.className="avatar-container";const c=document.createElement("div");c.className="avatar-preview-container";const m=document.createElement("div");m.className="avatar-preview",m.innerHTML=`
    <i class="fas fa-user-circle"></i>
  `;const d=document.createElement("div");d.className="avatar-upload",d.innerHTML='<i class="fas fa-camera"></i>';const p=document.createElement("input");p.type="file",p.accept="image/*",p.className="avatar-input",p.hidden=!0;const g=document.createElement("button");g.type="button",g.className="secondary-button",g.textContent=t.profile.settings.changeAvatar,g.style.marginTop="1rem",g.addEventListener("click",()=>p.click()),c.appendChild(m),c.appendChild(d),l.appendChild(c),l.appendChild(g),l.appendChild(p),i.appendChild(r),i.appendChild(l),o.appendChild(i);const u=H({label:t.profile.settings.username,name:"username",type:"text",value:s.username,required:!0,placeholder:"Enter your username"}),v=H({label:t.profile.settings.displayName,name:"displayName",type:"text",value:s.displayName,required:!0,placeholder:"Enter your display name"}),h=document.createElement("div");h.className="form-group";const C=document.createElement("label");C.className="form-label",C.textContent=t.profile.settings.skillLevel,C.htmlFor="skillLevel";const b=[{id:"beginner",label:t.profile.settings.beginner,emoji:"👶"},{id:"intermediate",label:t.profile.settings.intermediate,emoji:"💪"},{id:"expert",label:t.profile.settings.expert,emoji:"🏆"}],E=document.createElement("div");E.className="skill-level-options",b.forEach(({id:S,label:K,emoji:F})=>{const U=`skill-${S}`,x=document.createElement("div");x.className="radio-option",x.dataset.level=S;const O=document.createElement("input");O.type="radio",O.id=U,O.name="skillLevel",O.value=S,O.checked=s.skillLevel===S;const $=document.createElement("label");$.htmlFor=U,$.dataset.level=S;const Z=document.createElement("span");Z.className="level-emoji",Z.textContent=F;const _=document.createElement("span");_.className="level-text",_.textContent=K,$.appendChild(Z),$.appendChild(document.createElement("br")),$.appendChild(_),x.appendChild(O),x.appendChild($),E.appendChild(x)}),h.appendChild(C),h.appendChild(E);const L=H({name:"bio",type:"textarea",label:t.profile.settings.bio,placeholder:t.profile.settings.bioPlaceholder,value:s.bio||""}),I=document.createElement("div");I.className="settings-button-container",I.innerHTML=`
    <button type="button" class="settings-button advanced-toggle-button">
      <span class="button-icon"><i class="fas fa-sliders-h"></i></span>
      <span class="button-text">${t.profile.settings.advancedSettings}</span>
      <span class="button-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
  `;const N=document.createElement("div");N.className="advanced-content",N.style.display="none";const f=H({label:t.profile.settings.newPassword,name:"newPassword",type:"password",placeholder:t.profile.settings.passwordPlaceholder,autoComplete:"new-password"}),w=H({label:t.profile.settings.confirmPassword,name:"confirmPassword",type:"password",placeholder:t.profile.settings.confirmPasswordPlaceholder,autoComplete:"new-password"});N.appendChild(f),N.appendChild(w);const G=I.querySelector(".advanced-toggle-button"),re=I.querySelector(".fa-chevron-down");G==null||G.addEventListener("click",()=>{const S=N.style.display!=="none";N.style.display=S?"none":"block",re&&(re.className=S?"fas fa-chevron-down":"fas fa-chevron-up")});const j=document.createElement("div");j.className="settings-button-container",j.innerHTML=`
    <button type="submit" class="settings-button save-changes-button">
      <span class="button-icon"><i class="fas fa-save"></i></span>
      <span class="button-text">${t.profile.settings.saveChanges}</span>
      <span class="button-check"><i class="fas fa-check"></i></span>
    </button>
  `,n.appendChild(o),n.appendChild(u),n.appendChild(v),n.appendChild(h),n.appendChild(L),n.appendChild(I),n.appendChild(N);const V=document.createElement("div");V.className="settings-button-container",V.innerHTML=`
    <button type="button" class="settings-button game-history-button">
      <span class="button-icon"><i class="fas fa-history"></i></span>
      <span class="button-text">${t.profile.settings.gameHistory}</span>
      <span class="button-arrow"><i class="fas fa-external-link-alt"></i></span>
    </button>
  `,(le=V.querySelector("button"))==null||le.addEventListener("click",()=>{console.log("Game History clicked"),z("Game History feature coming soon!","info")}),n.appendChild(V);const D=document.createElement("div");D.className="settings-button-container",D.innerHTML=`
    <button type="button" class="settings-button account-deletion-button">
      <span class="button-icon"><i class="fas fa-user-times"></i></span>
      <span class="button-text">${t.profile.settings.accountDeletion}</span>
      <span class="button-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
  `;const M=document.createElement("div");M.className="account-deletion-content",M.style.display="none",M.innerHTML=`
    <div class="danger-zone">
      <div class="danger-warning">
        <i class="fas fa-exclamation-triangle"></i>
        <div class="warning-text">
          <h4>Warning: Permanent Action</h4>
          <p>Once you delete your profile, there is no going back. This action cannot be undone and will permanently remove:</p>
          <ul>
            <li>Your profile information and settings</li>
            <li>Game history and statistics</li>
            <li>Friend connections</li>
            <li>All personal data</li>
          </ul>
        </div>
      </div>
      <div class="danger-actions">
        <button type="button" class="delete-profile-btn">
          <i class="fas fa-trash-alt"></i>
          DELETE PROFILE PERMANENTLY
        </button>
      </div>
    </div>
  `;const Y=D.querySelector(".account-deletion-button"),X=D.querySelector(".button-arrow i");Y==null||Y.addEventListener("click",()=>{const S=M.style.display==="none";M.style.display=S?"block":"none",X==null||X.classList.toggle("rotated",S)});const Q=M.querySelector(".delete-profile-btn");return Q==null||Q.addEventListener("click",()=>{Ee()}),n.appendChild(D),n.appendChild(M),n.appendChild(j),n.addEventListener("submit",async S=>{S.preventDefault();const K=new FormData(n),F={};K.forEach((x,O)=>{x&&(F[O]=x)});const U=n.querySelector('input[name="skillLevel"]:checked');U&&(F.skillLevel=U.value);try{console.log("Updating profile:",F),z("Profile updated successfully!","success")}catch(x){console.error("Error updating profile:",x),z("Failed to update profile. Please try again.","error")}}),a.appendChild(n),a}function H({label:e,name:t,type:a,value:s="",required:n=!1,placeholder:o="",autoComplete:i="",className:r=""}){const l=document.createElement("div");l.className=`form-group ${r}`.trim();const c=document.createElement("label");c.className="form-label",c.htmlFor=t,c.textContent=e;let m;if(a==="textarea"){const d=document.createElement("textarea");d.id=t,d.name=t,d.value=s,d.placeholder=o,d.required=n,d.rows=3,m=d}else{const d=document.createElement("input");d.type=a,d.id=t,d.name=t,d.value=s,d.placeholder=o,d.required=n,i&&(d.autocomplete=i),m=d}return m.className="form-input",l.appendChild(c),l.appendChild(m),l}function Ee(){const e=document.createElement("div");e.className="modal-overlay delete-profile-modal",e.innerHTML=`
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
  `;const t=e.querySelector("#delete-confirmation"),a=e.querySelector("#confirm-delete-btn");t.addEventListener("input",()=>{t.value.trim().toUpperCase()==="DELETE"?(a.disabled=!1,a.classList.add("enabled")):(a.disabled=!0,a.classList.remove("enabled"))}),a.addEventListener("click",async()=>{if(t.value.trim().toUpperCase()==="DELETE")try{a.innerHTML='<i class="fas fa-spinner fa-spin"></i> Deleting...',a.disabled=!0,await new Promise(s=>setTimeout(s,2e3)),console.log("Profile deletion confirmed"),e.remove(),z("Profile deleted successfully. Redirecting...","success"),setTimeout(()=>{window.location.href="/"},2e3)}catch(s){console.error("Error deleting profile:",s),z("Failed to delete profile. Please try again.","error"),a.innerHTML='<i class="fas fa-trash-alt"></i> Delete Profile Forever',a.disabled=!1}}),e.addEventListener("click",s=>{(s.target===e||s.target.classList.contains("modal-close"))&&e.remove()}),document.body.appendChild(e),setTimeout(()=>{t.focus()},100)}const z=window.showMessage;window.messageTimeout=null;let P=null;function ye(){const e=T.getTranslations(),t=document.querySelector('.navbar-link[href="/"]'),a=document.querySelector('.navbar-link[href="/tournament"]'),s=document.querySelector('.navbar-link[href="/ACCOUNT"], .navbar-link[href="/logout"]'),n=document.querySelector('.navbar-link[href="/profile"]');t&&(t.textContent=e.nav.home),a&&(a.textContent=e.nav.tournaments),n&&(n.textContent=e.nav.profile),s&&(s.textContent=k?e.nav.logout:e.nav.account);const o=document.querySelector(".navbar-logo");o&&(o.textContent=e.common.neonPong);const i=document.querySelector(".font-size-controls .sr-only");i&&(i.textContent=e.fontControls.label);const r=document.querySelector(".font-size-btn i.fa-minus");if(r&&r.parentElement){const m=r.parentElement.querySelector(".sr-only");m&&(m.textContent=e.fontControls.decrease),r.parentElement.setAttribute("title",e.fontControls.decrease)}const l=document.querySelector(".font-size-btn i.fa-plus");if(l&&l.parentElement){const m=l.parentElement.querySelector(".sr-only");m&&(m.textContent=e.fontControls.increase),l.parentElement.setAttribute("title",e.fontControls.increase)}const c=document.getElementById("app");c&&B(c)}function A(e){ne(),setTimeout(()=>{history.pushState(null,"",e);const t=document.getElementById("app");if(t){B(t),document.title=pe(e);const a=document.getElementById("screen-reader-live-region");a&&(a.textContent="",a.textContent=`Navigated to ${document.title}.`),window.scrollTo(0,0)}se()},300)}function pe(e){switch(e){case"/":return"Home - Neon Pong";case"/tournament":return"Tournaments - Neon Pong";case"/register":return"Register - Neon Pong";case"/login":return"Login - Neon Pong";case"/profile":return"Profile - Neon Pong";case"/logout":return"Logged Out - Neon Pong";default:return"Page Not Found - Neon Pong"}}function ue(){const e=document.createElement("div");e.className="loading-overlay hidden",e.id="loading-overlay",e.setAttribute("role","status"),e.setAttribute("aria-live","assertive");const t=document.createElement("div");t.className="spinner",e.appendChild(t);const a=document.createElement("p");return a.className="loading-text",a.textContent="Loading...",a.setAttribute("aria-label","Content is loading"),e.appendChild(a),e}function ne(){const e=document.getElementById("app");if(e){let t=document.getElementById("loading-overlay");t||(t=ue(),e.appendChild(t)),t.classList.remove("hidden")}}function se(){const e=document.getElementById("loading-overlay");e&&e.classList.add("hidden")}function y(e,t="info"){const a=document.querySelector(".message");a&&(a.classList.add("removing"),setTimeout(()=>a.remove(),300)),window.messageTimeout&&clearTimeout(window.messageTimeout);const s=document.createElement("div");s.className=`message ${t}-message`;let n="";t==="success"?n="fas fa-check-circle":t==="error"?n="fas fa-exclamation-circle":n="fas fa-info-circle";const o=document.createElement("i");o.className=n;const i=document.createElement("div");i.className="message-content",i.textContent=e;const r=document.createElement("button");r.className="close-button",r.innerHTML="&times;",r.setAttribute("aria-label","Close message"),r.addEventListener("click",()=>{s.classList.add("removing"),setTimeout(()=>s.remove(),300),window.messageTimeout&&clearTimeout(window.messageTimeout)}),s.appendChild(o),s.appendChild(i),s.appendChild(r),s.setAttribute("role","status"),s.setAttribute("aria-live","polite"),s.setAttribute("aria-atomic","true"),document.body.appendChild(s),window.messageTimeout=window.setTimeout(()=>{s.classList.add("removing"),setTimeout(()=>s.remove(),300)},4e3)}let q=!1,R=.8,k=!1;function Ce(){q=!q,document.body.classList.toggle("high-contrast",q),localStorage.setItem("highContrast",q.toString())}function ce(e){const n=Math.max(.8,Math.min(2,R+(e?.1:-.1)));if(n!==R){R=n,document.documentElement.style.setProperty("--font-size-multiplier",R.toString()),document.body.style.display="none",document.body.offsetHeight,document.body.style.display="";const o=document.querySelector(".font-size-display");if(o){const i=Math.round(R*100),r=`Font size set to ${i}%`;o.textContent=`${i}%`,localStorage.setItem("fontSizeMultiplier",R.toString()),o.classList.add("active"),setTimeout(()=>o.classList.remove("active"),500);const l=document.getElementById("a11y-announcement");l?(l.textContent=r,setTimeout(()=>l.textContent="",1e3)):y(r,"info")}}}function Te(){localStorage.getItem("highContrast")==="true"&&(q=!0,document.body.classList.add("high-contrast"));const t=parseFloat(localStorage.getItem("fontSizeMultiplier")||"0.8");t>=.8&&t<=1.5&&(R=t),document.documentElement.style.setProperty("--font-size-multiplier",R.toString())}typeof document<"u"&&document.addEventListener("DOMContentLoaded",Te);function W(){const e=T.getTranslations(),t=document.querySelector('.navbar-link[href="/profile"]');let a=document.querySelector('.navbar-link[href="/ACCOUNT"]');a||(a=document.querySelector('.navbar-link[href="/logout"]')),t&&(t.style.display=k?"flex":"none"),a&&(a.textContent=k?e.nav.logout:e.nav.account,a.href=k?"/logout":"/ACCOUNT")}function de(e){k=!0,P={id:Date.now(),username:e},localStorage.setItem("isLoggedIn","true"),localStorage.setItem("currentUser",JSON.stringify(P)),W(),y(`Welcome back, ${e}!`,"success"),A("/profile")}function fe(){k=!1,P=null,localStorage.removeItem("isLoggedIn"),localStorage.removeItem("currentUser"),W(),y("Logged out successfully!","success"),A("/")}function we(){const e=localStorage.getItem("isLoggedIn"),t=localStorage.getItem("currentUser");e==="true"&&t&&(k=!0,P=JSON.parse(t),W())}function Ae(){const e=T.getTranslations(),t=document.createElement("nav");t.className="navbar",t.setAttribute("aria-label","Main navigation");const a=document.createElement("a");a.className="navbar-logo",a.textContent=e.common.neonPong,a.href="/",a.addEventListener("click",f=>{f.preventDefault(),A("/")});const s=document.createElement("div");s.id="mobile-menu",s.className="menu-toggle",s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls","navbarLinksContainer");for(let f=0;f<3;f++){const w=document.createElement("span");w.className="bar",s.appendChild(w)}const n=document.createElement("div");n.id="navbarLinksContainer",n.className="navbar-links-container";const o=document.createElement("div");o.className="navbar-links",o.setAttribute("role","menubar");const i=document.createElement("a");i.href="/",i.className="navbar-link",i.textContent=e.nav.home,i.setAttribute("role","menuitem"),i.addEventListener("click",f=>{f.preventDefault(),A("/")});const r=document.createElement("a");r.href="/tournament",r.className="navbar-link",r.textContent=e.nav.tournaments,r.setAttribute("role","menuitem"),r.addEventListener("click",f=>{f.preventDefault(),A("/tournament")});const l=document.createElement("a");l.href="/ACCOUNT",l.className="navbar-link",l.textContent=e.nav.account,l.setAttribute("role","menuitem"),l.addEventListener("click",f=>{if(f.preventDefault(),k)fe();else{const w=window.location.pathname;A((w==="/login"||w==="/register")&&w==="/login"?"/register":"/login")}}),o.appendChild(i),o.appendChild(r),o.appendChild(l);const c=document.createElement("a");c.href="/profile",c.className="navbar-link",c.textContent=e.nav.profile,c.setAttribute("role","menuitem"),c.style.display="none",c.addEventListener("click",f=>{f.preventDefault(),A("/profile")}),o.appendChild(c);const m=document.createElement("div");m.className="language-selector",m.setAttribute("aria-label","Language selection");const d=document.createElement("button");d.className="language-btn",d.innerHTML='🌐 <span class="language-text">EN</span> <i class="fas fa-chevron-down" aria-hidden="true"></i>',d.setAttribute("aria-label","Select language"),d.setAttribute("aria-expanded","false");const p=document.createElement("div");p.className="language-dropdown",p.setAttribute("role","menu"),[{code:"en",name:"English",flag:"🇺🇸"},{code:"fr",name:"Français",flag:"🇫🇷"},{code:"es",name:"Español",flag:"🇪🇸"}].forEach(f=>{const w=document.createElement("button");w.className="language-option",w.innerHTML=`${f.flag} ${f.name}`,w.setAttribute("role","menuitem"),w.dataset.lang=f.code,w.addEventListener("click",()=>{T.setLanguage(f.code),d.innerHTML=`🌐 <span class="language-text">${f.code.toUpperCase()}</span> <i class="fas fa-chevron-down" aria-hidden="true"></i>`,p.style.display="none",d.setAttribute("aria-expanded","false"),ye()}),p.appendChild(w)}),d.addEventListener("click",()=>{const f=p.style.display==="block";p.style.display=f?"none":"block",d.setAttribute("aria-expanded",(!f).toString())}),document.addEventListener("click",f=>{m.contains(f.target)||(p.style.display="none",d.setAttribute("aria-expanded","false"))}),m.appendChild(d),m.appendChild(p);const u=document.createElement("div");u.className="accessibility-controls",u.setAttribute("aria-label","Accessibility controls");const v=document.createElement("button");v.className="accessibility-btn",v.innerHTML='<i class="fas fa-adjust" aria-hidden="true"></i>',v.setAttribute("aria-label","Toggle high contrast mode"),v.setAttribute("title","Toggle high contrast mode"),v.addEventListener("click",Ce);const h=document.createElement("div");h.className="font-size-controls",h.setAttribute("aria-label","Font size controls");const C=document.createElement("span");C.className="sr-only",C.textContent=e.fontControls.label,h.appendChild(C);const b=document.createElement("button");b.className="font-size-btn",b.innerHTML=`<i class="fas fa-minus" aria-hidden="true"></i> <span class="sr-only">${e.fontControls.decrease}</span>`,b.setAttribute("aria-label",e.fontControls.decrease),b.setAttribute("title",e.fontControls.decrease),b.addEventListener("click",f=>{f.preventDefault(),ce(!1)});const E=document.createElement("span");E.className="font-size-display",E.textContent="A",E.setAttribute("aria-hidden","true");const L=document.createElement("button");L.className="font-size-btn",L.innerHTML=`<i class="fas fa-plus" aria-hidden="true"></i> <span class="sr-only">${e.fontControls.increase}</span>`,L.setAttribute("aria-label",e.fontControls.increase),L.setAttribute("title",e.fontControls.increase),L.addEventListener("click",f=>{f.preventDefault(),ce(!0)}),h.appendChild(b),h.appendChild(E),h.appendChild(L);const I=document.createElement("a");I.href="#main-content",I.className="skip-to-content",I.textContent="Skip to main content",I.setAttribute("tabindex","0");const N=document.createElement("div");return N.className="controls-container",N.appendChild(m),N.appendChild(h),N.appendChild(v),u.appendChild(N),n.appendChild(o),n.appendChild(u),t.prepend(I),t.appendChild(a),t.appendChild(s),t.appendChild(n),s.addEventListener("click",()=>{n.classList.toggle("active"),s.classList.toggle("active");const f=s.classList.contains("active");s.setAttribute("aria-expanded",String(f))}),o.querySelectorAll(".navbar-link").forEach(f=>{f.addEventListener("click",()=>{window.innerWidth<=768&&(n.classList.remove("active"),s.classList.remove("active"),s.setAttribute("aria-expanded","false"))})}),document.addEventListener("click",f=>{window.innerWidth<=768&&!n.contains(f.target)&&!s.contains(f.target)&&n.classList.contains("active")&&(n.classList.remove("active"),s.classList.remove("active"),s.setAttribute("aria-expanded","false"))}),t}function J(){return document.createElement("footer")}function me(){const e=T.getTranslations(),t=document.createElement("div");t.className="page",t.setAttribute("role","main"),t.id="home";const a=document.createElement("section");a.className="hero-section content-section";const s=document.createElement("img");s.className="ping-pong-paddle";const n=document.createElement("h1");n.className="hero-title",n.textContent=e.home.title;const o=document.createElement("h2");o.className="hero-subtitle",o.textContent=e.home.tagline;const i=document.createElement("p");i.className="hero-description",i.textContent=e.home.description;const r=document.createElement("div");r.className="hero-cta";const l=document.createElement("button");l.className="primary-button register-cta-button",l.innerHTML=`<i class="fas fa-user-plus"></i> ${e.home.registerNow}`,l.addEventListener("click",()=>A("/register")),r.appendChild(l),a.appendChild(s),a.appendChild(n),a.appendChild(o),a.appendChild(i),a.appendChild(r),t.appendChild(a);const c=document.createElement("section");c.id="team",c.className="content-section";const m=document.createElement("h2");m.className="section-title",m.textContent=e.home.meetTheTeam,c.appendChild(m);const d=document.createElement("div");return d.className="team-grid",[{name:"Hanieh",avatar:"/pic1.png"},{name:"Mira",avatar:"/pic2.png"},{name:"Fatima Fidha",avatar:"/pic3.png"}].forEach(g=>{const u=document.createElement("div");u.className="team-member-card";const v=document.createElement("img");v.src=g.avatar,v.alt=`Avatar of ${g.name}`,v.className="team-member-avatar";const h=document.createElement("p");h.className="team-member-name",h.textContent=g.name,u.appendChild(v),u.appendChild(h),d.appendChild(u)}),c.appendChild(d),t.appendChild(c),t.appendChild(J()),t}function Ne(){const e=T.getTranslations(),t=document.createElement("div");t.className="page content-section",t.id="tournaments-page",t.setAttribute("role","main");const a=document.createElement("div");a.className="tournament-hero-premium",a.innerHTML=`
    <div class="hero-background-effects">
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
      <div class="floating-orb orb-3"></div>
    </div>
    
    <div class="tournament-hero-content">
      <div class="premium-badge">
        <span>${e.tournaments.elite}</span>
      </div>
      
      <div class="tournament-icon-premium">
        <div class="icon-glow"></div>
        <i class="fas fa-crown"></i>
      </div>
      
      <h1 class="tournament-hero-title-premium">
        <span class="title-line-1">${e.tournaments.championship}</span>
        <span class="title-line-2">${e.tournaments.arena}</span>
      </h1>
      
      <p class="tournament-hero-subtitle-premium">
        ${e.tournaments.subtitle}
      </p>
      
      <div class="tournament-stats-grid">
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-content">
            <span class="stat-number">4</span>
            <span class="stat-label">${e.tournaments.stats.elitePlayers}</span>
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-trophy"></i>
          </div>
          <div class="stat-content">
            <span class="stat-number">1</span>
            <span class="stat-label">${e.tournaments.stats.champion}</span>
          </div>
        </div>
        
        <div class="stat-item">
          <div class="stat-icon">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="stat-content">
            <span class="stat-number">∞</span>
            <span class="stat-label">${e.tournaments.stats.glory}</span>
          </div>
        </div>
      </div>
      
      <div class="tournament-features-premium">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-chess"></i>
          </div>
          <h3>${e.tournaments.features.strategic.title}</h3>
          <p>${e.tournaments.features.strategic.description}</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-medal"></i>
          </div>
          <h3>${e.tournaments.features.prestige.title}</h3>
          <p>${e.tournaments.features.prestige.description}</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-fire"></i>
          </div>
          <h3>${e.tournaments.features.competition.title}</h3>
          <p>${e.tournaments.features.competition.description}</p>
        </div>
      </div>
    </div>
  `,t.appendChild(a);const s=document.createElement("div");if(s.className="tournament-create-section-premium",console.log("Tournament page - isLoggedIn:",k,"currentUser:",P),k&&P){s.innerHTML=`
      <div class="create-tournament-card-premium">
        <div class="card-shimmer"></div>
        <div class="card-content">
          <div class="create-icon-premium">
            <div class="icon-rings">
              <div class="ring ring-1"></div>
              <div class="ring ring-2"></div>
              <div class="ring ring-3"></div>
            </div>
            <i class="fas fa-plus"></i>
          </div>
          
          <div class="create-text-content">
            <h2 class="create-title-premium">${e.tournaments.createCard.title}</h2>
            <p class="create-description-premium">
              ${e.tournaments.createCard.description}
            </p>
            
            <div class="tournament-benefits">
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>${e.tournaments.createCard.benefits.bracket}</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>${e.tournaments.createCard.benefits.progress}</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>${e.tournaments.createCard.benefits.ceremony}</span>
              </div>
            </div>
          </div>
          
          <button class="create-tournament-btn-premium" id="create-tournament-btn">
            <span class="btn-bg"></span>
            <span class="btn-content">
              <i class="fas fa-crown"></i>
              <span>${e.tournaments.createCard.button}</span>
            </span>
          </button>
        </div>
      </div>
    `;const n=s.querySelector("#create-tournament-btn");n==null||n.addEventListener("click",qe)}else s.innerHTML=`
      <div class="create-tournament-card-premium login-required">
        <div class="card-shimmer"></div>
        <div class="card-content">
          <div class="create-icon-premium locked">
            <div class="icon-rings">
              <div class="ring ring-1"></div>
              <div class="ring ring-2"></div>
            </div>
            <i class="fas fa-lock"></i>
          </div>
          
          <div class="create-text-content">
            <h2 class="create-title-premium">${e.tournaments.loginRequired.title}</h2>
            <p class="create-description-premium">
              ${e.tournaments.loginRequired.description}
            </p>
            
            <div class="login-benefits">
              <div class="benefit-item">
                <i class="fas fa-star"></i>
                <span>${e.tournaments.loginRequired.benefits.access}</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-star"></i>
                <span>${e.tournaments.loginRequired.benefits.status}</span>
              </div>
            </div>
          </div>
          
          <button class="create-tournament-btn-premium" onclick="navigateTo('/ACCOUNT')">
            <span class="btn-bg"></span>
            <span class="btn-content">
              <i class="fas fa-key"></i>
              <span>${e.tournaments.loginRequired.button}</span>
            </span>
          </button>
        </div>
      </div>
    `;return t.appendChild(s),t.appendChild(J()),t}function ae(e=!0){const t=T.getTranslations(),a=document.createElement("div");a.className="page content-section",a.id=e?"login":"register",a.setAttribute("role","main");const s=document.createElement("div");s.className="form-container";const n=document.createElement("p");n.className="text-center mt-4";const o=document.createElement("a");o.href="#",o.className="text-blue-500 hover:underline",o.textContent=e?t.auth.login.createAccount:t.auth.register.signIn,o.addEventListener("click",E=>{E.preventDefault(),A(e?"/register":"/login")});const i=document.createElement("div");i.className="toggle-text-container";const r=document.createElement("span");r.className="toggle-text",r.textContent=e?t.auth.login.noAccount:t.auth.register.hasAccount,o.className="toggle-link neon-text",o.style.marginLeft="4px",o.style.textDecoration="none",o.style.transition="all 0.3s ease",o.style.fontWeight="600",o.addEventListener("mouseenter",()=>{o.style.textShadow="0 0 10px rgba(99, 102, 241, 0.8)"}),o.addEventListener("mouseleave",()=>{o.style.textShadow="none"}),i.appendChild(r),i.appendChild(o),n.appendChild(i);const l=document.createElement("h2");l.className="form-title",l.textContent=e?t.auth.login.title:t.auth.register.title;const c=document.createElement("form");c.noValidate=!0;let m=null;if(!e){const E=document.createElement("label");E.className="form-label",E.textContent=t.auth.register.email,m=document.createElement("input"),m.type="email",m.className="form-input",m.required=!0,m.placeholder="Enter your email",c.appendChild(E),c.appendChild(m)}const d=document.createElement("label");d.className="form-label",d.textContent=e?t.auth.login.username:t.auth.register.username;const p=document.createElement("input");p.type="text",p.className="form-input",p.required=!0,p.placeholder="Choose a username";const g=document.createElement("label");g.className="form-label",g.textContent=e?t.auth.login.password:t.auth.register.password;const u=document.createElement("input");u.type="password",u.className="form-input",u.required=!0,u.placeholder="Create a password";let v=null,h=null;e||(h=document.createElement("label"),h.className="form-label",h.textContent=t.auth.register.confirmPassword,v=document.createElement("input"),v.type="password",v.className="form-input",v.required=!0,v.placeholder="Confirm your password");const C=document.createElement("button");C.type="submit",C.className="primary-button w-full",C.textContent=e?t.auth.login.button:t.auth.register.button;const b=document.createElement("button");return b.type="button",b.className="secondary-button w-full mt-2",b.textContent=e?t.auth.login.backToHome:t.auth.register.backToHome,b.addEventListener("click",()=>A("/")),e||c.appendChild(document.createElement("br")),c.appendChild(d),c.appendChild(p),c.appendChild(document.createElement("br")),c.appendChild(g),c.appendChild(u),!e&&v&&h&&(c.appendChild(document.createElement("br")),c.appendChild(h),c.appendChild(v)),e&&c.appendChild(document.createElement("br")),c.appendChild(C),c.appendChild(b),s.appendChild(l),s.appendChild(c),s.appendChild(n),a.appendChild(s),a.appendChild(J()),c.addEventListener("submit",async E=>{if(E.preventDefault(),!e&&u.value!==(v==null?void 0:v.value)){y("Passwords do not match","error");return}ne();try{e?p.value.trim()&&u.value.trim()?de(p.value):y("Please enter both username and password","error"):m&&(p.value.trim()&&u.value.trim()&&m.value.trim()?(de(p.value),y("Registration successful!","success")):y("Please fill in all fields","error"))}catch(L){console.error("Auth error:",L),y("An error occurred. Please try again.","error")}finally{se()}}),a}function Se(){const e=T.getTranslations(),t=document.createElement("div");t.className="page content-section",t.id="profile",t.setAttribute("role","main");const a=document.createElement("h1");a.className="section-title",a.textContent=e.profile.title,t.appendChild(a);const s=document.createElement("div");s.className="profile-tabs";const n=document.createElement("div");n.className="tab-buttons",[{id:"dashboard",label:e.profile.tabs.dashboard,icon:"fa-tachometer-alt"},{id:"profile-info",label:e.profile.tabs.settings,icon:"fa-user-edit"},{id:"stats",label:e.profile.tabs.statistics,icon:"fa-chart-bar"},{id:"friends",label:e.profile.tabs.friends,icon:"fa-users"},{id:"match-history",label:e.profile.tabs.history,icon:"fa-history"}].forEach((u,v)=>{const h=document.createElement("button");h.className=`tab-button ${v===0?"active":""}`,h.dataset.tab=u.id,h.innerHTML=`<i class="fas ${u.icon}"></i> ${u.label}`,h.addEventListener("click",()=>ie(u.id)),n.appendChild(h)}),s.appendChild(n);const i=document.createElement("div");i.className="tab-content";const r={username:"player123",displayName:"Pro Player",skillLevel:"intermediate",bio:"Passionate ping pong player with 5 years of experience!",avatar:"/pic1.png",wins:45,losses:23,gamesPlayed:68,winRate:66.2,currentStreak:5,longestStreak:12,averageMatchDuration:22,preferredGameMode:"1v1",totalPlayTime:1456,ranking:42,totalPlayers:1337,averageScore:18.5,perfectGames:3,comebacks:8,friends:[{id:1,username:"friend1",displayName:"Alice",avatar:"/pic2.png",isOnline:!0},{id:2,username:"friend2",displayName:"Bob",avatar:"/pic3.png",isOnline:!1,lastSeen:new Date("2024-01-15")},{id:3,username:"friend3",displayName:"Carol",avatar:"/pic1.png",isOnline:!0}],matchHistory:[{id:1,opponent:"Alice",opponentAvatar:"/pic2.png",result:"win",score:"21-18",date:new Date("2024-01-20"),gameType:"1v1",duration:25},{id:2,opponent:"Bob",opponentAvatar:"/pic3.png",result:"loss",score:"19-21",date:new Date("2024-01-19"),gameType:"1v1",duration:30},{id:3,opponent:"Carol",opponentAvatar:"/pic1.png",result:"win",score:"21-15",date:new Date("2024-01-18"),gameType:"tournament",duration:20},{id:4,opponent:"David",opponentAvatar:"/pic2.png",result:"win",score:"21-12",date:new Date("2024-01-17"),gameType:"1v1",duration:18},{id:5,opponent:"Eve",opponentAvatar:"/pic3.png",result:"win",score:"21-16",date:new Date("2024-01-16"),gameType:"tournament",duration:28},{id:6,opponent:"Frank",opponentAvatar:"/pic1.png",result:"win",score:"21-19",date:new Date("2024-01-15"),gameType:"1v1",duration:35},{id:7,opponent:"Grace",opponentAvatar:"/pic2.png",result:"loss",score:"18-21",date:new Date("2024-01-14"),gameType:"tournament",duration:22}],weeklyStats:[{week:"Week 1",wins:8,losses:2,gamesPlayed:10},{week:"Week 2",wins:12,losses:3,gamesPlayed:15},{week:"Week 3",wins:6,losses:4,gamesPlayed:10},{week:"Week 4",wins:10,losses:5,gamesPlayed:15},{week:"Week 5",wins:9,losses:9,gamesPlayed:18}],skillProgression:[{month:"Sep",rating:1200},{month:"Oct",rating:1350},{month:"Nov",rating:1420},{month:"Dec",rating:1465},{month:"Jan",rating:1520}]},l=document.createElement("div");l.className="tab-pane active",l.id="dashboard",l.appendChild(ke(r));const c=document.createElement("div");c.className="tab-pane",c.id="profile-info";const m=be(r);c.appendChild(m);const d=document.createElement("div");d.className="tab-pane",d.id="stats",d.appendChild(Oe(r));const p=document.createElement("div");p.className="tab-pane",p.id="friends",p.appendChild(Me(r.friends));const g=document.createElement("div");return g.className="tab-pane",g.id="match-history",g.appendChild($e(r.matchHistory)),i.appendChild(l),i.appendChild(c),i.appendChild(d),i.appendChild(p),i.appendChild(g),s.appendChild(i),t.appendChild(s),t}function ke(e){const t=T.getTranslations(),a=document.createElement("div");a.className="dashboard-section";const s=document.createElement("div");s.className="dashboard-header",s.innerHTML=`
    <div class="welcome-banner">
      <h2>${t.profile.dashboard.welcome}</h2>
      <p>${t.profile.dashboard.overview}</p>
    </div>
  `,a.appendChild(s);const n=document.createElement("div");n.className="dashboard-kpis";const o=document.createElement("h3");o.textContent=t.profile.dashboard.overview,o.className="dashboard-section-title",n.appendChild(o);const i=document.createElement("div");i.className="kpi-grid",[{label:t.profile.dashboard.rank,value:`#${e.ranking}`,subtitle:`${t.profile.dashboard.of} ${e.totalPlayers} ${t.profile.dashboard.players}`,icon:"fa-crown",color:"gold",trend:"up"},{label:t.profile.dashboard.winRate,value:`${e.winRate}%`,subtitle:`${e.wins}W / ${e.losses}L`,icon:"fa-trophy",color:"success",trend:"up"},{label:t.profile.dashboard.streak,value:e.currentStreak,subtitle:`${t.profile.dashboard.best}: ${e.longestStreak}`,icon:"fa-fire",color:"warning",trend:"up"},{label:t.profile.dashboard.playTime,value:`${Math.floor(e.totalPlayTime/60)}h ${e.totalPlayTime%60}m`,subtitle:`${t.profile.dashboard.avg}: ${e.averageMatchDuration}min/game`,icon:"fa-clock",color:"info",trend:"up"}].forEach(b=>{const E=document.createElement("div");E.className=`kpi-card ${b.color}`,E.innerHTML=`
      <div class="kpi-header">
        <div class="kpi-icon">
          <i class="fas ${b.icon}"></i>
        </div>
        <div class="kpi-trend ${b.trend}">
          <i class="fas fa-arrow-${b.trend}"></i>
        </div>
      </div>
      <div class="kpi-content">
        <div class="kpi-value">${b.value}</div>
        <div class="kpi-label">${b.label}</div>
        <div class="kpi-subtitle">${b.subtitle}</div>
      </div>
    `,i.appendChild(E)}),n.appendChild(i),a.appendChild(n);const l=document.createElement("div");l.className="dashboard-analytics";const c=document.createElement("h3");c.textContent=t.profile.dashboard.analytics,c.className="dashboard-section-title",l.appendChild(c);const m=document.createElement("div");m.className="charts-container";const d=Le(e.weeklyStats);m.appendChild(d);const p=Ie(e.skillProgression);m.appendChild(p),l.appendChild(m),a.appendChild(l);const g=document.createElement("div");g.className="dashboard-activity";const u=document.createElement("div");u.className="activity-row";const v=Pe(e.matchHistory.slice(0,5));u.appendChild(v);const h=xe(e);u.appendChild(h),g.appendChild(u),a.appendChild(g);const C=Re(e);return a.appendChild(C),a}function Le(e){const t=T.getTranslations(),a=document.createElement("div");a.className="chart-container weekly-chart";const s=document.createElement("h4");s.textContent=t.profile.dashboard.weekly,a.appendChild(s);const n=document.createElement("div");n.className="chart-wrapper";const o=Math.max(...e.map(r=>r.gamesPlayed));e.forEach(r=>{const l=document.createElement("div");l.className="week-bar";const c=r.wins/o*100,m=r.losses/o*100;l.innerHTML=`
      <div class="bar-stack">
        <div class="bar-segment wins" style="height: ${c}%" 
             title="${r.wins} wins"></div>
        <div class="bar-segment losses" style="height: ${m}%" 
             title="${r.losses} losses"></div>
      </div>
      <div class="bar-label">${r.week}</div>
      <div class="bar-stats">
        <span class="win-count">${r.wins}W</span>
        <span class="loss-count">${r.losses}L</span>
      </div>
    `,n.appendChild(l)}),a.appendChild(n);const i=document.createElement("div");return i.className="chart-legend",i.innerHTML=`
    <div class="legend-item">
      <div class="legend-color wins"></div>
      <span>${t.profile.dashboard.wins}</span>
    </div>
    <div class="legend-item">
      <div class="legend-color losses"></div>
      <span>${t.profile.dashboard.losses}</span>
    </div>
  `,a.appendChild(i),a}function Ie(e){const t=T.getTranslations(),a=document.createElement("div");a.className="chart-container skill-chart";const s=document.createElement("h4");s.textContent=t.profile.dashboard.rating,a.appendChild(s);const n=document.createElement("div");n.className="line-chart-wrapper";const o=Math.max(...e.map(p=>p.rating)),i=Math.min(...e.map(p=>p.rating)),r=o-i,l=document.createElement("div");l.className="svg-chart";let c="";const m=[];e.forEach((p,g)=>{const u=g/(e.length-1)*100,v=(o-p.rating)/r*100;g===0?c+=`M ${u} ${v}`:c+=` L ${u} ${v}`,m.push(`
      <div class="chart-point" style="left: ${u}%; top: ${v}%"
           title="${p.month}: ${p.rating}">
        <div class="point-value">${p.rating}</div>
      </div>
    `)}),l.innerHTML=`
    <svg viewBox="0 0 100 100" class="line-chart">
      <path d="${c}" class="chart-line" />
      <path d="${c}" class="chart-line-glow" />
    </svg>
    ${m.join("")}
  `,n.appendChild(l);const d=document.createElement("div");return d.className="chart-x-axis",e.forEach(p=>{const g=document.createElement("span");g.textContent=p.month,d.appendChild(g)}),n.appendChild(d),a.appendChild(n),a}function Pe(e){const t=T.getTranslations(),a=document.createElement("div");a.className="recent-matches-summary";const s=document.createElement("h4");s.textContent=t.profile.dashboard.recent,a.appendChild(s);const n=document.createElement("div");n.className="recent-matches-list",e.forEach(i=>{const r=document.createElement("div");r.className=`recent-match-item ${i.result}`;const l=i.result==="win"?"fa-check-circle":"fa-times-circle";r.innerHTML=`
      <div class="match-result-icon">
        <i class="fas ${l}"></i>
      </div>
      <div class="match-info">
        <div class="opponent-name">${i.opponent}</div>
        <div class="match-details">${i.score} • ${i.duration}min</div>
      </div>
      <div class="match-date">${i.date.toLocaleDateString()}</div>
    `,n.appendChild(r)}),a.appendChild(n);const o=document.createElement("button");return o.className="secondary-button",o.textContent=t.profile.dashboard.viewAll,o.addEventListener("click",()=>ie("match-history")),a.appendChild(o),a}function xe(e){const t=T.getTranslations(),a=document.createElement("div");a.className="advanced-stats-panel";const s=document.createElement("h4");s.textContent=t.profile.dashboard.advanced,a.appendChild(s);const n=document.createElement("div");return n.className="advanced-stats-grid",[{label:t.profile.dashboard.avgScore,value:e.averageScore,unit:"pts"},{label:t.profile.dashboard.perfectGames,value:e.perfectGames,unit:""},{label:t.profile.dashboard.comebacks,value:e.comebacks,unit:""},{label:t.profile.dashboard.preferredMode,value:e.preferredGameMode,unit:""}].forEach(i=>{const r=document.createElement("div");r.className="advanced-stat-item",r.innerHTML=`
      <div class="stat-value">${i.value}${i.unit}</div>
      <div class="stat-label">${i.label}</div>
    `,n.appendChild(r)}),a.appendChild(n),a}function Re(e){const t=T.getTranslations(),a=document.createElement("div");a.className="achievements-section";const s=document.createElement("h3");s.textContent=t.profile.dashboard.achievements,s.className="dashboard-section-title",a.appendChild(s);const n=document.createElement("div");return n.className="achievements-grid",[{title:t.profile.dashboard.winStreakMaster,description:t.profile.dashboard.winStreakDesc,progress:e.currentStreak,target:10,icon:"fa-fire",unlocked:e.longestStreak>=10},{title:t.profile.dashboard.centuryClub,description:t.profile.dashboard.centuryDesc,progress:e.gamesPlayed,target:100,icon:"fa-medal",unlocked:e.gamesPlayed>=100},{title:t.profile.dashboard.perfectPlayer,description:t.profile.dashboard.perfectDesc,progress:e.perfectGames,target:1,icon:"fa-star",unlocked:e.perfectGames>=1},{title:t.profile.dashboard.socialButterfly,description:t.profile.dashboard.socialDesc,progress:e.friends.length,target:10,icon:"fa-users",unlocked:e.friends.length>=10}].forEach(i=>{const r=document.createElement("div");r.className=`achievement-card ${i.unlocked?"unlocked":"locked"}`;const l=Math.min(i.progress/i.target*100,100);r.innerHTML=`
      <div class="achievement-icon">
        <i class="fas ${i.icon}"></i>
        ${i.unlocked?'<div class="unlock-badge"><i class="fas fa-check"></i></div>':""}
      </div>
      <div class="achievement-content">
        <div class="achievement-title">${i.title}</div>
        <div class="achievement-description">${i.description}</div>
        <div class="achievement-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${l}%"></div>
          </div>
          <div class="progress-text">${i.progress}/${i.target}</div>
        </div>
      </div>
    `,n.appendChild(r)}),a.appendChild(n),a}function ie(e){var t,a;document.querySelectorAll(".tab-button").forEach(s=>{s.classList.remove("active")}),(t=document.querySelector(`[data-tab="${e}"]`))==null||t.classList.add("active"),document.querySelectorAll(".tab-pane").forEach(s=>{s.classList.remove("active")}),(a=document.getElementById(e))==null||a.classList.add("active")}function Oe(e){const t=T.getTranslations(),a=document.createElement("div");a.className="stats-section";const s=document.createElement("h2");s.textContent=t.profile.statistics.title,a.appendChild(s);const n=document.createElement("div");return n.className="stats-grid",[{label:t.profile.statistics.gamesPlayed,value:e.gamesPlayed,icon:"fa-gamepad"},{label:t.profile.statistics.wins,value:e.wins,icon:"fa-trophy",color:"success"},{label:t.profile.statistics.losses,value:e.losses,icon:"fa-times-circle",color:"danger"},{label:t.profile.statistics.winRate,value:`${e.winRate}%`,icon:"fa-percentage",color:"info"}].forEach(i=>{const r=document.createElement("div");r.className=`stat-card ${i.color||""}`,r.innerHTML=`
      <div class="stat-icon">
        <i class="fas ${i.icon}"></i>
      </div>
      <div class="stat-content">
        <div class="stat-value">${i.value}</div>
        <div class="stat-label">${i.label}</div>
      </div>
    `,n.appendChild(r)}),a.appendChild(n),a}function Me(e){const t=T.getTranslations(),a=document.createElement("div");a.className="friends-section";const s=document.createElement("div");s.className="section-header";const n=document.createElement("h2");n.textContent=t.profile.friends.title;const o=document.createElement("button");o.className="primary-button",o.innerHTML=`<i class="fas fa-user-plus"></i> ${t.profile.friends.addFriend}`,o.addEventListener("click",De),s.appendChild(n),s.appendChild(o),a.appendChild(s);const i=document.createElement("div");if(i.className="friends-list",e.length===0){const r=document.createElement("div");r.className="empty-state",r.innerHTML=`
      <i class="fas fa-user-friends"></i>
      <p>No friends yet. Start by adding some friends!</p>
    `,i.appendChild(r)}else e.forEach(r=>{const l=document.createElement("div");l.className="friend-card";const c=r.isOnline?"online":"offline",m=r.isOnline?t.profile.friends.online:r.lastSeen?`${t.profile.friends.lastSeen} ${r.lastSeen.toLocaleDateString()}`:"Offline";l.innerHTML=`
        <div class="friend-avatar">
          <img src="${r.avatar}" alt="${r.displayName}'s avatar" />
          <div class="status-indicator ${c}"></div>
        </div>
        <div class="friend-info">
          <div class="friend-name">${r.displayName}</div>
          <div class="friend-username">@${r.username}</div>
          <div class="friend-status ${c}">${m}</div>
        </div>
        <div class="friend-actions">
          <button class="secondary-button" onclick="challengeFriend('${r.username}')">
            <i class="fas fa-gamepad"></i> ${t.profile.friends.challenge}
          </button>
          <button class="danger-button" onclick="removeFriend(${r.id})">
            <i class="fas fa-user-minus"></i>
          </button>
        </div>
      `,i.appendChild(l)});return a.appendChild(i),a}function $e(e){const t=T.getTranslations(),a=document.createElement("div");a.className="match-history-section";const s=document.createElement("h2");if(s.textContent=t.profile.history.title,a.appendChild(s),e.length===0){const o=document.createElement("div");return o.className="empty-state",o.innerHTML=`
      <i class="fas fa-history"></i>
      <p>No matches played yet. Start playing to build your history!</p>
    `,a.appendChild(o),a}const n=document.createElement("div");return n.className="match-history-list",e.forEach(o=>{const i=document.createElement("div");i.className=`match-card ${o.result}`;const r=o.result==="win"?"fa-trophy":"fa-times-circle",l=o.result==="win"?t.profile.history.victory:t.profile.history.defeat;i.innerHTML=`
      <div class="match-result">
        <i class="fas ${r}"></i>
        <span class="result-text">${l}</span>
      </div>
      <div class="match-opponent">
        <img src="${o.opponentAvatar}" alt="${o.opponent}'s avatar" class="opponent-avatar" />
        <div class="opponent-info">
          <div class="opponent-name">${o.opponent}</div>
          <div class="game-type">${o.gameType==="1v1"?t.profile.history.match1v1:t.profile.history.tournament}</div>
        </div>
      </div>
      <div class="match-details">
        <div class="match-score">${o.score}</div>
        <div class="match-date">${o.date.toLocaleDateString()}</div>
        <div class="match-duration">${o.duration} ${t.profile.history.min}</div>
      </div>
    `,n.appendChild(i)}),a.appendChild(n),a}function De(){const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
  `,e.addEventListener("click",t=>{(t.target===e||t.target.classList.contains("modal-close"))&&e.remove()}),document.body.appendChild(e)}function Fe(){var a;const t=document.getElementById("friend-username").value.trim();t?(y(`Friend request sent to ${t}!`,"success"),(a=document.querySelector(".modal-overlay"))==null||a.remove()):y("Please enter a username","error")}function Ue(e){y(`Challenge sent to ${e}!`,"info")}function He(e){confirm("Are you sure you want to remove this friend?")&&(console.log(`Removing friend with ID: ${e}`),y("Friend removed","info"))}window.addFriend=Fe;window.challengeFriend=Ue;window.removeFriend=He;function qe(){if(console.log("showCreateTournamentModal called - isLoggedIn:",k,"currentUser:",P),!k||!P){y("Please login to create tournaments.","error"),A("/ACCOUNT");return}const e=document.createElement("div");e.className="modal-overlay",e.style.cssText=`
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
    background: linear-gradient(135deg, rgba(15, 18, 40, 0.95), rgba(8, 10, 28, 0.98));
    backdrop-filter: blur(20px);
    border: 2px solid rgba(0, 230, 255, 0.3);
    border-radius: 16px;
    padding: 2rem;
    max-width: 600px;
    width: 90%;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 230, 255, 0.2);
    max-height: 90vh;
    overflow-y: auto;
  `,t.innerHTML=`
    <h2 style="color: #00e6ff; margin-bottom: 1.5rem; text-align: center; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Create Local Tournament</h2>
    
    <form id="create-tournament-form">
      <div style="margin-bottom: 1.5rem;">
        <label for="tournament-name" style="display: block; margin-bottom: 0.5rem; color: rgba(255, 255, 255, 0.9); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; font-size: 0.9rem;">Tournament Name:</label>
        <input type="text" id="tournament-name" required placeholder="Enter tournament name..." style="width: 100%; padding: 1rem; border: 1px solid rgba(0, 230, 255, 0.3); border-radius: 8px; background: linear-gradient(135deg, rgba(15, 18, 40, 0.8), rgba(8, 10, 28, 0.9)); color: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); font-size: 0.95rem;">
      </div>
      
      <div style="background: linear-gradient(135deg, rgba(0, 230, 255, 0.05), rgba(255, 0, 255, 0.05)); border: 1px solid rgba(0, 230, 255, 0.2); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h3 style="color: #00e6ff; margin-bottom: 1rem; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.5px;">
          <i class="fas fa-users"></i> Enter 4 Player Names
        </h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div>
            <label for="player1" style="display: block; margin-bottom: 0.5rem; color: rgba(255, 255, 255, 0.8); font-weight: 600; font-size: 0.9rem;">Player 1:</label>
            <input type="text" id="player1" required placeholder="Enter player 1 name..." style="width: 100%; padding: 0.8rem; border: 1px solid rgba(0, 230, 255, 0.3); border-radius: 6px; background: linear-gradient(135deg, rgba(15, 18, 40, 0.8), rgba(8, 10, 28, 0.9)); color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">
          </div>
          
          <div>
            <label for="player2" style="display: block; margin-bottom: 0.5rem; color: rgba(255, 255, 255, 0.8); font-weight: 600; font-size: 0.9rem;">Player 2:</label>
            <input type="text" id="player2" required placeholder="Enter player 2 name..." style="width: 100%; padding: 0.8rem; border: 1px solid rgba(0, 230, 255, 0.3); border-radius: 6px; background: linear-gradient(135deg, rgba(15, 18, 40, 0.8), rgba(8, 10, 28, 0.9)); color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">
          </div>
          
          <div>
            <label for="player3" style="display: block; margin-bottom: 0.5rem; color: rgba(255, 255, 255, 0.8); font-weight: 600; font-size: 0.9rem;">Player 3:</label>
            <input type="text" id="player3" required placeholder="Enter player 3 name..." style="width: 100%; padding: 0.8rem; border: 1px solid rgba(0, 230, 255, 0.3); border-radius: 6px; background: linear-gradient(135deg, rgba(15, 18, 40, 0.8), rgba(8, 10, 28, 0.9)); color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">
          </div>
          
          <div>
            <label for="player4" style="display: block; margin-bottom: 0.5rem; color: rgba(255, 255, 255, 0.8); font-weight: 600; font-size: 0.9rem;">Player 4:</label>
            <input type="text" id="player4" required placeholder="Enter player 4 name..." style="width: 100%; padding: 0.8rem; border: 1px solid rgba(0, 230, 255, 0.3); border-radius: 6px; background: linear-gradient(135deg, rgba(15, 18, 40, 0.8), rgba(8, 10, 28, 0.9)); color: rgba(255, 255, 255, 0.9); font-size: 0.9rem;">
          </div>
        </div>
        
        <div style="margin-top: 1rem; padding: 1rem; background: rgba(0, 230, 255, 0.1); border-radius: 8px; border: 1px solid rgba(0, 230, 255, 0.2);">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <i class="fas fa-trophy" style="color: #ffd700;"></i>
            <span style="color: rgba(255, 255, 255, 0.9); font-weight: 600; font-size: 0.9rem;">Tournament Format:</span>
          </div>
          <p style="margin: 0; color: rgba(255, 255, 255, 0.7); font-size: 0.85rem; line-height: 1.4;">
            <strong>Semi-Finals:</strong> Player 1 vs Player 2, Player 3 vs Player 4<br>
            <strong>Finals:</strong> Winners advance to championship match
          </p>
        </div>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
        <button type="button" id="cancel-tournament" class="secondary-button" style="padding: 1rem 1.5rem; border-radius: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Cancel</button>
        <button type="submit" class="primary-button" style="padding: 1rem 1.5rem; border-radius: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; background: linear-gradient(135deg, #00e6ff, #ff00ff);">
          <i class="fas fa-trophy"></i> Start Tournament
        </button>
      </div>
    </form>
  `,e.appendChild(t),document.body.appendChild(e);const a=e.querySelector("#create-tournament-form");e.querySelector("#cancel-tournament").addEventListener("click",()=>{document.body.removeChild(e)}),e.addEventListener("click",n=>{n.target===e&&document.body.removeChild(e)}),a.addEventListener("submit",async n=>{n.preventDefault();const o=e.querySelector("#tournament-name"),i=e.querySelector("#player1"),r=e.querySelector("#player2"),l=e.querySelector("#player3"),c=e.querySelector("#player4"),m=o.value.trim(),d=i.value.trim(),p=r.value.trim(),g=l.value.trim(),u=c.value.trim();if(!m||!d||!p||!g||!u){y("Please fill in all fields.","error");return}const v=[d,p,g,u];if(new Set(v).size!==4){y("All player names must be unique.","error");return}ne();try{await new Promise(E=>setTimeout(E,1e3));const C={id:Date.now(),name:m,players:[d,p,g,u],createdBy:(P==null?void 0:P.username)||"Unknown",createdDate:new Date().toISOString().split("T")[0],status:"active",bracket:{semifinals:[{player1:d,player2:p,winner:null},{player1:g,player2:u,winner:null}],finals:{player1:null,player2:null,winner:null}}},b=JSON.parse(localStorage.getItem("tournaments")||"[]");b.push(C),localStorage.setItem("tournaments",JSON.stringify(b)),document.body.removeChild(e),y(`Tournament "${m}" created successfully! 🏆`,"success"),oe(C)}catch{y("Error creating tournament. Please try again.","error")}finally{se()}})}function oe(e){const t=document.getElementById("app");t&&(t.innerHTML=`
    <div class="tournament-bracket-page">
      <div class="tournament-header">
        <div class="back-button" onclick="navigateTo('/tournament')">
          <i class="fas fa-arrow-left"></i> Back to Tournaments
        </div>
        <h1 class="tournament-title">${e.name}</h1>
        <div class="tournament-meta">
          <span>Created by: ${e.createdBy}</span>
          <span>Date: ${e.createdDate}</span>
        </div>
      </div>
      
      <div class="bracket-container">
        <div class="bracket-round">
          <h2 class="round-title">Semi-Finals</h2>
          
          <div class="match-container">
            <div class="match" id="match-1">
              <div class="match-header">Match 1 - Semi-Final</div>
              <div class="players">
                <div class="player ${e.bracket.semifinals[0].winner===e.bracket.semifinals[0].player1?"winner":""}" data-player="${e.bracket.semifinals[0].player1}">
                  ${e.bracket.semifinals[0].player1}
                </div>
                <div class="vs">VS</div>
                <div class="player ${e.bracket.semifinals[0].winner===e.bracket.semifinals[0].player2?"winner":""}" data-player="${e.bracket.semifinals[0].player2}">
                  ${e.bracket.semifinals[0].player2}
                </div>
              </div>
              ${e.bracket.semifinals[0].winner?`
                <div class="winner-announcement">
                  <i class="fas fa-trophy"></i>
                  Winner: ${e.bracket.semifinals[0].winner}
                </div>
              `:`
                <div class="match-actions">
                  <button class="start-match-btn" onclick="startMatch(0, '${e.bracket.semifinals[0].player1}', '${e.bracket.semifinals[0].player2}')">
                    <i class="fas fa-play"></i> Start Match 1
                  </button>
                </div>
              `}
            </div>
            
            <div class="match ${e.bracket.semifinals[0].winner?"":"match-locked"}" id="match-2">
              <div class="match-header">
                Match 2 - Semi-Final
                ${e.bracket.semifinals[0].winner?"":'<span class="locked-indicator"><i class="fas fa-lock"></i> Locked</span>'}
              </div>
              <div class="players">
                <div class="player ${e.bracket.semifinals[1].winner===e.bracket.semifinals[1].player1?"winner":""}" data-player="${e.bracket.semifinals[1].player1}">
                  ${e.bracket.semifinals[1].player1}
                </div>
                <div class="vs">VS</div>
                <div class="player ${e.bracket.semifinals[1].winner===e.bracket.semifinals[1].player2?"winner":""}" data-player="${e.bracket.semifinals[1].player2}">
                  ${e.bracket.semifinals[1].player2}
                </div>
              </div>
              ${e.bracket.semifinals[1].winner?`
                <div class="winner-announcement">
                  <i class="fas fa-trophy"></i>
                  Winner: ${e.bracket.semifinals[1].winner}
                </div>
              `:`
                <div class="match-actions">
                  ${e.bracket.semifinals[0].winner?`
                    <button class="start-match-btn" onclick="startMatch(1, '${e.bracket.semifinals[1].player1}', '${e.bracket.semifinals[1].player2}')">
                      <i class="fas fa-play"></i> Start Match 2
                    </button>
                  `:`
                    <button class="start-match-btn locked-btn" disabled>
                      <i class="fas fa-lock"></i> Waiting for Match 1
                    </button>
                    <p class="waiting-message">Match 1 must finish first</p>
                  `}
                </div>
              `}
            </div>
          </div>
        </div>
        
        <div class="bracket-arrow">
          <i class="fas fa-arrow-right"></i>
        </div>
        
        <div class="bracket-round">
          <h2 class="round-title">Finals</h2>
          
          <div class="match-container">
            <div class="match finals-match" id="finals-match">
              <div class="match-header">Championship Finals</div>
              ${e.bracket.semifinals[0].winner&&e.bracket.semifinals[1].winner?`
                <div class="players">
                  <div class="player ${e.bracket.finals.winner===e.bracket.semifinals[0].winner?"winner":""}" data-player="${e.bracket.semifinals[0].winner}">
                    ${e.bracket.semifinals[0].winner}
                  </div>
                  <div class="vs">VS</div>
                  <div class="player ${e.bracket.finals.winner===e.bracket.semifinals[1].winner?"winner":""}" data-player="${e.bracket.semifinals[1].winner}">
                    ${e.bracket.semifinals[1].winner}
                  </div>
                </div>
                ${e.bracket.finals.winner?`
                  <div class="champion-announcement">
                    <i class="fas fa-crown"></i>
                    <span>Tournament Champion:</span>
                    <div class="champion-name">${e.bracket.finals.winner}</div>
                  </div>
                `:`
                  <div class="match-actions">
                    <button class="start-match-btn" onclick="startFinalsMatch('${e.bracket.semifinals[0].winner}', '${e.bracket.semifinals[1].winner}')">
                      <i class="fas fa-crown"></i> Start Finals
                    </button>
                  </div>
                `}
              `:`
                <div class="waiting-players">
                  <div class="waiting-text">Waiting for semi-final winners...</div>
                  <div class="vs">VS</div>
                  <div class="waiting-text">Waiting for semi-final winners...</div>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,window.currentTournament=e)}window.startMatch=function(e,t,a){y(`Starting match: ${t} vs ${a}`,"info");const s=document.createElement("div");s.className="modal-overlay",s.style.cssText=`
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
  `,s.innerHTML=`
    <div class="modal-content" style="background: linear-gradient(135deg, rgba(15, 18, 40, 0.95), rgba(8, 10, 28, 0.98)); backdrop-filter: blur(20px); border: 2px solid rgba(0, 230, 255, 0.3); border-radius: 16px; padding: 2rem; max-width: 500px; width: 90%; text-align: center;">
      <h2 style="color: #00e6ff; margin-bottom: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
        <i class="fas fa-play"></i> Semi-Final Match
      </h2>
      <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem; font-size: 1.1rem;">
        Who won the match?
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
        <button class="winner-btn" onclick="declareWinner(${e}, '${t}')" style="flex: 1; padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #00e6ff, #0099cc); border: none; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;">
          ${t}
        </button>
        <button class="winner-btn" onclick="declareWinner(${e}, '${a}')" style="flex: 1; padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #ff00ff, #cc0099); border: none; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;">
          ${a}
        </button>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="padding: 0.8rem 1.5rem; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 8px; color: rgba(255, 255, 255, 0.8); cursor: pointer;">
        Cancel
      </button>
    </div>
  `,document.body.appendChild(s)};window.declareWinner=function(e,t){const a=window.currentTournament;a.bracket.semifinals[e].winner=t;const s=JSON.parse(localStorage.getItem("tournaments")||"[]"),n=s.findIndex(i=>i.id===a.id);n!==-1&&(s[n]=a,localStorage.setItem("tournaments",JSON.stringify(s)));const o=document.querySelector(".modal-overlay");o&&o.remove(),oe(a),y(e===0?`🏆 ${t} wins Match 1! Match 2 is now unlocked! 🎉`:`🏆 ${t} wins Match 2! Both semi-finals complete! 🎉`,"success")};window.startFinalsMatch=function(e,t){y(`Starting Finals: ${e} vs ${t}`,"info");const a=document.createElement("div");a.className="modal-overlay",a.style.cssText=`
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
  `,a.innerHTML=`
    <div class="modal-content" style="background: linear-gradient(135deg, rgba(15, 18, 40, 0.95), rgba(8, 10, 28, 0.98)); backdrop-filter: blur(20px); border: 2px solid rgba(255, 215, 0, 0.3); border-radius: 16px; padding: 2rem; max-width: 500px; width: 90%; text-align: center;">
      <h2 style="color: #ffd700; margin-bottom: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
        <i class="fas fa-crown"></i> Championship Finals
      </h2>
      <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem; font-size: 1.1rem;">
        Who is the Tournament Champion?
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
        <button class="winner-btn" onclick="declareChampion('${e}')" style="flex: 1; padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #00e6ff, #0099cc); border: none; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;">
          ${e}
        </button>
        <button class="winner-btn" onclick="declareChampion('${t}')" style="flex: 1; padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #ff00ff, #cc0099); border: none; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;">
          ${t}
        </button>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="padding: 0.8rem 1.5rem; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 8px; color: rgba(255, 255, 255, 0.8); cursor: pointer;">
        Cancel
      </button>
    </div>
  `,document.body.appendChild(a)};window.declareChampion=function(e){const t=window.currentTournament;t.bracket.finals.winner=e,t.status="completed";const a=JSON.parse(localStorage.getItem("tournaments")||"[]"),s=a.findIndex(o=>o.id===t.id);s!==-1&&(a[s]=t,localStorage.setItem("tournaments",JSON.stringify(a)));const n=document.querySelector(".modal-overlay");n&&n.remove(),oe(t),y(`🏆 ${e} is the Tournament Champion! 🏆`,"success")};function B(e){const t=window.location.pathname;e.innerHTML="";let a=document.getElementById("screen-reader-live-region");a||(a=document.createElement("div"),a.id="screen-reader-live-region",a.setAttribute("aria-live","polite"),a.setAttribute("aria-atomic","true"),a.className="hidden-visually",document.body.appendChild(a));const n={"/":me,"/login":()=>ae(!0),"/register":()=>ae(!1),"/tournament":Ne,"/profile":Se,"/ACCOUNT":()=>ae(!0),"/logout":()=>(fe(),me())}[t],o=document.createElement("div");if(o.className="page-content-wrapper",e.appendChild(o),n)o.appendChild(n()),document.title=pe(t);else{const i=document.createElement("div");i.className="page content-section",i.id="not-found",i.setAttribute("role","main"),i.innerHTML='<h1 class="section-title">404 - Page Not Found</h1><p style="text-align:center; color: var(--text-color-light);">The page you are looking for does not exist.</p>';const r=document.createElement("button");r.className="primary-button back-button",r.textContent="Go to Home",r.addEventListener("click",()=>A("/")),i.appendChild(r),i.appendChild(J()),o.appendChild(i),document.title="404 - Page Not Found - Neon Pong"}document.querySelectorAll(".navbar-link").forEach(i=>{i.classList.remove("active");const r=i.getAttribute("href"),l=window.location.pathname;(r===l||r==="/"&&l==="/")&&i.classList.add("active"),(l==="/tournament"&&r==="/tournament"||l==="/register"&&r==="/register")&&i.classList.add("active")})}document.addEventListener("DOMContentLoaded",async()=>{console.log("[App] DOM fully loaded, initializing application..."),console.log("[App] Initializing translation system..."),T.addListener(()=>{W()}),console.log("[App] Finding app container...");const e=document.getElementById("app");if(!e){console.error("[App] Failed to find #app element");return}console.log("[App] Creating navigation bar...");const t=Ae();if(document.body.insertBefore(t,e),console.log("[App] Checking login state..."),we(),!document.getElementById("loading-overlay")){const a=ue();document.body.appendChild(a)}console.log("[App] Setting up routes..."),B(e),window.addEventListener("popstate",()=>{B(e)}),(window.location.pathname==="/"||window.location.pathname==="")&&A("/"),console.log("[App] Initialization complete")});window.addEventListener("popstate",()=>{const e=document.getElementById("app");e&&B(e)});window.switchTab=ie;
