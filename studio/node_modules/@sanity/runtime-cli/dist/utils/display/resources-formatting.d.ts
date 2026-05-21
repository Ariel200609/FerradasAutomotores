import type { BlueprintCorsOriginResource, BlueprintDatasetResource, BlueprintDocumentWebhookResource, BlueprintResource, BlueprintRobotResource, BlueprintRoleResource } from '@sanity/blueprints';
import type { TreeInput } from 'array-treeify';
export declare function arrayifyFunction(fn: BlueprintResource): TreeInput;
export declare function arrayifyCors(resource: BlueprintCorsOriginResource): TreeInput;
export declare function arrayifyRobot(resource: BlueprintRobotResource): TreeInput;
export declare function arrayifyRole(resource: BlueprintRoleResource): TreeInput;
export declare function arrayifyDataset(resource: BlueprintDatasetResource): TreeInput;
export declare function arrayifyWebhook(resource: BlueprintDocumentWebhookResource): TreeInput;
