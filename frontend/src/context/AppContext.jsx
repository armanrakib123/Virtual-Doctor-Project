"use client";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import api from "../utils/axios";
import { toast } from 'react-toastify';
import { doctors as localDoctors } from '../assets/assets';

// Create a new context for global state management
export const AppContext = createContext();

const AppContextProvider = (props) => {

    // Currency symbol used across the app
    const currencySymbol = '$';

    // Get backend URL from environment variable
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

    // Global state variables
    const [doctors, setDoctors] = useState([]); // Stores all doctors fetched from backend
    const [token, setToken] = useState(typeof window !== 'undefined' && localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [userData, setUserData] = useState(false); // Stores logged-in user data

    /**
     * Fetch all doctors from backend API
     */
    const getDoctorsData = async () => {
        try {
            // BACKEND COMMMENTED OUT
            // const { data } = await api.get(`${backendUrl}/api/doctor/list`);
            // if (data.success) {
            //     setDoctors(data.doctors); 
            // } else {
            //     toast.error(data.message); 
            // }

            // Using mock data instead
            setDoctors(localDoctors);
        } catch (error) {
            toast.error(error.message);
        }
    };

    /**
     * Fetch user profile data if token is available
     */
    const loadUserProfileData = async () => {
        try {
            // BACKEND COMMMENTED OUT
            // const { data } = await api.get(
            //     `${backendUrl}/api/user/get-profile`,
            //     { headers: { token } }
            // );
            // if (data.success) {
            //     setUserData(data.userData); 
            // } else {
            //     toast.error(data.message);
            // }

            // Mock User Data
            setUserData({
                name: "Test User",
                email: "test@example.com",
                phone: "1234567890",
                address: { line1: "Test Address 1", line2: "Test Address 2" },
                gender: "Male",
                dob: "1990-01-01",
                image: "https://via.placeholder.com/150"
            });
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Context value to be shared across components
    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData
    };

    /**
     * Fetch doctors list on component mount
     */
    useEffect(() => {
        getDoctorsData();
    }, []);

    /**
     * Load user data whenever token changes
     */
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false); // Clear user data if logged out
        }
    }, [token]);

    return (
        // Provide context to all child components
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
