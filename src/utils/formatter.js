// formatter.js

/**
 * Dynamically merges event data with metric and profile information while retaining the top-level event ID.
 * @param {Object} rawData Raw data from Klaviyo API containing events and included metrics and profiles.
 * @returns {Object[]} Merged event data array.
 */
export const mergeEventData = (rawData) => {
    const { data, included } = rawData;

    // Create a map for easy access to included metrics and profiles by their ID
    const includedMap = included.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {});

    // Merge each event with its corresponding metric and profile and keep the top-level event ID
    const mergedData = data.map(event => {
        const metricId = event.relationships.metric?.data.id;
        const profileId = event.relationships.profile?.data.id;

        return {
            id: event.id, // Retaining the top-level ID of the event
            type: event.type, // Optionally keeping the type if needed
            attributes: event.attributes, // Merging all attributes
            metric: metricId ? {
                name: includedMap[metricId].attributes.name,
                id: metricId
            } : {},
            profile: profileId ? {
                ...includedMap[profileId].attributes,
                id: profileId,
                relationships: includedMap[profileId].relationships
            } : {},
        };
    });

    return mergedData;
};
