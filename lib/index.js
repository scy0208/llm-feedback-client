"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const uuid_1 = require("uuid");
const md5_1 = __importDefault(require("crypto-js/md5"));
class Client {
    constructor({ projectId, apiKey, baseUrl = "https://api.llmfeedback.com" }) {
        this.projectId = projectId;
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }
    registerConfig({ configName, config }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Config ${configName} registered:`, config);
            const configRequestBody = {
                project_id: this.projectId,
                name: configName,
                config
            };
            try {
                const response = yield fetch(`${this.baseUrl}/api/v0/register-llm-config`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(configRequestBody),
                });
                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status}`);
                }
            }
            catch (error) {
                console.error('Error occurred while calling /api/v0/register-llm-config', error);
            }
            return configName;
        });
    }
    contentUUID(s, time = new Date()) {
        const timeStamp = time instanceof Date ? time === null || time === void 0 ? void 0 : time.toDateString() : time;
        const res = s + this.projectId + timeStamp.slice(0, 16);
        const hashResult = (0, md5_1.default)(res);
        const hashString = hashResult.toString();
        // Convert the hash to UUID format
        const result = [
            hashString.slice(0, 8),
            hashString.slice(8, 12),
            hashString.slice(12, 16),
            hashString.slice(16, 20),
            hashString.slice(20, 32),
        ].join('-');
        return result;
    }
    storeContent({ content, configName, id, groupId, createdBy }) {
        return __awaiter(this, void 0, void 0, function* () {
            const contentId = id || (0, uuid_1.v4)();
            console.log(`Content stored with ID ${contentId} and config ${configName}:`, content);
            const requestBody = {
                content,
                id: contentId,
                project_id: this.projectId,
                config_name: configName
            };
            if (createdBy) {
                requestBody.created_by = createdBy;
            }
            if (groupId) {
                requestBody.group_id = groupId;
            }
            try {
                const response = yield fetch(`${this.baseUrl}/api/v0/store-content`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                });
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                }
            }
            catch (error) {
                console.error('There was a problem with the fetch operation ', error);
            }
            return contentId;
        });
    }
    createFeedback({ contentId, key, score, comment, user }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Feedback for content ID ${contentId}:`);
            console.log(`Key: ${key}`);
            console.log(`Score: ${score}`);
            console.log(`Comment: ${comment}`);
            console.log(`User: ${user}`);
            const feedbackBody = {
                project_id: this.projectId,
                content_id: contentId,
                key,
                score
            };
            if (comment) {
                feedbackBody.comment = comment;
            }
            if (user) {
                feedbackBody.user = user;
            }
            try {
                const response = yield fetch(`${this.baseUrl}/api/v0/create-feedback`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(feedbackBody),
                });
                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status}`);
                }
            }
            catch (error) {
                console.error('Error occurred while calling /api/v0/create-feedback ', error);
            }
        });
    }
}
exports.Client = Client;
