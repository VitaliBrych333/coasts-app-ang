// import { User } from '../../core/user.model';
// import { AuthActionTypes, All } from '../actions/user.actions';


// export interface StateCourses {

//   coursesList: any;
//   authorsList: any;
//   errorMessage: string | null;
// }




// export const initialStateCourses: StateCourses = {
//   coursesList: [
//     {
//       "id": 8693,
//       "name": "duis mollit reprehenderit ad",
//       "description": "Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.",
//       "isTopRated": false,
//       "date": "2017-09-28T04:39:24+00:00",
//       "authors": [
//         {
//           "id": 1370,
//           "firstName": "Polly",
//           "lastName": "Sosa"
//         }
//       ],
//       "length": 157
//     },
//     {
//       "id": 4980,
//       "name": "magna excepteur aute deserunt",
//       "description": "Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.",
//       "isTopRated": false,
//       "date": "2016-05-31T02:02:36+00:00",
//       "authors": [
//         {
//           "id": 8413,
//           "firstName": "Greta",
//           "lastName": "Richardson"
//         },
//         {
//           "id": 7458,
//           "firstName": "Deana",
//           "lastName": "Bruce"
//         },
//         {
//           "id": 5508,
//           "firstName": "Patsy",
//           "lastName": "Bright"
//         }
//       ],
//       "length": 207
//     },
//     {
//       "id": 4282,
//       "name": "sit voluptate eiusmod ea",
//       "description": "Commodo id sunt sunt adipisicing et aliquip voluptate laborum consectetur. Occaecat nisi sint exercitation ullamco adipisicing irure est in consectetur aute voluptate. Ea pariatur dolor anim ea reprehenderit ut non occaecat magna adipisicing exercitation nisi consequat.",
//       "isTopRated": true,
//       "date": "2017-03-25T12:57:37+00:00",
//       "authors": [
//         {
//           "id": 3618,
//           "firstName": "Laura",
//           "lastName": "Kirby"
//         },
//         {
//           "id": 9064,
//           "firstName": "Quinn",
//           "lastName": "Cain"
//         }
//       ],
//       "length": 197
//     },
//     {
//       "id": 1936,
//       "name": "reprehenderit est veniam elit",
//       "description": "Consectetur veniam non nulla in laboris minim ipsum. Dolor aliqua irure sint do irure magna tempor culpa quis. Deserunt amet occaecat velit sit.",
//       "isTopRated": true,
//       "date": "2016-03-18T06:36:07+00:00",
//       "authors": [
//         {
//           "id": 9926,
//           "firstName": "Burt",
//           "lastName": "Holland"
//         },
//         {
//           "id": 6440,
//           "firstName": "Andrews",
//           "lastName": "Byers"
//         },
//         {
//           "id": 8509,
//           "firstName": "Shawn",
//           "lastName": "Craig"
//         }
//       ],
//       "length": 232
//     },
//     {
//       "id": 2006,
//       "name": "reprehenderit eiusmod nostrud amet",
//       "description": "Est consequat deserunt officia fugiat culpa in aliquip consectetur. Est nostrud occaecat cillum elit officia officia ea magna et minim officia commodo sunt. Deserunt duis minim magna nostrud enim enim commodo sit elit nostrud cillum aliquip est qui.",
//       "isTopRated": true,
//       "date": "2017-01-18T19:10:51+00:00",
//       "authors": [
//         {
//           "id": 21,
//           "firstName": "Maddox",
//           "lastName": "Diaz"
//         },
//         {
//           "id": 800,
//           "firstName": "Glenda",
//           "lastName": "Juarez"
//         },
//         {
//           "id": 1772,
//           "firstName": "Hilda",
//           "lastName": "Gaines"
//         },
//         {
//           "id": 3003,
//           "firstName": "Abbott",
//           "lastName": "Mckay"
//         }
//       ],
//       "length": 42
//     }],
//   authorsList: [],
//   errorMessage: null
// };

// export function reducerCoursesList(state = initialStateCourses, action: All): StateCourses {
//   switch (action.type) {
//     case AuthActionTypes.LOAD_MORE_SUCCESS: {
//       return {
//         ...state,
//         coursesList: state.coursesList.concat(action.payload.coursesArray
//                                               .slice((action.payload.coursesArray.length - 5), (action.payload.coursesArray.length + 1))),
//         authorsList: [],
//         errorMessage: null
//       };
//     }

//     case AuthActionTypes.UPDATE_COURSE: {

//       return {
//         ...state,
//         coursesList: state.coursesList.map((item: any) =>
//                         item.id === action.payload.id ? item = action.payload : item),
//         authorsList: [],
//         errorMessage: null
//       };
//     }

//     case AuthActionTypes.ADD_COURSE: {
//       return {
//         ...state,
//         coursesList: state.coursesList.concat(action.payload),
//         authorsList: [],
//         errorMessage: null
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// }

