import { toast } from "sonner";
import { FlameKindling, HandMetal } from "lucide-react";
import type { ShootType } from "@/types";
import { getShotMessage, getShotTitle } from "./shotToastText";

export function shotToast(shootType: ShootType) {
  return toast.message(getShotTitle(shootType), {
    description: getShotMessage(shootType),
    duration: 10000,
    className: "shot-toast-message",
    icon: shootType === "miss" ? <HandMetal /> : <FlameKindling />,
  });
}