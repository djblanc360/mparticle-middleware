/* global credentials */
import apiRequest from '../../utils/api/klaviyo/request.js'

/**
 * Retrieves a user profile from Klaviyo.
 * @param {Object} data The request data object containing user email.
 * @returns {Promise<Object>} The Klaviyo user profile data
 */
const getKlaviyoProfile = async (data) => {
    let filter = data.email ? `equals(email,"${data.email}")` :
    data.phone ? `equals(phone_number,"${data.phone}")` :
    (() => { throw new Error("No valid identifier provided. Please provide an email or phone number."); })();

    const url = `${credentials.klaviyo_base_url}/api/profiles?additional-fields[profile]=subscriptions,predictive_analytics&fields[profile]=predictive_analytics.churn_probability,organization&filter=${filter}`

    try {
        const klaviyoProfile = await apiRequest(url, 'GET', null, {})
        console.log('Klaviyo profile retrieved:', klaviyoProfile)
        return klaviyoProfile
    } catch (error) {
        console.error('Failed to fetch Klaviyo profile:', error)
        throw error
    }
}

/**
 * Retrieves events for a user profile from Klaviyo, optionally filtering by one or more event names.
 * @param {*} data Object containing the email and optionally a single event name or an array of event names.
 * @returns {Promise<Object>} The Klaviyo profile events data.
 */
const getKlaviyoProfileEvents = async (data) => {
    const { email, event } = data;
    const profile = await getKlaviyoProfile({ email });
    console.log('profile in klaviyo events:', profile);

    if (!profile.data || profile.data.length === 0) {
        throw new Error("No profile found. Please check the identifier provided.");
    }
    const id = profile.data[0].id;

    const url = `${credentials.klaviyo_base_url}/api/events/?fields[event]=uuid,event_properties&fields[metric]=name&fields[profile]=location.address1,phone_number&filter=equals(profile_id,"${id}")&include=metric,profile`;
    try {
        const response = await apiRequest(url, 'GET', null, {});
        console.log('Klaviyo profile events retrieved:', response);

        if (event) {
            const eventNames = Array.isArray(event) ? event : [event];  // Ensure eventNames is always an array
            const metricIds = response.included
                .filter(metric => eventNames.includes(metric.attributes.name))
                .map(metric => metric.id);

            if (metricIds.length === 0) {
                throw new Error(`Metric not found for the event names: ${eventNames.join(', ')}`);
            }

            // Filter events by the metric IDs
            const events = response.data.filter(event => metricIds.includes(event.relationships.metric.data.id));
            if (events.length === 0) {
                throw new Error(`No events found for the specified events: ${eventNames.join(', ')}.`);
            }
            return events;
        } else {
            return response.data;  // Return all events if no specific event filter is provided
        }
    } catch (error) {
        console.error('Failed to fetch Klaviyo profile events:', error);
        throw error;
    }
}

/**
 * Retrieves the last instance of a specific event for a user profile.
 * @param {Object} data Object containing the profile identifier and event name.
 * @returns {Promise<Object>} The data of the last instance of the specified event.
 */
const getKlaviyoLastEvent = async (data) => {
    const { event } = data;
    const profileEvents = await getKlaviyoProfileEvents(data);
    console.log('Profile events in last event:', profileEvents);

    if (profileEvents.length === 0) {
        throw new Error("No events found.");
    }

    // Sort events by UUID in descending order to ensure the last event is the most recent
    const sortedEvents = profileEvents.sort((a, b) => b.attributes.uuid.localeCompare(a.attributes.uuid));

    // Retrieve the last event after sorting
    const lastEvent = sortedEvents[0]; // Now the first element after sorting in descending order

    console.log(`Last event retrieved:`, lastEvent);
    return lastEvent;
}

export { 
    getKlaviyoProfile,
    getKlaviyoProfileEvents,
    getKlaviyoLastEvent
}
