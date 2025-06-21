import type {
  DirectionType,
} from "../types";

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray(array: DirectionType[] | []): DirectionType[] | [] {
  for(let i = 0; i < array.length; i++){
    const randomIndex = getRandomInt(0, array.length - 1)
    const copyArray = [...array]
    array[i] = copyArray[randomIndex]
    array[randomIndex] = copyArray[i]
  }
  return array
}