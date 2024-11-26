import { View, Text, ScrollView, FlatList,Image, RefreshControlComponent, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import { useGlobalContext } from '@/context/globalProvider'
import { SearchBar } from 'react-native-screens'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import VideoCard from '@/components/VideoCard'

const Home = () => {
  const {user}:any = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false)
  const {data:posts,refetch} = useAppwrite(getAllPosts);
  const {data:latestPosts} = useAppwrite(getLatestPosts);

const onRefreshing  = async ()=>{
  setRefreshing(true);
  await refetch()
  setRefreshing(false);
}

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
       data = {posts}
       keyExtractor={(item):any => item.$id}
       renderItem={({item}:any)=>(
        <VideoCard 
        title={item.title}
        thumbnail={item.thumbnail}
        video={item.video}
        creator={item.users.username}
        avatar={item.users.avatar}
        />
       )}
       ListHeaderComponent={() => (
        <View className="flex my-6 px-4 space-y-6">
          <View className="flex justify-between items-start flex-row mb-6">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Welcome Back
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {user.username}
              </Text>
            </View>

            <View className="mt-1.5">
              <Image
                source={images.logoSmall}
                className="w-9 h-10"
                resizeMode="contain"
              />
            </View>
          </View>
          <SearchInput/>
          <View className='w-full flex-1 pt-1 pb-8'>
            <Text className='text-gray-100 text-lg font-pregular mb-3'>
              Latest Videos:
            </Text>
            <Trending
            posts ={latestPosts}
            />
          </View>
          </View>
       )}
       ListEmptyComponent={()=>(
        <EmptyState
        title = 'No Videos Found'
        subTitle = 'Be the first one to upload a video'
        />
    )}
    refreshControl={<RefreshControl
    refreshing = {refreshing}
    onRefresh={onRefreshing}
    />}
       />
    </SafeAreaView>
  )
}

export default Home
