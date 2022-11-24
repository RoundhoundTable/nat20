import { Chat } from "./Chat/Chat";
import { PlayerList } from "./PlayerList";

export const DmView = () => {
  return (
    <div className="flex flex-col h-screen bg-background-500 p-2 gap-2 text-primary-500">
      <div className="flex flex-col md:flex-row h-2/3 gap-2 p-2">
        <PlayerList />
        <Chat />
      </div>
      <textarea
        name="notes"
        cols={30}
        rows={10}
        placeholder="Notes"
        className="resize-none bg-transparent border border-primary-500 placeholder:text-primary-500 p-2 rounded-xl"
      ></textarea>
    </div>
  );
};
