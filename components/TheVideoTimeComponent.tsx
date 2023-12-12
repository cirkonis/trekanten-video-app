// import Player from "react-player";
// import React, {useEffect, useState} from "react";
// import {useTouchStore} from "@/state/touchState";
// import {FencingTime} from "@/components/FencingTime";
// import {formatTime} from "@/utils/FormatTime";
// import {useVideoStore} from "@/state/videoState";
// import {Time} from "@/types/time";
//
// export function TheVideoTimeComponent() {
//     const [playing, setPlaying] = useState(false);
//     const [showEndTime, setShowEndTime] = useState(false);
//     const touchStartTime = useTouchStore(state => state.videoStartTimeStamp);
//     const touchEndTime = useTouchStore(state => state.videoEndTimeStamp);
//     const touches = useVideoStore(state => state.touches.map((touch, index) => ({
//         label: `Touch ${index + 1} - ${formatTime(touch.videoStartTimeStamp)}`,
//         value: touch.videoStartTimeStamp
//     })));
//
//     const uploadedVideo = useVideoStore((state) => state.url);
//     const setUploadedVideo = useVideoStore((state) => state.setUploadedVideo);
//     const playerRef = useVideoStore((state) => state.playerRef);
//     const setPlayerRef = useVideoStore((state) => state.setPlayerRef);
//
//     // TODO Add more logic to prevent end time from being before start time, and on toggle change endtime should not be persisted
//
//     useEffect(() => {
//         // @ts-ignore
//         const handleProgress = (state) => {
//             if (playing) {
//                 // Update timestamp when video is playing
//                 useTouchStore.getState().setVideoStartTimeStamp({
//                     minutes: Math.floor(state.playedSeconds / 60),
//                     seconds: Math.floor(state.playedSeconds % 60)
//                 });
//             }
//         };
//
//         // Subscribe to the onProgress event to detect the playing state
//         if (playerRef && playerRef.current) {
//             // @ts-ignore
//             const player = playerRef.current.getInternalPlayer('video');
//             if (player) {
//                 player.addEventListener('progress', handleProgress);
//             }
//         }
//
//         return () => {
//             // Unsubscribe when the component unmounts
//             if (playerRef && playerRef.current) {
//                 // @ts-ignore
//                 const player = playerRef.current.getInternalPlayer('video');
//                 if (player) {
//                     player.removeEventListener('progress', handleProgress);
//                 }
//             }
//         };
//     }, [playing, playerRef]);
//
//     const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files !== null && e.target.files.length > 0) {
//             setUploadedVideo(URL.createObjectURL(e.target.files[0]));
//         } else {
//             // TODO: Handle error
//             console.log('Error uploading video');
//         }
//     };
//
//     const handleSetStartTime = () => {
//         if (playerRef.current) {
//             const currentTime = (playerRef.current as any).getCurrentTime();
//             const newTimeStamp = {
//                 minutes: Math.floor(currentTime / 60),
//                 seconds: Math.floor(currentTime % 60)
//             };
//             useTouchStore.getState().setVideoStartTimeStamp(newTimeStamp);
//         }
//     };
//
//     const handleSetEndTime = () => {
//         if (playerRef.current) {
//             const currentTime = (playerRef.current as any).getCurrentTime();
//             const newTimeStamp = {
//                 minutes: Math.floor(currentTime / 60),
//                 seconds: Math.floor(currentTime % 60)
//             };
//             useTouchStore.getState().setVideoEndTimeStamp(newTimeStamp);
//         }
//     };
//
//     function handleSelectChange(selectedTime: Time) {
//         if (playerRef.current) {
//             const totalSeconds = selectedTime.minutes * 60 + selectedTime.seconds;
//             console.log(totalSeconds)
//             // @ts-ignore
//             playerRef.current.seekTo(totalSeconds);
//         }
//     };
//
//
//
//
//     return (
//         <div>
//             <input
//                 type="file"
//                 accept="video/*"
//                 onChange={handleVideoUpload}
//             />
//
//             {uploadedVideo && (
//                 <div>
//                     <Player
//                         // @ts-ignore
//                         ref={playerRef}
//                         url={uploadedVideo}
//                         playing={playing}
//                         controls={true}
//                         onPlay={() => setPlaying(true)}
//                         onPause={() => setPlaying(false)}
//                     />
//                 </div>
//             )}
//             <div className="flex flex-col my-4">
//                 <div className="flex w-full justify-between">
//                     <div className="flex items-center">
//                     <button className="btn btn-accent btn-sm mx-4" onClick={handleSetStartTime}>Set Start Time</button>
//                     <div>Start Time -</div>
//                     <div className="text-xl mx-2">{formatTime(touchStartTime)} </div>
//                     {showEndTime && (
//                         <>
//                             <button className="btn btn-accent btn-sm mx-4" onClick={handleSetEndTime}>Set End Time
//                             </button>
//                             <div>End Time -</div>
//                             <div className="text-xl mx-2">{touchEndTime ? formatTime(touchEndTime) : formatTime(touchStartTime)}</div>
//                         </>
//                     )}
//                     <label className="cursor-pointer label w-40">
//                         <span className="label-text">Add End Time</span>
//                         <input
//                             type="checkbox"
//                             className="toggle toggle-warning"
//                             checked={showEndTime}
//                             onChange={() => setShowEndTime(!showEndTime)}
//                         />
//                     </label>
//                     <FencingTime/>
//                     </div>
//                     <select className="select select-info mx-4"
//                         value="" // Set the default value here
//                         onChange={(e) => handleSelectChange(JSON.parse(e.target.value))}
//                     >
//                         <option value="" disabled>
//                             Jump to Touch
//                         </option>
//                         {touches.map((option) => (
//                             <option key={JSON.stringify(option.value)} value={JSON.stringify(option.value)}>
//                                 {option.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//
//             </div>
//             <div>
//             </div>
//         </div>
//     )
// }