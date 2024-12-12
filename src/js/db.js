import { DateTime } from "luxon";

const colors = ['#00429d', '#2e59a8', '#4771b2', '#5d8abd', '#73a2c6', '#8abccf', '#a5d5d8', '#c5eddf', '#ffdec7', '#ffbcaf', '#ff9895', '#f4777f', '#e4576b', '#cf3759', '#b41648', '#93003a']


import { v4 as uuidv4 } from 'uuid';

import Dexie from "dexie";

const db = new Dexie("MyDatabase");
db.version(1).stores({
    eventTypes: "id, order",
    events: "id, eventTypeID, startDate"
});


const getEventTypes = async () => {
    //add recent event
   var events = await db.eventTypes.orderBy("order").toArray()
   for ( var event of events){
    event.recentEvent = await getRecentEvent(event.id)
   }
   return events
}

const createEventType = async (data) => {
    const currentTypes = await getEventTypes()
    const id = uuidv4()
    const color = colors[0]
    const order = currentTypes.length
    await db.eventTypes.add({id, color, order, ...data});
    return await db.eventTypes.where({id})
}

const getEvents = async (eventTypeID) => {
    return await db.events.where({eventTypeID}).orderBy('startDate')
}

const getRecentEvent = async (eventTypeID) => {
    try {
        var t = await db.events.where('eventTypeID').equals(eventTypeID).reverse().sortBy('startDate')
        const time = DateTime.fromMillis(t[0].startDate).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
        t[0].timeString = time
        return t[0]
    } catch {
        return {startDate: 'unknown'}
    }
}

const createEvent = async (eventTypeID) => {
    const startDate = DateTime.now().toUTC().toMillis()
    const id = uuidv4()
    const e = await db.events.add({id, eventTypeID, startDate})
    const et = await db.events.where({id}).first()
}

export {
    db,
    getEventTypes,
    createEventType,
    getEvents,
    createEvent,
    getRecentEvent
}