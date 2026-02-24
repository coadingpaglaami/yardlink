import {
  AlignVerticalJustifyStartIcon,
  LayoutDashboard,
  LeafIcon,
  Mail,
  NotepadText,
  NotepadTextIcon,
  UserCogIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";

export const sidbaarLinks = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard, // ✈️ airplane icon
  },
  // {
  //   label: "Reports & analytics",
  //   href: "/admin/report&analytics",
  //   icon: AlignVerticalJustifyStartIcon, // 💬 circular message icon
  // },
  {
    label: "Users",
    href: "/admin/users",
    icon: UsersIcon, // ✅ success/trip complete
    dropdown: [
      {
        label: "Landscaper",
        href: "/admin/users/landscaper",
        icon: UserIcon,
      },
      {
        label: "Client",
        href: "/admin/users/client",
        icon: UserCogIcon,
      },
    ],
  },
  {
    label: "Subscriptions",
    href: "/admin/subscriptions",
    icon: NotepadText, // 💰 earnings
  },
  // {
  //     label: "Standard Service",
  //     href: "/admin/standard_service",
  //     icon: LeafIcon, // 💰 earnings
  // },
  {
    label: "Message",
    href: "/admin/message",
    icon: Mail,
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: NotepadTextIcon,
  },
];
