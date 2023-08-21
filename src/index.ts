import { v4 as uuidv4 } from 'uuid';

type JSONType = { [key: string]: any };
type UUID = string;

export class Client {
    private projectId: string;
    private apiKey: string;

    constructor(projectId: string, apiKey: string) {
        this.projectId = projectId;
        this.apiKey = apiKey;
    }

    registerConfig(configName: string, config: JSONType): string {
        // Here, we assume you would be storing the config somewhere, 
        // possibly sending it to an API or saving it in a database.
        // For simplicity, I'm just printing it out.
        console.log(`Config ${configName} registered:`, config);
        return configName;
    }

    storeContent(content: string, configName: string, id?: UUID, groupId?: UUID, createdBy?: string): UUID {
        const contentId = id || uuidv4();

        // Similarly, here you would save your content data to your storage solution.
        console.log(`Content stored with ID ${contentId} and config ${configName}:`, content);

        if (groupId) {
            console.log(`Group ID: ${groupId}`);
        }

        if (createdBy) {
            console.log(`Created by: ${createdBy}`);
        }

        return contentId;
    }

    createFeedback(contentId: string, key: string, score: number, comment: string, user: string): UUID {
        const feedbackId = uuidv4();

        // Store the feedback. Again, for simplicity, just printing it out.
        console.log(`Feedback for content ID ${contentId}:`);
        console.log(`Key: ${key}`);
        console.log(`Score: ${score}`);
        console.log(`Comment: ${comment}`);
        console.log(`User: ${user}`);
        console.log(`Feedback ID: ${feedbackId}`);

        return feedbackId;
    }
}