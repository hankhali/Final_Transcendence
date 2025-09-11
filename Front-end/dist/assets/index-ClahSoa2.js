var fe=Object.defineProperty;var ve=(t,e,a)=>e in t?fe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var w=(t,e,a)=>ve(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();const W={en:{nav:{home:"HOME",games:"GAMES",logout:"LOGOUT",profile:"PROFILE",account:"ACCOUNT"},language:{confirmTitle:"Language Preference",confirmMessage:"Would you like to set English as your preferred language?",yes:"Yes, set as preferred",no:"Cancel",setSuccess:"Language preference saved!"},fontControls:{label:"Font size:",decrease:"DECREASE FONT SIZE",increase:"INCREASE FONT SIZE"},home:{title:"NEON PONG",tagline:"THE ULTIMATE RETRO-FUTURISTIC ARCADE EXPERIENCE.",description:"Challenge your friends in a fast-paced game of skill and reflexes.",registerNow:"REGISTER NOW",meetTheTeam:"MEET THE TEAM"},games:{title:"Games",subtitle:"Choose your battle",back:"Back",oneVsOne:{title:"1v1 Battle",subtitle:"Face your opponent",description:"Challenge a friend or random player to an intense one-on-one ping pong match. Quick games, instant action!",features:{instant:"Instant matchmaking",ranked:"Ranked competitive play",skill:"Skill-based matching"},playNow:"PLAY NOW",findMatch:"FIND MATCH"},ai:{title:"AI Challenge",subtitle:"Face the machine",description:"Test your skills against our advanced AI opponents with different difficulty levels.",features:{adaptive:"Adaptive difficulty",practice:"Perfect for practice",skills:"Improve your skills"},playNow:"PLAY AI"},tournaments:{title:"TOURNAMENTS",subtitle:"Elite competition awaits",description:"Join exclusive tournaments and compete against the best players for ultimate glory.",features:{strategic:"Strategic bracket system",prestige:"Prestige rewards",competition:"Elite competition"},joinTournament:"JOIN TOURNAMENT",createTournament:"CREATE TOURNAMENT"},stats:{activePlayers:"ACTIVE PLAYERS",ongoingMatches:"ONGOING MATCHES",tournaments:"LIVE TOURNAMENTS"},loginRequired:{title:"Access Required",description:"Login to unlock all game modes and compete with players worldwide",button:"LOGIN TO PLAY"}},profile:{title:"USER PROFILE",tabs:{dashboard:"DASHBOARD",settings:"PROFILE SETTINGS",statistics:"STATISTICS",friends:"FRIENDS",history:"MATCH HISTORY"},dashboard:{welcome:"WELCOME BACK, PRO PLAYER!",overview:"Here's your gaming overview and performance insights",rank:"Current Rank",of:"of",players:"players",winRate:"Win Rate",streak:"Current Streak",best:"Best:",playTime:"Total Play Time",avg:"Avg:",analytics:"PERFORMANCE ANALYTICS",weekly:"Weekly Performance",wins:"Wins",losses:"Losses",rating:"Skill Rating Progression",recent:"Recent Matches",viewAll:"VIEW ALL MATCHES",advanced:"Advanced Statistics",avgScore:"AVERAGE SCORE",perfectGames:"PERFECT GAMES",comebacks:"COMEBACKS",preferredMode:"PREFERRED MODE",achievements:"ACHIEVEMENTS & GOALS",winStreakMaster:"Win Streak Master",winStreakDesc:"Win 10 games in a row",centuryClub:"Century Club",centuryDesc:"Play 100 total games",perfectPlayer:"Perfect Player",perfectDesc:"Win a game 21-0",socialButterfly:"Social Butterfly",socialDesc:"Add 10 friends"},settings:{changeAvatar:"CHANGE AVATAR",username:"USERNAME",displayName:"DISPLAY NAME",skillLevel:"SKILL LEVEL",beginner:"BEGINNER",intermediate:"INTERMEDIATE",expert:"EXPERT",bio:"BIO (OPTIONAL)",bioPlaceholder:"Tell others about yourself...",advancedSettings:"ADVANCED SETTINGS",newPassword:"New Password",passwordPlaceholder:"Leave blank to keep current",confirmPassword:"Confirm Password",confirmPasswordPlaceholder:"Confirm your new password",gameHistory:"GAME HISTORY",clearHistory:"Clear History",accountDeletion:"ACCOUNT DELETION",deleteAccount:"Delete Account",deleteWarning:"⚠️ This action cannot be undone",warningTitle:"Warning: Permanent Action",warningDescription:"Once you delete your profile, there is no going back. This action cannot be undone and will permanently remove:",saveChanges:"SAVE CHANGES"},statistics:{title:"PLAYER STATISTICS",gamesPlayed:"GAMES PLAYED",wins:"WINS",losses:"LOSSES",winRate:"WIN RATE"},friends:{title:"FRIENDS LIST",addFriend:"ADD FRIEND",online:"Online",lastSeen:"Last seen",challenge:"CHALLENGE"},history:{title:"MATCH HISTORY",victory:"Victory",defeat:"Defeat",match1v1:"1v1 Match",tournament:"Tournament",min:"min"}},auth:{login:{title:"Login to Neon Pong",username:"USERNAME",password:"PASSWORD",button:"LOGIN",backToHome:"BACK TO HOME",noAccount:"Don't have an account?",createAccount:"Create an ACCOUNT"},register:{title:"Register for Neon Pong",email:"EMAIL",username:"USERNAME",password:"PASSWORD",confirmPassword:"CONFIRM PASSWORD",button:"REGISTER",backToHome:"BACK TO HOME",hasAccount:"Already have an account?",signIn:"Sign in to existing ACCOUNT"}},common:{loading:"Loading...",neonPong:"Neon Pong"},languages:{english:"English",french:"Français",spanish:"Español"}},fr:{nav:{home:"ACCUEIL",games:"JEUX",logout:"DÉCONNEXION",profile:"PROFIL",account:"COMPTE"},language:{confirmTitle:"Préférence de langue",confirmMessage:"Voulez-vous définir le français comme votre langue préférée ?",yes:"Oui, définir comme préférée",no:"Annuler",setSuccess:"Préférence de langue sauvegardée !"},fontControls:{label:"Taille de police:",decrease:"DIMINUER LA TAILLE",increase:"AUGMENTER LA TAILLE"},home:{title:"NEON PONG",tagline:"L'EXPÉRIENCE ARCADE RÉTRO-FUTURISTE ULTIME.",description:"Défiez vos amis dans un jeu rapide d'adresse et de réflexes.",registerNow:"S'INSCRIRE MAINTENANT",meetTheTeam:"RENCONTRER L'ÉQUIPE"},games:{title:"MODES DE JEU",subtitle:"Choisissez votre chemin vers la gloire",back:"Retour",oneVsOne:{title:"COMBATS 1V1",subtitle:"Matchs rapides, action instantanée",description:"Lancez-vous dans des combats un contre un à rythme effréné. Perfectionnez vos compétences et grimpez l'échelle classée.",features:{instant:"Matchmaking instantané",ranked:"Progression classée",skill:"Correspondance par compétence"},playNow:"JOUER MAINTENANT",findMatch:"TROUVER UN MATCH"},ai:{title:"Défi IA",subtitle:"Affrontez la machine",description:"Testez vos compétences contre nos adversaires IA avancés avec différents niveaux de difficulté.",features:{adaptive:"Difficulté adaptative",practice:"Parfait pour s'entraîner",skills:"Améliorez vos compétences"},playNow:"JOUER CONTRE IA"},tournaments:{title:"TOURNOIS",subtitle:"La compétition d'élite vous attend",description:"Rejoignez des tournois exclusifs et affrontez les meilleurs joueurs pour la gloire ultime.",features:{strategic:"Système de bracket stratégique",prestige:"Récompenses de prestige",competition:"Compétition d'élite"},joinTournament:"REJOINDRE TOURNOI",createTournament:"CRÉER TOURNOI"},stats:{activePlayers:"JOUEURS ACTIFS",ongoingMatches:"MATCHS EN COURS",tournaments:"TOURNOIS EN DIRECT"},loginRequired:{title:"Accès Requis",description:"Connectez-vous pour débloquer tous les modes de jeu et affronter des joueurs du monde entier",button:"SE CONNECTER POUR JOUER"}},profile:{title:"PROFIL UTILISATEUR",tabs:{dashboard:"TABLEAU DE BORD",settings:"PARAMÈTRES DU PROFIL",statistics:"STATISTIQUES",friends:"AMIS",history:"HISTORIQUE DES MATCHS"},dashboard:{welcome:"BON RETOUR, JOUEUR PRO !",overview:"Voici votre aperçu de jeu et vos informations de performance",rank:"Rang Actuel",of:"sur",players:"joueurs",winRate:"Taux de Victoire",streak:"Série Actuelle",best:"Meilleur:",playTime:"Temps de Jeu Total",avg:"Moy:",analytics:"ANALYSES DE PERFORMANCE",weekly:"Performance Hebdomadaire",wins:"Victoires",losses:"Défaites",rating:"Progression du Classement",recent:"Matchs Récents",viewAll:"VOIR TOUS LES MATCHS",advanced:"Statistiques Avancées",avgScore:"SCORE MOYEN",perfectGames:"JEUX PARFAITS",comebacks:"RETOURS",preferredMode:"MODE PRÉFÉRÉ",achievements:"SUCCÈS ET OBJECTIFS",winStreakMaster:"Maître des Séries",winStreakDesc:"Gagner 10 jeux d'affilée",centuryClub:"Club du Centenaire",centuryDesc:"Jouer 100 jeux au total",perfectPlayer:"Joueur Parfait",perfectDesc:"Gagner un jeu 21-0",socialButterfly:"Papillon Social",socialDesc:"Ajouter 10 amis"},settings:{changeAvatar:"CHANGER L'AVATAR",username:"NOM D'UTILISATEUR",displayName:"NOM D'AFFICHAGE",skillLevel:"NIVEAU DE COMPÉTENCE",beginner:"DÉBUTANT",intermediate:"INTERMÉDIAIRE",expert:"EXPERT",bio:"BIO (OPTIONNEL)",bioPlaceholder:"Parlez de vous aux autres...",advancedSettings:"PARAMÈTRES AVANCÉS",newPassword:"Nouveau mot de passe",passwordPlaceholder:"Laisser vide pour conserver l'actuel",confirmPassword:"Confirmer le mot de passe",confirmPasswordPlaceholder:"Confirmez votre nouveau mot de passe",gameHistory:"HISTORIQUE DU JEU",clearHistory:"Effacer l'historique",accountDeletion:"SUPPRESSION DU COMPTE",deleteAccount:"Supprimer le compte",deleteWarning:"⚠️ Cette action ne peut pas être annulée",warningTitle:"Attention : Action permanente",warningDescription:"Une fois que vous supprimez votre profil, il n'y a pas de retour en arrière. Cette action ne peut pas être annulée et supprimera définitivement :",saveChanges:"SAUVEGARDER LES MODIFICATIONS"},statistics:{title:"STATISTIQUES DU JOUEUR",gamesPlayed:"JEUX JOUÉS",wins:"VICTOIRES",losses:"DÉFAITES",winRate:"TAUX DE VICTOIRE"},friends:{title:"LISTE D'AMIS",addFriend:"AJOUTER UN AMI",online:"En ligne",lastSeen:"Vu pour la dernière fois",challenge:"DÉFIER"},history:{title:"HISTORIQUE DES MATCHS",victory:"Victoire",defeat:"Défaite",match1v1:"Match 1v1",tournament:"Tournoi",min:"min"}},auth:{login:{title:"Connexion à Neon Pong",username:"NOM D'UTILISATEUR",password:"MOT DE PASSE",button:"CONNEXION",backToHome:"RETOUR À L'ACCUEIL",noAccount:"Vous n'avez pas de compte ?",createAccount:"Créer un COMPTE"},register:{title:"S'inscrire à Neon Pong",email:"EMAIL",username:"NOM D'UTILISATEUR",password:"MOT DE PASSE",confirmPassword:"CONFIRMER LE MOT DE PASSE",button:"S'INSCRIRE",backToHome:"RETOUR À L'ACCUEIL",hasAccount:"Vous avez déjà un compte ?",signIn:"Se connecter au COMPTE existant"}},common:{loading:"Chargement...",neonPong:"Neon Pong"},languages:{english:"English",french:"Français",spanish:"Español"}},es:{nav:{home:"INICIO",games:"JUEGOS",logout:"CERRAR SESIÓN",profile:"PERFIL",account:"CUENTA"},language:{confirmTitle:"Preferencia de idioma",confirmMessage:"¿Te gustaría establecer el español como tu idioma preferido?",yes:"Sí, establecer como preferido",no:"Cancelar",setSuccess:"¡Preferencia de idioma guardada!"},fontControls:{label:"Tamaño de fuente:",decrease:"DISMINUIR TAMAÑO",increase:"AUMENTAR TAMAÑO"},home:{title:"NEON PONG",tagline:"LA EXPERIENCIA ARCADE RETRO-FUTURISTA DEFINITIVA.",description:"Desafía a tus amigos en un juego rápido de habilidad y reflejos.",registerNow:"REGISTRARSE AHORA",meetTheTeam:"CONOCER AL EQUIPO"},games:{title:"MODOS DE JUEGO",subtitle:"Elige tu camino hacia la gloria",back:"Volver",oneVsOne:{title:"BATALLAS 1V1",subtitle:"Partidas rápidas, acción instantánea",description:"Sumérgete en batallas uno contra uno de ritmo acelerado. Perfecciona tus habilidades y escala la clasificación.",features:{instant:"Emparejamiento instantáneo",ranked:"Progresión clasificada",skill:"Emparejamiento por habilidad"},playNow:"JUGAR AHORA",findMatch:"BUSCAR PARTIDA"},ai:{title:"Desafío IA",subtitle:"Enfrenta a la máquina",description:"Pon a prueba tus habilidades contra nuestros oponentes IA avanzados con diferentes niveles de dificultad.",features:{adaptive:"Dificultad adaptativa",practice:"Perfecto para practicar",skills:"Mejora tus habilidades"},playNow:"JUGAR CONTRA IA"},tournaments:{title:"TORNEOS",subtitle:"La competencia élite te espera",description:"Únete a torneos exclusivos y compite contra los mejores jugadores por la gloria definitiva.",features:{strategic:"Sistema de bracket estratégico",prestige:"Recompensas de prestigio",competition:"Competencia élite"},joinTournament:"UNIRSE A TORNEO",createTournament:"CREAR TORNEO"},stats:{activePlayers:"JUGADORES ACTIVOS",ongoingMatches:"PARTIDAS EN CURSO",tournaments:"TORNEOS EN VIVO"},loginRequired:{title:"Acceso Requerido",description:"Inicia sesión para desbloquear todos los modos de juego y competir con jugadores de todo el mundo",button:"INICIAR SESIÓN PARA JUGAR"}},profile:{title:"PERFIL DE USUARIO",tabs:{dashboard:"PANEL DE CONTROL",settings:"CONFIGURACIÓN DEL PERFIL",statistics:"ESTADÍSTICAS",friends:"AMIGOS",history:"HISTORIAL DE PARTIDAS"},dashboard:{welcome:"¡BIENVENIDO DE VUELTA, JUGADOR PRO!",overview:"Aquí está tu resumen de juego e información de rendimiento",rank:"Rango Actual",of:"de",players:"jugadores",winRate:"Tasa de Victoria",streak:"Racha Actual",best:"Mejor:",playTime:"Tiempo Total de Juego",avg:"Prom:",analytics:"ANÁLISIS DE RENDIMIENTO",weekly:"Rendimiento Semanal",wins:"Victorias",losses:"Derrotas",rating:"Progresión de Clasificación",recent:"Partidas Recientes",viewAll:"VER TODAS LAS PARTIDAS",advanced:"Estadísticas Avanzadas",avgScore:"PUNTUACIÓN PROMEDIO",perfectGames:"JUEGOS PERFECTOS",comebacks:"REMONTAS",preferredMode:"MODO PREFERIDO",achievements:"LOGROS Y OBJETIVOS",winStreakMaster:"Maestro de Rachas",winStreakDesc:"Ganar 10 juegos seguidos",centuryClub:"Club del Centenario",centuryDesc:"Jugar 100 juegos en total",perfectPlayer:"Jugador Perfecto",perfectDesc:"Ganar un juego 21-0",socialButterfly:"Mariposa Social",socialDesc:"Agregar 10 amigos"},settings:{changeAvatar:"CAMBIAR AVATAR",username:"NOMBRE DE USUARIO",displayName:"NOMBRE PARA MOSTRAR",skillLevel:"NIVEL DE HABILIDAD",beginner:"PRINCIPIANTE",intermediate:"INTERMEDIO",expert:"EXPERTO",bio:"BIO (OPCIONAL)",bioPlaceholder:"Cuéntales a otros sobre ti...",advancedSettings:"CONFIGURACIÓN AVANZADA",newPassword:"Nueva contraseña",passwordPlaceholder:"Dejar en blanco para mantener la actual",confirmPassword:"Confirmar contraseña",confirmPasswordPlaceholder:"Confirma tu nueva contraseña",gameHistory:"HISTORIAL DEL JUEGO",clearHistory:"Borrar historial",accountDeletion:"ELIMINACIÓN DE CUENTA",deleteAccount:"Eliminar cuenta",deleteWarning:"⚠️ Esta acción no se puede deshacer",warningTitle:"Advertencia: Acción permanente",warningDescription:"Una vez que elimines tu perfil, no hay vuelta atrás. Esta acción no se puede deshacer y eliminará permanentemente:",saveChanges:"GUARDAR CAMBIOS"},statistics:{title:"ESTADÍSTICAS DEL JUGADOR",gamesPlayed:"JUEGOS JUGADOS",wins:"VICTORIAS",losses:"DERROTAS",winRate:"TASA DE VICTORIA"},friends:{title:"LISTA DE AMIGOS",addFriend:"AGREGAR AMIGO",online:"En línea",lastSeen:"Visto por última vez",challenge:"DESAFIAR"},history:{title:"HISTORIAL DE PARTIDAS",victory:"Victoria",defeat:"Derrota",match1v1:"Partida 1v1",tournament:"Torneo",min:"min"}},auth:{login:{title:"Iniciar Sesión en Neon Pong",username:"NOMBRE DE USUARIO",password:"CONTRASEÑA",button:"INICIAR SESIÓN",backToHome:"VOLVER AL INICIO",noAccount:"¿No tienes una cuenta?",createAccount:"Crear una CUENTA"},register:{title:"Registrarse en Neon Pong",email:"EMAIL",username:"NOMBRE DE USUARIO",password:"CONTRASEÑA",confirmPassword:"CONFIRMAR CONTRASEÑA",button:"REGISTRARSE",backToHome:"VOLVER AL INICIO",hasAccount:"¿Ya tienes una cuenta?",signIn:"Iniciar sesión en CUENTA existente"}},common:{loading:"Cargando...",neonPong:"Neon Pong"},languages:{english:"English",french:"Français",spanish:"Español"}}};class be{constructor(){w(this,"currentLanguage","en");w(this,"listeners",[]);const e=localStorage.getItem("neonPongLanguage");e&&W[e]&&(this.currentLanguage=e)}getCurrentLanguage(){return this.currentLanguage}setLanguage(e){W[e]&&(this.currentLanguage=e,localStorage.setItem("neonPongLanguage",e),this.notifyListeners())}setLanguageWithConfirmation(e){if(!W[e])return;const a=W[e],n=document.createElement("div");n.className="language-confirm-dialog",n.innerHTML=`
      <div class="language-confirm-overlay">
        <div class="language-confirm-content">
          <div class="language-confirm-header">
            <h3>${a.language.confirmTitle}</h3>
          </div>
          <div class="language-confirm-message">
            <p>${a.language.confirmMessage}</p>
          </div>
          <div class="language-confirm-buttons">
            <button class="language-confirm-yes btn-primary">
              ${a.language.yes}
            </button>
            <button class="language-confirm-no btn-secondary">
              ${a.language.no}
            </button>
          </div>
        </div>
      </div>
    `;const s=document.createElement("style");s.textContent=`
      .language-confirm-dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        font-family: 'Orbitron', monospace;
      }
      
      .language-confirm-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
      }
      
      .language-confirm-content {
        background: linear-gradient(135deg, rgba(0, 230, 255, 0.1), rgba(255, 0, 255, 0.1));
        border: 2px solid #00E6FF;
        border-radius: 15px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 230, 255, 0.3);
        animation: slideUp 0.3s ease-out;
      }
      
      .language-confirm-header h3 {
        color: #00E6FF;
        margin: 0 0 20px 0;
        font-size: 1.4rem;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 2px;
      }
      
      .language-confirm-message p {
        color: #fff;
        margin: 0 0 30px 0;
        font-size: 1.1rem;
        text-align: center;
        line-height: 1.6;
      }
      
      .language-confirm-buttons {
        display: flex;
        gap: 15px;
        justify-content: center;
      }
      
      .language-confirm-buttons button {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-family: 'Orbitron', monospace;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .language-confirm-yes {
        background: linear-gradient(135deg, #00E6FF, #0099CC);
        color: #000;
      }
      
      .language-confirm-yes:hover {
        background: linear-gradient(135deg, #00CCFF, #0088BB);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 230, 255, 0.4);
      }
      
      .language-confirm-no {
        background: linear-gradient(135deg, #FF0080, #CC0066);
        color: #fff;
      }
      
      .language-confirm-no:hover {
        background: linear-gradient(135deg, #FF0099, #DD0077);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 0, 128, 0.4);
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from { 
          opacity: 0;
          transform: translateY(30px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,document.head.appendChild(s),document.body.appendChild(n);const o=n.querySelector(".language-confirm-yes"),i=n.querySelector(".language-confirm-no"),r=()=>{document.body.removeChild(n),document.head.removeChild(s)};o.addEventListener("click",()=>{this.setLanguage(e),r(),window.showMessage&&setTimeout(()=>{window.showMessage(a.language.setSuccess,"success")},100)}),i.addEventListener("click",r),n.addEventListener("click",c=>{(c.target===n||c.target===n.querySelector(".language-confirm-overlay"))&&r()});const l=c=>{c.key==="Escape"&&(r(),document.removeEventListener("keydown",l))};document.addEventListener("keydown",l)}getTranslations(){return W[this.currentLanguage]}translate(e){const a=e.split(".");let n=this.getTranslations();for(const s of a)n=n==null?void 0:n[s];return n||e}addListener(e){this.listeners.push(e)}removeListener(e){this.listeners=this.listeners.filter(a=>a!==e)}notifyListeners(){this.listeners.forEach(e=>e())}}const y=new be;function ye(t={}){var le;const e=y.getTranslations(),a=document.createElement("div");a.className="profile-settings";const n={username:"",displayName:"",skillLevel:"beginner",bio:"",...t},s=document.createElement("form");s.className="profile-form",s.noValidate=!0;const o=document.createElement("div");o.className="form-section";const i=document.createElement("div");i.className="avatar-section";const r=document.createElement("label");r.className="form-label",r.textContent="Customize Avatar";const l=document.createElement("div");l.className="avatar-container";const c=document.createElement("div");c.className="avatar-preview-container";const m=document.createElement("div");m.className="avatar-preview",m.innerHTML=`
    <i class="fas fa-user-circle"></i>
  `;const d=document.createElement("div");d.className="avatar-upload",d.innerHTML='<i class="fas fa-camera"></i>';const p=document.createElement("input");p.type="file",p.accept="image/*",p.className="avatar-input",p.hidden=!0;const g=document.createElement("button");g.type="button",g.className="secondary-button",g.textContent=e.profile.settings.changeAvatar,g.style.marginTop="1rem",g.addEventListener("click",()=>p.click()),c.appendChild(m),c.appendChild(d),l.appendChild(c),l.appendChild(g),l.appendChild(p),i.appendChild(r),i.appendChild(l),o.appendChild(i);const h=q({label:e.profile.settings.username,name:"username",type:"text",value:n.username,required:!0,placeholder:"Enter your username"}),f=q({label:e.profile.settings.displayName,name:"displayName",type:"text",value:n.displayName,required:!0,placeholder:"Enter your display name"}),v=document.createElement("div");v.className="form-group";const C=document.createElement("label");C.className="form-label",C.textContent=e.profile.settings.skillLevel,C.htmlFor="skillLevel";const b=[{id:"beginner",label:e.profile.settings.beginner,emoji:"👶"},{id:"intermediate",label:e.profile.settings.intermediate,emoji:"💪"},{id:"expert",label:e.profile.settings.expert,emoji:"🏆"}],S=document.createElement("div");S.className="skill-level-options",b.forEach(({id:x,label:ee,emoji:B})=>{const z=`skill-${x}`,P=document.createElement("div");P.className="radio-option",P.dataset.level=x;const $=document.createElement("input");$.type="radio",$.id=z,$.name="skillLevel",$.value=x,$.checked=n.skillLevel===x;const F=document.createElement("label");F.htmlFor=z,F.dataset.level=x;const te=document.createElement("span");te.className="level-emoji",te.textContent=B;const ae=document.createElement("span");ae.className="level-text",ae.textContent=ee,F.appendChild(te),F.appendChild(document.createElement("br")),F.appendChild(ae),P.appendChild($),P.appendChild(F),S.appendChild(P)}),v.appendChild(C),v.appendChild(S);const k=q({name:"bio",type:"textarea",label:e.profile.settings.bio,placeholder:e.profile.settings.bioPlaceholder,value:n.bio||""}),L=document.createElement("div");L.className="settings-button-container",L.innerHTML=`
    <button type="button" class="settings-button advanced-toggle-button">
      <span class="button-icon"><i class="fas fa-sliders-h"></i></span>
      <span class="button-text">${e.profile.settings.advancedSettings}</span>
      <span class="button-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
  `;const N=document.createElement("div");N.className="advanced-content",N.style.display="none";const D=q({label:e.profile.settings.newPassword,name:"newPassword",type:"password",placeholder:e.profile.settings.passwordPlaceholder,autoComplete:"new-password"}),H=q({label:e.profile.settings.confirmPassword,name:"confirmPassword",type:"password",placeholder:e.profile.settings.confirmPasswordPlaceholder,autoComplete:"new-password"});N.appendChild(D),N.appendChild(H);const u=L.querySelector(".advanced-toggle-button"),T=L.querySelector(".fa-chevron-down");u==null||u.addEventListener("click",()=>{const x=N.style.display!=="none";N.style.display=x?"none":"block",T&&(T.className=x?"fas fa-chevron-down":"fas fa-chevron-up")});const M=document.createElement("div");M.className="settings-button-container",M.innerHTML=`
    <button type="submit" class="settings-button save-changes-button">
      <span class="button-icon"><i class="fas fa-save"></i></span>
      <span class="button-text">${e.profile.settings.saveChanges}</span>
      <span class="button-check"><i class="fas fa-check"></i></span>
    </button>
  `,s.appendChild(o),s.appendChild(h),s.appendChild(f),s.appendChild(v),s.appendChild(k),s.appendChild(L),s.appendChild(N);const Y=document.createElement("div");Y.className="settings-button-container",Y.innerHTML=`
    <button type="button" class="settings-button game-history-button">
      <span class="button-icon"><i class="fas fa-history"></i></span>
      <span class="button-text">${e.profile.settings.gameHistory}</span>
      <span class="button-arrow"><i class="fas fa-external-link-alt"></i></span>
    </button>
  `,(le=Y.querySelector("button"))==null||le.addEventListener("click",()=>{console.log("Game History clicked"),j("Game History feature coming soon!","info")}),s.appendChild(Y);const U=document.createElement("div");U.className="settings-button-container",U.innerHTML=`
    <button type="button" class="settings-button account-deletion-button">
      <span class="button-icon"><i class="fas fa-user-times"></i></span>
      <span class="button-text">${e.profile.settings.accountDeletion}</span>
      <span class="button-arrow"><i class="fas fa-chevron-down"></i></span>
    </button>
  `;const G=document.createElement("div");G.className="account-deletion-content",G.style.display="none",G.innerHTML=`
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
  `;const Q=U.querySelector(".account-deletion-button"),Z=U.querySelector(".button-arrow i");Q==null||Q.addEventListener("click",()=>{const x=G.style.display==="none";G.style.display=x?"block":"none",Z==null||Z.classList.toggle("rotated",x)});const _=G.querySelector(".delete-profile-btn");return _==null||_.addEventListener("click",()=>{Ee()}),s.appendChild(U),s.appendChild(G),s.appendChild(M),s.addEventListener("submit",async x=>{x.preventDefault();const ee=new FormData(s),B={};ee.forEach((P,$)=>{P&&(B[$]=P)});const z=s.querySelector('input[name="skillLevel"]:checked');z&&(B.skillLevel=z.value);try{console.log("Updating profile:",B),j("Profile updated successfully!","success")}catch(P){console.error("Error updating profile:",P),j("Failed to update profile. Please try again.","error")}}),a.appendChild(s),a}function q({label:t,name:e,type:a,value:n="",required:s=!1,placeholder:o="",autoComplete:i="",className:r=""}){const l=document.createElement("div");l.className=`form-group ${r}`.trim();const c=document.createElement("label");c.className="form-label",c.htmlFor=e,c.textContent=t;let m;if(a==="textarea"){const d=document.createElement("textarea");d.id=e,d.name=e,d.value=n,d.placeholder=o,d.required=s,d.rows=3,m=d}else{const d=document.createElement("input");d.type=a,d.id=e,d.name=e,d.value=n,d.placeholder=o,d.required=s,i&&(d.autocomplete=i),m=d}return m.className="form-input",l.appendChild(c),l.appendChild(m),l}function Ee(){const t=document.createElement("div");t.className="modal-overlay delete-profile-modal",t.innerHTML=`
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
  `;const e=t.querySelector("#delete-confirmation"),a=t.querySelector("#confirm-delete-btn");e.addEventListener("input",()=>{e.value.trim().toUpperCase()==="DELETE"?(a.disabled=!1,a.classList.add("enabled")):(a.disabled=!0,a.classList.remove("enabled"))}),a.addEventListener("click",async()=>{if(e.value.trim().toUpperCase()==="DELETE")try{a.innerHTML='<i class="fas fa-spinner fa-spin"></i> Deleting...',a.disabled=!0,await new Promise(n=>setTimeout(n,2e3)),console.log("Profile deletion confirmed"),t.remove(),j("Profile deleted successfully. Redirecting...","success"),setTimeout(()=>{window.location.href="/"},2e3)}catch(n){console.error("Error deleting profile:",n),j("Failed to delete profile. Please try again.","error"),a.innerHTML='<i class="fas fa-trash-alt"></i> Delete Profile Forever',a.disabled=!1}}),t.addEventListener("click",n=>{(n.target===t||n.target.classList.contains("modal-close"))&&t.remove()}),document.body.appendChild(t),setTimeout(()=>{e.focus()},100)}const j=window.showMessage;class pe{constructor(e,a){w(this,"canvas");w(this,"ctx");w(this,"config");w(this,"player1");w(this,"player2");w(this,"ball");w(this,"gameState");w(this,"keys",{});w(this,"animationId",null);w(this,"onGameEnd");w(this,"onScoreUpdate");this.canvas=e,this.ctx=e.getContext("2d"),this.config={canvasWidth:800,canvasHeight:400,paddleWidth:12,paddleHeight:80,ballSize:8,paddleSpeed:6,ballSpeed:4,maxScore:5,...a},this.canvas.width=this.config.canvasWidth,this.canvas.height=this.config.canvasHeight,this.player1={id:"player1",name:"Player 1",score:0,y:this.config.canvasHeight/2-this.config.paddleHeight/2},this.player2={id:"player2",name:"Player 2",score:0,y:this.config.canvasHeight/2-this.config.paddleHeight/2,isAI:!0},this.ball={x:this.config.canvasWidth/2,y:this.config.canvasHeight/2,velocityX:this.config.ballSpeed*(Math.random()>.5?1:-1),velocityY:this.config.ballSpeed*(Math.random()>.5?1:-1),speed:this.config.ballSpeed},this.gameState={isPlaying:!1,isPaused:!1,isGameOver:!1,winner:null,startTime:0,elapsedTime:0},this.setupEventListeners(),this.render()}startGame(){this.gameState.isPlaying=!0,this.gameState.isPaused=!1,this.gameState.isGameOver=!1,this.gameState.startTime=Date.now(),this.resetBall(),this.gameLoop()}pauseGame(){this.gameState.isPaused=!this.gameState.isPaused,this.gameState.isPaused||this.gameLoop()}resetGame(){this.gameState.isPlaying=!1,this.gameState.isPaused=!1,this.gameState.isGameOver=!1,this.gameState.winner=null,this.player1.score=0,this.player2.score=0,this.resetBall(),this.resetPaddles(),this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=null),this.render()}setPlayer2AI(e){this.player2.isAI=e}setPlayerNames(e,a){this.player1.name=e,this.player2.name=a}onGameEndCallback(e){this.onGameEnd=e}onScoreUpdateCallback(e){this.onScoreUpdate=e}getGameState(){return{...this.gameState}}getPlayers(){return{player1:{...this.player1},player2:{...this.player2}}}setupEventListeners(){document.addEventListener("keydown",e=>{this.keys[e.key.toLowerCase()]=!0,e.key===" "&&(e.preventDefault(),this.gameState.isPlaying?this.pauseGame():this.startGame()),(e.key==="r"||e.key==="R")&&this.resetGame()}),document.addEventListener("keyup",e=>{this.keys[e.key.toLowerCase()]=!1}),this.canvas.addEventListener("mousemove",e=>{if(!this.player2.isAI){const a=this.canvas.getBoundingClientRect(),n=e.clientY-a.top;this.player2.y=n-this.config.paddleHeight/2,this.clampPaddle(this.player2)}}),this.canvas.addEventListener("touchmove",e=>{if(e.preventDefault(),!this.player2.isAI&&e.touches.length>0){const a=this.canvas.getBoundingClientRect(),n=e.touches[0].clientY-a.top;this.player2.y=n-this.config.paddleHeight/2,this.clampPaddle(this.player2)}})}gameLoop(){!this.gameState.isPlaying||this.gameState.isPaused||this.gameState.isGameOver||(this.update(),this.render(),this.animationId=requestAnimationFrame(()=>this.gameLoop()))}update(){this.gameState.elapsedTime=Date.now()-this.gameState.startTime,this.updatePaddles(),this.updateBall(),this.checkScoring(),this.checkGameEnd()}updatePaddles(){(this.keys.w||this.keys.arrowup)&&(this.player1.y-=this.config.paddleSpeed),(this.keys.s||this.keys.arrowdown)&&(this.player1.y+=this.config.paddleSpeed),this.player2.isAI?this.updateAI():(this.keys.i&&(this.player2.y-=this.config.paddleSpeed),this.keys.k&&(this.player2.y+=this.config.paddleSpeed)),this.clampPaddle(this.player1),this.clampPaddle(this.player2)}updateAI(){const e=this.player2.y+this.config.paddleHeight/2,a=this.ball.y,n=this.config.paddleSpeed*.8;a<e-10?this.player2.y-=n:a>e+10&&(this.player2.y+=n)}clampPaddle(e){e.y=Math.max(0,Math.min(e.y,this.config.canvasHeight-this.config.paddleHeight))}updateBall(){this.ball.x+=this.ball.velocityX,this.ball.y+=this.ball.velocityY,(this.ball.y<=this.config.ballSize/2||this.ball.y>=this.config.canvasHeight-this.config.ballSize/2)&&(this.ball.velocityY=-this.ball.velocityY,this.ball.y=Math.max(this.config.ballSize/2,Math.min(this.ball.y,this.config.canvasHeight-this.config.ballSize/2))),this.checkPaddleCollision()}checkPaddleCollision(){const e=this.ball.x-this.config.ballSize/2,a=this.ball.x+this.config.ballSize/2,n=this.ball.y-this.config.ballSize/2,s=this.ball.y+this.config.ballSize/2,o=this.config.paddleWidth,i=this.config.paddleWidth+this.config.paddleWidth,r=this.player1.y,l=this.player1.y+this.config.paddleHeight;e<=i&&a>=o&&s>=r&&n<=l&&this.ball.velocityX<0&&(this.ball.velocityX=-this.ball.velocityX,this.ball.x=i+this.config.ballSize/2,this.addSpin());const c=this.config.canvasWidth-this.config.paddleWidth*2,m=this.config.canvasWidth-this.config.paddleWidth,d=this.player2.y,p=this.player2.y+this.config.paddleHeight;e<=m&&a>=c&&s>=d&&n<=p&&this.ball.velocityX>0&&(this.ball.velocityX=-this.ball.velocityX,this.ball.x=c-this.config.ballSize/2,this.addSpin())}addSpin(){this.ball.velocityX*=1.05,this.ball.velocityY*=1.05,this.ball.velocityY+=(Math.random()-.5)*.5}checkScoring(){var e,a;this.ball.x<0?(this.player2.score++,(e=this.onScoreUpdate)==null||e.call(this,this.player1.score,this.player2.score),this.resetBall(1)):this.ball.x>this.config.canvasWidth&&(this.player1.score++,(a=this.onScoreUpdate)==null||a.call(this,this.player1.score,this.player2.score),this.resetBall(-1))}checkGameEnd(){var e;(this.player1.score>=this.config.maxScore||this.player2.score>=this.config.maxScore)&&(this.gameState.isGameOver=!0,this.gameState.isPlaying=!1,this.gameState.winner=this.player1.score>=this.config.maxScore?this.player1:this.player2,this.animationId&&(cancelAnimationFrame(this.animationId),this.animationId=null),(e=this.onGameEnd)==null||e.call(this,this.gameState.winner,this.gameState.elapsedTime))}resetBall(e){this.ball.x=this.config.canvasWidth/2,this.ball.y=this.config.canvasHeight/2;const a=e||(Math.random()>.5?1:-1);this.ball.velocityX=this.config.ballSpeed*a,this.ball.velocityY=this.config.ballSpeed*(Math.random()>.5?1:-1)}resetPaddles(){this.player1.y=this.config.canvasHeight/2-this.config.paddleHeight/2,this.player2.y=this.config.canvasHeight/2-this.config.paddleHeight/2}render(){this.ctx.fillStyle="#080820",this.ctx.fillRect(0,0,this.config.canvasWidth,this.config.canvasHeight),this.drawBackground(),this.drawCenterLine(),this.drawPaddle(this.config.paddleWidth,this.player1.y),this.drawPaddle(this.config.canvasWidth-this.config.paddleWidth*2,this.player2.y),this.drawBall(),this.drawScores(),this.drawGameStateMessages()}drawBackground(){this.ctx.strokeStyle="rgba(0, 230, 255, 0.1)",this.ctx.lineWidth=1;for(let e=0;e<this.config.canvasWidth;e+=40)this.ctx.beginPath(),this.ctx.moveTo(e,0),this.ctx.lineTo(e,this.config.canvasHeight),this.ctx.stroke();for(let e=0;e<this.config.canvasHeight;e+=40)this.ctx.beginPath(),this.ctx.moveTo(0,e),this.ctx.lineTo(this.config.canvasWidth,e),this.ctx.stroke()}drawCenterLine(){this.ctx.strokeStyle="#00e6ff",this.ctx.lineWidth=2,this.ctx.setLineDash([10,10]),this.ctx.beginPath(),this.ctx.moveTo(this.config.canvasWidth/2,0),this.ctx.lineTo(this.config.canvasWidth/2,this.config.canvasHeight),this.ctx.stroke(),this.ctx.setLineDash([])}drawPaddle(e,a){this.ctx.shadowColor="#00e6ff",this.ctx.shadowBlur=20;const n=this.ctx.createLinearGradient(e,a,e+this.config.paddleWidth,a+this.config.paddleHeight);n.addColorStop(0,"#00e6ff"),n.addColorStop(.5,"#ffffff"),n.addColorStop(1,"#00e6ff"),this.ctx.fillStyle=n,this.ctx.fillRect(e,a,this.config.paddleWidth,this.config.paddleHeight),this.ctx.shadowBlur=0}drawBall(){this.ctx.shadowColor="#ff00ff",this.ctx.shadowBlur=15;const e=this.ctx.createRadialGradient(this.ball.x,this.ball.y,0,this.ball.x,this.ball.y,this.config.ballSize);e.addColorStop(0,"#ffffff"),e.addColorStop(.3,"#ff00ff"),e.addColorStop(1,"#8a2be2"),this.ctx.fillStyle=e,this.ctx.beginPath(),this.ctx.arc(this.ball.x,this.ball.y,this.config.ballSize,0,Math.PI*2),this.ctx.fill(),this.ctx.shadowBlur=0}drawScores(){this.ctx.fillStyle="#00e6ff",this.ctx.font="bold 48px Arial",this.ctx.textAlign="center",this.ctx.fillText(this.player1.score.toString(),this.config.canvasWidth/4,60),this.ctx.fillText(this.player2.score.toString(),this.config.canvasWidth*3/4,60),this.ctx.font="bold 16px Arial",this.ctx.fillStyle="#ffffff",this.ctx.fillText(this.player1.name,this.config.canvasWidth/4,85),this.ctx.fillText(this.player2.name,this.config.canvasWidth*3/4,85)}drawGameStateMessages(){if(this.ctx.fillStyle="#ffffff",this.ctx.textAlign="center",!this.gameState.isPlaying&&!this.gameState.isGameOver)this.ctx.font="bold 24px Arial",this.ctx.fillText("Press SPACE to Start",this.config.canvasWidth/2,this.config.canvasHeight/2+50),this.ctx.font="16px Arial",this.ctx.fillText("Player 1: W/S or ↑/↓ | Player 2: I/K or Mouse",this.config.canvasWidth/2,this.config.canvasHeight/2+80),this.ctx.fillText("Press R to Reset",this.config.canvasWidth/2,this.config.canvasHeight/2+100);else if(this.gameState.isPaused)this.ctx.font="bold 36px Arial",this.ctx.fillText("PAUSED",this.config.canvasWidth/2,this.config.canvasHeight/2),this.ctx.font="20px Arial",this.ctx.fillText("Press SPACE to Resume",this.config.canvasWidth/2,this.config.canvasHeight/2+40);else if(this.gameState.isGameOver&&this.gameState.winner){this.ctx.font="bold 36px Arial",this.ctx.fillStyle="#ffd700",this.ctx.fillText(`${this.gameState.winner.name} Wins!`,this.config.canvasWidth/2,this.config.canvasHeight/2),this.ctx.font="20px Arial",this.ctx.fillStyle="#ffffff";const e=Math.floor(this.gameState.elapsedTime/1e3);this.ctx.fillText(`Game Time: ${e}s`,this.config.canvasWidth/2,this.config.canvasHeight/2+40),this.ctx.fillText("Press R to Play Again",this.config.canvasWidth/2,this.config.canvasHeight/2+65)}}destroy(){this.animationId&&cancelAnimationFrame(this.animationId)}}function Ce(t){const e=new pe(t,{maxScore:5,ballSpeed:5,paddleSpeed:7});return e.setPlayer2AI(!1),e}function Se(t,e="medium"){const a={easy:{ballSpeed:3,paddleSpeed:5},medium:{ballSpeed:4,paddleSpeed:6},hard:{ballSpeed:6,paddleSpeed:8}},n=new pe(t,{maxScore:5,...a[e]});return n.setPlayer2AI(!0),n}class we{constructor(e,a){w(this,"container");w(this,"game",null);w(this,"gameCanvas",null);w(this,"gameMode","1v1");w(this,"isFullscreen",!1);w(this,"onNavigateBack");this.container=e,this.onNavigateBack=a}render1v1Game(){this.gameMode="1v1",this.renderGameInterface(),this.initializeGame()}renderAIGame(e="medium"){this.gameMode="ai",this.renderGameInterface(),this.initializeAIGame(e)}renderGameInterface(){this.container.innerHTML=`
      <div class="game-page">
        <!-- Game Header -->
        <div class="game-header">
          <div class="game-controls">
            <button id="back-btn" class="game-btn secondary">
              <i class="fas fa-arrow-left"></i>
              Back
            </button>
            <div class="game-info">
              <h2 class="game-title">
                ${this.gameMode==="1v1"?"1v1 Battle":"AI Challenge"}
              </h2>
              <div class="game-status" id="game-status">Ready to Play</div>
            </div>
            <button id="fullscreen-btn" class="game-btn secondary">
              <i class="fas fa-expand"></i>
            </button>
          </div>
        </div>

        <!-- Game Container -->
        <div class="game-container" id="game-container">
          <div class="game-canvas-wrapper">
            <canvas id="game-canvas" class="game-canvas"></canvas>
            
            <!-- Game Overlay -->
            <div class="game-overlay" id="game-overlay">
              <div class="game-overlay-content">
                <div class="game-logo">
                  <i class="fas fa-gamepad"></i>
                </div>
                <h3>Ready to Play!</h3>
                <p class="controls-info">
                  <strong>Player 1:</strong> W/S or Arrow Keys<br>
                  ${this.gameMode==="1v1"?"<strong>Player 2:</strong> I/K or Mouse":"<strong>AI:</strong> Automated"}
                </p>
                <button id="start-game-btn" class="game-btn primary">
                  <i class="fas fa-play"></i>
                  Start Game
                </button>
              </div>
            </div>
          </div>

          <!-- Game Stats -->
          <div class="game-stats" id="game-stats">
            <div class="stat-card">
              <div class="stat-label">Player 1</div>
              <div class="stat-value" id="player1-score">0</div>
              <div class="stat-name" id="player1-name">Player 1</div>
            </div>
            
            <div class="stat-card center">
              <div class="stat-label">Time</div>
              <div class="stat-value" id="game-time">00:00</div>
              <div class="game-actions">
                <button id="pause-btn" class="game-btn small" title="Pause (Space)">
                  <i class="fas fa-pause"></i>
                </button>
                <button id="reset-btn" class="game-btn small" title="Reset (R)">
                  <i class="fas fa-redo"></i>
                </button>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-label">${this.gameMode==="1v1"?"Player 2":"AI"}</div>
              <div class="stat-value" id="player2-score">0</div>
              <div class="stat-name" id="player2-name">${this.gameMode==="1v1"?"Player 2":"AI Opponent"}</div>
            </div>
          </div>
        </div>

        <!-- Game End Modal -->
        <div class="game-end-modal" id="game-end-modal">
          <div class="modal-content">
            <div class="modal-header">
              <i class="fas fa-trophy"></i>
              <h3 id="winner-title">Game Over!</h3>
            </div>
            <div class="modal-body">
              <div class="winner-info">
                <div class="winner-avatar">
                  <i class="fas fa-crown"></i>
                </div>
                <div class="winner-details">
                  <h4 id="winner-name">Winner</h4>
                  <p id="game-summary">Great game!</p>
                </div>
              </div>
              <div class="game-stats-final">
                <div class="final-stat">
                  <span class="label">Final Score:</span>
                  <span class="value" id="final-score">0 - 0</span>
                </div>
                <div class="final-stat">
                  <span class="label">Game Time:</span>
                  <span class="value" id="final-time">00:00</span>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button id="play-again-btn" class="game-btn primary">
                <i class="fas fa-redo"></i>
                Play Again
              </button>
              <button id="back-to-games-btn" class="game-btn secondary">
                <i class="fas fa-arrow-left"></i>
                Back to Games
              </button>
            </div>
          </div>
        </div>
      </div>
    `,this.setupEventListeners()}initializeGame(){if(console.log("Initializing game..."),this.gameCanvas=document.getElementById("game-canvas"),console.log("Canvas found:",this.gameCanvas),!this.gameCanvas){console.error("Canvas not found!");return}this.game=Ce(this.gameCanvas),console.log("Game created:",this.game),this.setupGameCallbacks()}initializeAIGame(e){this.gameCanvas=document.getElementById("game-canvas"),this.gameCanvas&&(this.game=Se(this.gameCanvas,e),this.setupGameCallbacks())}setupGameCallbacks(){this.game&&(this.game.onScoreUpdateCallback((e,a)=>{this.updateScores(e,a)}),this.game.onGameEndCallback((e,a)=>{this.showGameEndModal(e,a)}))}setupEventListeners(){const e=document.getElementById("back-btn");e==null||e.addEventListener("click",()=>{this.cleanup(),this.onNavigateBack&&this.onNavigateBack()});const a=document.getElementById("fullscreen-btn");a==null||a.addEventListener("click",()=>{this.toggleFullscreen()});const n=document.getElementById("start-game-btn");n==null||n.addEventListener("click",()=>{this.startGame()});const s=document.getElementById("pause-btn");s==null||s.addEventListener("click",()=>{var l;(l=this.game)==null||l.pauseGame()});const o=document.getElementById("reset-btn");o==null||o.addEventListener("click",()=>{var l;(l=this.game)==null||l.resetGame(),this.hideGameEndModal(),this.showGameOverlay()});const i=document.getElementById("play-again-btn");i==null||i.addEventListener("click",()=>{var l;(l=this.game)==null||l.resetGame(),this.hideGameEndModal(),this.showGameOverlay()});const r=document.getElementById("back-to-games-btn");r==null||r.addEventListener("click",()=>{this.cleanup(),this.onNavigateBack&&this.onNavigateBack()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&(this.isFullscreen?this.exitFullscreen():(this.cleanup(),this.onNavigateBack&&this.onNavigateBack()))})}startGame(){if(console.log("Starting game...",this.game),!this.game){console.error("Game not initialized!");return}this.game.startGame(),this.hideGameOverlay(),this.startGameTimer(),this.updateGameStatus("Playing..."),console.log("Game started successfully")}updateScores(e,a){const n=document.getElementById("player1-score"),s=document.getElementById("player2-score");n&&(n.textContent=e.toString()),s&&(s.textContent=a.toString())}startGameTimer(){const e=document.getElementById("game-time");let a=Date.now();const n=()=>{if(!this.game)return;const s=this.game.getGameState();if(!s.isPlaying&&!s.isPaused)return;const o=Date.now()-a,i=Math.floor(o/6e4),r=Math.floor(o%6e4/1e3);e&&(e.textContent=`${i.toString().padStart(2,"0")}:${r.toString().padStart(2,"0")}`),(s.isPlaying||s.isPaused)&&requestAnimationFrame(n)};n()}showGameEndModal(e,a){var p;const n=document.getElementById("game-end-modal"),s=document.getElementById("winner-title"),o=document.getElementById("winner-name"),i=document.getElementById("game-summary"),r=document.getElementById("final-score"),l=document.getElementById("final-time");if(!n)return;const c=(p=this.game)==null?void 0:p.getPlayers();if(!c)return;const m=Math.floor(a/6e4),d=Math.floor(a%6e4/1e3);s&&(s.textContent=`🏆 ${e.name} Wins!`),o&&(o.textContent=e.name),i&&(i.textContent=e.id==="player1"?"Congratulations! You defeated your opponent!":"Good game! Better luck next time!"),r&&(r.textContent=`${c.player1.score} - ${c.player2.score}`),l&&(l.textContent=`${m.toString().padStart(2,"0")}:${d.toString().padStart(2,"0")}`),n.style.display="flex",this.updateGameStatus("Game Over")}hideGameEndModal(){const e=document.getElementById("game-end-modal");e&&(e.style.display="none")}showGameOverlay(){const e=document.getElementById("game-overlay");e&&(e.style.display="flex"),this.updateGameStatus("Ready to Play")}hideGameOverlay(){const e=document.getElementById("game-overlay");e&&(e.style.display="none")}updateGameStatus(e){const a=document.getElementById("game-status");a&&(a.textContent=e)}toggleFullscreen(){const e=document.getElementById("game-container"),a=document.getElementById("fullscreen-btn");!e||!a||(this.isFullscreen?this.exitFullscreen():(e.requestFullscreen&&e.requestFullscreen(),this.isFullscreen=!0,a.innerHTML='<i class="fas fa-compress"></i>'))}exitFullscreen(){document.exitFullscreen&&document.exitFullscreen(),this.isFullscreen=!1;const e=document.getElementById("fullscreen-btn");e&&(e.innerHTML='<i class="fas fa-expand"></i>')}cleanup(){this.game&&(this.game.destroy(),this.game=null),this.isFullscreen&&this.exitFullscreen()}}function Te(t,e){const a=new we(t,e);return a.render1v1Game(),a}window.messageTimeout=null;let R=null;function Ae(){const t=y.getTranslations(),e=document.querySelector('.navbar-link[href="/"]'),a=document.querySelector('.navbar-link[href="/tournament"]'),n=document.querySelector('.navbar-link[href="/ACCOUNT"], .navbar-link[href="/logout"]'),s=document.querySelector('.navbar-link[href="/profile"]');e&&(e.textContent=t.nav.home),a&&(a.textContent=t.nav.games),s&&(s.textContent=t.nav.profile),n&&(n.textContent=I?t.nav.logout:t.nav.account);const o=document.querySelector(".navbar-logo");o&&(o.textContent=t.common.neonPong);const i=document.querySelector(".font-size-controls .sr-only");i&&(i.textContent=t.fontControls.label);const r=document.querySelector(".font-size-btn i.fa-minus");if(r&&r.parentElement){const m=r.parentElement.querySelector(".sr-only");m&&(m.textContent=t.fontControls.decrease),r.parentElement.setAttribute("title",t.fontControls.decrease)}const l=document.querySelector(".font-size-btn i.fa-plus");if(l&&l.parentElement){const m=l.parentElement.querySelector(".sr-only");m&&(m.textContent=t.fontControls.increase),l.parentElement.setAttribute("title",t.fontControls.increase)}const c=document.getElementById("app");c&&J(c)}function A(t){se(),setTimeout(()=>{history.pushState(null,"",t);const e=document.getElementById("app");if(e){J(e),document.title=ue(t);const a=document.getElementById("screen-reader-live-region");a&&(a.textContent="",a.textContent=`Navigated to ${document.title}.`),window.scrollTo(0,0)}ie()},300)}function ue(t){switch(t){case"/":return"Home - Neon Pong";case"/tournament":return"Games - Neon Pong";case"/register":return"Register - Neon Pong";case"/login":return"Login - Neon Pong";case"/profile":return"Profile - Neon Pong";case"/logout":return"Logged Out - Neon Pong";default:return"Page Not Found - Neon Pong"}}function ge(){const t=document.createElement("div");t.className="loading-overlay hidden",t.id="loading-overlay",t.setAttribute("role","status"),t.setAttribute("aria-live","assertive");const e=document.createElement("div");e.className="spinner",t.appendChild(e);const a=document.createElement("p");return a.className="loading-text",a.textContent="Loading...",a.setAttribute("aria-label","Content is loading"),t.appendChild(a),t}function se(){const t=document.getElementById("app");if(t){let e=document.getElementById("loading-overlay");e||(e=ge(),t.appendChild(e)),e.classList.remove("hidden")}}function ie(){const t=document.getElementById("loading-overlay");t&&t.classList.add("hidden")}function E(t,e="info"){const a=document.querySelector(".message");a&&(a.classList.add("removing"),setTimeout(()=>a.remove(),300)),window.messageTimeout&&clearTimeout(window.messageTimeout);const n=document.createElement("div");n.className=`message ${e}-message`;let s="";e==="success"?s="fas fa-check-circle":e==="error"?s="fas fa-exclamation-circle":s="fas fa-info-circle";const o=document.createElement("i");o.className=s;const i=document.createElement("div");i.className="message-content",i.textContent=t;const r=document.createElement("button");r.className="close-button",r.innerHTML="&times;",r.setAttribute("aria-label","Close message"),r.addEventListener("click",()=>{n.classList.add("removing"),setTimeout(()=>n.remove(),300),window.messageTimeout&&clearTimeout(window.messageTimeout)}),n.appendChild(o),n.appendChild(i),n.appendChild(r),n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),document.body.appendChild(n),window.messageTimeout=window.setTimeout(()=>{n.classList.add("removing"),setTimeout(()=>n.remove(),300)},4e3)}let V=!1,O=.8,I=!1;function Ne(){V=!V,document.body.classList.toggle("high-contrast",V),localStorage.setItem("highContrast",V.toString())}function ce(t){const s=Math.max(.8,Math.min(2,O+(t?.1:-.1)));if(s!==O){O=s,document.documentElement.style.setProperty("--font-size-multiplier",O.toString()),document.body.style.display="none",document.body.offsetHeight,document.body.style.display="";const o=document.querySelector(".font-size-display");if(o){const i=Math.round(O*100),r=`Font size set to ${i}%`;o.textContent=`${i}%`,localStorage.setItem("fontSizeMultiplier",O.toString()),o.classList.add("active"),setTimeout(()=>o.classList.remove("active"),500);const l=document.getElementById("a11y-announcement");l?(l.textContent=r,setTimeout(()=>l.textContent="",1e3)):E(r,"info")}}}function xe(){localStorage.getItem("highContrast")==="true"&&(V=!0,document.body.classList.add("high-contrast"));const e=parseFloat(localStorage.getItem("fontSizeMultiplier")||"0.8");e>=.8&&e<=1.5&&(O=e),document.documentElement.style.setProperty("--font-size-multiplier",O.toString())}typeof document<"u"&&document.addEventListener("DOMContentLoaded",xe);function X(){const t=y.getTranslations(),e=document.querySelector('.navbar-link[href="/profile"]');let a=document.querySelector('.navbar-link[href="/ACCOUNT"]');a||(a=document.querySelector('.navbar-link[href="/logout"]')),e&&(e.style.display=I?"flex":"none"),a&&(a.textContent=I?t.nav.logout:t.nav.account,a.href=I?"/logout":"/ACCOUNT")}function de(t){I=!0,R={id:Date.now(),username:t},localStorage.setItem("isLoggedIn","true"),localStorage.setItem("currentUser",JSON.stringify(R)),X(),E(`Welcome back, ${t}!`,"success"),A("/profile")}function he(){I=!1,R=null,localStorage.removeItem("isLoggedIn"),localStorage.removeItem("currentUser"),X(),E("Logged out successfully!","success"),A("/")}function ke(){const t=localStorage.getItem("isLoggedIn"),e=localStorage.getItem("currentUser");t==="true"&&e&&(I=!0,R=JSON.parse(e),X())}function Ie(){const t=y.getTranslations(),e=document.createElement("nav");e.className="navbar",e.setAttribute("aria-label","Main navigation");const a=document.createElement("a");a.className="navbar-logo",a.textContent=t.common.neonPong,a.href="/",a.addEventListener("click",u=>{u.preventDefault(),A("/")});const n=document.createElement("div");n.id="mobile-menu",n.className="menu-toggle",n.setAttribute("aria-expanded","false"),n.setAttribute("aria-controls","navbarLinksContainer");for(let u=0;u<3;u++){const T=document.createElement("span");T.className="bar",n.appendChild(T)}const s=document.createElement("div");s.id="navbarLinksContainer",s.className="navbar-links-container";const o=document.createElement("div");o.className="navbar-links",o.setAttribute("role","menubar");const i=document.createElement("a");i.href="/",i.className="navbar-link",i.textContent=t.nav.home,i.setAttribute("role","menuitem"),i.addEventListener("click",u=>{u.preventDefault(),A("/")});const r=document.createElement("a");r.href="/tournament",r.className="navbar-link",r.textContent=t.nav.games,r.setAttribute("role","menuitem"),r.addEventListener("click",u=>{u.preventDefault(),A("/tournament")});const l=document.createElement("a");l.href="/ACCOUNT",l.className="navbar-link",l.textContent=t.nav.account,l.setAttribute("role","menuitem"),l.addEventListener("click",u=>{if(u.preventDefault(),I)he();else{const T=window.location.pathname;A((T==="/login"||T==="/register")&&T==="/login"?"/register":"/login")}}),o.appendChild(i),o.appendChild(r),o.appendChild(l);const c=document.createElement("a");c.href="/profile",c.className="navbar-link",c.textContent=t.nav.profile,c.setAttribute("role","menuitem"),c.style.display="none",c.addEventListener("click",u=>{u.preventDefault(),A("/profile")}),o.appendChild(c);const m=document.createElement("div");m.className="language-selector",m.setAttribute("aria-label","Language selection");const d=document.createElement("button");d.className="language-btn",d.innerHTML='🌐 <span class="language-text">EN</span> <i class="fas fa-chevron-down" aria-hidden="true"></i>',d.setAttribute("aria-label","Select language"),d.setAttribute("aria-expanded","false");const p=document.createElement("div");p.className="language-dropdown",p.setAttribute("role","menu");const g=[{code:"en",name:"English",flag:"🇺🇸"},{code:"fr",name:"Français",flag:"🇫🇷"},{code:"es",name:"Español",flag:"🇪🇸"}];g.forEach(u=>{const T=document.createElement("button");T.className="language-option",T.innerHTML=`${u.flag} ${u.name}`,T.setAttribute("role","menuitem"),T.dataset.lang=u.code,T.addEventListener("click",()=>{const M=y.getCurrentLanguage();if(u.code===M){p.style.display="none",d.setAttribute("aria-expanded","false");return}y.setLanguageWithConfirmation(u.code),p.style.display="none",d.setAttribute("aria-expanded","false")}),p.appendChild(T)}),d.addEventListener("click",()=>{const u=p.style.display==="block";p.style.display=u?"none":"block",d.setAttribute("aria-expanded",(!u).toString())}),document.addEventListener("click",u=>{m.contains(u.target)||(p.style.display="none",d.setAttribute("aria-expanded","false"))}),m.appendChild(d),m.appendChild(p),y.addListener(()=>{const u=y.getCurrentLanguage();g.find(M=>M.code===u)&&(d.innerHTML=`🌐 <span class="language-text">${u.toUpperCase()}</span> <i class="fas fa-chevron-down" aria-hidden="true"></i>`),Ae()});const h=y.getCurrentLanguage();g.find(u=>u.code===h)&&(d.innerHTML=`🌐 <span class="language-text">${h.toUpperCase()}</span> <i class="fas fa-chevron-down" aria-hidden="true"></i>`);const v=document.createElement("div");v.className="accessibility-controls",v.setAttribute("aria-label","Accessibility controls");const C=document.createElement("button");C.className="accessibility-btn",C.innerHTML='<i class="fas fa-adjust" aria-hidden="true"></i>',C.setAttribute("aria-label","Toggle high contrast mode"),C.setAttribute("title","Toggle high contrast mode"),C.addEventListener("click",Ne);const b=document.createElement("div");b.className="font-size-controls",b.setAttribute("aria-label","Font size controls");const S=document.createElement("span");S.className="sr-only",S.textContent=t.fontControls.label,b.appendChild(S);const k=document.createElement("button");k.className="font-size-btn",k.innerHTML=`<i class="fas fa-minus" aria-hidden="true"></i> <span class="sr-only">${t.fontControls.decrease}</span>`,k.setAttribute("aria-label",t.fontControls.decrease),k.setAttribute("title",t.fontControls.decrease),k.addEventListener("click",u=>{u.preventDefault(),ce(!1)});const L=document.createElement("span");L.className="font-size-display",L.textContent="A",L.setAttribute("aria-hidden","true");const N=document.createElement("button");N.className="font-size-btn",N.innerHTML=`<i class="fas fa-plus" aria-hidden="true"></i> <span class="sr-only">${t.fontControls.increase}</span>`,N.setAttribute("aria-label",t.fontControls.increase),N.setAttribute("title",t.fontControls.increase),N.addEventListener("click",u=>{u.preventDefault(),ce(!0)}),b.appendChild(k),b.appendChild(L),b.appendChild(N);const D=document.createElement("a");D.href="#main-content",D.className="skip-to-content",D.textContent="Skip to main content",D.setAttribute("tabindex","0");const H=document.createElement("div");return H.className="controls-container",H.appendChild(m),H.appendChild(b),H.appendChild(C),v.appendChild(H),s.appendChild(o),s.appendChild(v),e.prepend(D),e.appendChild(a),e.appendChild(n),e.appendChild(s),n.addEventListener("click",()=>{s.classList.toggle("active"),n.classList.toggle("active");const u=n.classList.contains("active");n.setAttribute("aria-expanded",String(u))}),o.querySelectorAll(".navbar-link").forEach(u=>{u.addEventListener("click",()=>{window.innerWidth<=768&&(s.classList.remove("active"),n.classList.remove("active"),n.setAttribute("aria-expanded","false"))})}),document.addEventListener("click",u=>{window.innerWidth<=768&&!s.contains(u.target)&&!n.contains(u.target)&&s.classList.contains("active")&&(s.classList.remove("active"),n.classList.remove("active"),n.setAttribute("aria-expanded","false"))}),e}function K(){return document.createElement("footer")}function me(){const t=y.getTranslations(),e=document.createElement("div");e.className="page",e.setAttribute("role","main"),e.id="home";const a=document.createElement("section");a.className="hero-section content-section";const n=document.createElement("img");n.className="ping-pong-paddle";const s=document.createElement("h1");s.className="hero-title",s.textContent=t.home.title;const o=document.createElement("h2");o.className="hero-subtitle",o.textContent=t.home.tagline;const i=document.createElement("p");i.className="hero-description",i.textContent=t.home.description;const r=document.createElement("div");r.className="hero-cta";const l=document.createElement("button");l.className="primary-button register-cta-button",l.innerHTML=`<i class="fas fa-user-plus"></i> ${t.home.registerNow}`,l.addEventListener("click",()=>A("/register")),r.appendChild(l),a.appendChild(n),a.appendChild(s),a.appendChild(o),a.appendChild(i),a.appendChild(r),e.appendChild(a);const c=document.createElement("section");c.id="team",c.className="content-section";const m=document.createElement("h2");m.className="section-title",m.textContent=t.home.meetTheTeam,c.appendChild(m);const d=document.createElement("div");return d.className="team-grid",[{name:"Hanieh",avatar:"/pic1.png"},{name:"Mira",avatar:"/pic2.png"},{name:"Fatima Fidha",avatar:"/pic3.png"}].forEach(g=>{const h=document.createElement("div");h.className="team-member-card";const f=document.createElement("img");f.src=g.avatar,f.alt=`Avatar of ${g.name}`,f.className="team-member-avatar";const v=document.createElement("p");v.className="team-member-name",v.textContent=g.name,h.appendChild(f),h.appendChild(v),d.appendChild(h)}),c.appendChild(d),e.appendChild(c),e.appendChild(K()),e}function Le(){const t=y.getTranslations(),e=document.createElement("div");e.className="page content-section",e.id="games-page",e.setAttribute("role","main");const a=document.createElement("div");a.className="games-hero-section",a.innerHTML=`
    <div class="hero-background-effects">
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
      <div class="floating-orb orb-3"></div>
      <div class="grid-overlay"></div>
    </div>
    
    <div class="games-hero-content">
      <div class="hero-icon">
        <div class="icon-glow"></div>
        <i class="fas fa-gamepad"></i>
      </div>
      
      <h1 class="games-hero-title">
        <span class="title-main">${t.games.title}</span>
        <span class="title-sub">${t.games.subtitle}</span>
      </h1>
      
      <div class="games-stats-bar">
        <div class="stat-item">
          <span class="stat-number">1,247</span>
          <span class="stat-label">${t.games.stats.activePlayers}</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">89</span>
          <span class="stat-label">${t.games.stats.ongoingMatches}</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">12</span>
          <span class="stat-label">${t.games.stats.tournaments}</span>
        </div>
      </div>
    </div>
  `;const n=document.createElement("div");if(n.className="game-modes-section",I&&R){n.innerHTML=`
      <div class="game-modes-container">
        <!-- 1v1 Battle Mode -->
        <div class="game-mode-card onevsone">
          <div class="card-background">
            <div class="card-glow"></div>
            <div class="card-particles"></div>
          </div>
          
          <div class="mode-header">
            <div class="mode-icon">
              <div class="icon-rings">
                <div class="ring ring-1"></div>
                <div class="ring ring-2"></div>
              </div>
              <i class="fas fa-bolt"></i>
            </div>
            <div class="mode-title">
              <h2>${t.games.oneVsOne.title}</h2>
              <p>${t.games.oneVsOne.subtitle}</p>
            </div>
          </div>
          
          <div class="mode-content">
            <p class="mode-description">${t.games.oneVsOne.description}</p>
            
            <div class="mode-features">
              <div class="feature-item">
                <i class="fas fa-zap"></i>
                <span>${t.games.oneVsOne.features.instant}</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-chart-line"></i>
                <span>${t.games.oneVsOne.features.ranked}</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-balance-scale"></i>
                <span>${t.games.oneVsOne.features.skill}</span>
              </div>
            </div>
            
            <div class="mode-actions">
              <button class="premium-game-btn" id="play-1v1-btn">
                <span class="btn-bg"></span>
                <span class="btn-content">
                  <i class="fas fa-bolt"></i>
                  ${t.games.oneVsOne.playNow}
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Tournament Mode -->
        <div class="game-mode-card tournament">
          <div class="card-background">
            <div class="card-glow"></div>
            <div class="card-particles"></div>
          </div>
          
          <div class="mode-header">
            <div class="mode-icon">
              <div class="icon-rings">
                <div class="ring ring-1"></div>
                <div class="ring ring-2"></div>
                <div class="ring ring-3"></div>
              </div>
              <i class="fas fa-crown"></i>
            </div>
            <div class="mode-title">
              <h2>${t.games.tournaments.title}</h2>
              <p>${t.games.tournaments.subtitle}</p>
            </div>
          </div>
          
          <div class="mode-content">
            <p class="mode-description">${t.games.tournaments.description}</p>
            
            <div class="mode-features">
              <div class="feature-item">
                <i class="fas fa-chess"></i>
                <span>${t.games.tournaments.features.strategic}</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-medal"></i>
                <span>${t.games.tournaments.features.prestige}</span>
              </div>
              <div class="feature-item">
                <i class="fas fa-fire"></i>
                <span>${t.games.tournaments.features.competition}</span>
              </div>
            </div>
            
            <div class="mode-actions">
              <button class="premium-game-btn" id="create-tournament-btn">
                <span class="btn-bg"></span>
                <span class="btn-content">
                  <i class="fas fa-crown"></i>
                  ${t.games.tournaments.createTournament}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;const s=n.querySelector("#play-1v1-btn"),o=n.querySelector("#create-tournament-btn");s==null||s.addEventListener("click",()=>{const i=document.getElementById("app");if(i){const r=document.createElement("div");r.className="game-container-wrapper",Te(r,()=>{A("/tournament")}),i.innerHTML="",i.appendChild(r),E("🎮 Starting 1v1 match...","info")}}),o==null||o.addEventListener("click",Ve)}else n.innerHTML=`
      <div class="login-required-section">
        <div class="login-card">
          <div class="card-glow"></div>
          <div class="login-icon">
            <i class="fas fa-lock"></i>
          </div>
          <h2>${t.games.loginRequired.title}</h2>
          <p>${t.games.loginRequired.description}</p>
          <button class="login-access-btn" onclick="navigateTo('/ACCOUNT')">
            <span class="btn-glow"></span>
            <span class="btn-content">
              <i class="fas fa-key"></i>
              ${t.games.loginRequired.button}
            </span>
          </button>
        </div>
      </div>
    `;return e.appendChild(a),e.appendChild(n),e.appendChild(K()),e}function ne(t=!0){const e=y.getTranslations(),a=document.createElement("div");a.className="page content-section",a.id=t?"login":"register",a.setAttribute("role","main");const n=document.createElement("div");n.className="form-container";const s=document.createElement("p");s.className="text-center mt-4";const o=document.createElement("a");o.href="#",o.className="text-blue-500 hover:underline",o.textContent=t?e.auth.login.createAccount:e.auth.register.signIn,o.addEventListener("click",S=>{S.preventDefault(),A(t?"/register":"/login")});const i=document.createElement("div");i.className="toggle-text-container";const r=document.createElement("span");r.className="toggle-text",r.textContent=t?e.auth.login.noAccount:e.auth.register.hasAccount,o.className="toggle-link neon-text",o.style.marginLeft="4px",o.style.textDecoration="none",o.style.transition="all 0.3s ease",o.style.fontWeight="600",o.addEventListener("mouseenter",()=>{o.style.textShadow="0 0 10px rgba(99, 102, 241, 0.8)"}),o.addEventListener("mouseleave",()=>{o.style.textShadow="none"}),i.appendChild(r),i.appendChild(o),s.appendChild(i);const l=document.createElement("h2");l.className="form-title",l.textContent=t?e.auth.login.title:e.auth.register.title;const c=document.createElement("form");c.noValidate=!0;let m=null;if(!t){const S=document.createElement("label");S.className="form-label",S.textContent=e.auth.register.email,m=document.createElement("input"),m.type="email",m.className="form-input",m.required=!0,m.placeholder="Enter your email",c.appendChild(S),c.appendChild(m)}const d=document.createElement("label");d.className="form-label",d.textContent=t?e.auth.login.username:e.auth.register.username;const p=document.createElement("input");p.type="text",p.className="form-input",p.required=!0,p.placeholder="Choose a username";const g=document.createElement("label");g.className="form-label",g.textContent=t?e.auth.login.password:e.auth.register.password;const h=document.createElement("input");h.type="password",h.className="form-input",h.required=!0,h.placeholder="Enter your password";let f=null,v=null;t||(v=document.createElement("label"),v.className="form-label",v.textContent=e.auth.register.confirmPassword,f=document.createElement("input"),f.type="password",f.className="form-input",f.required=!0,f.placeholder="Confirm your password");const C=document.createElement("button");C.type="submit",C.className="primary-button w-full",C.textContent=t?e.auth.login.button:e.auth.register.button;const b=document.createElement("button");return b.type="button",b.className="secondary-button w-full mt-2",b.textContent=t?e.auth.login.backToHome:e.auth.register.backToHome,b.addEventListener("click",()=>A("/")),t||c.appendChild(document.createElement("br")),c.appendChild(d),c.appendChild(p),c.appendChild(document.createElement("br")),c.appendChild(g),c.appendChild(h),!t&&f&&v&&(c.appendChild(document.createElement("br")),c.appendChild(v),c.appendChild(f)),t&&c.appendChild(document.createElement("br")),c.appendChild(C),c.appendChild(b),n.appendChild(l),n.appendChild(c),n.appendChild(s),a.appendChild(n),a.appendChild(K()),c.addEventListener("submit",async S=>{if(S.preventDefault(),!t&&h.value!==(f==null?void 0:f.value)){E("Passwords do not match","error");return}se();try{t?p.value.trim()&&h.value.trim()?de(p.value):E("Please enter both username and password","error"):m&&(p.value.trim()&&h.value.trim()&&m.value.trim()?(de(p.value),E("Registration successful!","success")):E("Please fill in all fields","error"))}catch(k){console.error("Auth error:",k),E("An error occurred. Please try again.","error")}finally{ie()}}),a}function Pe(){const t=y.getTranslations(),e=document.createElement("div");e.className="page content-section",e.id="profile",e.setAttribute("role","main");const a=document.createElement("h1");a.className="section-title",a.textContent=t.profile.title,e.appendChild(a);const n=document.createElement("div");n.className="profile-tabs";const s=document.createElement("div");s.className="tab-buttons",[{id:"dashboard",label:t.profile.tabs.dashboard,icon:"fa-tachometer-alt"},{id:"profile-info",label:t.profile.tabs.settings,icon:"fa-user-edit"},{id:"stats",label:t.profile.tabs.statistics,icon:"fa-chart-bar"},{id:"friends",label:t.profile.tabs.friends,icon:"fa-users"},{id:"match-history",label:t.profile.tabs.history,icon:"fa-history"}].forEach((h,f)=>{const v=document.createElement("button");v.className=`tab-button ${f===0?"active":""}`,v.dataset.tab=h.id,v.innerHTML=`<i class="fas ${h.icon}"></i> ${h.label}`,v.addEventListener("click",()=>oe(h.id)),s.appendChild(v)}),n.appendChild(s);const i=document.createElement("div");i.className="tab-content";const r={username:"player123",displayName:"Pro Player",skillLevel:"intermediate",bio:"Passionate ping pong player with 5 years of experience!",avatar:"/pic1.png",wins:45,losses:23,gamesPlayed:68,winRate:66.2,currentStreak:5,longestStreak:12,averageMatchDuration:22,preferredGameMode:"1v1",totalPlayTime:1456,ranking:42,totalPlayers:1337,averageScore:18.5,perfectGames:3,comebacks:8,friends:[{id:1,username:"friend1",displayName:"Alice",avatar:"/pic2.png",isOnline:!0},{id:2,username:"friend2",displayName:"Bob",avatar:"/pic3.png",isOnline:!1,lastSeen:new Date("2024-01-15")},{id:3,username:"friend3",displayName:"Carol",avatar:"/pic1.png",isOnline:!0}],matchHistory:[{id:1,opponent:"Alice",opponentAvatar:"/pic2.png",result:"win",score:"21-18",date:new Date("2024-01-20"),gameType:"1v1",duration:25},{id:2,opponent:"Bob",opponentAvatar:"/pic3.png",result:"loss",score:"19-21",date:new Date("2024-01-19"),gameType:"1v1",duration:30},{id:3,opponent:"Carol",opponentAvatar:"/pic1.png",result:"win",score:"21-15",date:new Date("2024-01-18"),gameType:"tournament",duration:20},{id:4,opponent:"David",opponentAvatar:"/pic2.png",result:"win",score:"21-12",date:new Date("2024-01-17"),gameType:"1v1",duration:18},{id:5,opponent:"Eve",opponentAvatar:"/pic3.png",result:"win",score:"21-16",date:new Date("2024-01-16"),gameType:"tournament",duration:28},{id:6,opponent:"Frank",opponentAvatar:"/pic1.png",result:"win",score:"21-19",date:new Date("2024-01-15"),gameType:"1v1",duration:35},{id:7,opponent:"Grace",opponentAvatar:"/pic2.png",result:"loss",score:"18-21",date:new Date("2024-01-14"),gameType:"tournament",duration:22}],weeklyStats:[{week:"Week 1",wins:8,losses:2,gamesPlayed:10},{week:"Week 2",wins:12,losses:3,gamesPlayed:15},{week:"Week 3",wins:6,losses:4,gamesPlayed:10},{week:"Week 4",wins:10,losses:5,gamesPlayed:15},{week:"Week 5",wins:9,losses:9,gamesPlayed:18}],skillProgression:[{month:"Sep",rating:1200},{month:"Oct",rating:1350},{month:"Nov",rating:1420},{month:"Dec",rating:1465},{month:"Jan",rating:1520}]},l=document.createElement("div");l.className="tab-pane active",l.id="dashboard",l.appendChild(Re(r));const c=document.createElement("div");c.className="tab-pane",c.id="profile-info";const m=ye(r);c.appendChild(m);const d=document.createElement("div");d.className="tab-pane",d.id="stats",d.appendChild(Ge(r));const p=document.createElement("div");p.className="tab-pane",p.id="friends",p.appendChild(Fe(r.friends));const g=document.createElement("div");return g.className="tab-pane",g.id="match-history",g.appendChild(Ue(r.matchHistory)),i.appendChild(l),i.appendChild(c),i.appendChild(d),i.appendChild(p),i.appendChild(g),n.appendChild(i),e.appendChild(n),e}function Re(t){const e=y.getTranslations(),a=document.createElement("div");a.className="dashboard-section";const n=document.createElement("div");n.className="dashboard-header",n.innerHTML=`
    <div class="welcome-banner">
      <h2>${e.profile.dashboard.welcome}</h2>
      <p>${e.profile.dashboard.overview}</p>
    </div>
  `,a.appendChild(n);const s=document.createElement("div");s.className="dashboard-kpis";const o=document.createElement("h3");o.textContent=e.profile.dashboard.overview,o.className="dashboard-section-title",s.appendChild(o);const i=document.createElement("div");i.className="kpi-grid",[{label:e.profile.dashboard.rank,value:`#${t.ranking}`,subtitle:`${e.profile.dashboard.of} ${t.totalPlayers} ${e.profile.dashboard.players}`,icon:"fa-crown",color:"gold",trend:"up"},{label:e.profile.dashboard.winRate,value:`${t.winRate}%`,subtitle:`${t.wins}W / ${t.losses}L`,icon:"fa-trophy",color:"success",trend:"up"},{label:e.profile.dashboard.streak,value:t.currentStreak,subtitle:`${e.profile.dashboard.best}: ${t.longestStreak}`,icon:"fa-fire",color:"warning",trend:"up"},{label:e.profile.dashboard.playTime,value:`${Math.floor(t.totalPlayTime/60)}h ${t.totalPlayTime%60}m`,subtitle:`${e.profile.dashboard.avg}: ${t.averageMatchDuration}min/game`,icon:"fa-clock",color:"info",trend:"up"}].forEach(b=>{const S=document.createElement("div");S.className=`kpi-card ${b.color}`,S.innerHTML=`
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
    `,i.appendChild(S)}),s.appendChild(i),a.appendChild(s);const l=document.createElement("div");l.className="dashboard-analytics";const c=document.createElement("h3");c.textContent=e.profile.dashboard.analytics,c.className="dashboard-section-title",l.appendChild(c);const m=document.createElement("div");m.className="charts-container";const d=Oe(t.weeklyStats);m.appendChild(d);const p=Me(t.skillProgression);m.appendChild(p),l.appendChild(m),a.appendChild(l);const g=document.createElement("div");g.className="dashboard-activity";const h=document.createElement("div");h.className="activity-row";const f=$e(t.matchHistory.slice(0,5));h.appendChild(f);const v=De(t);h.appendChild(v),g.appendChild(h),a.appendChild(g);const C=He(t);return a.appendChild(C),a}function Oe(t){const e=y.getTranslations(),a=document.createElement("div");a.className="chart-container weekly-chart";const n=document.createElement("h4");n.textContent=e.profile.dashboard.weekly,a.appendChild(n);const s=document.createElement("div");s.className="chart-wrapper";const o=Math.max(...t.map(r=>r.gamesPlayed));t.forEach(r=>{const l=document.createElement("div");l.className="week-bar";const c=r.wins/o*100,m=r.losses/o*100;l.innerHTML=`
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
    `,s.appendChild(l)}),a.appendChild(s);const i=document.createElement("div");return i.className="chart-legend",i.innerHTML=`
    <div class="legend-item">
      <div class="legend-color wins"></div>
      <span>${e.profile.dashboard.wins}</span>
    </div>
    <div class="legend-item">
      <div class="legend-color losses"></div>
      <span>${e.profile.dashboard.losses}</span>
    </div>
  `,a.appendChild(i),a}function Me(t){const e=y.getTranslations(),a=document.createElement("div");a.className="chart-container skill-chart";const n=document.createElement("h4");n.textContent=e.profile.dashboard.rating,a.appendChild(n);const s=document.createElement("div");s.className="line-chart-wrapper";const o=Math.max(...t.map(p=>p.rating)),i=Math.min(...t.map(p=>p.rating)),r=o-i,l=document.createElement("div");l.className="svg-chart";let c="";const m=[];t.forEach((p,g)=>{const h=g/(t.length-1)*100,f=(o-p.rating)/r*100;g===0?c+=`M ${h} ${f}`:c+=` L ${h} ${f}`,m.push(`
      <div class="chart-point" style="left: ${h}%; top: ${f}%"
           title="${p.month}: ${p.rating}">
        <div class="point-value">${p.rating}</div>
      </div>
    `)}),l.innerHTML=`
    <svg viewBox="0 0 100 100" class="line-chart">
      <path d="${c}" class="chart-line" />
      <path d="${c}" class="chart-line-glow" />
    </svg>
    ${m.join("")}
  `,s.appendChild(l);const d=document.createElement("div");return d.className="chart-x-axis",t.forEach(p=>{const g=document.createElement("span");g.textContent=p.month,d.appendChild(g)}),s.appendChild(d),a.appendChild(s),a}function $e(t){const e=y.getTranslations(),a=document.createElement("div");a.className="recent-matches-summary";const n=document.createElement("h4");n.textContent=e.profile.dashboard.recent,a.appendChild(n);const s=document.createElement("div");s.className="recent-matches-list",t.forEach(i=>{const r=document.createElement("div");r.className=`recent-match-item ${i.result}`;const l=i.result==="win"?"fa-check-circle":"fa-times-circle";r.innerHTML=`
      <div class="match-result-icon">
        <i class="fas ${l}"></i>
      </div>
      <div class="match-info">
        <div class="opponent-name">${i.opponent}</div>
        <div class="match-details">${i.score} • ${i.duration}min</div>
      </div>
      <div class="match-date">${i.date.toLocaleDateString()}</div>
    `,s.appendChild(r)}),a.appendChild(s);const o=document.createElement("button");return o.className="secondary-button",o.textContent=e.profile.dashboard.viewAll,o.addEventListener("click",()=>oe("match-history")),a.appendChild(o),a}function De(t){const e=y.getTranslations(),a=document.createElement("div");a.className="advanced-stats-panel";const n=document.createElement("h4");n.textContent=e.profile.dashboard.advanced,a.appendChild(n);const s=document.createElement("div");return s.className="advanced-stats-grid",[{label:e.profile.dashboard.avgScore,value:t.averageScore,unit:"pts"},{label:e.profile.dashboard.perfectGames,value:t.perfectGames,unit:""},{label:e.profile.dashboard.comebacks,value:t.comebacks,unit:""},{label:e.profile.dashboard.preferredMode,value:t.preferredGameMode,unit:""}].forEach(i=>{const r=document.createElement("div");r.className="advanced-stat-item",r.innerHTML=`
      <div class="stat-value">${i.value}${i.unit}</div>
      <div class="stat-label">${i.label}</div>
    `,s.appendChild(r)}),a.appendChild(s),a}function He(t){const e=y.getTranslations(),a=document.createElement("div");a.className="achievements-section";const n=document.createElement("h3");n.textContent=e.profile.dashboard.achievements,n.className="dashboard-section-title",a.appendChild(n);const s=document.createElement("div");return s.className="achievements-grid",[{title:e.profile.dashboard.winStreakMaster,description:e.profile.dashboard.winStreakDesc,progress:t.currentStreak,target:10,icon:"fa-fire",unlocked:t.longestStreak>=10},{title:e.profile.dashboard.centuryClub,description:e.profile.dashboard.centuryDesc,progress:t.gamesPlayed,target:100,icon:"fa-medal",unlocked:t.gamesPlayed>=100},{title:e.profile.dashboard.perfectPlayer,description:e.profile.dashboard.perfectDesc,progress:t.perfectGames,target:1,icon:"fa-star",unlocked:t.perfectGames>=1},{title:e.profile.dashboard.socialButterfly,description:e.profile.dashboard.socialDesc,progress:t.friends.length,target:10,icon:"fa-users",unlocked:t.friends.length>=10}].forEach(i=>{const r=document.createElement("div");r.className=`achievement-card ${i.unlocked?"unlocked":"locked"}`;const l=Math.min(i.progress/i.target*100,100);r.innerHTML=`
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
    `,s.appendChild(r)}),a.appendChild(s),a}function oe(t){var e,a;document.querySelectorAll(".tab-button").forEach(n=>{n.classList.remove("active")}),(e=document.querySelector(`[data-tab="${t}"]`))==null||e.classList.add("active"),document.querySelectorAll(".tab-pane").forEach(n=>{n.classList.remove("active")}),(a=document.getElementById(t))==null||a.classList.add("active")}function Ge(t){const e=y.getTranslations(),a=document.createElement("div");a.className="stats-section";const n=document.createElement("h2");n.textContent=e.profile.statistics.title,a.appendChild(n);const s=document.createElement("div");return s.className="stats-grid",[{label:e.profile.statistics.gamesPlayed,value:t.gamesPlayed,icon:"fa-gamepad"},{label:e.profile.statistics.wins,value:t.wins,icon:"fa-trophy",color:"success"},{label:e.profile.statistics.losses,value:t.losses,icon:"fa-times-circle",color:"danger"},{label:e.profile.statistics.winRate,value:`${t.winRate}%`,icon:"fa-percentage",color:"info"}].forEach(i=>{const r=document.createElement("div");r.className=`stat-card ${i.color||""}`,r.innerHTML=`
      <div class="stat-icon">
        <i class="fas ${i.icon}"></i>
      </div>
      <div class="stat-content">
        <div class="stat-value">${i.value}</div>
        <div class="stat-label">${i.label}</div>
      </div>
    `,s.appendChild(r)}),a.appendChild(s),a}function Fe(t){const e=y.getTranslations(),a=document.createElement("div");a.className="friends-section";const n=document.createElement("div");n.className="section-header";const s=document.createElement("h2");s.textContent=e.profile.friends.title;const o=document.createElement("button");o.className="primary-button",o.innerHTML=`<i class="fas fa-user-plus"></i> ${e.profile.friends.addFriend}`,o.addEventListener("click",Be),n.appendChild(s),n.appendChild(o),a.appendChild(n);const i=document.createElement("div");if(i.className="friends-list",t.length===0){const r=document.createElement("div");r.className="empty-state",r.innerHTML=`
      <i class="fas fa-user-friends"></i>
      <p>No friends yet. Start by adding some friends!</p>
    `,i.appendChild(r)}else t.forEach(r=>{const l=document.createElement("div");l.className="friend-card";const c=r.isOnline?"online":"offline",m=r.isOnline?e.profile.friends.online:r.lastSeen?`${e.profile.friends.lastSeen} ${r.lastSeen.toLocaleDateString()}`:"Offline";l.innerHTML=`
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
            <i class="fas fa-gamepad"></i> ${e.profile.friends.challenge}
          </button>
          <button class="danger-button" onclick="removeFriend(${r.id})">
            <i class="fas fa-user-minus"></i>
          </button>
        </div>
      `,i.appendChild(l)});return a.appendChild(i),a}function Ue(t){const e=y.getTranslations(),a=document.createElement("div");a.className="match-history-section";const n=document.createElement("h2");if(n.textContent=e.profile.history.title,a.appendChild(n),t.length===0){const o=document.createElement("div");return o.className="empty-state",o.innerHTML=`
      <i class="fas fa-history"></i>
      <p>No matches played yet. Start playing to build your history!</p>
    `,a.appendChild(o),a}const s=document.createElement("div");return s.className="match-history-list",t.forEach(o=>{const i=document.createElement("div");i.className=`match-card ${o.result}`;const r=o.result==="win"?"fa-trophy":"fa-times-circle",l=o.result==="win"?e.profile.history.victory:e.profile.history.defeat;i.innerHTML=`
      <div class="match-result">
        <i class="fas ${r}"></i>
        <span class="result-text">${l}</span>
      </div>
      <div class="match-opponent">
        <img src="${o.opponentAvatar}" alt="${o.opponent}'s avatar" class="opponent-avatar" />
        <div class="opponent-info">
          <div class="opponent-name">${o.opponent}</div>
          <div class="game-type">${o.gameType==="1v1"?e.profile.history.match1v1:e.profile.history.tournament}</div>
        </div>
      </div>
      <div class="match-details">
        <div class="match-score">${o.score}</div>
        <div class="match-date">${o.date.toLocaleDateString()}</div>
        <div class="match-duration">${o.duration} ${e.profile.history.min}</div>
      </div>
    `,s.appendChild(i)}),a.appendChild(s),a}function Be(){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
  `,t.addEventListener("click",e=>{(e.target===t||e.target.classList.contains("modal-close"))&&t.remove()}),document.body.appendChild(t)}function ze(){var a;const e=document.getElementById("friend-username").value.trim();e?(E(`Friend request sent to ${e}!`,"success"),(a=document.querySelector(".modal-overlay"))==null||a.remove()):E("Please enter a username","error")}function We(t){E(`Challenge sent to ${t}!`,"info")}function qe(t){confirm("Are you sure you want to remove this friend?")&&(console.log(`Removing friend with ID: ${t}`),E("Friend removed","info"))}window.addFriend=ze;window.challengeFriend=We;window.removeFriend=qe;function Ve(){if(console.log("showCreateTournamentModal called - isLoggedIn:",I,"currentUser:",R),!I||!R){E("Please login to create tournaments.","error"),A("/ACCOUNT");return}const t=document.createElement("div");t.className="modal-overlay",t.style.cssText=`
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
  `;const e=document.createElement("div");e.className="modal-content",e.style.cssText=`
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
  `,e.innerHTML=`
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
  `,t.appendChild(e),document.body.appendChild(t);const a=t.querySelector("#create-tournament-form");t.querySelector("#cancel-tournament").addEventListener("click",()=>{document.body.removeChild(t)}),t.addEventListener("click",s=>{s.target===t&&document.body.removeChild(t)}),a.addEventListener("submit",async s=>{s.preventDefault();const o=t.querySelector("#tournament-name"),i=t.querySelector("#player1"),r=t.querySelector("#player2"),l=t.querySelector("#player3"),c=t.querySelector("#player4"),m=o.value.trim(),d=i.value.trim(),p=r.value.trim(),g=l.value.trim(),h=c.value.trim();if(!m||!d||!p||!g||!h){E("Please fill in all fields.","error");return}const f=[d,p,g,h];if(new Set(f).size!==4){E("All player names must be unique.","error");return}se();try{await new Promise(S=>setTimeout(S,1e3));const C={id:Date.now(),name:m,players:[d,p,g,h],createdBy:(R==null?void 0:R.username)||"Unknown",createdDate:new Date().toISOString().split("T")[0],status:"active",bracket:{semifinals:[{player1:d,player2:p,winner:null},{player1:g,player2:h,winner:null}],finals:{player1:null,player2:null,winner:null}}},b=JSON.parse(localStorage.getItem("tournaments")||"[]");b.push(C),localStorage.setItem("tournaments",JSON.stringify(b)),document.body.removeChild(t),E(`Tournament "${m}" created successfully! 🏆`,"success"),re(C)}catch{E("Error creating tournament. Please try again.","error")}finally{ie()}})}function re(t){const e=document.getElementById("app");e&&(e.innerHTML=`
    <div class="tournament-bracket-page">
      <div class="tournament-header">
        <div class="back-button" onclick="navigateTo('/tournament')">
          <i class="fas fa-arrow-left"></i> Back to Tournaments
        </div>
        <h1 class="tournament-title">${t.name}</h1>
        <div class="tournament-meta">
          <span>Created by: ${t.createdBy}</span>
          <span>Date: ${t.createdDate}</span>
        </div>
      </div>
      
      <div class="bracket-container">
        <div class="bracket-round">
          <h2 class="round-title">Semi-Finals</h2>
          
          <div class="match-container">
            <div class="match" id="match-1">
              <div class="match-header">Match 1 - Semi-Final</div>
              <div class="players">
                <div class="player ${t.bracket.semifinals[0].winner===t.bracket.semifinals[0].player1?"winner":""}" data-player="${t.bracket.semifinals[0].player1}">
                  ${t.bracket.semifinals[0].player1}
                </div>
                <div class="vs">VS</div>
                <div class="player ${t.bracket.semifinals[0].winner===t.bracket.semifinals[0].player2?"winner":""}" data-player="${t.bracket.semifinals[0].player2}">
                  ${t.bracket.semifinals[0].player2}
                </div>
              </div>
              ${t.bracket.semifinals[0].winner?`
                <div class="winner-announcement">
                  <i class="fas fa-trophy"></i>
                  Winner: ${t.bracket.semifinals[0].winner}
                </div>
              `:`
                <div class="match-actions">
                  <button class="start-match-btn" onclick="startMatch(0, '${t.bracket.semifinals[0].player1}', '${t.bracket.semifinals[0].player2}')">
                    <i class="fas fa-play"></i> Start Match 1
                  </button>
                </div>
              `}
            </div>
            
            <div class="match ${t.bracket.semifinals[0].winner?"":"match-locked"}" id="match-2">
              <div class="match-header">
                Match 2 - Semi-Final
                ${t.bracket.semifinals[0].winner?"":'<span class="locked-indicator"><i class="fas fa-lock"></i> Locked</span>'}
              </div>
              <div class="players">
                <div class="player ${t.bracket.semifinals[1].winner===t.bracket.semifinals[1].player1?"winner":""}" data-player="${t.bracket.semifinals[1].player1}">
                  ${t.bracket.semifinals[1].player1}
                </div>
                <div class="vs">VS</div>
                <div class="player ${t.bracket.semifinals[1].winner===t.bracket.semifinals[1].player2?"winner":""}" data-player="${t.bracket.semifinals[1].player2}">
                  ${t.bracket.semifinals[1].player2}
                </div>
              </div>
              ${t.bracket.semifinals[1].winner?`
                <div class="winner-announcement">
                  <i class="fas fa-trophy"></i>
                  Winner: ${t.bracket.semifinals[1].winner}
                </div>
              `:`
                <div class="match-actions">
                  ${t.bracket.semifinals[0].winner?`
                    <button class="start-match-btn" onclick="startMatch(1, '${t.bracket.semifinals[1].player1}', '${t.bracket.semifinals[1].player2}')">
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
              ${t.bracket.semifinals[0].winner&&t.bracket.semifinals[1].winner?`
                <div class="players">
                  <div class="player ${t.bracket.finals.winner===t.bracket.semifinals[0].winner?"winner":""}" data-player="${t.bracket.semifinals[0].winner}">
                    ${t.bracket.semifinals[0].winner}
                  </div>
                  <div class="vs">VS</div>
                  <div class="player ${t.bracket.finals.winner===t.bracket.semifinals[1].winner?"winner":""}" data-player="${t.bracket.semifinals[1].winner}">
                    ${t.bracket.semifinals[1].winner}
                  </div>
                </div>
                ${t.bracket.finals.winner?`
                  <div class="champion-announcement">
                    <i class="fas fa-crown"></i>
                    <span>Tournament Champion:</span>
                    <div class="champion-name">${t.bracket.finals.winner}</div>
                  </div>
                `:`
                  <div class="match-actions">
                    <button class="start-match-btn" onclick="startFinalsMatch('${t.bracket.semifinals[0].winner}', '${t.bracket.semifinals[1].winner}')">
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
  `,window.currentTournament=t)}window.startMatch=function(t,e,a){E(`Starting match: ${e} vs ${a}`,"info");const n=document.createElement("div");n.className="modal-overlay",n.style.cssText=`
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
  `,n.innerHTML=`
    <div class="modal-content" style="background: linear-gradient(135deg, rgba(15, 18, 40, 0.95), rgba(8, 10, 28, 0.98)); backdrop-filter: blur(20px); border: 2px solid rgba(0, 230, 255, 0.3); border-radius: 16px; padding: 2rem; max-width: 500px; width: 90%; text-align: center;">
      <h2 style="color: #00e6ff; margin-bottom: 1.5rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
        <i class="fas fa-play"></i> Semi-Final Match
      </h2>
      <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem; font-size: 1.1rem;">
        Who won the match?
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
        <button class="winner-btn" onclick="declareWinner(${t}, '${e}')" style="flex: 1; padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #00e6ff, #0099cc); border: none; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;">
          ${e}
        </button>
        <button class="winner-btn" onclick="declareWinner(${t}, '${a}')" style="flex: 1; padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #ff00ff, #cc0099); border: none; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;">
          ${a}
        </button>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="padding: 0.8rem 1.5rem; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 8px; color: rgba(255, 255, 255, 0.8); cursor: pointer;">
        Cancel
      </button>
    </div>
  `,document.body.appendChild(n)};window.declareWinner=function(t,e){const a=window.currentTournament;a.bracket.semifinals[t].winner=e;const n=JSON.parse(localStorage.getItem("tournaments")||"[]"),s=n.findIndex(i=>i.id===a.id);s!==-1&&(n[s]=a,localStorage.setItem("tournaments",JSON.stringify(n)));const o=document.querySelector(".modal-overlay");o&&o.remove(),re(a),E(t===0?`🏆 ${e} wins Match 1! Match 2 is now unlocked! 🎉`:`🏆 ${e} wins Match 2! Both semi-finals complete! 🎉`,"success")};window.startFinalsMatch=function(t,e){E(`Starting Finals: ${t} vs ${e}`,"info");const a=document.createElement("div");a.className="modal-overlay",a.style.cssText=`
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
        <button class="winner-btn" onclick="declareChampion('${t}')" style="flex: 1; padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #00e6ff, #0099cc); border: none; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;">
          ${t}
        </button>
        <button class="winner-btn" onclick="declareChampion('${e}')" style="flex: 1; padding: 1.5rem; border-radius: 12px; background: linear-gradient(135deg, #ff00ff, #cc0099); border: none; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;">
          ${e}
        </button>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="padding: 0.8rem 1.5rem; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 8px; color: rgba(255, 255, 255, 0.8); cursor: pointer;">
        Cancel
      </button>
    </div>
  `,document.body.appendChild(a)};window.declareChampion=function(t){const e=window.currentTournament;e.bracket.finals.winner=t,e.status="completed";const a=JSON.parse(localStorage.getItem("tournaments")||"[]"),n=a.findIndex(o=>o.id===e.id);n!==-1&&(a[n]=e,localStorage.setItem("tournaments",JSON.stringify(a)));const s=document.querySelector(".modal-overlay");s&&s.remove(),re(e),E(`🏆 ${t} is the Tournament Champion! 🏆`,"success")};function J(t){const e=window.location.pathname;t.innerHTML="";let a=document.getElementById("screen-reader-live-region");a||(a=document.createElement("div"),a.id="screen-reader-live-region",a.setAttribute("aria-live","polite"),a.setAttribute("aria-atomic","true"),a.className="hidden-visually",document.body.appendChild(a));const s={"/":me,"/login":()=>ne(!0),"/register":()=>ne(!1),"/tournament":Le,"/profile":Pe,"/ACCOUNT":()=>ne(!0),"/logout":()=>(he(),me())}[e],o=document.createElement("div");if(o.className="page-content-wrapper",t.appendChild(o),s)o.appendChild(s()),document.title=ue(e);else{const i=document.createElement("div");i.className="page content-section",i.id="not-found",i.setAttribute("role","main"),i.innerHTML='<h1 class="section-title">404 - Page Not Found</h1><p style="text-align:center; color: var(--text-color-light);">The page you are looking for does not exist.</p>';const r=document.createElement("button");r.className="primary-button back-button",r.textContent="Go to Home",r.addEventListener("click",()=>A("/")),i.appendChild(r),i.appendChild(K()),o.appendChild(i),document.title="404 - Page Not Found - Neon Pong"}document.querySelectorAll(".navbar-link").forEach(i=>{i.classList.remove("active");const r=i.getAttribute("href"),l=window.location.pathname;(r===l||r==="/"&&l==="/")&&i.classList.add("active"),(l==="/tournament"&&r==="/tournament"||l==="/register"&&r==="/register")&&i.classList.add("active")})}document.addEventListener("DOMContentLoaded",async()=>{console.log("[App] DOM fully loaded, initializing application..."),console.log("[App] Initializing translation system..."),y.addListener(()=>{X()}),console.log("[App] Finding app container...");const t=document.getElementById("app");if(!t){console.error("[App] Failed to find #app element");return}console.log("[App] Creating navigation bar...");const e=Ie();if(document.body.insertBefore(e,t),console.log("[App] Checking login state..."),ke(),!document.getElementById("loading-overlay")){const a=ge();document.body.appendChild(a)}console.log("[App] Setting up routes..."),J(t),window.addEventListener("popstate",()=>{J(t)}),(window.location.pathname==="/"||window.location.pathname==="")&&A("/"),console.log("[App] Initialization complete")});window.addEventListener("popstate",()=>{const t=document.getElementById("app");t&&J(t)});window.switchTab=oe;
