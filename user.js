class User {
  constructor(id, username, email) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.createdAt = new Date();
  }

  // Get user profile
  getProfile() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      createdAt: this.createdAt
    };
  }

  // Update user profile
  updateProfile(username, email) {
    this.username = username;
    this.email = email;
    return this.getProfile();
  }

  // Validate email
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = User;