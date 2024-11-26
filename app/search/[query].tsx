import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  RefreshControlComponent,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "@/components/SearchInput";

import EmptyState from "@/components/EmptyState";
import { searchPost } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalSearchParams } from "expo-router";

const Search = () => {
  const { data: posts, refetch } = useAppwrite(()=>searchPost(query));
  const {query} = useGlobalSearchParams()
  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item): any => item.$id}
        renderItem={({ item }: any) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.users.username}
            avatar={item.users.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 ">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
           
            <View className="mt-6 mb-6">
            <SearchInput inititialQuery={query} />
            </View>
          </View>
         
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="No Videos Found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
