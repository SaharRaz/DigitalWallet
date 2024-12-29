import Group from '../model/group.model.js';
import logger from "../../../logger.js";

const groupsController = {
    async createGroup(data) {
        try {
            const group = new Group(data);
            const savedGroup = await group.save();
            logger.info('Group created successfully', { id: savedGroup._id });
            return savedGroup;
        } catch (err) {
            logger.error('Error creating group', { error: err.message });
            throw err;
        }
    },

    async getAllGroups() {
        try {
            const groups = await Group.find().populate('members');
            logger.info('Fetched all groups');
            return groups;
        } catch (err) {
            logger.error('Error fetching groups', { error: err.message });
            throw err;
        }
    },

    async getGroupById(groupId) {
        try {
            const group = await Group.findById(groupId).populate('members');
            if (!group) {
                logger.warn('Group not found', { id: groupId });
                return null;
            }
            logger.info('Fetched group by ID', { id: groupId });
            return group;
        } catch (err) {
            logger.error('Error fetching group by ID', { error: err.message });
            throw err;
        }
    },

    async updateGroup(groupId, updateData) {
        try {
            const updatedGroup = await Group.findByIdAndUpdate(groupId, updateData, { new: true }).populate('members');
            if (!updatedGroup) {
                logger.warn('Group not found for update', { id: groupId });
                return null;
            }
            logger.info('Group updated successfully', { id: groupId });
            return updatedGroup;
        } catch (err) {
            logger.error('Error updating group', { error: err.message });
            throw err;
        }
    },

    async deleteGroup(groupId) {
        try {
            const deletedGroup = await Group.findByIdAndDelete(groupId);
            if (!deletedGroup) {
                logger.warn('Group not found for deletion', { id: groupId });
                return null;
            }
            logger.info('Group deleted successfully', { id: groupId });
            return deletedGroup;
        } catch (err) {
            logger.error('Error deleting group', { error: err.message });
            throw err;
        }
    },
};

export default groupsController;
