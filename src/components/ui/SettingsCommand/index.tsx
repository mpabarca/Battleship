import {
  CommandDialog,
  CommandGroup,
  CommandItem,
} from "@/components/shadcn/Command";
import { showShipsToast } from "@/lib/shotToast";
import type { GridType } from "@/types";

interface ISettingsCommand {
  openSettingsDialog: boolean;
  setOpenSettingsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setGrid: React.Dispatch<React.SetStateAction<GridType | null>>;
  resetGame: () => void;
  showShips: boolean;
}

function SettingsCommand({
  openSettingsDialog,
  setOpenSettingsDialog,
  setGrid,
  resetGame,
  showShips,
}: ISettingsCommand) {
  return (
    <CommandDialog
      open={openSettingsDialog}
      onOpenChange={setOpenSettingsDialog}
    >
      <CommandGroup
        heading='Settings'
        className='flex flex-col justify-between'
      >
        <CommandItem
          onSelect={() => {
            resetGame();
            setOpenSettingsDialog(false);
          }}
        >
          Reset game
        </CommandItem>
        <CommandItem
          onSelect={() => {
            showShipsToast(!showShips);
            setGrid((prev) =>
              prev ? { ...prev, showShips: !prev.showShips } : prev
            );
            setOpenSettingsDialog(false);
          }}
        >
          {`${showShips ? "Hide" : "Show"} ships`}
        </CommandItem>
      </CommandGroup>
    </CommandDialog>
  );
}

export default SettingsCommand;
