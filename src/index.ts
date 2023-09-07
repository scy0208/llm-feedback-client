import { v4 as uuidv4 } from 'uuid';
import MD5 from 'crypto-js/md5';

type JSONType = { [key: string]: any };
type UUID = string;

export class Client {
    private projectId: string;
    private apiKey: string;

    private baseUrl: string;

    constructor({ projectId, apiKey, baseUrl = "https://api.llmfeedback.com" }: { projectId: string; apiKey: string; baseUrl?: string; }) {
        this.projectId = projectId;
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async registerConfig({ configName, config }:
        { configName: string; config: JSONType; }): Promise<string> {

        console.log(`Config ${configName} registered:`, config);

        const configRequestBody: JSONType = {
            project_id: this.projectId,
            name: configName,
            config
        };

        try {
            const response = await fetch(`${this.baseUrl}/api/v0/register-llm-config`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(configRequestBody),
            });

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error occurred while calling /api/v0/register-llm-config', error);
        }

        return configName
    }

    contentUUID(s: string, time: Date = new Date()): string {
        const timeStamp = time instanceof Date? time?.toDateString() : time
        const res = s + this.projectId + timeStamp.slice(0, 16);
        const hashResult = MD5(res);
        const hashString: string = hashResult.toString();
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

    async storeContent({ content, configName, id, groupId, createdBy }:
        { content: string; configName: string; id?: string; groupId?: string; createdBy?: string; }): Promise<UUID> {

        const contentId = id || uuidv4();
        console.log(`Content stored with ID ${contentId} and config ${configName}:`, content);

        const requestBody: JSONType = {
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
            const response = await fetch(`${this.baseUrl}/api/v0/store-content`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation ', error);
        }

        return contentId;
    }

    async logDialogue({ instruction, response, configName, id=uuidv4(), groupId, createdBy }:
        { instruction: string; response: string; configName: string; id?: string; groupId?: string; createdBy?: string; }): Promise<string> {

        console.log(`Dialogue stored with ID ${id} and config ${configName}:`, instruction, response);

        const requestBody: JSONType = {
            instruction,
            response,
            id,
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
            const response = await fetch(`${this.baseUrl}/api/v0/log-dialogue`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation ', error);
        }
        return id;
    }

    async createFeedback({ contentId, key, score, comment, user }:
        { contentId: string; key: string; score: number; comment?: string; user?: string; }): Promise<void> {

        console.log(`Feedback for content ID ${contentId}:`);
        console.log(`Key: ${key}`);
        console.log(`Score: ${score}`);
        console.log(`Comment: ${comment}`);
        console.log(`User: ${user}`);


        const feedbackBody: JSONType = {
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
            const response = await fetch(`${this.baseUrl}/api/v0/create-feedback`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackBody),
            });

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error occurred while calling /api/v0/create-feedback ', error);
        }
    }

}