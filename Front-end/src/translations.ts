// Translation system for Neon Pong
export interface Translations {
  // Navigation
  nav: {
    home: string;
    tournaments: string;
    logout: string;
    profile: string;
    account: string;
  };

  // Font size controls
  fontControls: {
    label: string;
    decrease: string;
    increase: string;
  };

  // Home page
  home: {
    title: string;
    tagline: string;
    description: string;
    registerNow: string;
    meetTheTeam: string;
  };

  // Tournament page
  tournaments: {
    elite: string;
    championship: string;
    arena: string;
    subtitle: string;
    stats: {
      elitePlayers: string;
      champion: string;
      glory: string;
    };
    features: {
      strategic: {
        title: string;
        description: string;
      };
      prestige: {
        title: string;
        description: string;
      };
      competition: {
        title: string;
        description: string;
      };
    };
    createCard: {
      title: string;
      description: string;
      benefits: {
        bracket: string;
        progress: string;
        ceremony: string;
      };
      button: string;
    };
    loginRequired: {
      title: string;
      description: string;
      benefits: {
        access: string;
        status: string;
      };
      button: string;
    };
  };

  // Profile page
  profile: {
    title: string;
    tabs: {
      dashboard: string;
      settings: string;
      statistics: string;
      friends: string;
      history: string;
    };
    dashboard: {
      welcome: string;
      overview: string;
      rank: string;
      of: string;
      players: string;
      winRate: string;
      streak: string;
      best: string;
      playTime: string;
      avg: string;
      analytics: string;
      weekly: string;
      wins: string;
      losses: string;
      rating: string;
      recent: string;
      viewAll: string;
      advanced: string;
      avgScore: string;
      perfectGames: string;
      comebacks: string;
      preferredMode: string;
      achievements: string;
      winStreakMaster: string;
      winStreakDesc: string;
      centuryClub: string;
      centuryDesc: string;
      perfectPlayer: string;
      perfectDesc: string;
      socialButterfly: string;
      socialDesc: string;
    };
    settings: {
      changeAvatar: string;
      username: string;
      displayName: string;
      skillLevel: string;
      beginner: string;
      intermediate: string;
      expert: string;
      bio: string;
      bioPlaceholder: string;
      advancedSettings: string;
      newPassword: string;
      passwordPlaceholder: string;
      confirmPassword: string;
      confirmPasswordPlaceholder: string;
      gameHistory: string;
      clearHistory: string;
      accountDeletion: string;
      deleteAccount: string;
      deleteWarning: string;
      warningTitle: string;
      warningDescription: string;
      saveChanges: string;
    };
    statistics: {
      title: string;
      gamesPlayed: string;
      wins: string;
      losses: string;
      winRate: string;
    };
    friends: {
      title: string;
      addFriend: string;
      online: string;
      lastSeen: string;
      challenge: string;
    };
    history: {
      title: string;
      victory: string;
      defeat: string;
      match1v1: string;
      tournament: string;
      min: string;
    };
  };

  // Auth pages
  auth: {
    login: {
      title: string;
      username: string;
      password: string;
      button: string;
      backToHome: string;
      noAccount: string;
      createAccount: string;
    };
    register: {
      title: string;
      email: string;
      username: string;
      password: string;
      confirmPassword: string;
      button: string;
      backToHome: string;
      hasAccount: string;
      signIn: string;
    };
  };

  // Common
  common: {
    loading: string;
    neonPong: string;
  };

  // Language names
  languages: {
    english: string;
    french: string;
    spanish: string;
  };
}

export const translations: Record<string, Translations> = {
  en: {
    nav: {
      home: "HOME",
      tournaments: "TOURNAMENTS", 
      logout: "LOGOUT",
      profile: "PROFILE",
      account: "ACCOUNT"
    },
    fontControls: {
      label: "Font size:",
      decrease: "DECREASE FONT SIZE",
      increase: "INCREASE FONT SIZE"
    },
    home: {
      title: "NEON PONG",
      tagline: "THE ULTIMATE RETRO-FUTURISTIC ARCADE EXPERIENCE.",
      description: "Challenge your friends in a fast-paced game of skill and reflexes.",
      registerNow: "REGISTER NOW",
      meetTheTeam: "MEET THE TEAM"
    },
    tournaments: {
      elite: "ELITE",
      championship: "CHAMPIONSHIP",
      arena: "ARENA",
      subtitle: "Where legends are born and champions rise to glory",
      stats: {
        elitePlayers: "ELITE PLAYERS",
        champion: "CHAMPION",
        glory: "GLORY"
      },
      features: {
        strategic: {
          title: "Strategic Gameplay",
          description: "Master the art of precision and timing"
        },
        prestige: {
          title: "Prestige System",
          description: "Earn your place among the elite"
        },
        competition: {
          title: "Intense Competition",
          description: "Face the ultimate challenge"
        }
      },
      createCard: {
        title: "Forge Your Legacy",
        description: "Create an exclusive 4-player tournament and witness the birth of a new champion",
        benefits: {
          bracket: "Custom Bracket System",
          progress: "Real-time Match Progress",
          ceremony: "Championship Ceremony"
        },
        button: "Create Elite Tournament"
      },
      loginRequired: {
        title: "Exclusive Access Required",
        description: "Join our elite community to unlock tournament creation privileges",
        benefits: {
          access: "VIP Tournament Access",
          status: "Elite Player Status"
        },
        button: "Unlock Access"
      }
    },
    profile: {
      title: "USER PROFILE",
      tabs: {
        dashboard: "DASHBOARD",
        settings: "PROFILE SETTINGS",
        statistics: "STATISTICS",
        friends: "FRIENDS",
        history: "MATCH HISTORY"
      },
      dashboard: {
        welcome: "WELCOME BACK, PRO PLAYER!",
        overview: "Here's your gaming overview and performance insights",
        rank: "Current Rank",
        of: "of",
        players: "players",
        winRate: "Win Rate",
        streak: "Current Streak",
        best: "Best:",
        playTime: "Total Play Time",
        avg: "Avg:",
        analytics: "PERFORMANCE ANALYTICS",
        weekly: "Weekly Performance",
        wins: "Wins",
        losses: "Losses",
        rating: "Skill Rating Progression",
        recent: "Recent Matches",
        viewAll: "VIEW ALL MATCHES",
        advanced: "Advanced Statistics",
        avgScore: "AVERAGE SCORE",
        perfectGames: "PERFECT GAMES",
        comebacks: "COMEBACKS",
        preferredMode: "PREFERRED MODE",
        achievements: "ACHIEVEMENTS & GOALS",
        winStreakMaster: "Win Streak Master",
        winStreakDesc: "Win 10 games in a row",
        centuryClub: "Century Club",
        centuryDesc: "Play 100 total games",
        perfectPlayer: "Perfect Player",
        perfectDesc: "Win a game 21-0",
        socialButterfly: "Social Butterfly",
        socialDesc: "Add 10 friends"
      },
      settings: {
        changeAvatar: "CHANGE AVATAR",
        username: "USERNAME",
        displayName: "DISPLAY NAME",
        skillLevel: "SKILL LEVEL",
        beginner: "BEGINNER",
        intermediate: "INTERMEDIATE",
        expert: "EXPERT",
        bio: "BIO (OPTIONAL)",
        bioPlaceholder: "Tell others about yourself...",
        advancedSettings: "ADVANCED SETTINGS",
        newPassword: "New Password",
        passwordPlaceholder: "Leave blank to keep current",
        confirmPassword: "Confirm Password",
        confirmPasswordPlaceholder: "Confirm your new password",
        gameHistory: "GAME HISTORY",
        clearHistory: "Clear History",
        accountDeletion: "ACCOUNT DELETION",
        deleteAccount: "Delete Account",
        deleteWarning: "⚠️ This action cannot be undone",
        warningTitle: "Warning: Permanent Action",
        warningDescription: "Once you delete your profile, there is no going back. This action cannot be undone and will permanently remove:",
        saveChanges: "SAVE CHANGES"
      },
      statistics: {
        title: "PLAYER STATISTICS",
        gamesPlayed: "GAMES PLAYED",
        wins: "WINS",
        losses: "LOSSES",
        winRate: "WIN RATE"
      },
      friends: {
        title: "FRIENDS LIST",
        addFriend: "ADD FRIEND",
        online: "Online",
        lastSeen: "Last seen",
        challenge: "CHALLENGE"
      },
      history: {
        title: "MATCH HISTORY",
        victory: "Victory",
        defeat: "Defeat",
        match1v1: "1v1 Match",
        tournament: "Tournament",
        min: "min"
      }
    },
    auth: {
      login: {
        title: "Login to Neon Pong",
        username: "USERNAME",
        password: "PASSWORD",
        button: "LOGIN",
        backToHome: "BACK TO HOME",
        noAccount: "Don't have an account?",
        createAccount: "Create an ACCOUNT"
      },
      register: {
        title: "Register for Neon Pong",
        email: "EMAIL",
        username: "USERNAME",
        password: "PASSWORD",
        confirmPassword: "CONFIRM PASSWORD",
        button: "REGISTER",
        backToHome: "BACK TO HOME",
        hasAccount: "Already have an account?",
        signIn: "Sign in to existing ACCOUNT"
      }
    },
    common: {
      loading: "Loading...",
      neonPong: "Neon Pong"
    },
    languages: {
      english: "English",
      french: "Français",
      spanish: "Español"
    }
  },

  fr: {
    nav: {
      home: "ACCUEIL",
      tournaments: "TOURNOIS",
      logout: "DÉCONNEXION",
      profile: "PROFIL",
      account: "COMPTE"
    },
    fontControls: {
      label: "Taille de police:",
      decrease: "DIMINUER LA TAILLE",
      increase: "AUGMENTER LA TAILLE"
    },
    home: {
      title: "NEON PONG",
      tagline: "L'EXPÉRIENCE ARCADE RÉTRO-FUTURISTE ULTIME.",
      description: "Défiez vos amis dans un jeu rapide d'adresse et de réflexes.",
      registerNow: "S'INSCRIRE MAINTENANT",
      meetTheTeam: "RENCONTRER L'ÉQUIPE"
    },
    tournaments: {
      elite: "ÉLITE",
      championship: "CHAMPIONNAT",
      arena: "ARÈNE",
      subtitle: "Où naissent les légendes et s'élèvent les champions",
      stats: {
        elitePlayers: "JOUEURS D'ÉLITE",
        champion: "CHAMPION",
        glory: "GLOIRE"
      },
      features: {
        strategic: {
          title: "Gameplay Stratégique",
          description: "Maîtrisez l'art de la précision et du timing"
        },
        prestige: {
          title: "Système de Prestige",
          description: "Gagnez votre place parmi l'élite"
        },
        competition: {
          title: "Compétition Intense",
          description: "Relevez le défi ultime"
        }
      },
      createCard: {
        title: "Forgez Votre Légende",
        description: "Créez un tournoi exclusif à 4 joueurs et assistez à la naissance d'un nouveau champion",
        benefits: {
          bracket: "Système de Bracket Personnalisé",
          progress: "Progression en Temps Réel",
          ceremony: "Cérémonie de Championnat"
        },
        button: "Créer Tournoi Élite"
      },
      loginRequired: {
        title: "Accès Exclusif Requis",
        description: "Rejoignez notre communauté d'élite pour débloquer les privilèges de création de tournois",
        benefits: {
          access: "Accès VIP aux Tournois",
          status: "Statut de Joueur Élite"
        },
        button: "Débloquer l'Accès"
      }
    },
    profile: {
      title: "PROFIL UTILISATEUR",
      tabs: {
        dashboard: "TABLEAU DE BORD",
        settings: "PARAMÈTRES DU PROFIL",
        statistics: "STATISTIQUES",
        friends: "AMIS",
        history: "HISTORIQUE DES MATCHS"
      },
      dashboard: {
        welcome: "BON RETOUR, JOUEUR PRO !",
        overview: "Voici votre aperçu de jeu et vos informations de performance",
        rank: "Rang Actuel",
        of: "sur",
        players: "joueurs",
        winRate: "Taux de Victoire",
        streak: "Série Actuelle",
        best: "Meilleur:",
        playTime: "Temps de Jeu Total",
        avg: "Moy:",
        analytics: "ANALYSES DE PERFORMANCE",
        weekly: "Performance Hebdomadaire",
        wins: "Victoires",
        losses: "Défaites",
        rating: "Progression du Classement",
        recent: "Matchs Récents",
        viewAll: "VOIR TOUS LES MATCHS",
        advanced: "Statistiques Avancées",
        avgScore: "SCORE MOYEN",
        perfectGames: "JEUX PARFAITS",
        comebacks: "RETOURS",
        preferredMode: "MODE PRÉFÉRÉ",
        achievements: "SUCCÈS ET OBJECTIFS",
        winStreakMaster: "Maître des Séries",
        winStreakDesc: "Gagner 10 jeux d'affilée",
        centuryClub: "Club du Centenaire",
        centuryDesc: "Jouer 100 jeux au total",
        perfectPlayer: "Joueur Parfait",
        perfectDesc: "Gagner un jeu 21-0",
        socialButterfly: "Papillon Social",
        socialDesc: "Ajouter 10 amis"
      },
      settings: {
        changeAvatar: "CHANGER L'AVATAR",
        username: "NOM D'UTILISATEUR",
        displayName: "NOM D'AFFICHAGE",
        skillLevel: "NIVEAU DE COMPÉTENCE",
        beginner: "DÉBUTANT",
        intermediate: "INTERMÉDIAIRE",
        expert: "EXPERT",
        bio: "BIO (OPTIONNEL)",
        bioPlaceholder: "Parlez de vous aux autres...",
        advancedSettings: "PARAMÈTRES AVANCÉS",
        newPassword: "Nouveau mot de passe",
        passwordPlaceholder: "Laisser vide pour conserver l'actuel",
        confirmPassword: "Confirmer le mot de passe",
        confirmPasswordPlaceholder: "Confirmez votre nouveau mot de passe",
        gameHistory: "HISTORIQUE DU JEU",
        clearHistory: "Effacer l'historique",
        accountDeletion: "SUPPRESSION DU COMPTE",
        deleteAccount: "Supprimer le compte",
        deleteWarning: "⚠️ Cette action ne peut pas être annulée",
        warningTitle: "Attention : Action permanente",
        warningDescription: "Une fois que vous supprimez votre profil, il n'y a pas de retour en arrière. Cette action ne peut pas être annulée et supprimera définitivement :",
        saveChanges: "SAUVEGARDER LES MODIFICATIONS"
      },
      statistics: {
        title: "STATISTIQUES DU JOUEUR",
        gamesPlayed: "JEUX JOUÉS",
        wins: "VICTOIRES",
        losses: "DÉFAITES",
        winRate: "TAUX DE VICTOIRE"
      },
      friends: {
        title: "LISTE D'AMIS",
        addFriend: "AJOUTER UN AMI",
        online: "En ligne",
        lastSeen: "Vu pour la dernière fois",
        challenge: "DÉFIER"
      },
      history: {
        title: "HISTORIQUE DES MATCHS",
        victory: "Victoire",
        defeat: "Défaite",
        match1v1: "Match 1v1",
        tournament: "Tournoi",
        min: "min"
      }
    },
    auth: {
      login: {
        title: "Connexion à Neon Pong",
        username: "NOM D'UTILISATEUR",
        password: "MOT DE PASSE",
        button: "CONNEXION",
        backToHome: "RETOUR À L'ACCUEIL",
        noAccount: "Vous n'avez pas de compte ?",
        createAccount: "Créer un COMPTE"
      },
      register: {
        title: "S'inscrire à Neon Pong",
        email: "EMAIL",
        username: "NOM D'UTILISATEUR",
        password: "MOT DE PASSE",
        confirmPassword: "CONFIRMER LE MOT DE PASSE",
        button: "S'INSCRIRE",
        backToHome: "RETOUR À L'ACCUEIL",
        hasAccount: "Vous avez déjà un compte ?",
        signIn: "Se connecter au COMPTE existant"
      }
    },
    common: {
      loading: "Chargement...",
      neonPong: "Neon Pong"
    },
    languages: {
      english: "English",
      french: "Français",
      spanish: "Español"
    }
  },

  es: {
    nav: {
      home: "INICIO",
      tournaments: "TORNEOS",
      logout: "CERRAR SESIÓN",
      profile: "PERFIL",
      account: "CUENTA"
    },
    fontControls: {
      label: "Tamaño de fuente:",
      decrease: "DISMINUIR TAMAÑO",
      increase: "AUMENTAR TAMAÑO"
    },
    home: {
      title: "NEON PONG",
      tagline: "LA EXPERIENCIA ARCADE RETRO-FUTURISTA DEFINITIVA.",
      description: "Desafía a tus amigos en un juego rápido de habilidad y reflejos.",
      registerNow: "REGISTRARSE AHORA",
      meetTheTeam: "CONOCER AL EQUIPO"
    },
    tournaments: {
      elite: "ÉLITE",
      championship: "CAMPEONATO",
      arena: "ARENA",
      subtitle: "Donde nacen las leyendas y se alzan los campeones",
      stats: {
        elitePlayers: "JUGADORES ÉLITE",
        champion: "CAMPEÓN",
        glory: "GLORIA"
      },
      features: {
        strategic: {
          title: "Jugabilidad Estratégica",
          description: "Domina el arte de la precisión y el timing"
        },
        prestige: {
          title: "Sistema de Prestigio",
          description: "Gana tu lugar entre la élite"
        },
        competition: {
          title: "Competencia Intensa",
          description: "Enfrenta el desafío definitivo"
        }
      },
      createCard: {
        title: "Forja Tu Legado",
        description: "Crea un torneo exclusivo de 4 jugadores y presencia el nacimiento de un nuevo campeón",
        benefits: {
          bracket: "Sistema de Bracket Personalizado",
          progress: "Progreso de Partida en Tiempo Real",
          ceremony: "Ceremonia de Campeonato"
        },
        button: "Crear Torneo Élite"
      },
      loginRequired: {
        title: "Acceso Exclusivo Requerido",
        description: "Únete a nuestra comunidad élite para desbloquear privilegios de creación de torneos",
        benefits: {
          access: "Acceso VIP a Torneos",
          status: "Estado de Jugador Élite"
        },
        button: "Desbloquear Acceso"
      }
    },
    profile: {
      title: "PERFIL DE USUARIO",
      tabs: {
        dashboard: "PANEL DE CONTROL",
        settings: "CONFIGURACIÓN DEL PERFIL",
        statistics: "ESTADÍSTICAS",
        friends: "AMIGOS",
        history: "HISTORIAL DE PARTIDAS"
      },
      dashboard: {
        welcome: "¡BIENVENIDO DE VUELTA, JUGADOR PRO!",
        overview: "Aquí está tu resumen de juego e información de rendimiento",
        rank: "Rango Actual",
        of: "de",
        players: "jugadores",
        winRate: "Tasa de Victoria",
        streak: "Racha Actual",
        best: "Mejor:",
        playTime: "Tiempo Total de Juego",
        avg: "Prom:",
        analytics: "ANÁLISIS DE RENDIMIENTO",
        weekly: "Rendimiento Semanal",
        wins: "Victorias",
        losses: "Derrotas",
        rating: "Progresión de Clasificación",
        recent: "Partidas Recientes",
        viewAll: "VER TODAS LAS PARTIDAS",
        advanced: "Estadísticas Avanzadas",
        avgScore: "PUNTUACIÓN PROMEDIO",
        perfectGames: "JUEGOS PERFECTOS",
        comebacks: "REMONTAS",
        preferredMode: "MODO PREFERIDO",
        achievements: "LOGROS Y OBJETIVOS",
        winStreakMaster: "Maestro de Rachas",
        winStreakDesc: "Ganar 10 juegos seguidos",
        centuryClub: "Club del Centenario",
        centuryDesc: "Jugar 100 juegos en total",
        perfectPlayer: "Jugador Perfecto",
        perfectDesc: "Ganar un juego 21-0",
        socialButterfly: "Mariposa Social",
        socialDesc: "Agregar 10 amigos"
      },
      settings: {
        changeAvatar: "CAMBIAR AVATAR",
        username: "NOMBRE DE USUARIO",
        displayName: "NOMBRE PARA MOSTRAR",
        skillLevel: "NIVEL DE HABILIDAD",
        beginner: "PRINCIPIANTE",
        intermediate: "INTERMEDIO",
        expert: "EXPERTO",
        bio: "BIO (OPCIONAL)",
        bioPlaceholder: "Cuéntales a otros sobre ti...",
        advancedSettings: "CONFIGURACIÓN AVANZADA",
        newPassword: "Nueva contraseña",
        passwordPlaceholder: "Dejar en blanco para mantener la actual",
        confirmPassword: "Confirmar contraseña",
        confirmPasswordPlaceholder: "Confirma tu nueva contraseña",
        gameHistory: "HISTORIAL DEL JUEGO",
        clearHistory: "Borrar historial",
        accountDeletion: "ELIMINACIÓN DE CUENTA",
        deleteAccount: "Eliminar cuenta",
        deleteWarning: "⚠️ Esta acción no se puede deshacer",
        warningTitle: "Advertencia: Acción permanente",
        warningDescription: "Una vez que elimines tu perfil, no hay vuelta atrás. Esta acción no se puede deshacer y eliminará permanentemente:",
        saveChanges: "GUARDAR CAMBIOS"
      },
      statistics: {
        title: "ESTADÍSTICAS DEL JUGADOR",
        gamesPlayed: "JUEGOS JUGADOS",
        wins: "VICTORIAS",
        losses: "DERROTAS",
        winRate: "TASA DE VICTORIA"
      },
      friends: {
        title: "LISTA DE AMIGOS",
        addFriend: "AGREGAR AMIGO",
        online: "En línea",
        lastSeen: "Visto por última vez",
        challenge: "DESAFIAR"
      },
      history: {
        title: "HISTORIAL DE PARTIDAS",
        victory: "Victoria",
        defeat: "Derrota",
        match1v1: "Partida 1v1",
        tournament: "Torneo",
        min: "min"
      }
    },
    auth: {
      login: {
        title: "Iniciar Sesión en Neon Pong",
        username: "NOMBRE DE USUARIO",
        password: "CONTRASEÑA",
        button: "INICIAR SESIÓN",
        backToHome: "VOLVER AL INICIO",
        noAccount: "¿No tienes una cuenta?",
        createAccount: "Crear una CUENTA"
      },
      register: {
        title: "Registrarse en Neon Pong",
        email: "EMAIL",
        username: "NOMBRE DE USUARIO",
        password: "CONTRASEÑA",
        confirmPassword: "CONFIRMAR CONTRASEÑA",
        button: "REGISTRARSE",
        backToHome: "VOLVER AL INICIO",
        hasAccount: "¿Ya tienes una cuenta?",
        signIn: "Iniciar sesión en CUENTA existente"
      }
    },
    common: {
      loading: "Cargando...",
      neonPong: "Neon Pong"
    },
    languages: {
      english: "English",
      french: "Français",
      spanish: "Español"
    }
  }
};

// Language manager class
export class LanguageManager {
  private currentLanguage: string = 'en';
  private listeners: Array<() => void> = [];

  constructor() {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('neonPongLanguage');
    if (savedLanguage && translations[savedLanguage]) {
      this.currentLanguage = savedLanguage;
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  setLanguage(language: string): void {
    if (translations[language]) {
      this.currentLanguage = language;
      localStorage.setItem('neonPongLanguage', language);
      this.notifyListeners();
    }
  }

  getTranslations(): Translations {
    return translations[this.currentLanguage];
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value: any = this.getTranslations();
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }

  addListener(callback: () => void): void {
    this.listeners.push(callback);
  }

  removeListener(callback: () => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

// Global language manager instance
export const languageManager = new LanguageManager();
