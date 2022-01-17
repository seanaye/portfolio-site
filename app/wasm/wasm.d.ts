/* tslint:disable */
/* eslint-disable */
/**
*/
export enum Cell {
  Dead,
  Alive,
}
/**
*/
export class DxUniverse {
  free(): void;
/**
* @param {number} width
* @param {number} height
* @returns {DxUniverse}
*/
  static new(width: number, height: number): DxUniverse;
/**
*/
  tick(): void;
/**
* @returns {number}
*/
  cells(): number;
/**
* @param {number} row
* @param {number} col
* @param {number} state
*/
  set_cell(row: number, col: number, state: number): void;
/**
* @param {number} width
* @param {number} height
*/
  set_size(width: number, height: number): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_dxuniverse_free: (a: number) => void;
  readonly dxuniverse_new: (a: number, b: number) => number;
  readonly dxuniverse_tick: (a: number) => void;
  readonly dxuniverse_cells: (a: number) => number;
  readonly dxuniverse_set_cell: (a: number, b: number, c: number, d: number) => void;
  readonly dxuniverse_set_size: (a: number, b: number, c: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
