// Helper function to format time
import {Time} from "@/types/time";

export function formatTime(time: Time) {
    const minutes = Math.floor(time.minutes);
    const seconds = Math.floor(time.seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
