/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTweet2rekognition = /* GraphQL */ `
  subscription OnCreateTweet2rekognition(
    $favorite: Int
    $id: ID
    $retweet: Int
    $timestamp: AWSTimestamp
    $updated_at_date: AWSTimestamp
  ) {
    onCreateTweet2rekognition(
      favorite: $favorite
      id: $id
      retweet: $retweet
      timestamp: $timestamp
      updated_at_date: $updated_at_date
    ) {
      favorite
      id
      retweet
      timestamp
      updated_at_date
      updated_at_time
      user_name
      user_screen_name
      user_profile_image
      url
      text
      img
    }
  }
`;
export const onUpdateTweet2rekognition = /* GraphQL */ `
  subscription OnUpdateTweet2rekognition(
    $favorite: Int
    $id: ID
    $retweet: Int
    $timestamp: AWSTimestamp
    $updated_at_date: AWSTimestamp
  ) {
    onUpdateTweet2rekognition(
      favorite: $favorite
      id: $id
      retweet: $retweet
      timestamp: $timestamp
      updated_at_date: $updated_at_date
    ) {
      favorite
      id
      retweet
      timestamp
      updated_at_date
      updated_at_time
      user_name
      user_screen_name
      user_profile_image
      url
      text
      img
    }
  }
`;
export const onDeleteTweet2rekognition = /* GraphQL */ `
  subscription OnDeleteTweet2rekognition(
    $favorite: Int
    $id: ID
    $retweet: Int
    $timestamp: AWSTimestamp
    $updated_at_date: AWSTimestamp
  ) {
    onDeleteTweet2rekognition(
      favorite: $favorite
      id: $id
      retweet: $retweet
      timestamp: $timestamp
      updated_at_date: $updated_at_date
    ) {
      favorite
      id
      retweet
      timestamp
      updated_at_date
      updated_at_time
      user_name
      user_screen_name
      user_profile_image
      url
      text
      img
    }
  }
`;
export const onCreateTweet2rekognitionUser = /* GraphQL */ `
  subscription OnCreateTweet2rekognitionUser(
    $user_screen_name: String
    $user_name: String
    $user_profile_banner: String
    $user_profile_description: String
    $user_profile_follow_count: Int
  ) {
    onCreateTweet2rekognitionUser(
      user_screen_name: $user_screen_name
      user_name: $user_name
      user_profile_banner: $user_profile_banner
      user_profile_description: $user_profile_description
      user_profile_follow_count: $user_profile_follow_count
    ) {
      user_screen_name
      user_name
      user_profile_banner
      user_profile_description
      user_profile_follow_count
      user_profile_follower_count
      user_profile_image
      user_profile_url
    }
  }
`;
export const onUpdateTweet2rekognitionUser = /* GraphQL */ `
  subscription OnUpdateTweet2rekognitionUser(
    $user_screen_name: String
    $user_name: String
    $user_profile_banner: String
    $user_profile_description: String
    $user_profile_follow_count: Int
  ) {
    onUpdateTweet2rekognitionUser(
      user_screen_name: $user_screen_name
      user_name: $user_name
      user_profile_banner: $user_profile_banner
      user_profile_description: $user_profile_description
      user_profile_follow_count: $user_profile_follow_count
    ) {
      user_screen_name
      user_name
      user_profile_banner
      user_profile_description
      user_profile_follow_count
      user_profile_follower_count
      user_profile_image
      user_profile_url
    }
  }
`;
export const onDeleteTweet2rekognitionUser = /* GraphQL */ `
  subscription OnDeleteTweet2rekognitionUser(
    $user_screen_name: String
    $user_name: String
    $user_profile_banner: String
    $user_profile_description: String
    $user_profile_follow_count: Int
  ) {
    onDeleteTweet2rekognitionUser(
      user_screen_name: $user_screen_name
      user_name: $user_name
      user_profile_banner: $user_profile_banner
      user_profile_description: $user_profile_description
      user_profile_follow_count: $user_profile_follow_count
    ) {
      user_screen_name
      user_name
      user_profile_banner
      user_profile_description
      user_profile_follow_count
      user_profile_follower_count
      user_profile_image
      user_profile_url
    }
  }
`;
