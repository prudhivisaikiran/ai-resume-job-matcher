# MongoDB Setup Guide

To run this project, you need a MongoDB database. We recommend MongoDB Atlas for a free cloud-hosted database.

## 1. Create a MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Sign up or Log in.
3. Create a new Project (e.g., "ResumeMatcher").

## 2. Create a Cluster
1. Click "Build a Database".
2. Select **M0 Sandbox** (Free Tier).
3. Choose a region near you.
4. Click "Create".

## 3. Create a Database User
1. Go to **Database Access** in the sidebar.
2. Click "Add New Database User".
3. Authentication Method: "Password".
4. Enter a **Username** and **Password** (Remember these!).
5. Role: "Read and write to any database".
6. Click "Add User".

## 4. Network Access (Whitelist IP)
1. Go to **Network Access** in the sidebar.
2. Click "Add IP Address".
3. Select "Allow Access from Anywhere" (0.0.0.0/0) for development ease, OR "Add Current IP Address" for better security.
4. Click "Confirm".

## 5. Get Connection String
1. Go to **Database** in the sidebar.
2. Click "Connect" on your cluster.
3. Select "Drivers".
4. Copy the connection string (e.g., `mongodb+srv://<user>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`).

## 6. Configure Project
1. Open `backend/.env`.
2. Paste the string into `MONGO_URI`.
3. Replace `<password>` with your actual password.
4. Replace `?retryWrites=...` with the specific database name if desired, e.g., `...mongodb.net/resumematcher?retryWrites...`.
