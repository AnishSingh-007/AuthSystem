const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, // don’t return password by default
        },

        roles: {
            type: [String],
            enum: [
                "student",
                "admin",
                "teacher",
                "manager",
                "team_leader",
                "content_developer",
                "security_expert",
                "developer",
            ],
            default: ["student"],
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        emailVerificationToken: String,
        emailVerificationTokenExpires: Date,

        passwordResetToken: String,
        passwordResetTokenExpires: Date,

        failedLoginAttempts: {
            type: Number,
            default: 0,
        },

        lockUntil: {
            type: Date,
        },
    },
    { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function () {
    // if (!this.isModified("password")) return;

    // const salt = await bcrypt.genSalt(12);
    // this.password = await bcrypt.hash(this.password, salt);
    try {
        if (!this.isModified("password")) return;

        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);