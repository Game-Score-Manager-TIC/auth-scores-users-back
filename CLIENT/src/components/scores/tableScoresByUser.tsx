import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { useFormattedScore } from "client/hooks/useFormattedScore";

interface ScoresByUserIdProps {
    game: string;
    score: number;
}

export default function TableScoresByUser({
    data,
}: {
    data: ScoresByUserIdProps[];
}) {
    return (
        <Table
            removeWrapper
            className="w-1/4 bg-gradient-4 rounded-lg"
            aria-label="User Scores Table"
        >
            {/* Table Header */}
            <TableHeader>
                <TableColumn className="bg-gradient-1 text-white">Game</TableColumn>
                <TableColumn className="bg-gradient-1 text-white">Score</TableColumn>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
                {data && data.length > 0 ? (
                    data.map((d: ScoresByUserIdProps, i: number) => {
                        // Format the score using the custom hook
                        const formattedScore = useFormattedScore(d.score);

                        return (
                            <TableRow key={i} className="text-white">
                                <TableCell>{d.game}</TableCell>
                                <TableCell>{formattedScore}</TableCell>
                            </TableRow>
                        );
                    })
                ) : (
                    // Display message if no data is found
                    <TableRow>
                        <TableCell className="text-center text-white">
                            No Games Found
                        </TableCell>
                        <TableCell className="text-center text-white">
                            No Scores Found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
