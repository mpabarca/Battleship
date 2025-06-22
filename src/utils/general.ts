import type {
  DirectionType,
} from "../types";

export const ALPHABET = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

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

export function getConsecutivesIntArrayBySize(size: number): number[] {
  const array: number[] = []
  for(let i = 1; i <= size; i++) {
    array.push(i);
  }
  return array;
}