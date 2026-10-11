const User = require('../schema/User');
const generateToken = require('../utils/generateToken');

// @desc Register Course Seeker or Course Provider
// @route POST /api/auth/register
// @access Public
const register = async (req, res) => {
  try {
    const {
      role,
      // Seeker fields
      name,
      qualification,
      // Provider fields
      providerType,
      instituteName,
      about,
      // Shared fields
      email,
      password,
      phone,
      country,
      state,
      city,
      address,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Account with this email already exists' });
    }

    let newUserPayload = {
      role: role === 'provider' ? 'provider' : 'seeker',
      email: email.toLowerCase().trim(),
      password,
      phone: phone || '',
      country: country || '',
      state: state || '',
      city: city || '',
      address: address || '',
    };

    if (newUserPayload.role === 'seeker') {
      if (!name) {
        return res.status(400).json({ success: false, message: 'Full Name is required for Course Seeker' });
      }
      newUserPayload.name = name;
      newUserPayload.qualification = qualification || '';
    } else {
      if (!instituteName) {
        return res.status(400).json({ success: false, message: 'Name of Academy or IELTS Institute is required' });
      }
      if (!providerType) {
        return res.status(400).json({ success: false, message: 'Please select Academy or IELTS Institute type' });
      }
      newUserPayload.instituteName = instituteName;
      newUserPayload.providerType = providerType;
      newUserPayload.about = about || '';
    }

    const user = await User.create(newUserPayload);

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: `${user.role === 'provider' ? 'Course Provider' : 'Course Seeker'} registered successfully!`,
      token,
      user: {
        _id: user._id,
        role: user.role,
        name: user.name,
        instituteName: user.instituteName,
        providerType: user.providerType,
        email: user.email,
        phone: user.phone,
        country: user.country,
        state: user.state,
        city: user.city,
        address: user.address,
        qualification: user.qualification,
        about: user.about,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during registration' });
  }
};

// @desc Login User (Seeker or Provider)
// @route POST /api/auth/login
// @access Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        role: user.role,
        name: user.name,
        instituteName: user.instituteName,
        providerType: user.providerType,
        email: user.email,
        phone: user.phone,
        country: user.country,
        state: user.state,
        city: user.city,
        address: user.address,
        qualification: user.qualification,
        about: user.about,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during login' });
  }
};

// @desc Get current authenticated user profile
// @route GET /api/auth/me
// @access Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update user profile
// @route PUT /api/auth/profile
// @access Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const {
      name,
      qualification,
      instituteName,
      providerType,
      phone,
      country,
      state,
      city,
      address,
      about,
    } = req.body;

    if (user.role === 'seeker') {
      if (name !== undefined) user.name = name;
      if (qualification !== undefined) user.qualification = qualification;
    } else if (user.role === 'provider') {
      if (instituteName !== undefined) user.instituteName = instituteName;
      if (providerType !== undefined) user.providerType = providerType;
      if (about !== undefined) user.about = about;
    }

    if (phone !== undefined) user.phone = phone;
    if (country !== undefined) user.country = country;
    if (state !== undefined) user.state = state;
    if (city !== undefined) user.city = city;
    if (address !== undefined) user.address = address;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser._id,
        role: updatedUser.role,
        name: updatedUser.name,
        instituteName: updatedUser.instituteName,
        providerType: updatedUser.providerType,
        email: updatedUser.email,
        phone: updatedUser.phone,
        country: updatedUser.country,
        state: updatedUser.state,
        city: updatedUser.city,
        address: updatedUser.address,
        qualification: updatedUser.qualification,
        about: updatedUser.about,
      },
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to update profile' });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
};
