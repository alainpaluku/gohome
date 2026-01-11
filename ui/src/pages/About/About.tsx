
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, Code, Globe, Shield, HelpCircle } from "lucide-react";

const About = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t('about')}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5 text-primary" />
            Smart Home Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Welcome to Smart Home Hub</h3>
              <p className="text-muted-foreground">
                Your complete solution for managing all your smart home devices from one place. 
                Monitor, control, and automate your home with our intuitive and powerful interface.
              </p>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Code className="mr-2 h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Version</h4>
                </div>
                <p className="text-muted-foreground">1.0.0</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Languages</h4>
                </div>
                <p className="text-muted-foreground">4 languages supported</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Security</h4>
                </div>
                <p className="text-muted-foreground">End-to-end encryption</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Features</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Monitor all your smart devices</li>
                <li>Real-time energy consumption tracking</li>
                <li>Automated schedules and routines</li>
                <li>Security and motion detection</li>
                <li>Climate control and optimization</li>
                <li>Multi-language support</li>
                <li>Light and dark themes</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <div className="flex items-center mb-2">
                <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Help & Support</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                If you need assistance or have questions about your Smart Home Hub, 
                our support team is ready to help.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Contact Support</h4>
                  <p className="text-sm text-muted-foreground">support@smarthomehub.com</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Documentation</h4>
                  <p className="text-sm text-muted-foreground">Access our user guides and tutorials</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
