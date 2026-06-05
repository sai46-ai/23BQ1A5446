# Notification System Design

## Objective

The system displays the Top 10 highest-priority unread notifications for students.

## Architecture

Notification API → Notification Service → Priority Inbox → Output

## Logging Middleware

A custom logging middleware is used throughout the application.
It provides info(), warn(), and error() methods.
All important actions and errors are logged.

## Working

1. Authenticate and generate access token.
2. Fetch notifications from API.
3. Filter unread notifications.
4. Store Top 10 notifications using a Min Heap.
5. Sort notifications by priority.
6. Display the final list.

## Complexity

Time Complexity: O(n)
Space Complexity: O(10)

## Future Improvements

Real-time updates, user preferences, and persistent log storage.
