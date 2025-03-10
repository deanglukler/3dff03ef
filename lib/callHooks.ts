import { Activity, BASE_URL } from "./calls"
import useFetcher from "./useFetcher"

export function useCallActivities({ type }: { type: "inbox" | "all" }) {
    const { data, ...rest } = useFetcher(`${BASE_URL}/activities`)

    let filteredData = (data || []) as Activity[]
    if (type === "inbox") {
        filteredData = filteredData.filter(x => x.direction === "inbound")
    }

    filteredData = filteredData.filter(x => !x.is_archived)

    const sortedData: Record<string, Activity[]> = {}
    filteredData.forEach(x => {
        const date = new Date(x.created_at)
        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
        if (!sortedData[formattedDate]) {
            sortedData[formattedDate] = []
        }
        sortedData[formattedDate].push(x) 
    })
  
    return { data: sortedData, ...rest }
}