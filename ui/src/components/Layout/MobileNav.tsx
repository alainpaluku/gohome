import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, BarChart, Activity, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "home", href: "/", icon: Home },
  { name: "statistics", href: "/statistics", icon: BarChart },
  { name: "activities", href: "/activities", icon: Activity },
  { name: "settings", href: "/settings", icon: Settings },
];

const MobileNav = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[72px] border-t bg-card/80 backdrop-blur-sm md:hidden z-50">
      <nav className="flex justify-around items-center h-full px-2 max-w-sm mx-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              to={item.href} 
              className={cn(
                "relative flex flex-col items-center justify-center w-14 sm:w-16 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 h-0.5 w-8 sm:w-10 -translate-x-1/2 rounded-full bg-primary" />
              )}
              <Icon className={cn(
                "h-[18px] w-[18px] sm:h-5 sm:w-5 transition-all",
                isActive && "scale-110"
              )} />
              <span className="text-[10px] sm:text-xs mt-1 font-medium">{t(item.name)}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNav;
