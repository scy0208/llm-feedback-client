type JSONType = {
    [key: string]: any;
};
type UUID = string;
export declare class Client {
    private projectId;
    private apiKey;
    private baseUrl;
    constructor({ projectId, apiKey, baseUrl }: {
        projectId: string;
        apiKey: string;
        baseUrl?: string;
    });
    registerConfig({ configName, config }: {
        configName: string;
        config: JSONType;
    }): Promise<string>;
    contentUUID(s: string, time?: Date): string;
    storeContent({ content, configName, id, groupId, createdBy }: {
        content: string;
        configName: string;
        id?: string;
        groupId?: string;
        createdBy?: string;
    }): Promise<UUID>;
    logDialogue({ instruction, response, configName, id, groupId, createdBy }: {
        instruction: string;
        response: string;
        configName: string;
        id?: string;
        groupId?: string;
        createdBy?: string;
    }): Promise<string>;
    createFeedback({ contentId, key, score, comment, user }: {
        contentId: string;
        key: string;
        score: number;
        comment?: string;
        user?: string;
    }): Promise<void>;
}
export {};
