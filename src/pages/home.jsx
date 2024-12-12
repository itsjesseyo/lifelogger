import React, {useEffect, useState} from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  Icon,
  List,
  ListItem,
  ListButton,
  Button,
  SwipeoutActions,
  SwipeoutButton,
  Toggle,
  AccordionContent,
  Panel,
  Popup
} from 'framework7-react';

import { f7, f7ready } from 'framework7-react';


import { useAtom } from 'jotai'
import { eventTypesAtom } from '../js/atoms';
import EventItem from '../components/EventItem';
import { getEventTypes } from '../js/db';

import EventTypeForm from '../components/EventTypeForm';


const HomePage = ({f7router, f7route}) => {

  const [eventTypes, setEventTypes] = useAtom(eventTypesAtom)
  const [selected, setSelected] = useState('home');

  const refresh = async () => {
    setEventTypes(await getEventTypes())
  }

  const onRouteChange = ({path}) => {
    if(path === '/'){
      setSelected('home')
    }
  }

  useEffect( () => {
    async function fetchData() {
      setEventTypes(await getEventTypes())
    }
    fetchData();
    f7.views.main.on('routeChange', onRouteChange)
  }, [])

  //popupOpen=".demo-popup-swipe"

  return (
    <Page name="home">
      {/* Top Navbar */}
      <Navbar>
        {/* // add plus buton for new event type */}
        <NavTitle>My App</NavTitle>
        <NavRight>
          <Button panelOpen="right">
            <Icon f7="bars"> </Icon>
          </Button>
          
        </NavRight>
      </Navbar>

    <Panel right cover containerEl="#panel-page" id="panel-nested">
      <Page>
        <Toolbar position='bottom'>
          <Button />
          <Button panelClose="right">Close</Button>
        </Toolbar>
        <Navbar>
          {/* // add plus buton for new event type */}
          <NavTitle>Menu</NavTitle>
          <NavRight>
            <Button panelClose="right">
              <Icon f7="multiply"> </Icon>
            </Button>
            
          </NavRight>
        </Navbar>
        <List menuList outlineIos strongIos>
        <ListItem
          link
          title="Home"
          selected={selected === 'home'}
          onClick={() => {
            f7router.navigate('/')
            setSelected('home')
          }}
           panelClose="right"
        >
          <Icon md="material:home" ios="f7:house_fill" slot="media" />
        </ListItem>
        <ListItem
          link
          title="About"
          selected={selected === 'about'}
          onClick={() => {
            setTimeout(() => {
              f7router.navigate('/about/')
            }, 300);
            setSelected('about')
          }}
           panelClose="right"
        >
          <Icon md="f7:heart_circle" ios="f7:heart_circle" slot="media" />
        </ListItem>
        <ListItem
          link
          title="Contact"
          selected={selected === 'contact'}
          onClick={() => {
            setTimeout(() => {
              f7router.navigate('/contact/')
            }, 300);
            setSelected('contact')
          }}
           panelClose="right"
        >
          <Icon md="f7:bubble_left_bubble_right" ios="f7:bubble_left_bubble_right" slot="media" />
        </ListItem>
        <ListItem
          link
          title="Settings"
          selected={selected === 'settings'}
          onClick={() => {
            setTimeout(() => {
              f7router.navigate('/settings/')
            }, 300);
            setSelected('settings')
          }}
           panelClose="right"
        >
          <Icon md="material:settings" ios="f7:gear_alt_fill" slot="media" />
        </ListItem>
      </List>

        <List inset strong>
          <ListButton title="New Loggable Event"  panelClose="right" popupOpen=".demo-popup-swipe"/>
        </List>
      </Page>
    </Panel>

      <BlockTitle>Loggable Events</BlockTitle>
      <List dividersIos mediaList outlineIos strongIos>
        {eventTypes.map((item) => (
          <EventItem key={item.id}  slot="list" eventType={item} setEventTypes={refresh} />
        ))}
      </List>


      {/* // add popover panel for evenType creation and editing */}
      <Popup className="demo-popup-swipe" swipeToClose>
        <Page>
          <Navbar title="Swipe To Close">
            <NavRight>
              <Link popupClose>Close</Link>
            </NavRight>
          </Navbar>

          {/* <div
            style={{ height: '100%' }}
            className="display-flex justify-content-center align-items-center"
          >
            <p>Swipe me up or down</p>
          </div> */}
          <EventTypeForm refresh={refresh} />
        </Page>
      </Popup>
    </Page>
  )
};

export default HomePage;