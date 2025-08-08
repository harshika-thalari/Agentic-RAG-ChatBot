// const BASE_URL = "http://4.187.160.167:8055"; // Your live backend URL

// /**
//  * Gets or creates a user profile.
//  * Endpoint: POST /api/getProfile
//  * @param {string} email
//  * @returns {Promise<object>} The user profile data { id, user_type }.
//  */
// export const getProfile = async (email) => {
//   const response = await fetch(`${BASE_URL}/api/getProfile`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ preferredUsername: email }),
//   });
//   if (!response.ok) throw new Error('Failed to get profile');
//   return response.json();
// };

// /**
//  * Fetches the streaming response from the AI.
//  * Endpoint: POST /api/question_stream
//  * @param {object} params - { query, thread_id, new_chat, user_id, email_id }
//  * @param {function} onData - Callback function to handle each chunk of streamed data.
//  * @returns {Promise<object>} A promise that resolves with the response headers (thread_id, response_msg_id, img_ids).
//  */
// export const questionStream = async (params, onData) => {
//   const response = await fetch(`${BASE_URL}/api/question_stream`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(params),
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`API Error: ${response.status} - ${errorText}`);
//   }

//   // --- THIS IS THE CRITICAL STREAMING LOGIC ---
//   const reader = response.body.getReader();
//   const decoder = new TextDecoder();
  
//   while (true) {
//     const { value, done } = await reader.read();
//     if (done) break;
//     const chunk = decoder.decode(value, { stream: true });
//     onData(chunk); // Send each piece of text back to the component
//   }
//   // --- END OF STREAMING LOGIC ---

//   // Return the headers after the stream is complete
//   return {
//     thread_id: response.headers.get('thread_id'),
//     response_msg_id: response.headers.get('response_msg_id'),
//     img_ids: JSON.parse(response.headers.get('img_ids') || '[]'),
//   };
// };


// /**
//  * Gets a modified response from the AI (also streaming).
//  * Endpoint: POST /modify_response
//  */
// export const modifyResponse = async (params, onData) => {
//   const response = await fetch(`${BASE_URL}/modify_response`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(params),
//   });

//   if (!response.ok) throw new Error('Failed to modify response');

//   const reader = response.body.getReader();
//   const decoder = new TextDecoder();

//   while (true) {
//     const { value, done } = await reader.read();
//     if (done) break;
//     const chunk = decoder.decode(value, { stream: true });
//     onData(chunk);
//   }

//   return {
//     thread_id: response.headers.get('thread_id'),
//     response_msg_id: response.headers.get('response_msg_id'),
//   };
// };

// /**
//  * Rates a message.
//  * Endpoint: POST /api/rate_message
//  */
// export const rateMessage = async (params) => {
//   const response = await fetch(`${BASE_URL}/api/rate_message`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(params),
//   });
//   if (!response.ok) throw new Error('Failed to rate message');
//   return response.json();
// };

// /**
//  * Gets all chat threads for a user.
//  * Endpoint: POST /api/getAllChats
//  */
// export const getAllChats = async (userId) => {
//   const response = await fetch(`${BASE_URL}/api/getAllChats`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ id: userId }),
//   });
//   if (!response.ok) throw new Error('Failed to get chats');
//   return response.json();
// };

// /**
//  * Generates follow-up questions.
//  * Endpoint: POST /api/followup
//  */
// export const getFollowupQuestions = async (responseText) => {
//   const response = await fetch(`${BASE_URL}/api/followup`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ response: responseText }),
//   });
//   if (!response.ok) throw new Error('Failed to get follow-up questions');
//   return response.json();
// };
const BASE_URL = "http://4.187.160.167:8055"; // Your live backend URL

/**
 * A helper function to handle streaming fetch responses.
 * @param {string} url - The full URL to fetch.
 * @param {object} options - The options for the fetch call (method, headers, body).
 * @param {function} onData - A callback function to handle each chunk of streamed data.
 * @returns {Promise<Headers>} A promise that resolves with the response headers.
 */
const fetchStream = async (url, options, onData) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    onData(chunk); // Send each piece of text back to the component
  }

  return response.headers;
};


// --- EXPORTED API FUNCTIONS ---

export const getProfile = async (email) => {
  const response = await fetch(`${BASE_URL}/api/getProfile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ preferredUsername: email }),
  });
  if (!response.ok) throw new Error('Failed to get profile');
  return response.json();
};

export const questionStream = (params, onData) => {
  return fetchStream(`${BASE_URL}/api/question_stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }, onData);
};

export const modifyResponse = (params, onData) => {
  return fetchStream(`${BASE_URL}/modify_response`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }, onData);
};

export const rateMessage = async (params) => {
  const response = await fetch(`${BASE_URL}/api/rate_message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!response.ok) throw new Error('Failed to rate message');
  return response.json();
};

export const getAllChats = async (userId) => {
  const response = await fetch(`${BASE_URL}/api/getAllChats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: userId }),
  });
  if (!response.ok) throw new Error('Failed to get chats');
  return response.json();
};

export const getFollowupQuestions = async (responseText) => {
  const response = await fetch(`${BASE_URL}/api/followup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ response: responseText }),
  });
  if (!response.ok) throw new Error('Failed to get follow-up questions');
  return response.json();
};