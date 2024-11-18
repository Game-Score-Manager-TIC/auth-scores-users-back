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
    // Pre-format scores to ensure consistent hook calls
    const formattedData = data.map((d) => ({
        game: d.game,
        formattedScore: useFormattedScore(d.score),
    }));

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
                {formattedData.length > 0 ? (
                    formattedData.map((d, i) => (
                        <TableRow key={i} className="text-white">
                            <TableCell>{d.game}</TableCell>
                            <TableCell>{d.formattedScore}</TableCell>
                        </TableRow>
                    ))
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
