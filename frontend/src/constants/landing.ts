import type { LucideIcon } from "lucide-react";
import {
  Users,
  MessageCircle,
  DollarSign,
  CalendarHeart,
  Image,
  MapPin,
} from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
};

export const FEATURES: Feature[] = [
  {
    icon: Users,
    color: "bg-blue-300 text-slate-900",
    title: "Family Sync",
    description:
      "Invite planners and family members with different access levels.",
  },
  {
    icon: MessageCircle,
    color: "bg-pink-300 text-slate-900",
    title: "Guest Magic",
    description: "Easily collect RSVPs, meal preferences, and plus ones.",
  },
  {
    icon: DollarSign,
    color: "bg-green-300 text-slate-900",
    title: "Budget Tracker",
    description: "Stay on top of expenses, payments, and vendor contracts.",
  },
  {
    icon: CalendarHeart,
    color: "bg-purple-300 text-slate-900",
    title: "Event Timeline",
    description: "Schedule Haldi, Mehendi, Sangeet, and the big day perfectly.",
  },
  {
    icon: Image,
    color: "bg-orange-300 text-slate-900",
    title: "Shared Gallery",
    description:
      "A shared gallery where guests can upload their candid moments.",
  },
  {
    icon: MapPin,
    color: "bg-cyan-300 text-slate-900",
    title: "Venue & Vendors",
    description:
      "Manage vendor contacts, locations, and schedules in one place.",
  },
];
