// Auth utilities using localStorage

export const registerUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(user => user.username === username)) {
    throw new Error('User already exists');
  }
  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
};

export const loginUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  throw new Error('Invalid credentials');
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};
