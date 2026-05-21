/**
 * @public
 * Restrict the editor to one line. The plugin takes care of blocking
 * `insert.break` events and smart handling of other `insert.*` events.
 *
 * Place it with as high priority as possible to make sure other plugins don't
 * overwrite `insert.*` events before this plugin gets a chance to do so.
 */
export declare function OneLinePlugin(): null

export {}
