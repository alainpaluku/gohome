
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Check, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Notifications = () => {
  const { t } = useTranslation();
  
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Motion Detected",
      message: "Motion detected in Backyard at 2:45 PM.",
      time: "15 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "warning",
      title: "Battery Low",
      message: "Thermostat battery is low (15%). Please replace soon.",
      time: "2 hours ago",
      read: false
    },
    {
      id: 3,
      type: "info",
      title: "Software Update",
      message: "New update available for your Smart Home system.",
      time: "Yesterday",
      read: true
    },
    {
      id: 4,
      type: "success",
      title: "Energy Saving Goal Met",
      message: "Congratulations! You've met your weekly energy saving goal.",
      time: "2 days ago",
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <Bell className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "success":
        return <Check className="h-5 w-5 text-green-500" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('notifications')}</h1>
        <Button variant="outline" size="sm">Mark all as read</Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            <Badge variant="secondary" className="ml-2">
              {notifications.filter(n => !n.read).length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                  <p className="mt-2 text-muted-foreground">No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg border ${notification.read ? "" : "bg-muted/30"}`}
                    >
                      <div className="flex items-start">
                        <div className="mr-4 mt-0.5">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{notification.title}</h3>
                            {!notification.read && (
                              <Badge variant="default" className="text-xs">New</Badge>
                            )}
                          </div>
                          <p className="mt-1 text-muted-foreground">{notification.message}</p>
                          <p className="mt-2 text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="unread" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.filter(n => !n.read).length === 0 ? (
                <div className="text-center py-8">
                  <Check className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                  <p className="mt-2 text-muted-foreground">No unread notifications</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications
                    .filter(notification => !notification.read)
                    .map((notification) => (
                      <div 
                        key={notification.id} 
                        className="p-4 rounded-lg border bg-muted/30"
                      >
                        <div className="flex items-start">
                          <div className="mr-4 mt-0.5">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{notification.title}</h3>
                              <Badge variant="default" className="text-xs">New</Badge>
                            </div>
                            <p className="mt-1 text-muted-foreground">{notification.message}</p>
                            <p className="mt-2 text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
