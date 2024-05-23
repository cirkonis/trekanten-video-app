import React, {useState} from "react";
import {addFencer} from "@/lib/firestore/fencers/addFencer";
import {Fencer} from "@/types/fencer";
;import { v4 as uuidv4 } from 'uuid';
import {useUserStore} from "@/state/usersState";

interface CreateFencerProps {
    onCreate: (name: string) => void;
}

export function CreateFencer({onCreate}: CreateFencerProps) {
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreate = async () => {
        const modal = document.getElementById('create-fencer-modal');
        if (modal) {
            // @ts-ignore
            modal.showModal();
        }
    };


    const handleConfirmCreate = async () => {
        try {
            setLoading(true)
            const token = useUserStore.getState().token;
            if (!token) {
                throw new Error('User is not logged in');
            }

            const res = await fetch(`/api/tube/playlist`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: name }),
            });

            if (!res.ok) {
                throw new Error('Failed to create playlist');
            }

            const data = await res.json();
            const newPlaylistId = data.id;

            const newFencer: Fencer = {
                id: uuidv4(),
                name: name,
                playlistId: newPlaylistId,
            };

           await addFencer(newFencer);
           setName("");

        } catch (error) {
            console.error("Error creating fencer:", error);
        } finally {
            setLoading(false);
            const modal = document.getElementById('create-fencer-modal');
            if (modal) {
                // @ts-ignore
                modal.close(); // Close the modal
            }
        }
    };


    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex items-center">
                <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Enter fencer name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="btn btn-secondary ml-4"
                        disabled={loading || !name.trim()}
                        onClick={() => handleCreate()}>Create Fencer
                </button>
                <dialog id="create-fencer-modal" className="modal">
                    <div className="modal-box flex flex-col w-full">
                        <h3 className="font-bold text-lg">Are you sure?</h3>
                        <div className="py-4">
                            <span className="">ready to bring</span>
                            <span className="font-semibold"> {name} </span>
                            <span>into existence?</span>
                        </div>
                        <div className="modal-action flex w-full justify-between">
                            <form method="dialog">
                                <button className="btn btn-danger">Nope</button>
                            </form>
                            <button className="btn btn-accent" onClick={() => handleConfirmCreate()}>
                                {!loading ? "Creating..." : "Create Fencer"}
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
}