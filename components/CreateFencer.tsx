import React, {useState} from "react";

interface CreateFencerProps {
    onCreate: (name: string) => void;
}

export function CreateFencer({onCreate}: CreateFencerProps) {
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreate = async () => {
        setLoading(true);
        const modal = document.getElementById('create-fencer-modal');
        if (modal) {
            modal.showModal();
        }
    };


    const handleConfirmCreate = async () => {
        console.log("handleConfirmCreate");
        // TODO MM 12/23 add dynamic clubID
        try {
            // Make your API call to create a new fencer
            await fetch('/api/fencers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    fencer: {
                        name: name
                    },
                    clubId: "9747fb19-5a24-4c8f-b049-78072dd70ff6"
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    // Notify parent component about the new fencer
                    onCreate(data.name); // Assuming the response contains the created fencer's data
                })
                .catch(() => {
                    console.error("Error creating fencer")
                });
            setName(""); // Reset the input after creating a new fencer
        } catch (error) {
            console.error("Error creating fencer:", error);
        } finally {
            setLoading(false);
            const modal = document.getElementById('create-fencer-modal');
            if (modal) {
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
                        disabled={loading || name === ""}
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