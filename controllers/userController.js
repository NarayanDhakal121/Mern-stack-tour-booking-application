// import User from '../models/User.js';

// // Function to create a new user
// // export const createUser = async (req, res) => {
// //     const { username, email, password } = req.body;

// //     try {
// //         // Checking if the user already exists
// //         const existingUser = await User.findOne({ email });

// //         if (existingUser) {
// //             return res.status(400).json({ message: "User already exists" });
// //         }

// //         // Creating a new user
// //         const newUser = await User.create({ email, password, username });

// //         // Sending the created user as a response
// //         res.status(201).json(newUser);
// //     } catch (error) {
// //         console.error("Error creating user:", error);
// //         res.status(500).json({ message: "Something went wrong" });
// //     }
// // };



// export const createUser = async (req, res) => {
//     const { username, email, password, role } = req.body;

//     try {
//         // Checking if the user already exists
//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Hash the password before storing it
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Creating a new user
//         const newUser = await User.create({ email, password: hashedPassword, username, role });
//         console.log("user created successfully")

//         // Sending the created user as a response
//         res.status(201).json(newUser);
//     } catch (error) {
//         console.error("Error creating user:", error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// export const requireAdmin = (req, res, next) => {
//     // Check if the user is an admin
//     if (req.user && req.user.role === 'admin') {
//         return next(); // Allow access to the route
//     } else {
//         return res.status(403).json({ message: "Admin access required" });
//     }
// };



// // Function to update an existing user
// export const updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { username, email, password } = req.body;

//     try {
//         // Updating the user and getting the updated document
//         const updatedUser = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });

//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Sending the updated user as a response
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error("Error updating user:", error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// // Function to get all users
// export const getAllUsers = async (req, res) => {
//     try {
//         // Getting all users
//         const users = await User.find();

//         // Sending all users as a response
//         res.status(200).json(users);
//     } catch (error) {
//         console.error("Error getting all users:", error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// // Function to get a single user by ID
// export const getSingleUser = async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Getting the user by ID
//         const user = await User.findById(id);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Sending the user as a response
//         res.status(200).json(user);
//     } catch (error) {
//         console.error("Error getting single user:", error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// // Function to delete a user by ID
// export const deleteUser = async (req, res) => {
//     const { id } = req.params;

//     try {
//         // Deleting the user by ID
//         const deletedUser = await User.findByIdAndRemove(id);

//         if (!deletedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Sending a success message as a response
//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };








import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Function to create a new user
export const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Checking if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating a new user
        const newUser = await User.create({ email, password: hashedPassword, username, role });
        console.log("User created successfully");

        // Sending the created user as a response
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Middleware to require admin access
export const requireAdmin = async (req, res, next) => {
    try {
        // Check if the user is an admin
        const user = await User.findById(req.user.id);

        if (user && user.role === 'admin') {
            return next(); // Allow access to the route
        } else {
            return res.status(403).json({ message: "Admin access required" });
        }
    } catch (error) {
        console.error("Error checking admin role:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// Function to update an existing user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        // Updating the user and getting the updated document
        const updatedUser = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Sending the updated user as a response
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Function to get all users
export const getAllUsers = async (req, res) => {
    try {
        // Getting all users
        const users = await User.find();

        // Sending all users as a response
        res.status(200).json(users);
    } catch (error) {
        console.error("Error getting all users:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Function to get a single user by ID
export const getSingleUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Getting the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Sending the user as a response
        res.status(200).json(user);
    } catch (error) {
        console.error("Error getting single user:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Function to delete a user by ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Deleting the user by ID
        const deletedUser = await User.findByIdAndRemove(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Sending a success message as a response
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


