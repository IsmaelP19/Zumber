# <img src="https://github.com/IsmaelP19/Zumber/blob/main/client/src/logo.png" width="30"> Zumber

Social network developed to allow the publication of short messages.

## Possible ways of using Zumber

 - [Local Installation](#local-installation) :computer:
 - [Internet Deployment](#internet-deployment) :globe_with_meridians:

## Local Installation

### Pre-requirements

- [Git](https://git-scm.com/downloads)
- [Node.js 18.16.0](https://nodejs.org/)

### Steps

1. Clone the project with the following command:

  ```
  git clone https://github.com/IsmaelP19/Zumber.git
  ```
  
2. To run the server correctly it will be necessary to create a file named *.env* inside the **server directory**, with the following content:

  ```
  MONGO_URI = <mongo_uri>
  PORT = 3003
  SECRET = <some_secret_password>
  ```
  
  In **MONGODB_URI** you will have to enter the URI that MongoDB Cloud Atlas gave you, or a local address in case you are using a MongoDB instance on your device.
  
  In **SECRET** you will have to enter a secret password: it will be used to sign the tokens and compare them when necessary. You can use the one you think is best.

3. With the previous file already created, we can run the server by executing the following commands in a command console that is running inside the **server directory**:

    ```  
    npm install
    npm start
    ```

4. To run the client correctly it will be necessary to create a file named *.env* inside the **client directory**, with the following content:

    ```
    REACT_APP_BASE_URL = 'http://localhost:3003/api'
    ```

5. With the previous file already created, we can run the server by executing the following commands in a command console that is running inside the **client directory**:

    ```  
    npm install
    npm start
    ```
    
6. If you've gotten to this point without any errors, you should be running the project locally successfully. You can access the initial route through the following link: [http://localhost:3000](http://localhost:3000) 

## Internet Deployment

In addition to all of the above, the project is deployed in Vercel in the following [link](https://zumber.vercel.app/).
