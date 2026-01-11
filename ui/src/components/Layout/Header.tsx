import { useTranslation } from "react-i18next";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 h-[64px] px-3 sm:px-4 md:px-6 flex items-center justify-between border-b bg-card/80 backdrop-blur-sm z-50">
      <div className="flex items-center">
        <h1 className="text-lg sm:text-xl font-bold md:ml-20 lg:ml-24">Smart Home</h1>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <Link to="/notifications">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">{t('notifications')}</span>
          </Button>
        </Link>
        
        <Link to="/profile">
          <Avatar className="cursor-pointer hover:opacity-90 transition-opacity">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default Header;
