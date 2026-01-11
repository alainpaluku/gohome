import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import DeviceCard from "./DeviceCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Home = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeRoom, setActiveRoom] = useState("living_room");
  const [open, setOpen] = useState(false);

  const rooms = [
    { id: "living_room", name: "living_room" },
    { id: "bedroom", name: "bedroom" },
    { id: "bathroom", name: "bathroom" },
    { id: "kitchen", name: "kitchen" },
    { id: "backyard", name: "backyard" },
    { id: "terrace", name: "terrace" },
  ];
  
  // Devices data
  const [devices, setDevices] = useState([
    { 
      id: "1", 
      name: t('smart_lamp'), 
      icon: "https://cdn-icons-png.flaticon.com/512/3602/3602145.png", 
      room: "living_room", 
      isOn: true, 
      since: "09:30" 
    },
    { 
      id: "2", 
      name: t('thermostat'), 
      icon: "https://cdn-icons-png.flaticon.com/512/1530/1530297.png", 
      room: "living_room", 
      isOn: true, 
      since: "08:15" 
    },
    { 
      id: "3", 
      name: t('smart_tv'), 
      icon: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png", 
      room: "living_room", 
      isOn: false, 
      since: "11:45" 
    },
    { 
      id: "4", 
      name: t('camera'), 
      icon: "https://cdn-icons-png.flaticon.com/512/2642/2642268.png", 
      room: "bedroom", 
      isOn: true, 
      since: "07:20" 
    },
  ]);

  const handleDeviceToggle = (deviceId: string) => {
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.id === deviceId 
          ? { ...device, isOn: !device.isOn } 
          : device
      )
    );
    
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      toast({
        title: device.isOn ? `${device.name} turned off` : `${device.name} turned on`,
        description: `The device has been ${device.isOn ? 'deactivated' : 'activated'}`,
      });
    }
  };

  const filteredDevices = devices.filter(device => device.room === activeRoom);

  // Weather and power consumption data (simplified)
  const weather = {
    temperature: "24°",
    condition: "Mostly Clear"
  };
  
  const powerUsage = {
    today: "29kWh",
    thisMonth: "439kWh"
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold flex justify-between items-center">
              <div>
                <span className="block text-lg text-muted-foreground">{t('hello')}</span>
                <span>Adrian!</span>
              </div>
              <div className="text-right">
                <span className="block text-2xl">{weather.temperature}</span>
                <span className="text-sm text-muted-foreground">{weather.condition}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{t('your_devices')}</p>
            <Select value={activeRoom} onValueChange={setActiveRoom}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('select_room')} />
              </SelectTrigger>
              <SelectContent>
                {rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {t(room.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card className="md:w-72 lg:w-96">
          <CardHeader className="pb-2">
            <CardTitle>{t('power_consumption')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {t('summary_energy')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/40 rounded-xl p-4 text-center">
                <span className="block font-medium text-lg">{powerUsage.today}</span>
                <span className="text-sm text-muted-foreground">{t('today')}</span>
              </div>
              <div className="bg-muted/40 rounded-xl p-4 text-center">
                <span className="block font-medium text-lg">{powerUsage.thisMonth}</span>
                <span className="text-sm text-muted-foreground">{t('this_month')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t(activeRoom)}</h2>
          <Button variant="outline" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('add')}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDevices.map((device) => (
            <DeviceCard
              key={device.id}
              name={device.name}
              icon={device.icon}
              room={t(device.room)}
              isOn={device.isOn}
              since={device.since}
              onToggle={() => handleDeviceToggle(device.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
