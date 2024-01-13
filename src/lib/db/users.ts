
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// export async function createUser(email:string) {
//     try {
//       // Check if the user already exists
//       const existingUser = await prisma.user.findUnique({
//         where: {
//           email,
//         },
//       });
  
//       if (existingUser) {
//         console.log('User already exists:', existingUser);
//         return existingUser;
//       }
  
//       // If the user doesn't exist, create a new user
//       const newUser = await prisma.user.create({
//         data: {
//           email,

//           // Add other user-related fields as needed
//         },
//       });
  
//       return newUser;
//     } catch (error) {
//       console.error('Error creating user:', error);
//       throw error;
//     }
//   }

