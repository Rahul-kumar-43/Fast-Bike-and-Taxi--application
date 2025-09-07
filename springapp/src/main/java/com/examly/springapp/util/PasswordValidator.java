package com.examly.springapp.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordValidator {

    private static final int MIN_LENGTH = 8;
    private static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!*()_\\-{}\\[\\]:;\"'?/<>,.~`|]).*$";

    private static final Pattern pattern = Pattern.compile(PASSWORD_PATTERN);

    /**
     * Validates if the password meets the required strength criteria:
     * 1. At least 8 characters long
     * 2. Contains at least one letter (uppercase or lowercase)
     * 3. Contains at least one digit
     * 4. Contains at least one special character
     * 
     * @param password the password to validate
     * @return true if the password meets all criteria, false otherwise
     */
    public static boolean isStrong(String password) {
        if (password == null || password.length() < MIN_LENGTH) {
            return false;
        }

        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }

    /**
     * Validates the password and returns a descriptive error message if invalid
     * 
     * @param password the password to validate
     * @return null if password is valid, error message otherwise
     */
    public static String validatePassword(String password) {
        if (password == null) {
            return "Password cannot be null";
        }

        if (password.length() < MIN_LENGTH) {
            return "Password must be at least " + MIN_LENGTH + " characters long";
        }

        if (!password.matches(".*[a-zA-Z].*")) {
            return "Password must contain at least one letter";
        }

        if (!password.matches(".*[0-9].*")) {
            return "Password must contain at least one digit";
        }

        if (!password.matches(".*[@#$%^&+=!*()_\\-{}\\[\\]:;\"'?/<>,.~`|].*")) {
            return "Password must contain at least one special character";
        }

        return null; // Password is valid
    }
}
