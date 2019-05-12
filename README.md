# Task Manager API 🗒

## Features

- CRUD operations. In associate with MongoDB and Mongoose.
- Authentication and protect API with middleware.
- File upload.
- Simple sort, filter and paging.
- Test with Jest .

## Up & Running 🏃‍♂️

1. Run `npm install`
2. Rename `.env_example` to `dev.env`
3. Run in development `npm run dev`
4. Test `npm test`

## Extra study

- Ideas for test further

//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks
