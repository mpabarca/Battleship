import { randomMessages } from "@/services/toastMessages";
import { getRandomInt } from "@/utils/general";
import type { ShootType } from "@/types";

export function getShotMessage(type: ShootType): string {
  if (type === "sink") return randomMessages.sunk_ships[getRandomInt(0, 50)];
  if (type === "hit") return randomMessages.hit_shots[getRandomInt(0, 50)];
  return randomMessages.missed_shots[getRandomInt(0, 50)];
}

export function getShotTitle(type: ShootType): string {
  if (type === "sink") return "Sink a Ship!";
  if (type === "hit") return "Hit a Ship!";
  return "You didn't hit a thing";
}