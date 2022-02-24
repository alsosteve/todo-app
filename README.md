# ToDo list - Context API
A Web Application for securely managing a To Do List

**To Do List Manager Phase 1:** Incorporate configuration settings to the application

In this phase, we'll be adding some top-level settings for the application, so that the user can make some display choices that the app will use by default.

## Before you begin

Refer to *Getting Started*  in the [lab submission instructions](../../../reference/submission-instructions/labs/README.md) for complete setup, configuration, deployment, and submission instructions.

1. Create a new GitHub Repository named `todo-app`
1. Clone this to your machine
1. Copy the contents of the `starter-code` folder from the class repository for today

> Create and work in a new branch for today called 'context-settings'

## Business Requirements

Refer to the [To Do System Overview](../../apps-and-libraries/todo/README.md) for a complete review of the application, including Business and Technical requirements along with the development roadmap.

## Phase 1 :
### Requirements

In Phase 1, we're going to perform some refactoring of the To Do application as built by another team. This application mixes application state and user settings at the top level and passes things around. It was a good proof of concept, but we need to make this production ready.

- Style the application using the [Blueprint Component API](https://blueprintjs.com/docs/#blueprint){target:_blank}

- Properly modularize the application into separate components

- Implement the Context API to make some basic application settings available to components
  - How many To Do Items to show at once
  - Whether or not to show completed items

![To Do with Pagination](todo.png)

### Stretch Goals

- Convert all components from classes to functions
- In your Context, read the settings in from an object in Local Storage and use that as the initial state

## Phase 2 :
### Requirements

In Phase 2, we're going to extend the functionality of our application by allowing the user to make some decisions on how they would like the application to function. Specifically, we'll let them make changes to 2 settings.

- Implement the Context API to make some basic application settings available to components
  - How many To Do Items to show at once
  - Whether or not to show completed items
- Provide the users with a form where they can change the values for those settings
  - This should be given in the form of a new component, perhaps linked to from the main navigation
  - *Hint: Use Browser Router to create the page/route/component for this*
- Save the users choices in Local Storage
- Retrieve their preferences from Local Storage and apply them to the application on startup

### Stretch Goal

Update the state handling for todo items to use `useReducer()` vs separate state management methods

## Phase 3 :
### Requirements

In Phase 3, we'd like to extend the functionality of the application by requiring users be logged in to view items and also restrict access based on user type. The user stories from **Phases 1, and 2** remain unchanged. For this phase, we are now adding the following new user stories.

- As a user, I want to provide a way for other users to create new accounts
- As a user, I want to provide a way for all users to login to their account
- As a user, I want to make sure that my To Do items are only viewable to users that have logged in with a valid account.
- As a user, I want to ensure that only fellow users that are allowed to "create", based on their user type, can add new To Do Items
- As a user, I want to ensure that only fellow users that are allowed to "update", based on their user type, can mark To Do Items complete
- As a user, I want to ensure that only fellow users that are allowed to "delete", based on their user type, can delete new To Do Items

## Phase 4 :
### Requirements

In Phase 4, we will finalize the functionality of the application by connecting to live servers for login, authorization, and data access

### Stretch Goal

Use authorization middleware on the server to add another layer of protection, so that only users with the correct permissions can POST/UPDATE/DELETE.

If you choose to do this, you'll need to send a bearer token with every request...


## Technical Requirements / Notes
### P1:
Based on global configuration

- Show a maximum of a certain number of items per screen in the `<List />` component
  - Provide "next" and "previous" links to let the users navigate a long list of items
- Hide or show completed items in the list
- Optional: Sort the items based on any of the keys (i.e. difficulty)

Implement this using `context`

- Create a `context` for managing application display settings and provide this at the application level
  - Display or Hide completed items (boolean)
  - Number of items to display per screen (number)
  - Default sort field (string)
  - Manually set (hard code) those state settings in the context provider's state, they should not be changeable

Pagination Notes:

- Only display the first `n` items in the list, where `n` is the number to display per screen in your context.
  - If you have more than `n` items in the list, add a button labeled `Next` that will replace the list with the next `n` items in the list.
  - If you are past the first `n` items (i.e. on page 2 or higher), add a button labeled `Previous` that will replace the list with the previous `n` items in the list.

### P3:
Technical requirements for the core application are unchanged from the prior phases, with the following additions and notes:

- Provide an account login screen
  - Accepts Username and Password
  - On successful login, store the token as a cookie
- If a user returns and has a valid login cookie, bypass the login screen and consider them "Logged In"

Using Login/Auth Context, "protect" the To Do application by restricting access to the various application features based on the users' login status and capabilities.

- Implement `<Login />` and `<Auth />` components with Context
- Link to the Login screen in your main menu
  - **Hide the entire interface until the user has logged in.**
  - **Implement the following RBAC rules:**
    - Logged In Users with 'read' permissions can see the summary/count
    - Logged In Users with 'read' permissions can see the list of To Do Items
    - Logged In Users with 'update' permissions can click the records to mark them as complete
    - Logged In Users with 'create' permissions can create new items
    - Logged In Users with 'delete' permissions can delete items

### P4: 
- Alter the Add, Toggle Complete, and Delete functions within your to do application to use your API instead of in memory state
  - Fetch the current list of items from the database on application start
  - Whenever you add/update/delete an item, refresh the state so the user can instantly see the change
    - Consider: Do you re-fetch from the server every time you make a change?
      - If so, how?
      - If not, how will you stay in sync?

- Alter the Login Context to use the server to login users instead of our mock users list
  - Be sure to store the token in state as well as in a cookie so you can reference it later


### API Server

- You will need deployed API Server, which implements a todo item data model
  - `GET /todo`: Gets a list of all items
  - 'POST /todo': Adds an item
  - 'PUT /todo': Updates an item (you'll use this to mark them as complete)
  - 'DELETE /todo/:id' : Deletes an item

### Authentication Server

- You will need a deployed Authenticated API Server, which supports:
  - Registration (`/signup`)
  - Login (`/signin`)
  - Authorization (via Bearer Token)
  - ACL (using user roles)
    - Make sure you have created the user roles and permissions lists that your front-end is expecting to tap into
  - To Do data model for storing the actual to do items

### Testing

- Write unit tests for the Login Context Component
- Write unit tests for the Login/Auth components
  - Hide/Show based on status
- You will need to create some mocking interface to fake a server/login to simulate.
- Tests should assert all behavioral functionality


### Documentation

- Describe how global state is consumed by the components
- Describe the operation of the hook: `useForm()`

### Assignment Submission Instructions

Refer to the the [Submitting React Apps Lab Submission Instructions](../../../reference/submission-instructions/labs/react-apps.md) for the complete lab submission process and expectations
