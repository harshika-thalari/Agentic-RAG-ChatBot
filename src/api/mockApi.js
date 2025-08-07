// This file simulates your API endpoints.
// The dummy responses are structured to match your API documentation.

const DUMMY_USER_ID = "user-123";
const DUMMY_THREAD_ID = "chat-abc123";

/**
 * Mocks a POST request to create or get a user profile.
 * Endpoint: /api/getProfile
 * @param {string} preferredUsername The user's email.
 * @returns {Promise<object>} A promise that resolves with the user profile data.
 */
export const getProfile = async (preferredUsername) => {
  console.log(`Mock API call: POST /api/getProfile with username: ${preferredUsername}`);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (preferredUsername === "error@example.com") {
    return {
      status: 400,
      body: { error: "Invalid email" }
    };
  }

  return {
    status: 200,
    body: {
      id: DUMMY_USER_ID,
      type: "regular",
    }
  };
};

/**
 * Mocks a POST request to stream an AI response.
 * Endpoint: /api/question_stream
 * @param {object} params The request parameters.
 * @returns {Promise<object>} A promise that resolves with a dummy streaming response object.
 */
export const questionStream = async (params) => {
  console.log(`Mock API call: POST /api/question_stream with query: ${params.query}`);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const dummyResponses = [
    "I'm an AI assistant designed to answer your questions. This is a dummy response from the mock API.",
    "This response simulates a more complex answer that would be streamed in a real-world scenario. For example, it could contain information retrieved from a database.",
    "The answer you are looking for is related to the project's architecture. It leverages a RAG system and various AI models."
  ];

  const randomIndex = Math.floor(Math.random() * dummyResponses.length);
  const responseMessage = dummyResponses[randomIndex];

  // In a real app, this would be a StreamingResponse.
  // We'll simulate it by returning the full message.
  return {
    thread_id: params.thread_id || DUMMY_THREAD_ID,
    response_msg_id: "msg-" + Date.now(),
    response_text: responseMessage,
  };
};

/**
 * Mocks a POST request to modify an AI response.
 * Endpoint: /modify_response
 * @param {object} params The request parameters.
 * @returns {Promise<object>} A promise that resolves with a new streaming response object.
 */
export const modifyResponse = async (params) => {
  console.log(`Mock API call: POST /modify_response with action: ${params.action}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const originalText = params.response;
  let modifiedText = "";
  
  switch (params.action) {
    case 'shorter':
      modifiedText = "Shorter version of the original response.";
      break;
    case 'longer':
      modifiedText = "A much longer, more detailed version of the original response. This is a simulated output to show the functionality.";
      break;
    case 'more_professional':
      modifiedText = "In a professional context, the original response would be rephrased to this, maintaining a formal and respectful tone.";
      break;
    case 'more_casual':
      modifiedText = "Hey, here's the original response but in a super chill and casual way. Hope this helps!";
      break;
    case 'simpler':
      modifiedText = "A simple explanation: the original response means this.";
      break;
    default:
      modifiedText = originalText;
  }

  return {
    thread_id: params.thread_id,
    response_msg_id: "msg-" + Date.now(),
    response_text: modifiedText,
    isModified: true // New field to indicate it's a modified message
  };
};

/**
 * Mocks a POST request to rate a message.
 * Endpoint: /api/rate_message
 * @param {object} params The request parameters.
 * @returns {Promise<object>} A promise that resolves with a confirmation.
 */
export const rateMessage = async (params) => {
  console.log(`Mock API call: POST /api/rate_message with rating: ${params.rating}`);
  await new Promise(resolve => setTimeout(resolve, 200));

  return {
    status: 200,
    message: `Rating '${params.rating}' saved successfully for message ${params.response_msg_id}.`
  };
};

/**
 * Mocks a POST request to get all chat threads for a user.
 * Endpoint: /api/getAllChats
 * @param {string} userId The ID of the user.
 * @returns {Promise<object>} A promise that resolves with a list of chat metadata.
 */
export const getAllChats = async (userId) => {
  console.log(`Mock API call: POST /api/getAllChats for user: ${userId}`);
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    chats: [
      { chatId: "chat-abc123", title: "Project Discussion", last_message: "See you soon!" },
      { chatId: "chat-def456", title: "API Integration", last_message: "Looks good!" },
      { chatId: "chat-ghi789", title: "New Feature Brainstorm", last_message: "Sounds great!" },
    ]
  };
};

/**
 * Mocks a DELETE request to delete a chat session.
 * Endpoint: /api/chat
 * @param {string} chatId The ID of the chat to delete.
 * @param {string} userId The ID of the user.
 * @returns {Promise<object>} A promise that resolves with a success message.
 */
export const deleteChat = async (chatId, userId) => {
  console.log(`Mock API call: DELETE /api/chat for chat: ${chatId} and user: ${userId}`);
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (chatId === "error-id") {
    return { status: 404, error: "Chat not found" };
  }
  
  return { status: 204, message: "Chat deleted successfully" };
};