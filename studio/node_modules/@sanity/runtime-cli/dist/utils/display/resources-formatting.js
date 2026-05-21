import { isLocalFunctionResource, isScheduleEvent } from '../../utils/types.js';
import { styleText } from '../style-text.js';
function formatLabel(label) {
    return styleText('dim', `${label}:`);
}
function formatLabeledValue(label, value) {
    return `${styleText('dim', `${label}:`)} ${value}`;
}
function arrayifyEvent(event) {
    if (!event)
        return undefined;
    const details = [];
    if (isScheduleEvent(event)) {
        if ('expression' in event) {
            details.push(formatLabeledValue('expression', event.expression));
        }
        else {
            details.push(formatLabeledValue('expression', `${event.minute} ${event.hour} ${event.dayOfWeek} ${event.month} ${event.dayOfMonth}`));
        }
    }
    else {
        if ('on' in event && event.on) {
            details.push(formatLabeledValue('on', event.on.map((o) => `"${o}"`).join(', ')));
        }
        if ('filter' in event && event.filter) {
            details.push(formatLabeledValue('filter', event.filter));
        }
        if ('projection' in event && event.projection) {
            details.push(formatLabeledValue('projection', event.projection));
        }
        if (event.resource) {
            details.push(formatLabel('resource'));
            details.push([
                formatLabeledValue('type', event.resource.type),
                formatLabeledValue('id', event.resource.id),
            ]);
        }
    }
    return details;
}
export function arrayifyFunction(fn) {
    const details = [formatLabeledValue('type', fn.type)];
    if (!isLocalFunctionResource(fn))
        return details;
    if (fn.memory)
        details.push(formatLabeledValue('memory', fn.memory));
    if (fn.timeout)
        details.push(formatLabeledValue('timeout', fn.timeout));
    if (fn.event) {
        const eventDetails = arrayifyEvent(fn.event);
        if (eventDetails) {
            details.push(formatLabel('event'));
            details.push(eventDetails);
        }
    }
    return details;
}
export function arrayifyCors(resource) {
    return [formatLabeledValue('origin', resource.origin)];
}
export function arrayifyRobot(resource) {
    const details = [formatLabeledValue('label', resource.label)];
    if (resource.memberships.length > 0) {
        details.push(formatLabel('memberships'));
        const memberships = [];
        resource.memberships.forEach((m, i) => {
            const membership = [];
            membership.push(formatLabeledValue('resourceType', m.resourceType));
            membership.push(formatLabeledValue('resourceId', m.resourceId));
            if (m.roleNames.length > 0) {
                membership.push(formatLabeledValue('roleNames', m.roleNames.join(', ')));
            }
            else {
                membership.push(formatLabeledValue('roleNames', '[]'));
            }
            memberships.push(formatLabel(i.toString()));
            memberships.push(membership);
        });
        details.push(memberships);
    }
    else {
        details.push(formatLabeledValue('memberships', '[]'));
    }
    if (resource.resourceType) {
        details.push(formatLabeledValue('resourceType', resource.resourceType));
    }
    if (resource.resourceId) {
        details.push(formatLabeledValue('resourceId', resource.resourceId));
    }
    return details;
}
export function arrayifyRole(resource) {
    const details = [];
    if (resource.description)
        details.push(formatLabeledValue('description', resource.description));
    if (resource.permissions.length > 0) {
        details.push(formatLabel('permissions'));
        const permissions = [];
        const permissionsMap = {};
        resource.permissions.forEach((p) => {
            if (!permissionsMap[p.name])
                permissionsMap[p.name] = [];
            permissionsMap[p.name].push(p.action);
        });
        Object.keys(permissionsMap).forEach((name) => void permissions.push(formatLabeledValue(name, permissionsMap[name].join(', '))));
        details.push(permissions);
    }
    return details;
}
export function arrayifyDataset(resource) {
    const details = [];
    if (resource.aclMode)
        details.push(formatLabeledValue('aclMode', resource.aclMode));
    return details;
}
export function arrayifyWebhook(resource) {
    const details = [];
    if (resource.description)
        details.push(formatLabeledValue('description', resource.description));
    details.push(formatLabeledValue('url', resource.url));
    details.push(formatLabeledValue('on', resource.on.join(', ')));
    if (resource.filter)
        details.push(formatLabeledValue('filter', resource.filter));
    if (resource.projection)
        details.push(formatLabeledValue('projection', resource.projection));
    if (resource.status)
        details.push(formatLabeledValue('status', resource.status));
    if (resource.httpMethod)
        details.push(formatLabeledValue('httpMethod', resource.httpMethod));
    if (resource.dataset)
        details.push(formatLabeledValue('dataset', resource.dataset));
    // not included: headers, includeDrafts, includeAllVersions, secret, apiVersion
    return details;
}
