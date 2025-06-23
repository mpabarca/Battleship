import { randomMessages } from "@/services/toastMessages";
import { getRandomInt } from "@/utils/general";
import type { ShootType } from "@/types";

export function getShotMessage(type: ShootType): string {
  if (type === "sink") return randomMessages.sunk_ships[getRandomInt(0, 50)] || "If this keeps up, there’ll be nothing left to shoot.";
  if (type === "hit") return randomMessages.hit_shots[getRandomInt(0, 50)] || "You're not bad at this. Shockingly.";
  return randomMessages.missed_shots[getRandomInt(0, 50)] || "Nice shot… if you were aiming for the ocean.";
}

export function getShotTitle(type: ShootType): string {
  if (type === "sink") return "Sink a Ship!";
  if (type === "hit") return "Hit a Ship!";
  return "You didn't hit a thing";
}

export function getShowShipsMessage(showShips: boolean): string {
  if(showShips) return randomMessages.reveal_ships[getRandomInt(0, 69)] || "Was guessing too hard for you?"
  else return randomMessages.hide_again_ships[getRandomInt(0, 50)] ||  "Back to pretending you're legit."
}

export function getShowShipsTitle(showShips: boolean): string {
  if(showShips) return "Cheater Mode Engaged"
  else return "Oh NOW You Wanna Play Fair?"

}