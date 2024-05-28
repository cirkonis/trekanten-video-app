import * as React from 'react';
import { PieChart} from '@mui/x-charts/PieChart';
import { FencingTouch } from "@/types/fencingTouch";
import { DefaultizedPieValueType } from "@mui/x-charts";

interface PistePositionPieProps {
    title: string;
    touchData: FencingTouch[];
    fencerName: string;
}

const PistePositionPie: React.FC<PistePositionPieProps> = ({ title, touchData, fencerName }) => {

    // Function to format data for the PieChart component
    const formatData = (touchArray: FencingTouch[]) => {
        const positions = touchArray.reduce((acc, touch) => {
            touch.positions.forEach(position => {
                if (position.fencerName === fencerName) {
                    acc[position.position] = (acc[position.position] || 0) + 1;
                }
            });
            return acc;
        }, {} as { [key: string]: number });

        return Object.keys(positions).map(key => ({
            label: key,
            value: positions[key],
        }));
    };

    const data = formatData(touchData);

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
                            data,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            arcLabel: getArcLabel,
                        },
                    ]}
                    height={200}
                />
            </div>
        </div>
    );
};

export default PistePositionPie;
