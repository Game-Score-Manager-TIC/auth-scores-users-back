import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Spacer, Spinner } from "@nextui-org/react";
import { useAppDispatch } from "client/redux/hooks";
import { addNewScore } from "client/redux/features/scores";

interface AddScoreModalProps {
    userId: string;
    onClose: () => void;
}

const AddScoreModal: React.FC<AddScoreModalProps> = ({ userId, onClose }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch = useAppDispatch();

    const [game, setGame] = useState("");
    const [score, setScore] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async () => {
        if (!game || score <= 0) {
            setError("Please provide a valid game and score.");
            return;
        }

        try {
            setIsLoading(true);
            // Dispatch the action to add a new score
            await dispatch(addNewScore({ userId, game, score }));
            onClose();  // Close modal after submission
        } catch (err) {
            setError("Failed to add the score. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div >
            <Modal
                backdrop="opaque"
                isOpen={true}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent className="bg-gradient-2">
                    <ModalHeader >
                        <h3>Add New Score</h3>
                    </ModalHeader>
                    <ModalBody >
                        {error && <div className="text-red-500">{error}</div>}
                        <Input
                            isClearable
                            label="Game Name"
                            value={game}
                            onChange={(e) => setGame(e.target.value)}
                        />
                        <Spacer y={1} />
                        <Input
                            isClearable
                            label="Score"
                            type="number"
                            value={score.toString()}
                            onChange={(e) => setScore(Number(e.target.value))}
                        />
                        <Spacer y={1} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? <Spinner size="sm" /> : "Add Score"}
                        </Button>
                    </ModalFooter>
                </ModalContent>


            </Modal>
        </div>

    );
};

export default AddScoreModal;
