"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const uuid_1 = require("uuid");
class Client {
    constructor({ projectId, apiKey, baseUrl = "api.llmfeedback.com" }) {
        this.projectId = projectId;
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
    registerConfig({ configName, config }) {
        console.log(`Config ${configName} registered:`, config);
        return configName;
    }
    storeContent({ content, configName, id, groupId, createdBy }) {
        const contentId = id || (0, uuid_1.v4)();
        console.log(`Content stored with ID ${contentId} and config ${configName}:`, content);
        if (groupId) {
            console.log(`Group ID: ${groupId}`);
        }
        if (createdBy) {
            console.log(`Created by: ${createdBy}`);
        }
        return contentId;
    }
    createFeedback({ contentId, key, score, comment, user }) {
        const feedbackId = (0, uuid_1.v4)();
        console.log(`Feedback for content ID ${contentId}:`);
        console.log(`Key: ${key}`);
        console.log(`Score: ${score}`);
        console.log(`Comment: ${comment}`);
        console.log(`User: ${user}`);
        console.log(`Feedback ID: ${feedbackId}`);
        return feedbackId;
    }
}
exports.Client = Client;
