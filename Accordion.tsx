import React from 'react'

import { Square, Text, useEvent, XStack, YStack } from '@my/ui'

import { color } from '../../../theme'
import { MenuIcon } from '../SideBar/icons'

interface AccordionProps {
  label: string
  info: string
  id: number
  setSelected: (value: number) => void
  selected: number
}
export const Accordion = (props: AccordionProps) => {
  const onPress = useEvent(() => {
    if (props.selected === props.id) {
      props.setSelected(-1)
    } else {
      props.setSelected(props.id)
    }
  })

  return (
    <YStack
      style={{
        width: '100%',
        marginBottom: '15px',
        borderRadius: 5,
        padding: 10,
        backgroundColor: color.lighterWhite,
      }}
    >
      <XStack
        style={{
          width: '100%',
          position: 'relative',
          padding: '4px',
          justifyContent: 'space-between',
        }}
        onPress={onPress}
      >
        <Text color={color.secondaryBlack} fontSize={16} fontWeight={'200'}>
          {props.label ?? 'Banner Visuality'}
        </Text>
        <Square
          animation={'lazy'}
          bc={'$backgroundTransparent'}
          rotate={props.selected === props.id ? '0deg' : '-90deg'}
        >
          <MenuIcon path={require('./downarrow.png')} width={15} height={7.5} />
        </Square>
      </XStack>

      <YStack
        animation={'lazy'}
        // bc={color.lightGray}
        bc={'$backgroundTransparent'}
        width={'100%'}
        overflow="hidden"
        height={props.selected !== props.id ? 0 : '100%'}
        padding={props.selected !== props.id ? 0 : 20}
      >
        <Text
          animation={'lazy'}
          ta="left"
          color={color.primaryText}
          fontSize={16}
          fontWeight={'100'}
          textAlign="justify"
        >
          {props.info}
        </Text>
      </YStack>
    </YStack>
  )
}
