const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export interface Device {
  id: string;
  name: string;
  type: string;
  room: string;
  is_on: boolean;
  value?: number;
  updated_at: string;
}

export interface DeviceCommand {
  action: string;
  value?: any;
}

export const api = {
  async getDevices(): Promise<Device[]> {
    const res = await fetch(`${API_URL}/devices`);
    if (!res.ok) throw new Error('Failed to fetch devices');
    return res.json();
  },

  async getDevice(id: string): Promise<Device> {
    const res = await fetch(`${API_URL}/devices/${id}`);
    if (!res.ok) throw new Error('Device not found');
    return res.json();
  },

  async createDevice(device: Partial<Device>): Promise<Device> {
    const res = await fetch(`${API_URL}/devices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(device),
    });
    if (!res.ok) throw new Error('Failed to create device');
    return res.json();
  },

  async updateDevice(id: string, device: Partial<Device>): Promise<Device> {
    const res = await fetch(`${API_URL}/devices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(device),
    });
    if (!res.ok) throw new Error('Failed to update device');
    return res.json();
  },

  async deleteDevice(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/devices/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete device');
  },

  async sendCommand(deviceId: string, command: DeviceCommand): Promise<Device> {
    const res = await fetch(`${API_URL}/devices/${deviceId}/command`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(command),
    });
    if (!res.ok) throw new Error('Failed to send command');
    return res.json();
  },

  async getRooms(): Promise<any[]> {
    const res = await fetch(`${API_URL}/rooms`);
    if (!res.ok) throw new Error('Failed to fetch rooms');
    return res.json();
  },

  async getRoomDevices(roomId: string): Promise<Device[]> {
    const res = await fetch(`${API_URL}/rooms/${roomId}/devices`);
    if (!res.ok) throw new Error('Failed to fetch room devices');
    return res.json();
  },
};
