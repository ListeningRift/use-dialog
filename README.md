# useDialog

Vue3 Modal Promise Hook

## Installation

```
npm i use-dialog-vue3
```

## Getting Started

```html
<!-- exampleModal.vue -->
<script setup>
import { useDialog } from 'use-dialog-vue3'

const props = defineProps<{
  title: string
}>()

const { visible, close, dismiss } = useDialog()

const onOk = () => {
  close('ok') // Using the `close` method to close the modal will bring you to resolve
}

const onCancel = () => {
  dismiss('cancel') // Using the `dismiss` method to close the modal will bring you to reject
}
</script>

<template>
  <!-- Not just antdv, not limited to any component library. -->
  <a-modal v-model:visible="visible" :title="props.title" @ok="onOk" @cancel="onCancel">
    <div>example</div>
  </a-modal>
</template>
```

```html
<!-- index.vue -->
<script setup>
import { defineAsyncComponent } from 'vue'
import { useDialog } from 'use-dialog'

const { open, closeAll } = useDialog()

const openModal = () => {
  open(defineAsyncComponent('./exampleModal.vue'), {
    title: 'example'
  }).then(res => {
    console.log(res) // ok
  }).catch(res => {
    console.log(res) // cancel
  })

  setTimeout(() => {
    closeAll()
  }, 10000)
}
</script>

<template>
  <button @click="openModal">open</button>
</template>
```

## API

### `useDialog(appContext?: AppContext): { open, closeAll, dismissAll, close, dismiss, visible }`

#### `open<T>(component: Component<T, any, any, ComputedOptions, MethodOptions>, props?: Partial<T>) => Promise<any>`

#### `visible: Ref<boolean> | undefined`

#### `close: (msg?: any) => void`

#### `dismiss: (msg?: any) => void`

#### `closeAll: (msg?: any) => void`

#### `dismissAll: (msg?: any) => void`

### `DialogInstance`
```typescript
interface DialogInstance {
  visible: Ref;
  close: (msg?: any) => void;
  dismiss: (msg?: any) => void;
}
```
