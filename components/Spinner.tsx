export function Spinner() {
    return (
        <div className="flex items-center">
            <span className="loading loading-ring loading-xs text-info"></span>
            <span className="loading loading-ring loading-sm text-info"></span>
            <span className="loading loading-ring loading-md text-info"></span>
            <span className="loading loading-infinity loading-lg text-info"></span>
            <span className="loading loading-ring loading-md text-info"></span>
            <span className="loading loading-ring loading-sm text-info"></span>
            <span className="loading loading-ring loading-xs text-info"></span>
        </div>
    )
        ;
}