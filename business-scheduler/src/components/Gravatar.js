// import React, { Component } from 'react'
// import { Query } from 'react-apollo'
// import gql from 'graphql-tag'
// import Gravatar from 'react-gravatar'
// import { AUTH_TOKEN } from '../constants'

// class ServiceList extends Component {

//     _subscribeToNewUser =(subscribeToMore) => {
//         subscribeToMore({
//             // document: NEW_USER_SUBSCRIPTION,
//             updateQuery: (prev, { subscriptionData }) => {
//                 if (!subscriptionData.data) return prev
//                 const userFeed = subscriptionData.data.userFeed
//                 const exists = prev.user.find(({ id }) => id === userFeed.id);
//                 if (exists) return prev;

//                 return Object.assign({}, prev, {
//                     user: {
//                         user: [userFeed, ...prev.user],
//                         count: prev.user.length + 1,
//                         __typename: prev.feed.__typename

//                     }
//                 })
//             }
//         })
//     }

//     render() {
//         const authToken = localStorage.getItem(AUTH_TOKEN)
//         const USER_QUERY = gql`
//      {
//         user {
//         id
//         firstname
//         lastname
//         email
//      }
//     }
//    `
// //         const NEW_USER_SUBSCRIPTION = gql`
// //    subscription{
// //        userFeed{
// //            id
// //            firstname
// //            lastname
// //            email
// //        }
// //    }
// //    `

//         return (
//             <React.Fragment>
//                 {authToken && (
//                     <Query query={USER_QUERY} >
//                         {({ loading, error, data, subscribeToMore }) => {
//                             if (loading) return <div>Fetching</div>
//                             if (error) return <div>Error</div>
//                             this._subscribeToNewUser(subscribeToMore)
//                             const name = data.user.firstname + " " + data.user.lastname

//                             return (
//                                 <React.Fragment>

//                                     <Gravatar email={data.user.email} id="gravatar" data-toggle="tooltip" data-placement="top" title={name} />

//                                 </React.Fragment>
//                             )
//                         }}
//                     </Query>
//                 )}
//             </React.Fragment>

//         )
//     }
// }

// export default ServiceList

