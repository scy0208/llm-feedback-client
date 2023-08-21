import { v4 as uuidv4 } from 'uuid';

type JSONType = { [key: string]: any };
type UUID = string;

export class Client {
    private projectId: string;
    private apiKey: string;

    private baseUrl: string;

    constructor({ projectId, apiKey, baseUrl = "api.llmfeedback.com" }: { projectId: string; apiKey: string; baseUrl?: string; }) {
        this.projectId = projectId;
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    registerConfig({ configName, config }: { configName: string; config: JSONType; }): string {
        console.log(`Config ${configName} registered:`, config);
        return configName;
    }

    storeContent({ content, configName, id, groupId, createdBy }:
        { content: string; configName: string; id?: UUID; groupId?: UUID; createdBy?: string; }): UUID {
        
        const contentId = id || uuidv4();
        console.log(`Content stored with ID ${contentId} and config ${configName}:`, content);

        if (groupId) {
            console.log(`Group ID: ${groupId}`);
        }
        if (createdBy) {
            console.log(`Created by: ${createdBy}`);
        }
        
        return contentId;
    }

    createFeedback({ contentId, key, score, comment, user }:
        { contentId: string; key: string; score: number; comment?: string; user?: string; }): UUID {
        
        const feedbackId = uuidv4();
        console.log(`Feedback for content ID ${contentId}:`);
        console.log(`Key: ${key}`);
        console.log(`Score: ${score}`);
        console.log(`Comment: ${comment}`);
        console.log(`User: ${user}`);
        console.log(`Feedback ID: ${feedbackId}`);

        return feedbackId;
    }
}
