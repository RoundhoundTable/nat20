import { Chat } from "./Chat";
import { PlayerList } from "./PlayerList";
import WikiButton from "./WikiButton";

export const DmView = () => {
    return (
        <div className="flex flex-col h-screen bg-background-500 p-2 gap-2 text-primary-500">
            <div className="flex flex-col md:flex-row h-2/3 gap-2 p-2">
                <PlayerList />
                <Chat conectedUsers={3}/>
            </div>
            <textarea name="notes" id="" cols={30} rows={10} className="bg-transparent border border-primary-500"></textarea>
            <WikiButton>Busqueda</WikiButton>
        </div>
    )
}