import type { ManifestEntry } from 'workbox-build';

declare global {
  interface ServiceWorkerGlobalScope {
    __WB_MANIFEST: Array<ManifestEntry>;
  }
}
