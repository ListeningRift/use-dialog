import { createVNode, render as vueRender, ref, watch, getCurrentInstance } from 'vue'
import type { Component, ComputedOptions, MethodOptions, AppContext, Ref } from 'vue'

export interface DialogInstance {
  visible: Ref
  close: (msg?: any) => void
  dismiss: (msg?: any) => void
}

type NewAppContext = AppContext & {
  dialogInstance?: DialogInstance
}

const cloneDeep = <T extends object>(obj: T): T => {
  const newObj = {} as T
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key]
      newObj[key] = element
    }
  }
  return newObj
}

export function useDialog(context?: AppContext) {
  if (!context) {
    context = getCurrentInstance()?.appContext
  }

  const allDialogInstance: DialogInstance[] = []

  const open = <T>(component: Component<T, any, any, ComputedOptions, MethodOptions>, props?: Partial<T>) => {
    const container = document.createDocumentFragment()

    let _resolve: (value?: any) => void, _reject: (value?: any) => void
    const visible = ref<boolean>(true)
    const close = (value?: any) => {
      visible.value = false
      _resolve(value)
    }
    const dismiss = (value?: any) => {
      visible.value = false
      _reject(value)
    }
    watch(visible, () => {
      if (visible.value === false) {
        dismiss()
      }
    })

    const Wrapper = (props: any) => {
      return createVNode(component, {
        ...props
      })
    }

    function render(renderProps: any) {
      const vm = createVNode(Wrapper, { ...renderProps })
      vm.appContext = cloneDeep(context!)
      const dialogInstance = {
        visible,
        close,
        dismiss
      }
      allDialogInstance.push(dialogInstance)
      ;(vm.appContext as NewAppContext).dialogInstance = dialogInstance

      vueRender(vm, container as any)
      return vm
    }

    return new Promise<any>((resolve, reject) => {
      _resolve = resolve
      _reject = reject
      render(props)
    })
  }

  const visible = (context as NewAppContext).dialogInstance?.visible

  const close = (msg?: any) => {
    if ((context as NewAppContext).dialogInstance) {
      ;(context as NewAppContext).dialogInstance!.close(msg)
    }
  }

  const dismiss = (msg?: any) => {
    if ((context as NewAppContext).dialogInstance) {
      ;(context as NewAppContext).dialogInstance!.dismiss(msg)
    }
  }

  const closeAll = (msg?: any) => {
    allDialogInstance.forEach(dialog => {
      dialog.close(msg)
    })
  }

  const dismissAll = (msg?: any) => {
    allDialogInstance.forEach(dialog => {
      dialog.dismiss(msg)
    })
  }

  return {
    open,
    visible,
    close,
    dismiss,
    closeAll,
    dismissAll
  }
}
