import React, {useState} from 'react';
import {
  Page,
  Navbar,
  List,
  ListInput,
  ListItem,
  Toggle,
  Toolbar,
  BlockTitle,
  Button,
  Range,
  Block,
} from 'framework7-react';

import { createEventType } from '../js/db';

import { atom, useAtom } from 'jotai';
import { atomWithValidate } from 'jotai-form';
import * as Yup from 'yup';

// defining a validation schema for the atom
const EventNameSchema = Yup.string().required();
// creating the atom with an async validation function
const eventNameAtom = atomWithValidate('', {
  validate: async (v) => {
    await EventNameSchema.validate(v);
    return v;
  },
});

const descriptionAtom = atom('')
const colorAtom = atom(null)
const showNoteAtom = atom(false)


export default ({refresh}) => {

  const [spectrumPickerValue, setSpectrumPickerValue] = useState({ hex: '#ff0000' });

  // Same API as other jotai atom's with the difference being
  // addition of form properties on `email`
  const [eventName, setEventName] = useAtom(eventNameAtom)
  const [description, setDescription] = useAtom(descriptionAtom)
  const [color, setColor] = useAtom(colorAtom)
  const [showNotes, setShowNotes] = useAtom(showNoteAtom)

  const onSaveEventType = async (event) => {
    console.log('4er')
    const data = {
      name:eventName.value,
      description,
      showNotes
    }
    await createEventType(data)
    refresh()
  }

  
  
  return (
  <Page name="form">
    <Navbar title="Event Details"></Navbar>

    <BlockTitle>What Event do you want to log?</BlockTitle>
    <List strongIos outlineIos dividersIos insetIos>
      <ListInput
        label="Name of Event To Log (required)"
        Name="eventField"
        type="text" 
        placeholder="Morning blood pressure pill"
        value={eventName.value}
        onChange={(e) => setEventName(e.target.value)}
        validate
        required
        onValidate={() => {return eventName.isValid}}
        errorMessage={eventName.error}
      />
      <ListInput
        type="textarea"
        label="Description (optional)"
        placeholder="Take these at 9am once a day"
        resizable
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <ListInput
          label="color"
          type="colorpicker"
          placeholder="Color"
          readonly
          value={spectrumPickerValue}
          onColorPickerChange={(value) => setSpectrumPickerValue(value)}
          colorPickerParams={{
            modules: ['sb-spectrum', 'hue-slider'],
            targetEl: '.spectrum-picker-target',
          }}
        >
          <i
            slot="media"
            style={{ backgroundColor: `${spectrumPickerValue.hex}` }}
            className="icon demo-list-icon spectrum-picker-target"
          />
        </ListInput>

      <ListItem title="Add notes when logging">
        <Toggle slot="after" />
      </ListItem>

    </List>

    <Toolbar position='bottom'>
      <Button fill color="black" popupClose>Cancel</Button>
      <Button fill onClick={onSaveEventType} popupClose >Save</Button>
    </Toolbar>

  </Page>
)};