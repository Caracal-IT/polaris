export interface Mapping {
    client: string;
    remote: string;
    direction: 'in' | 'out' | 'inout';
}