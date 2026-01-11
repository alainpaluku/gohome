
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Activities = () => {
  const { t } = useTranslation();
  
  const todayActivities = [
    {
      id: 1,
      device: t('smart_lamp'),
      action: "turned on",
      time: "08:35",
      user: "Adrian",
      room: t('living_room')
    },
    {
      id: 2,
      device: t('thermostat'),
      action: "temperature set to 24°C",
      time: "09:12",
      user: "Adrian",
      room: t('living_room')
    },
    {
      id: 3,
      device: t('camera'),
      action: "motion detected",
      time: "11:47",
      user: "System",
      room: t('backyard')
    },
    {
      id: 4,
      device: t('smart_tv'),
      action: "turned off",
      time: "14:23",
      user: "Sophie",
      room: t('living_room')
    },
    {
      id: 5,
      device: t('smart_lamp'),
      action: "brightness adjusted to 80%",
      time: "18:05",
      user: "Adrian",
      room: t('bedroom')
    }
  ];
  
  const yesterdayActivities = [
    {
      id: 6,
      device: t('thermostat'),
      action: "temperature set to 22°C",
      time: "07:35",
      user: "Adrian",
      room: t('bedroom')
    },
    {
      id: 7,
      device: t('smart_lamp'),
      action: "turned off",
      time: "23:12",
      user: "Sophie",
      room: t('living_room')
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t('activities')}</h1>
      
      <Tabs defaultValue="today">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Today's Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {todayActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-semibold">{activity.time.split(':')[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">{activity.device}</h3>
                        <Badge variant="outline">{activity.room}</Badge>
                      </div>
                      <p className="text-muted-foreground">{activity.action}</p>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <span>{activity.user}</span>
                        <span className="mx-2">•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="yesterday">
          <Card>
            <CardHeader>
              <CardTitle>Yesterday's Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {yesterdayActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-semibold">{activity.time.split(':')[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">{activity.device}</h3>
                        <Badge variant="outline">{activity.room}</Badge>
                      </div>
                      <p className="text-muted-foreground">{activity.action}</p>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <span>{activity.user}</span>
                        <span className="mx-2">•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Activities;
