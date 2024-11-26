import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
export const appwriteConfig = {
  endpoint:'https://cloud.appwrite.io/v1',
  platform:'com.aora.jose',
  projectId: "673e73620023baa2130a",
  databaseId: "673e74a0001fe403f1b4",
  userCollectionId:"673e74c900105f6a6fc2",
  videoCollectionId: '673e74f100043eccfadd',
  storageId: '673e762c00343a65886e'

}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async ({email,password,username}: any)=> {
  try {
    const newAccount = await account.create(ID.unique(),email,password,username);

    if(!newAccount) throw Error

    const avatarUrl = avatars.getInitials(username)

    await signIn({email,password})

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),{
        accountId: newAccount.$id,
        email:email,
        username:username,
        avatar:avatarUrl
      }
    )
    return newUser;
  } catch (error) {
    throw console.error(error);
  }
}

export const signIn = async ({email,password}:any) => {
  try {
    const session = await account.createEmailPasswordSession(email,password);
  } catch (error) {
    console.log(error)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount)throw new Error('no current account');

    const currentUser = await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.userCollectionId,[Query.equal('accountId',currentAccount.$id)])

    if(!currentUser) throw new Error('no current user');

    return currentUser.documents[0];

  } catch (error) {
    console.log(error)
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.videoCollectionId)
    return posts.documents
  } catch (error) {
    console.log(error)
  }
}
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.videoCollectionId,[Query.orderDesc('$createdAt',Query.limit(7))])
    return posts.documents
  } catch (error) {
    console.log(error)
  }
}

export const searchPost = async (query:any) => {
  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.videoCollectionId,[Query.search('title',query)])
    return posts.documents
  } catch (error) {
    console.log(error)
  }
}

export const getUserPosts = async (userId:string) => {
  try {
    const posts = await databases.listDocuments(appwriteConfig.databaseId,appwriteConfig.videoCollectionId,[Query.search('creator',userId)])
    return posts.documents
  } catch (error:any) {
    throw new Error(error);
  }
}


export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error:any) {
    throw new Error(error);
  }
}