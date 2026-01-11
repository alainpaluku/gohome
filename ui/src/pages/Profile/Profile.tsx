
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Shield, Key, LifeBuoy, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t('profile')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/lovable-uploads/dae0a347-6f44-418c-bdd5-bab6e4b3412e.png" alt="User avatar" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-semibold">Adrian Donovan</h2>
              <p className="text-muted-foreground">adrian@example.com</p>
              <Button className="mt-4" variant="outline" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Account Security</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1 mb-3">
                  Increase your account's security by enabling 2FA and reviewing recent logins.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Enable Two-Factor</Button>
                  <Button variant="outline" size="sm">Recent Logins</Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center">
                  <Key className="mr-2 h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Password</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1 mb-3">
                  Update your password regularly to maintain account security.
                </p>
                <Button variant="outline" size="sm">Change Password</Button>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center">
                  <LifeBuoy className="mr-2 h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Support</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1 mb-3">
                  Get help with your account or report any issues.
                </p>
                <Button variant="outline" size="sm">Contact Support</Button>
              </div>
              
              <Separator />
              
              <Button variant="destructive" size="sm" className="mt-4">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
