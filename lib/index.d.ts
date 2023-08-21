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
    storeContent({ content, configName, id, groupId, createdBy }: {
        content: string;
        configName: string;
        id?: UUID;
        groupId?: UUID;
        createdBy?: string;
    }): Promise<UUID>;
    createFeedback({ contentId, key, score, comment, user }: {
        contentId: string;
        key: string;
        score: number;
        comment?: string;
        user?: string;
    }): Promise<void>;
}
export {};
