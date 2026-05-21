import { validateCorsOrigin, validateDataset, validateDocumentWebhook, validateProject, validateRobot, validateRole, } from '@sanity/blueprints';
import { SANITY_FUNCTION_PREFIX } from '../constants.js';
export function isLocalFunctionResource(r) {
    return r.type.startsWith(SANITY_FUNCTION_PREFIX);
}
// type narrowing with predicate functions
export function isScheduleEvent(e) {
    return e !== null && typeof e === 'object' && ('hour' in e || 'expression' in e);
}
export function isCorsOriginResource(r) {
    return validateCorsOrigin(r).length === 0;
}
export function isProjectResource(r) {
    return validateProject(r).length === 0;
}
export function isRobotResource(r) {
    return validateRobot(r).length === 0;
}
export function isRoleResource(r) {
    return validateRole(r).length === 0;
}
export function isDatasetResource(r) {
    return validateDataset(r).length === 0;
}
// TODO: update to use blueprints helpers once available
export function isStudioResource(r) {
    return r.type === 'sanity.studio';
}
export function isAssetResource(r) {
    return isLocalFunctionResource(r) || isStudioResource(r);
}
export function isWebhookResource(r) {
    return validateDocumentWebhook(r).length === 0;
}
export function isEventType(arg) {
    return ['create', 'update', 'delete'].includes(arg);
}
export function isGroqContextOptions(context) {
    return 'clientOptions' in context;
}
/** @internal */
export var BlueprintParserErrorType;
(function (BlueprintParserErrorType) {
    BlueprintParserErrorType["InvalidProperty"] = "invalid_property";
    BlueprintParserErrorType["InvalidVersion"] = "invalid_version";
    BlueprintParserErrorType["InvalidType"] = "invalid_type";
    BlueprintParserErrorType["MissingRequiredProperty"] = "missing_required_property";
    BlueprintParserErrorType["DuplicateName"] = "duplicate_name";
    BlueprintParserErrorType["InvalidFormat"] = "invalid_format";
    BlueprintParserErrorType["InvalidValue"] = "invalid_value";
    BlueprintParserErrorType["JsonValidationError"] = "json_validation_error";
    BlueprintParserErrorType["InvalidInput"] = "invalid_input";
    BlueprintParserErrorType["MissingParameter"] = "missing_parameter";
})(BlueprintParserErrorType || (BlueprintParserErrorType = {}));
export const INSTALLER_OPTIONS = ['npm', 'pnpm', 'yarn'];
