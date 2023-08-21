import { v4 as uuidv4 } from 'uuid';

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
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error occurred while calling /api/v0/register-llm-config', error);
            throw error; // Re-throwing the error so that the calling function can handle it if needed
        }

        return configName
    }


    async storeContent({ content, configName, id, groupId, createdBy }:
        { content: string; configName: string; id?: UUID; groupId?: UUID; createdBy?: string; }): Promise<UUID> {

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
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation ', error);
            throw error; // Re-throwing the error so the user can handle it if needed
        }

        return contentId;
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
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error occurred while calling /api/v0/create-feedback ', error);
            throw error; // Re-throwing the error so that the calling function can handle it if needed
        }
    }

}