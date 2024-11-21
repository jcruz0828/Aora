import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const authLayout = () => {
  return (
    <>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen
        name='sign-in'
        options={{
          headerShown:false
        }}
        />
        <Stack.Screen
        name='sign-up'
        options={{
          headerShown:false
        }}
        />
      </Stack>
      <StatusBar  backgroundColor='#161622'
      style='light'/>
    </>
  )
}

export default authLayout