# polaris-workflow



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type                | Default     |
| ----------- | ------------ | ----------- | ------------------- | ----------- |
| `activity`  | `activity`   |             | `string`            | `undefined` |
| `ctx`       | --           |             | `Context`           | `this`      |
| `page`      | --           |             | `Page`              | `this`      |
| `parent`    | --           |             | `Context`           | `undefined` |
| `process`   | `process`    |             | `Process \| string` | `undefined` |
| `sessionId` | `session-id` |             | `string`            | `undefined` |
| `tag`       | `tag`        |             | `string`            | `undefined` |
| `url`       | `url`        |             | `string`            | `undefined` |
| `value`     | `value`      |             | `object \| string`  | `undefined` |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `wfMessage` |             | `CustomEvent<any>` |


## Methods

### `addActivity(activity: Activity, replace?: boolean) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `addValidator(validator: Validator) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `load(process: string | Process, next?: string, sessionId?: string) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setServices(ctx: Context) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with love!*
