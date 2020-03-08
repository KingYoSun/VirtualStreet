/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTweet2rekognition = /* GraphQL */ `
  query GetTweet2rekognition($updated_at_date: AWSTimestamp!, $id: ID!) {
    getTweet2rekognition(updated_at_date: $updated_at_date, id: $id) {
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
export const listTweet2rekognitions = /* GraphQL */ `
  query ListTweet2rekognitions(
    $updated_at_date: AWSTimestamp!
    $limit: Int
    $nextToken: String
  ) {
    listTweet2rekognitions(
      updated_at_date: $updated_at_date
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const queryTweet2rekognitionsByUpdatedAtDateUpdatedAtTimeIndex = /* GraphQL */ `
  query QueryTweet2rekognitionsByUpdatedAtDateUpdatedAtTimeIndex(
    $updated_at_date: AWSTimestamp!
    $first: Int
    $after: String
  ) {
    queryTweet2rekognitionsByUpdatedAtDateUpdatedAtTimeIndex(
      updated_at_date: $updated_at_date
      first: $first
      after: $after
    ) {
      items {
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
      nextToken
    }
  }
`;
export const queryTweet2rekognitionsByUpdatedAtDateRetweetIndex = /* GraphQL */ `
  query QueryTweet2rekognitionsByUpdatedAtDateRetweetIndex(
    $updated_at_date: AWSTimestamp!
    $first: Int
    $after: String
  ) {
    queryTweet2rekognitionsByUpdatedAtDateRetweetIndex(
      updated_at_date: $updated_at_date
      first: $first
      after: $after
    ) {
      items {
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
      nextToken
    }
  }
`;
export const queryTweet2rekognitionsByUpdatedAtDateFavoriteIndex = /* GraphQL */ `
  query QueryTweet2rekognitionsByUpdatedAtDateFavoriteIndex(
    $updated_at_date: AWSTimestamp!
    $first: Int
    $after: String
  ) {
    queryTweet2rekognitionsByUpdatedAtDateFavoriteIndex(
      updated_at_date: $updated_at_date
      first: $first
      after: $after
    ) {
      items {
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
      nextToken
    }
  }
`;
export const queryTweet2rekognitionsByUserScreenNameTimestampIndex = /* GraphQL */ `
  query QueryTweet2rekognitionsByUserScreenNameTimestampIndex(
    $user_screen_name: String!
    $limit: Int
    $nextToken: String
  ) {
    queryTweet2rekognitionsByUserScreenNameTimestampIndex(
      user_screen_name: $user_screen_name
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const queryTweet2rekognitionsByUserNameTimestampIndex = /* GraphQL */ `
  query QueryTweet2rekognitionsByUserNameTimestampIndex(
    $user_name: String!
    $first: Int
    $after: String
  ) {
    queryTweet2rekognitionsByUserNameTimestampIndex(
      user_name: $user_name
      first: $first
      after: $after
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getTweet2rekognitionUser = /* GraphQL */ `
  query GetTweet2rekognitionUser($user_screen_name: String!) {
    getTweet2rekognitionUser(user_screen_name: $user_screen_name) {
      user_screen_name
      user_name
      user_profile_banner
      user_profile_description
      user_profile_follow_count
      user_profile_follower_count
      user_profile_image
      user_profile_url
      time_to_live
    }
  }
`;
export const listTweet2rekognitionUsersFollower = /* GraphQL */ `
  query ListTweet2rekognitionUsersFollower(
    $user_screen_name: String
    $user_name: String
    $user_profile_description: String
    $limit: Int
    $nextToken: String
  ) {
    listTweet2rekognitionUsersFollower(
      user_screen_name: $user_screen_name
      user_name: $user_name
      user_profile_description: $user_profile_description
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        user_screen_name
        user_name
        user_profile_banner
        user_profile_description
        user_profile_follow_count
        user_profile_follower_count
        user_profile_image
        user_profile_url
        time_to_live
      }
      nextToken
    }
  }
`;
export const listTweet2rekognitionUsersLatest = /* GraphQL */ `
  query ListTweet2rekognitionUsersLatest(
    $user_screen_name: String
    $user_name: String
    $user_profile_description: String
    $limit: Int
    $nextToken: String
  ) {
    listTweet2rekognitionUsersLatest(
      user_screen_name: $user_screen_name
      user_name: $user_name
      user_profile_description: $user_profile_description
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        user_screen_name
        user_name
        user_profile_banner
        user_profile_description
        user_profile_follow_count
        user_profile_follower_count
        user_profile_image
        user_profile_url
        time_to_live
      }
      nextToken
    }
  }
`;
