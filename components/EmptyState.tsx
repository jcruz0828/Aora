import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subTitle }:any) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <View>
        <Text className="text-2xl font-psemibold text-white mt-2 text-center">{title}</Text>
        <Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>
        <CustomButton
        title = 'Create video'
        handlePress = {()=> router.push('/create')}
        containerStyles = "my-5"
        />
      </View>
    </View>
  );
};

export default EmptyState;
