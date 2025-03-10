import { CallItem } from "./CallItem";

const ActivityList: React.FC<{ activities: any }> = ({
    activities
}) => {
    return (
        <div className="flex-1 overflow-auto bg-white">
            <div className="max-w-5xl mx-auto">
                {Object.entries(activities)
                    .sort(activityDateSorter)
                    .map(([date, act]) => {
                        return (
                            <div key={date}>
                                <div className="sticky top-0 bg-gray-100 text-xs font-medium text-gray-500 px-6 py-2">
                                    {date}
                                </div>
                                {act?.map((activity) => {
                                    return (
                                        <CallItem
                                            activity={activity}
                                            key={activity.id}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}

                {/* Empty space at bottom */}
                <div className="h-16"></div>
            </div>
        </div>
    );
    //
};

function activityDateSorter(a, b) {
    return new Date(b[0]).getTime() - new Date(a[0]).getTime();
}

export default ActivityList;
