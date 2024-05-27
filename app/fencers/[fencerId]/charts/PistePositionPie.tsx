import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import {Touch} from "@/types/fencingTouch";
import {DefaultizedPieValueType} from "@mui/x-charts";

interface PistePositionPieProps {
    title: string;
    touchData: Touch[];
}

const PistePositionPie: React.FC<PistePositionPieProps> = ({ title, touchData }) => {

    // Function to format data for the PieChart component
    const formatData = (touchArray: Touch[]) => {
        const positions = touchArray.reduce((acc, touch) => {
            acc[touch.position] = (acc[touch.position] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        return Object.keys(positions).map(key => ({
            label: key,
            value: positions[key],
        }));
    };

    const data = formatData(touchData);

    const sizing = {
        margin: { right: 5 },
        width: 200,
        height: 200,
        legend: { hidden: true },
    };
    const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

    const getArcLabel = (params: Omit<DefaultizedPieValueType, 'label'> & { label?: string }) => {
        const percent = params.value / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };



    return (
        <div className="py-4 flex flex-col w-full">
            <h2>{title}</h2>
            <div>
                <PieChart
                    series={[
                        {
                            outerRadius: 80,
                            data,
                            arcLabel: getArcLabel,
                        },
                    ]}
                    sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                            fontSize: 14,
                        },
                    }}
                    {...sizing}
                />
            </div>
        </div>
    );
};

export default PistePositionPie;
