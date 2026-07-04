import {
  Cpu,
  MonitorPlay,
  CircuitBoard,
  MemoryStick,
  Fan,
  Box,
  Monitor,
  Keyboard,
  Headphones,
  type LucideIcon
} from 'lucide-react';

export const hardwareIcons: Record<string, LucideIcon> = {
  cpu: Cpu,
  gpu: MonitorPlay,
  motherboard: CircuitBoard,
  ram: MemoryStick,
  cooling: Fan,
  case: Box,
  monitor: Monitor,
  keyboard: Keyboard,
  headphones: Headphones
};
