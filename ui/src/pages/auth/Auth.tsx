
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";

const Auth = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [authTab, setAuthTab] = useState("login");
  
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Dans une vraie application, on ajouterait ici la logique d'authentification
    
    // Redirection vers la page d'accueil après authentification réussie
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 md:p-6">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className={`absolute inset-0 ${theme === "dark" ? "bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" : "bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"}`}></div>
      </div>
      <Card className="w-full max-w-md border-none shadow-lg bg-card/90 backdrop-blur-sm animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Smart Home</CardTitle>
          <CardDescription>Gérez votre maison intelligente depuis n'importe où</CardDescription>
        </CardHeader>
        <Tabs value={authTab} onValueChange={setAuthTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">{t('login')}</TabsTrigger>
            <TabsTrigger value="signup">{t('signup')}</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleAuth}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input id="email" type="email" placeholder="example@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t('password')}</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      {t('forgot_password')}
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full">{t('login')}</Button>
                <div className="text-sm text-center text-muted-foreground">
                  {t('login_with')}
                </div>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="icon">
                    G
                  </Button>
                  <Button variant="outline" size="icon">
                    F
                  </Button>
                  <Button variant="outline" size="icon">
                    A
                  </Button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleAuth}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t('email')}</Label>
                  <Input id="signup-email" type="email" placeholder="example@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t('password')}</Label>
                  <Input id="signup-password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t('confirm_password')}</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full">{t('signup')}</Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
