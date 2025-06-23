import { toast } from "sonner";
import { FlameKindling, HandMetal, RadioTower } from "lucide-react";
import type { ShootType } from "@/types";
import { getShotMessage, getShotTitle, getShowShipsMessage, getShowShipsTitle } from "./shotToastText";

export function shotToast(shootType: ShootType) {
  return toast.message(getShotTitle(shootType), {
    description: getShotMessage(shootType),
    duration: 10000,
    className: "shot-toast-message",
    icon: shootType === "miss" ? <HandMetal /> : <FlameKindling />,
  });
}

export function showShipsToast(showShips: boolean) {
  return toast.message(getShowShipsTitle(showShips), {
    description: getShowShipsMessage(showShips),
    duration: 5000,
    className: "shot-toast-message",
    icon: <RadioTower />,
  });
}