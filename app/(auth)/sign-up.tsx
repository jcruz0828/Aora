import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '@/lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username) {
      Alert.alert('Error', 'Please fill in your username');
      return;
    }
    if (!form.email) {
      Alert.alert('Error', 'Please fill in your email');
      return;
    }
    if (!form.password) {
      Alert.alert('Error', 'Please fill in your password');
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form);  // Await the async operation
      router.replace('/home');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 mr-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-2xl text-white text-semibold mt-10 font-semibold'>
            Sign up to Aora
          </Text>
          
          <FormField
            title='Username'
            value={form.username}  // Corrected
            handleChangeText={(e: any) => setForm({ ...form, username: e })}  // Corrected
            otherStyles='mt-7'
            keyboardType='default'
          />
          
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
            secureTextEntry={true}
          />
          
          <CustomButton
            title={isSubmitting ? 'Signing Up...' : 'Sign Up'}
            handlePress={submit}
            containerStyles='mt-7'
            disabled={isSubmitting}  // Disable while submitting
          />
          
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Already have an account?
            </Text>
            <Link href='/sign-in' className='text-lg font-semibold text-secondary'>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
