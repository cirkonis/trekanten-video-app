import {useVideoStore} from "@/state/videoState";
import {FencingTouch} from "@/types/fencingTouch";
import {formatTime} from "@/utils/FormatTime";
import {ETouchTypes} from "@/enums/ETouchTypes";
import {Fencer} from "@/types/fencer";
import {EPistePositions} from "@/enums/EPistePositions";
import {updateDraftTouches} from "@/utils/UpdateDraftTouches";

export function TouchesList() {
    const touches = useVideoStore((state) => state.touches);

    const sortedTouches: any = [...touches].sort((a: any, b: any) => compareTimes(a.videoStartTimeStamp, b.videoStartTimeStamp));

    function compareTimes(timeA: number, timeB: number): number {
        return timeA - timeB;
    }

    async function handleRemoveTouch(touch: FencingTouch) {
        useVideoStore.getState().removeTouch(touch);
        await updateDraftTouches()
    }

    return(
        <div>
            <h1 className="text-2xl font-semibold px-8">Touches</h1>
            <div className="px-4 overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Awarded To</th>
                        <th>Sequence</th>
                        <th>Piste Position</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedTouches.map((touch: any, index: number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{formatTime(touch.videoStartTimeStamp)}</td>
                            <td>{touch.type}</td>
                            <td>
                                {touch.type === ETouchTypes.SINGLE_TOUCH_LEFT || touch.type === ETouchTypes.SINGLE_TOUCH_RIGHT ? (
                                    touch.pointAwardedTo.map((fencer: Fencer) => fencer.name).join(', ')
                                ) : null}
                                {touch.type === ETouchTypes.DOUBLE_TOUCH ? (
                                     <>Both Fencers</>
                                ) : null}
                                {touch.type === ETouchTypes.NO_TOUCH ? (
                                    <>Either Fencer</>
                                ) : null}
                            </td>
                            <td>{touch.sequence.join(', ')}</td>
                            <td>
                                {touch.type === ETouchTypes.SINGLE_TOUCH_LEFT && touch.positions[0].position}
                                {touch.type === ETouchTypes.SINGLE_TOUCH_RIGHT && touch.positions[1].position}
                                {touch.type === ETouchTypes.DOUBLE_TOUCH  && (
                                    <>
                                        {touch.positions[0].position === EPistePositions.ZONE_1 && EPistePositions.ZONE_1}
                                        {touch.positions[0].position === EPistePositions.OWN_ZONE_2 && EPistePositions.LEFT_ZONE_2}
                                        {touch.positions[0].position === EPistePositions.OWN_ZONE_3 && EPistePositions.LEFT_ZONE_3}
                                        {touch.positions[1].position === EPistePositions.OWN_ZONE_2 && EPistePositions.RIGHT_ZONE_2}
                                        {touch.positions[1].position === EPistePositions.OWN_ZONE_3 && EPistePositions.RIGHT_ZONE_3}
                                    </>
                                )}
                                {touch.type === ETouchTypes.NO_TOUCH  && (
                                    <>
                                        {touch.positions[0].position === EPistePositions.ZONE_1 && EPistePositions.ZONE_1}
                                        {touch.positions[0].position === EPistePositions.OWN_ZONE_2 && EPistePositions.LEFT_ZONE_2}
                                        {touch.positions[0].position === EPistePositions.OWN_ZONE_3 && EPistePositions.LEFT_ZONE_3}
                                        {touch.positions[1].position === EPistePositions.OWN_ZONE_2 && EPistePositions.RIGHT_ZONE_2}
                                        {touch.positions[1].position === EPistePositions.OWN_ZONE_3 && EPistePositions.RIGHT_ZONE_3}
                                    </>
                                )}
                            </td>
                            <td>
                                <button className="btn btn-warning btn-circle btn-small" onClick={() => handleRemoveTouch(touch)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}