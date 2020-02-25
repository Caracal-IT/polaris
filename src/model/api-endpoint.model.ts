import { Endpoint } from "./endpoint.model";
import { Mapping } from "./mapping.model";

export interface ApiEndpoint extends Endpoint {
    mappings: Array<Mapping>;
}