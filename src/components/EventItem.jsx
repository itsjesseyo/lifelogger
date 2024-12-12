import React from 'react';
import {
  Block,
  Icon,
  ListItem,
  SwipeoutActions,
  SwipeoutButton,
  AccordionContent
} from 'framework7-react';

import { createEvent, getEventTypes } from '../js/db';

import { atom, useAtom } from 'jotai';


var reply, forward, mark, more
reply = forward = mark = more = () => {
  console.log('sdfsdsd')
}

const handleCreateEvent = async (event, eventType, setEventTypes) => {
  await createEvent(eventType.id)
  setEventTypes()
}

const iconAtom = atom({
  color:"grey",
  text: "Pull to log event",
  icon:<Icon f7="hand_point_left_fill"> </Icon>
})


//hand_point_left_fill
//hand_thumbsup_fill

export default ({eventType, setEventTypes}) => {

  let [icon, setIcon] = useAtom(iconAtom)

    const handleSwipeClose = async (event) => {
      setIcon({
        color:"green",
        text: "HUZZAH!!",
        icon:<Icon f7="hand_thumbsup_fill"> </Icon>
      })
    }

    const handleOverSwipeEnter = (event) => {
      setIcon({
        color:"blue",
        text: "Release to save",
        icon:<Icon f7="hand_thumbsup_fill"> </Icon>
      })
    }

    const handleSwipeoutClose = (event) => {
      setIcon({
        color:"blue",
        text: "Pull to log event",
        icon:<Icon f7="hand_point_left_fill"> </Icon>
      })
    }


    return (
      <ListItem
        accordionItem
        swipeout
        // link="/about/" 
        title={eventType.name}
        // color
        //
        subtitle={"Last Event: " + eventType.recentEvent.timeString}
        onSwipeoutClose={handleSwipeClose}
        onSwipeoutOverswipeEnter={handleOverSwipeEnter}
        onSwipeoutClosed={handleSwipeoutClose}
      >
        <SwipeoutActions left>
          <SwipeoutButton color="orange" onClick={reply}>
            Edit
          </SwipeoutButton>
        </SwipeoutActions>

        <SwipeoutActions right>
          <SwipeoutButton color={icon.color} onClick={((e) => handleCreateEvent(e, eventType, setEventTypes))} overswipe close >
            {icon.icon}
            {icon.text}
          </SwipeoutButton>
        </SwipeoutActions>

        {/* <AccordionContent>
          <Block>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elementum id neque nec
              commodo. Sed vel justo at turpis laoreet pellentesque quis sed lorem. Integer semper
              arcu nibh, non mollis arcu tempor vel. Sed pharetra tortor vitae est rhoncus, vel
              congue dui sollicitudin. Donec eu arcu dignissim felis viverra blandit suscipit eget
              ipsum.
            </p>
          </Block>
        </AccordionContent> */}
          
      </ListItem>
    )
  }
  