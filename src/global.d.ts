/// <reference types="svelte" />

declare namespace svelte.JSX {
  interface HTMLProps<T> {
    onout?: (e: Event) => void;
  }
}
