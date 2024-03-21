const { userModel } = require("../../models/userModel");

exports.getUserProfile = async (req, res) => {
    try {
        const { userId } = req;
        const currentUser = await userModel.findOne({ _id: userId }).select('-password');
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(currentUser);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
