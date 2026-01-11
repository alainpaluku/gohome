import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Statistics = () => {
  const { t } = useTranslation();
  const [chartPeriod, setChartPeriod] = useState("weekly");
  
  // Power usage data for weekly view
  const weeklyData = [
    { day: 'Sun', usage: 42 },
    { day: 'Mon', usage: 53 },
    { day: 'Tue', usage: 86 },
    { day: 'Wed', usage: 55 },
    { day: 'Thu', usage: 47 },
    { day: 'Fri', usage: 65 },
    { day: 'Sat', usage: 73 },
  ];
  
  // Power usage data for monthly view
  const monthlyData = [
    { week: 'Week 1', usage: 320 },
    { week: 'Week 2', usage: 350 },
    { week: 'Week 3', usage: 410 },
    { week: 'Week 4', usage: 375 },
  ];
  
  // Device usage data
  const devicesUsage = [
    { name: t('smart_lamp'), usage: 18 },
    { name: t('smart_tv'), usage: 45 },
    { name: t('thermostat'), usage: 26 },
    { name: t('air_lighting'), usage: 17 },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t('statistics')}</h1>
      
      <Tabs defaultValue={chartPeriod} onValueChange={setChartPeriod}>
        <TabsList>
          <TabsTrigger value="weekly">{t('weekly')}</TabsTrigger>
          <TabsTrigger value="monthly">{t('monthly')}</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>{t('power_usage')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartPeriod === "weekly" ? weeklyData : monthlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey={chartPeriod === "weekly" ? "day" : "week"} 
                  stroke="currentColor" 
                  opacity={0.6} 
                />
                <YAxis stroke="currentColor" opacity={0.6} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: "8px", 
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)" 
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="usage" 
                  name="kWh" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex justify-between">
            <div>
              <p className="text-3xl font-bold">532.21 kWh</p>
              <p className="text-muted-foreground text-sm">+5.23% from last week</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">$78.35</p>
              <p className="text-muted-foreground text-sm">Average monthly cost</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('devices_usage')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {devicesUsage.map((device) => (
              <div key={device.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="font-medium">{device.name}</span>
                  </div>
                  <span className="font-medium">{device.usage} kWh</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${(device.usage / 50) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
