import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, BarChart, Activity, Settings, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "home", href: "/", icon: Home },
  { name: "statistics", href: "/statistics", icon: BarChart },
  { name: "activities", href: "/activities", icon: Activity },
  { name: "settings", href: "/settings", icon: Settings },
  { name: "about", href: "/about", icon: Info },
];

const Sidebar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="hidden md:flex h-full flex-col fixed left-0 top-[64px] bottom-0 w-16 md:w-20 lg:w-24 bg-card dark:bg-card border-r">
      <div className="flex flex-col items-center justify-start pt-6 space-y-6 flex-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.name} to={item.href} className="w-full flex justify-center">
              <Button
                variant={isActive ? "default" : "ghost"}
                size="icon"
                className={cn(
                  "relative h-12 w-12 rounded-full",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{t(item.name)}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
