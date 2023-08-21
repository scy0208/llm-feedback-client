type JSONType = {
    [key: string]: any;
};
type UUID = string;
export declare class Client {
    private projectId;
    private apiKey;
    constructor(projectId: string, apiKey: string);
    registerConfig(configName: string, config: JSONType): string;
    storeContent(content: string, configName: string, id?: UUID, groupId?: UUID, createdBy?: string): UUID;
    createFeedback(contentId: string, key: string, score: number, comment: string, user: string): UUID;
}
export {};
