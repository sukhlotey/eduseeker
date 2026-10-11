const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['seeker', 'provider'],
      required: true,
      default: 'seeker',
    },
    // Course Seeker specific fields
    name: {
      type: String,
      trim: true,
    },
    qualification: {
      type: String,
      trim: true,
    },

    // Course Provider specific fields
    providerType: {
      type: String,
      enum: ['Academy', 'IELTS Institute', ''],
      default: '',
    },
    instituteName: {
      type: String,
      trim: true,
    },
    about: {
      type: String,
      trim: true,
      default: '',
    },

    // Shared credentials and contact details
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    country: {
      type: String,
      trim: true,
      default: '',
    },
    state: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
