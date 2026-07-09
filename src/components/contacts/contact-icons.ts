import {
  Send,
  Github,
  MessageCircle,
  Mail,
  Gamepad2,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';

export const contactIcons: Record<string, LucideIcon> = {
  telegram: Send,
  steam: Gamepad2,
  github: Github,
  discord: MessageCircle,
  email: Mail,
  TikTok: Smartphone,
};
