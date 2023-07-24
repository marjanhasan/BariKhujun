const mongoose = require("mongoose");
const User = require("../models/userModel");
const { MongoClient } = require("mongodb"); // Adjust the path as needed
const uri = "mongodb+srv://CodingParina:bq659a2QHSATIaFf@cluster0.epkr42c.mongodb.net/?retryWrites=true&w=majority"
// Database Name
const dbName = "test";

MongoClient.connect(uri, (err, client) => {
    if (err) {
        console.error("Error connecting to MongoDB:", err);
        return;
    }

    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // Your updateMany operation here
    db.collection("users").updateMany({}, {$unset: {type: "role"}}, (error, result) => {
        if (error) {
            console.error("Error updating documents:", error);
        } else {
            console.log("Documents updated successfully:", result.modifiedCount);
        }

        // Close the connection
        client.close();
    });
}).then(r =>  console.log("Performed"));

 // Function to update existing users
// async function addRolesToExistingUsers() {
//     try {
//         const users = await User.find();
//         for (const user of users) {
//             user.roles = "user"; // Set the default value here
//             await user.save();
//         }
//         console.log("Updated all existing users.");
//         connection.close();
//     } catch (error) {
//         console.error("Error updating users:", error);
//     }
// }
//
// async function removeRoleFromOwners() {
//     try {
//         // Update documents with role "owner" to remove the 'role' field
//         connect.users.updateMany(
//             { },
//             { $unset: { role: "" } }
//         )
//
//         console.log("Role field removed from all 'owner' users.");
//         connection.close()
//     } catch (error) {
//         connection.close()
//         console.error("error :", error);
//     }
// }
//
// Call this function to remove the role key from all users
// removeRoleFromOwners().then(r => console.log("Done with modification"));

// Call this function to update add roles to existing users
// addRolesToExistingUsers().then(r => console.log("Done with migration"));
