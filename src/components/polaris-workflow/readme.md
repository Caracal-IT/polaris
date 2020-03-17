# polaris-workflow



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type               | Default     |
| ----------- | ------------ | ----------- | ------------------ | ----------- |
| `activity`  | `activity`   |             | `string`           | `undefined` |
| `ctx`       | --           |             | `Context`          | `this`      |
| `parent`    | --           |             | `Context`          | `undefined` |
| `process`   | `process`    |             | `object \| string` | `undefined` |
| `sessionId` | `session-id` |             | `string`           | `undefined` |
| `tag`       | `tag`        |             | `string`           | `undefined` |
| `url`       | `url`        |             | `string`           | `undefined` |
| `value`     | `value`      |             | `any`              | `undefined` |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `wfMessage` |             | `CustomEvent<any>` |


## Methods

### `addActivity(activity: Activity) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `addValidator(validator: Validator) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `load(process: any, next?: string, sessionId?: string) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `setServices(ctx: Context) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with love!*
