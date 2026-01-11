
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DeviceCardProps {
  name: string;
  icon: string;
  room: string;
  isOn: boolean;
  since: string;
  onToggle: () => void;
}

const DeviceCard = ({ 
  name, 
  icon, 
  room, 
  isOn, 
  since, 
  onToggle 
}: DeviceCardProps) => {
  const { t } = useTranslation();
  
  return (
    <Card className="device-card overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted">
              <img src={icon} alt={name} className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground">{room}</p>
            </div>
          </div>
          <Switch checked={isOn} onCheckedChange={onToggle} />
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-muted/30 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {t('used_since')} {since}
        </span>
        <Badge variant={isOn ? "default" : "outline"}>
          {isOn ? "ON" : "OFF"}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default DeviceCard;
