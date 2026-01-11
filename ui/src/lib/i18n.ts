
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translations
const resources = {
  fr: {
    translation: {
      // Authentication
      "login": "Connexion",
      "signup": "S'inscrire",
      "email": "Email",
      "password": "Mot de passe",
      "confirm_password": "Confirmer le mot de passe",
      "forgot_password": "Mot de passe oublié?",
      "login_with": "Se connecter avec",
      
      // Navigation
      "home": "Accueil",
      "statistics": "Statistiques",
      "activities": "Activités",
      "settings": "Configuration",
      "profile": "Profil",
      "notifications": "Notifications",
      "about": "À propos",
      
      // Home
      "hello": "Bonjour",
      "your_devices": "Vos appareils sont sous votre contrôle.",
      "living_room": "Salon",
      "bedroom": "Chambre",
      "bathroom": "Salle de bain",
      "kitchen": "Cuisine",
      "backyard": "Jardin",
      "terrace": "Terrasse",
      "add": "Ajouter",
      "see_all": "Voir tout",
      "devices": "Appareils",
      "rooms": "Pièces",
      "other_devices": "Autres appareils",
      "power_consumption": "Consommation d'énergie",
      "summary_energy": "Résumé de la consommation d'énergie",
      "today": "Aujourd'hui",
      "this_month": "Ce mois",
      
      // Statistics
      "power_usage": "Consommation d'énergie",
      "devices_usage": "Utilisation des appareils",
      "weekly": "Hebdomadaire",
      "monthly": "Mensuel",
      "yearly": "Annuel",
      
      // Devices
      "smart_lamp": "Lampe intelligente",
      "smart_tv": "TV intelligente",
      "thermostat": "Thermostat",
      "air_lighting": "Éclairage",
      "camera": "Caméra",
      "used_since": "Utilisé depuis",
      
      // Theme
      "dark_mode": "Mode sombre",
      "light_mode": "Mode clair",
      
      // Language
      "language": "Langue",
      "french": "Français",
      "english": "Anglais",
      "swahili": "Swahili",
      "lingala": "Lingala"
    }
  },
  en: {
    translation: {
      // Authentication
      "login": "Login",
      "signup": "Sign up",
      "email": "Email",
      "password": "Password",
      "confirm_password": "Confirm password",
      "forgot_password": "Forgot password?",
      "login_with": "Login with",
      
      // Navigation
      "home": "Home",
      "statistics": "Statistics",
      "activities": "Activities",
      "settings": "Settings",
      "profile": "Profile",
      "notifications": "Notifications",
      "about": "About",
      
      // Home
      "hello": "Hello",
      "your_devices": "Your devices are under your control.",
      "living_room": "Living Room",
      "bedroom": "Bedroom",
      "bathroom": "Bathroom",
      "kitchen": "Kitchen",
      "backyard": "Backyard",
      "terrace": "Terrace",
      "add": "Add",
      "see_all": "See all",
      "devices": "Devices",
      "rooms": "Rooms",
      "other_devices": "Other devices",
      "power_consumption": "Power consumption",
      "summary_energy": "Summary of energy consumption",
      "today": "Today",
      "this_month": "This month",
      
      // Statistics
      "power_usage": "Power usage",
      "devices_usage": "Devices usage",
      "weekly": "Weekly",
      "monthly": "Monthly", 
      "yearly": "Yearly",
      
      // Devices
      "smart_lamp": "Smart lamp",
      "smart_tv": "Smart TV",
      "thermostat": "Thermostat",
      "air_lighting": "Air lighting",
      "camera": "Camera",
      "used_since": "Used since",
      
      // Theme
      "dark_mode": "Dark mode",
      "light_mode": "Light mode",
      
      // Language
      "language": "Language",
      "french": "French",
      "english": "English",
      "swahili": "Swahili",
      "lingala": "Lingala"
    }
  },
  sw: {
    translation: {
      // Authentication
      "login": "Ingia",
      "signup": "Jisajili",
      "email": "Barua pepe",
      "password": "Nywila",
      "confirm_password": "Thibitisha nywila",
      "forgot_password": "Umesahau nywila?",
      "login_with": "Ingia na",
      
      // Navigation
      "home": "Nyumbani",
      "statistics": "Takwimu",
      "activities": "Shughuli",
      "settings": "Mipangilio",
      "profile": "Wasifu",
      "notifications": "Arifa",
      "about": "Kuhusu",
      
      // Home
      "hello": "Habari",
      "your_devices": "Vifaa vyako viko chini ya udhibiti wako.",
      "living_room": "Chumba cha kuishi",
      "bedroom": "Chumba cha kulala",
      "bathroom": "Bafu",
      "kitchen": "Jikoni",
      "backyard": "Ua wa nyuma",
      "terrace": "Terasi",
      "add": "Ongeza",
      "see_all": "Ona yote",
      "devices": "Vifaa",
      "rooms": "Vyumba",
      "other_devices": "Vifaa vingine",
      "power_consumption": "Matumizi ya umeme",
      "summary_energy": "Muhtasari wa matumizi ya nishati",
      "today": "Leo",
      "this_month": "Mwezi huu",
      
      // Statistics
      "power_usage": "Matumizi ya umeme",
      "devices_usage": "Matumizi ya vifaa",
      "weekly": "Kila wiki",
      "monthly": "Kila mwezi",
      "yearly": "Kila mwaka",
      
      // Devices
      "smart_lamp": "Taa janja",
      "smart_tv": "TV janja",
      "thermostat": "Themostati",
      "air_lighting": "Mwanga wa hewa",
      "camera": "Kamera",
      "used_since": "Imetumika tangu",
      
      // Theme
      "dark_mode": "Hali ya giza",
      "light_mode": "Hali ya mwanga",
      
      // Language
      "language": "Lugha",
      "french": "Kifaransa",
      "english": "Kiingereza",
      "swahili": "Kiswahili",
      "lingala": "Kilingala"
    }
  },
  ln: {
    translation: {
      // Authentication
      "login": "Kokota",
      "signup": "Komikoma",
      "email": "Email",
      "password": "Mot de passe",
      "confirm_password": "Ndimisa mot de passe",
      "forgot_password": "Obosani mot de passe?",
      "login_with": "Kokota na",
      
      // Navigation
      "home": "Ndako",
      "statistics": "Statistiques",
      "activities": "Misala",
      "settings": "Mibongisi",
      "profile": "Profil",
      "notifications": "Bibebi",
      "about": "Na ntina ya",
      
      // Home
      "hello": "Mbote",
      "your_devices": "Bisaleli na yo eza na se ya bokonzi na yo.",
      "living_room": "Salle ya kofanda",
      "bedroom": "Chambre",
      "bathroom": "Chambre ya kosokola",
      "kitchen": "Cuisine",
      "backyard": "Jardin",
      "terrace": "Terrasse",
      "add": "Kobakisa",
      "see_all": "Tala nionso",
      "devices": "Bisaleli",
      "rooms": "Bashambre",
      "other_devices": "Bisaleli mosusu",
      "power_consumption": "Bosaleli courant",
      "summary_energy": "Résumé ya bosaleli énergie",
      "today": "Lelo",
      "this_month": "Sanza oyo",
      
      // Statistics
      "power_usage": "Bosaleli courant",
      "devices_usage": "Bosaleli bisaleli",
      "weekly": "Poso na poso",
      "monthly": "Sanza na sanza",
      "yearly": "Mbula na mbula",
      
      // Devices
      "smart_lamp": "Mwinda ya mayele",
      "smart_tv": "TV ya mayele",
      "thermostat": "Thermostat",
      "air_lighting": "Mwinda ya mopepe",
      "camera": "Caméra",
      "used_since": "Esalemi uta",
      
      // Theme
      "dark_mode": "Mode ya molili",
      "light_mode": "Mode ya pole",
      
      // Language
      "language": "Lokota",
      "french": "Français",
      "english": "Anglais",
      "swahili": "Swahili",
      "lingala": "Lingala"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr", // Default language
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
