import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/shadcn/AlertDialog";
import { getRandomInt } from "@/utils/general";
import { randomMessages } from "@/services/toastMessages";

interface IEndGameAlertDialog {
  isEndGame: boolean;
  setIsEndGame: React.Dispatch<React.SetStateAction<boolean>>;
  resetGame: () => void;
}

function EndGameAlertDialog({ isEndGame, setIsEndGame, resetGame }:IEndGameAlertDialog) {
  return (
          <AlertDialog
            open={isEndGame}
            onOpenChange={setIsEndGame}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Game Over</AlertDialogTitle>
                <AlertDialogDescription>
                  {randomMessages.end_game[getRandomInt(0,50)]}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  className="px-6"
                  onClick={() => {
                    setIsEndGame(false);
                    resetGame();
                  }}
                >
                  {randomMessages.button_restart[getRandomInt(0,26)]}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

  )
}

export default EndGameAlertDialog;